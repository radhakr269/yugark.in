 import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import type {
  LeadRecord,
  AdminStats,
  LeadStatus,
  LeadPriority,
  NotificationStatus
} from './types.js';
import { generateLeadId } from './validation.js';

let supabaseInstance: SupabaseClient | null = null;

/**
 * Production detection.
 *
 * In production, the live Supabase database is the ONLY authoritative
 * source of lead data. Fallback/in-memory demo data is never used.
 *
 * In local development/preview, the existing fallback behavior can remain
 * available so local development is not unnecessarily broken.
 */
const IS_PRODUCTION =
  process.env.NODE_ENV === 'production' ||
  process.env.VERCEL_ENV === 'production';

export function getSupabase(): SupabaseClient | null {
  const url = (
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    ''
  ).trim();

  const key = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_KEY ||
    ''
  ).trim();

  if (
    !url ||
    !key ||
    url.startsWith('MY_') ||
    key.startsWith('MY_') ||
    !url.startsWith('http')
  ) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      });

      console.log(
        '[SUPABASE] Initialized Supabase client for URL:',
        url.replace(/\/\/([^@]+@)?/, '//')
      );
    } catch (err) {
      console.error('[SUPABASE INIT ERROR]', err);
      return null;
    }
  }

  return supabaseInstance;
}

/**
 * In-memory fallback storage.
 *
 * IMPORTANT:
 * These records are for local development/preview reliability ONLY.
 *
 * They must NEVER be used as production data.
 */
let fallbackLeads: LeadRecord[] = [
  {
    id: 'YG-2026-001001',
    created_at: new Date(
      Date.now() - 1000 * 60 * 60 * 4
    ).toISOString(),
    updated_at: new Date(
      Date.now() - 1000 * 60 * 60 * 4
    ).toISOString(),
    full_name: 'Ananya Deshmukh',
    email: 'ananya@spicecraft.in',
    whatsapp_number: '+91 98201 44521',
    business_company_name: 'SpiceCraft Bistro',
    category: 'Restaurant & Café',
    selected_bundle:
      'Package 2 — Website + 5 Reels Bundle (₹19,999)',
    service: 'Website Engineering & Motion',
    project_requirement:
      'We are launching our second outlet in Bandra and need a fast mobile website with digital menu and 5 promotional reels for Instagram launch.',
    remarks:
      'Preferred launch date in 10 days. Wants WhatsApp table booking button.',
    page_source: 'Homepage Start Project Form',
    form_source: 'Start Project',
    status: 'NEW',
    priority: 'HIGH',
    admin_notes: 'Urgent enquiry. Verified contact on WhatsApp.',
    notification_status: 'EMAIL_SENT'
  },
  {
    id: 'YG-2026-001002',
    created_at: new Date(
      Date.now() - 1000 * 60 * 60 * 26
    ).toISOString(),
    updated_at: new Date(
      Date.now() - 1000 * 60 * 60 * 26
    ).toISOString(),
    full_name: 'Dr. Sameer Kapoor',
    email: 'dr.kapoor@apexorthoclinic.com',
    whatsapp_number: '+91 94150 88712',
    business_company_name: 'Apex Orthopedic Clinic',
    category: 'Healthcare & Clinic',
    selected_bundle:
      'Package 1 — Website Development (₹12,999 / ~7 Days)',
    service: 'Website Engineering',
    project_requirement:
      'Need a professional doctor profile and appointment booking website with patient review integration.',
    remarks:
      'Looking for clean luxury aesthetic and clinic timing display.',
    page_source: 'Pricing Page',
    form_source: 'Package 1 Select',
    status: 'CONTACTED',
    priority: 'MEDIUM',
    admin_notes: 'Sent clinic template demo links.',
    notification_status: 'EMAIL_SENT',
    contacted_at: new Date(
      Date.now() - 1000 * 60 * 60 * 20
    ).toISOString()
  },
  {
    id: 'YG-2026-001003',
    created_at: new Date(
      Date.now() - 1000 * 60 * 60 * 70
    ).toISOString(),
    updated_at: new Date(
      Date.now() - 1000 * 60 * 60 * 70
    ).toISOString(),
    full_name: 'Rajesh Mehra',
    email: 'rajesh@vaultfit.in',
    whatsapp_number: '+91 98112 33490',
    business_company_name: 'Vault Fitness Gym',
    category: 'Gym & Fitness',
    selected_bundle:
      'Package 3 — Website + Complete Content (₹24,999)',
    service: 'Full Digital Growth System',
    project_requirement:
      'Opening high-end fitness center in South Delhi. Need complete launch kit with website and monthly reels package.',
    remarks:
      'Ready to proceed immediately upon contract sign-off.',
    page_source: 'Services Page',
    form_source: 'Service Blueprint Enquiry',
    status: 'CONVERTED',
    priority: 'URGENT',
    admin_notes: 'Advance received. Project initiated.',
    notification_status: 'EMAIL_SENT',
    contacted_at: new Date(
      Date.now() - 1000 * 60 * 60 * 65
    ).toISOString(),
    converted_at: new Date(
      Date.now() - 1000 * 60 * 60 * 48
    ).toISOString()
  }
];

