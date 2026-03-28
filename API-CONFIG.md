# Binance API Configuration Guide

## 🔑 Getting Your API Keys

### Step 1: Login to Binance
1. Go to https://www.binance.com
2. Login to your account
3. Click on your profile icon → API Management

### Step 2: Create New Key
1. Click "Create API"
2. Name it: `BinanceVolumeBot`
3. Click "Next"

### Step 3: Security Verification
1. Complete the security verification (email/SMS/authenticator)
2. Confirm your choice

### Step 4: Configure Permissions

**IMPORTANT: Use these exact settings:**

✅ **Enable:**
- Futures User Stream
- Read access to account data
- Spot trading (if you enable it)

❌ **Disable:**
- Withdrawals
- IP whitelist transfer

### Step 5: IP Whitelist (CRITICAL!)

1. Run the bot
2. Note your **Public IP** displayed in the app
3. Add it to Binance API whitelist:
   - In Binance API settings
   - Restrict to specific IP
   - Enter your IP

Example: `203.192.XXX.XXX`

### Step 6: Get Your Keys

You'll see two keys:
1. **API Key**: Public key (safe to see)
2. **Secret Key**: Private key (NEVER share!)

```
API Key:    Apna7L9TqaXXXXXXXXXXXXX (keep secret)
Secret Key: BU9XXXXXXXXXXXXXXXXXXXXX (VERY SECRET!)
```

## 📋 Setup for Different Scenarios

### Scenario 1: Testnet (Recommended First)

**Testnet API Keys:**
1. Go to: https://testnet.binance.vision
2. Login with Binance account
3. Create separate Testnet API Key
4. In bot: Select "Testnet" environment
5. Use these test keys

**This uses fake money - perfect for practice!**

### Scenario 2: Mainnet with Small Capital

1. Use your real Binance API keys
2. In bot: Select "Mainnet" environment
3. Start with $5-10 USDT
4. Monitor very carefully
5. Gradually increase

### Scenario 3: High Volume Trading

Only after you're confident:
1. Increase capital to $50-100
2. Adjust leverage to 20-50x (RISKY!)
3. Use custom coins
4. Monitor real-time PnL

## 🔒 Security Best Practices

### ✅ DO:
- Use unique API key for this bot
- Enable IP whitelist
- Use different keys for testnet/mainnet
- Store keys only in browser (localStorage)
- Review your positions daily
- Use 2FA on Binance account

### ❌ DON'T:
- Share your Secret Key with anyone
- Paste keys in messages/chats
- Use API key for multiple bots simultaneously
- Enable withdrawal permissions
- Store keys in plain text files
- Leave bot running unattended for days

## 🛡️ If Keys Are Compromised

**Immediately:**
1. Delete the API key from Binance
2. Create a new one
3. Update your bot with new keys
4. Check your trading history

## 📊 API Permissions Matrix

| Permission | Needed? | Why |
|---|---|---|
| Read Account Data | ✅ Yes | To check balance & positions |
| Spot Trading | ⏸️ Optional | Only if doing spot trades |
| Futures Trading | ✅ Yes | Main trading function |
| Withdrawals | ❌ No | Disable for security |
| IP Whitelist | ✅ Yes | Restrict access |

## 🧪 Test Your Keys

After entering keys in the bot:

1. **Click "Refresh" on Account Balance**
   - If it works → Keys are valid ✅
   - If error → Keys are invalid ❌

2. **Check "Live Positions"**
   - Should show your current positions
   - Or "No open positions" if none exist

3. **View Activity Log**
   - Should show successful API connections
   - Any errors visible here

## ⚠️ Common Mistakes

### Mistake 1: Using Spot Trading Key
**Wrong:** Uses Spot API endpoint
**Right:** Use Futures (USD-M) key

### Mistake 2: IP Whitelist Not Set
**Wrong:** API calls blocked from Vercel IPs
**Right:** Whitelist your IP or disable restriction

### Mistake 3: IP Restriction Not Updated
**Wrong:** Connection fails when IP changes (mobile/different network)
**Right:** Set specific IP or allow all (less secure)

### Mistake 4: Withdrawal Permissions Enabled
**Wrong:** Account can be drained if key is exposed
**Right:** Disable all withdrawal permissions

## 🔄 Rotating Keys

Every 3 months:
1. Create new API key pair
2. Update in bot
3. Delete old key from Binance
4. Keep audit trail

## 📞 Binance Support

- API Issues: https://www.binance.com/en/support
- Rate Limits: Check Binance API docs
- Trading Hours: 24/7 on futures

---

**Your keys are secure when stored only in browser! 🔐**
