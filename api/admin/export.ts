import { extractAdminSession } from '../../server/auth';
import { exportLeadsToExcelBuffer } from '../../server/db';

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
    const excelBuffer = await exportLeadsToExcelBuffer(req.query || {});
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