/**
 * Insert a new lead.
 *
 * Production:
 * - Must successfully write to Supabase.
 * - If Supabase is unavailable or insertion fails, throw an error.
 * - NEVER silently store a production lead only in fallback memory.
 *
 * Development/preview:
 * - Existing fallback behavior is preserved.
 */
export async function insertLead(payload: {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessCategory?: string;
  otherCategory?: string;
  selectedService?: string;
  selectedBundle?: string;
  projectRequirement: string;
  remarks?: string;
  pageSource?: string;
  formSource?: string;
  ipHash?: string;
  userAgent?: string;
  isSpam?: boolean;
}): Promise<LeadRecord> {
  const supabase = getSupabase();
  const newId = generateLeadId();
  const now = new Date().toISOString();

  const record: LeadRecord = {
    id: newId,
    created_at: now,
    updated_at: now,
    full_name: payload.fullName,
    email: payload.email,
    whatsapp_number: payload.phone,
    business_company_name: payload.businessName,
    category: payload.businessCategory || 'Other',
    other_category: payload.otherCategory,
    selected_bundle:
      payload.selectedBundle || 'Custom Project',
    service:
      payload.selectedService || payload.selectedBundle,
    project_requirement: payload.projectRequirement,
    remarks: payload.remarks || '',
    page_source:
      payload.pageSource || 'Contact Form',
    form_source:
      payload.formSource || 'Website',
    status: payload.isSpam ? 'SPAM' : 'NEW',
    priority: 'MEDIUM',
    admin_notes: '',
    notification_status: 'PENDING',
    ip_hash_or_safe_request_identifier: payload.ipHash,
    user_agent_if_appropriate: payload.userAgent
  };

  if (!supabase) {
    if (IS_PRODUCTION) {
      throw new Error(
        'Database connection failed: Supabase client is not configured or unavailable. Lead was not stored.'
      );
    }

    console.warn(
      '[SUPABASE] No Supabase configuration; lead held in development transient store.'
    );

    fallbackLeads.unshift(record);
    return record;
  }

  try {
    const insertPayload = {
      id: record.id,
      full_name: record.full_name,
      email: record.email,
      whatsapp_number: record.whatsapp_number,
      business_company_name: record.business_company_name,
      category: record.category || 'Other',
      other_category: record.other_category || null,
      selected_bundle:
        record.selected_bundle || 'Custom Package',
      service:
        record.service ||
        record.selected_bundle ||
        'Digital Growth Services',
      project_requirement:
        record.project_requirement,
      remarks: record.remarks || '',
      page_source:
        record.page_source ||
        'Website Contact Form',
      form_source:
        record.form_source || 'Website',
      status: record.status || 'NEW',
      priority: record.priority || 'MEDIUM',
      admin_notes: record.admin_notes || '',
      notification_status:
        record.notification_status || 'PENDING',
      ip_hash_or_safe_request_identifier:
        record.ip_hash_or_safe_request_identifier || null,
      user_agent_if_appropriate:
        record.user_agent_if_appropriate
          ? record.user_agent_if_appropriate.slice(0, 500)
          : null,
      created_at: record.created_at,
      updated_at: record.updated_at
    };

    const { error } = await supabase
      .from('leads')
      .insert([insertPayload]);

    if (!error) {
      console.log(
        `[SUPABASE INSERT SUCCESS] Lead ${record.id} written to database table 'leads'.`
      );

      if (!IS_PRODUCTION) {
        fallbackLeads.unshift(record);
      }

      return record;
    }

    console.error(
      '[SUPABASE INSERT ERROR DETAILS]',
      {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      }
    );

    // If full insert failed because of schema mismatch,
    // try essential columns only.
    if (
      error.code === '42703' ||
      error.message?.includes('column')
    ) {
      console.warn(
        '[SUPABASE] Attempting minimal insert with core columns only...'
      );

      const minimalPayload = {
        id: record.id,
        full_name: record.full_name,
        email: record.email,
        whatsapp_number: record.whatsapp_number,
        business_company_name:
          record.business_company_name,
        project_requirement:
          record.project_requirement
      };

      const { error: minError } = await supabase
        .from('leads')
        .insert([minimalPayload]);

      if (!minError) {
        console.log(
          `[SUPABASE MINIMAL INSERT SUCCESS] Lead ${record.id} written to database.`
        );

        if (!IS_PRODUCTION) {
          fallbackLeads.unshift(record);
        }

        return record;
      }

      console.error(
        '[SUPABASE MINIMAL INSERT FAILED]',
        minError
      );

      throw new Error(
        `Live database insert failed: ${minError.message}`
      );
    }

    throw new Error(
      `Live database insert failed: ${error.message}`
    );
  } catch (err: any) {
    const message =
      err?.message || 'Unknown database insertion error';

    console.error('[SUPABASE INSERT EXCEPTION]', message);

    if (IS_PRODUCTION) {
      throw new Error(
        `Live database insert failed: ${message}`
      );
    }

    fallbackLeads.unshift(record);
    return record;
  }
}

