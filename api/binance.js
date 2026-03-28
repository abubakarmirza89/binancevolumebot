const crypto = require('crypto');

/**
 * Vercel Serverless Function: CORS Proxy for Binance API
 * Handles both public and signed requests
 */

async function fetchBinanceAPI(method, fullPath, env, headers = {}, body = null) {
  const host = env === 'testnet' 
    ? 'demo-fapi.binance.com' 
    : 'fapi.binance.com';

  return new Promise((resolve, reject) => {
    const https = require('https');
    
    const url = new URL(`https://${host}${fullPath}`);
    
    const options = {
      hostname: host,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        ...headers
      },
      timeout: 30000
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: parsed
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: { error: data }
          });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (body && (method === 'POST' || method === 'PUT' || method === 'DELETE')) {
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      req.write(bodyStr);
    }

    req.end();
  });
}

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-MBX-APIKEY, X-API-SECRET, X-REQUEST-PATH, X-REQUEST-ENV');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const {
      method = 'GET',
      path,
      env = 'mainnet',
      headers: customHeaders = {},
      body,
      signature
    } = req.body || {};

    if (!path) {
      res.status(400).json({ 
        error: 'Missing path',
        received: req.body 
      });
      return;
    }

    // Merge headers
    const headers = {
      ...customHeaders
    };

    // Make request
    const result = await fetchBinanceAPI(
      method,
      path,
      env,
      headers,
      body
    );

    // Return response
    if (result.status >= 400) {
      res.status(result.status).json(result.data);
    } else {
      res.status(result.status).json(result.data);
    }

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      error: 'Proxy error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
