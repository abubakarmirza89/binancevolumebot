# 👥 User Management Guide

## Overview
The Binance Volume Bot now includes **User Authentication**. All users need to login with username and password before accessing the bot.

## 📁 User Data File

**Location:** `/data/users.json`

```json
{
  "users": [
    {
      "username": "admin",
      "password": "Admin@123",
      "email": "admin@binancebot.com",
      "status": "active"
    },
    {
      "username": "trader1",
      "password": "Trader@123",
      "email": "trader1@binancebot.com",
      "status": "active"
    }
  ]
}
```

## ➕ Add New User

### Step 1: Edit `data/users.json`

Open the file and add a new user object to the `users` array:

```json
{
  "users": [
    {
      "username": "admin",
      "password": "Admin@123",
      "email": "admin@binancebot.com",
      "status": "active"
    },
    {
      "username": "your_username",
      "password": "YourPassword@123",
      "email": "user@example.com",
      "status": "active"
    }
  ]
}
```

### Step 2: Save & Deploy

After editing:
1. Save the file
2. Push to GitHub: `git add . && git commit -m "Add new user" && git push`
3. Vercel will auto-deploy

### Step 3: Login

User can now login with:
- **Username:** `your_username`
- **Password:** `YourPassword@123`

## ✏️ Modify User

To change a user's password or details, edit the `/data/users.json` file:

```json
{
  "username": "trader1",
  "password": "NewPassword@456",  // ← Change this
  "email": "new-email@example.com",  // ← Or this
  "status": "active"
}
```

Then save and redeploy.

## 🚫 Disable User

To disable a user without deleting, set `status` to `inactive`:

```json
{
  "username": "olduser",
  "password": "OldPass@123",
  "email": "old@example.com",
  "status": "inactive"  // ← User can't login
}
```

## 🗑️ Delete User

Remove the entire user object:

```json
{
  "users": [
    {
      "username": "admin",
      "password": "Admin@123",
      "email": "admin@binancebot.com",
      "status": "active"
    }
    // trader1 object removed completely
  ]
}
```

## 👨‍💼 User Fields Explained

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `username` | string | ✅ Yes | Unique identifier (no spaces) |
| `password` | string | ✅ Yes | Plain text (consider hashing in production) |
| `email` | string | ✅ Yes | For reference only |
| `status` | string | ✅ Yes | `active` or `inactive` |

## 🔐 Security Best Practices

### ⚠️ IMPORTANT NOTES:

1. **Passwords in Plain Text**
   - Current setup uses plain text (not ideal for production)
   - For production, use hashed passwords
   - Consider using bcrypt or similar

2. **File Permissions**
   - Keep `/data/users.json` in `.gitignore` for sensitive data
   - On Vercel, file updates require redeployment

3. **Password Rules** (Suggested)
   - Minimum 8 characters
   - Use uppercase + lowercase + numbers + special chars
   - Example: `MyBot@Pass123`

4. **API Access**
   - User data is served via `/api/users` endpoint
   - API has CORS protection
   - Only GET requests allowed (read-only)

## 📊 Example User Setup

### Admin User
```json
{
  "username": "admin",
  "password": "SecureAdmin@2024",
  "email": "admin@company.com",
  "status": "active"
}
```

### Trader User
```json
{
  "username": "trader_john",
  "password": "JohnTrader@2024",
  "email": "john@traders.com",
  "status": "active"
}
```

### Test User (for practice)
```json
{
  "username": "testuser",
  "password": "Test@123",
  "email": "test@example.com",
  "status": "active"
}
```

### Inactive User (disabled)
```json
{
  "username": "olduser",
  "password": "OldPass@123",
  "email": "old@example.com",
  "status": "inactive"
}
```

## 🔄 Session Management

### Auto-Logout
- Session times out after **30 minutes** of inactivity
- User must login again

### Manual Logout
- Click "Username" → "Logout" in top-right corner
- Or click the Logout button in authentication indicator

### Session Storage
- Login info stored in browser localStorage
- Not sent to servers
- Cleared on logout

## 🚀 Deployement Notes

### For Local Development
- Users file: `/data/users.json`
- Direct file access works

### For Vercel Production
- Users file: `/data/users.json` 
- Served via `/api/users` endpoint
- Updates require Git push & Vercel redeploy

## ⚡ Quick Commands

### Add user (manual edit)
```
Edit /data/users.json → Add new user object → Save → Git push
```

### Change password
```
Edit /data/users.json → Update password field → Save → Git push
```

### Disable user
```
Edit /data/users.json → Set status to "inactive" → Save → Git push
```

### Export users (backup)
```
cp data/users.json data/users.backup.json
```

## 🆘 Troubleshooting

### User Can't Login
1. Check username is correct (case-sensitive)
2. Verify password matches exactly
3. Check if `status` is `active`
4. Clear browser cache and retry

### File Not Found
1. Ensure `/data/users.json` exists
2. Check file permissions (readable)
3. Verify JSON syntax is valid
4. Restart local dev server

### API Error
1. Check Vercel deployment status
2. Verify `/api/users` endpoint works
3. Check browser console for errors
4. Try localhost first (if deployed)

### JSON Syntax Error
- Use a JSON validator: https://jsonlint.com
- Check for missing commas
- Ensure quotes are correct
- No trailing commas

## 🔗 Related Files

- **Main Bot:** `index.html`
- **User API:** `api/users.js`
- **User Data:** `data/users.json`
- **Deployment:** `DEPLOYMENT.md`

---

**Happy trading with secure access! 🔐**