export async function updateLeadNotificationStatus(
  id: string,
  status: NotificationStatus
): Promise<void> {
  const supabase = getSupabase();

  if (!supabase) {
    if (IS_PRODUCTION) {
      throw new Error(
        'Live database unavailable. Notification status was not updated.'
      );
    }

    const item = fallbackLeads.find(
      l => l.id === id
    );

    if (item) {
      item.notification_status = status;
      item.updated_at = new Date().toISOString();
    }

    return;
  }

  try {
    const { error } = await supabase
      .from('leads')
      .update({
        notification_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    if (!IS_PRODUCTION) {
      const item = fallbackLeads.find(
        l => l.id === id
      );

      if (item) {
        item.notification_status = status;
        item.updated_at = new Date().toISOString();
      }
    }
  } catch (err: any) {
    const message =
      err?.message ||
      'Unknown notification status update error';

    console.error(
      '[DB NOTIFICATION UPDATE ERROR]',
      message
    );

    if (IS_PRODUCTION) {
      throw new Error(
        `Live database notification update failed: ${message}`
      );
    }
  }
}

export interface GetLeadsQuery {
  search?: string;
  client?: string;
  status?: string;
  priority?: string;
  category?: string;
  source?: string;
  service?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  sortBy?:
    | 'created_at'
    | 'full_name'
    | 'priority'
    | 'status'
    | 'business_company_name';
  sortOrder?: 'asc' | 'desc';
}

export async function getLeads(
  query: GetLeadsQuery
): Promise<{
  data: LeadRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filterMeta?: {
    categories: string[];
    sources: string[];
    services: string[];
    totalUnfiltered: number;
  };
}> {
  const supabase = getSupabase();

  const page = Math.max(
    1,
    Number(query.page) || 1
  );

  const limit = Math.max(
    1,
    Math.min(
      10000,
      Number(query.limit) || 20
    )
  );

  const offset = (page - 1) * limit;

  let fromIso: string | undefined;
  let toIso: string | undefined;

  if (query.fromDate && query.fromDate.trim()) {
    const raw = query.fromDate.trim();

    fromIso = raw.includes('T')
      ? new Date(raw).toISOString()
      : new Date(
          `${raw}T00:00:00+05:30`
        ).toISOString();
  }

  if (query.toDate && query.toDate.trim()) {
    const raw = query.toDate.trim();

    toIso = raw.includes('T')
      ? new Date(raw).toISOString()
      : new Date(
          `${raw}T23:59:59.999+05:30`
        ).toISOString();
  }

  if (!supabase) {
    if (IS_PRODUCTION) {
      throw new Error(
        'Live database unavailable. Unable to load production leads.'
      );
    }

    return getFallbackLeads(
      query,
      page,
      limit,
      offset,
      fromIso,
      toIso
    );
  }

  try {
    let sbQuery = supabase
      .from('leads')
      .select('*', { count: 'exact' });

    if (
      query.status &&
      query.status !== 'All'
    ) {
      sbQuery = sbQuery.eq(
        'status',
        query.status
      );
    }

    if (
      query.priority &&
      query.priority !== 'All'
    ) {
      sbQuery = sbQuery.eq(
        'priority',
        query.priority
      );
    }

    if (
      query.category &&
      query.category !== 'All'
    ) {
      sbQuery = sbQuery.eq(
        'category',
        query.category
      );
    }

    if (
      query.source &&
      query.source !== 'All'
    ) {
      sbQuery = sbQuery.or(
        `page_source.ilike.%${query.source}%,form_source.ilike.%${query.source}%`
      );
    }

    if (
      query.service &&
      query.service !== 'All'
    ) {
      sbQuery = sbQuery.or(
        `selected_bundle.ilike.%${query.service}%,service.ilike.%${query.service}%`
      );
    }

    if (
      query.client &&
      query.client.trim()
    ) {
      const c = `%${query.client.trim()}%`;

      sbQuery = sbQuery.or(
        `full_name.ilike.${c},business_company_name.ilike.${c},email.ilike.${c},whatsapp_number.ilike.${c}`
      );
    }

    if (fromIso) {
      sbQuery = sbQuery.gte(
        'created_at',
        fromIso
      );
    }

    if (toIso) {
      sbQuery = sbQuery.lte(
        'created_at',
        toIso
      );
    }

    if (
      query.search &&
      query.search.trim()
    ) {
      const s = `%${query.search.trim()}%`;

      sbQuery = sbQuery.or(
        `id.ilike.${s},full_name.ilike.${s},email.ilike.${s},whatsapp_number.ilike.${s},business_company_name.ilike.${s},category.ilike.${s},project_requirement.ilike.${s},remarks.ilike.${s}`
      );
    }

    const sortCol =
      query.sortBy || 'created_at';

    const isAsc =
      query.sortOrder === 'asc';

    sbQuery = sbQuery.order(
      sortCol,
      { ascending: isAsc }
    );

    sbQuery = sbQuery.range(
      offset,
      offset + limit - 1
    );

    const {
      data,
      count,
      error
    } = await sbQuery;

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error(
        'Live database returned no response data.'
      );
    }

    const total =
      count ?? data.length;

    return {
      data: data as LeadRecord[],
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit
      )
    };
  } catch (err: any) {
    const message =
      err?.message ||
      'Unknown Supabase query error';

    console.error(
      '[SUPABASE FETCH ERROR]',
      message
    );

    if (IS_PRODUCTION) {
      throw new Error(
        `Live database query failed: ${message}`
      );
    }

    console.warn(
      '[SUPABASE FETCH ERROR, USING FALLBACK IN DEVELOPMENT]',
      err
    );

    return getFallbackLeads(
      query,
      page,
      limit,
      offset,
      fromIso,
      toIso
    );
  }
}

