import { verifyAdminCredentials, createAdminToken } from '../../server/auth';

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

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = await parseBody(req);
    const { email, password, pin } = body || {};
    const pass = password || pin;

    const authResult = verifyAdminCredentials(email, pass);

    if (!authResult.valid || !authResult.email) {
      return res.status(401).json({
        success: false,
        error: 'Invalid administrator credentials. Please check email and password/PIN.'
      });
    }

    const token = createAdminToken(authResult.email);

    return res.status(200).json({
      success: true,
      token,
      admin: {
        email: authResult.email,
        role: 'admin'
      }
    });
  } catch (err: any) {
    console.error('[API ADMIN LOGIN ERROR]', err);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred during authentication.'
    });
  }
}
