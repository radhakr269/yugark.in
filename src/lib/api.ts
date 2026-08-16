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

export async function downloadLeadsCSV() {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthenticated');

  const res = await fetch('/api/admin/export', {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) throw new Error('Failed to export CSV');
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `yugark_leads_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