/**
 * Development/preview-only fallback query.
 *
 * NEVER called in production.
 */
function getFallbackLeads(
  query: GetLeadsQuery,
  page: number,
  limit: number,
  offset: number,
  fromIso?: string,
  toIso?: string
): {
  data: LeadRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} {
  let results = [...fallbackLeads];

  if (
    query.status &&
    query.status !== 'All'
  ) {
    results = results.filter(
      l => l.status === query.status
    );
  }

  if (
    query.priority &&
    query.priority !== 'All'
  ) {
    results = results.filter(
      l => l.priority === query.priority
    );
  }

  if (
    query.category &&
    query.category !== 'All'
  ) {
    results = results.filter(
      l =>
        l.category === query.category ||
        l.other_category === query.category
    );
  }

  if (
    query.source &&
    query.source !== 'All'
  ) {
    const src =
      query.source.toLowerCase();

    results = results.filter(
      l =>
        (l.page_source &&
          l.page_source
            .toLowerCase()
            .includes(src)) ||
        (l.form_source &&
          l.form_source
            .toLowerCase()
            .includes(src))
    );
  }

  if (
    query.service &&
    query.service !== 'All'
  ) {
    const srv =
      query.service.toLowerCase();

    results = results.filter(
      l =>
        (l.selected_bundle &&
          l.selected_bundle
            .toLowerCase()
            .includes(srv)) ||
        (l.service &&
          l.service
            .toLowerCase()
            .includes(srv))
    );
  }

  if (
    query.client &&
    query.client.trim()
  ) {
    const c =
      query.client
        .toLowerCase()
        .trim();

    results = results.filter(
      l =>
        l.full_name
          .toLowerCase()
          .includes(c) ||
        l.business_company_name
          .toLowerCase()
          .includes(c) ||
        l.email
          .toLowerCase()
          .includes(c) ||
        l.whatsapp_number
          .toLowerCase()
          .includes(c)
    );
  }

  if (fromIso) {
    const startTime =
      new Date(fromIso).getTime();

    results = results.filter(
      l =>
        new Date(
          l.created_at
        ).getTime() >= startTime
    );
  }

  if (toIso) {
    const endTime =
      new Date(toIso).getTime();

    results = results.filter(
      l =>
        new Date(
          l.created_at
        ).getTime() <= endTime
    );
  }

  if (
    query.search &&
    query.search.trim()
  ) {
    const s =
      query.search
        .toLowerCase()
        .trim();

    results = results.filter(
      l =>
        l.id
          .toLowerCase()
          .includes(s) ||
        l.full_name
          .toLowerCase()
          .includes(s) ||
        l.email
          .toLowerCase()
          .includes(s) ||
        l.whatsapp_number
          .toLowerCase()
          .includes(s) ||
        l.business_company_name
          .toLowerCase()
          .includes(s) ||
        (l.category &&
          l.category
            .toLowerCase()
            .includes(s)) ||
        (l.other_category &&
          l.other_category
            .toLowerCase()
            .includes(s)) ||
        (l.selected_bundle &&
          l.selected_bundle
            .toLowerCase()
            .includes(s)) ||
        (l.service &&
          l.service
            .toLowerCase()
            .includes(s)) ||
        (l.project_requirement &&
          l.project_requirement
            .toLowerCase()
            .includes(s)) ||
        (l.remarks &&
          l.remarks
            .toLowerCase()
            .includes(s)) ||
        (l.page_source &&
          l.page_source
            .toLowerCase()
            .includes(s)) ||
        (l.form_source &&
          l.form_source
            .toLowerCase()
            .includes(s))
    );
  }

  const sortCol =
    query.sortBy || 'created_at';

  const isAsc =
    query.sortOrder === 'asc';

  results.sort((a, b) => {
    const valA =
      (a as any)[sortCol] || '';

    const valB =
      (b as any)[sortCol] || '';

    if (valA < valB) {
      return isAsc ? -1 : 1;
    }

    if (valA > valB) {
      return isAsc ? 1 : -1;
    }

    return 0;
  });

  const total =
    results.length;

  const paginated =
    results.slice(
      offset,
      offset + limit
    );

  return {
    data: paginated,
    total,
    page,
    limit,
    totalPages:
      Math.ceil(total / limit) || 1
  };
}

