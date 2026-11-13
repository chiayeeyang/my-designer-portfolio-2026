import { loadEnv } from 'vite';
import handler from '../api/nmdp-access.js';
import { authorized, protectedPath, PRIVATE_CACHE } from './nmdp-session.js';

function install(server) {
  server.middlewares.use(async (req, res, next) => {
    try {
      const pathname = new URL(req.url, 'http://localhost').pathname;
      if (pathname === '/api/nmdp-access') return await handler(req, res);
      if (protectedPath(pathname)) {
        res.setHeader('Cache-Control', PRIVATE_CACHE);
        if (!await authorized(req.headers.cookie)) {
          res.statusCode = 401;
          return res.end('Password required');
        }
      }
      next();
    } catch {
      res.statusCode = 500;
      res.end('Access temporarily unavailable');
    }
  });
}

export function nmdpAccess() {
  return {
    name: 'nmdp-access',
    configResolved(config) {
      // Only the local server reads these values; neither has Vite's public prefix.
      const env = loadEnv(config.mode, config.root, 'NMDP_');
      for (const key of ['NMDP_PASSWORD', 'NMDP_SESSION_SECRET']) if (env[key]) process.env[key] = env[key];
    },
    configureServer: install,
    configurePreviewServer: install,
    generateBundle(_options, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== 'chunk') continue;
        const hasPrivateCode = Object.keys(output.modules).some(id => /\/src\/(pages\/Nmdp\.jsx|components\/(nmdp-(?!preview|access-cover)[^/]+|donor-journey)[^/]*|lib\/nmdp-content\.js)/.test(id));
        if (hasPrivateCode && !protectedPath(`/${output.fileName}`)) {
          throw new Error(`NMDP content must stay in a protected chunk: ${output.fileName}`);
        }
      }
    },
  };
}
