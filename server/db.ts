import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { LeadRecord, AdminStats, LeadStatus, LeadPriority, NotificationStatus } from './types.js';
import { generateLeadId } from './validation.js';

let supabaseInstance: SupabaseClient | null = null;

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

  if (!url || !key || url.startsWith('MY_') || key.startsWith('MY_') || !url.startsWith('http')) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        }
      });
      console.log('[SUPABASE] Initialized Supabase client for URL:', url.replace(/\/\/([^@]+@)?/, '//'));
    } catch (err) {
      console.error('[SUPABASE INIT ERROR]', err);
      return null;
    }
  }

  return supabaseInstance;
}

// In-memory persistent storage fallback for dev/preview reliability
let fallbackLeads: LeadRecord[] = [
  {
    id: 'YG-2026-001001',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    full_name: 'Ananya Deshmukh',
    email: 'ananya@spicecraft.in',
    whatsapp_number: '+91 98201 44521',
    business_company_name: 'SpiceCraft Bistro',
    category: 'Restaurant & Café',
    selected_bundle: 'Package 2 — Website + 5 Reels Bundle (₹19,999)',
    service: 'Website Engineering & Motion',
    project_requirement: 'We are launching our second outlet in Bandra and need a fast mobile website with digital menu and 5 promotional reels for Instagram launch.',
    remarks: 'Preferred launch date in 10 days. Wants WhatsApp table booking button.',
    page_source: 'Homepage Start Project Form',
    form_source: 'Start Project',
    status: 'NEW',
    priority: 'HIGH',
    admin_notes: 'Urgent enquiry. Verified contact on WhatsApp.',
    notification_status: 'EMAIL_SENT'
  },
  {
    id: 'YG-2026-001002',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    full_name: 'Dr. Sameer Kapoor',
    email: 'dr.kapoor@apexorthoclinic.com',
    whatsapp_number: '+91 94150 88712',
    business_company_name: 'Apex Orthopedic Clinic',
    category: 'Healthcare & Clinic',
    selected_bundle: 'Package 1 — Website Development (₹12,999 / ~7 Days)',
    service: 'Website Engineering',
    project_requirement: 'Need a professional doctor profile and appointment booking website with patient review integration.',
    remarks: 'Looking for clean luxury aesthetic and clinic timing display.',
    page_source: 'Pricing Page',
    form_source: 'Package 1 Select',
    status: 'CONTACTED',
    priority: 'MEDIUM',
    admin_notes: 'Sent clinic template demo links.',
    notification_status: 'EMAIL_SENT',
    contacted_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
  },
  {
    id: 'YG-2026-001003',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(),
    full_name: 'Rajesh Mehra',
    email: 'rajesh@vaultfit.in',
    whatsapp_number: '+91 98112 33490',
    business_company_name: 'Vault Fitness Gym',
    category: 'Gym & Fitness',
    selected_bundle: 'Package 3 — Website + Complete Content (₹24,999)',
    service: 'Full Digital Growth System',
    project_requirement: 'Opening high-end fitness center in South Delhi. Need complete launch kit with website and monthly reels package.',
    remarks: 'Ready to proceed immediately upon contract sign-off.',
    page_source: 'Services Page',
    form_source: 'Service Blueprint Enquiry',
    status: 'CONVERTED',
    priority: 'URGENT',
    admin_notes: 'Advance received. Project initiated.',
    notification_status: 'EMAIL_SENT',
    contacted_at: new Date(Date.now() - 1000 * 60 * 60 * 65).toISOString(),
    converted_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  }
];

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
    selected_bundle: payload.selectedBundle || 'Custom Project',
    service: payload.selectedService || payload.selectedBundle,
    project_requirement: payload.projectRequirement,
    remarks: payload.remarks || '',
    page_source: payload.pageSource || 'Contact Form',
    form_source: payload.formSource || 'Website',
    status: payload.isSpam ? 'SPAM' : 'NEW',
    priority: 'MEDIUM',
    admin_notes: '',
    notification_status: 'PENDING',
    ip_hash_or_safe_request_identifier: payload.ipHash,
    user_agent_if_appropriate: payload.userAgent
  };

  if (supabase) {
    try {
      const insertPayload = {
        id: record.id,
        full_name: record.full_name,
        email: record.email,
        whatsapp_number: record.whatsapp_number,
        business_company_name: record.business_company_name,
        category: record.category || 'Other',
        other_category: record.other_category || null,
        selected_bundle: record.selected_bundle || 'Custom Package',
        service: record.service || record.selected_bundle || 'Digital Growth Services',
        project_requirement: record.project_requirement,
        remarks: record.remarks || '',
        page_source: record.page_source || 'Website Contact Form',
        form_source: record.form_source || 'Website',
        status: record.status || 'NEW',
        priority: record.priority || 'MEDIUM',
        admin_notes: record.admin_notes || '',
        notification_status: record.notification_status || 'PENDING',
        ip_hash_or_safe_request_identifier: record.ip_hash_or_safe_request_identifier || null,
        user_agent_if_appropriate: record.user_agent_if_appropriate ? record.user_agent_if_appropriate.slice(0, 500) : null,
        created_at: record.created_at,
        updated_at: record.updated_at
      };

      // Note: We avoid .select() here because with standard anon RLS, anon has INSERT permissions.
      const { error } = await supabase
        .from('leads')
        .insert([insertPayload]);

      if (!error) {
        console.log(`[SUPABASE INSERT SUCCESS] Lead ${record.id} written to database table 'leads'.`);
        fallbackLeads.unshift(record);
        return record;
      }

      console.error('[SUPABASE INSERT ERROR DETAILS]', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });

      // If full insert failed (e.g. schema column mismatch), try essential columns
      if (error.code === '42703' || error.message?.includes('column')) {
        console.warn('[SUPABASE] Attempting fallback insert with core columns only...');
        const minimalPayload = {
          id: record.id,
          full_name: record.full_name,
          email: record.email,
          whatsapp_number: record.whatsapp_number,
          business_company_name: record.business_company_name,
          project_requirement: record.project_requirement
        };
        const { error: minError } = await supabase.from('leads').insert([minimalPayload]);
        if (!minError) {
          console.log(`[SUPABASE MINIMAL INSERT SUCCESS] Lead ${record.id} written to database.`);
          fallbackLeads.unshift(record);
          return record;
        }
        console.error('[SUPABASE MINIMAL INSERT FAILED]', minError);
      }
    } catch (err: any) {
      console.error('[SUPABASE INSERT EXCEPTION]', err?.message || err);
    }
  } else {
    console.warn('[SUPABASE] No SUPABASE_URL / SUPABASE_ANON_KEY configured; lead held in transient store.');
  }

  fallbackLeads.unshift(record);
  return record;
}

