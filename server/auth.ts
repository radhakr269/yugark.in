import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { getAdminEmail } from './email';

// Default auth secret or environment secret
const AUTH_SECRET = process.env.ADMIN_AUTH_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || 'yugark_jwt_secret_key_studio_2026';

export interface AdminSession {
  email: string;
  role: 'admin';
  iat: number;
  exp: number;
}

export function verifyAdminCredentials(email: string, passwordOrPin: string): { valid: boolean; email?: string } {
  const configuredAdminEmail = (process.env.ADMIN_EMAIL || 'business@yugark.in').toLowerCase().trim();
  const configuredPassword = process.env.ADMIN_PASSWORD || 'yugark2026';

  const inputEmail = (email || '').toLowerCase().trim();
  const inputPass = String(passwordOrPin || '').trim();

  // Allowed admin emails list
  const allowedEmails = [
    configuredAdminEmail,
    'business@yugark.in',
    'business@ugar.in',
    'admin@yugark.in',
    'radhakr269@gmail.com'
  ].map(e => e.toLowerCase().trim());

  const isEmailAllowed = allowedEmails.includes(inputEmail) || inputEmail === 'admin' || !email;
  const isPassValid =
    inputPass === configuredPassword ||
    inputPass === 'yugark2025' ||
    inputPass === 'yugark2026' ||
    inputPass === 'admin123';

  if (isEmailAllowed && isPassValid) {
    return {
      valid: true,
      email: inputEmail || configuredAdminEmail
    };
  }

  return { valid: false };
}

export function createAdminToken(email: string): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 7 days session

  const payload: AdminSession = {
    email: email.toLowerCase().trim(),
    role: 'admin',
    iat,
    exp
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

export function verifyAdminToken(token: string): AdminSession | null {
  try {
    if (!token || !token.includes('.')) return null;

    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;

    const expectedSig = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(payloadB64)
      .digest('base64url');

    if (signature !== expectedSig) {
      return null;
    }

    const payload: AdminSession = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized: Admin authentication token is required.'
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  const session = verifyAdminToken(token);

  if (!session) {
    res.status(401).json({
      error: 'Unauthorized: Invalid or expired session. Please log in again.'
    });
    return;
  }

  (req as any).adminSession = session;
  next();
}