export async function getLeadById(
  id: string
): Promise<LeadRecord | null> {
  const supabase =
    getSupabase();

  if (!supabase) {
    if (IS_PRODUCTION) {
      throw new Error(
        'Live database unavailable. Unable to load the requested production lead.'
      );
    }

    return (
      fallbackLeads.find(
        l => l.id === id
      ) || null
    );
  }

  try {
    const {
      data,
      error
    } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      return data as LeadRecord;
    }

    if (error) {
      throw new Error(error.message);
    }

    return null;
  } catch (err: any) {
    const message =
      err?.message ||
      'Unknown lead lookup error';

    console.error(
      '[SUPABASE GET BY ID ERROR]',
      message
    );

    if (IS_PRODUCTION) {
      throw new Error(
        `Live database query failed: ${message}`
      );
    }

    return (
      fallbackLeads.find(
        l => l.id === id
      ) || null
    );
  }
}

export async function updateLead(
  id: string,
  updates: {
    status?: LeadStatus;
    priority?: LeadPriority;
    admin_notes?: string;
  }
): Promise<LeadRecord | null> {
  const supabase =
    getSupabase();

  const now =
    new Date().toISOString();

  const fieldsToUpdate: any = {
    updated_at: now
  };

  if (updates.status) {
    fieldsToUpdate.status =
      updates.status;

    if (
      updates.status === 'CONTACTED' &&
      !fieldsToUpdate.contacted_at
    ) {
      fieldsToUpdate.contacted_at =
        now;
    }

    if (
      updates.status === 'CONVERTED' &&
      !fieldsToUpdate.converted_at
    ) {
      fieldsToUpdate.converted_at =
        now;
    }
  }

  if (updates.priority) {
    fieldsToUpdate.priority =
      updates.priority;
  }

  if (
    updates.admin_notes !==
    undefined
  ) {
    fieldsToUpdate.admin_notes =
      updates.admin_notes;
  }

  if (!supabase) {
    if (IS_PRODUCTION) {
      throw new Error(
        'Live database unavailable. Lead update was not completed.'
      );
    }

    const memIdx =
      fallbackLeads.findIndex(
        l => l.id === id
      );

    if (memIdx !== -1) {
      fallbackLeads[memIdx] = {
        ...fallbackLeads[memIdx],
        ...fieldsToUpdate
      };

      return fallbackLeads[
        memIdx
      ];
    }

    return null;
  }

  try {
    const {
      data,
      error
    } = await supabase
      .from('leads')
      .update(fieldsToUpdate)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return null;
    }

    if (!IS_PRODUCTION) {
      const memIdx =
        fallbackLeads.findIndex(
          l => l.id === id
        );

      if (memIdx !== -1) {
        fallbackLeads[memIdx] = {
          ...fallbackLeads[memIdx],
          ...data
        };
      }
    }

    return data as LeadRecord;
  } catch (err: any) {
    const message =
      err?.message ||
      'Unknown lead update error';

    console.error(
      '[SUPABASE UPDATE ERROR]',
      message
    );

    if (IS_PRODUCTION) {
      throw new Error(
        `Live database update failed: ${message}`
      );
    }

    const memIdx =
      fallbackLeads.findIndex(
        l => l.id === id
      );

    if (memIdx !== -1) {
      fallbackLeads[memIdx] = {
        ...fallbackLeads[memIdx],
        ...fieldsToUpdate
      };

      return fallbackLeads[
        memIdx
      ];
    }

    return null;
  }
}

