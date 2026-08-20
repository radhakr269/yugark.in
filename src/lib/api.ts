import { ContactFormData, LeadStatus, LeadPriority } from '../types';

const TOKEN_KEY = 'yugark_admin_token';

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('yugark_admin_auth');
}

export interface SubmitLeadResponse {
  success: boolean;
  leadId?: string;
  message?: string;
  error?: string;
  errors?: Record<string, string>;
}

export async function submitLead(formData: ContactFormData): Promise<SubmitLeadResponse> {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(formData)
    });

    let data: any = null;
    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      try {
        data = await res.json();
      } catch (jsonParseErr) {
        console.error('[API CLIENT] Error parsing JSON response:', jsonParseErr);
      }
    } else {
      const textOutput = await res.text();
      console.warn('[API CLIENT] Non-JSON API response:', res.status, textOutput.slice(0, 200));
      if (!res.ok) {
        return {
          success: false,
          error: `Server error (${res.status}): ${textOutput.slice(0, 160) || res.statusText || 'Unexpected server response'}`
        };
      }
    }

    if (!res.ok) {
      const errMessage =
        data?.error ||
        `Server returned error ${res.status}: ${res.statusText || 'Unable to process enquiry'}`;

      return {
        success: false,
        error: errMessage,
        errors: data?.errors
      };
    }

    if (data && data.success) {
      return {
        success: true,
        leadId: data.leadId,
        message: data.message || 'Your enquiry has been received successfully.'
      };
    }

    return {
      success: false,
      error: data?.error || 'Failed to submit enquiry. Please check your details and try again.'
    };
  } catch (err: any) {
    console.error('[API CLIENT EXCEPTION]', err);
    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
    return {
      success: false,
      error: isOffline
        ? 'You appear to be offline. Please check your internet connection.'
        : `Connection error: ${err?.message || 'Unable to reach backend service'}. You can also message us directly on WhatsApp.`
    };
  }
}

export async function adminLogin(
  email: string,
  passwordOrPin: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, password: passwordOrPin, pin: passwordOrPin })
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      // non-json response
    }

    if (!res.ok || !data?.success) {
      return {
        success: false,
        error: data?.error || `Authentication failed (${res.status}). Please check credentials.`
      };
    }

    if (data.token) {
      setAdminToken(data.token);
      localStorage.setItem('yugark_admin_auth', 'true');
    }

    return { success: true, token: data.token };
  } catch (err: any) {
    console.error('[ADMIN LOGIN CLIENT ERROR]', err);
    return { success: false, error: 'Failed to connect to authentication server.' };
  }
}

export async function adminLogout(): Promise<void> {
  try {
    const token = getAdminToken();
    if (token) {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  } catch (e) {
    // ignore
  } finally {
    clearAdminToken();
  }
}

export async function checkAdminSession(): Promise<{ authenticated: boolean; email?: string }> {
  const token = getAdminToken();
  if (!token) return { authenticated: false };

  try {
    const res = await fetch('/api/admin/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      return { authenticated: true, email: data.email };
    }
    clearAdminToken();
    return { authenticated: false };
  } catch {
    return { authenticated: false };
  }
}

export async function fetchAdminStats() {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthenticated');

  const res = await fetch('/api/admin/stats', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Failed to load stats (${res.status})`);
  }
  return res.json();
}

export interface FetchLeadsParams {
  search?: string;
  status?: string;
  priority?: string;
  category?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function fetchAdminLeads(params: FetchLeadsParams = {}) {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthenticated');

  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.status && params.status !== 'All') query.set('status', params.status);
  if (params.priority && params.priority !== 'All') query.set('priority', params.priority);
  if (params.category && params.category !== 'All') query.set('category', params.category);
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.sortBy) query.set('sortBy', params.sortBy);
  if (params.sortOrder) query.set('sortOrder', params.sortOrder);

  const res = await fetch(`/api/admin/leads?${query.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Failed to load leads (${res.status})`);
  }
  return res.json();
}

export async function fetchAdminLeadById(id: string) {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthenticated');

  const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Lead not found (${res.status})`);
  }
  return res.json();
}

export async function updateAdminLead(
  id: string,
  updates: { status?: LeadStatus; priority?: LeadPriority; admin_notes?: string }
) {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthenticated');

  const res = await fetch('/api/admin/leads', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ id, ...updates })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Failed to update lead (${res.status})`);
  }
  return res.json();
}

export async function deleteAdminLead(id: string) {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthenticated');

  const res = await fetch('/api/admin/leads', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ id })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Failed to delete lead (${res.status})`);
  }
  return res.json();
}

export async function downloadLeadsExcel() {
  const token = getAdminToken();

  // 1. Primary Method: Call backend endpoint /api/admin/export (which queries and exports all leads in DB)
  if (token) {
    try {
      const res = await fetch('/api/admin/export', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `YUGARK_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return;
      }
    } catch (err) {
      console.warn('[API EXPORT NETWORK ISSUE, ATTEMPTING FALLBACK TO FULL FETCH]', err);
    }
  }

  // 2. Client-side fallback only: Fetch ALL leads (never export only the current paginated page)
  let allLeads: any[] | null = null;
  if (token) {
    try {
      const allData = await fetchAdminLeads({ limit: 5000 });
      if (allData?.leads && allData.leads.length > 0) {
        allLeads = allData.leads;
      }
    } catch (fetchErr) {
      console.warn('[FAILED TO FETCH ALL LEADS FOR FALLBACK]', fetchErr);
    }
  }

  // If running in local client-only storage mode
  if (!allLeads || allLeads.length === 0) {
    try {
      const { getStoredEnquiries } = await import('./enquiryStore');
      const stored = getStoredEnquiries();
      if (stored && stored.length > 0) {
        allLeads = stored;
      }
    } catch {
      // ignore
    }
  }

  // If all leads were retrieved, generate .xlsx file
  if (allLeads && allLeads.length > 0) {
    const XLSX = await import('xlsx');
    const rows = allLeads.map((lead: any) => ({
      'Submission Date & Time': new Date(lead.created_at || lead.createdAt || Date.now()).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      'Full Name': lead.full_name || lead.fullName || '',
      'Email Address': lead.email || '',
      'Phone / WhatsApp Number': lead.whatsapp_number || lead.phone || '',
      'Business / Company Name': lead.business_company_name || lead.businessName || '',
      'Business Category': lead.other_category || lead.otherCategory
        ? `${lead.category || lead.businessCategory} (${lead.other_category || lead.otherCategory})`
        : (lead.category || lead.businessCategory || ''),
      'Selected Service / Package': lead.selected_bundle || lead.selectedBundle || lead.service || lead.selectedService || '',
      'Project Requirement': lead.project_requirement || lead.projectRequirement || '',
      'Remarks / Notes': lead.remarks || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet['!cols'] = [
      { wch: 24 }, // Submission Date & Time
      { wch: 22 }, // Full Name
      { wch: 26 }, // Email Address
      { wch: 22 }, // Phone / WhatsApp Number
      { wch: 26 }, // Business / Company Name
      { wch: 24 }, // Business Category
      { wch: 38 }, // Selected Service / Package
      { wch: 45 }, // Project Requirement
      { wch: 30 }  // Remarks / Notes
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Website Leads');
    XLSX.writeFile(workbook, `YUGARK_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`);
  } else {
    // If fetching all leads fails, show an error instead of exporting partial paginated page
    throw new Error('Failed to export leads. Could not retrieve full leads dataset from the server.');
  }
}

export const downloadLeadsCSV = downloadLeadsExcel;
