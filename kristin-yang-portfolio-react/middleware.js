import { next } from '@vercel/functions';
import { authorized, protectedPath, PRIVATE_CACHE } from './server/nmdp-session.js';

export const config = {
  runtime: 'nodejs',
  matcher: ['/assets/:path*', '/images/nmdp-research/:path*'],
};

export default async function middleware(request) {
  if (!protectedPath(new URL(request.url).pathname)) return next();
  const headers = { 'Cache-Control': PRIVATE_CACHE, 'Vercel-CDN-Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' };
  if (!await authorized(request.headers.get('cookie') || '')) {
    return new Response('Password required', { status: 401, headers });
  }
  return next({ headers });
}
