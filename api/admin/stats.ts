import { extractAdminSession } from '../../server/auth.js';
import { getAdminStats } from '../../server/db.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  const session = extractAdminSession(req);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Admin authentication token is required or expired.'
    });
  }

  try {
    const stats = await getAdminStats();
    return res.status(200).json({ success: true, stats });
  } catch (err: any) {
    console.error('[API ADMIN STATS ERROR]', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to compute administrative statistics.'
    });
  }
}
