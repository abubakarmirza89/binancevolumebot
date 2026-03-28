# 451 Error - Vercel IP Blocked by Binance

## Problem
Vercel's IP addresses are in regions where Binance has geographic restrictions. You'll see:
```
POST /api/proxy 451 (Unavailable For Legal Reasons)
```

## Solutions

### Option 1: Use Binance Testnet (Recommended for Testing)
Testnet is usually not restricted. Change in your bot settings:
- Use `demo-fapi.binance.com` instead of `fapi.binance.com`
- Get testnet API keys: https://testnet.binancefuture.com

### Option 2: Run Bot Locally (Best for Production)
Deploy on your own machine with Node.js:

```bash
# Install Node.js from https://nodejs.org/

# In your project folder:
npm install express
node server.js  # Create a simple express server

# Then access: http://localhost:3000
```

### Option 3: Use a Residential Proxy Service
Services like Bright Data, Oxylabs, or Smartproxy can bypass geographic blocks.
- Cost: $5-20/month typically
- Setup: Add proxy URL in bot settings

### Option 4: Use Different Vercel Region
Some Vercel regions may not be blocked. You can:
1. Go to Vercel dashboard
2. Project Settings → Region
3. Try different regions (Asia, US, EU)
4. Redeploy

## Fastest Fix Right Now
**Use testnet credentials:**
1. Create testnet account: https://testnet.binancefuture.com
2. Generate testnet API keys
3. Paste in bot
4. Bot will work perfectly for testing

This is ideal for development and practice before going live on mainnet.

## For Production
Deploy locally on your server/VPS to avoid Vercel restrictions entirely.
