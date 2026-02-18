require('dotenv').config();
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express();

// ==========================================
// 🔐 CONFIGURATION
// ==========================================
const PORT = process.env.PORT || 3000;
const BASE_URL = 'https://api.elections.kalshi.com/trade-api/v2'; // Use this for REAL money
// const BASE_URL = 'https://demo-api.kalshi.co/trade-api/v2'; // Use this for DEMO

// FIX: Sometimes Replit squashes the key into one line. This fixes it.
const RAW_KEY = process.env.KALSHI_PRIVATE_KEY || "";
const PRIVATE_KEY = RAW_KEY.replace(/\\n/g, '\n'); 
const KEY_ID = process.env.KALSHI_KEY_ID;

// ==========================================
// 🧠 THE "SIGNING" BRAIN (The Complex Part)
// ==========================================
function getHeaders(method, path) {
    if (!PRIVATE_KEY || !KEY_ID) {
        console.error("❌ MISSING KEYS: Check your Replit Secrets!");
        return {};
    }

    const timestamp = Date.now().toString();
    
    // 1. Create the string to sign: Timestamp + Method + Path
    // (Example: "1700000000000GET/trade-api/v2/portfolio/balance")
    const msgString = timestamp + method + path;

    // 2. Sign it using your Private Key (SHA-256)
    const sign = crypto.createSign('SHA256');
    sign.update(msgString);
    sign.end();
    const signature = sign.sign({
        key: PRIVATE_KEY,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLENGTH_DIGEST
    }).toString('base64');

    // 3. Return the headers Kalshi needs
    return {
        'Content-Type': 'application/json',
        'KALSHI-ACCESS-KEY': KEY_ID,
        'KALSHI-ACCESS-SIGNATURE': signature,
        'KALSHI-ACCESS-TIMESTAMP': timestamp
    };
}

// ==========================================
// 🤖 API FUNCTIONS
// ==========================================
async function checkConnection() {
    try {
        const path = '/portfolio/balance'; // Simple test endpoint
        const headers = getHeaders('GET', '/trade-api/v2' + path);
        
        const response = await axios.get(BASE_URL + path, { headers });
        console.log("✅ CONNECTED! Balance:", response.data.balance);
        return { success: true, balance: response.data.balance };
    } catch (error) {
        console.error("❌ Connection Failed:", error.response ? error.response.data : error.message);
        return { success: false, error: error.message };
    }
}

// ==========================================
// 🖥️ SERVER & DASHBOARD
// ==========================================
app.use(express.static('public'));
app.use(express.json());

let botState = { isRunning: false, logs: [] };

function log(msg) {
    const time = new Date().toLocaleTimeString();
    botState.logs.push(`[${time}] ${msg}`);
    if (botState.logs.length > 50) botState.logs.shift();
    console.log(msg);
}

// 1. STATUS ENDPOINT
app.get('/api/status', (req, res) => {
    res.json(botState);
});

// 2. TOGGLE ENDPOINT
app.post('/api/toggle', async (req, res) => {
    botState.isRunning = !botState.isRunning;
    log(botState.isRunning ? "🚀 Bot Started" : "🛑 Bot Stopped");
    
    if (botState.isRunning) {
        // Run a connection test immediately when started
        const result = await checkConnection();
        if (result.success) {
            log(`✅ Login OK. Balance: $${result.balance / 100}`);
        } else {
            log("❌ Login Failed. Check Console.");
            botState.isRunning = false; // Stop if we can't login
        }
    }
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Bot running on port ${PORT}`);
    // Check connection on startup
    checkConnection();
});