export async function updateLeadNotificationStatus(id: string, status: NotificationStatus): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('leads').update({ notification_status: status }).eq('id', id);
    } catch (err) {
      console.error('[DB NOTIFICATION UPDATE ERROR]', err);
    }
  }
  const item = fallbackLeads.find(l => l.id === id);
  if (item) {
    item.notification_status = status;
    item.updated_at = new Date().toISOString();
  }
}

export interface GetLeadsQuery {
  search?: string;
  status?: string;
  priority?: string;
  category?: string;
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'full_name' | 'priority' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export async function getLeads(query: GetLeadsQuery): Promise<{
  data: LeadRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  const supabase = getSupabase();
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(query.limit) || 20));
  const offset = (page - 1) * limit;

  if (supabase) {
    try {
      let sbQuery = supabase.from('leads').select('*', { count: 'exact' });

      if (query.status && query.status !== 'All') {
        sbQuery = sbQuery.eq('status', query.status);
      }
      if (query.priority && query.priority !== 'All') {
        sbQuery = sbQuery.eq('priority', query.priority);
      }
      if (query.category && query.category !== 'All') {
        sbQuery = sbQuery.eq('category', query.category);
      }
      if (query.search && query.search.trim()) {
        const s = `%${query.search.trim()}%`;
        sbQuery = sbQuery.or(`id.ilike.${s},full_name.ilike.${s},email.ilike.${s},whatsapp_number.ilike.${s},business_company_name.ilike.${s},category.ilike.${s}`);
      }

      const sortCol = query.sortBy || 'created_at';
      const isAsc = query.sortOrder === 'asc';
      sbQuery = sbQuery.order(sortCol, { ascending: isAsc });
      sbQuery = sbQuery.range(offset, offset + limit - 1);

      const { data, count, error } = await sbQuery;

      if (!error && data) {
        const total = count || data.length;
        return {
          data: data as LeadRecord[],
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        };
      }
    } catch (err) {
      console.warn('[SUPABASE FETCH ERROR, USING FALLBACK]', err);
    }
  }

  // Fallback in-memory query
  let results = [...fallbackLeads];

  if (query.status && query.status !== 'All') {
    results = results.filter(l => l.status === query.status);
  }
  if (query.priority && query.priority !== 'All') {
    results = results.filter(l => l.priority === query.priority);
  }
  if (query.category && query.category !== 'All') {
    results = results.filter(l => l.category === query.category);
  }
  if (query.search && query.search.trim()) {
    const s = query.search.toLowerCase().trim();
    results = results.filter(l =>
      l.id.toLowerCase().includes(s) ||
      l.full_name.toLowerCase().includes(s) ||
      l.email.toLowerCase().includes(s) ||
      l.whatsapp_number.toLowerCase().includes(s) ||
      l.business_company_name.toLowerCase().includes(s) ||
      l.category.toLowerCase().includes(s)
    );
  }

  // Sorting
  const sortCol = query.sortBy || 'created_at';
  const isAsc = query.sortOrder === 'asc';
  results.sort((a, b) => {
    const valA = (a as any)[sortCol] || '';
    const valB = (b as any)[sortCol] || '';
    if (valA < valB) return isAsc ? -1 : 1;
    if (valA > valB) return isAsc ? 1 : -1;
    return 0;
  });

  const total = results.length;
  const paginated = results.slice(offset, offset + limit);

  return {
    data: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1
  };
}

