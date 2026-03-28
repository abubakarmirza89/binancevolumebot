# Binance Volume Bot - Vercel Deployment Guide

## 🚀 Quick Start

This is a **Vercel-ready** deployment of the Binance Volume Bot. The proxy setup ensures API calls work without CORS issues.

### Files Structure
```
binancevolumebot/
├── index.html              # Main bot frontend
├── api/
│   ├── proxy.js           # CORS Proxy for Binance API
│   └── binance.js         # Binance-specific proxy handler
├── binance-api-client.js  # API client (optional, for reference)
├── package.json           # Node.js dependencies
├── vercel.json            # Vercel configuration
└── README.md              # This file
```

## 📋 Prerequisites

1. **GitHub Account** - For repository hosting
2. **Vercel Account** - Free tier works perfectly (https://vercel.com)
3. **Binance API Keys** - Get from https://www.binance.com/en/usersupport/faq/360002502072

### Binance API Key Setup
1. Go to Binance API Management
2. Create a new API Key for **Futures Trading**
3. **IMPORTANT**: 
   - ✅ Enable "Futures User Stream"
   - ✅ Enable "Can do Withdraw & Transfer" (make it read-only or limited)
   - ✅ Restrict to your IP (get it from the app)
   - ❌ Never use Admin Restricted API Key
   - ❌ Turn off transfer permissions if possible

## 🔧 Deployment to Vercel

### Method 1: Direct GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Binance Volume Bot"
   git remote add origin https://github.com/YOUR_USERNAME/binancevolumebot.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select project: `binancevolumebot`
   - Vercel will auto-detect it's a Node.js project
   - Click "Deploy"

3. **Access Your Bot**
   ```
   https://YOUR_PROJECT_NAME.vercel.app
   ```

### Method 2: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

## 🛡️ Security Features

✅ **API Keys stored ONLY in browser localStorage** - Never sent to our servers
✅ **CORS Proxy** - Safely routes requests through Vercel Functions
✅ **HTTPS** - All traffic encrypted
✅ **No logs** - API keys not logged anywhere

## ⚙️ How the Proxy Works

```
Browser → Vercel Function (/api/proxy.js) → Binance API
         ↓
      CORS Headers Added
      Request Signed ✓
      Response Returned
```

This setup:
- ✅ Bypasses CORS restrictions
- ✅ Keeps API keys private
- ✅ Works from any domain
- ✅ No 404 errors

## 🤖 Using the Bot

1. **Open** `https://your-vercel-app.vercel.app`
2. **Enter** your Binance API Key and Secret
3. **Choose** Environment:
   - Testnet (Demo - for practice)
   - Mainnet (Real money)
4. **Configure** settings:
   - Capital: How much USDT to use per trade
   - Leverage: 5x to 50x
   - TP/SL: Take Profit / Stop Loss amounts
5. **Select Coins**:
   - Auto Mode: Bot picks best coins automatically
   - Custom: Add specific coins you want to trade
6. **Click "Start Bot"**

## 🚨 Important Notes

⚠️ **Always test on Testnet first!**
- Set environment to "Testnet"
- Practice with demo money
- Verify the bot works before real trading

⚠️ **Risk Management**
- Start with small capital ($5-10)
- Use appropriate leverage (10x recommended for beginners)
- Set proper TP/SL values
- Monitor your positions

⚠️ **Server Limits on Vercel**
- Free tier: 100GB bandwidth/month
- Perfect for crypto trading bot
- Scales automatically

## 🐛 Troubleshooting

### 404 Error when Deploying
✅ **Already fixed!** The proxy setup handles this.

### Proxy Not Working
1. Check your Vercel deployment logs:
   ```
   vercel logs --prod
   ```
2. Verify both files exist:
   - `/api/proxy.js`
   - `/api/binance.js`
3. Make sure `index.html` is loaded from root

### API Key Not Working
1. Verify API key in Binance settings
2. Check if key is restricted to your IP
3. Ensure "Futures User Stream" is enabled
4. Try testnet first to debug

### Positions not showing
1. Click "Refresh" button in Live Positions section
2. Check if API key has proper permissions
3. Verify you have open futures positions on Binance

## 📈 Features

✅ Real-time market analysis
✅ Auto coin selection by trend
✅ Custom coin mode
✅ Smart entry/exit logic
✅ Multiple position management
✅ Live PnL tracking
✅ Trade history
✅ Activity logging
✅ Account balance syncing
✅ Leverage management

## 💡 Best Practices

1. **Monitor your bot** - Don't leave it unattended for long periods
2. **Start small** - Test with minimal capital first
3. **Use testnet** - Practice before real money
4. **Set realistic TP/SL** - Don't chase unrealistic gains
5. **Close positions manually** - If something feels wrong
6. **Check logs** - Review activity log for insights

## 🔗 Links

- Binance API Docs: https://binance-docs.github.io/apidocs/
- Futures Trading: https://www.binance.com/en/futures
- Vercel Docs: https://vercel.com/docs
- GitHub: https://github.com/YOUR_USERNAME/binancevolumebot

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Check Binance API status
4. Verify your internet connection

## ⚖️ Disclaimer

This bot is for educational purposes. Use at your own risk. Cryptocurrency trading involves significant risk of loss. Always do your own research and start small.

---

**Happy Trading! 🚀**
