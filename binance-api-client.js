/**
 * Binance API Client with Proxy Support for Vercel
 * Replaces direct fetch calls with proxied requests
 */

const PROXY_URL = '/api/proxy';
const USE_PROXY = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

async function hmacSha256(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function getBase(env) {
  if (USE_PROXY) return '';
  return env === 'testnet'
    ? 'https://demo-fapi.binance.com'
    : 'https://fapi.binance.com';
}

async function proxyFetch(method, path, env, params = {}, useProxy = USE_PROXY) {
  if (!useProxy) {
    // Direct fetch (for local testing)
    const baseUrl = getBase(env);
    const qs = Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    const url = baseUrl + path + (qs ? '?' + qs : '');
    const opts = { method, headers: { 'User-Agent': 'binance-volume-bot/1.0.0' } };
    const res = await fetch(url, opts);
    return res.json();
  } else {
    // Proxied fetch (for Vercel)
    const qs = Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    const fullPath = path + (qs ? '?' + qs : '');
    
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: method,
        path: fullPath,
        env: env,
        headers: {}
      })
    });
    return res.json();
  }
}

async function signedProxyFetch(method, path, env, params = {}, apiKey, secretKey, useProxy = USE_PROXY) {
  params.timestamp = Date.now();
  params.recvWindow = 5000;

  const qs = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  
  const signature = await hmacSha256(secretKey, qs);
  
  if (!useProxy) {
    // Direct fetch
    const baseUrl = getBase(env);
    const url = baseUrl + path;
    const headers = {
      'X-MBX-APIKEY': apiKey,
      'User-Agent': 'binance-volume-bot/1.0.0'
    };

    let opts = {};
    if (method === 'GET' || method === 'DELETE') {
      opts = {
        method: method,
        headers: headers
      };
      const fullUrl = url + '?' + qs + '&signature=' + signature;
      const res = await fetch(fullUrl, opts);
      const data = await res.json();
      if (data.code && data.code < 0) throw new Error(`[${data.code}] ${data.msg}`);
      return data;
    } else {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      opts = {
        method: method,
        headers: headers,
        body: qs + '&signature=' + signature
      };
      const res = await fetch(url, opts);
      const data = await res.json();
      if (data.code && data.code < 0) throw new Error(`[${data.code}] ${data.msg}`);
      return data;
    }
  } else {
    // Proxied fetch
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: method,
        path: path + '?' + qs + '&signature=' + signature,
        env: env,
        headers: {
          'X-MBX-APIKEY': apiKey
        }
      })
    });
    const data = await res.json();
    if (data.code && data.code < 0) throw new Error(`[${data.code}] ${data.msg}`);
    return data;
  }
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { proxyFetch, signedProxyFetch, hmacSha256 };
}