export async function deleteLead(
  id: string
): Promise<boolean> {
  const supabase =
    getSupabase();

  if (!supabase) {
    if (IS_PRODUCTION) {
      throw new Error(
        'Live database unavailable. Lead deletion was not completed.'
      );
    }

    const initialLen =
      fallbackLeads.length;

    fallbackLeads =
      fallbackLeads.filter(
        l => l.id !== id
      );

    return (
      fallbackLeads.length <
      initialLen
    );
  }

  try {
    const {
      error
    } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    if (!IS_PRODUCTION) {
      fallbackLeads =
        fallbackLeads.filter(
          l => l.id !== id
        );
    }

    return true;
  } catch (err: any) {
    const message =
      err?.message ||
      'Unknown lead deletion error';

    console.error(
      '[SUPABASE DELETE ERROR]',
      message
    );

    if (IS_PRODUCTION) {
      throw new Error(
        `Live database deletion failed: ${message}`
      );
    }

    const initialLen =
      fallbackLeads.length;

    fallbackLeads =
      fallbackLeads.filter(
        l => l.id !== id
      );

    return (
      fallbackLeads.length <
      initialLen
    );
  }
}

export async function getAdminStats(): Promise<AdminStats> {
  const supabase =
    getSupabase();

  if (!supabase) {
    if (IS_PRODUCTION) {
      throw new Error(
        'Live database unavailable. Unable to load production lead statistics.'
      );
    }

    return calculateStats(
      fallbackLeads
    );
  }

  try {
    const {
      data: allLeads,
      error
    } = await supabase
      .from('leads')
      .select(
        'status, created_at'
      );

    if (error) {
      throw new Error(error.message);
    }

    if (!allLeads) {
      throw new Error(
        'Live database returned no statistics data.'
      );
    }

    return calculateStats(
      allLeads as {
        status: LeadStatus;
        created_at: string;
      }[]
    );
  } catch (err: any) {
    const message =
      err?.message ||
      'Unknown Supabase stats error';

    console.error(
      '[SUPABASE STATS ERROR]',
      message
    );

    if (IS_PRODUCTION) {
      throw new Error(
        `Live database stats query failed: ${message}`
      );
    }

    console.warn(
      '[SUPABASE STATS ERROR, USING FALLBACK IN DEVELOPMENT]',
      err
    );

    return calculateStats(
      fallbackLeads
    );
  }
}

function calculateStats(
  leads: {
    status: LeadStatus;
    created_at: string;
  }[]
): AdminStats {
  const now =
    new Date();

  const startOfToday =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();

  const startOfWeek =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() -
        now.getDay()
    ).getTime();

  const startOfMonth =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).getTime();

  let total =
    leads.length;

  let newLeads = 0;
  let contacted = 0;
  let inProgress = 0;
  let qualified = 0;
  let converted = 0;
  let closed = 0;
  let spam = 0;
  let todayCount = 0;
  let weekCount = 0;
  let monthCount = 0;

  for (const l of leads) {
    if (l.status === 'NEW') {
      newLeads++;
    } else if (
      l.status === 'CONTACTED'
    ) {
      contacted++;
    } else if (
      l.status === 'IN_PROGRESS'
    ) {
      inProgress++;
    } else if (
      l.status === 'QUALIFIED'
    ) {
      qualified++;
    } else if (
      l.status === 'CONVERTED'
    ) {
      converted++;
    } else if (
      l.status === 'CLOSED'
    ) {
      closed++;
    } else if (
      l.status === 'SPAM'
    ) {
      spam++;
    }

    const t =
      new Date(
        l.created_at
      ).getTime();

    if (
      t >= startOfToday
    ) {
      todayCount++;
    }

    if (
      t >= startOfWeek
    ) {
      weekCount++;
    }

    if (
      t >= startOfMonth
    ) {
      monthCount++;
    }
  }

  return {
    total,
    newLeads,
    contacted,
    inProgress,
    qualified,
    converted,
    closed,
    spam,
    todayCount,
    weekCount,
    monthCount
  };
}

