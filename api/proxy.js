// Binance API Proxy for Vercel
// Handles CORS and API requests

const https = require('https');

const BINANCE_BASE = {
  mainnet: 'https://fapi.binance.com',
  testnet: 'https://demo-fapi.binance.com'
};

function makeRequest(method, hostname, path, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const requestHeaders = {
      'User-Agent': 'binance-volume-bot/1.0.0',
      'Accept': 'application/json',
      ...headers
    };

    if (data && method !== 'GET' && method !== 'DELETE') {
      requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    const url = new URL(`https://${hostname}${path}`);
    
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: method,
      headers: requestHeaders,
      timeout: 30000
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: JSON.parse(body)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (data && method !== 'GET' && method !== 'DELETE') {
      req.write(data);
    }

    req.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-MBX-APIKEY');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method = 'GET', path, env = 'mainnet', headers, body } = req.body || {};

  if (!path) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  const baseUrl = BINANCE_BASE[env] || BINANCE_BASE.mainnet;
  const urlObj = new URL(baseUrl + path);
  const hostname = urlObj.hostname;
  const pathWithQuery = urlObj.pathname + urlObj.search;

  try {
    const response = await makeRequest(
      method,
      hostname,
      pathWithQuery,
      body ? JSON.stringify(body).replace(/"/g, (m, i) => 
        method === 'POST' && body[Object.keys(body)[0]] ? m : JSON.stringify(body)
      ) : null,
      headers || {}
    );

    if (response.status >= 400) {
      res.status(response.status).json(response.body);
    } else {
      res.status(response.status).json(response.body);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy request failed',
      message: error.message 
    });
  }
};
