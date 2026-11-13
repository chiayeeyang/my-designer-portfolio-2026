# NMDP case-study access

The homepage cover is public. The case-study route checks `/api/nmdp-access` before loading its separate JavaScript/CSS bundle. Routing middleware protects the `Nmdp-*` bundle and `/images/nmdp-research/` files. Sessions use an encrypted, HTTP-only cookie with an eight-hour lifetime.

Set these server-only values in `.env.local` for development and in the Vercel project's Production/Preview environment before deploying:

- `NMDP_PASSWORD`: the case-study password chosen by the portfolio owner.
- `NMDP_SESSION_SECRET`: a separate random secret of at least 32 characters. Generate one with `node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"`.

Do not prefix either variable with `VITE_` or commit their values. The local preview is already configured in the ignored `.env.local`. Without both values, production access fails closed. Redeploy after configuring Vercel environment variables.

Run `node --test tests/nmdp-access.test.mjs` and `pnpm build`. Vite's build guard rejects output that places the case-study code in a public chunk. Both `pnpm dev` and `pnpm preview` use the same local access handler.

The built-in login throttle is per server instance. A short shared portfolio password is suitable for a viewing gate; it is not an account-based confidentiality boundary. Historical deployments and the public source repository are outside this gate.
