import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { sealData } from 'iron-session';
import handler from '../api/nmdp-access.js';
import middleware from '../middleware.js';
import { authorized, COOKIE_NAME, SESSION_TTL } from '../server/nmdp-session.js';

await test('NMDP password access', async t => {
process.env.NMDP_PASSWORD = '0017';
process.env.NMDP_SESSION_SECRET = randomBytes(48).toString('base64url');
const server = createServer(handler);
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
t.after(() => server.close());
const post = (password, ip = 'login') => fetch(`${base}/api/nmdp-access`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-real-ip': ip }, body: JSON.stringify({ password }) });

await t.test('incorrect password stays locked; correct password issues an HTTP-only session', async () => {
  assert.equal((await post('wrong')).status, 401);
  assert.equal((await post(17)).status, 400);
  process.env.VERCEL = '1';
  const login = await post('0017');
  delete process.env.VERCEL;
  assert.equal(login.status, 200);
  const setCookie = login.headers.get('set-cookie');
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /Secure/);
  assert.match(setCookie, /SameSite=Lax/);
  assert.ok(!setCookie.includes('0017'));
  const cookie = setCookie.split(';')[0];
  const status = await fetch(`${base}/api/nmdp-access`, { headers: { cookie } });
  assert.deepEqual(await status.json(), { authenticated: true });
  assert.match(status.headers.get('cache-control'), /no-store/);
  assert.equal(await authorized(`${COOKIE_NAME}=forged`), false);
  const protectedResponse = await middleware(new Request('https://portfolio.test/assets/Nmdp-example.js', { headers: { cookie } }));
  assert.equal(protectedResponse.headers.get('x-middleware-next'), '1');
  assert.match(protectedResponse.headers.get('cache-control'), /no-store/);
  const logout = await fetch(`${base}/api/nmdp-access`, { method: 'DELETE', headers: { cookie } });
  assert.match(logout.headers.get('set-cookie'), /Max-Age=0/);
});

await t.test('research assets and case-study chunks deny unauthenticated requests', async () => {
  for (const path of ['/assets/Nmdp-example.js', '/assets/Nmdp-example.css', '/images/nmdp-research/campus-tabling.jpg']) {
    const response = await middleware(new Request(`https://portfolio.test${path}`));
    assert.equal(response.status, 401, path);
    assert.match(response.headers.get('cache-control'), /no-store/);
  }
  const cover = await middleware(new Request('https://portfolio.test/images/nmdp-cover.png'));
  assert.equal(cover.headers.get('x-middleware-next'), '1');
});

await t.test('expired and wrong-scope sessions are rejected', async () => {
  for (const data of [{ scope: 'nmdp', expiresAt: Date.now() - 1000 }, { scope: 'other', expiresAt: Date.now() + 60000 }]) {
    const token = await sealData(data, { password: process.env.NMDP_SESSION_SECRET, ttl: SESSION_TTL });
    assert.equal(await authorized(`${COOKIE_NAME}=${encodeURIComponent(token)}`), false);
  }
});

await t.test('cross-origin requests and unsupported methods are rejected', async () => {
  const crossOrigin = await fetch(`${base}/api/nmdp-access`, { method: 'POST', headers: { Origin: 'https://another-site.test', 'Content-Type': 'application/json' }, body: JSON.stringify({ password: '0017' }) });
  assert.equal(crossOrigin.status, 403);
  assert.equal((await fetch(`${base}/api/nmdp-access`, { method: 'PUT' })).status, 405);
});

await t.test('repeated guesses are throttled', async () => {
  for (let attempt = 0; attempt < 8; attempt++) assert.equal((await post('wrong', 'rate-limit')).status, 401);
  const limited = await post('wrong', 'rate-limit');
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get('retry-after')) > 0);
});

await t.test('missing production configuration fails closed', async () => {
  const secret = process.env.NMDP_SESSION_SECRET;
  delete process.env.NMDP_SESSION_SECRET;
  assert.equal((await fetch(`${base}/api/nmdp-access`)).status, 503);
  assert.equal(await authorized(''), false);
  process.env.NMDP_SESSION_SECRET = secret;
});

});
