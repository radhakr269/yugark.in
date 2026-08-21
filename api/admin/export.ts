import { extractAdminSession } from '../../server/auth.js';
import { exportLeadsToExcelBuffer } from '../../server/db.js';

export default async function handler(req: any, res: any) {
  const session = extractAdminSession(req);
  if (!session) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Admin authentication token is required or expired.'
    });
  }

  try {
    const query = req.query || {};
    const excelBuffer = await exportLeadsToExcelBuffer({
      search: query.search ? String(query.search) : undefined,
      client: query.client ? String(query.client) : undefined,
      status: query.status && query.status !== 'All' ? String(query.status) : undefined,
      priority: query.priority && query.priority !== 'All' ? String(query.priority) : undefined,
      category: query.category && query.category !== 'All' ? String(query.category) : undefined,
      source: query.source && query.source !== 'All' ? String(query.source) : undefined,
      service: query.service && query.service !== 'All' ? String(query.service) : undefined,
      fromDate: query.fromDate ? String(query.fromDate) : undefined,
      toDate: query.toDate ? String(query.toDate) : undefined,
      sortBy: (query.sortBy as any) || 'created_at',
      sortOrder: query.sortOrder === 'asc' ? 'asc' : 'desc'
    });
    const filename = `YUGARK_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`;
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(excelBuffer);
  } catch (err: any) {
    console.error('[API ADMIN EXPORT ERROR]', err);
    const message = err?.message || 'Failed to generate Excel export.';
    const statusCode = message.includes('No matching live leads') ? 404 : 500;
    res.setHeader('Content-Type', 'application/json');
    return res.status(statusCode).json({
      success: false,
      error: message
    });
  }
}

