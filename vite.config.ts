// @ts-nocheck
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom Vite plugin to handle /api requests locally during development
const apiMockPlugin = () => {
  return {
    name: 'api-mock',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method === 'POST') {
          // Ensure fresh environment variables in dev
          const env = loadEnv('development', process.cwd(), '');
          Object.assign(process.env, env);

          // Dynamic import to prevent Vite build issues
          const handler = await import('./api/chat.js');

          // Simple body parser for the mock
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};

              // Mock Vercel res methods
              res.status = (code) => {
                res.statusCode = code;
                return res;
              };
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              };

              await handler.default(req, res);
            } catch (err) {
              console.error('[DEV API ERROR]', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
            }
          });
        } else {
          next();
        }
      });
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);
  return {
    plugins: [react(), tailwindcss(), apiMockPlugin()],
  };
});
