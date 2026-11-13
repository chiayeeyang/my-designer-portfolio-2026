import { createHash, timingSafeEqual } from 'node:crypto';
import { authorized, configured, cookie, sessionCookie, PRIVATE_CACHE } from '../server/nmdp-session.js';

// Bounded per-instance throttling supplements the deployment's platform controls.
const attempts = new Map();
const WINDOW_MS = 10 * 60 * 1000;

function reply(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

async function readBody(req) {
  if (req.body !== undefined) {
    if (JSON.stringify(req.body).length > 2048) throw new Error('Body too large');
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 2048) throw new Error('Body too large');
  }
  return JSON.parse(body);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', PRIVATE_CACHE);
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (!['GET', 'POST', 'DELETE'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST, DELETE');
    return reply(res, 405, { error: 'Method not allowed' });
  }
  if (req.method !== 'GET' && req.headers.origin) {
    try {
      if (new URL(req.headers.origin).host !== req.headers.host) return reply(res, 403, { error: 'Request not allowed' });
    } catch { return reply(res, 403, { error: 'Request not allowed' }); }
  }
  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', cookie('', 0));
    return reply(res, 200, { authenticated: false });
  }
  if (!configured()) return reply(res, 503, { error: 'Access temporarily unavailable' });
  if (req.method === 'GET') return reply(res, 200, { authenticated: await authorized(req.headers.cookie) });

  const now = Date.now();
  const client = req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
  for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
  const entry = attempts.get(client) || { count: 0, until: now + WINDOW_MS };
  if (entry.count >= 8) {
    res.setHeader('Retry-After', Math.ceil((entry.until - now) / 1000));
    return reply(res, 429, { error: 'Too many attempts' });
  }
  entry.count += 1;
  if (attempts.size < 2000 || attempts.has(client)) attempts.set(client, entry);
  if (!req.headers['content-type']?.startsWith('application/json')) return reply(res, 415, { error: 'JSON required' });
  let password;
  try { ({ password } = await readBody(req)); } catch { return reply(res, 400, { error: 'Invalid request' }); }
  if (typeof password !== 'string' || password.length > 128) return reply(res, 400, { error: 'Invalid request' });
  const digest = value => createHash('sha256').update(value).digest();
  if (!timingSafeEqual(digest(password), digest(process.env.NMDP_PASSWORD))) {
    return reply(res, 401, { error: 'Incorrect password' });
  }
  attempts.delete(client);
  res.setHeader('Set-Cookie', await sessionCookie());
  return reply(res, 200, { authenticated: true });
}
