import { extractAdminSession } from '../../server/auth';

export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  const session = extractAdminSession(req);
  if (!session) {
    return res.status(401).json({
      authenticated: false,
      error: 'Unauthorized: Admin authentication token is required or expired.'
    });
  }

  return res.status(200).json({
    authenticated: true,
    email: session.email,
    role: session.role
  });
}