export async function getLeadById(id: string): Promise<LeadRecord | null> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
      if (!error && data) return data as LeadRecord;
    } catch (err) {
      console.error('[SUPABASE GET BY ID ERROR]', err);
    }
  }
  return fallbackLeads.find(l => l.id === id) || null;
}

export async function updateLead(
  id: string,
  updates: {
    status?: LeadStatus;
    priority?: LeadPriority;
    admin_notes?: string;
  }
): Promise<LeadRecord | null> {
  const supabase = getSupabase();
  const now = new Date().toISOString();
  const fieldsToUpdate: any = {
    updated_at: now
  };

  if (updates.status) {
    fieldsToUpdate.status = updates.status;
    if (updates.status === 'CONTACTED' && !fieldsToUpdate.contacted_at) {
      fieldsToUpdate.contacted_at = now;
    }
    if (updates.status === 'CONVERTED' && !fieldsToUpdate.converted_at) {
      fieldsToUpdate.converted_at = now;
    }
  }

  if (updates.priority) {
    fieldsToUpdate.priority = updates.priority;
  }

  if (updates.admin_notes !== undefined) {
    fieldsToUpdate.admin_notes = updates.admin_notes;
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .update(fieldsToUpdate)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const memIdx = fallbackLeads.findIndex(l => l.id === id);
        if (memIdx !== -1) {
          fallbackLeads[memIdx] = { ...fallbackLeads[memIdx], ...data };
        }
        return data as LeadRecord;
      }
    } catch (err) {
      console.error('[SUPABASE UPDATE ERROR]', err);
    }
  }

  const memIdx = fallbackLeads.findIndex(l => l.id === id);
  if (memIdx !== -1) {
    fallbackLeads[memIdx] = {
      ...fallbackLeads[memIdx],
      ...fieldsToUpdate
    };
    return fallbackLeads[memIdx];
  }

  return null;
}

export async function deleteLead(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (!error) {
        fallbackLeads = fallbackLeads.filter(l => l.id !== id);
        return true;
      }
    } catch (err) {
      console.error('[SUPABASE DELETE ERROR]', err);
    }
  }

  const initialLen = fallbackLeads.length;
  fallbackLeads = fallbackLeads.filter(l => l.id !== id);
  return fallbackLeads.length < initialLen;
}

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data: allLeads, error } = await supabase.from('leads').select('status, created_at');
      if (!error && allLeads) {
        return calculateStats(allLeads as { status: LeadStatus; created_at: string }[]);
      }
    } catch (err) {
      console.warn('[SUPABASE STATS ERROR, FALLING BACK]', err);
    }
  }

  return calculateStats(fallbackLeads);
}

function calculateStats(leads: { status: LeadStatus; created_at: string }[]): AdminStats {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).getTime();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  let total = leads.length;
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
    if (l.status === 'NEW') newLeads++;
    else if (l.status === 'CONTACTED') contacted++;
    else if (l.status === 'IN_PROGRESS') inProgress++;
    else if (l.status === 'QUALIFIED') qualified++;
    else if (l.status === 'CONVERTED') converted++;
    else if (l.status === 'CLOSED') closed++;
    else if (l.status === 'SPAM') spam++;

    const t = new Date(l.created_at).getTime();
    if (t >= startOfToday) todayCount++;
    if (t >= startOfWeek) weekCount++;
    if (t >= startOfMonth) monthCount++;
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

export async function exportLeadsToCSV(): Promise<string> {
  const { data } = await getLeads({ limit: 1000, sortBy: 'created_at', sortOrder: 'desc' });

  const headers = [
    'Lead ID',
    'Submission Date',
    'Full Name',
    'Email',
    'WhatsApp Number',
    'Company / Business',
    'Category',
    'Selected Bundle',
    'Service',
    'Project Requirement',
    'Remarks',
    'Page Source',
    'Status',
    'Priority',
    'Admin Notes',
    'Notification Status'
  ];

  const escapeCSV = (val: string | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = data.map(lead => [
    escapeCSV(lead.id),
    escapeCSV(new Date(lead.created_at).toLocaleString('en-IN')),
    escapeCSV(lead.full_name),
    escapeCSV(lead.email),
    escapeCSV(lead.whatsapp_number),
    escapeCSV(lead.business_company_name),
    escapeCSV(lead.category),
    escapeCSV(lead.selected_bundle),
    escapeCSV(lead.service),
    escapeCSV(lead.project_requirement),
    escapeCSV(lead.remarks),
    escapeCSV(lead.page_source),
    escapeCSV(lead.status),
    escapeCSV(lead.priority),
    escapeCSV(lead.admin_notes),
    escapeCSV(lead.notification_status)
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
