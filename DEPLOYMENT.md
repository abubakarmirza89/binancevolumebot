# Local Deployment Guide - No More Vercel 451 Errors!

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Node.js
Download from: https://nodejs.org/ (LTS version recommended)

### Step 2: Start Bot Locally

```bash
# Go to your bot folder
cd binancevolumebot

# Start the server
node server.js

# You should see:
# ✓ Server running on: http://localhost:3000
```

### Step 3: Open in Browser
```
http://localhost:3000
```

**That's it! No 451 errors, direct Binance access! ✅**

---

## 🌍 Access from Anywhere

### Option 1: ngrok Tunnel (Easiest, Free)

```bash
# Install ngrok from https://ngrok.com/download

# While server is running, in another terminal:
npx ngrok http 3000

# You get a URL like: https://abc123.ngrok.io
# Share this link - anyone can access!
```

**Pros:** Free, instant, no setup  
**Cons:** 2 hour limit per session, 1 connection free

---

### Option 2: Railway.app (Best for Production, FREE)

**Step-by-step:**

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Connect your GitHub account
4. Select `binancevolumebot` repository
5. Railway auto-configures everything
6. Click "Deploy"
7. Wait 2-3 minutes
8. Get public URL - **Done!**

**Pros:**
- ✅ Free tier: 750 hours/month (enough for 24/7 bot)
- ✅ Auto-deploys on git push
- ✅ No 451 blocks
- ✅ Professional platform
- ✅ Easy monitoring

**Cons:** None really for our use case

---

### Option 3: Render.com (Alternative FREE)

1. https://render.com/register
2. New "Web Service"
3. Connect GitHub repo
4. Settings:
   - **Name:** binance-volume-bot
   - **Runtime:** Node
   - **Build:** `npm install`
   - **Start:** `node server.js`
5. Deploy!

**Pros:** Free tier, reliable  
**Cons:** Falls asleep after 15 min inactivity (no issue for trading bot)

---

### Option 4: Your Own VPS ($2-5/month)

**Cheap options:**
- Vultr: $2.50/month
- Linode: $5/month
- DigitalOcean: $5/month

```bash
# SSH into server:
ssh root@YOUR_SERVER_IP

# Install Node:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs

# Clone and run:
git clone https://github.com/abubakarmirza89/binancevolumebot.git
cd binancevolumebot
npm install
node server.js

# Keep running with PM2:
sudo npm install -g pm2
pm2 start server.js
pm2 save
pm2 startup
```

Your bot runs 24/7 on your VPS!

---

## 📋 Setup Checklist

- [ ] Node.js installed (check: `node --version`)
- [ ] server.js file created
- [ ] Can start locally without errors
- [ ] Can access http://localhost:3000
- [ ] API calls work (no 451 errors!)
- [ ] Deployed to Railway/Render (optional)
- [ ] Public URL working
- [ ] Users can login
- [ ] Bot can place trades

---

## 🚀 Railway Deployment (Recommended)

### Quickest Method:

```bash
# 1. Make sure all changes committed
git add .
git commit -m "Ready for Railway deployment"
git push origin main

# 2. Go to railway.app
# 3. New Project → Deploy from GitHub
# 4. Select binancevolumebot
# 5. Wait for deployment (2-3 min)
# 6. Your bot is live!
```

That's literally it. Railway handles everything.

---

## 🧪 Testing Your Deployment

### Local Test
```bash
# Start server
node server.js

# In another terminal, test API:
curl http://localhost:3000/api/proxy \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"url":"https://fapi.binance.com/fapi/v1/ping"}'

# Should respond: {"status":200,"data":{}}
```

### Production Test
1. Get your Railway/Render URL
2. Open in browser
3. Login with user1/user2
4. Connect Binance API keys
5. Start bot
6. Monitor for any errors

---

## ⚙️ Configuration

### package.json (Already set up)
```json
{
  "name": "binance-volume-bot",
  "version": "1.0.0",
  "engines": {
    "node": "20.x"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

### .env (Optional)
Create `.env` file if needed:
```
PORT=3000
NODE_ENV=production
```

---

## 🎯 Quick Comparison

| Method | Cost | Setup Time | 24/7 | Remote |
|--------|------|------------|------|--------|
| Local PC | Free | 5 min | ❌ | ❌ |
| ngrok | Free | 1 min | ❌ (2 hr limit) | ✅ |
| **Railway** | **Free** | **3 min** | **✅** | **✅** |
| Render | Free | 5 min | ✅* | ✅ |
| VPS | $5/mo | 10 min | ✅ | ✅ |

*Render sleeps after 15 min inactivity

---

## ✅ Why This is Better Than Vercel

| Feature | Vercel | Local/Railway |
|---------|--------|---------------|
| 451 Blocks | ❌ Yes | ✅ No |
| Direct API | ❌ No | ✅ Yes |
| Speed | Normal | ⚡ Faster |
| Setup | Complex | Simple |
| Cost | Free | Free |
| Reliability | Medium | High |

---

## 🚨 Important Notes

1. **Keep your PC/server on** for 24/7 trading
2. **Backup your API keys** separately
3. **Never share** your public URL with API keys in URL
4. **Monitor logs** regularly for errors
5. **Test on testnet first** before mainnet

---

## 🆘 Troubleshooting

### "Port 3000 already in use"
```bash
PORT=8080 node server.js
```

### "Cannot find module"
```bash
npm install
```

### "404 Error"
Make sure you're in correct folder:
```bash
ls  # Should show: server.js, index.html, api/, data/
```

### "API not responding"
- Check internet connection
- Verify Binance API status
- Check server logs for errors

---

**Your bot is now free from Vercel restrictions! 🎉 Direct Binance access, no 451 errors, 24/7 trading capability!**