function formatSubmissionDateTime(
  dateStr: string | Date
): string {
  try {
    const d =
      new Date(dateStr);

    return d.toLocaleString(
      'en-IN',
      {
        timeZone:
          'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }
    );
  } catch {
    return String(dateStr);
  }
}

/**
 * STRICT LIVE DATA QUERY
 *
 * This function NEVER uses fallbackLeads.
 *
 * It is used by production Excel export.
 */
export async function getLiveLeads(
  query: GetLeadsQuery
): Promise<LeadRecord[]> {
  const supabase =
    getSupabase();

  if (!supabase) {
    throw new Error(
      'Database connection failed: Supabase client is not configured or unavailable.'
    );
  }

  let fromIso:
    | string
    | undefined;

  let toIso:
    | string
    | undefined;

  if (
    query.fromDate &&
    query.fromDate.trim()
  ) {
    const raw =
      query.fromDate.trim();

    fromIso =
      raw.includes('T')
        ? new Date(
            raw
          ).toISOString()
        : new Date(
            `${raw}T00:00:00+05:30`
          ).toISOString();
  }

  if (
    query.toDate &&
    query.toDate.trim()
  ) {
    const raw =
      query.toDate.trim();

    toIso =
      raw.includes('T')
        ? new Date(
            raw
          ).toISOString()
        : new Date(
            `${raw}T23:59:59.999+05:30`
          ).toISOString();
  }

  let sbQuery =
    supabase
      .from('leads')
      .select('*');

  if (
    query.status &&
    query.status !== 'All'
  ) {
    sbQuery = sbQuery.eq(
      'status',
      query.status
    );
  }

  if (
    query.priority &&
    query.priority !== 'All'
  ) {
    sbQuery = sbQuery.eq(
      'priority',
      query.priority
    );
  }

  if (
    query.category &&
    query.category !== 'All'
  ) {
    sbQuery = sbQuery.eq(
      'category',
      query.category
    );
  }

  if (
    query.source &&
    query.source !== 'All'
  ) {
    sbQuery = sbQuery.or(
      `page_source.ilike.%${query.source}%,form_source.ilike.%${query.source}%`
    );
  }

  if (
    query.service &&
    query.service !== 'All'
  ) {
    sbQuery = sbQuery.or(
      `selected_bundle.ilike.%${query.service}%,service.ilike.%${query.service}%`
    );
  }

  if (
    query.client &&
    query.client.trim()
  ) {
    const c =
      `%${query.client.trim()}%`;

    sbQuery = sbQuery.or(
      `full_name.ilike.${c},business_company_name.ilike.${c},email.ilike.${c},whatsapp_number.ilike.${c}`
    );
  }

  if (fromIso) {
    sbQuery = sbQuery.gte(
      'created_at',
      fromIso
    );
  }

  if (toIso) {
    sbQuery = sbQuery.lte(
      'created_at',
      toIso
    );
  }

  if (
    query.search &&
    query.search.trim()
  ) {
    const s =
      `%${query.search.trim()}%`;

    sbQuery = sbQuery.or(
      `id.ilike.${s},full_name.ilike.${s},email.ilike.${s},whatsapp_number.ilike.${s},business_company_name.ilike.${s},category.ilike.${s},project_requirement.ilike.${s},remarks.ilike.${s}`
    );
  }

  const sortCol =
    query.sortBy ||
    'created_at';

  const isAsc =
    query.sortOrder === 'asc';

  sbQuery = sbQuery.order(
    sortCol,
    {
      ascending: isAsc
    }
  );

  const limit =
    Math.max(
      1,
      Math.min(
        10000,
        Number(query.limit) ||
          10000
      )
    );

  sbQuery =
    sbQuery.limit(limit);

  const {
    data,
    error
  } = await sbQuery;

  if (error) {
    throw new Error(
      `Live database query failed: ${error.message}`
    );
  }

  if (!data) {
    throw new Error(
      'Live database returned no response data.'
    );
  }

  return data as LeadRecord[];
}

export async function exportLeadsToExcelBuffer(
  params: GetLeadsQuery = {}
): Promise<Buffer> {
  const data =
    await getLiveLeads({
      limit: 10000,
      sortBy:
        params.sortBy ||
        'created_at',
      sortOrder:
        params.sortOrder ||
        'desc',
      search:
        params.search,
      client:
        params.client,
      status:
        params.status,
      priority:
        params.priority,
      category:
        params.category,
      source:
        params.source,
      service:
        params.service,
      fromDate:
        params.fromDate,
      toDate:
        params.toDate
    });

  if (
    !data ||
    data.length === 0
  ) {
    throw new Error(
      'No matching live leads found in the database for the selected filter criteria.'
    );
  }

  const rows =
    data.map(
      lead => ({
        'Lead ID':
          lead.id || '',

        'Date / Created At':
          formatSubmissionDateTime(
            lead.created_at
          ),

        'Client Name':
          lead.full_name || '',

        'Company':
          lead.business_company_name ||
          '',

        'Phone / WhatsApp':
          lead.whatsapp_number ||
          '',

        'Email':
          lead.email || '',

        'Category':
          lead.other_category
            ? `${lead.category} (${lead.other_category})`
            : lead.category || '',

        'Selected Service / Package':
          lead.selected_bundle ||
          lead.service ||
          '',

        'Requirement / Message':
          lead.project_requirement ||
          '',

        'Remarks / Notes':
          lead.remarks || '',

        'Status':
          lead.status || '',

        'Priority':
          lead.priority || '',

        'Source':
          lead.page_source ||
          lead.form_source ||
          '',

        'Admin Notes':
          lead.admin_notes ||
          '',

        'Notification Status':
          lead.notification_status ||
          '',

        'Contacted At':
          lead.contacted_at
            ? formatSubmissionDateTime(
                lead.contacted_at
              )
            : '',

        'Converted At':
          lead.converted_at
            ? formatSubmissionDateTime(
                lead.converted_at
              )
            : ''
      })
    );

  const worksheet =
    XLSX.utils.json_to_sheet(
      rows
    );

  worksheet['!cols'] = [
    { wch: 18 },
    { wch: 24 },
    { wch: 22 },
    { wch: 26 },
    { wch: 22 },
    { wch: 26 },
    { wch: 24 },
    { wch: 38 },
    { wch: 45 },
    { wch: 30 },
    { wch: 14 },
    { wch: 12 },
    { wch: 24 },
    { wch: 32 },
    { wch: 18 },
    { wch: 24 },
    { wch: 24 }
  ];

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Live Leads'
  );

  const excelBuffer =
    XLSX.write(
      workbook,
      {
        type: 'buffer',
        bookType: 'xlsx'
      }
    );

  return Buffer.isBuffer(
    excelBuffer
  )
    ? excelBuffer
    : Buffer.from(
        excelBuffer
      );
}

