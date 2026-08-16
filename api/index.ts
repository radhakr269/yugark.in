// YUGARK Digital Studio API Gateway
export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    status: 'ok',
    service: 'YUGARK Digital Studio Serverless API Gateway',
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /api/leads',
      'GET /api/health',
      'POST /api/admin/login',
      'GET /api/admin/me',
      'POST /api/admin/logout',
      'GET /api/admin/stats',
      'GET /api/admin/leads',
      'GET /api/admin/export'
    ]
  });
}
