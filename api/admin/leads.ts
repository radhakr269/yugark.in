import { extractAdminSession } from '../../server/auth';
import { getLeads, getLeadById, updateLead, deleteLead } from '../../server/db';
import { LeadStatus, LeadPriority } from '../../server/types';

async function parseBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      resolve({});
    });
  });
}

export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  const session = extractAdminSession(req);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Admin authentication token is required or expired.'
    });
  }

  const query = req.query || {};
  // Extract id from query if present (e.g. ?id=YG-2026-001001 or URL path)
  const idFromUrl = (req.url || '').split('/leads/')[1]?.split('?')[0];
  const leadId = (query.id || idFromUrl || '').trim();

  // GET: List leads or single lead
  if (req.method === 'GET') {
    try {
      if (leadId) {
        const lead = await getLeadById(leadId);
        if (!lead) {
          return res.status(404).json({ success: false, error: 'Lead not found.' });
        }
        return res.status(200).json({ success: true, lead });
      }

      const result = await getLeads({
        search: query.search ? String(query.search) : undefined,
        status: query.status ? String(query.status) : undefined,
        priority: query.priority ? String(query.priority) : undefined,
        category: query.category ? String(query.category) : undefined,
        page: query.page ? Number(query.page) : 1,
        limit: query.limit ? Number(query.limit) : 20,
        sortBy: (query.sortBy as any) || 'created_at',
        sortOrder: query.sortOrder === 'asc' ? 'asc' : 'desc'
      });

      return res.status(200).json({
        success: true,
        ...result
      });
    } catch (err: any) {
      console.error('[API ADMIN GET LEADS ERROR]', err);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch lead records.'
      });
    }
  }

  // PATCH: Update status, priority, or admin notes
  if (req.method === 'PATCH') {
    try {
      const body = await parseBody(req);
      const targetId = (leadId || body.id || '').trim();

      if (!targetId) {
        return res.status(400).json({ success: false, error: 'Missing lead ID to update.' });
      }

      const { status, priority, admin_notes } = body;
      const validStatuses: LeadStatus[] = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'QUALIFIED', 'CONVERTED', 'CLOSED', 'SPAM'];
      const validPriorities: LeadPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

      if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      }

      if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ success: false, error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}` });
      }

      const updated = await updateLead(targetId, {
        status,
        priority,
        admin_notes
      });

      if (!updated) {
        return res.status(404).json({ success: false, error: 'Lead record not found or could not be updated.' });
      }

      return res.status(200).json({ success: true, lead: updated });
    } catch (err: any) {
      console.error('[API ADMIN PATCH LEAD ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to update lead record.' });
    }
  }

  // DELETE: Remove lead
  if (req.method === 'DELETE') {
    try {
      const body = await parseBody(req);
      const targetId = (leadId || body?.id || '').trim();

      if (!targetId) {
        return res.status(400).json({ success: false, error: 'Missing lead ID to delete.' });
      }

      const deleted = await deleteLead(targetId);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Lead record not found or could not be removed.' });
      }

      return res.status(200).json({ success: true, message: `Lead ${targetId} removed successfully.` });
    } catch (err: any) {
      console.error('[API ADMIN DELETE LEAD ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to delete lead.' });
    }
  }

  return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed.` });
}
