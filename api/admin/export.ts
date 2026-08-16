import { extractAdminSession } from '../../server/auth';
import { exportLeadsToCSV } from '../../server/db';

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
    const csvData = await exportLeadsToCSV();
    const filename = `yugark_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(csvData);
  } catch (err: any) {
    console.error('[API ADMIN EXPORT ERROR]', err);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      success: false,
      error: 'Failed to generate CSV export.'
    });
  }
}
