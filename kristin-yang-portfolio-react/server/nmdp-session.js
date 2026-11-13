import { sealData, unsealData } from 'iron-session';

export const COOKIE_NAME = 'nmdp_access';
export const SESSION_TTL = 8 * 60 * 60;
export const PRIVATE_CACHE = 'private, no-store, max-age=0';

export function configured() {
  return Boolean(process.env.NMDP_PASSWORD && process.env.NMDP_SESSION_SECRET?.length >= 32);
}

export function protectedPath(pathname) {
  return pathname.startsWith('/images/nmdp-research/') || /^\/assets\/Nmdp-/.test(pathname);
}

export async function authorized(cookieHeader = '') {
  if (!configured()) return false;
  try {
    const item = cookieHeader.split(';').map(part => part.trim()).find(part => part.startsWith(`${COOKIE_NAME}=`));
    if (!item) return false;
    const session = await unsealData(decodeURIComponent(item.slice(COOKIE_NAME.length + 1)), { password: process.env.NMDP_SESSION_SECRET, ttl: SESSION_TTL });
    return session.scope === 'nmdp' && session.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export async function sessionCookie() {
  const token = await sealData({ scope: 'nmdp', expiresAt: Date.now() + SESSION_TTL * 1000 }, { password: process.env.NMDP_SESSION_SECRET, ttl: SESSION_TTL });
  return cookie(token, SESSION_TTL - 60);
}

export function cookie(value, maxAge) {
  // Local Vite development uses HTTP; deployed Vercel sessions always use HTTPS.
  return `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${process.env.VERCEL ? '; Secure' : ''}`;
}
