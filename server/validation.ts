import crypto from 'crypto';
import type { CreateLeadPayload } from './types';

// In-memory rate limiter cache
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Duplicate submission cache (60 seconds window)
interface DuplicateEntry {
  leadId: string;
  timestamp: number;
}

const duplicateMap = new Map<string, DuplicateEntry>();

/**
 * Generates a practically unique lead ID.
 *
 * IMPORTANT:
 * Do not use an in-memory sequential counter here.
 * Vercel serverless instances can restart at any time,
 * which would reset the counter and generate duplicate IDs.
 *
 * Example:
 * YG-2026-MEJ8X2AB-7F3A91C2
 */
export function generateLeadId(): string {
  const currentYear = new Date().getFullYear();

  // Timestamp keeps IDs different across time/server restarts.
  const timestampPart = Date.now()
    .toString(36)
    .toUpperCase();

  // Cryptographically secure random suffix protects against
  // two requests arriving during the same millisecond.
  const randomPart = crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase();

  return `YG-${currentYear}-${timestampPart}-${randomPart}`;
}

export function hashIdentifier(str: string): string {
  return crypto
    .createHash('sha256')
    .update(str || 'anonymous')
    .digest('hex')
    .slice(0, 16);
}

export function checkRateLimit(
  ip: string,
  maxRequests = 10,
  windowMs = 15 * 60 * 1000
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + windowMs
    });

    return {
      allowed: true
    };
  }

  if (entry.count >= maxRequests) {
    const retryAfter = Math.ceil(
      (entry.resetAt - now) / 1000
    );

    return {
      allowed: false,
      retryAfter
    };
  }

  entry.count += 1;

  return {
    allowed: true
  };
}

function createDuplicateKey(
  payload: CreateLeadPayload
): string {
  return (
    `${payload.email?.toLowerCase().trim() || ''}_` +
    `${payload.phone?.trim() || ''}_` +
    `${payload.businessName?.toLowerCase().trim() || ''}_` +
    `${payload.projectRequirement?.slice(0, 30).trim() || ''}`
  );
}

export function checkDuplicateSubmission(
  payload: CreateLeadPayload
): {
  isDuplicate: boolean;
  existingLeadId?: string;
} {
  const key = createDuplicateKey(payload);

  const now = Date.now();
  const entry = duplicateMap.get(key);

  if (
    entry &&
    now - entry.timestamp < 60_000
  ) {
    return {
      isDuplicate: true,
      existingLeadId: entry.leadId
    };
  }

  return {
    isDuplicate: false
  };
}

export function recordSubmission(
  payload: CreateLeadPayload,
  leadId: string
): void {
  const key = createDuplicateKey(payload);

  duplicateMap.set(key, {
    leadId,
    timestamp: Date.now()
  });

  // Clean old duplicate entries periodically.
  if (duplicateMap.size > 500) {
    const now = Date.now();

    for (
      const [keyToDelete, entry]
      of duplicateMap.entries()
    ) {
      if (
        now - entry.timestamp > 120_000
      ) {
        duplicateMap.delete(keyToDelete);
      }
    }
  }
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  isSpam?: boolean;
  sanitized?: CreateLeadPayload;
}

export function validateLeadSubmission(
  body: any
): ValidationResult {
  const errors: Record<string, string> = {};

  if (
    !body ||
    typeof body !== 'object' ||
    Array.isArray(body)
  ) {
    return {
      isValid: false,
      errors: {
        form: 'Invalid request body'
      }
    };
  }

  // Honeypot detection.
  if (
    body.website_url_hp &&
    String(body.website_url_hp)
      .trim()
      .length > 0
  ) {
    return {
      isValid: false,
      errors: {},
      isSpam: true
    };
  }

  const fullName = String(
    body.fullName ||
    body.full_name ||
    ''
  ).trim();

  const email = String(
    body.email ||
    ''
  )
    .trim()
    .toLowerCase();

  const phone = String(
    body.phone ||
    body.whatsapp_number ||
    ''
  ).trim();

  const businessName = String(
    body.businessName ||
    body.business_company_name ||
    ''
  ).trim();

  const businessCategory = String(
    body.businessCategory ||
    body.category ||
    'Other'
  ).trim();

  const otherCategory =
    body.otherCategory
      ? String(body.otherCategory).trim()
      : undefined;

  const selectedService = String(
    body.selectedService ||
    body.service ||
    'Website Development'
  ).trim();

  const selectedBundle = String(
    body.selectedBundle ||
    'Package 1 — Website Development'
  ).trim();

  const projectRequirement = String(
    body.projectRequirement ||
    body.project_requirement ||
    ''
  ).trim();

  const remarks =
    body.remarks
      ? String(body.remarks).trim()
      : '';

  const pageSource = String(
    body.pageSource ||
    body.page_source ||
    'Contact Form'
  ).trim();

  const formSource = String(
    body.formSource ||
    body.form_source ||
    'Website Contact Form'
  ).trim();

  // Full Name validation.
  if (!fullName) {
    errors.fullName =
      'Full Name is required';
  } else if (fullName.length < 2) {
    errors.fullName =
      'Full Name must be at least 2 characters';
  } else if (fullName.length > 100) {
    errors.fullName =
      'Full Name must not exceed 100 characters';
  }

  // Email validation.
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors.email =
      'Valid email address is required';
  } else if (!emailRegex.test(email)) {
    errors.email =
      'Please provide a valid email address';
  } else if (email.length > 150) {
    errors.email =
      'Email must not exceed 150 characters';
  }

  // Phone / WhatsApp validation.
  const phoneDigits =
    phone.replace(/\D/g, '');

  if (!phone) {
    errors.phone =
      'WhatsApp / Phone number is required';
  } else if (phoneDigits.length < 7) {
    errors.phone =
      'Please provide a valid contact number (min 7 digits)';
  } else if (phoneDigits.length > 15) {
    errors.phone =
      'Please provide a valid contact number (max 15 digits)';
  } else if (phone.length > 30) {
    errors.phone =
      'Phone number is too long';
  }

  // Business Name validation.
  if (!businessName) {
    errors.businessName =
      'Business or company name is required';
  } else if (
    businessName.length > 150
  ) {
    errors.businessName =
      'Business name must not exceed 150 characters';
  }

  // Project Requirement validation.
  if (!projectRequirement) {
    errors.projectRequirement =
      'Please describe your project requirement';
  } else if (
    projectRequirement.length < 3
  ) {
    errors.projectRequirement =
      'Project description must be at least 3 characters';
  } else if (
    projectRequirement.length > 4000
  ) {
    errors.projectRequirement =
      'Project description must not exceed 4000 characters';
  }

  if (
    Object.keys(errors).length > 0
  ) {
    return {
      isValid: false,
      errors
    };
  }

  return {
    isValid: true,
    errors: {},
    sanitized: {
      fullName,
      email,
      phone,
      businessName,
      businessCategory,
      otherCategory,
      selectedService,
      selectedBundle,
      projectRequirement,
      remarks,
      pageSource,
      formSource
    }
  };
}
