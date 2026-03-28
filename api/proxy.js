// Binance API Proxy for Vercel with Fallback
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-MBX-APIKEY, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { url, method = 'GET', headers = {}, body } = req.body || {};

    if (!url) {
      return res.status(400).json({ error: 'Missing url' });
    }

    if (!url.includes('binance.com')) {
      return res.status(403).json({ error: 'Only Binance allowed' });
    }

    // Try direct fetch first
    const directFetch = async () => {
      const fetchHeaders = {
        'User-Agent': 'TradingBot/1.0',
        'Accept': 'application/json',
        ...headers
      };

      const opts = { method, headers: fetchHeaders, timeout: 15000 };
      if (body && ['POST', 'PUT'].includes(method)) {
        opts.body = typeof body === 'string' ? body : JSON.stringify(body);
      }

      return fetch(url, opts);
    };

    // Try fallback CORS proxy if direct fails
    const corsProxyFetch = async () => {
      const corsUrl = CORS_PROXY + encodeURIComponent(url);
      return fetch(corsUrl, { 
        method: 'GET',
        headers: { 'User-Agent': 'TradingBot/1.0' }
      });
    };

    let response;
    try {
      response = await directFetch();
      if (response.status === 451) throw new Error('Blocked by Binance');
    } catch (e) {
      if (method === 'GET') {
        response = await corsProxyFetch();
      } else {
        throw e;
      }
    }

    const contentType = response.headers.get('content-type');
    let responseData;

    if (contentType?.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(response.status || 200).json({
      status: response.status || 200,
      data: responseData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Cannot reach Binance API',
      hint: 'Use testnet or provide API keys for direct requests',
      message: error.message
    });
  }
}
