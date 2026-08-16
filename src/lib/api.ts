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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Failed to submit enquiry. Please try again.',
        errors: data.errors
      };
    }

    return {
      success: true,
      leadId: data.leadId,
      message: data.message
    };
  } catch (err: any) {
    console.error('[API CLIENT ERROR]', err);
    return {
      success: false,
      error: 'Network connection issue. Please check your internet or connect with us on WhatsApp directly.'
    };
  }
}

export async function adminLogin(email: string, passwordOrPin: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: passwordOrPin, pin: passwordOrPin })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        error: data.error || 'Invalid admin credentials.'
      };
    }

    if (data.token) {
      setAdminToken(data.token);
      localStorage.setItem('yugark_admin_auth', 'true');
    }

    return { success: true, token: data.token };
  } catch (err) {
    return { success: false, error: 'Failed to connect to authentication service.' };
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
  if (!res.ok) throw new Error('Failed to load stats');
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

  if (!res.ok) throw new Error('Failed to load leads');
  return res.json();
}

export async function fetchAdminLeadById(id: string) {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthenticated');

  const res = await fetch(`/api/admin/leads/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) throw new Error('Lead not found');
  return res.json();
}

export async function updateAdminLead(id: string, updates: { status?: LeadStatus; priority?: LeadPriority; admin_notes?: string }) {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthenticated');

  const res = await fetch(`/api/admin/leads/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });

  if (!res.ok) throw new Error('Failed to update lead');
  return res.json();
}

export async function deleteAdminLead(id: string) {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthenticated');

  const res = await fetch(`/api/admin/leads/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) throw new Error('Failed to delete lead');
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
