#!/usr/bin/env node
// Local Bot Server - Run on your PC or VPS
// No Vercel restrictions!

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Simple HTTP server
const createServer = () => {
  const requestHandler = (req, res) => {
    // CORS headers for everyone
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-MBX-APIKEY');

    if (req.method === 'OPTIONS') {
      return res.writeHead(200).end();
    }

    // Proxy endpoint
    if (req.url === '/api/proxy' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const data = JSON.parse(body);
          const { url, method = 'GET', headers = {}, body: reqBody } = data;

          if (!url || !url.includes('binance.com')) {
            return res.writeHead(403, { 'Content-Type': 'application/json' })
              .end(JSON.stringify({ error: 'Only Binance allowed' }));
          }

          const fetchHeaders = {
            'User-Agent': 'TradingBot/1.0',
            'Accept': 'application/json',
            ...headers
          };

          const fetchOpts = { method, headers: fetchHeaders };
          if (reqBody && ['POST', 'PUT'].includes(method)) {
            fetchOpts.body = typeof reqBody === 'string' ? reqBody : JSON.stringify(reqBody);
          }

          const response = await fetch(url, fetchOpts);
          const contentType = response.headers.get('content-type');
          let responseData;

          if (contentType?.includes('application/json')) {
            responseData = await response.json();
          } else {
            responseData = await response.text();
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: response.status,
            data: responseData
          }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // Users endpoint
    if (req.url === '/api/users' && req.method === 'GET') {
      try {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json')));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(users));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ users: [] }));
      }
    }

    // Serve static files
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('<h1>404 Not Found</h1>');
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.jpg': 'image/jpeg'
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        return res.end('Server error');
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  };

  return http.createServer(requestHandler);
};

// Start server
const PORT = process.env.PORT || 3000;
const server = createServer();

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║   🤖 Binance Volume Bot - Local Mode  ║
╚════════════════════════════════════════╝

✓ Server running on: http://localhost:${PORT}
✓ Binance API: Direct access (no 451 blocks!)
✓ CORS: Enabled for all origins
✓ Users: Load from data/users.json

To access from outside:
- Use your public IP: http://YOUR_PUBLIC_IP:${PORT}
- Or setup tunnel: npx ngrok http ${PORT}
- Or deploy to Railway/Render

Press Ctrl+C to stop
  `);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
