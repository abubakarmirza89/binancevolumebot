/**
 * Vercel Serverless Function: User Data API
 * Serves users.json safely
 */

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Read users.json file
    const fs = require('fs');
    const path = require('path');
    
    // Try to read from data directory
    const usersPath = path.join(process.cwd(), 'data', 'users.json');
    
    if (!fs.existsSync(usersPath)) {
      // Return default users if file doesn't exist
      return res.status(200).json({
        users: [
          {
            username: 'admin',
            password: 'Admin@123',
            email: 'admin@binancebot.com',
            status: 'active'
          },
          {
            username: 'trader1',
            password: 'Trader@123',
            email: 'trader1@binancebot.com',
            status: 'active'
          },
          {
            username: 'demo',
            password: 'Demo@123',
            email: 'demo@binancebot.com',
            status: 'active'
          }
        ]
      });
    }

    const usersData = fs.readFileSync(usersPath, 'utf-8');
    const users = JSON.parse(usersData);
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error reading users:', error);
    res.status(500).json({
      error: 'Failed to load users',
      message: error.message
    });
  }
};
