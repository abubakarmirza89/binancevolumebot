// Binance API Proxy for Vercel - Optimized for Reliability
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
      return res.status(400).json({ error: 'Missing url parameter' });
    }

    if (!url.includes('binance.com')) {
      return res.status(403).json({ error: 'Only Binance API allowed' });
    }

    const fetchHeaders = {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      ...headers
    };

    const fetchOptions = {
      method,
      headers: fetchHeaders,
      timeout: 30000
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    const contentType = response.headers.get('content-type');
    let responseData;

    if (contentType?.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).json({
      status: response.status,
      data: responseData
    });

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy request failed',
      message: error.message,
      hint: 'Make sure your API key and secret are correct'
    });
  }
}
