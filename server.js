require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. SERVE YOUR EXISTING APP
// This line makes your 'public' folder (index.html, app.js) visible on the web
app.use(express.static('public'));
app.use(bodyParser.json());

// 2. KALSHI CONFIGURATION
const KALSHI_API = 'https://api.elections.kalshi.com/trade-api/v2'; // or demo-api
let token = null;

// 3. LOGIN FUNCTION
async function login() {
    try {
        const response = await axios.post(`${KALSHI_API}/login`, {
            email: process.env.KALSHI_EMAIL,
            password: process.env.KALSHI_PASSWORD
        });
        token = response.data.token;
        console.log("✅ Bot Logged In");
    } catch (error) {
        console.error("❌ Login Failed:", error.message);
    }
}

// 4. API ENDPOINT (Connects Frontend to Backend)
// Your app.js will call this to toggle the bot or update settings
app.post('/api/update-settings', (req, res) => {
    const settings = req.body;
    console.log("⚙️ Settings Updated:", settings);
    // TODO: Update your bot's internal logic variables here
    res.json({ status: 'success', message: 'Bot updated!' });
});
// STORE STATE
let botState = {
    isRunning: false,
    logs: ["System initialized..."]
};

// HELPER: Add a log message
function log(msg) {
    const time = new Date().toLocaleTimeString();
    botState.logs.push(`[${time}] ${msg}`);
    if (botState.logs.length > 50) botState.logs.shift(); // Keep last 50
}

// API 1: Frontend asks for status
app.get('/api/status', (req, res) => {
    res.json(botState);
});

// API 2: Frontend sends command
app.post('/api/toggle', (req, res) => {
    botState.isRunning = !botState.isRunning;
    log(botState.isRunning ? "🚀 Bot Started by User" : "🛑 Bot Stopped by User");
    res.json({ success: true });
});

// SIMULATION LOOP (Replace with real trading logic later)
setInterval(() => {
    if (botState.isRunning) {
        // Randomly log something to prove it's working
        if (Math.random() > 0.7) log("🔎 Scanning markets... No setup found.");
    }
}, 3000);

// 5. START THE SERVER
app.listen(PORT, async () => {
    console.log(`🚀 Bankroll OS running on http://localhost:${PORT}`);
    await login(); // Log in when server starts
});