export async function exportLeadsToCSV(
  params: GetLeadsQuery = {}
): Promise<string> {
  const data =
    await getLiveLeads({
      limit: 10000,
      sortBy:
        params.sortBy ||
        'created_at',
      sortOrder:
        params.sortOrder ||
        'desc',
      search:
        params.search,
      client:
        params.client,
      status:
        params.status,
      priority:
        params.priority,
      category:
        params.category,
      source:
        params.source,
      service:
        params.service,
      fromDate:
        params.fromDate,
      toDate:
        params.toDate
    });

  if (
    !data ||
    data.length === 0
  ) {
    throw new Error(
      'No matching live leads found in the database for the selected filter criteria.'
    );
  }

  const headers = [
    'Lead ID',
    'Date / Created At',
    'Client Name',
    'Company',
    'Phone / WhatsApp',
    'Email',
    'Category',
    'Selected Service / Package',
    'Requirement / Message',
    'Remarks / Notes',
    'Status',
    'Priority',
    'Source',
    'Admin Notes',
    'Notification Status',
    'Contacted At',
    'Converted At'
  ];

  const escapeCSV = (
    val:
      | string
      | undefined
      | null
  ) => {
    if (
      val === undefined ||
      val === null
    ) {
      return '""';
    }

    const str =
      String(val).replace(
        /"/g,
        '""'
      );

    return `"${str}"`;
  };

  const rows =
    data.map(
      lead => [
        escapeCSV(lead.id),

        escapeCSV(
          formatSubmissionDateTime(
            lead.created_at
          )
        ),

        escapeCSV(
          lead.full_name
        ),

        escapeCSV(
          lead.business_company_name
        ),

        escapeCSV(
          lead.whatsapp_number
        ),

        escapeCSV(
          lead.email
        ),

        escapeCSV(
          lead.other_category
            ? `${lead.category} (${lead.other_category})`
            : lead.category
        ),

        escapeCSV(
          lead.selected_bundle ||
          lead.service
        ),

        escapeCSV(
          lead.project_requirement
        ),

        escapeCSV(
          lead.remarks
        ),

        escapeCSV(
          lead.status
        ),

        escapeCSV(
          lead.priority
        ),

        escapeCSV(
          lead.page_source ||
          lead.form_source
        ),

        escapeCSV(
          lead.admin_notes
        ),

        escapeCSV(
          lead.notification_status
        ),

        escapeCSV(
          lead.contacted_at
            ? formatSubmissionDateTime(
                lead.contacted_at
              )
            : ''
        ),

        escapeCSV(
          lead.converted_at
            ? formatSubmissionDateTime(
                lead.converted_at
              )
            : ''
        )
      ]
    );

  return [
    headers.join(','),
    ...rows.map(
      r => r.join(',')
    )
  ].join('\n');
}

export async function getDistinctFilterOptions(): Promise<{
  categories: string[];
  sources: string[];
  services: string[];
}> {
  /**
   * getLeads() is production-safe:
   * - Production → live Supabase only
   * - Development → fallback allowed if Supabase fails
   */
  const {
    data
  } = await getLeads({
    limit: 5000,
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

  const categorySet =
    new Set<string>();

  const sourceSet =
    new Set<string>();

  const serviceSet =
    new Set<string>();

  data.forEach(
    lead => {
      if (lead.category) {
        categorySet.add(
          lead.category.trim()
        );
      }

      if (lead.other_category) {
        categorySet.add(
          lead.other_category.trim()
        );
      }

      if (lead.page_source) {
        sourceSet.add(
          lead.page_source.trim()
        );
      }

      if (lead.form_source) {
        sourceSet.add(
          lead.form_source.trim()
        );
      }

      if (lead.selected_bundle) {
        serviceSet.add(
          lead.selected_bundle.trim()
        );
      }

      if (lead.service) {
        serviceSet.add(
          lead.service.trim()
        );
      }
    }
  );

  return {
    categories:
      Array.from(
        categorySet
      )
        .filter(Boolean)
        .sort(),

    sources:
      Array.from(
        sourceSet
      )
        .filter(Boolean)
        .sort(),

    services:
      Array.from(
        serviceSet
      )
        .filter(Boolean)
        .sort()
  };
}