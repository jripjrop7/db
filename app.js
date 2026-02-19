const app = {
	    getFees: async () => {
        try {
            const res = await fetch('https://mempool.space/api/v1/fees/recommended');
            const data = await res.json();
            document.getElementById('fee-fast').innerText = data.fastestFee;
            document.getElementById('fee-eco').innerText = data.economyFee;
            // Update the fee inputs in your other tools automatically
            if(document.getElementById('w-fee')) document.getElementById('w-fee').value = data.fastestFee;
        } catch(e) { alert("Fee Fetch Error"); }
    },
    
        // --- UNIVERSAL NAVIGATION ---
    nav: (page) => {
        // 1. Hide ALL view sections
        document.querySelectorAll('.view-section').forEach(el => el.style.display = 'none');
        
        // 2. Remove 'active' class from ALL nav buttons
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

        // 3. Show the SPECIFIC view (e.g. view-parlay)
        const targetView = document.getElementById('view-' + page);
        if (targetView) targetView.style.display = 'block';

        // 4. Highlight the SPECIFIC button (e.g. nav-parlay)
        const targetBtn = document.getElementById('nav-' + page);
        if (targetBtn) targetBtn.classList.add('active');
        
        // 5. Scroll to top for a clean feel
        window.scrollTo(0,0);
    },
    // --- DASHBOARD SETTINGS UI ---
    editDashSettings: () => {
        // 1. Get current values
        document.getElementById('set-btc').value = localStorage.getItem('btc_qty') || 0;
        document.getElementById('set-eth').value = localStorage.getItem('eth_qty') || 0;
        document.getElementById('set-goal').value = localStorage.getItem('goal') || 10000;
        
        // 2. Open Modal
        document.getElementById('modal-dash-settings').classList.add('open');
    },

    saveDashSettings: () => {
        // 1. Save inputs
        const btc = parseFloat(document.getElementById('set-btc').value) || 0;
        const eth = parseFloat(document.getElementById('set-eth').value) || 0;
        const goal = parseFloat(document.getElementById('set-goal').value) || 10000;

        localStorage.setItem('btc_qty', btc);
        localStorage.setItem('eth_qty', eth);
        localStorage.setItem('goal', goal);

        // 2. Close & Render
        document.getElementById('modal-dash-settings').classList.remove('open');
        app.render();
    },
    // --- KALSHI AUTO-TRADER (BRIDGE SERVER + EVENT SEARCH) ---
    bot: {
        // 1. CREDENTIALS
        saveKeys: () => {
            const keyId = document.getElementById('k-key-id').value.trim();
            const privKey = document.getElementById('k-priv-key').value.trim();
            
            if(!keyId || !privKey) return alert("Please enter Key ID & Private Key");
            
            if(!keyId.includes('-')) alert("Warning: Key ID should look like a UUID (e.g. 123e4567-e89b...)");

            localStorage.setItem('k_key_id', keyId);
            localStorage.setItem('k_priv_key', privKey); 
            
            alert("Keys Saved!");
            app.bot.log("Keys saved locally.");
        },

        clearKeys: () => {
            localStorage.removeItem('k_key_id');
            localStorage.removeItem('k_priv_key');
            document.getElementById('k-key-id').value = '';
            document.getElementById('k-priv-key').value = '';
            alert("Keys Wiped.");
        },

        log: (msg) => {
            const logDiv = document.getElementById('k-log');
            if(logDiv) {
                const time = new Date().toLocaleTimeString();
                logDiv.innerHTML = `[${time}] ${msg}<br>` + logDiv.innerHTML;
            }
        },

        // 2. CRYPTO ENGINE (RSA-PSS)
        importPrivateKey: async (pem) => {
            try {
                // CLEANUP: Remove headers/footers/newlines
                const cleanPem = pem.replace(/-----BEGIN.*?-----/g, "")
                                    .replace(/-----END.*?-----/g, "")
                                    .replace(/\s/g, "");
                
                const binaryDerString = window.atob(cleanPem);
                const binaryDer = new Uint8Array(binaryDerString.length);
                for (let i = 0; i < binaryDerString.length; i++) {
                    binaryDer[i] = binaryDerString.charCodeAt(i);
                }

                return await window.crypto.subtle.importKey(
                    "pkcs8", 
                    binaryDer.buffer, 
                    { name: "RSA-PSS", hash: "SHA-256" }, 
                    false, 
                    ["sign"]
                );
            } catch (e) {
                console.error(e);
                throw new Error("Key Format Error. Ensure key is PKCS#8.");
            }
        },

        signRequest: async (key, timestamp, method, path) => {
            const sigString = timestamp + method + path;
            const encoder = new TextEncoder();
            const signature = await window.crypto.subtle.sign(
                { name: "RSA-PSS", saltLength: 32 }, 
                key, 
                encoder.encode(sigString)
            );
            return btoa(String.fromCharCode(...new Uint8Array(signature)));
        },

        // 3. REQUEST ENGINE (HITS LOCALHOST:3000)
        request: async (method, endpoint, body = null) => {
            const keyId = localStorage.getItem('k_key_id');
            const privKeyPem = localStorage.getItem('k_priv_key');

            if(!keyId || !privKeyPem) {
                app.bot.log("❌ Keys missing. Check Vault.");
                return null;
            }

            try {
                // A. Prepare Signature
                const timestamp = Date.now().toString();
                // Strip query params for signing (e.g., "/path?foo=bar" -> "/path")
                const pathForSigning = endpoint.split('?')[0]; 
                
                const privateKey = await app.bot.importPrivateKey(privKeyPem);
                const signature = await app.bot.signRequest(privateKey, timestamp, method, pathForSigning);

                // B. BRIDGE URL (Local Server)
                const bridgeUrl = 'http://localhost:3000/api' + endpoint;

                app.bot.log(`Sending to Bridge...`);

                const options = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'KALSHI-ACCESS-KEY': keyId,
                        'KALSHI-ACCESS-SIGNATURE': signature,
                        'KALSHI-ACCESS-TIMESTAMP': timestamp
                    }
                };

                if (body) options.body = JSON.stringify(body);

                const response = await fetch(bridgeUrl, options);

                if(!response.ok) {
                    const txt = await response.text();
                    throw new Error(`Bridge Error ${response.status}: ${txt}`);
                }

                return await response.json();

            } catch (e) {
                app.bot.log(`❌ Error: ${e.message}`);
                if(e.message.includes("Failed to fetch")) {
                    alert("BRIDGE OFFLINE:\n\nMake sure your Termux app is open and running 'node bridge.js'.");
                }
                return null;
            }
        },

        // 4. CONNECTION TEST
        login: async () => {
            app.bot.log("Testing Bridge...");
            const data = await app.bot.request('GET', '/trade-api/v2/portfolio/balance');

            if (data) {
                app.bot.log("✅ BRIDGE CONNECTED!");
                const bal = (data.balance || 0) / 100;
                document.getElementById('k-bal').innerText = app.formatMoney(bal);
                
                const status = document.getElementById('bot-status');
                status.innerText = "ONLINE";
                status.style.color = "#00E676";
                status.style.background = "rgba(0, 230, 118, 0.15)";
            }
        },

             // 5. SMART SEARCH (LIVE FILTER + 48H LOGIC)
        searchMarkets: async (query = "") => {
            const list = document.getElementById('bot-market-list');
            list.innerHTML = '<div style="text-align:center; color:#00E676; margin-top:20px;">Scanning Markets...</div>';
            app.bot.log(`🔎 Searching: "${query}"...`);

            // CONFIG
            const now = Math.floor(Date.now() / 1000);
            const hours48 = 48 * 60 * 60;
            let endpoint = `/trade-api/v2/events?limit=100&status=open&with_nested_markets=true`;
            
            // SPECIAL MODES
            if (query === 'NBA') endpoint += `&series_ticker=NBA`; 
            // Note: 'Mentions' isn't a series, so we filter it manually below

            // 1. FETCH DATA
            const data = await app.bot.request('GET', endpoint);

            if(!data || !data.events) {
                list.innerHTML = '<div style="text-align:center; color:#ff5252;">No markets found.</div>';
                return;
            }

            // 2. FILTER LOGIC
            const filtered = data.events.filter(evt => {
                const firstMarket = evt.markets ? evt.markets[0] : null;
                if (!firstMarket) return false;
                
                const timeLeft = firstMarket.expiration_ts - now;

                // MODE A: "LIVE" (Strict 48h limit)
                if (query === 'LIVE') {
                    // Must be closing within 48 hours AND not expired yet
                    return (timeLeft > 0 && timeLeft < hours48);
                }

                // MODE B: "Mentions"
                if (query === 'Mentions') {
                    // Look for keywords in title
                    const t = evt.title.toLowerCase();
                    return t.includes('mention') || t.includes('say') || t.includes('tweet');
                }

                // MODE C: Standard Search
                if (query && query !== 'NBA') { // NBA is already filtered by endpoint
                    const q = query.toLowerCase();
                    return evt.title.toLowerCase().includes(q) || 
                           evt.category.toLowerCase().includes(q) ||
                           evt.series_ticker.toLowerCase().includes(q);
                }

                return true;
            });

            // 3. RENDER RESULTS
            list.innerHTML = '';
            if (filtered.length === 0) {
                list.innerHTML = '<div style="text-align:center; color:#666; padding:20px;">No events match your filter.<br>Try "LIVE" or a different search.</div>';
                return;
            }

            // Sort by "Closing Soonest" first
            filtered.sort((a, b) => a.markets[0].expiration_ts - b.markets[0].expiration_ts);

            filtered.forEach(evt => {
                const markets = evt.markets || [];
                const expiry = new Date(markets[0].expiration_ts * 1000);
                
                // Format Date nicely (e.g. "Today 8:00 PM")
                const dateStr = expiry.toLocaleDateString() === new Date().toLocaleDateString() 
                    ? `TODAY ${expiry.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                    : `${expiry.toLocaleDateString()} ${expiry.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

                // Create Card
                const card = document.createElement('div');
                card.className = 'card';
                card.style.borderLeft = query === 'LIVE' ? '4px solid #D50000' : '4px solid #2962FF';
                card.style.marginBottom = '10px';
                card.style.padding = '8px';

                let html = `
                    <div style="margin-bottom:6px; border-bottom:1px solid #333; padding-bottom:4px;">
                        <div style="font-weight:bold; font-size:0.9rem; color:#fff;">${evt.title}</div>
                        <div style="font-size:0.65rem; color:#00E676; font-weight:bold;">⏳ Ends: ${dateStr}</div>
                    </div>
                    <div style="max-height:250px; overflow-y:auto;">
                `;

                markets.forEach(m => {
                    const yesPrice = m.yes_bid || 0;
                    const noPrice = m.no_bid || 0;
                    
                    // CLEAN NAME LOGIC:
                    // If subtitle exists (e.g. "Over 50.5"), use it.
                    // If not, try to clean up the ticker (e.g. "IN-LAL-GSW" -> "LAL vs GSW")
                    let name = m.subtitle;
                    if (!name) name = m.ticker.replace('NBA-', '').replace('IN-', ''); 

                    html += `
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px; background:#111; padding:8px; border-radius:4px;">
                            <div style="width:45%;">
                                <div style="font-size:0.8rem; color:#eee; font-weight:bold;">${name}</div>
                            </div>
                            
                            <div style="display:flex; gap:5px;">
                                <button class="btn" style="width:auto; padding:4px 10px; font-size:0.75rem; background:rgba(0, 230, 118, 0.15); color:#00E676; border:1px solid #00E676;" 
                                    onclick="app.bot.stageTrade('${m.ticker}', 'yes', ${yesPrice})">
                                    YES ${yesPrice}¢
                                </button>
                                <button class="btn" style="width:auto; padding:4px 10px; font-size:0.75rem; background:rgba(213, 0, 0, 0.15); color:#FF5252; border:1px solid #FF5252;" 
                                    onclick="app.bot.stageTrade('${m.ticker}', 'no', ${noPrice})">
                                    NO ${noPrice}¢
                                </button>
                            </div>
                        </div>
                    `;
                });

                html += `</div>`; 
                card.innerHTML = html;
                list.appendChild(card);
            });

            app.bot.log(`Found ${filtered.length} active events.`);
        },



        // 6. STAGE TRADE
        stageTrade: (ticker, side, price) => {
            document.getElementById('trade-ticker').value = ticker;
            document.getElementById('trade-side').value = side;
            document.getElementById('trade-price').value = price;
            document.getElementById('trade-count').value = 1;
            app.bot.log(`Selected ${ticker} (${side.toUpperCase()})`);
            document.getElementById('trade-ticker').scrollIntoView({ behavior: 'smooth' });
        },

        // 7. EXECUTE ORDER
        executeOrder: async () => {
            const ticker = document.getElementById('trade-ticker').value;
            const side = document.getElementById('trade-side').value;
            const count = parseInt(document.getElementById('trade-count').value);
            const price = parseInt(document.getElementById('trade-price').value);

            if(!ticker || !count || !price) return alert("Invalid Trade Params");

            if(!confirm(`CONFIRM: Buy ${count} contracts of ${ticker} (${side}) @ ${price}¢?`)) return;

            app.bot.log(`🚀 SENDING ORDER...`);

            const body = {
                action: 'buy',
                count: count,
                side: side,
                ticker: ticker,
                type: 'limit',
                yes_price: (side === 'yes' ? price : undefined),
                no_price: (side === 'no' ? price : undefined),
                expiration_ts: null
            };

            const data = await app.bot.request('POST', '/trade-api/v2/portfolio/orders', body);

            if(data && data.order) {
                app.bot.log(`✅ ORDER PLACED! ID: ${data.order.order_id}`);
                app.bot.login(); // Refresh Balance
            } else {
                app.bot.log("❌ Order Failed.");
            }
        }
    },







        // --- PARLAY ENGINE v2 (ADVANCED) ---
    parlay: {
        legs: [],
        
        // 1. UTILITIES
        americanToDecimal: (odds) => {
            if (odds >= 100) return (odds / 100) + 1;
            if (odds <= -100) return (100 / Math.abs(odds)) + 1;
            return 1.0;
        },
        decimalToAmerican: (dec) => {
            if (dec < 1.01) return -10000;
            if (dec >= 2.0) return (dec - 1) * 100;
            return -100 / (dec - 1);
        },

        // 2. UI MANAGEMENT
        addLegModal: () => {
            document.getElementById('leg-name').value = '';
            document.getElementById('leg-odds').value = '-110';
            document.getElementById('leg-conf').value = '';
            document.getElementById('leg-group-a').value = '';
            document.getElementById('leg-group-b').value = '';
            document.getElementById('modal-leg').style.display = 'flex';
        },

        saveLeg: () => {
            const name = document.getElementById('leg-name').value || 'Untitled';
            const odds = parseFloat(document.getElementById('leg-odds').value) || -110;
            const groupA = document.getElementById('leg-group-a').value.trim();
            const groupB = document.getElementById('leg-group-b').value.trim();
            const confInput = parseFloat(document.getElementById('leg-conf').value) || 0;

            const dec = app.parlay.americanToDecimal(odds);
            const implied = 1 / dec;
            const conf = confInput > 0 ? confInput : implied;

            app.parlay.legs.push({
                id: Date.now() + Math.random().toString(),
                name: name,
                odds: odds,
                dec: dec,
                groupA: groupA,
                groupB: groupB,
                conf: conf
            });

            document.getElementById('modal-leg').style.display = 'none';
            app.parlay.renderLegs();
        },

        renderLegs: () => {
            const div = document.getElementById('pe-legs-list');
            document.getElementById('pe-leg-count').innerText = `${app.parlay.legs.length} Legs`;
            
            if(app.parlay.legs.length === 0) {
                div.innerHTML = '<div style="text-align:center; color:#555; padding:10px;">No legs added.</div>';
                return;
            }

            div.innerHTML = app.parlay.legs.map((l, i) => `
                <div style="background:#111; border:1px solid #333; padding:8px; margin-bottom:5px; border-radius:4px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <div style="font-weight:bold; color:#fff;">${l.name}</div>
                        <div style="font-size:0.65rem; color:#aaa;">
                            ${l.odds} • ${(l.conf*100).toFixed(0)}% Win
                            ${l.groupA ? `<span style="color:#FF5252; margin-left:4px;">⛔ ${l.groupA}</span>` : ''}
                            ${l.groupB ? `<span style="color:#FFAB40; margin-left:4px;">🔗 ${l.groupB}</span>` : ''}
                        </div>
                    </div>
                    <button onclick="app.parlay.removeLeg(${i})" style="color:red; background:none; border:none; cursor:pointer;">✕</button>
                </div>
            `).join('');
        },

        removeLeg: (i) => {
            app.parlay.legs.splice(i, 1);
            app.parlay.renderLegs();
        },
        
        clearLegs: () => {
            if(confirm("Clear all legs?")) {
                app.parlay.legs = [];
                app.parlay.renderLegs();
                document.getElementById('pe-results').innerHTML = '';
            }
        },

        // 3. THE ADVANCED ALGORITHM
        generate: () => {
            const legs = app.parlay.legs;
            if(legs.length < 2) return alert("Need at least 2 legs.");

            // Inputs
            const bankroll = parseFloat(document.getElementById('pe-bankroll').value) || 1000;
            const kellyFrac = parseFloat(document.getElementById('pe-kelly').value) || 0.25;
            const minLegs = parseInt(document.getElementById('pe-min').value) || 2;
            const maxLegs = parseInt(document.getElementById('pe-max').value) || 4;
            const targetCount = parseInt(document.getElementById('pe-count').value) || 10;
            const maxExposurePct = (parseFloat(document.getElementById('pe-exposure').value) || 50) / 100;
            const strategyMix = (parseInt(document.getElementById('pe-strategy').value) || 30) / 100;

            const resultsDiv = document.getElementById('pe-results');
            resultsDiv.innerHTML = '<div style="text-align:center; color:#aaa;">Running Simulations...</div>';

            // A. GENERATE POOL
            const pool = [];
            const uniqueHashes = new Set();
            let attempts = 0;

            // Try to find up to 2000 valid combos
            while (pool.length < 2000 && attempts < 10000) {
                attempts++;
                const size = Math.floor(Math.random() * (maxLegs - minLegs + 1)) + minLegs;
                const shuffled = [...legs].sort(() => 0.5 - Math.random());
                
                const combo = [];
                const usedGroupA = new Set();
                const usedGroupB = new Set();

                for(let leg of shuffled) {
                    if (combo.length >= size) break;

                    // CHECK CONFLICTS
                    if (leg.groupA && usedGroupA.has(leg.groupA)) continue; // Conflict A
                    if (leg.groupB && usedGroupB.has(leg.groupB)) continue; // Conflict B

                    combo.push(leg);
                    if(leg.groupA) usedGroupA.add(leg.groupA);
                    if(leg.groupB) usedGroupB.add(leg.groupB);
                }

                if(combo.length < minLegs) continue;

                // Unique ID
                combo.sort((a,b) => a.id > b.id ? 1 : -1);
                const hash = combo.map(c => c.id).join('|');
                if(uniqueHashes.has(hash)) continue;
                uniqueHashes.add(hash);

                // Math
                const totalDec = combo.reduce((acc, l) => acc * l.dec, 1);
                const trueProb = combo.reduce((acc, l) => acc * l.conf, 1);
                
                // Kelly
                const b = totalDec - 1;
                const p = trueProb;
                const q = 1 - p;
                let f = ((b * p) - q) / b;
                const wager = Math.max(0, bankroll * (f * kellyFrac));
                const ev = (p * (totalDec * wager - wager)) - (q * wager);

                if(ev > 0 && wager > 0) {
                    pool.push({ legs: combo, odds: totalDec, prob: trueProb, wager, ev, payout: wager * totalDec });
                }
            }

            // B. SELECTION (Greedy + Random Mix + Exposure Cap)
            pool.sort((a, b) => b.ev - a.ev); // Best first

            const finalPortfolio = [];
            const legCounts = {};

            const canAdd = (bet) => {
                for(let l of bet.legs) {
                    const currentCount = legCounts[l.id] || 0;
                    if ((currentCount + 1) / targetCount > maxExposurePct) return false;
                }
                return true;
            };

            const commit = (bet) => {
                finalPortfolio.push(bet);
                for(let l of bet.legs) legCounts[l.id] = (legCounts[l.id] || 0) + 1;
            };

            // 1. Greedy Pass
            const greedyTarget = Math.floor(targetCount * (1 - strategyMix));
            for (let i = 0; i < pool.length; i++) {
                if (finalPortfolio.length >= greedyTarget) break;
                if (canAdd(pool[i])) commit(pool[i]);
            }

            // 2. Random/Diversity Pass
            const remainingPool = pool.filter(p => !finalPortfolio.includes(p));
            remainingPool.sort(() => 0.5 - Math.random()); // Shuffle
            for (let i = 0; i < remainingPool.length; i++) {
                if (finalPortfolio.length >= targetCount) break;
                if (canAdd(remainingPool[i])) commit(remainingPool[i]);
            }

            // C. RENDER
            resultsDiv.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; margin-top:20px;">
                    <h3>${finalPortfolio.length} TICKETS GENERATED</h3>
                </div>
            ` + finalPortfolio.map((t, i) => {
                const amer = app.parlay.decimalToAmerican(t.odds);
                const oddsStr = amer > 0 ? `+${amer.toFixed(0)}` : amer.toFixed(0);
                
                return `
                <div class="card" style="border-left: 4px solid #00FF41; margin-bottom:10px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                        <span style="font-weight:bold; color:#00FF41;">TICKET #${i+1}</span>
                        <span style="font-weight:bold; color:#fff;">${oddsStr}</span>
                    </div>
                    <div style="font-size:0.8rem; color:#ccc; margin-bottom:8px;">
                        ${t.legs.map(l => l.name).join(' + ')}
                    </div>
                    <div style="background:#111; padding:5px; border-radius:4px; font-size:0.75rem; display:flex; justify-content:space-between;">
                        <span>Bet: <b style="color:#fff">$${t.wager.toFixed(2)}</b></span>
                        <span>Pay: <b style="color:#00E676">$${t.payout.toFixed(2)}</b></span>
                        <span>EV: <b style="color:#00FF41">$${t.ev.toFixed(2)}</b></span>
                    </div>
                </div>
                `;
            }).join('');
        }
    },

        // --- UNIVERSAL COLLAPSER ---
    // Automatically turns every Card in 'view-tools' into a collapsible folder
    setupCollapsibles: () => {
        const toolView = document.getElementById('view-tools');
        if(!toolView) return;

        // Find all cards that haven't been processed yet
        const cards = toolView.querySelectorAll('.card:not(.processed)');

        cards.forEach(card => {
            // Mark as processed so we don't do it twice
            card.classList.add('processed');

            // 1. Identify the Header (It's usually the first element)
            const header = card.firstElementChild;
            
            // Safety: If no header, skip
            if(!header) return;

            // 2. Create a Content Wrapper for everything else
            // We move all other children into this wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'card-content-wrapper';
            wrapper.style.display = 'none'; // Default to CLOSED
            wrapper.style.marginTop = '15px';
            wrapper.style.paddingTop = '15px';
            wrapper.style.borderTop = '1px solid #333';

            // Move existing elements (inputs, buttons, etc) into wrapper
            while (card.children.length > 1) {
                wrapper.appendChild(card.children[1]);
            }
            card.appendChild(wrapper);

            // 3. Make Header Clickable
            header.style.cursor = 'pointer';
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            
            // Add Arrow Icon
            const icon = document.createElement('i');
            icon.className = 'material-icons-round';
            icon.innerText = 'expand_more';
            icon.style.color = '#777';
            icon.style.transition = 'transform 0.3s';
            
            // Append icon to header (if header is a flex row, add to end. if H2, make it flex)
            if (header.tagName === 'H2') {
                // Wrap text to keep it clean
                const text = header.innerText;
                header.innerHTML = `<span>${text}</span>`;
                header.appendChild(icon);
            } else {
                // If header is a DIV (like Kalshi), just append icon
                header.appendChild(icon);
            }

            // 4. Click Event
            header.onclick = (e) => {
                // Prevent triggering if clicking a button inside the header (like Refresh)
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

                const isOpen = wrapper.style.display === 'block';
                wrapper.style.display = isOpen ? 'none' : 'block';
                icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
                icon.style.color = isOpen ? '#777' : '#fff';
            };
        });
    },

    makeQR: () => {
        const txt = document.getElementById('qr-input').value;
        const container = document.getElementById('qrcode');
        container.innerHTML = ''; // Clear old
        if(!txt) return;
        new QRCode(container, {
            text: txt,
            width: 128,
            height: 128
        });
    },

    charts: {},
    data: { 
        txs: [], tickets: [], inventory: [], notes: [], 
        liveSession: { active: false, start: null, buyin: 0, paused: false, pauseStart: null, totalPaused: 0 },
        btcHoldings: 0, ethHoldings: 0,
        goal: 10000 
    },
    calViewDate: new Date(), 
    filter: { mode: 'all', val: null, start: null, end: null, search: '', excludedCats: [] },
    
    currentId: null, currentTicketId: null, currentInvId: null, currentNoteId: null, isExpense: false, liveTimerInterval: null,
    noteColors: ['#D50000', '#00C853', '#2962FF', '#FFD600', '#FF6D00', '#C51162'],

    colors: { pokerCash:'#00E5FF', pokerTourney:'#2979FF', bets:'#FF9100', job:'#E91E63', sales:'#D500F9', crypto:'#FFEA00', dice:'#2196F3', casino:'#009688', kalshi:'#651FFF', expenses:'#EF5350', miscIncome:'#9E9E9E' },
    icons: { pokerCash:'🃏', pokerTourney:'🏆', bets:'🏈', job:'💼', sales:'🏷️', crypto:'🪙', dice:'🎲', casino:'🎰', kalshi:'📈', expenses:'🧾', miscIncome:'💰' },
    
    bookAbbr: { 'FanDuel':'FD', 'DraftKings':'DK', 'BetMGM':'MGM', 'Caesars':'CZR', 'ESPN Bet':'ESPN', 'Bet365':'B365', 'PrizePicks':'PP', 'Underdog':'UD', 'Rebet':'Rebet', 'Fliff':'Fliff', 'HardRock':'HR', 'Bovada':'Bov', 'BetOnline':'BOL', 'Other':'Oth' },
    
    expCats: ['Gas','Groceries','Food','Drugs','Nicotine','Entertainment','Travel','Bill','Misc'],
    expColors: { 'Gas': '#FF1744', 'Groceries': '#76FF03', 'Food': '#2979FF', 'Drugs': '#D500F9', 'Nicotine': '#FFEA00', 'Entertainment': '#F50057', 'Travel': '#00E5FF', 'Bill': '#FFFFFF', 'Misc': '#FF3D00' },

    // FIXED INIT FUNCTION (Removed the duplicate nested init)
    init: () => {
        const saved = localStorage.getItem('bankroll_os_v19_1'); 
        if (saved) { 
            try { 
                const parsed = JSON.parse(saved);
                app.data = { ...app.data, ...parsed };
                // Ensure arrays exist
                if(!app.data.txs) app.data.txs=[]; 
                if(!app.data.tickets) app.data.tickets=[]; 
                if(!app.data.inventory) app.data.inventory=[];
                if(!app.data.notes) app.data.notes=[];
                if(!app.data.recurring) app.data.recurring=[];
                if(!app.data.liveSession) app.data.liveSession={active:false};
                if(!app.data.goal) app.data.goal = 10000;
            } catch(e){ console.log("Init Error", e); } 
            // Load Crypto Data on Start
setTimeout(() => {
    app.crypto.fetchTicker();
    app.crypto.renderHistory('month'); // Default view
}, 1000);

                    // Initialize Flatpickr for all date inputs
        flatpickr("input[type=datetime-local]", {
            enableTime: true,
            dateFormat: "Y-m-d\\TH:i",
            theme: "dark",
            disableMobile: "true" // Forces the nice theme even on mobile
        });
        flatpickr("input[type=date]", {
            dateFormat: "Y-m-d",
            theme: "dark"
        });

        }

        // MOVED CHART SETTINGS HERE (Safe from crashes)
        if (typeof Chart !== 'undefined') {
            Chart.defaults.font.family = "'Martian Mono', monospace";
            Chart.defaults.color = "#FF3D00";
            Chart.defaults.borderColor = "#333";
            Chart.register(ChartDataLabels);
        }

        if(app.data.liveSession.active) app.startLiveTimer();
        app.render(); 
        app.fetchCrypto();
        app.renderRecurringTools();    
        app.setupCollapsibles(); 
    },

    save: () => { localStorage.setItem('bankroll_os_v19_1', JSON.stringify(app.data)); app.render(); },

    nav: (view) => {
        document.querySelectorAll('.container[id^="view-"]').forEach(el => el.style.display = 'none');
        document.getElementById(`view-${view}`).style.display = 'block';
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        const navBtn = document.getElementById(`nav-${view}`);
        if(navBtn) navBtn.classList.add('active');
        
        if (view === 'crypto') app.fetchCrypto();
        if (view === 'stats') { 
            app.renderChart(); app.renderPies(); app.renderHeatmap(); 
            app.renderExpenseChart(); app.renderSportsChart(); app.renderROITable();
            app.renderCalendar(); app.renderDrawdown(); app.renderHOF();
            app.renderRecurringStats();
        }
        if (view === 'tickets') app.renderTickets();
        if (view === 'tools') { app.renderInventory(); app.renderNotes(); app.renderRecurringTools(); }
    },
    setFilter: (mode) => {
        app.filter.mode = mode;
        
        // 1. Update UI Buttons
        document.querySelectorAll('.filter-chip').forEach(el => el.classList.remove('active'));
        document.getElementById(`filter-${mode}`).classList.add('active');
        
        // 2. Handle Date Range Visibility
        const isRange = mode === 'custom';
        document.getElementById('custom-date-range').classList.toggle('show', isRange);
        if(isRange) {
            app.filter.start = document.getElementById('date-start').value;
            app.filter.end = document.getElementById('date-end').value;
        }
        
        // 3. Render Main UI
        app.render(); 
        if(document.getElementById('view-stats').style.display !== 'none') { 
            app.renderChart(); app.renderPies(); app.renderHeatmap(); 
            app.renderExpenseChart(); app.renderSportsChart(); app.renderROITable();
            app.renderCalendar(); app.renderDrawdown(); app.renderHOF();
            
            // UPDATE BITCOIN CHART
            if(app.crypto && app.crypto.renderHistory) {
                app.crypto.renderHistory(mode);
            }
        }
        if(document.getElementById('view-tickets').style.display !== 'none') app.renderTickets(); 
    },


    

    
    toggleCustomDate: () => { app.setFilter('custom'); },

    openFilterModal: () => {
        document.getElementById('modal-filter').classList.add('open');
        const list = document.getElementById('filter-options-list');
        list.innerHTML = '';
        Object.keys(app.colors).forEach(cat => {
            const isChecked = !app.filter.excludedCats.includes(cat);
            const el = document.createElement('div'); el.className = 'filter-opt-row';
            el.innerHTML = `
                <div class="filter-opt-label">${app.icons[cat]} ${app.catLabel(cat)}</div>
                <div class="toggle-row" style="margin:0; padding:4px; border:none; background:none;">
                    <input type="checkbox" id="chk-cat-${cat}" class="toggle-checkbox" ${isChecked?'checked':''}>
                    <label for="chk-cat-${cat}" class="toggle-switch"></label>
                </div>`;
            list.appendChild(el);
        });
    },
    applyFilters: () => {
        app.filter.excludedCats = [];
        Object.keys(app.colors).forEach(cat => {
            if(!document.getElementById(`chk-cat-${cat}`).checked) app.filter.excludedCats.push(cat);
        });
        document.getElementById('modal-filter').classList.remove('open');
        app.render();
    },
    closeFilterModal: () => document.getElementById('modal-filter').classList.remove('open'),
    
    checkFilter: (tObj) => {
        if (tObj.cat && app.filter.excludedCats.includes(tObj.cat)) return false;
        const term = document.getElementById('search-term').value.toLowerCase();
        if (term) {
            let textData = (tObj.desc || '') + (tObj.notes || '') + (tObj.sport || '');
            if(tObj.details) textData += JSON.stringify(tObj.details);
            if (!textData.toLowerCase().includes(term)) return false;
        }
        const dateStr = tObj.date || new Date(tObj.id).toISOString();
        const txDate = new Date(dateStr);
        const txDatePart = dateStr.split('T')[0]; 
        const now = new Date();
        const localNow = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

        if (app.filter.mode === 'all') return true;
        if (app.filter.mode === 'day') return txDatePart === localNow;
        if (app.filter.mode === 'week') { const day = now.getDay() || 7; const start = new Date(now); start.setHours(-24 * (day - 1)); start.setHours(0,0,0,0); return txDate >= start; }
        if (app.filter.mode === 'month') return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
        if (app.filter.mode === 'year') return txDate.getFullYear() === now.getFullYear();
        if (app.filter.mode === 'custom') {
            const startStr = document.getElementById('date-start').value;
            const endStr = document.getElementById('date-end').value;
            if(!startStr || !endStr) return true; 
            return txDatePart >= startStr && txDatePart <= endStr;
        }
        return true;
    },


    // 1. Monte Carlo Simulator
    runMonteCarlo: () => {
        const wager = parseFloat(document.getElementById('mc-wager').value);
        const oddsStr = document.getElementById('mc-odds').value;
        const winRate = parseFloat(document.getElementById('mc-prob').value);
        const resDiv = document.getElementById('mc-res');

        if(!wager || !oddsStr || !winRate) return;

        let dec = parseFloat(oddsStr);
        if(Math.abs(dec) >= 100) dec = (dec > 0) ? (dec/100)+1 : (100/Math.abs(dec))+1;
        const profit = wager * (dec - 1);

        let totalProfit = 0;
        let maxDrawdown = 0;
        let bankruptcies = 0;
        const simRuns = 1000;
        const betsPerRun = 100;

        for(let i=0; i<simRuns; i++) {
            let runBank = 0;
            let runHigh = 0;
            for(let j=0; j<betsPerRun; j++) {
                if(Math.random() * 100 < winRate) runBank += profit;
                else runBank -= wager;
                
                if(runBank > runHigh) runHigh = runBank;
                const dd = runHigh - runBank;
                if(dd > maxDrawdown) maxDrawdown = dd;
            }
            totalProfit += runBank;
            if (runBank < -(wager * 20)) bankruptcies++; 
        }

        const avg = totalProfit / simRuns;
        const color = avg > 0 ? '#00E676' : '#D50000';

        resDiv.style.display = 'block';
        resDiv.innerHTML = `
            <div style="margin-bottom:6px;">Expected Result (100 bets): <span style="color:${color}; font-weight:bold; font-size:1rem;">$${Math.round(avg).toLocaleString()}</span></div>
            <div style="color:#aaa;">Max Drawdown Risk: <span style="color:#D50000">$${Math.round(maxDrawdown).toLocaleString()}</span></div>
            <div style="color:#aaa;">Survival Rate: ${((1 - (bankruptcies/simRuns))*100).toFixed(1)}%</div>
        `;
    },
 
    openGoalModal: () => {
        document.getElementById('modal-goal').classList.add('open');
        document.getElementById('goal-target-input').value = app.data.goal;
    },
    saveGoal: () => {
        const g = parseFloat(document.getElementById('goal-target-input').value);
        if(g && g > 0) {
            app.data.goal = g;
            app.save();
            document.getElementById('modal-goal').classList.remove('open');
        }
    },
   // --- SETTINGS POPUP ---
    editGoal: () => {
        const currentGoal = localStorage.getItem('goal') || 100000;
        const current401k = localStorage.getItem('401k') || 0;

        // 1. Ask for Goal
        const newGoal = prompt("Set your Net Worth Goal ($):", currentGoal);
        if (newGoal !== null) {
            localStorage.setItem('goal', parseFloat(newGoal));
            
            // 2. Ask for 401k Balance
            const newRetire = prompt("Update 401k/Retirement Balance ($):", current401k);
            if (newRetire !== null) {
                localStorage.setItem('401k', parseFloat(newRetire));
            }
            
            // 3. FORCE REFRESH
            app.render(); 
        }
    }, // <--- Add a comma here too if there is code below it
                    render: () => {
        // --- 1. CALCULATE ASSETS ---
        
        // A. Bankroll (Sum of all transactions)
        const bankroll = app.data.txs.reduce((sum, t) => sum + t.amt, 0);

        // B. 401k (Sum of paycheck contributions)
        // We look for category 'job' and add the 'k401' detail if it exists
        const retire = app.data.txs.reduce((sum, t) => {
            if (t.cat === 'job' && t.details && t.details.k401) {
                return sum + (parseFloat(t.details.k401) || 0);
            }
            return sum;
        }, 0);

        // C. Crypto (Live Value)
        const btcPrice = (app.prices && app.prices.btc) ? app.prices.btc : 0;
        const ethPrice = (app.prices && app.prices.eth) ? app.prices.eth : 0;
        const btcVal = (parseFloat(localStorage.getItem('btc_qty')) || 0) * btcPrice;
        const ethVal = (parseFloat(localStorage.getItem('eth_qty')) || 0) * ethPrice;
        const cryptoTotal = btcVal + ethVal;

        // D. Net Worth (Total of all 3)
        const netWorth = bankroll + retire + cryptoTotal;
        
        // E. Goal Progress (Bankroll vs Goal)
        const goal = parseFloat(localStorage.getItem('goal')) || 10000;
        const pctRaw = (bankroll / goal) * 100; // Changed from netWorth to bankroll
        const pct = Math.min(100, Math.max(0, pctRaw));

        // --- 2. UPDATE DASHBOARD CARD ---
        const fmt = (n) => `$${Math.round(n).toLocaleString()}`;

        // HERO: Bankroll (Green/Red Logic)
        if(document.getElementById('dash-hero')) {
            document.getElementById('dash-hero').innerText = fmt(bankroll);
            document.getElementById('dash-hero').style.color = bankroll < 0 ? '#FF5252' : '#00FF41';
        }

        // GRID: Net Worth (Orange), Crypto (Purple), 401k (Pink)
        if(document.getElementById('dash-networth')) document.getElementById('dash-networth').innerText = fmt(netWorth);
        if(document.getElementById('dash-crypto')) document.getElementById('dash-crypto').innerText = fmt(cryptoTotal);
        if(document.getElementById('dash-401k')) document.getElementById('dash-401k').innerText = fmt(retire);

        // PROGRESS BAR
        if(document.getElementById('dash-bar')) {
            const bar = document.getElementById('dash-bar');
            bar.style.width = `${pct}%`;
            document.getElementById('dash-pct').innerText = `${pct.toFixed(1)}%`;
            document.getElementById('dash-target').innerText = `Goal: ${fmt(goal)}`;
            
            // Color Logic for Bar
            if (pct < 25) bar.style.background = 'linear-gradient(90deg, #D50000, #FF5252)'; 
            else if (pct < 75) bar.style.background = 'linear-gradient(90deg, #FF6D00, #FFAB40)';
            else bar.style.background = 'linear-gradient(90deg, #00C853, #00E676)';
        }

        // --- 3. FILTERED PERIOD PROFIT ---
        const filteredTxs = app.data.txs.filter(t => app.checkFilter(t));
        const periodTotal = filteredTxs.reduce((sum, t) => sum + t.amt, 0);
        
        if(document.getElementById('dash-period')) {
            const el = document.getElementById('dash-period');
            el.innerText = (periodTotal >= 0 ? '+' : '-') + `$${Math.abs(Math.round(periodTotal)).toLocaleString()}`;
            el.style.color = periodTotal >= 0 ? '#00E676' : '#FF5252';
        }

        // --- 4. RENDER LIST ---
        const list = document.getElementById('tx-list');
        if (list) {
            list.innerHTML = '';
            const sorted = [...filteredTxs].sort((a, b) => new Date(b.date) - new Date(a.date));

            sorted.forEach(t => {
                const div = document.createElement('div');
                div.className = 'tx-item';
                div.onclick = () => app.openModal(t);
                const color = app.colors[t.cat] || '#FFF';
                div.style.borderLeftColor = color;
                
                let iconCode = 'attach_money';
                if (t.cat === 'pokerCash') iconCode = 'spades'; 
                else {
                    const iconMap = { job:'work', bets:'sports_football', sales:'sell', expenses:'receipt', dice:'casino', casino:'local_play', crypto:'currency_bitcoin', miscIncome:'savings', kalshi:'query_stats' };
                    iconCode = iconMap[t.cat] || 'attach_money';
                }

                const tags = [];
                const dateStr = new Date(t.date).toLocaleString('en-US', {month:'short', day:'numeric'});
                let titleText = (t.desc && t.desc.trim() !== "") ? t.desc : app.catLabel(t.cat);

                if (t.cat === 'bets' && t.details) {
                    titleText = t.desc || "Bet";
                    if(t.details.wager) tags.push(`$${t.details.wager}`);
                    const w = t.details.won||0;
                    const l = t.details.lost||0;
                    const totalTickets = (t.details.tickets) ? t.details.tickets : (w + l);
                    tags.push(`${w}/${totalTickets}`);
                    if(t.details.book) tags.push(app.bookAbbr[t.details.book] || t.details.book);
                    if(t.details.sport) tags.push(t.details.sport);
                }
                else if (t.cat === 'pokerCash' && t.details && t.details.dur) tags.push(`${t.details.dur}h`);
                else if (t.cat === 'expenses' && t.details && t.details.sub) tags.push(t.details.sub.toUpperCase());
                else if (t.cat === 'dice') tags.push('Dice');
                else if (t.cat === 'casino') tags.push('Casino');

                const tagHtml = tags.map(tag => `<span class="tx-tag">${tag}</span>`).join('');
                const iconHtml = (t.cat === 'pokerCash') 
                    ? `<div class="tx-icon" style="background:${color}20; color:${color}; font-family:serif;">♠</div>`
                    : `<div class="tx-icon" style="background:${color}20; color:${color}"><i class="material-icons-round">${iconCode}</i></div>`;
                const amtStr = `$${Math.abs(t.amt).toLocaleString()}`;

                div.innerHTML = `
                    ${iconHtml}
                    <div class="tx-info"><div class="tx-title" style="color:${color}">${titleText}</div><div class="tx-meta"><span>${dateStr}</span>${tagHtml}</div></div>
                    <div class="tx-amt ${t.amt < 0 ? 'neg' : 'pos'}">${amtStr}</div>
                `;
                list.appendChild(div);
            });
        }
    },





    renderTickets: () => { 
        const div = document.getElementById('ticket-list'); 
        div.innerHTML=''; 
        const filtered = app.data.tickets.filter(t => app.checkFilter(t)); 
        const sorted = [...filtered].sort((a,b)=>b.id-a.id); 
        sorted.forEach(t => {
            const el = document.createElement('div'); 
            el.className = 'ticket-card'; 
            el.onclick = () => app.openTicketModal(t); 
            const stMap = { 'Won':'#00C853', 'Lost':'#D50000', 'Pending':'#FF9100', 'Early Cash':'#FFEA00' };
            const statusColor = stMap[t.status] || '#FF9100';
            el.style.borderRightColor = statusColor;
            if (t.sport === 'Kalshi') el.style.borderLeftColor = 'var(--kalshi)';
            else el.style.borderLeftColor = 'var(--bets)';
            const stClass = t.status === 'Won' ? 'won' : (t.status === 'Lost' ? 'lost' : (t.status === 'Early Cash' ? 'early' : 'pending'));
            let pot = 0;
            if(t.oddsDec) pot = t.wager * t.oddsDec;
            else if(t.oddsAm) {
                let dec = parseFloat(t.oddsAm);
                if(!isNaN(dec)) { dec = (dec > 0 ? (dec/100)+1 : (100/Math.abs(dec))+1); pot = t.wager * dec; }
            }
            if (t.isBonus) pot -= t.wager;
            const potDisplay = pot > 0 ? `$${pot.toFixed(2)}` : '-';
            const bonusBadge = t.isBonus ? '<span style="background:#333; color:#fff; padding:2px 6px; border-radius:4px; font-size:0.65rem; margin-left:6px;">BONUS</span>' : '';
            let od = '-'; if(t.oddsAm) od=(parseFloat(t.oddsAm)>0?'+':'')+t.oddsAm; if(t.oddsDec) od+=` (${t.oddsDec})`; 
            el.innerHTML = `
                <div class="ticket-status ${stClass}">${t.status||'Pending'}</div>
                <div style="font-weight:bold; font-size:0.9rem; color:var(--bets); margin-bottom:4px; display:flex; align-items:center;">
                    ${t.sport === 'Kalshi' ? '<span style="color:var(--kalshi)">Kalshi</span>' : (t.sport||'Bet')} 
                    ${bonusBadge}
                </div>
                <div style="font-size:0.75rem; color:var(--sub); margin-bottom:8px;">${t.legs||0} Legs • ${od}</div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <span style="font-weight:bold;">Wager: $${t.wager}</span>
                    <span style="font-size:0.75rem; color:var(--sub);">${t.legsWon||0}/${t.legs||0} Won</span>
                </div>
                <div style="font-size:0.8rem; color:var(--success);">Est. Payout: ${potDisplay}</div>
                ${t.notes?`<div class="ticket-note">${t.notes}</div>`:''}
            `; 
            div.appendChild(el); 
        }); 
    },

    renderCalendar: () => {
        const grid = document.getElementById('calendar-grid');
        grid.innerHTML = '';
        
        const days = ['S','M','T','W','T','F','S'];
        days.forEach(d => {
            const dh = document.createElement('div'); 
            dh.className = 'calendar-day-header'; 
            dh.innerText = d; 
            grid.appendChild(dh);
        });

        const year = app.calViewDate.getFullYear();
        const month = app.calViewDate.getMonth();
        
        document.getElementById('cal-month-label').innerText = app.calViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for(let i=0; i<firstDay; i++) {
            const e = document.createElement('div'); e.className = 'calendar-day empty'; grid.appendChild(e);
        }

        const todayStr = new Date().toISOString().split('T')[0];

        for(let i=1; i<=daysInMonth; i++) {
            const dateObj = new Date(year, month, i);
            const dateStr = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            
            const dayTxs = app.data.txs.filter(t => t.date.split('T')[0] === dateStr);
            const net = Math.round(dayTxs.reduce((sum, t) => sum + t.amt, 0));

            const cell = document.createElement('div');
            let classes = 'calendar-day';
            if (dateStr === todayStr) classes += ' today';
            if (net > 0) classes += ' cal-green';
            else if (net < 0) classes += ' cal-red';
            
            cell.className = classes;
            cell.onclick = () => app.filterDayFromCalendar(dateStr);

            const displayNet = net !== 0 ? (net > 0 ? '+' : '') + (Math.abs(net) > 999 ? (Math.abs(net)/1000).toFixed(1)+'k' : Math.abs(net)) : '';

            cell.innerHTML = `<span class="cal-num">${i}</span>${net!==0 ? `<span class="cal-val">${displayNet}</span>` : ''}`;
            grid.appendChild(cell);
        }
    },

    changeMonth: (dir) => {
        app.calViewDate.setMonth(app.calViewDate.getMonth() + dir);
        app.renderCalendar();
    },

    filterDayFromCalendar: (dateStr) => {
        document.getElementById('date-start').value = dateStr;
        document.getElementById('date-end').value = dateStr;
        app.setFilter('custom');
        app.nav('dash');
    },
    calcFairValue: () => {
        const amA = parseFloat(document.getElementById('fv-odds-a').value);
        const amB = parseFloat(document.getElementById('fv-odds-b').value);
        if(isNaN(amA) || isNaN(amB)) return;
        const getImp = (am) => am > 0 ? 100/(am+100) : Math.abs(am)/(Math.abs(am)+100);
        const impA = getImp(amA); const impB = getImp(amB);
        const totalImp = impA + impB;
        const trueA = impA / totalImp; const trueB = impB / totalImp;
        const getAm = (p) => p > 0.5 ? -((p/(1-p))*100) : ((1-p)/p)*100;
        const fmt = (n) => { const val = Math.round(n); return val > 0 ? `+${val}` : val; };
        document.getElementById('fv-result-box').style.display = 'block';
        document.getElementById('fv-res-a').innerText = `${fmt(getAm(trueA))} (${(trueA*100).toFixed(1)}%)`;
        document.getElementById('fv-res-b').innerText = `${fmt(getAm(trueB))} (${(trueB*100).toFixed(1)}%)`;
    },

    renderDrawdown: () => {
        const ctx = document.getElementById('drawdownChart').getContext('2d');
        if(app.charts.drawdown) app.charts.drawdown.destroy();
        const sorted = [...app.data.txs].sort((a,b) => new Date(a.date) - new Date(b.date));
        const labels = []; const data = [];
        let currentBankroll = 0; let allTimeHigh = 0;
        sorted.forEach(t => {
            currentBankroll += t.amt;
            if(currentBankroll > allTimeHigh) allTimeHigh = currentBankroll;
            let ddPct = 0;
            if (allTimeHigh > 0) ddPct = ((currentBankroll - allTimeHigh) / allTimeHigh) * 100;
            labels.push(new Date(t.date).toLocaleDateString());
            data.push(ddPct);
        });
        app.charts.drawdown = new Chart(ctx, {
            type: 'line',
            data: { labels: labels, datasets: [{ label: 'Drawdown %', data: data, borderColor: '#D50000', backgroundColor: 'rgba(213, 0, 0, 0.2)', borderWidth: 1.5, fill: true, pointRadius: 0, tension: 0.1 }] },
            options: { interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: false }, datalabels: { display: false }, tooltip: { callbacks: { label: (ctx) => `Drawdown: ${ctx.parsed.y.toFixed(2)}%` } } }, scales: { x: { display: false }, y: { grid: { color: '#222' }, ticks: { color: '#777', callback: (v) => v + '%' }, suggestedMin: -20, max: 1 } } }
        });
    },

    renderHOF: () => {
        const grid = document.getElementById('hof-grid');
        grid.innerHTML = '';
        const txs = app.data.txs;
        if(txs.length === 0) { grid.innerHTML = '<div style="color:#555; grid-column:span 2; text-align:center;">No Data Yet</div>'; return; }

        let maxWin = 0; let maxLoss = 0;
        txs.forEach(t => {
            if(t.amt > maxWin) maxWin = t.amt;
            if(t.amt < maxLoss) maxLoss = t.amt;
        });

        const sorted = [...txs].sort((a,b) => new Date(a.date) - new Date(b.date));
        let currWin = 0; let bestWinStreak = 0;
        let currLoss = 0; let worstLossStreak = 0;
        let runningBal = 0; let ath = 0;

        const dailyMap = {};
        sorted.forEach(t => {
            const d = t.date.split('T')[0];
            dailyMap[d] = (dailyMap[d] || 0) + t.amt;
            runningBal += t.amt;
            if(runningBal > ath) ath = runningBal;
        });

        Object.values(dailyMap).forEach(net => {
            if(net > 0) {
                currWin++; bestWinStreak = Math.max(bestWinStreak, currWin);
                currLoss = 0;
            } else if (net < 0) {
                currLoss++; worstLossStreak = Math.max(worstLossStreak, currLoss);
                currWin = 0;
            }
        });

        const items = [
            { label: 'ATH Bankroll', val: `$${Math.round(ath).toLocaleString()}`, icon: 'emoji_events' },
            { label: 'Biggest Win', val: `+$${Math.round(maxWin).toLocaleString()}`, icon: 'arrow_upward' },
            { label: 'Worst Beat', val: `-$${Math.abs(Math.round(maxLoss)).toLocaleString()}`, icon: 'arrow_downward' },
            { label: 'Longest Win Streak', val: `${bestWinStreak} Days`, icon: 'local_fire_department' }
        ];

        items.forEach(i => {
            const el = document.createElement('div'); el.className = 'hof-item';
            el.innerHTML = `<div class="hof-icon"><i class="material-icons-round">${i.icon}</i></div><div class="hof-label">${i.label}</div><div class="hof-val">${i.val}</div>`;
            grid.appendChild(el);
        });
    },

    renderHeatmap: () => {
        const map = document.getElementById('heatmap'); map.innerHTML = '';
        const today = new Date();
        for (let i=34; i>=0; i--) {
            const d = new Date(); d.setDate(today.getDate() - i);
            const checkStr = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const dayTxs = app.data.txs.filter(t => t.date.split('T')[0] === checkStr);
            const total = Math.round(dayTxs.reduce((s,t)=>s+t.amt,0));
            const cell = document.createElement('div');
            cell.className = `heatmap-day ${total > 0 ? 'win' : (total < 0 ? 'loss' : '')}`;
            const fmt = Math.abs(total) > 999 ? (Math.abs(total)/1000).toFixed(1) + 'k' : Math.abs(total);
            const sign = total > 0 ? '+' : (total < 0 ? '-' : '');
            const cats = {}; dayTxs.forEach(t => { cats[t.cat] = (cats[t.cat] || 0) + t.amt; });
            let breakdownStr = Object.entries(cats).map(([k,v]) => `${app.catLabel(k)}: ${v>0?'+':''}${Math.round(v)}`).join('\n');
            if(breakdownStr) breakdownStr = `\n---\n` + breakdownStr;
            const tooltip = document.createElement('div');
            tooltip.className = 'hm-tooltip';
            tooltip.innerText = `${new Date(d).toLocaleDateString()}: ${sign}$${Math.abs(total).toLocaleString()}${breakdownStr}`;
            cell.innerHTML = `<div class="hm-date">${d.getDate()}</div><div class="hm-val">${total!==0 ? sign+fmt : ''}</div>`;
            cell.appendChild(tooltip); map.appendChild(cell);
        }
    },

        renderNotes: () => {
        const list = document.getElementById('notes-list'); 
        list.innerHTML = '';
        
        // 1. Group notes by Color
        const groups = {};
        app.data.notes.forEach(n => {
            if(!groups[n.color]) groups[n.color] = [];
            groups[n.color].push(n);
        });

        // HELPER: Generates the HTML for a single note (Accordion Style)
        // This makes sure notes look the same inside OR outside folders
        const createNoteHTML = (n) => `
            <div class="note-card" style="border-left-color:${n.color}; margin-bottom:8px; background:#151515;">
                <div onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
                    <div style="overflow:hidden;">
                        <span class="note-date" style="color:${n.color}">${new Date(n.date).toLocaleDateString()}</span>
                        <div class="note-header" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${n.title || 'Untitled'}</div>
                    </div>
                    <i class="material-icons-round" style="color:#555; font-size:18px;">expand_more</i>
                </div>
                
                <div style="display:none; margin-top:8px; border-top:1px solid #333; padding-top:8px;">
                    <div class="note-body" style="max-height:150px; overflow-y:auto; font-size:0.75rem; color:#ccc; white-space:pre-wrap;">${n.body}</div>
                    <button class="btn btn-sec" style="margin-top:8px; padding:6px; font-size:0.7rem; width:100%;" onclick="app.openNoteModal(app.data.notes.find(x=>x.id==${n.id}))">OPEN FULL EDITOR</button>
                </div>
            </div>
        `;

        // 2. Render Groups
        Object.keys(groups).forEach(color => {
            const notes = groups[color];
            
            // --- FOLDER VIEW (If 2+ notes share a color) ---
            if(notes.length > 1) {
                const folderId = `folder-${color.replace('#','')}`;
                const el = document.createElement('div');
                el.className = 'note-card';
                el.style.borderLeftColor = color;
                el.style.marginBottom = '8px';
                el.style.background = '#0a0a0a'; // Slightly darker for folder container
                
                // Sort notes by date desc (Newest first)
                notes.sort((a,b) => new Date(b.date) - new Date(a.date));

                el.innerHTML = `
                    <div onclick="document.getElementById('${folderId}').style.display = document.getElementById('${folderId}').style.display === 'none' ? 'block' : 'none'" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:4px 0;">
                        <span style="font-weight:bold; color:${color}; font-size:0.9rem;">📂 GROUP (${notes.length})</span>
                        <i class="material-icons-round" style="font-size:18px; color:#aaa;">expand_more</i>
                    </div>
                    <div id="${folderId}" style="display:none; margin-top:10px; padding-left:6px; border-left: 1px dashed #333;">
                        ${notes.map(n => createNoteHTML(n)).join('')}
                    </div>
                `;
                list.appendChild(el);
            } 
            // --- SINGLE VIEW (Standard Card) ---
            else {
                const n = notes[0];
                const div = document.createElement('div');
                div.innerHTML = createNoteHTML(n); // Use same helper
                list.appendChild(div.firstElementChild); // Append the actual DOM node
            }
        });
    },

    openNoteModal: (n=null) => {
        document.getElementById('modal-note').classList.add('open');
        const now = new Date();
        const localIso = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        const set = (id,v) => document.getElementById(id).value = v;
        const cBox = document.getElementById('note-color-selector'); cBox.innerHTML = '';
        app.noteColors.forEach(c => {
            const d = document.createElement('div'); d.className = 'color-opt'; d.style.background = c;
            d.onclick = () => { document.querySelectorAll('.color-opt').forEach(x=>x.classList.remove('selected')); d.classList.add('selected'); app.tempNoteColor = c; };
            if((n && n.color === c) || (!n && c === app.noteColors[0])) { d.classList.add('selected'); app.tempNoteColor = c; }
            cBox.appendChild(d);
        });
        if(n) {
            app.currentNoteId = n.id;
            set('note-date', n.date); set('note-title', n.title); document.getElementById('note-body').value = n.body;
            document.getElementById('note-modal-title').innerText = "EDIT NOTE";
            document.getElementById('btn-delete-note').style.display = 'block';
        } else {
            app.currentNoteId = null;
            set('note-date', localIso); set('note-title', ''); document.getElementById('note-body').value = '';
            document.getElementById('note-modal-title').innerText = "NEW NOTE";
            document.getElementById('btn-delete-note').style.display = 'none';
        }
    },
    saveNote: () => {
        const title = document.getElementById('note-title').value;
        const body = document.getElementById('note-body').value;
        const date = document.getElementById('note-date').value;
        if(!title && !body) return alert("Empty Note");
        const n = { id: app.currentNoteId || Date.now(), title, body, date, color: app.tempNoteColor };
        if(app.currentNoteId) { const i = app.data.notes.findIndex(x => x.id === app.currentNoteId); if(i>-1) app.data.notes[i] = n; }
        else { app.data.notes.push(n); }
        app.save(); document.getElementById('modal-note').classList.remove('open'); app.renderNotes();
    },
    deleteNote: () => {
        if(confirm("Delete note?")) { app.data.notes = app.data.notes.filter(n => n.id !== app.currentNoteId); app.save(); document.getElementById('modal-note').classList.remove('open'); app.renderNotes(); }
    },
    toggleLive: () => {
        const s = app.data.liveSession;
        if(s.active) { app.showLiveOverlay(); } else {
            const buyin = parseFloat(prompt("Buy-in Amount ($):"));
            if(isNaN(buyin)) return;
            app.data.liveSession = { active: true, start: Date.now(), buyin: buyin, paused: false, pauseStart: null, totalPaused: 0 };
            app.save(); app.startLiveTimer(); app.showLiveOverlay();
        }
    },
    showLiveOverlay: () => { const s=app.data.liveSession; document.getElementById('live-overlay').style.display='flex'; document.getElementById('live-buyin').innerText=`$${s.buyin}`; document.getElementById('btn-pause').innerText=s.paused?"RESUME":"PAUSE"; },
    minimizeLive: () => { document.getElementById('live-overlay').style.display = 'none'; },
    startLiveTimer: () => {
        if (app.liveTimerInterval) clearInterval(app.liveTimerInterval);
        app.liveTimerInterval = setInterval(() => {
            const s = app.data.liveSession;
            if (!s.active) return;
            let now = Date.now();
            let duration = now - s.start - s.totalPaused;
            if (s.paused) duration = s.pauseStart - s.start - s.totalPaused;
            const el = document.getElementById('live-timer');
            if(el) { el.innerText = new Date(duration).toISOString().substr(11, 8); el.classList.toggle('paused', s.paused); }
        }, 1000);
    },
    liveRebuy: () => { const add=parseFloat(prompt("Add-on Amount ($):")); if(isNaN(add))return; app.data.liveSession.buyin+=add; document.getElementById('live-buyin').innerText=`$${app.data.liveSession.buyin}`; app.save(); },
    liveTogglePause: () => { const s=app.data.liveSession; if(s.paused){ s.totalPaused+=(Date.now()-s.pauseStart); s.paused=false; s.pauseStart=null; document.getElementById('btn-pause').innerText="PAUSE"; } else { s.paused=true; s.pauseStart=Date.now(); document.getElementById('btn-pause').innerText="RESUME"; } app.save(); },
    liveFinish: () => {
        const out = parseFloat(prompt("Cash Out Amount ($):")); if(isNaN(out)) return;
        const s = app.data.liveSession; const now = Date.now();
        if(s.paused) s.totalPaused += (now - s.pauseStart);
        const durationMs = now - s.start - s.totalPaused;
        const durationHrs = (durationMs / 3600000).toFixed(2);
        const profit = out - s.buyin;
        const localIso = new Date(now - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        app.data.txs.push({ id: now, cat: 'pokerCash', date: localIso, amt: profit, desc: 'Live Session', details: { buyin: s.buyin, cashout: out, dur: durationHrs } });
        app.data.liveSession.active = false; app.save(); clearInterval(app.liveTimerInterval); document.getElementById('live-overlay').style.display = 'none'; app.render(); 
    },
    renderInventory: () => {
        const list = document.getElementById('inventory-list'); list.innerHTML = '';
        if(app.data.inventory.length === 0) { list.innerHTML = '<div style="text-align:center; color:#555; padding:20px;">No items in stock.</div>'; return; }
        app.data.inventory.forEach(item => {
            const el = document.createElement('div'); el.className = 'inv-card';
            const unitCost = item.qty > 0 ? (item.totalCost / item.qty) : 0;
            el.innerHTML = `<div><div class="inv-title">${item.name}</div><div class="inv-meta">Cost Basis: $${unitCost.toFixed(2)} / ea</div><button class="inv-btn" onclick="app.openInvSellModal(${item.id})">SELL ITEM</button></div><div class="inv-qty">x${item.qty}</div>`;
            list.appendChild(el);
        });
    },
    openInvAddModal: () => document.getElementById('modal-inv-add').classList.add('open'),
    saveInventory: () => {
        const name=document.getElementById('inv-name').value, qty=parseFloat(document.getElementById('inv-qty').value), cost=parseFloat(document.getElementById('inv-cost').value);
        if(!name||!qty||isNaN(cost)) return alert("Invalid details");
        app.data.inventory.push({ id: Date.now(), name, qty, totalCost: cost });
        app.save(); document.getElementById('modal-inv-add').classList.remove('open'); document.getElementById('inv-name').value=''; document.getElementById('inv-qty').value=''; document.getElementById('inv-cost').value=''; app.renderInventory();
    },
    openInvSellModal: (id) => { app.currentInvId = id; const item = app.data.inventory.find(i => i.id === id); if(item){ document.getElementById('sell-item-title').innerText = item.name; document.getElementById('sell-qty').value = ''; document.getElementById('sell-price').value = ''; document.getElementById('modal-inv-sell').classList.add('open'); } },
    processSale: () => {
        const qty=parseFloat(document.getElementById('sell-qty').value), price=parseFloat(document.getElementById('sell-price').value);
        const idx = app.data.inventory.findIndex(i => i.id === app.currentInvId);
        if(idx === -1 || !qty || !price) return;
        const item = app.data.inventory[idx];
        if(qty > item.qty) { alert("Not enough stock!"); return; }
        const unitCost = item.totalCost / item.qty;
        const revenue = qty * price;
        const costBasis = qty * unitCost;
        const profit = revenue - costBasis;
        const now = new Date();
        const localIso = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        app.data.txs.push({ id: Date.now(), cat: 'sales', date: localIso, amt: profit, desc: `Sold ${qty}x ${item.name}`, details: { price: revenue, fees: 0, cost: costBasis } });
        item.qty -= qty; item.totalCost -= costBasis; 
        if(item.qty <= 0) app.data.inventory.splice(idx, 1);
        app.save(); document.getElementById('modal-inv-sell').classList.remove('open'); app.renderInventory(); alert(`Sale Recorded! Net Profit: $${profit.toFixed(2)}`);
    },
    setType: (type) => { app.isExpense = (type === 'exp'); document.getElementById('btn-exp').className = `type-opt exp ${app.isExpense?'active':''}`; document.getElementById('btn-inc').className = `type-opt inc ${!app.isExpense?'active':''}`; },
    
    openModal: (tx = null) => {
        document.getElementById('modal-form').classList.add('open');
        const now = new Date();
        const localIso = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        if (tx) {
            app.currentId = tx.id;
            document.getElementById('modal-title').innerText = "EDIT RECORD";
            document.getElementById('inp-cat').value = tx.cat;
            document.getElementById('inp-date').value = tx.date;
            document.getElementById('btn-delete').style.display = 'block';
            app.setType(tx.amt < 0 ? 'exp' : 'inc');
            document.getElementById('inp-amt').value = Math.abs(tx.amt);
            document.getElementById('inp-desc').value = tx.desc;
            app.renderDynamicFields(); app.fillDynamicFields(tx);
        } else {
            app.currentId = null;
            document.getElementById('modal-title').innerText = "NEW RECORD";
            document.getElementById('inp-cat').value = 'expenses';
            document.getElementById('inp-date').value = localIso;
            document.getElementById('btn-delete').style.display = 'none';
            document.getElementById('inp-amt').value = ''; document.getElementById('inp-desc').value = '';
            app.setType('exp');
            app.renderDynamicFields();
        }
    },
    closeModal: () => document.getElementById('modal-form').classList.remove('open'),
    
    renderDynamicFields: () => {
        const cat = document.getElementById('inp-cat').value;
        const area = document.getElementById('dynamic-area');
        const basic = document.getElementById('basic-fields');
        const toggle = document.getElementById('type-toggle-container');
        area.innerHTML = '';
        if (['job', 'pokerCash', 'pokerTourney', 'sales', 'bets', 'casino', 'dice', 'crypto', 'expenses', 'kalshi'].includes(cat)) { basic.style.display = 'none'; toggle.style.display = 'none'; } 
        else { basic.style.display = 'block'; toggle.style.display = 'flex'; return; }
        const timeInputs = `<label>START</label><input type="datetime-local" id="d-start"><label>END</label><input type="datetime-local" id="d-end">`;
        const profitInputs = `<div class="grid"><div><label>BUY-IN / COST</label><input type="number" id="d-buyin"></div><div><label>CASH OUT / VALUE</label><input type="number" id="d-cashout" style="border-color:var(--success);"></div></div>`;

        if (cat === 'pokerCash') { area.innerHTML = `<div class="field-group"><div class="field-title">Cash Game</div>${timeInputs}${profitInputs}<div class="grid-3"><div><label>SB</label><input type="number" id="d-sb" value="1"></div><div><label>BB</label><input type="number" id="d-bb" value="3"></div><div><label>STRADDLE</label><input type="number" id="d-straddle"></div></div><label>LOCATION</label><input type="text" id="d-desc"></div>`; const now = new Date(); const offset = now.getTimezoneOffset() * 60000; document.getElementById('d-start').value = new Date(now.getTime() - offset).toISOString().slice(0, 16); document.getElementById('d-end').value = new Date(now.getTime() - offset + 14400000).toISOString().slice(0, 16); }
        else if (cat === 'pokerTourney') { area.innerHTML = `<div class="field-group"><div class="field-title">Tournament</div>${timeInputs}${profitInputs}<div class="grid"><div><label>ADD-ONS</label><input type="number" id="d-addon"></div><div><label>PLACE</label><input type="number" id="d-place"></div></div><label>NAME</label><input type="text" id="d-desc"></div>`; }
        else if (cat === 'bets') { 
            // Sportsbook Selector Added
            const books = ['FanDuel','DraftKings','BetMGM','Caesars','ESPN Bet','Bet365','PrizePicks','Underdog','Rebet','Fliff','HardRock','Bovada','BetOnline','Other'];
            const bookOpts = books.map(b => `<option value="${b}">${b}</option>`).join('');
            
            area.innerHTML = `<div class="field-group"><div class="field-title">Sports Betting</div>
            <label>SPORT</label><select id="d-sport"><option value="NBA">NBA</option><option value="NCAAB">NCAAB</option><option value="NFL">NFL</option><option value="NCAAF">NCAAF</option><option value="MLB">MLB</option><option value="Golf">Golf</option><option value="Tennis">Tennis</option><option value="MMA">MMA/Boxing</option><option value="Soccer">Soccer</option><option value="Mix">Mix (Parlay)</option><option value="Kalshi">Kalshi</option><option value="Other">Other</option></select>
            <div class="toggle-row"><label style="margin:0; color:white;">BONUS / FREE BET?</label><input type="checkbox" id="d-bonus" class="toggle-checkbox"><label for="d-bonus" class="toggle-switch"></label></div>
            <div class="grid"><div><label>WAGER</label><input type="number" id="d-wager"></div><div><label>PAYOUT</label><input type="number" id="d-payout" style="border-color:var(--success);"></div></div>
            <label>SPORTSBOOK</label><select id="d-real-book">${bookOpts}</select>
            <label>TITLE / SUMMARY</label><input type="text" id="d-desc" placeholder="e.g. Knicks ML">
            <div class="grid-3"><div><label>TICKETS</label><input type="number" id="d-tickets" value="1"></div><div><label>WINS</label><input type="number" id="d-won" value="0"></div><div><label>LOSSES</label><input type="number" id="d-lost" value="0"></div></div></div>`; 
        }
        else if (cat === 'job') { area.innerHTML = `<div class="field-group"><div class="field-title">Paystub</div><div class="grid"><div><label>GROSS</label><input type="number" id="d-gross"></div><div><label>NET PAY</label><input type="number" id="d-net" style="border-color:var(--success);"></div></div><div class="grid"><div><label>TAXES</label><input type="number" id="d-tax"></div><div><label>BENEFITS</label><input type="number" id="d-ben"></div></div><div><label>401K</label><input type="number" id="d-401k"></div><label>EMPLOYER</label><input type="text" id="d-desc"></div>`; }
        else if (cat === 'sales') { area.innerHTML = `<div class="field-group"><div class="field-title">Reselling</div><label>SALE PRICE</label><input type="number" id="d-price"><div class="grid"><div><label>FEES</label><input type="number" id="d-fees"></div><div><label>COST</label><input type="number" id="d-cost"></div></div><label>ITEM</label><input type="text" id="d-desc"></div>`; }
        else if (cat === 'expenses') { const subList = ['Bill', ...app.expCats]; const opts = subList.map(c => `<option value="${c}">${c}</option>`).join(''); area.innerHTML = `<div class="field-group"><div class="field-title">Expense Details</div><label>SUB-CATEGORY</label><select id="d-sub">${opts}</select><div class="grid"><div><label>COST ($)</label><input type="number" id="d-cost" style="border-color:var(--error);"></div></div><label>DESCRIPTION</label><input type="text" id="d-desc"></div>`; }
        else if (['casino','dice','crypto'].includes(cat)) { area.innerHTML = `<div class="field-group"><div class="field-title">${cat.toUpperCase()} SESSION</div>${profitInputs}<label>DESCRIPTION/PLATFORM</label><input type="text" id="d-desc"></div>`; }
        else if (cat === 'kalshi') { area.innerHTML = `<div class="field-group"><div class="field-title">Prediction Market</div><div class="grid"><div><label>BUY IN ($)</label><input type="number" id="d-buyin"></div><div><label>SELL / SETTLE ($)</label><input type="number" id="d-cashout" style="border-color:var(--success);"></div></div><div class="grid"><div><label>MULTIPLIER (x)</label><input type="number" id="d-multi" placeholder="1.0"></div></div><label>MARKET / NOTES</label><input type="text" id="d-desc"></div>`; }
    },
    fillDynamicFields: (tx) => {
        if (!tx.details) return;
        const d = tx.details; const get = (id) => document.getElementById(id);
        if (tx.cat === 'pokerCash') { get('d-buyin').value=d.buyin; get('d-cashout').value=d.cashout; get('d-sb').value=d.sb; get('d-bb').value=d.bb; get('d-straddle').value=d.straddle; if(d.start) get('d-start').value=d.start; if(d.end) get('d-end').value=d.end; get('d-desc').value=tx.desc; }
        else if (tx.cat === 'pokerTourney') { get('d-buyin').value=d.buyin; get('d-cashout').value=d.cashout; get('d-addon').value=d.addon; get('d-place').value=d.place; get('d-desc').value=tx.desc; }
        else if (tx.cat === 'bets') { 
            get('d-wager').value=d.wager; get('d-payout').value=d.payout; 
            if(d.book) get('d-real-book').value=d.book; 
            get('d-desc').value=tx.desc; 
            get('d-tickets').value=d.tickets; get('d-won').value=d.won; get('d-lost').value=d.lost; get('d-bonus').checked=d.isBonus; get('d-sport').value=d.sport; 
        }
        else if (tx.cat === 'job') { get('d-gross').value=d.gross; get('d-net').value=tx.amt; get('d-tax').value=d.tax; get('d-ben').value=d.ben; get('d-401k').value=d.k401; get('d-desc').value=tx.desc; }
        else if (tx.cat === 'sales') { get('d-price').value=d.price; get('d-fees').value=d.fees; get('d-cost').value=d.cost; get('d-desc').value=tx.desc; }
        else if (tx.cat === 'expenses') { get('d-sub').value=d.sub||'Misc'; get('d-cost').value=Math.abs(tx.amt); get('d-desc').value=tx.desc; }
        else if (['casino','dice','crypto'].includes(tx.cat)) { get('d-buyin').value=d.buyin||''; get('d-cashout').value=d.cashout||''; get('d-desc').value=tx.desc; }
        else if (tx.cat === 'kalshi') { get('d-buyin').value=d.buyin||''; get('d-cashout').value=d.cashout||''; get('d-multi').value=d.multi||''; get('d-desc').value=tx.desc; }
    },
    saveTx: () => {
        const cat = document.getElementById('inp-cat').value;
        const date = document.getElementById('inp-date').value;
        let amt = parseFloat(document.getElementById('inp-amt').value) || 0;
        let desc = document.getElementById('inp-desc').value;
        let details = {};
        const val = (id) => parseFloat(document.getElementById(id).value) || 0;
        const txt = (id) => document.getElementById(id).value;

        if (cat === 'pokerCash') { const buyin=val('d-buyin'), cashout=val('d-cashout'), sb=val('d-sb'), bb=val('d-bb'), straddle=val('d-straddle'); const start=txt('d-start'), end=txt('d-end'); const dur = (new Date(end)-new Date(start))/36e5; amt = cashout - buyin; desc = txt('d-desc'); details = { buyin, cashout, sb, bb, straddle, start, end, dur: dur.toFixed(2) }; }
        else if (cat === 'pokerTourney') { const buyin=val('d-buyin'), cashout=val('d-cashout'), addon=val('d-addon'); amt = cashout - (buyin + addon); desc = txt('d-desc'); details = { buyin, cashout, addon, place: val('d-place') }; }
        else if (cat === 'bets') { 
            const wager=val('d-wager'), payout=val('d-payout'), isBonus=document.getElementById('d-bonus').checked; 
            amt = isBonus ? payout : (payout - wager); 
            // Title is now d-desc, Book is separate
            desc = txt('d-desc'); 
            const book = document.getElementById('d-real-book').value;
            const sport = document.getElementById('d-sport').value; 
            const tickets=val('d-tickets'); 
            details = { wager, payout, isBonus, book: book, tickets, won: val('d-won'), lost: val('d-lost'), sport }; 
            
            if (!app.currentId && tickets > 0) { for(let i=0; i<tickets; i++) app.data.tickets.push({ id: Date.now()+i, sport, wager: wager/tickets, status: 'Pending', legs: 0 }); } 
        }
        else if (cat === 'job') { amt = val('d-net'); desc = txt('d-desc'); details = { gross: val('d-gross'), tax: val('d-tax'), ben: val('d-ben'), k401: val('d-401k') }; }
        else if (cat === 'sales') { amt = val('d-price') - val('d-fees') - val('d-cost'); desc = txt('d-desc'); details = { price: val('d-price'), fees: val('d-fees'), cost: val('d-cost') }; }
        else if (cat === 'expenses') { amt = -Math.abs(val('d-cost')); desc = txt('d-desc'); details = { sub: document.getElementById('d-sub').value, cost: val('d-cost') }; }
        else if (['casino','dice','crypto'].includes(cat)) { const buyin = val('d-buyin'), cashout = val('d-cashout'); amt = cashout - buyin; desc = txt('d-desc'); details = { buyin, cashout }; }
        else if (cat === 'kalshi') { const buyin = val('d-buyin'), cashout = val('d-cashout'); amt = cashout - buyin; desc = txt('d-desc'); details = { buyin, cashout, multi: val('d-multi') }; }
        else { if (app.isExpense) amt = -Math.abs(amt); else amt = Math.abs(amt); }

        const tx = { id: app.currentId || Date.now(), cat, date, amt, desc, details };
        if (app.currentId) { const idx = app.data.txs.findIndex(t => t.id == app.currentId); if(idx > -1) app.data.txs[idx] = tx; } else { app.data.txs.push(tx); }
        app.save(); app.closeModal();
    },
    deleteTx: () => { if(confirm("Delete record?")) { app.data.txs = app.data.txs.filter(t => t.id !== app.currentId); app.save(); app.closeModal(); } },
    
    // Ticket Functions
    openTicketModal: (t=null)=>{
        document.getElementById('modal-ticket').classList.add('open'); 
        const set=(id,v)=>document.getElementById(id).value=v; 
        if(t){
            app.currentTicketId=t.id; 
            set('tick-sport',t.sport); set('tick-wager',t.wager); set('tick-status',t.status); 
            set('tick-odds-am',t.oddsAm); set('tick-odds-dec',t.oddsDec); 
            set('tick-legs',t.legs); set('tick-legs-won',t.legsWon); 
            set('tick-legs-lost',t.legs-t.legsWon); set('tick-notes',t.notes);
            document.getElementById('tick-bonus').checked = t.isBonus || false;
        } else {
            app.currentTicketId=null; 
            set('tick-sport','NBA'); set('tick-wager',''); set('tick-status','Pending'); 
            set('tick-odds-am',''); set('tick-odds-dec',''); 
            set('tick-legs',''); set('tick-legs-won',''); set('tick-notes','');
            document.getElementById('tick-bonus').checked = false;
        }
    },
    saveTicket: ()=>{
        const t={
            id:app.currentTicketId||Date.now(), 
            sport:document.getElementById('tick-sport').value, 
            wager:parseFloat(document.getElementById('tick-wager').value)||0, 
            status:document.getElementById('tick-status').value, 
            oddsAm:document.getElementById('tick-odds-am').value, 
            oddsDec:document.getElementById('tick-odds-dec').value, 
            legs:parseInt(document.getElementById('tick-legs').value)||0, 
            legsWon:parseInt(document.getElementById('tick-legs-won').value)||0, 
            notes:document.getElementById('tick-notes').value,
            isBonus: document.getElementById('tick-bonus').checked
        }; 
        if(app.currentTicketId){const i=app.data.tickets.findIndex(x=>x.id===app.currentTicketId); if(i>-1)app.data.tickets[i]=t;} else app.data.tickets.push(t); 
        app.save(); document.getElementById('modal-ticket').classList.remove('open'); app.renderTickets();
    },
    deleteTicket: ()=>{if(confirm("Delete?")){app.data.tickets=app.data.tickets.filter(x=>x.id!==app.currentTicketId); app.save(); document.getElementById('modal-ticket').classList.remove('open'); app.renderTickets(); } },
    calcLegs: ()=>{const t=parseInt(document.getElementById('tick-legs').value)||0; const w=parseInt(document.getElementById('tick-legs-won').value)||0; document.getElementById('tick-legs-lost').value=Math.max(0,t-w);},
    convertOdds: (f)=>{if(f==='am'){const a=parseFloat(document.getElementById('tick-odds-am').value); if(!isNaN(a)) document.getElementById('tick-odds-dec').value=(a>0?(1+(a/100)):(1+(100/Math.abs(a)))).toFixed(2);} else {const d=parseFloat(document.getElementById('tick-odds-dec').value); if(!isNaN(d)){const a=d>=2?(d-1)*100:-100/(d-1); document.getElementById('tick-odds-am').value=a>0?'+'+a.toFixed(0):a.toFixed(0);}}},
    // NEW: Stats Table for ROI / Winrate
    renderROITable: () => {
        const tbody = document.getElementById('roi-table-body');
        tbody.innerHTML = '';
        const filtered = app.data.txs.filter(t => app.checkFilter(t));
        const groups = {};

        filtered.forEach(t => {
            // Only track specific categories for ROI
            if (!['bets','pokerCash','pokerTourney','dice','casino','sales','kalshi'].includes(t.cat)) return;
            
            let key = t.cat;
            let name = app.catLabel(t.cat);
            
            // Break down sports by Sport Name
            if (t.cat === 'bets') {
                const sport = (t.details && t.details.sport) ? t.details.sport : 'Other';
                key = `bets-${sport}`;
                name = `Sports (${sport})`;
            }

            if (!groups[key]) groups[key] = { name, inv: 0, ret: 0, wins: 0, count: 0 };
            
            let invest = 0;
            if (t.cat === 'bets' && t.details) invest = t.details.wager || 0;
            else if (['pokerCash','pokerTourney','dice','casino','kalshi'].includes(t.cat) && t.details) invest = t.details.buyin || 0;
            else if (t.cat === 'sales' && t.details) invest = (t.details.cost || 0) + (t.details.fees || 0);

            const isWin = t.amt > 0;
            groups[key].inv += invest;
            groups[key].ret += t.amt;
            groups[key].count++;
            if(isWin) groups[key].wins++;
        });

        const sortedKeys = Object.keys(groups).sort((a,b) => groups[b].ret - groups[a].ret);

        sortedKeys.forEach(k => {
            const g = groups[k];
            const roi = g.inv > 0 ? (g.ret / g.inv) * 100 : 0;
            const winRate = g.count > 0 ? (g.wins / g.count) * 100 : 0;
            
            const tr = document.createElement('tr');
            // Add left border indicator for sports to distinguish them
            if(g.name.includes('Sports')) tr.className = 'stats-row-sport';
            
            const roiColor = roi >= 0 ? 'var(--success)' : 'var(--error)';
            const netColor = g.ret >= 0 ? 'var(--success)' : 'var(--error)';
            const netSign = g.ret >= 0 ? '+' : '';

            tr.innerHTML = `
                <td style="color:${g.ret>=0?'#fff':'#ccc'}">${g.name}</td>
                <td style="color:${roiColor}">${roi.toFixed(1)}%</td>
                <td>${winRate.toFixed(0)}%</td>
                <td style="color:${netColor}">${netSign}$${Math.round(g.ret).toLocaleString()}</td>
            `;
            tbody.appendChild(tr);
        });
        
        if(sortedKeys.length === 0) tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#555;">No Data</td></tr>';
    },
    // --- NEW CALCULATOR TOOLS ---

    // 1. ARBITRAGE CALCULATOR
    calcArb: () => {
        const getDec = (val) => {
            const v = parseFloat(val);
            if(isNaN(v)) return 0;
            if(v > 0) return (v/100) + 1;
            return (100/Math.abs(v)) + 1;
        };
        
        const oA = document.getElementById('arb-odds-a').value;
        const oB = document.getElementById('arb-odds-b').value;
        const stake = parseFloat(document.getElementById('arb-stake').value) || 100;
        
        const decA = getDec(oA);
        const decB = getDec(oB);
        const resDiv = document.getElementById('arb-result');

        if(decA <= 1 || decB <= 1) { resDiv.style.display = 'none'; return; }

        const impA = 1 / decA;
        const impB = 1 / decB;
        const arbPct = impA + impB; // If < 1, arbitrage exists
        
        resDiv.style.display = 'block';
        
        if (arbPct < 1) {
            const profitPct = (1 - arbPct) / arbPct;
            const betA = (stake * impA) / arbPct;
            const betB = (stake * impB) / arbPct;
            const profit = (stake / arbPct) - stake;
            
            document.getElementById('arb-profit').innerHTML = `<span style="color:#00E676">PROFIT: $${profit.toFixed(2)} (${(profitPct*100).toFixed(2)}%)</span>`;
            document.getElementById('arb-bet-a').innerText = `$${betA.toFixed(2)}`;
            document.getElementById('arb-bet-b').innerText = `$${betB.toFixed(2)}`;
        } else {
            document.getElementById('arb-profit').innerHTML = `<span style="color:#D50000">No Arb (Loss: ${(100 - (1/arbPct)*100).toFixed(2)}%)</span>`;
            document.getElementById('arb-bet-a').innerText = '-';
            document.getElementById('arb-bet-b').innerText = '-';
        }
    },

    // 2. BREAK-EVEN CALCULATOR
    calcBreakEven: () => {
        const val = parseFloat(document.getElementById('be-odds').value);
        const resBox = document.getElementById('be-res');
        const resVal = document.getElementById('be-val');
        
        if(isNaN(val) || val === 0) { resBox.style.display='none'; return; }
        
        let dec = val;
        // Convert American to Decimal if needed
        if (Math.abs(val) >= 100) {
            dec = (val > 0) ? (val/100) + 1 : (100/Math.abs(val)) + 1;
        }
        
        if (dec <= 1) { resBox.style.display='none'; return; }
        
        const pct = (1 / dec) * 100;
        resBox.style.display = 'block';
        resVal.innerText = `${pct.toFixed(1)}%`;
    },

    // 3. POKER M-RATIO
    calcM: () => {
        const stack = parseFloat(document.getElementById('pm-stack').value) || 0;
        const ante = parseFloat(document.getElementById('pm-ante').value) || 0;
        const sb = parseFloat(document.getElementById('pm-sb').value) || 0;
        const bb = parseFloat(document.getElementById('pm-bb').value) || 0;
        const res = document.getElementById('pm-res');
        
        if(!stack || !sb || !bb) { res.style.display='none'; return; }
        
        const pot = sb + bb + ante;
        const m = stack / pot;
        
        res.style.display = 'block';
        let msg = `M = ${m.toFixed(1)}: `;
        let color = '#fff';
        
        if(m < 1) { msg += "DEAD ZONE (Shove Any Two)"; color='#D50000'; }
        else if(m < 5) { msg += "RED ZONE (Push/Fold)"; color='#FF3D00'; }
        else if(m < 10) { msg += "ORANGE ZONE (Loss of Fold Equity)"; color='#FF9100'; }
        else if(m < 20) { msg += "YELLOW ZONE (Trouble)"; color='#FFEA00'; }
        else { msg += "GREEN ZONE (Safe)"; color='#00E676'; }
        
        res.innerText = msg;
        res.style.color = color;
        res.style.border = `1px solid ${color}`;
    },
    // --- ADDITIONAL TOOLS LOGIC ---

    // 5. Poker Pot Odds
    calcPotOdds: () => {
        const pot = parseFloat(document.getElementById('po-pot').value);
        const call = parseFloat(document.getElementById('po-call').value);
        const outs = parseFloat(document.getElementById('po-outs').value);
        const streetMult = parseFloat(document.getElementById('po-street').value);
        const resDiv = document.getElementById('po-res');

        if(!pot || !call || !outs) return;

        const totalPot = pot + call;
        const potOdds = (call / totalPot) * 100;
        const equity = outs * streetMult; // Rule of 4 and 2
        
        const isGood = equity > potOdds;
        const diff = equity - potOdds;
        
        resDiv.style.display = 'block';
        resDiv.style.background = isGood ? 'rgba(0, 230, 118, 0.1)' : 'rgba(213, 0, 0, 0.1)';
        resDiv.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span>Pot Odds:</span><span style="color:#fff">${potOdds.toFixed(1)}%</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>Your Equity:</span><span style="font-weight:bold; color:${isGood?'#00E676':'#D50000'}">${equity.toFixed(1)}%</span>
            </div>
            <div style="text-align:center; font-weight:bold; font-size:1.1rem; color:${isGood?'#00E676':'#D50000'}">
                ${isGood ? `CALL (+${diff.toFixed(1)}%)` : `FOLD (${diff.toFixed(1)}%)`}
            </div>
        `;
    },

    // 6. EV Calculator
    calcEV: () => {
        const wager = parseFloat(document.getElementById('ev-wager').value);
        const oddsStr = document.getElementById('ev-odds').value;
        const prob = parseFloat(document.getElementById('ev-prob').value);
        const resEl = document.getElementById('ev-res');

        if(!wager || !oddsStr || !prob) return;

        let decimal = parseFloat(oddsStr);
        if(Math.abs(decimal) >= 100) {
            decimal = (decimal > 0) ? (decimal/100) + 1 : (100/Math.abs(decimal)) + 1;
        }

        const profit = wager * (decimal - 1);
        const winPct = prob / 100;
        const lossPct = 1 - winPct;

        // EV = (Profit * Win%) - (Wager * Loss%)
        const ev = (profit * winPct) - (wager * lossPct);
        
        resEl.innerText = ev >= 0 ? `+$${ev.toFixed(2)}` : `-$${Math.abs(ev).toFixed(2)}`;
        resEl.style.color = ev >= 0 ? '#00E676' : '#D50000';
    },

    // 7. Compound Growth
    calcGrowth: () => {
        const start = parseFloat(document.getElementById('cg-start').value);
        const pct = parseFloat(document.getElementById('cg-pct').value);
        const days = parseFloat(document.getElementById('cg-days').value);
        
        if(!start || !pct || !days) return;

        const end = start * Math.pow((1 + (pct/100)), days);
        const profit = end - start;
        
        document.getElementById('cg-res').innerHTML = `
            After ${days} days: <br>
            <span style="font-size:1.5rem; font-weight:bold; color:#D500F9">$${Math.round(end).toLocaleString()}</span><br>
            <span style="font-size:0.8rem; color:#aaa">+$${Math.round(profit).toLocaleString()} profit</span>
        `;
    },

    // 8. Streak Variance
    calcStreak: () => {
        const rate = parseFloat(document.getElementById('sv-rate').value);
        const sample = parseFloat(document.getElementById('sv-sample').value);
        
        if(!rate || !sample) return;

        const lossRate = 1 - (rate/100);
        
        // Probability of a losing streak of length N in a sample size
        // Simplified approximation for quick checking
        const streak5 = (1 - Math.pow(1 - Math.pow(lossRate, 5), sample)) * 100;
        const streak10 = (1 - Math.pow(1 - Math.pow(lossRate, 10), sample)) * 100;
        
        document.getElementById('sv-res').innerHTML = `
            In ${sample} bets:<br>
            Chance of 5 losses in a row: <span style="color:#fff">${streak5.toFixed(1)}%</span><br>
            Chance of 10 losses in a row: <span style="color:${streak10 > 50 ? '#D50000' : '#fff'}">${streak10.toFixed(1)}%</span>
        `;
    },

    // 4. UNIT SIZER
    calcUnit: () => {
        const bank = parseFloat(document.getElementById('us-bank').value) || 0;
        const pct = parseFloat(document.getElementById('us-pct').value) || 0;
        const res = document.getElementById('us-res');
        
        if(!bank || !pct) { res.innerText = ''; return; }
        
        const bet = bank * (pct / 100);
        res.innerText = `$${bet.toFixed(2)}`;
    },

    // Charts & Utilities
    renderChart: () => {
        const ctx = document.getElementById('mainChart').getContext('2d');
        if(app.charts.main) app.charts.main.destroy(); 
        const filtered = app.data.txs.filter(t => app.checkFilter(t));
        const chronSorted = [...filtered].sort((a,b) => new Date(a.date) - new Date(b.date));
        let run = 0; const totalData = chronSorted.map(t => { run += t.amt; return Math.round(run); }); const labels = chronSorted.map(t => new Date(t.date).toLocaleDateString());
        const datasets = [{ label: 'Total', data: totalData, borderColor: '#00E676', backgroundColor: 'rgba(0, 230, 118, 0.2)', borderWidth: 2, fill: true, pointRadius: 0, tension: 0.1 }];
        [...new Set(filtered.map(t=>t.cat))].forEach(c => { let crun = 0; const cdata = chronSorted.map(t => { if(t.cat === c) crun += t.amt; return Math.round(crun); }); datasets.push({ label: `${app.icons[c]||''} ${app.catLabel(c)}`, data: cdata, borderColor: app.colors[c]||'#777', borderWidth: 1.5, fill: false, pointRadius: 0, tension: 0.1 }); });
        app.charts.main = new Chart(ctx, { type: 'line', data: { labels, datasets }, options: { interaction: { mode: 'index', intersect: false }, plugins:{ legend:{ display:true, position:'bottom', labels:{ usePointStyle:true, padding:20, color:'#FF3D00', font:{family:'Martian Mono', size:10} } }, datalabels: { display: false } }, scales:{ x:{ display:false }, y:{ grid:{color:'#222'}, ticks: { color: '#FF3D00', font: { family: 'Martian Mono' } } } } } });
    },
    renderExpenseChart: () => {
        const ctx = document.getElementById('expenseChart').getContext('2d');
        if(app.charts.expenses) app.charts.expenses.destroy();
        const filtered = app.data.txs.filter(t => app.checkFilter(t) && t.cat === 'expenses');
        const grouped = {}; 
        filtered.forEach(t => { const date = t.date.split('T')[0]; const sub = (t.details && t.details.sub) ? t.details.sub : 'Misc'; const val = Math.abs(t.amt); if(!grouped[date]) grouped[date] = { total: 0, subs: {} }; grouped[date].total += val; grouped[date].subs[sub] = (grouped[date].subs[sub] || 0) + val; });
        const dates = Object.keys(grouped).sort(); const vals = dates.map(d => Math.round(grouped[d].total));
        app.charts.expenses = new Chart(ctx, { type: 'bar', data: { labels: dates, datasets: [{ label: 'Total', data: vals, backgroundColor: 'rgba(213,0,0,0.6)', borderColor: '#D50000', borderWidth: 1 }] }, options: { plugins: { legend: { display: false }, datalabels: { display: false }, tooltip: { callbacks: { afterBody: (context) => { const date = context[0].label; if(!grouped[date]) return []; const subs = grouped[date].subs; return Object.keys(subs).map(k => `${k}: $${Math.round(subs[k])}`); } } } }, scales: { x: { display:false }, y: { grid:{color:'#222'}, ticks:{color:'#777'} } } } });
    },
    renderSportsChart: () => {
        const ctx = document.getElementById('sportsBarChart').getContext('2d');
        if(app.charts.sports) app.charts.sports.destroy();
        const filtered = app.data.txs.filter(t => app.checkFilter(t) && t.cat === 'bets');
        const sports = {};
        filtered.forEach(t => { const s = (t.details && t.details.sport) ? t.details.sport : 'Other'; sports[s] = (sports[s] || 0) + t.amt; });
        const labels = Object.keys(sports);
        const data = Object.values(sports).map(v => Math.round(v));
        const colors = data.map(v => v >= 0 ? '#00C853' : '#D50000');
        app.charts.sports = new Chart(ctx, { type: 'bar', data: { labels: labels, datasets: [{ label: 'Net P/L', data: data, backgroundColor: colors, borderWidth: 0 }] }, options: { indexAxis: 'y', plugins: { legend: { display: false }, datalabels: { color: '#FFF', font:{weight:'bold'} } }, scales: { x: { grid:{color:'#222'}, ticks:{color:'#777'} }, y: { ticks:{color:'#FFF'} } } } });
    },
    renderPies: () => {
        const filtered = app.data.txs.filter(t => app.checkFilter(t));
        const createPie = (canvasId, dataMap, colorList) => { if(app.charts[canvasId]) app.charts[canvasId].destroy(); const canvas = document.getElementById(canvasId); if(!canvas) return; app.charts[canvasId] = new Chart(canvas, { type: 'doughnut', data: { labels: Object.keys(dataMap), datasets: [{ data: Object.values(dataMap), backgroundColor: colorList, borderWidth: 0 }] }, options: { plugins: { legend: { display: true, position:'right', labels:{color:'#FF3D00', font:{family:'Martian Mono', size:10}} }, datalabels: { display:false } } } }); };
        const incData = {}; filtered.filter(t => t.amt > 0).forEach(t => { const l=`${app.icons[t.cat]} ${app.catLabel(t.cat)}`; incData[l]=(incData[l]||0)+Math.round(t.amt); }); createPie('pieIncome', incData, Object.keys(incData).map(k=>app.colors[Object.keys(app.colors).find(c=>k.includes(app.catLabel(c)))]||'#555'));
        const leakData={}; filtered.filter(t=>t.amt<0&&t.cat!=='expenses').forEach(t=>{const l=`${app.icons[t.cat]} ${app.catLabel(t.cat)}`; leakData[l]=(leakData[l]||0)+Math.round(Math.abs(t.amt));}); createPie('pieLeaks', leakData, Object.keys(leakData).map(k=>app.colors[Object.keys(app.colors).find(c=>k.includes(app.catLabel(c)))]||'#555'));
        const expData={}; filtered.filter(t=>t.cat==='expenses').forEach(t=>{const s=t.details&&t.details.sub?t.details.sub:'Misc'; expData[s]=(expData[s]||0)+Math.round(Math.abs(t.amt));}); createPie('pieExpenses', expData, Object.keys(expData).map(k=>app.expColors[k]||'#FFFFFF'));
    },
    fetchCrypto: async () => { try { const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'); const d=await r.json(); window.btcPrice=d.bitcoin.usd; window.ethPrice=d.ethereum.usd; document.getElementById('btc-price').innerText=`$${window.btcPrice.toLocaleString()}`; document.getElementById('eth-price').innerText=`$${window.ethPrice.toLocaleString()}`; document.getElementById('btc-holdings').value=app.data.btcHoldings||''; document.getElementById('eth-holdings').value=app.data.ethHoldings||''; app.calcCrypto(); } catch(e){ console.log(e); } },
    calcCrypto: () => { const b=parseFloat(document.getElementById('btc-holdings').value)||0; const e=parseFloat(document.getElementById('eth-holdings').value)||0; app.data.btcHoldings=b; app.data.ethHoldings=e; const t=(b*(window.btcPrice||0))+(e*(window.ethPrice||0)); document.getElementById('crypto-total-display').innerText=`$${Math.round(t).toLocaleString()}`; document.getElementById('crypto-mini').innerText=`$${Math.round(t).toLocaleString()}`; localStorage.setItem('bankroll_os_v19_1', JSON.stringify(app.data)); },
    catLabel: (c) => { 
        if (c === 'expenses') return 'Expense';
        const map = { pokerCash:'Poker Cash', pokerTourney:'Tourney', bets:'Sports', job:'Income', sales:'Resell', crypto:'Crypto', dice:'Dice', casino:'Casino', miscIncome:'Misc', kalshi:'Kalshi' }; 
        return map[c] || c.toUpperCase(); 
    },
    copyReport: () => { const tot = app.data.txs.filter(t=>app.checkFilter(t)).reduce((s,t)=>s+t.amt,0); navigator.clipboard.writeText(`BANKROLL REPORT (${app.filter.mode.toUpperCase()})\nNet: $${Math.round(tot).toLocaleString()}`); alert("Copied!"); },
    calcKelly: () => { const bank = parseFloat(document.getElementById('kelly-bank').value) || 0; const odds = document.getElementById('kelly-odds').value; const win = parseFloat(document.getElementById('kelly-win').value) || 0; if(bank <= 0 || !odds || win <= 0) return; let dec = parseFloat(odds); dec = (dec > 0 ? (dec/100)+1 : (100/Math.abs(dec))+1); const b = dec - 1; const p = win / 100; const f = (b * p - (1-p)) / b; document.getElementById('kelly-result-box').style.display = 'block'; if (f <= 0) { document.getElementById('kelly-final').innerText = "$0.00"; document.getElementById('kelly-pct').innerText = "Do not bet"; document.getElementById('kelly-final').style.color = "var(--error)"; } else { document.getElementById('kelly-final').innerText = `$${(bank*f).toFixed(2)}`; document.getElementById('kelly-pct').innerText = `${(f*100).toFixed(2)}% of Bankroll`; document.getElementById('kelly-final').style.color = "var(--primary)"; } },
    calcHedge: () => {
        const potentialWin = parseFloat(document.getElementById('hedge-win').value) || 0;
        const hedgeOddsStr = document.getElementById('hedge-odds').value;
        if(potentialWin <= 0 || !hedgeOddsStr) return;
        let dec = parseFloat(hedgeOddsStr);
        if (isNaN(dec)) return;
        if (Math.abs(dec) >= 100) { dec = (dec > 0) ? (dec/100) + 1 : (100/Math.abs(dec)) + 1; } else if (dec < 1) { return; } 
        const hedgeBet = potentialWin / dec;
        const guaranteed = potentialWin - hedgeBet;
        document.getElementById('hedge-result-box').style.display = 'block';
        document.getElementById('hedge-bet').innerText = `$${hedgeBet.toFixed(2)}`;
        document.getElementById('hedge-guaranteed').innerText = `$${guaranteed.toFixed(2)}`;
    },
    openSettings: () => { document.getElementById('modal-settings').classList.add('open'); document.getElementById('export-area').value = JSON.stringify(app.data); },
    copyExport: () => { document.getElementById("export-area").select(); document.execCommand("copy"); alert("Copied!"); },
        downloadBackup: () => {
        const dataStr = JSON.stringify(app.data, null, 2); // Pretty print
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        const date = new Date().toISOString().split('T')[0];
        a.href = url;
        a.download = `bankroll_backup_${date}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        Swal.fire({
            title: 'Backup Saved!',
            text: 'File downloaded to your device.',
            icon: 'success',
            background: '#111', color: '#fff'
        });
    },

    downloadCSV: () => {
        let csv = "Date,Category,Amount,Description,Details\n";
        app.data.txs.forEach(t => { const desc = t.desc ? `"${t.desc.replace(/"/g, '""')}"` : ""; const details = t.details ? `"${JSON.stringify(t.details).replace(/"/g, '""')}"` : ""; csv += `${t.date},${t.cat},${t.amt.toFixed(2)},${desc},${details}\n`; });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) { const url = URL.createObjectURL(blob); link.setAttribute("href", url); const date = new Date().toISOString().split('T')[0]; link.setAttribute("download", `bankroll_export_${date}.csv`); link.style.visibility = 'hidden'; document.body.appendChild(link); link.click(); document.body.removeChild(link); }
    },
    importData: () => { 
        try { 
            const p = JSON.parse(document.getElementById('import-area').value); 
            if(p.txs || (Object.keys(p).length === 0 && confirm("Import empty data?"))){ 
                app.data = {
                    txs: [], tickets: [], inventory: [], notes: [],
                    liveSession: { active: false },
                    ...p
                };
                app.save(); 
                alert("Imported Successfully!"); 
                document.getElementById('modal-settings').classList.remove('open'); 
            } else {
                alert("Invalid Data Format");
            }
        } catch(e){ 
            console.error(e);
            alert("Error parsing JSON data. Check format."); 
        } 
    },
    
                                    // --- KALSHI EXPLORER (V8: REAL TEAM NAMES) ---
    kalshi: {
        events: [],
        currentCat: 'all',

        fetch: async () => {
            const div = document.getElementById('kalshi-results');
            div.innerHTML = '<div style="text-align:center; color:#aaa;">Fetching Live Events...</div>';

            const target = 'https://api.elections.kalshi.com/trade-api/v2/events?limit=100&status=open&with_nested_markets=true';
            
            const proxies = [
                { url: 'https://api.codetabs.com/v1/proxy?quest=', type: 'direct' },
                { url: 'https://api.allorigins.win/get?url=', type: 'json_wrap' },
                { url: 'https://corsproxy.io/?', type: 'direct' }
            ];

            let success = false;

            for (let i = 0; i < proxies.length; i++) {
                const proxy = proxies[i];
                try {
                    const res = await fetch(proxy.url + encodeURIComponent(target));
                    if (!res.ok) throw new Error("Network response not ok");
                    
                    let data;
                    const raw = await res.json();

                    if (proxy.type === 'json_wrap') {
                        if (!raw.contents) throw new Error("Empty wrapper");
                        data = (typeof raw.contents === 'string') ? JSON.parse(raw.contents) : raw.contents;
                    } else {
                        data = raw;
                    }

                    if (!data.events) throw new Error("No event data");

                    app.kalshi.events = data.events;
                    app.kalshi.render();
                    success = true;
                    break;

                } catch (e) { console.warn(`Proxy ${i+1} Failed`); }
            }

            if (!success) {
                div.innerHTML = `<div style="text-align:center; color:#D50000; padding:10px;">Connection Blocked. <a href="https://kalshi.com/markets" target="_blank" style="color:#fff;">Open Kalshi</a></div>`;
            }
        },

        setCat: (cat) => {
            app.kalshi.currentCat = cat;
            document.querySelectorAll('#view-tools .filter-chip').forEach(el => el.classList.remove('active'));
            const id = 'k-cat-' + cat.toLowerCase();
            const btn = document.getElementById(id);
            if(btn) btn.classList.add('active');
            app.kalshi.render();
        },

        render: () => {
            const query = document.getElementById('kalshi-search').value.toLowerCase();
            const div = document.getElementById('kalshi-results');
            div.innerHTML = '';

            const cat = app.kalshi.currentCat;

            // 1. FILTER PARENT EVENTS
            let filteredEvents = app.kalshi.events.filter(e => {
                const title = (e.title || '').toLowerCase();
                const category = (e.category || '').toLowerCase();
                const ticker = (e.ticker || '').toLowerCase();

                if (query && !title.includes(query) && !ticker.includes(query)) return false;

                if (cat === 'Sports') return category.includes('sport') || title.includes('nfl') || title.includes('nba') || title.includes('game');
                if (cat === 'Mentions') return title.includes('mention') || title.includes('say') || title.includes('said');
                if (cat === 'Politics') return category.includes('politic') || category.includes('gov');
                if (cat === 'Economics') return category.includes('econ') || category.includes('fed');
                
                return true;
            });

            if(filteredEvents.length === 0) {
                div.innerHTML = '<div style="text-align:center; color:#555;">No events found.</div>';
                return;
            }

            // 2. RENDER EVENTS
            filteredEvents.forEach(e => {
                const cleanMarkets = e.markets.filter(m => {
                    const sub = (m.subtitle || '').toLowerCase();
                    if (!m.yes_ask && !m.no_ask) return false; // Dead market
                    
                    if (!query.includes('parlay')) {
                        if (sub.includes('parlay') || sub.includes('combo') || sub.includes(' & ') || sub.includes('same game') || sub.includes('sgp')) return false;
                    }
                    return true;
                });

                if (cleanMarkets.length === 0) return; 

                // Sort by Volume
                cleanMarkets.sort((a,b) => (b.volume || 0) - (a.volume || 0));
                
                // Show Top 3 Markets
                const displayMarkets = cleanMarkets.slice(0, 3);

                const eventCard = document.createElement('div');
                eventCard.style.background = '#111';
                eventCard.style.marginBottom = '12px';
                eventCard.style.borderRadius = '8px';
                eventCard.style.border = '1px solid #333';
                eventCard.style.overflow = 'hidden';

                let html = `
                    <div style="padding:10px; background:#1A1A1A; border-bottom:1px solid #222;">
                        <div style="font-weight:bold; color:#fff; font-size:0.9rem;">${e.title}</div>
                        <div style="font-size:0.65rem; color:#aaa;">${e.category}</div>
                    </div>
                    <div style="padding:8px;">
                `;

                displayMarkets.forEach(m => {
                    const yesCost = m.yes_ask || 0;
                    const noCost = m.no_ask || 0;

                    // FIX: Use Real Team/Option Names if available
                    // If 'yes_sub_title' exists (e.g. "Chiefs"), use it. Otherwise use "YES".
                    const yesName = m.yes_sub_title || 'YES';
                    const noName = m.no_sub_title || 'NO';

                    // Math
                    const getStats = (price) => {
                        if(!price || price >= 100) return { mult: '-', am: '-' };
                        const mult = (100 / price).toFixed(2) + 'x';
                        const p = price / 100;
                        let am = p > 0.5 ? -((p / (1-p)) * 100) : ((1-p) / p) * 100;
                        return { mult, am: am > 0 ? `+${Math.round(am)}` : Math.round(am) };
                    };
                    const yes = getStats(yesCost);
                    const no = getStats(noCost);

                    html += `
                        <div style="display:grid; grid-template-columns: 2fr 1fr 1fr; gap:8px; margin-bottom:8px; align-items:center; padding-bottom:8px; border-bottom:1px dashed #222;">
                            <div style="font-size:0.75rem; color:#ccc;">${m.subtitle || 'Winner'}</div>
                            
                            <div style="text-align:center; background:rgba(0, 230, 118, 0.1); padding:4px; border-radius:4px; border:1px solid rgba(0,230,118,0.2);">
                                <div style="font-size:0.6rem; color:#00E676; font-weight:bold; margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${yesName}</div>
                                <div style="color:#fff; font-weight:bold; font-size:0.85rem;">${yesCost}¢</div>
                                <div style="font-size:0.6rem; color:#aaa;">${yes.am}</div>
                            </div>

                            <div style="text-align:center; background:rgba(213, 0, 0, 0.1); padding:4px; border-radius:4px; border:1px solid rgba(213,0,0,0.2);">
                                <div style="font-size:0.6rem; color:#FF5252; font-weight:bold; margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${noName}</div>
                                <div style="color:#fff; font-weight:bold; font-size:0.85rem;">${noCost}¢</div>
                                <div style="font-size:0.6rem; color:#aaa;">${no.am}</div>
                            </div>
                        </div>
                    `;
                });

                html += `</div>`;
                eventCard.innerHTML = html;
                div.appendChild(eventCard);
            });
        }
    },

        // --- HOT WALLET FUNCTIONALITY ---
        // --- HOT WALLET MANAGER (Universal Version) ---
    wallet: {
        currentKey: null,
        currentAddr: null,
        utxos: [],

                // 1. Generate New Key (Auto-Backup to Notes)
        generate: () => {
            if(!confirm("Generate new random wallet? \n\nSAFEGUARD: This will automatically save the Private Key to your 'Quick Notes'.")) return;
            try {
                // Buffer Helper
                const B = (typeof Buffer !== 'undefined') ? Buffer : ((bitcoin.Buffer) ? bitcoin.Buffer : null);
                
                // A. Generate Key Pair
                let keyPair;
                if (bitcoin.ECPair.makeRandom) {
                    keyPair = bitcoin.ECPair.makeRandom();
                } else {
                    // Fallback for older libs
                    const array = new Uint8Array(32);
                    window.crypto.getRandomValues(array);
                    const buf = B ? B.from(array) : new TextEncoder().encode(array); 
                    keyPair = bitcoin.ECPair.fromPrivateKey(buf);
                }

                const wif = keyPair.toWIF();
                const pub = keyPair.publicKey.toString('hex');

                // B. Derive Address (To save in note)
                let address = '';
                const network = bitcoin.networks.bitcoin;
                // Try Modern P2PKH
                if(bitcoin.payments && bitcoin.payments.p2pkh) {
                    const { address: addr } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
                    address = addr;
                } 
                // Try Legacy
                else if(keyPair.getAddress) {
                    address = keyPair.getAddress();
                } 
                // Fallback
                else {
                    const hash = bitcoin.crypto.hash160(keyPair.getPublicKeyBuffer ? keyPair.getPublicKeyBuffer() : keyPair.publicKey);
                    address = bitcoin.address.toBase58Check(hash, 0x00);
                }

                // C. Auto-Save to Notes
                const noteBody = `CREATED: ${new Date().toLocaleString()}\n\nADDRESS:\n${address}\n\nPRIVATE KEY (WIF):\n${wif}\n\nPUBLIC KEY (HEX):\n${pub}`;
                
                app.data.notes.push({
                    id: Date.now(),
                    title: 'BTC KEYS (AUTO)',
                    body: noteBody,
                    date: new Date().toISOString(),
                    color: '#FFEA00' // Yellow for Bitcoin
                });

                app.save(); // Persist to LocalStorage immediately
                app.renderNotes(); // Update the Notes UI background

                // D. Update Wallet UI
                document.getElementById('w-import-key').value = wif;
                alert(`New Wallet Generated!\n\nAddress: ${address}\n\nSUCCESS: Keys have been saved to your Quick Notes.`);

            } catch(e) { 
                console.error(e);
                alert("Generate Error: " + e.message); 
            }
        },
        // 2. Load Wallet (Universal Fix + Auto-Refresh)
        load: () => {
            const wifInput = document.getElementById('w-import-key');
            const wif = wifInput.value.trim();
            
            if(!wif) return alert("Please enter or generate a Private Key (WIF) first.");

            try {
                // Buffer Helper (The anti-crash fix)
                const B = (typeof Buffer !== 'undefined') ? Buffer : ((bitcoin.Buffer) ? bitcoin.Buffer : null);
                
                // Decode the Key
                const network = bitcoin.networks.bitcoin;
                const keyPair = bitcoin.ECPair.fromWIF(wif, network);
                
                // Derive Address (Try Modern, fallback to Legacy)
                let address = '';
                try {
                    if(bitcoin.payments && bitcoin.payments.p2pkh) {
                        const { address: addr } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
                        address = addr;
                    } else if(keyPair.getAddress) {
                        address = keyPair.getAddress();
                    } else {
                        // Manual fallback for ancient libs
                        const hash = bitcoin.crypto.hash160(keyPair.getPublicKeyBuffer ? keyPair.getPublicKeyBuffer() : keyPair.publicKey);
                        address = bitcoin.address.toBase58Check(hash, 0x00);
                    }
                } catch(addrErr) {
                    console.error(addrErr);
                    // Last ditch attempt: if P2PKH failed, just ask the keypair
                    if(keyPair.getAddress) address = keyPair.getAddress();
                }

                // Save to State
                app.wallet.currentKey = keyPair;
                app.wallet.currentAddr = address;

                // Update UI (Show Dashboard)
                document.getElementById('wallet-login').style.display = 'none';
                document.getElementById('wallet-dash').style.display = 'block';
                document.getElementById('w-address').innerText = address;
                
                // Status Indicator
                const statusEl = document.getElementById('wallet-status');
                statusEl.innerText = "ONLINE";
                statusEl.style.color = "#00E676";
                statusEl.style.fontWeight = "bold";
                
                // Trigger Balance Check
                app.wallet.refresh();

            } catch(e) {
                console.error(e);
                alert("Could not load wallet.\n\nError: " + e.message + "\n\nMake sure the key is a valid WIF string.");
            }
        },


        // 3. Fetch Balance (API)
        refresh: async () => {
            const addr = app.wallet.currentAddr;
            const balEl = document.getElementById('w-balance');
            const msgEl = document.getElementById('w-msg');
            if(!addr) return;

            balEl.innerText = "Loading...";
            try {
                // Fetch UTXOs
                const res = await fetch(`https://blockstream.info/api/address/${addr}/utxo`);
                if(!res.ok) throw new Error("API Limit or Network Error");
                const utxos = await res.json();
                app.wallet.utxos = utxos;

                const totalSats = utxos.reduce((acc, tx) => acc + tx.value, 0);
                const btc = (totalSats / 100000000).toFixed(8);
                
                balEl.innerHTML = `${btc} <span style="font-size:1rem; color:#FFEA00;">BTC</span>`;
                msgEl.innerText = `Synced: ${utxos.length} UTXOs available.`;
                msgEl.style.color = "#aaa";
            } catch(e) {
                balEl.innerText = "Error";
                msgEl.innerText = "Connection Failed. Retrying...";
                msgEl.style.color = "#D50000";
            }
        },

        // 4. Send (Robust Builder)
        send: async () => {
            const dest = document.getElementById('w-dest').value.trim();
            const amtBTC = parseFloat(document.getElementById('w-amt').value);
            const feeRate = parseInt(document.getElementById('w-fee').value) || 20;
            const msgEl = document.getElementById('w-msg');

            if(!dest || !amtBTC) return alert("Enter destination and amount");
            if(!app.wallet.utxos.length) return alert("No funds available (No UTXOs).");

            if(!confirm(`Send ${amtBTC} BTC to ${dest}?`)) return;

            try {
                const satoshisToSend = Math.floor(amtBTC * 100000000);
                const network = bitcoin.networks.bitcoin;
                const txb = new bitcoin.TransactionBuilder(network);
                
                let inputSum = 0;
                let inputsCount = 0;

                // Add Inputs (Coin Selection)
                app.wallet.utxos.forEach((utxo) => {
                    if(inputSum < (satoshisToSend + 5000)) { 
                        txb.addInput(utxo.tx_hash, utxo.tx_output_n);
                        inputSum += utxo.value;
                        inputsCount++;
                    }
                });

                const txSize = (inputsCount * 148) + (2 * 34) + 10; 
                const fee = txSize * feeRate;
                const change = inputSum - satoshisToSend - fee;

                if (change < 0) return alert(`Insufficient Funds. Need ${satoshisToSend + fee} sats, have ${inputSum}.`);

                txb.addOutput(dest, satoshisToSend);
                if (change > 546) {
                    txb.addOutput(app.wallet.currentAddr, change);
                }

                for(let i=0; i<inputsCount; i++) {
                    txb.sign(i, app.wallet.currentKey);
                }

                const tx = txb.build();
                const hex = tx.toHex();

                msgEl.innerText = "Broadcasting...";
                msgEl.style.color = "#FFEA00";

                const response = await fetch('https://blockstream.info/api/tx', { method: 'POST', body: hex });
                const txid = await response.text();

                if (response.ok) {
                    msgEl.innerHTML = `✅ SENT! <a href="https://mempool.space/tx/${txid}" target="_blank" style="color:#00E676">View TX</a>`;
                    app.wallet.refresh();
                } else {
                    throw new Error(txid);
                }

            } catch(e) {
                console.error(e);
                alert("Send Failed: " + e.message);
                msgEl.innerText = "Failed: " + e.message;
                msgEl.style.color = "#D50000";
            }
        },

        logout: () => {
            app.wallet.currentKey = null;
            app.wallet.currentAddr = null;
            app.wallet.utxos = [];
            document.getElementById('w-import-key').value = '';
            document.getElementById('wallet-dash').style.display = 'none';
            document.getElementById('wallet-login').style.display = 'block';
            document.getElementById('wallet-status').innerText = "OFFLINE";
            document.getElementById('wallet-status').style.color = "#555";
        }
    },
        fetchSports: async () => {
        const sport = document.getElementById('sport-key').value;
        const apiKey = '39298e045fe53816e45b2672570ff942'; // GET FREE KEY FROM THE-ODDS-API.COM
        const list = document.getElementById('sports-ticker-res');
        
        list.innerHTML = '<div style="color:#aaa;">Loading live odds...</div>';
        
        try {
            const res = await fetch(`https://api.the-odds-api.com/v4/sports/${sport}/odds/?regions=us&markets=h2h&oddsFormat=american&apiKey=${apiKey}`);
            const games = await res.json();
            
            list.innerHTML = '';
            if(games.length === 0) list.innerHTML = '<div style="color:#555;">No active games found.</div>';
            
            games.slice(0, 5).forEach(g => { // Show top 5
                const home = g.home_team;
                const away = g.away_team;
                const book = g.bookmakers[0]; // Take first book
                const odds = book ? book.markets[0].outcomes : [];
                
                const homeOdd = odds.find(o => o.name === home)?.price || '-';
                const awayOdd = odds.find(o => o.name === away)?.price || '-';

                const el = document.createElement('div');
                el.className = 'bill-row'; // Reuse existing styling
                el.style.display = 'block';
                el.innerHTML = `
                    <div style="font-size:0.7rem; color:#fff; font-weight:bold; display:flex; justify-content:space-between;">
                        <span>${away}</span> <span>${awayOdd > 0 ? '+'+awayOdd : awayOdd}</span>
                    </div>
                    <div style="font-size:0.7rem; color:#fff; font-weight:bold; display:flex; justify-content:space-between; border-top:1px solid #333; margin-top:4px; padding-top:4px;">
                        <span>${home}</span> <span>${homeOdd > 0 ? '+'+homeOdd : homeOdd}</span>
                    </div>
                    <div style="font-size:0.6rem; color:#555; margin-top:4px; text-align:right;">
                        ${new Date(g.commence_time).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                    </div>
                `;
                list.appendChild(el);
            });
        } catch(e) {
            list.innerHTML = `<div style="color:var(--error);">Error: ${e.message}. Check API Key.</div>`;
        }
    },
    // --- NEW SPORTS LOGIC ---
    sports: {
        nbaChartInstance: null,

                generateChart: async () => {
            const inputs = document.querySelectorAll('.nba-input');
            const names = Array.from(inputs).map(i => i.value.trim()).filter(n => n);
            
            if(names.length === 0) return alert("Enter at least one player.");

            Swal.fire({ title: 'Building Stat Sheet...', didOpen: () => Swal.showLoading() });
            
            const tbody = document.getElementById('nba-stats-body');
            tbody.innerHTML = ''; // Clear old data

            try {
                // Fetch Data for ALL Players sequentially
                for (let i = 0; i < names.length; i++) {
                    const name = names[i];
                    
                    // 1. Search Player
                    const pRes = await fetch(`https://www.balldontlie.io/api/v1/players?search=${name}`);
                    const pData = await pRes.json();
                    if(!pData.data || pData.data.length === 0) continue;
                    const player = pData.data[0];

                    // 2. Get Last 10 Games
                    const season = new Date().getFullYear() - 1; 
                    const gRes = await fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=${season}&player_ids[]=${player.id}&per_page=10`);
                    const gData = await gRes.json();
                    
                    // 3. Sort Newest First (Top of list)
                    // API usually returns newest last, so we reverse to show most recent at top
                    // Check date just in case
                    const games = gData.data.sort((a,b) => new Date(b.game.date) - new Date(a.game.date));

                    // --- RENDER PLAYER HEADER ---
                    const headerRow = document.createElement('tr');
                    headerRow.className = 'player-header-row';
                    headerRow.innerHTML = `
                        <td colspan="7" class="player-name-cell">
                            ${player.first_name} ${player.last_name} <span style="font-size:0.65rem; color:#777; font-weight:normal;">(${player.team.abbreviation})</span>
                        </td>
                    `;
                    tbody.appendChild(headerRow);

                    // --- RENDER 10 GAME ROWS ---
                    games.forEach(g => {
                        const isHome = g.game.home_team_id === g.team.id;
                        const opp = isHome ? g.game.visitor_team.abbreviation : g.game.home_team.abbreviation;
                        const loc = isHome ? 'vs' : '@';
                        const date = new Date(g.game.date).toLocaleDateString([], {month:'numeric', day:'numeric'});
                        
                        // Highlights
                        const ptsClass = g.pts >= 25 ? 'stat-high' : '';
                        const rebClass = g.reb >= 10 ? 'stat-high' : '';
                        const astClass = g.ast >= 8 ? 'stat-high' : '';

                        const row = document.createElement('tr');
                        row.className = 'game-row';
                        row.innerHTML = `
                            <td style="text-align:left; color:#aaa;">
                                <span style="color:#fff;">${loc} ${opp}</span> <span style="font-size:0.6rem;">(${date})</span>
                            </td>
                            <td>${g.min}</td>
                            <td class="${ptsClass}">${g.pts}</td>
                            <td class="${rebClass}">${g.reb}</td>
                            <td class="${astClass}">${g.ast}</td>
                            <td>${g.fg3m}</td>
                            <td>${(g.fg_pct * 100).toFixed(0)}%</td>
                        `;
                        tbody.appendChild(row);
                    });
                }

                // Show Result
                Swal.close();
                app.nav('stats');
                document.getElementById('nba-chart-card').style.display = 'block';

            } catch(e) {
                Swal.fire('Error', 'Failed to load stats. API might be busy.', 'error');
            }
        },
     },

    // --- NEW CRYPTO LOGIC ---
    crypto: {
        btcChartInstance: null,

        // 1. MEMPOOL TRACKER
            // --- CRYPTO LOGIC UPDATE ---
    
    // (Inside app.crypto object)
    
    trackItem: async () => {
        const input = document.getElementById('mp-input').value.trim();
        if(!input) return;
        
        const resBox = document.getElementById('mp-res');
        resBox.style.display = 'block';
        resBox.innerHTML = '<div style="color:#aaa; text-align:center;">Scanning Mempool...</div>';

        // DETECT TYPE: Address vs TXID
        // Addresses usually start with 1, 3, or bc1 and are < 64 chars
        // TXIDs are hex strings of 64 chars
        const isTx = input.length === 64; 

        try {
            if (isTx) {
                // --- TRANSACTION LOOKUP ---
                const res = await fetch(`https://mempool.space/api/tx/${input}`);
                if(!res.ok) throw new Error("TX Not Found");
                const data = await res.json();
                
                const confirmed = data.status.confirmed;
                // Calculate confirmations if confirmed
                let confCount = 0;
                if(confirmed) {
                    const blockRes = await fetch('https://mempool.space/api/blocks/tip/height');
                    const tip = await blockRes.text();
                    confCount = parseInt(tip) - data.status.block_height + 1;
                }

                resBox.innerHTML = `
                    <div style="font-size:0.7rem; color:#aaa; margin-bottom:5px;">TRANSACTION</div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                        <span>Status:</span>
                        <span style="font-weight:bold; color:${confirmed ? '#00E676' : '#D50000'};">${confirmed ? 'CONFIRMED' : 'PENDING'}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                        <span>Confirmations:</span>
                        <span style="font-weight:bold; color:#fff;">${confirmed ? confCount : '0'}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                        <span>Fee:</span>
                        <span style="font-weight:bold; color:#FFEA00;">${data.fee} sats</span>
                    </div>
                `;

            } else {
                // --- ADDRESS LOOKUP ---
                const res = await fetch(`https://mempool.space/api/address/${input}`);
                if(!res.ok) throw new Error("Address Not Found");
                const data = await res.json();
                
                // Math for balances (Chain stats + Mempool stats)
                const funded = data.chain_stats.funded_txo_sum + data.mempool_stats.funded_txo_sum;
                const spent = data.chain_stats.spent_txo_sum + data.mempool_stats.spent_txo_sum;
                const balance = (funded - spent) / 100000000; // Convert sats to BTC
                const txCount = data.chain_stats.tx_count + data.mempool_stats.tx_count;

                resBox.innerHTML = `
                    <div style="font-size:0.7rem; color:#aaa; margin-bottom:5px;">ADDRESS HOLDINGS</div>
                    <div style="text-align:center; margin-bottom:10px;">
                        <div style="font-size:1.4rem; font-weight:bold; color:#fff;">${balance.toFixed(8)} <span style="font-size:0.8rem; color:#FFEA00;">BTC</span></div>
                    </div>
                    <div style="display:flex; justify-content:space-between; border-top:1px solid #333; padding-top:5px;">
                        <span style="color:#aaa;">Total Received:</span>
                        <span style="color:#fff;">${(funded / 100000000).toFixed(4)} BTC</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-top:4px;">
                        <span style="color:#aaa;">Transactions:</span>
                        <span style="color:#00E676;">${txCount}</span>
                    </div>
                `;
            }

        } catch(e) {
            resBox.innerHTML = `<div style="color:var(--error); text-align:center;">${e.message}</div>`;
        }
    },
    
    // ... keep your fetchTicker and renderHistory functions here ...


        // 2. LIVE TICKER (CoinGecko)
        fetchTicker: async () => {
            const ids = "ripple,monero,litecoin,solana,ethereum,dogecoin";
            const table = document.getElementById('crypto-ticker-body');
            table.innerHTML = '<tr><td colspan="3" style="text-align:center;">Fetching...</td></tr>';
            
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
                const data = await res.json();
                
                let html = '';
                // Map pretty names
                const names = { ripple:'XRP', monero:'XMR', litecoin:'LTC', solana:'SOL', ethereum:'ETH', dogecoin:'DOGE' };
                
                for(const [key, val] of Object.entries(data)) {
                    const change = val.usd_24h_change.toFixed(2);
                    const color = change >= 0 ? '#00E676' : '#D50000';
                    const symbol = names[key] || key.toUpperCase();
                    
                    html += `
                        <tr>
                            <td style="font-weight:bold; color:#fff;">${symbol}</td>
                            <td>$${val.usd.toLocaleString()}</td>
                            <td style="color:${color};">${change > 0 ? '+' : ''}${change}%</td>
                        </tr>
                    `;
                }
                table.innerHTML = html;
            } catch(e) {
                table.innerHTML = '<tr><td colspan="3" style="color:red;">API Error</td></tr>';
            }
        },

        // 3. BITCOIN HISTORY CHART
        renderHistory: async (days) => {
            // Map our filter strings to CoinGecko 'days' param
            // 'day' -> 1, 'week' -> 7, 'month' -> 30, 'year' -> 365
            const dayMap = { 'day': 1, 'week': 7, 'month': 30, 'year': 365, 'all': 'max', 'custom': 30 };
            const d = dayMap[days] || 30;

            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${d}`);
                const data = await res.json();
                const prices = data.prices; // Array of [timestamp, price]

                const ctx = document.getElementById('btcHistoryChart').getContext('2d');
                
                // Format Labels based on range
                const labels = prices.map(p => {
                    const date = new Date(p[0]);
                    if(d === 1) return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    return date.toLocaleDateString([], {month:'short', day:'numeric'});
                });
                
                const val = prices.map(p => p[1]);

                if(app.crypto.btcChartInstance) app.crypto.btcChartInstance.destroy();

                app.crypto.btcChartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'BTC Price ($)',
                            data: val,
                            borderColor: '#F7931A',
                            backgroundColor: 'rgba(247, 147, 26, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            pointRadius: 0,
                            tension: 0.2
                        }]
                    },
                                        options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { 
                            legend: { display: false },
                            datalabels: { display: false } // <--- THIS LINE REMOVES THE RED NUMBERS
                        },
                        scales: { 
                            y: { grid: { color: '#222' } }, 
                            x: { grid: { display: false }, ticks: { maxTicksLimit: 6 } } 
                        }
                    }
                    
                });

            } catch(e) { console.error("BTC Chart Error", e); }
        }
    },

            // --- RECURRING EXPENSES LOGIC ---

    // 1. Tool Logic (Add/Edit Rows)
    renderRecurringTools: () => {
        const div = document.getElementById('recurring-tools-list');
        if(!div) return;
        div.innerHTML = '';
        
        // Ensure data array exists
        if (!app.data.recurring) app.data.recurring = [];

        app.data.recurring.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'bill-row';
            row.innerHTML = `
                <input type="text" value="${item.name}" placeholder="Bill Name" onchange="app.updateRecurring(${index}, 'name', this.value)">
                <input type="number" value="${item.cost}" placeholder="0.00" onchange="app.updateRecurring(${index}, 'cost', this.value)">
                <input type="number" value="${item.due}" placeholder="1" min="1" max="31" onchange="app.updateRecurring(${index}, 'due', this.value)">
                <button class="bill-btn-del" onclick="app.removeRecurring(${index})"><i class="material-icons-round" style="font-size:16px;">close</i></button>
            `;
            div.appendChild(row);
        });
    },

    addRecurring: () => {
        if (!app.data.recurring) app.data.recurring = [];
        app.data.recurring.push({ name: '', cost: '', due: '' });
        app.save();
        app.renderRecurringTools();
    },

    removeRecurring: (index) => {
        if(confirm("Remove this bill?")) {
            app.data.recurring.splice(index, 1);
            app.save();
            app.renderRecurringTools();
        }
    },

    updateRecurring: (index, field, value) => {
        app.data.recurring[index][field] = value;
        app.save();
        // Also update stats if looking at that page
        if(document.getElementById('view-stats').style.display !== 'none') app.renderRecurringStats();
    },

    // 2. Stats Logic (The Table)
    renderRecurringStats: () => {
        const tbody = document.getElementById('recurring-stats-body');
        if(!tbody) return;
        tbody.innerHTML = '';

        if (!app.data.recurring || app.data.recurring.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#555;">No bills set up in Tools.</td></tr>';
            return;
        }

        // Filter transactions based on current global filter (Period)
        const filteredTxs = app.data.txs.filter(t => app.checkFilter(t));

        app.data.recurring.forEach(bill => {
            if(!bill.name) return;

            // Calculate "Total Paid So Far" by finding matches in transactions
            // We match if the Description contains the Bill Name (Case Insensitive)
            const totalPaid = filteredTxs.reduce((sum, t) => {
                // Check if it's an expense AND (Description matches OR Sub-Category matches)
                const descMatch = t.desc && t.desc.toLowerCase().includes(bill.name.toLowerCase());
                const subMatch = t.details && t.details.sub && t.details.sub.toLowerCase() === bill.name.toLowerCase();
                
                if (t.amt < 0 && (descMatch || subMatch)) {
                    return sum + Math.abs(t.amt);
                }
                return sum;
            }, 0);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="color:#fff; font-weight:bold;">${bill.name}</td>
                <td>$${parseFloat(bill.cost||0).toLocaleString()}</td>
                <td>${bill.due || '-'}</td>
                <td style="color:${totalPaid > 0 ? 'var(--success)' : '#555'}">$${Math.round(totalPaid).toLocaleString()}</td>
                <td><button class="rec-pay-btn" onclick="app.payBill('${bill.name}', '${bill.cost}')">PAY</button></td>
            `;
            tbody.appendChild(tr);
        });
    },

    // 3. Quick Pay Action
    payBill: (name, cost) => {
        app.openModal(); // Open main transaction modal
        
        // Pre-fill the modal
        document.getElementById('modal-title').innerText = "PAY BILL";
        document.getElementById('inp-cat').value = 'expenses';
        app.setType('exp');
        
        // Wait for dynamic fields to render, then fill
        setTimeout(() => {
            app.renderDynamicFields();
            document.getElementById('inp-amt').value = cost;
            document.getElementById('inp-desc').value = name;
            
            // Try to set sub-category to 'Bill' if available
            const subSelect = document.getElementById('d-sub');
            if(subSelect) subSelect.value = 'Bill';
            
            document.getElementById('d-cost').value = cost;
            document.getElementById('d-desc').value = name;
        }, 50);
    },

    
    // 1. Research Tool
    launchResearch: (type) => {
        const p = document.getElementById('res-player').value.trim();
        const l = document.getElementById('res-league').value;
        if(!p) return alert("Enter player name");
        let q = '';
        if(type === 'L10') q = `${p} stats last 10 games`;
        else if(type === 'H/A') q = `${p} stats home vs away this season`;
        else if(type === 'VS') { const opp = prompt("Opponent Team?"); if(!opp) return; q = `${p} stats vs ${opp}`; }
        else if(type === 'OVER') { 
            window.open(`https://www.google.com/search?q=${p}+player+prop+hit+rates+trends`, '_blank'); 
            return; 
        }
        window.open(`https://www.statmuse.com/${l.toLowerCase()}/ask/${q.replace(/ /g, "-")}`, '_blank');
    },
            // --- VANITY ADDRESS MINER (PRO v2) ---
    vanity: {
        active: false,
        count: 0,
        startTime: 0,
        foundKey: null,
        
                // (KEEP YOUR LARGE DICTIONARY HERE)
        dictionary: "ABORT,ABUSE,ACID,ACNE,ACRE,ACT,ADEPT,ADMIT,ADOBE,ADOPT,ADULT,AERY,AFAR,AFRO,AGAVE,AGED,AGENT,AGES,AGONY,AHEAD,AID,AIDE,AIDS,AIM,AIR,AJAR,ALARM,ALBUM,ALERT,ALGAE,ALIBI,ALIEN,ALIGN,ALIKE,ALIVE,ALKYD,ALLEY,ALLOW,ALLOY,ALONE,ALPHA,ALOUD,ALTAR,ALTER,AMASS,AMAZ,AMBER,AMEND,AMINO,AMISS,AMONG,AMPLE,AMPLY,AMUSE,ANAL,ANCHOR,AND,ANGEL,ANGER,ANGLE,ANGRY,ANGST,ANGUS,ANIME,ANKLE,ANNEX,ANNOY,ANNUL,ANODE,ANT,ANTE,ANTI,ANTS,ANUS,ANVIL,ANY,APART,APE,APEX,APNEA,APPLE,APPLY,APRON,APT,AQUA,ARCH,AREA,ARENA,ARGUE,ARISE,ARM,ARMED,ARMOR,ARMY,AROMA,ARRAY,ARROW,ARSE,ART,ARTERY,ASH,ASHEN,ASHES,ASIAN,ASIDE,ASK,ASKEW,ASP,ASS,ASSET,ASTRO,ATARA,ATE,ATMOS,ATOM,ATONE,ATTIC,AUDIO,AUDIT,AUNT,AURA,AUTO,AVAIL,AVER,AVERT,AVID,AVOID,AWAKE,AWARD,AWARE,AWASH,AWAY,AWE,AWFUL,AWK,AXE,AXIS,AZURE,BABE,BABY,BACK,BACON,BAD,BADGE,BAG,BAGEL,BAGGY,BAKE,BAKER,BALD,BALE,BALK,BALL,BALMY,BAN,BAND,BANG,BANJO,BANK,BANKS,BANNED,BANNER,BAR,BARB,BARE,BARGE,BARK,BARN,BARON,BARS,BASE,BASH,BASIC,BASIN,BASS,BAST,BATCH,BATH,BATHE,BATS,BATT,BATTY,BAWDY,BAY,BEACH,BEAD,BEAK,BEAM,BEAN,BEAR,BEARD,BEARS,BEAST,BEAT,BEATS,BEAU,BECK,BED,BEDS,BEE,BEEF,BEEFY,BEEN,BEER,BEERS,BEES,BEET,BEETS,BEG,BEGAN,BEGET,BEGIN,BEGUN,BEIGE,BEING,BELCH,BELL,BELLE,BELLS,BELLY,BELOW,BELT,BENCH,BEND,BENDS,BENT,BERET,BERRY,BERTH,BESET,BEST,BET,BETA,BETS,BEVY,BIAS,BIB,BIBLE,BID,BIDE,BIG,BIKE,BIKES,BILE,BILK,BILL,BILLS,BIN,BIND,BINGO,BIRCH,BIRD,BIRDS,BIRTH,BISON,BIT,BITCH,BITE,BITES,BITS,BLAB,BLACK,BLADE,BLAH,BLAME,BLAND,BLANK,BLARE,BLAST,BLAZE,BLEAK,BLEAT,BLEED,BLEND,BLESS,BLIMP,BLIND,BLINK,BLISS,BLITZ,BLOCK,BLOG,BLOND,BLOOD,BLOOM,BLOT,BLOW,BLUE,BLUES,BLUFF,BLUNT,BLUR,BLURT,BLUSH,BOAR,BOARD,BOAST,BOAT,BOATS,BOB,BODY,BOG,BOGGY,BOGUS,BOIL,BOLD,BOLT,BOMB,BOMBS,BOND,BONDS,BONE,BONER,BONES,BONUS,BOOB,BOOBS,BOOK,BOOKS,BOOM,BOOST,BOOT,BOOTS,BOOTY,BOOZE,BORE,BORED,BORN,BOSS,BOSSY,BOT,BOTH,BOTCH,BOUGH,BOUND,BOUT,BOW,BOWEL,BOWL,BOWLS,BOX,BOXER,BOXES,BOY,BOYS,BRA,BRACE,BRAG,BRAID,BRAIN,BRAKE,BRAN,BRAND,BRASH,BRASS,BRAT,BRAVE,BRAWL,BRAY,BREAD,BREAK,BREED,BREW,BRIBE,BRICK,BRIDE,BRIEF,BRIG,BRIM,BRINE,BRING,BRINK,BRISK,BROAD,BROKE,BROOK,BROOM,BROTH,BROWN,BRUNT,BRUSH,BRUTE,BUB,BUCK,BUCKS,BUD,BUDDY,BUDGE,BUDS,BUFF,BUG,BUGGY,BUGS,BUILD,BUILT,BULB,BULGE,BULK,BULL,BULLY,BUM,BUMP,BUMPS,BUMPY,BUN,BUNCH,BUNG,BUNK,BUNNY,BUNS,BUOY,BURD,BURG,BURN,BURNS,BURNT,BURP,BURST,BURY,BUS,BUSH,BUSHY,BUST,BUSY,BUT,BUTCH,BUTT,BUTTS,BUY,BUYER,BUZZ,BYE,BYLAW,CAB,CABAL,CABIN,CABLE,CACHE,CACTI,CADDY,CAGE,CAGEY,CAKE,CAKES,CALF,CALL,CALLS,CALM,CAM,CAMEL,CAMP,CAMPS,CAN,CANAL,CANDY,CANE,CANS,CANT,CANVAS,CANYON,CAP,CAPE,CAPER,CAPS,CAR,CARB,CARD,CARDS,CARE,CARES,CARGO,CARNE,CARP,CARRY,CARS,CART,CARTS,CARVE,CASE,CASES,CASH,CASK,CAST,CASTE,CAT,CATCH,CATER,CATS,CATTY,CAUSE,CAVE,CAVES,CEASE,CEDAR,CEDE,CELL,CELLO,CELLS,CENT,CENTS,CHAFE,CHAFF,CHAIN,CHAIR,CHALK,CHAMP,CHANT,CHAOS,CHAP,CHAPS,CHARD,CHARM,CHART,CHASE,CHASM,CHAT,CHEAP,CHEAT,CHECK,CHEEK,CHEER,CHEF,CHESS,CHEST,CHEW,CHEWY,CHIC,CHICK,CHIEF,CHILD,CHILL,CHIME,CHIMP,CHIN,CHINA,CHINK,CHINS,CHIP,CHIPS,CHIRP,CHIVE,CHOCK,CHOIR,CHOKE,CHOMP,CHOP,CHOPS,CHORD,CHORE,CHOSEN,CHOW,CHUB,CHUCK,CHUG,CHUMP,CHUNK,CHURN,CHUTE,CIDER,CIGAR,CINCH,CIRCA,CITE,CITY,CIVIC,CIVIL,CLAD,CLAIM,CLAM,CLAMP,CLAMS,CLANG,CLANK,CLAP,CLASH,CLASP,CLASS,CLAW,CLAWS,CLAY,CLEAN,CLEAR,CLEAT,CLEFT,CLERK,CLICK,CLIFF,CLIMB,CLING,CLINK,CLIP,CLIPS,CLOAK,CLOCK,CLOD,CLOG,CLONE,CLOSE,CLOTH,CLOUD,CLOUT,CLOVE,CLOWN,CLUB,CLUBS,CLUCK,CLUE,CLUES,CLUMP,CLUNG,COACH,COAL,COAST,COAT,COATS,COBRA,COCK,COCKY,COCOA,COD,CODE,CODES,COG,COIN,COINS,COLD,COLON,COLOR,COLT,COMA,COMB,COMBO,COME,COMES,COMET,COMFY,COMIC,COMMA,CONCH,CONE,CONES,COOK,COOKS,COOL,COOP,COP,COPE,COPRA,COPS,COPY,CORAL,CORD,CORDS,CORE,CORK,CORN,CORNY,CORPS,CORSE,COST,COSTS,COSY,COT,COUCH,COUGH,COUNT,COUP,COUPE,COURT,COVE,COVER,COVET,COW,COWER,COWL,COWS,CRAB,CRABS,CRACK,CRAFT,CRAG,CRAM,CRAMP,CRANE,CRANK,CRAP,CRAPS,CRASH,CRASS,CRATE,CRAVE,CRAWL,CRAZE,CRAZY,CREAK,CREAM,CREDO,CREED,CREEK,CREEP,CREPE,CREPT,CRESS,CREST,CREW,CREWS,CRIB,CRICK,CRIED,CRIES,CRIME,CRIMP,CRISP,CROAK,CROCK,CRONY,CROOK,CROON,CROP,CROPS,CROSS,CROW,CROWD,CROWN,CROWS,CRUDE,CRUEL,CRUMB,CRUMP,CRUSH,CRUST,CRY,CRYPT,CUBE,CUBES,CUBIC,CUBIT,CUFF,CUFFS,CULL,CULT,CUP,CUPID,CUPS,CURB,CURD,CURE,CURES,CURIO,CURL,CURLS,CURLY,CURRY,CURSE,CURT,CURVE,CUSH,CUSHY,CUSP,CUSS,CUTE,CUTIE,CUTS,CYCLE,CYNIC,CYST,DAB,DAD,DADDY,DAFT,DAILY,DAIRY,DAISY,DALE,DAM,DAMAGE,DAME,DAMES,DAMN,DAMP,DANCE,DANDY,DANG,DARE,DARK,DARN,DART,DARTS,DASH,DATA,DATE,DATES,DATUM,DAUNT,DAWN,DAY,DAYS,DAZE,DEAD,DEAF,DEAL,DEALT,DEAN,DEAR,DEATH,DEBAR,DEBIT,DEBT,DEBTS,DEBUG,DEBUT,DECAF,DECAY,DECK,DECKS,DECOY,DECRY,DEED,DEEDS,DEEM,DEEP,DEER,DEFER,DEFT,DEFY,DEITY,DELAY,DELL,DELTA,DELVE,DEMON,DEMUR,DEN,DENIM,DENSE,DENT,DENY,DEPOT,DEPTH,DERBY,DESK,DESKS,DETER,DETOX,DEUCE,DEVIL,DEW,DIAL,DIARY,DICE,DICT,DID,DIE,DIED,DIES,DIET,DIETS,DIG,DIGIT,DIGS,DILL,DIM,DIME,DIMES,DINE,DINER,DING,DINGY,DINKY,DIP,DIPS,DIRT,DIRTY,DISC,DISH,DISK,DISKS,DITCH,DITTO,DITTY,DIVE,DIVER,DIVES,DIVOT,DIZZY,DOCK,DOCKS,DODGE,DODO,DOE,DOES,DOG,DOGMA,DOGS,DOILY,DOING,DOLE,DOLL,DOLLS,DOLLY,DOME,DOMES,DON,DONE,DONOR,DONUT,DOOM,DOOR,DOORS,DOPE,DOPEY,DOSE,DOT,DOTE,DOTS,DOUBT,DOUGH,DOVE,DOWDY,DOWN,DOWRY,DOZE,DOZEN,DRAB,DRAFT,DRAG,DRAGS,DRAIN,DRAKE,DRAM,DRAMA,DRANK,DRAPE,DRAW,DRAWL,DRAWN,DRAWS,DREAD,DREAM,DREGS,DRESS,DRIED,DRIER,DRIFT,DRILL,DRINK,DRIP,DRIPS,DRIVE,DROLL,DRONE,DROOL,DROOP,DROP,DROPS,DROSS,DROVE,DROWN,DRUB,DRUG,DRUGS,DRUM,DRUMS,DRUNK,DRY,DRYER,DUAL,DUB,DUCK,DUCKS,DUCT,DUDE,DUDES,DUDS,DUE,DUEL,DUET,DUFF,DUG,DUKE,DUKES,DULL,DULY,DUMB,DUMMY,DUMP,DUMPS,DUMPY,DUN,DUNCE,DUNE,DUNES,DUNG,DUNK,DUPE,DUSK,DUSKY,DUST,DUSTY,DUTCH,DUTY,DWARF,DWELL,DWELT,DYE,DYER,DYING,DYKE,DYNAM,EAGER,EAGLE,EAR,EARL,EARN,EARS,EARTH,EASE,EASEL,EAST,EASY,EAT,EATEN,EATER,EATS,EAVES,EBB,EBONY,ECHO,EDGE,EDGY,EDIT,EEL,EELS,EERIE,EFF,EGG,EGGS,EGO,EIGHT,EJECT,ELATE,ELBOW,ELDER,ELECT,ELEGY,ELF,ELITE,ELK,ELKS,ELM,ELMS,ELOPE,ELSE,ELUDE,ELVES,EMAIL,EMBER,EMBED,EMBER,EMBRY,EMCEE,EMERGE,EMIT,EMPTY,ENACT,END,ENDED,ENDS,ENEMY,ENJOY,ENNUI,ENTER,ENTRY,ENVY,EPIC,EPOCH,EPOXY,EQUAL,EQUIP,ERASE,ERECT,ERODE,ERROR,ERUPT,ESSAY,EST,ETCH,ETHER,ETHIC,ETHOS,EVADE,EVE,EVEN,EVENT,EVER,EVERY,EVICT,EVIL,EVOKE,EXACT,EXALT,EXAM,EXAMS,EXCEL,EXERT,EXILE,EXIST,EXIT,EXITS,EXPEL,EXPO,EXTOL,EXTRA,EXUDE,EYE,EYED,EYES,FABLE,FACE,FACET,FACES,FACT,FACTS,FADE,FADED,FADES,FAG,FAIL,FAILS,FAINT,FAIR,FAIRY,FAITH,FAKE,FAKES,FALL,FALLS,FALSE,FAME,FAN,FANCY,FANG,FANGS,FANNY,FANS,FAR,FARCE,FARE,FARM,FARMS,FART,FARTS,FAST,FAT,FATAL,FATE,FATED,FATES,FATS,FATTY,FAULT,FAUNA,FAVOR,FAWN,FAX,FAZE,FEAR,FEARS,FEAST,FEAT,FECAL,FECES,FED,FEE,FEEB,FEED,FEEDS,FEEL,FEELS,FEES,FEET,FELL,FELON,FELT,FEMME,FENCE,FEND,FERAL,FERN,FERNS,FERRY,FETCH,FETUS,FEUD,FEVER,FEW,FEZ,FIB,FIBER,FIBRE,FIERY,FIFE,FIFTH,FIFTY,FIG,FIGHT,FIGS,FILE,FILES,FILL,FILLS,FILM,FILMS,FILMY,FILTH,FINAL,FINCH,FIND,FINDS,FINE,FINER,FINES,FINGER,FINIS,FINK,FINS,FIRE,FIRES,FIRM,FIRMS,FIRST,FISH,FISHY,FIST,FISTS,FIT,FITS,FIVE,FIVES,FIX,FIXED,FIXER,FIXES,FIZZ,FLAG,FLAGS,FLAIR,FLAKE,FLAKY,FLAME,FLANK,FLAP,FLAPS,FLARE,FLASH,FLASK,FLAT,FLATS,FLAW,FLAWS,FLEA,FLEAS,FLECK,FLED,FLEE,FLEES,FLEET,FLESH,FLEW,FLEX,FLICK,FLIER,FLIES,FLING,FLINT,FLIP,FLIPS,FLIRT,FLOAT,FLOCK,FLOG,FLOOD,FLOOR,FLOP,FLOPS,FLORA,FLOSS,FLOUR,FLOW,FLOWS,FLU,FLUFF,FLUID,FLUKE,FLUME,FLUNG,FLUNK,FLUSH,FLUTE,FLY,FLYER,FOAL,FOAM,FOAMY,FOCAL,FOCUS,FOG,FOGGY,FOIL,FOIST,FOLD,FOLDS,FOLK,FOLKS,FOLLOW,FOLLY,FOND,FONT,FOOD,FOODS,FOOL,FOOLS,FOOT,FOR,FORAY,FORCE,FORD,FORE,FORGE,FORK,FORKS,FORM,FORMS,FORT,FORTH,FORTS,FORTY,FORUM,FOUL,FOUND,FOUR,FOURS,FOWL,FOX,FOXES,FOXY,FOYER,FRAIL,FRAME,FRANC,FRANK,FRAUD,FRAY,FREAK,FREE,FREED,FREER,FREES,FREEZ,FRENZ,FRESH,FRET,FRETS,FRIAR,FRIED,FRIES,FRILL,FRISK,FROCK,FROG,FROGS,FROM,FRONT,FROST,FROTH,FROWN,FROZE,FRUIT,FRY,FUDGE,FUEL,FUGUE,FULL,FULLY,FUME,FUMES,FUN,FUND,FUNDS,FUNGI,FUNKY,FUNNY,FUR,FURL,FURN,FUROR,FURS,FURY,FUSE,FUSS,FUSSY,FUTON,FUZZ,FUZZY,GAB,GABLE,GAD,GADGET,GAG,GAGE,GAGS,GAIN,GAINS,GAIT,GALA,GALE,GALL,GAME,GAMES,GAMEY,GAMUT,GANG,GANGS,GAP,GAPE,GAPS,GARB,GAS,GASH,GASP,GASPS,GATE,GATES,GATOR,GAUDY,GAUGE,GAUNT,GAUZE,GAVE,GAWK,GAY,GAZE,GEAR,GEARS,GECKO,GEEK,GEEKS,GEESE,GELD,GEM,GEMS,GENE,GENES,GENIE,GENRE,GENT,GENTS,GENUS,GEODE,GERM,GERMS,GET,GETS,GHOST,GHOUL,GIANT,GIDDY,GIFT,GIFTS,GIG,GIGS,GILD,GILL,GILLS,GILT,GIMME,GIN,GINGER,GIPSY,GIRD,GIRL,GIRLS,GIRTH,GIST,GIVE,GIVEN,GIVER,GIVES,GLAD,GLADE,GLAM,GLAND,GLARE,GLASS,GLAZE,GLEAM,GLEAN,GLEE,GLEN,GLIB,GLIDE,GLINT,GLOAT,GLOB,GLOBE,GLOM,GLOOM,GLORY,GLOSS,GLOVE,GLOW,GLOWS,GLUE,GLUES,GLUEY,GLUM,GLUT,GNASH,GNAT,GNAW,GNOME,GNU,GOAD,GOAL,GOALS,GOAT,GOATS,GOB,GOD,GODS,GOES,GOING,GOLD,GOLF,GONAD,GONE,GONER,GONG,GOO,GOOD,GOODS,GOODY,GOOF,GOOFS,GOOFY,GOON,GOOSE,GORE,GORGE,GORY,GOSH,GOT,GOUGE,GOURD,GOUT,GOWN,GOWNS,GRAB,GRABS,GRACE,GRADE,GRAFT,GRAIN,GRAM,GRAMS,GRAND,GRANT,GRAPE,GRAPH,GRASP,GRASS,GRATE,GRAVE,GRAVY,GRAY,GRAZE,GREAT,GREED,GREEN,GREET,GREY,GRID,GRIEF,GRILL,GRIM,GRIME,GRIN,GRIND,GRINS,GRIP,GRIPE,GRIPS,GRIT,GRITS,GROAN,GROIN,GROOM,GROPE,GROSS,GROUP,GROUT,GROVE,GROW,GROWL,GROWN,GROWS,GRUB,GRUEL,GRUFF,GRUNT,GUANO,GUARD,GUAVA,GUESS,GUEST,GUIDE,GUILD,GUILE,GUILT,GUISE,GULCH,GULF,GULL,GULLS,GULP,GULPS,GUM,GUMMY,GUMS,GUN,GUNNY,GUNS,GURU,GUSH,GUSHY,GUST,GUSTO,GUSTS,GUSTY,GUT,GUTS,GUTSY,GUTTY,GUY,GUYS,GYM,GYMS,GYPSY,GYRO,HABIT,HACK,HACKS,HAD,HAFT,HAG,HAIL,HAIR,HAIRS,HAIRY,HALE,HALF,HALL,HALLS,HALO,HALT,HALVE,HAM,HAND,HANDS,HANDY,HANG,HANGS,HANK,HAPPY,HARD,HARDY,HARE,HARES,HARK,HARM,HARMS,HARP,HARPS,HARPY,HARSH,HAS,HASH,HASP,HASTE,HASTY,HAT,HATCH,HATE,HATED,HATER,HATES,HATS,HAUL,HAULS,HAUNT,HAVE,HAVEN,HAVES,HAVOC,HAWK,HAWKS,HAY,HAZE,HAZEL,HAZY,HEAD,HEADS,HEADY,HEAL,HEALS,HEALTH,HEAP,HEAPS,HEAR,HEARD,HEARS,HEART,HEAT,HEATH,HEAVE,HEAVY,HECK,HEDGE,HEED,HEEL,HEELS,HEFT,HEFTY,HEIR,HEIRS,HEIST,HELD,HELL,HELLO,HELM,HELMS,HELP,HELPS,HEM,HEMP,HEMS,HEN,HENCE,HENS,HER,HERB,HERBS,HERD,HERDS,HERE,HERO,HERON,HERS,HEW,HEX,HEY,HICK,HID,HIDDEN,HIDE,HIDES,HIGH,HIGHER,HIGHS,HIKE,HIKER,HIKES,HILL,HILLS,HILLY,HILT,HIM,HIND,HINGE,HINT,HINTS,HIP,HIPPY,HIPS,HIRE,HIRES,HISS,HIT,HITCH,HITS,HIVE,HIVES,HOARD,HOAX,HOBBY,HOBO,HOCK,HOE,HOG,HOGS,HOIST,HOLD,HOLDS,HOLE,HOLES,HOLLY,HOLY,HOMAGE,HOME,HOMER,HOMES,HOMEY,HONE,HONES,HONEY,HONK,HONKS,HOOD,HOODS,HOOF,HOOK,HOOKS,HOOP,HOOPS,HOOT,HOOTS,HOP,HOPE,HOPES,HOPS,HORN,HORNS,HORNY,HORSE,HOSE,HOSES,HOST,HOSTS,HOT,HOTEL,HOTLY,HOUND,HOUR,HOURS,HOUSE,HOVEL,HOVER,HOW,HOWDY,HOWL,HOWLS,HUB,HUBBY,HUFF,HUFFY,HUG,HUGE,HUGS,HULA,HULK,HULL,HUM,HUMAN,HUMID,HUMP,HUMPS,HUMS,HUNCH,HUNG,HUNGRY,HUNK,HUNKS,HUNT,HUNTS,HURL,HURRY,HURT,HURTS,HUSH,HUSK,HUSKY,HUT,HUTS,HYDRA,HYMEN,HYMNS,HYPE,HYPER,HYPO,ICED,ICES,ICON,ICONS,IDLE,IDLER,IDLY,IDOL,IDOLS,IGLOO,ILL,IMAGE,IMBUE,IMP,IMPEL,IMPLY,INANE,INAPT,INBOX,INCH,INDEX,INEPT,INERT,INFER,INFRA,INGOT,INK,INKS,INKY,INLAY,INLET,INNER,INPUT,INSET,INTER,INTO,INTRO,ION,IONS,IRATE,IRE,IRIS,IRK,IRKS,IRON,IRONS,IRONY,ISLE,ISLES,ISLET,ISSUE,ITCH,ITCHY,ITEM,ITEMS,IVORY,IVY,JAB,JACK,JACKS,JADED,JADES,JAG,JAIL,JAILS,JAM,JAMB,JAMS,JAR,JARGON,JARS,JAUNT,JAW,JAWS,JAY,JAZZ,JAZZY,JEAN,JEANS,JEEP,JEEPS,JEER,JEERS,JELLY,JENNY,JERK,JERKS,JERKY,JEST,JESTS,JET,JETS,JETTY,JEWEL,JIB,JIBE,JIFFY,JIG,JILT,JINK,JINX,JIVE,JOB,JOBS,JOCK,JOCKY,JOG,JOGS,JOHN,JOIN,JOINS,JOINT,JOKE,JOKER,JOKES,JOLLY,JOLT,JOLTS,JOSH,JOSTLE,JOT,JOULE,JOURN,JOUST,JOWL,JOWLS,JOY,JOYS,JUDGE,JUDO,JUG,JUGS,JUICE,JUICY,JUKE,JULEP,JUMBO,JUMP,JUMPS,JUMPY,JUNK,JUNKS,JUNKY,JUNTA,JURY,JUST,JUTE,KALE,KARAT,KARMA,KAYAK,KEBAB,KEEL,KEEN,KEEP,KEEPS,KEG,KEGS,KELP,KEN,KENNEL,KEPT,KERB,KERNEL,KETTLE,KEY,KEYED,KEYS,KHAKI,KICK,KICKS,KID,KIDNY,KIDS,KILL,KILLS,KILN,KILO,KILT,KIN,KIND,KINDS,KING,KINGS,KINK,KINKS,KINKY,KIOSK,KISS,KIT,KITE,KITES,KITH,KITS,KITTY,KIWI,KNACK,KNAVE,KNEAD,KNEE,KNEEL,KNEES,KNELL,KNELT,KNEW,KNICK,KNIFE,KNIT,KNITS,KNOB,KNOBS,KNOCK,KNOLL,KNOT,KNOTS,KNOW,KNOWN,KNOWS,KNUCK,KOALA,KOOK,KOSHER,KRAUT,KRILL,KUDOS,LABEL,LABOR,LABS,LACE,LACES,LACK,LACKS,LACY,LAD,LADDER,LADE,LADEN,LADLE,LADS,LADY,LAG,LAGER,LAGS,LAID,LAIR,LAIRS,LAKE,LAKES,LAM,LAMB,LAMBS,LAME,LAMP,LAMPS,LANCE,LAND,LANDS,LANE,LANES,LANK,LANKY,LAP,LAPEL,LAPSE,LARD,LARGE,LARK,LARKS,LARVA,LASER,LASH,LASS,LASSO,LAST,LASTS,LATCH,LATE,LATER,LATEX,LATHE,LATHER,LATIN,LAUD,LAUGH,LAUNCE,LAVA,LAW,LAWN,LAWNS,LAWS,LAX,LAY,LAYER,LAYERS,LAYS,LAZE,LAZY,LEACH,LEAD,LEADS,LEAF,LEAFY,LEAK,LEAKS,LEAKY,LEAN,LEANS,LEAP,LEAPS,LEAPT,LEARN,LEASE,LEASH,LEAST,LEAVE,LED,LEDGE,LEE,LEECH,LEEK,LEER,LEERS,LEERY,LEES,LEFT,LEFTY,LEG,LEGAL,LEGGY,LEND,LENDS,LENGTH,LENS,LENT,LEPER,LESS,LEST,LET,LETHAL,LETS,LEVEE,LEVEL,LEVER,LEWD,LIAR,LIARS,LIBEL,LICE,LICK,LICKS,LID,LIDS,LIE,LIED,LIEN,LIENS,LIES,LIEU,LIFE,LIFT,LIFTS,LIGHT,LIKE,LIKED,LIKEN,LIKES,LILAC,LIMB,LIMBS,LIME,LIMES,LIMIT,LIMP,LIMPS,LINE,LINEN,LINER,LINES,LINGO,LINK,LINKS,LINT,LION,LIONS,LIP,LIPS,LIQUID,LISP,LIST,LISTS,LIT,LITE,LITER,LITHE,LIVE,LIVED,LIVEN,LIVER,LIVES,LIVID,LIZARD,LLAMA,LOAD,LOADS,LOAF,LOAM,LOAMY,LOAN,LOANS,LOATH,LOB,LOBBY,LOBE,LOBES,LOCAL,LOCATE,LOCK,LOCKS,LOCUS,LODE,LODGE,LOFT,LOFTS,LOFTY,LOG,LOGIC,LOGO,LOGS,LOIN,LOINS,LONE,LONER,LONG,LOOK,LOOKS,LOOM,LOOMS,LOON,LOONY,LOOP,LOOPS,LOOPY,LOOSE,LOOT,LOP,LOPE,LORD,LORDS,LORE,LORRY,LOSE,LOSER,LOSERS,LOSES,LOSS,LOST,LOT,LOTION,LOTS,LOTUS,LOUD,LOUNGE,LOUSE,LOUSY,LOUT,LOVE,LOVED,LOVER,LOVES,LOW,LOWER,LOWLY,LOWS,LOYAL,LUCK,LUCKY,LULL,LULLS,LUMP,LUMPS,LUMPY,LUNACY,LUNAR,LUNCH,LUNG,LUNGE,LUNGS,LURCH,LURE,LURES,LURID,LURK,LURKS,LUSH,LUST,LUSTS,LUSTY,LUTE,LUXURY,LYING,LYMPH,LYNCH,LYRE,LYRIC,MACE,MACH,MACHO,MACRO,MAD,MADAM,MADE,MAFIA,MAG,MAGE,MAGIC,MAGMA,MAGNET,MAGNUM,MAID,MAIDS,MAIL,MAILS,MAIM,MAIMS,MAIN,MAINS,MAIZE,MAJOR,MAKE,MAKER,MAKES,MALE,MALES,MALL,MALLS,MALT,MAMA,MAMBA,MAMMY,MAN,MANE,MANES,MANGA,MANGE,MANGO,MANGY,MANIA,MANIC,MANLY,MANOR,MANSE,MANY,MAP,MAPLE,MAPS,MAR,MARCH,MARE,MARES,MARGIN,MARINE,MARK,MARKET,MARKS,MARRY,MARS,MARSH,MART,MARTS,MASH,MASK,MASKS,MASON,MASS,MAST,MASTS,MAT,MATCH,MATE,MATES,MATH,MATHS,MATS,MATTE,MATURE,MAUL,MAX,MAXIM,MAY,MAYBE,MAYOR,MAZE,MAZES,MEAD,MEAL,MEALS,MEAN,MEANS,MEANT,MEAT,MEATS,MEATY,MECCA,MEDAL,MEDIA,MEDIC,MEET,MEETS,MEGA,MELD,MELEE,MELON,MELT,MELTS,MEME,MEMES,MEMO,MEN,MEND,MENDS,MENU,MENUS,MEOW,MERCY,MERGE,MERIT,MERRY,MESH,MESS,MESSY,MET,METAL,METER,METRO,MEWL,MICA,MICE,MICRO,MID,MIDST,MIEN,MIFF,MIGHT,MIKE,MILE,MILES,MILK,MILKS,MILKY,MILL,MILLS,MIMIC,MINCE,MIND,MINDS,MINE,MINER,MINES,MINI,MINIM,MINOR,MINT,MINTS,MINTY,MINUS,MINUTE,MIRTH,MISER,MISS,MIST,MISTS,MISTY,MITE,MITES,MITT,MITTS,MIX,MIXED,MIXER,MIXES,MOAN,MOANS,MOAT,MOB,MOBS,MOCHA,MOCK,MOCKS,MOD,MODE,MODEL,MODEM,MODES,MODS,MODULE,MOIST,MOLAR,MOLD,MOLDS,MOLDY,MOLE,MOLES,MOLT,MOM,MOMMY,MOMS,MONEY,MONK,MONKS,MONTH,MOOCH,MOOD,MOODS,MOODY,MOON,MOONS,MOOR,MOORS,MOOSE,MOP,MOPE,MOPS,MORAL,MORE,MORES,MORN,MORON,MORPH,MOSS,MOSSY,MOST,MOTEL,MOTH,MOTHER,MOTHS,MOTIF,MOTOR,MOTTO,MOUND,MOUNT,MOURN,MOUSE,MOUSY,MOUTH,MOVE,MOVER,MOVES,MOVIE,MOW,MOWER,MOWN,MUCH,MUCK,MUCKY,MUCUS,MUD,MUDDY,MUFF,MUFFIN,MUG,MUGS,MULCH,MULE,MULES,MULL,MULTI,MUM,MUMMY,MUMPS,MUMS,MUNCH,MURAL,MURK,MURKY,MUSE,MUSH,MUSHY,MUSIC,MUSK,MUSKY,MUST,MUSTY,MUTT,MUTTS,MYTH,MYTHS,NACHO,NAG,NAGS,NAIL,NAILS,NAIVE,NAKED,NAME,NAMED,NAMES,NANNY,NAP,NAPE,NAPS,NARC,NARK,NARROW,NASA,NASTY,NATAL,NATCH,NATION,NATIVE,NATURE,NAVAL,NAVEL,NAVY,NAZI,NEAR,NEARS,NEAT,NECK,NECKS,NECTAR,NEED,NEEDS,NEEDY,NEGRO,NEIGH,NEON,NERD,NERDS,NERVE,NERVY,NEST,NESTS,NET,NETS,NEVER,NEW,NEWER,NEWLY,NEWS,NEWT,NEXT,NIB,NIBBLE,NICE,NICER,NICHE,NICK,NICKS,NIECE,NIGHT,NIL,NIMBLE,NINJA,NINNY,NIP,NIPPLE,NIPS,NOBLE,NOBLY,NOD,NODE,NODES,NODS,NOEL,NOISE,NOISY,NOMAD,NON,NONE,NOOK,NOOKS,NOON,NOOSE,NOR,NORM,NORMS,NORTH,NOSE,NOSEY,NOSH,NOSY,NOT,NOTCH,NOTE,NOTED,NOTES,NOUN,NOUNS,NOVA,NOVEL,NOW,NUANCE,NUB,NUBBY,NUDE,NUDES,NUDGE,NUDIST,NUGGET,NULL,NUMB,NUMBS,NUN,NUNS,NURSE,NUT,NUTTY,NYLON,NYMPH,OAF,OAFS,OAK,OAKS,OAR,OARS,OASIS,OAT,OATH,OATHS,OATS,OBESE,OBEY,OBEYS,OBJECT,OBOE,OCCUR,OCEAN,OCHRE,OCTAL,OCTET,ODD,ODDLY,ODDS,ODE,ODES,ODOR,ODORS,OFF,OFFAL,OFFER,OFTEN,OGLE,OGRE,OGRES,OHM,OIL,OILED,OILS,OILY,OINT,OKAY,OKRA,OLD,OLDER,OLDIE,OLIVE,OMEGA,OMEN,OMENS,OMIT,OMITS,ONCE,ONE,ONES,ONION,ONLY,ONSET,ONTO,ONYX,OOZE,OOZES,OPAL,OPEN,OPENS,OPERA,OPIUM,OPT,OPTIC,OPTS,ORAL,ORBIT,ORCA,ORDER,ORE,ORES,ORGAN,ORGY,OTHER,OTTER,OUCH,OUGHT,OUNCE,OUR,OURS,OUST,OUT,OUTDO,OUTER,OUTGO,OUTPUT,OUTS,OVARY,OVEN,OVENS,OVER,OVERT,OWE,OWED,OWES,OWL,OWLS,OWN,OWNED,OWNER,OWNS,OXEN,OXIDE,OZONE,PACE,PACED,PACES,PACK,PACKS,PACT,PACTS,PAD,PADDY,PADS,PAGE,PAGED,PAGES,PAID,PAIL,PAILS,PAIN,PAINS,PAINT,PAIR,PAIRS,PAL,PALE,PALER,PALL,PALM,PALMS,PALS,PAN,PANEL,PANG,PANIC,PANS,PANSY,PANT,PANTS,PAPA,PAPAL,PAPER,PAR,PARA,PARK,PARKS,PARRY,PARS,PART,PARTS,PARTY,PASS,PAST,PASTA,PASTE,PASTY,PAT,PATCH,PATE,PATH,PATHS,PATIO,PATS,PATSY,PATTY,PAUSE,PAVE,PAVED,PAW,PAWN,PAWNS,PAWS,PAY,PAYEE,PAYER,PAYS,PEA,PEACE,PEACH,PEAK,PEAKS,PEAL,PEALS,PEANUT,PEAR,PEARL,PEARS,PEAS,PEAT,PEBBLE,PECAN,PECK,PECKS,PEDAL,PEE,PEEK,PEEKS,PEEL,PEELS,PEEP,PEEPS,PEER,PEERS,PEES,PEG,PEGS,PELT,PELTS,PEN,PENAL,PENCE,PENCIL,PENIS,PENNY,PENS,PEON,PEONS,PEONY,PEOPLE,PEP,PEPPER,PEPPY,PERCH,PERIL,PERK,PERKS,PERKY,PERM,PEST,PESTS,PET,PETAL,PETIT,PETS,PETTY,PEW,PHASE,PHONE,PHONY,PHOTO,PIANO,PICK,PICKS,PIE,PIECE,PIER,PIERS,PIES,PIG,PIGGY,PIGS,PIKE,PIKES,PILE,PILED,PILES,PILL,PILLS,PILOT,PIMP,PIMPS,PIN,PINCH,PINE,PINES,PING,PINK,PINKS,PINS,PINT,PINTO,PINTS,PINUP,PIOUS,PIPE,PIPED,PIPER,PIPES,PIQUE,PISS,PIT,PITCH,PITH,PITHY,PITS,PITY,PIVOT,PIXEL,PIXIE,PIZZA,PLACE,PLAID,PLAIN,PLAIT,PLAN,PLANE,PLANK,PLANS,PLANT,PLATE,PLAY,PLAYS,PLAZA,PLEA,PLEAD,PLEAS,PLEAT,PLED,PLOT,PLOTS,PLOW,PLOWS,PLUCK,PLUG,PLUGS,PLUM,PLUMB,PLUME,PLUMP,PLUMS,PLUNK,PLUSH,PLY,POACH,POCK,POD,PODS,POEM,POEMS,POET,POETS,POINT,POISE,POKE,POKED,POKER,POKES,POKEY,POLAR,POLE,POLES,POLKA,POLL,POLLS,POND,PONDS,PONE,PONY,POOCH,POOL,POOLS,POOP,POOPS,POOR,POP,POPE,POPPY,POPS,PORCH,PORE,PORES,PORK,PORKY,PORN,PORNO,PORT,PORTS,POSE,POSED,POSER,POSES,POSH,POSIT,POSSE,POST,POSTS,POSY,POT,POTATO,POTS,POTTY,POUCH,POUND,POUR,POURS,POUT,POUTS,POWER,POX,PRAM,PRANK,PRAWN,PRAY,PRAYS,PREEN,PREP,PRESS,PREY,PRICE,PRICK,PRIDE,PRIED,PRIES,PRIG,PRIM,PRIME,PRINT,PRIOR,PRISM,PRIVY,PRIZE,PRO,PROBE,PROM,PROMS,PRONE,PRONG,PROOF,PROP,PROPS,PROS,PROSE,PROUD,PROVE,PROWL,PROXY,PRUDE,PRUNE,PRY,PSALM,PSYCH,PUB,PUBIC,PUBLIC,PUBS,PUCE,PUCK,PUFF,PUFFS,PUFFY,PUKE,PUKES,PULL,PULLS,PULP,PULPY,PULSE,PUMA,PUMAS,PUMP,PUMPS,PUN,PUNCH,PUNK,PUNKS,PUNS,PUNT,PUNTS,PUNY,PUP,PUPA,PUPIL,PUPPY,PUPS,PURE,PURGE,PURR,PURRS,PURSE,PUSH,PUSHY,PUSS,PUSSY,PUT,PUTS,PUTT,PUTTS,PUTTY,PYGMY,PYLON,PYRE,QUACK,QUAD,QUAIL,QUAKE,QUALM,QUART,QUASH,QUASI,QUEEN,QUEER,QUELL,QUERY,QUEST,QUEUE,QUICK,QUIET,QUILL,QUILT,QUIP,QUIPS,QUIRK,QUIT,QUITS,QUOTA,QUOTE,RABBI,RABID,RACE,RACER,RACES,RACK,RACKS,RAD,RADAR,RADIO,RADON,RAFT,RAFTS,RAG,RAGE,RAGES,RAGS,RAID,RAIDS,RAIL,RAILS,RAIN,RAINS,RAINY,RAISE,RAKE,RAKES,RALLY,RAM,RAMP,RAMPS,RAMS,RANCH,RANDY,RANGE,RANK,RANKS,RANT,RANTS,RAP,RAPE,RAPED,RAPES,RAPID,RAPS,RAPT,RARE,RASH,RASP,RASPS,RASPY,RAT,RATE,RATED,RATES,RATIO,RATS,RATTY,RAVE,RAVEL,RAVEN,RAVES,RAW,RAY,RAYON,RAYS,RAZE,RAZOR,REACH,REACT,READ,READS,READY,REAL,REALM,REAMS,REAP,REAPS,REAR,REARS,REBEL,REBUS,REBUT,RECAP,RECON,REDO,REED,REEDS,REEDY,REEF,REEFS,REEK,REEKS,REEL,REELS,REFER,REFIT,REGAL,REHAB,REIGN,REIN,REINS,REJIG,RELAX,RELAY,RELIC,RELY,REMIT,REND,RENEW,RENT,RENTS,REPAY,REPEL,REPLY,RESET,RESIN,REST,RESTS,RETCH,RETRO,RETRY,REUSE,REVEL,REVUE,RHEUM,RHINO,RHYME,RIB,RIBBD,RIBS,RICE,RICH,RICK,RID,RIDE,RIDER,RIDES,RIDGE,RIFE,RIFLE,RIFT,RIFTS,RIG,RIGHT,RIGID,RIGOR,RIGS,RILE,RILES,RIM,RIMS,RIND,RING,RINGS,RINK,RINKS,RINSE,RIOT,RIOTS,RIP,RIPE,RIPEN,RIPS,RISE,RISEN,RISER,RISES,RISK,RISKS,RISKY,RITE,RITES,RITZY,RIVAL,RIVER,RIVET,ROACH,ROAD,ROADS,ROAM,ROAMS,ROAR,ROARS,ROAST,ROB,ROBE,ROBES,ROBIN,ROBOT,ROBS,ROCK,ROCKS,ROCKY,ROD,RODE,RODEO,RODS,ROGUE,ROLE,ROLES,ROLL,ROLLS,ROMAN,ROMP,ROOF,ROOFS,ROOK,ROOM,ROOMS,ROOMY,ROOST,ROOT,ROOTS,ROPE,ROPES,ROSE,ROSES,ROSY,ROT,ROTOR,ROTS,ROUGE,ROUGH,ROUND,ROUSE,ROUT,ROUTE,ROVE,ROVER,ROVES,ROW,ROWDY,ROWER,ROWS,ROYAL,RUB,RUBLE,RUBS,RUBY,RUDDY,RUDE,RUE,RUFF,RUG,RUGBY,RUGS,RUIN,RUINS,RULE,RULED,RULER,RULES,RUM,RUMBA,RUMMY,RUMP,RUMPS,RUN,RUNE,RUNES,RUNG,RUNNY,RUNS,RUNT,RUNTS,RURAL,RUSE,RUSH,RUST,RUSTY,RUT,RUTS,SACK,SACKS,SAD,SADDY,SADLY,SAFARI,SAFE,SAFES,SAGA,SAGAS,SAGE,SAGES,SAID,SAIL,SAILS,SAINT,SAKE,SALAD,SALE,SALES,SALLY,SALON,SALSA,SALT,SALTS,SALTY,SALVE,SAME,SAND,SANDS,SANDY,SANE,SANG,SANK,SAP,SAPPY,SAPS,SASH,SAT,SATAN,SATIN,SATYR,SAUCE,SAUCY,SAUNA,SAVE,SAVED,SAVER,SAVES,SAVVY,SAW,SAWS,SAX,SAY,SAYS,SCAB,SCABS,SCALD,SCALE,SCALP,SCAM,SCAMP,SCAMS,SCAN,SCANS,SCANT,SCAR,SCARE,SCARF,SCARS,SCARY,SCAT,SCENE,SCENT,SCEPT,SCHWA,SCION,SCOFF,SCOLD,SCOOP,SCOOT,SCOPE,SCORCH,SCORE,SCORN,SCOUR,SCOUT,SCOWL,SCRAM,SCRAP,SCREW,SCRIP,SCROLL,SCRUB,SCUBA,SCUD,SCUFF,SCULL,SCUM,SCURF,SEA,SEAL,SEALS,SEAM,SEAMS,SEAMY,SEAR,SEARS,SEAS,SEASON,SEAT,SEATS,SECT,SECTS,SEDAN,SEDGE,SEE,SEED,SEEDS,SEEDY,SEEK,SEEKS,SEEM,SEEMS,SEEN,SEEP,SEEPS,SEER,SEERS,SEES,SEIZE,SELF,SELL,SELLS,SEMEN,SEMI,SEMIS,SEND,SENDS,SENSE,SENT,SENTRY,SEPIA,SEPT,SERF,SERFS,SERGE,SERIF,SERUM,SERVE,SERVO,SET,SETS,SETUP,SEVEN,SEVER,SEW,SEWER,SEWN,SEWS,SEX,SEXED,SEXES,SEXY,SHACK,SHADE,SHADY,SHAFT,SHAG,SHAKE,SHAKY,SHALE,SHALL,SHAM,SHAME,SHAMS,SHANK,SHAPE,SHARD,SHARE,SHARK,SHARP,SHAVE,SHAWL,SHE,SHEAF,SHEAR,SHED,SHEDS,SHEEN,SHEEP,SHEER,SHEET,SHELF,SHELL,SHIED,SHIFT,SHILL,SHIN,SHINE,SHINS,SHINY,SHIP,SHIPS,SHIRT,SHOAL,SHOCK,SHOD,SHOE,SHOES,SHONE,SHOOK,SHOOT,SHOP,SHOPS,SHORE,SHORN,SHORT,SHOT,SHOTS,SHOUT,SHOVE,SHOW,SHOWN,SHOWS,SHOWY,SHRED,SHREW,SHRUB,SHRUG,SHUCK,SHUN,SHUNS,SHUNT,SHUSH,SHUT,SHUTS,SHY,SHYLY,SICK,SIDE,SIDED,SIDES,SIEGE,SIFT,SIFTS,SIGH,SIGHS,SIGHT,SIGMA,SIGN,SIGNS,SILK,SILKS,SILKY,SILL,SILLY,SILT,SILTY,SIN,SINCE,SINE,SINEW,SING,SINGE,SINGS,SINK,SINKS,SINS,SINUS,SIP,SIPHONE,SIPS,SIR,SIREN,SIRS,SISSY,SISTER,SIT,SITE,SITES,SITS,SIX,SIXES,SIXTH,SIXTY,SIZE,SIZED,SIZES,SKATE,SKEET,SKEIN,SKEW,SKI,SKID,SKIDS,SKIER,SKIES,SKIFF,SKILL,SKIM,SKIMP,SKIN,SKINS,SKIP,SKIPS,SKIRT,SKIS,SKIT,SKITS,SKULK,SKULL,SKUNK,SKY,SLAB,SLABS,SLACK,SLAG,SLAIN,SLAM,SLAMS,SLANG,SLANT,SLAP,SLAPS,SLASH,SLATE,SLATS,SLAVE,SLAY,SLAYS,SLED,SLEDS,SLEEK,SLEEP,SLEET,SLEPT,SLEW,SLICE,SLICK,SLID,SLIDE,SLIM,SLIME,SLIMY,SLING,SLINK,SLIP,SLIPS,SLIT,SLITS,SLOB,SLOBS,SLOG,SLOGS,SLOP,SLOPE,SLOPS,SLOSH,SLOTH,SLOT,SLOTS,SLOW,SLOWS,SLUG,SLUGS,SLUM,SLUMP,SLUMS,SLUNG,SLUNK,SLUR,SLURP,SLURS,SLUSH,SLUT,SLUTS,SLY,SLYLY,SMACK,SMALL,SMART,SMASH,SMEAR,SMELL,SMELT,SMILE,SMIRK,SMITE,SMITH,SMOCK,SMOG,SMOKE,SMOKY,SMOTE,SMUG,SNACK,SNAG,SNAGS,SNAIL,SNAKE,SNAP,SNAPS,SNARE,SNARL,SNEAK,SNEER,SNIDE,SNIFF,SNIP,SNIPE,SNIPS,SNOB,SNOBS,SNOOP,SNORE,SNORT,SNOT,SNOUT,SNOW,SNOWS,SNOWY,SNUB,SNUBS,SNUFF,SNUG,SOAK,SOAKS,SOAP,SOAPS,SOAPY,SOAR,SOARS,SOB,SOBER,SOBS,SOCCER,SOCK,SOCKET,SOCKS,SODA,SODAS,SODDY,SODS,SOFA,SOFAS,SOFT,SOGGY,SOIL,SOILS,SOLAR,SOLD,SOLE,SOLES,SOLID,SOLO,SOLOS,SOLVE,SOME,SON,SONAR,SONG,SONGS,SONIC,SONNY,SONS,SOON,SOOT,SOOTH,SOOTY,SOP,SORRY,SORT,SORTS,SOS,SOT,SOUL,SOULS,SOUND,SOUP,SOUPS,SOUR,SOURS,SOUTH,SOW,SOWN,SOWS,SOY,SPACE,SPADE,SPAM,SPAN,SPANK,SPANS,SPAR,SPARE,SPARK,SPARS,SPASM,SPAT,SPATS,SPAWN,SPAY,SPEAK,SPEAR,SPECK,SPEED,SPELL,SPELT,SPEND,SPENT,SPERM,SPEW,SPEWS,SPICE,SPICY,SPIED,SPIEL,SPIES,SPIKE,SPIKY,SPILL,SPILT,SPIN,SPINE,SPINS,SPINY,SPIRE,SPIT,SPITE,SPITS,SPLAT,SPLAY,SPLIT,SPOIL,SPOKE,SPOOF,SPOOL,SPOON,SPOOR,SPORT,SPOT,SPOTS,SPOUT,SPRAY,SPREE,SPRIG,SPUD,SPUDS,SPUME,SPUN,SPUNK,SPUR,SPURN,SPURS,SPURT,SPY,SQUAD,SQUAT,SQUAW,SQUIB,SQUID,STAB,STABS,STACK,STAFF,STAGE,STAG,STAGS,STAID,STAIN,STAIR,STAKE,STALE,STALK,STALL,STAMP,STAND,STANK,STAR,STARE,STARK,STARS,START,STASH,STATE,STAY,STAYS,STEAD,STEAK,STEAL,STEAM,STEED,STEEL,STEEP,STEER,STEM,STEMS,STEP,STEPS,STERN,STEW,STEWS,STICK,STIFF,STILE,STILL,STILT,STING,STINK,STINT,STIR,STIRS,STOCK,STOGY,STOKE,STOLE,STOMP,STONE,STONY,STOOD,STOOL,STOOP,STOP,STOPS,STORE,STORK,STORM,STORY,STOUT,STOVE,STOW,STRAP,STRAW,STRAY,STREAK,STREAM,STREET,STRESS,STREWN,STRICT,STRIDE,STRIFE,STRIKE,STRING,STRIP,STRIPE,STRIVE,STROKE,STROLL,STRONG,STRUCK,STRUM,STRUT,STUB,STUBS,STUCK,STUD,STUDY,STUFF,STUMP,STUN,STUNG,STUNS,STUNT,STYLE,SUAVE,SUB,SUBS,SUCH,SUCK,SUCKS,SUDS,SUEDE,SUET,SUGAR,SUIT,SUITE,SUITS,SULK,SULKY,SULLY,SUM,SUMAC,SUMS,SUN,SUNG,SUNK,SUNNY,SUNS,SUPER,SURER,SURF,SURFS,SURGE,SURLY,SUSHI,SWAB,SWABS,SWAG,SWAM,SWAMP,SWAN,SWANK,SWANS,SWAP,SWAPS,SWARM,SWAT,SWATS,SWAY,SWAYS,SWEAR,SWEAT,SWEEP,SWEET,SWELL,SWEPT,SWIFT,SWIG,SWIGS,SWIM,SWIMS,SWINE,SWING,SWIPE,SWIRL,SWISH,SWISS,SWOON,SWOOP,SWORD,SWORE,SWORN,SWUM,SWUNG,SYNC,SYNCH,SYRUP,TABLE,TABOO,TABS,TACIT,TACK,TACKY,TACO,TACOS,TACT,TAD,TAG,TAGS,TAIL,TAILS,TAINT,TAKE,TAKEN,TAKER,TAKES,TALE,TALES,TALK,TALKS,TALL,TALLY,TALON,TAME,TAMED,TAMER,TAMES,TAN,TANG,TANGO,TANGY,TANK,TANKS,TANS,TAP,TAPE,TAPED,TAPER,TAPES,TAPIR,TAPS,TAR,TARDY,TARES,TARGET,TARN,TAROT,TARP,TARRY,TARS,TART,TARTS,TASK,TASKS,TASTE,TASTY,TAT,TATTY,TAUNT,TAUT,TAVERN,TAX,TAXES,TAXI,TAXIS,TEA,TEACH,TEAK,TEAM,TEAMS,TEAR,TEARS,TEARY,TEASE,TEAS,TEAT,TEATS,TECH,TECHS,TEDDY,TEE,TEEM,TEEMS,TEEN,TEENS,TEENY,TEES,TEETH,TELL,TELLS,TEMPO,TEMPT,TEN,TEND,TENDS,TENET,TENOR,TENSE,TENT,TENTH,TENTS,TEPEE,TEPID,TERM,TERMS,TERN,TERRA,TERSE,TEST,TESTS,TESTY,TETHER,TEXT,TEXTS,THAN,THANK,THAT,THAW,THAWS,THE,THEE,THEFT,THEIR,THEM,THEME,THEN,THERE,THESE,THETA,THEY,THICK,THIEF,THIGH,THIN,THING,THINK,THINS,THIRD,THONG,THORN,THOSE,THOU,THREE,THREW,THROB,THROE,THROW,THRUM,THUD,THUDS,THUG,THUGS,THUMB,THUMP,THUS,THY,THYME,TIARA,TICK,TICKS,TIDAL,TIDE,TIDES,TIDY,TIE,TIED,TIER,TIERS,TIES,TIFF,TIGER,TIGHT,TIKE,TIKES,TILE,TILED,TILES,TILL,TILLS,TILT,TILTS,TIMBER,TIME,TIMED,TIMER,TIMES,TIMID,TIN,TINGE,TINK,TINNY,TINS,TINT,TINTS,TINY,TIP,TIPS,TIPSY,TIRE,TIRED,TIRES,TIT,TITAN,TITHE,TITLE,TITRE,TITS,TOAD,TOADS,TOAST,TODAY,TODDY,TOE,TOES,TOFU,TOGA,TOGAS,TOGS,TOIL,TOILS,TOKEN,TOLD,TOLL,TOLLS,TOMB,TOMBS,TOMMY,TON,TONAL,TONE,TONED,TONER,TONES,TONGS,TONIC,TONS,TOOL,TOOLS,TOOT,TOOTH,TOOTS,TOP,TOPAZ,TOPIC,TOPS,TORCH,TORSO,TORT,TORTS,TOSS,TOT,TOTAL,TOTE,TOTEM,TOTES,TOTS,TOUCH,TOUGH,TOUR,TOURS,TOW,TOWED,TOWEL,TOWER,TOWN,TOWNS,TOWS,TOXIC,TOXIN,TOY,TOYS,TRACE,TRACK,TRACT,TRADE,TRAIL,TRAIN,TRAIT,TRAM,TRAMP,TRAMS,TRAP,TRAPS,TRASH,TRAY,TRAYS,TREAD,TREAT,TREE,TREED,TREES,TREK,TREKS,TREND,TRESS,TRIAL,TRIBE,TRICE,TRICK,TRIED,TRIES,TRIM,TRIMS,TRIO,TRIOS,TRIP,TRIPE,TRIPS,TRITE,TROLL,TROOP,TROT,TROTS,TROUT,TRUCE,TRUCK,TRUE,TRUER,TRULY,TRUMP,TRUNK,TRUSS,TRUST,TRUTH,TRY,TRYST,TUB,TUBA,TUBAS,TUBE,TUBER,TUBES,TUBS,TUCK,TUCKS,TUFT,TUFTS,TUG,TUGS,TULIP,TUMMY,TUMOR,TUNA,TUNAS,TUNE,TUNED,TUNER,TUNES,TUNIC,TUNNY,TURBO,TURD,TURDS,TURF,TURFS,TURK,TURKS,TURN,TURNS,TURPS,TUSK,TUSKS,TUTOR,TUTU,TUX,TWAIN,TWEED,TWEET,TWEEZ,TWELF,TWIG,TWIGS,TWIN,TWINE,TWINS,TWIRL,TWIST,TWO,TWOS,TYCOON,TYKE,TYKES,TYPE,TYPES,TYPO,TYPOS,TYRANT,UDDER,UGLY,ULCER,ULTRA,UMBRA,UNAPT,UNCLE,UNCUT,UNDER,UNDID,UNDUE,UNFED,UNFIT,UNIFY,UNION,UNIT,UNITE,UNITS,UNITY,UNLIT,UNMET,UNTIE,UNTIL,UNWED,UNZIP,UPEND,UPON,UPPER,UPSET,URBAN,URGE,URGED,URGENT,URGES,URINE,URN,URNS,USAGE,USE,USED,USER,USERS,USES,USHER,USUAL,USURP,UTTER,UVULA,VACUA,VAGUE,VAIN,VALET,VALID,VALOR,VALUE,VALVE,VAMP,VAMPS,VAN,VANE,VANES,VANS,VAPID,VAPOR,VASE,VASES,VAST,VAT,VATS,VAULT,VEAL,VEER,VEERS,VEGAN,VEIL,VEILS,VEIN,VEINS,VELAR,VENAL,VEND,VENDS,VENOM,VENT,VENTS,VENUE,VENUS,VERB,VERBS,VERGE,VERSE,VERSO,VERVE,VERY,VEST,VESTS,VET,VETCH,VETS,VEX,VEXED,VEXES,VIAL,VIALS,VIBE,VIBES,VICE,VICES,VIDEO,VIEW,VIEWS,VIGIL,VILE,VILLA,VINE,VINES,VINYL,VIPER,VIRAL,VIRUS,VISA,VISAS,VISOR,VISTA,VISUAL,VITAL,VIVID,VIXEN,VLEI,VOCAL,VODKA,VOGUE,VOICE,VOID,VOIDS,VOLT,VOLTS,VOLUME,VOMIT,VOTE,VOTER,VOTES,VOUCH,VOW,VOWED,VOWEL,VOWS,VULGAR,WACKY,WAD,WADE,WADES,WADS,WAFER,WAG,WAGE,WAGER,WAGES,WAGON,WAGS,WAIF,WAIFS,WAIL,WAILS,WAIST,WAIT,WAITER,WAITS,WAKE,WAKEN,WAKES,WALK,WALKER,WALKS,WALL,WALLS,WALTZ,WAND,WANDS,WANE,WANES,WANT,WANTS,WAR,WARD,WARDS,WARE,WARES,WARM,WARMS,WARN,WARNS,WARP,WARPS,WARS,WART,WARTS,WARTY,WARY,WASH,WASP,WASPS,WASTE,WATCH,WATER,WATT,WATTS,WAVE,WAVER,WAVES,WAVY,WAX,WAXED,WAXEN,WAXES,WAXY,WAY,WAYS,WEAK,WEAN,WEANS,WEAPON,WEAR,WEARS,WEARY,WEAVE,WEB,WEBS,WED,WEDGE,WEDS,WEED,WEEDS,WEEDY,WEEK,WEEKS,WEEP,WEEPS,WEEPY,WEIGH,WEIRD,WELD,WELDS,WELL,WELLS,WELSH,WELT,WELTS,WENCH,WENT,WEPT,WERE,WEST,WET,WETS,WHACK,WHALE,WHARF,WHAT,WHEAT,WHEEL,WHEEZE,WHELM,WHELP,WHEN,WHERE,WHET,WHETS,WHICH,WHIFF,WHIG,WHIGS,WHIM,WHIMS,WHINE,WHIP,WHIPS,WHIR,WHIRL,WHIRS,WHISK,WHITE,WHIZZ,WHO,WHOA,WHOLE,WHOM,WHOOP,WHORE,WHOSE,WHY,WICK,WICKS,WIDEN,WIDER,WIDOW,WIDTH,WIELD,WIFE,WIG,WIGS,WILD,WILE,WILES,WILL,WILLS,WILT,WILTS,WILY,WIMP,WIMPS,WIMPY,WIN,WINCH,WIND,WINDS,WINDY,WINE,WINES,WING,WINGS,WINK,WINKS,WINO,WINS,WIPE,WIPES,WIRE,WIRED,WIRES,WISE,WISER,WISH,WISP,WISPS,WISPY,WIT,WITCH,WITH,WITHE,WITS,WITTY,WIVES,WOE,WOES,WOKE,WOKEN,WOLF,WOMAN,WOMB,WOMBS,WOMEN,WON,WONDER,WONT,WOOD,WOODS,WOODY,WOOF,WOOFS,WOOL,WOOLS,WOOLY,WORD,WORDS,WORDY,WORK,WORKS,WORLD,WORM,WORMS,WORMY,WORN,WORRY,WORSE,WORST,WORT,WORTH,WOULD,WOUND,WOVE,WOVEN,WOW,WOWS,WRACK,WRAP,WRAPS,WRATH,WREAK,WRECK,WREN,WRENS,WREST,WRING,WRIST,WRIT,WRITE,WRITS,WRONG,WROTE,WRUNG,WRY,WRYLY,XENON,XEROX,XMAS,XRAY,XRAYS,YACHT,YAK,YAKS,YAM,YAMS,YANK,YANKS,YAP,YAPS,YARD,YARDS,YARN,YARNS,YAWL,YAWLS,YAWN,YAWNS,YEA,YEAR,YEARN,YEARS,YEAS,YEAST,YELL,YELLOW,YELLS,YELP,YELPS,YEN,YES,YET,YEW,YEWS,YIELD,YOGA,YOGI,YOKE,YOKEL,YOKES,YOLK,YOLKS,YOU,YOUNG,YOUR,YOURS,YOUTH,YUCK,YUCKY,YULE,YULES,YUMMY,ZANY,ZAP,ZAPS,ZEAL,ZEBRA,ZEN,ZERO,ZEST,ZESTY,ZINC,ZING,ZIP,ZIPPY,ZIPS,ZONE,ZONES,ZONK,ZOO,ZOOM,ZOOMS,ZOOS",

        // Configuration State
        config: {},
        matchers: [],

        start: () => {
            // 1. GATHER CONFIG
            // Prefix + Caps Toggle
            const pVal = document.getElementById('v-prefix').value.trim();
            const pCaps = document.getElementById('v-prefix-caps').checked;
            const targetPrefix = pCaps ? pVal.toUpperCase() : pVal;

            const c = {
                filterHanging: document.getElementById('v-hanging').checked,
                
                // Max Lowercase Logic
                maxLowerCheck: document.getElementById('v-max-lower-check').checked,
                maxLowerVal: parseInt(document.getElementById('v-max-lower-val').value) || 3,

                prefix: targetPrefix,

                // Search Targets
                wordStart: document.getElementById('v-word-start').checked,
                
                strAny: document.getElementById('v-str-any-check').checked,
                strVal: document.getElementById('v-str-any-val').value.trim(),
                strCaps: document.getElementById('v-str-any-caps').checked,

                wordAny: document.getElementById('v-word-any-check').checked,
                wordMin: parseInt(document.getElementById('v-word-any-len').value) || 3,
                wordCaps: document.getElementById('v-word-any-caps').checked
            };

            // 2. VALIDATION (Must have at least one filter or search rule)
            const hasFilter = c.filterHanging || c.maxLowerCheck || c.prefix;
            const hasTarget = c.wordStart || c.strAny || c.wordAny;

            if (!hasFilter && !hasTarget) return alert("Select at least one Filter or Search Target.");
            if (c.strAny && !c.strVal) return alert("Enter a string for 'Find Custom String'.");
            if (c.prefix && /[^1-9A-HJ-NP-Za-km-z]/.test(c.prefix)) return alert("Invalid Prefix characters.");

            // 3. PRE-COMPILE REGEX MATCHERS
            app.vanity.matchers = [];

            // Target A: Starts With Word
            if (c.wordStart) {
                const words = app.vanity.dictionary.split(',').filter(w => w.length >= 3);
                app.vanity.matchers.push({ 
                    id: 'START_WORD', 
                    rx: new RegExp(`^1(${words.join('|')})`, 'i') 
                });
            }

            // Target B: Custom String
            if (c.strAny) {
                const flags = c.strCaps ? '' : 'i';
                const safeStr = c.strVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                app.vanity.matchers.push({ 
                    id: 'CUSTOM_STR', 
                    matchVal: c.strVal, 
                    rx: new RegExp(safeStr, flags) 
                });
            }

            // Target C: Word Anywhere
            if (c.wordAny) {
                let words = app.vanity.dictionary.split(',').filter(w => w.length >= c.wordMin);
                if (c.wordCaps) {
                    app.vanity.matchers.push({ id: 'ANY_WORD', rx: new RegExp(`(${words.join('|')})`) });
                } else {
                    app.vanity.matchers.push({ id: 'ANY_WORD', rx: new RegExp(`(${words.join('|')})`, 'i') });
                }
            }

            app.vanity.config = c;
            app.vanity.active = true;
            app.vanity.count = 0;
            app.vanity.startTime = Date.now();

            // UI Setup
            document.getElementById('btn-vanity-start').disabled = true;
            document.getElementById('btn-vanity-stop').disabled = false;
            document.getElementById('vanity-status-box').style.display = 'block';
            document.getElementById('vanity-result').style.display = 'none';
            document.getElementById('vanity-status-text').innerText = "MINING...";
            document.getElementById('vanity-status-text').style.color = "#00E676";

            app.vanity.loop();
        },

        stop: () => {
            app.vanity.active = false;
            document.getElementById('btn-vanity-start').disabled = false;
            document.getElementById('btn-vanity-stop').disabled = true;
            document.getElementById('vanity-status-text').innerText = "STOPPED";
            document.getElementById('vanity-status-text').style.color = "#D50000";
        },

        loop: () => {
            if (!app.vanity.active) return;
            
            const batchSize = 250; 
            const c = app.vanity.config;
            const matchers = app.vanity.matchers;
            const hasTargets = matchers.length > 0;

            try {
                const B = (typeof Buffer !== 'undefined') ? Buffer : ((bitcoin.Buffer) ? bitcoin.Buffer : null);

                for (let i = 0; i < batchSize; i++) {
                    // 1. Generate
                    let keyPair;
                    if (bitcoin.ECPair.makeRandom) {
                        keyPair = bitcoin.ECPair.makeRandom();
                    } else {
                        const array = new Uint8Array(32);
                        window.crypto.getRandomValues(array);
                        const buf = B ? B.from(array) : new TextEncoder().encode(array); 
                        keyPair = bitcoin.ECPair.fromPrivateKey(buf);
                    }

                    let address = '';
                    if (keyPair.getAddress) address = keyPair.getAddress();
                    else if (bitcoin.payments && bitcoin.payments.p2pkh) {
                         const { address: addr } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
                         address = addr;
                    }

                    // 2. CHECK STRICT FILTERS (Must Pass All)
                    
                    // Filter: No Hanging
                    if (c.filterHanging && /[gjpqy]/.test(address)) { app.vanity.count++; continue; }

                    // Filter: Prefix Constraint
                    if (c.prefix && !address.startsWith("1" + c.prefix)) { app.vanity.count++; continue; }

                    // Filter: Max Lowercase Characters (High Performance Loop)
                    if (c.maxLowerCheck) {
                        let lowerCount = 0;
                        for(let j=1; j < address.length; j++) {
                            const code = address.charCodeAt(j);
                            // ASCII 97-122 is lowercase a-z
                            if(code >= 97 && code <= 122) {
                                lowerCount++;
                                if(lowerCount > c.maxLowerVal) break; 
                            }
                        }
                        if (lowerCount > c.maxLowerVal) { app.vanity.count++; continue; }
                    }

                    // 3. CHECK SEARCH TARGETS (If any active)
                    // If NO targets are active, and we passed filters, we found it!
                    if (!hasTargets) {
                        app.vanity.found(address, keyPair, "FILTER MATCH");
                        return;
                    }

                    // If targets ARE active, at least one must match
                    let matchText = null;
                    for (let m of matchers) {
                        const hit = address.match(m.rx);
                        if (hit) {
                            matchText = hit[1] || hit[0]; 
                            break; 
                        }
                    }

                    if (matchText) {
                        app.vanity.found(address, keyPair, matchText);
                        return;
                    }

                    app.vanity.count++;
                }

                // UI Update
                const elapsed = (Date.now() - app.vanity.startTime) / 1000;
                document.getElementById('vanity-speed').innerText = Math.round(app.vanity.count / elapsed);
                document.getElementById('vanity-count').innerText = app.vanity.count;

                setTimeout(app.vanity.loop, 0);

            } catch(e) {
                console.error(e);
                app.vanity.stop();
            }
        },

                found: (address, keyPair, matchText) => {
            // 1. Stop the Miner
            app.vanity.active = false;
            
            // 2. Save Found Data to Memory
            app.vanity.foundKey = { address, wif: keyPair.toWIF(), pub: keyPair.publicKey.toString('hex') };

            // 3. Reset Buttons
            document.getElementById('btn-vanity-start').disabled = false;
            document.getElementById('btn-vanity-stop').disabled = true;
            
            // 4. Update UI (Show Green Box)
            document.getElementById('vanity-status-box').style.display = 'none';
            document.getElementById('vanity-result').style.display = 'block';

            // 5. Show What We Found (e.g. "MATCH: PIZZA")
            document.getElementById('vanity-match-tag').innerText = "MATCH: " + (matchText ? matchText.toUpperCase() : "FILTER");

            // 6. Fill Data Fields
            document.getElementById('vanity-res-addr').innerText = address;
            document.getElementById('vanity-res-wif').innerText = keyPair.toWIF();
            document.getElementById('vanity-res-hex').innerText = keyPair.publicKey.toString('hex');
            
            // 7. VIBRATION FIX (Reverted to Simple Mode)
            // We use a single long buzz (1000ms) which is more compatible than patterns.
            // Note: If your phone is in "Silent Mode", browsers often block this.
            try { 
                if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(100); 
                }
            } catch(e) {
                console.warn("Vibration blocked by device settings.");
            }
        },


        saveToNotes: () => {
            const k = app.vanity.foundKey;
            if(!k) return;
            const noteBody = `VANITY ADDRESS FOUND: ${new Date().toLocaleString()}\n\nADDRESS:\n${k.address}\n\nPRIVATE KEY (WIF):\n${k.wif}\n\nPUBLIC HEX:\n${k.pub}`;
            app.data.notes.push({ id: Date.now(), title: `VANITY (${k.address.substring(0,8)}...)`, body: noteBody, date: new Date().toISOString(), color: '#00E676' });
            app.save();
            app.renderNotes();
            alert("Saved to Quick Notes!");
        }
    },


    // --- CRYPTO VAULT LOGIC ---
    
    // Helper to copy text
    copyText: (txt) => {
        navigator.clipboard.writeText(txt);
        alert("Copied to clipboard!");
    },

    // 1. Brainwallet
            calcBrainwallet: () => {
        // 1. Safety Check: Is the library even there?
        if (typeof bitcoin === 'undefined') {
            alert("CRITICAL ERROR: bitcoin.js file is missing or empty.");
            return;
        }

        const pass = document.getElementById('btc-pass').value;
        if (!pass) { document.getElementById('btc-keys').style.display = 'none'; return; }

        try {
            // 2. The "Buffer" Fix (This stops the silent crash)
            // Browsers don't have 'Buffer', so we check where it is hiding.
            let hash;
            const textToBuffer = (text) => {
                if (typeof Buffer !== 'undefined') return Buffer.from(text); // Standard
                if (bitcoin.Buffer && bitcoin.Buffer.from) return bitcoin.Buffer.from(text); // Coinbin Version
                return new TextEncoder().encode(text); // Modern Browser Fallback
            };

            // 3. Generate the Private Key
            hash = bitcoin.crypto.sha256(textToBuffer(pass));
            const keyPair = bitcoin.ECPair.fromPrivateKey(hash);

            // 4. Generate the Address (Handles different library versions)
            let address = '';
            if (typeof keyPair.getAddress === 'function') {
                address = keyPair.getAddress(); // Old Coinbin Style
            } else if (bitcoin.payments && bitcoin.payments.p2pkh) {
                const { address: addr } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }); // New Style
                address = addr;
            } else {
                address = "Error: Library incompatible";
            }

            // 5. Open the Drawer (Success!)
            document.getElementById('btc-keys').style.display = 'block';
            document.getElementById('btc-wif').innerText = keyPair.toWIF();
            document.getElementById('btc-addr').innerText = address;
            document.getElementById('btc-pub').innerText = keyPair.publicKey.toString('hex');

        } catch(e) {
            // If it still fails, this alert will tell us EXACTLY why.
            alert("Brainwallet Crash: " + e.message);
            console.error(e);
        }
    },

      // 2. Timelock Generator (Auto-Note Version)
    calcTimelock: () => {
        if (typeof bitcoin === 'undefined') return alert("Error: Bitcoin Library not loaded.");

        const dateStr = document.getElementById('tl-date').value;
        const pubKeyHex = document.getElementById('tl-pub').value.trim();
        
        if (!dateStr || !pubKeyHex) return alert("Please enter a Date and a Public Key.");

        try {
            // Buffer Fix
            const B = (typeof Buffer !== 'undefined') ? Buffer : ((bitcoin.Buffer) ? bitcoin.Buffer : null);
            if (!B) throw new Error("Browser environment missing Buffer support.");
            
            // 1. UTC Timestamp
            const dateObj = new Date(dateStr + 'T00:00:00Z');
            const lockTime = Math.floor(dateObj.getTime() / 1000);
            document.getElementById('tl-unix').innerText = lockTime;

            // 2. Create Script
            const pubKeyBuffer = B.from(pubKeyHex, 'hex');
            
            // Number Encoding
            let lockTimeBuffer;
            if (bitcoin.script && bitcoin.script.number && bitcoin.script.number.encode) {
                lockTimeBuffer = bitcoin.script.number.encode(lockTime);
            } else {
                const encodeNum = (n) => {
                    if (n === 0) return B.from([]);
                    let arr = [];
                    while (n > 0) { arr.push(n & 0xff); n >>= 8; }
                    if (arr[arr.length - 1] & 0x80) arr.push(0x00);
                    return B.from(arr);
                };
                lockTimeBuffer = encodeNum(lockTime);
            }

            const redeemScript = bitcoin.script.compile([
                lockTimeBuffer,
                bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
                bitcoin.opcodes.OP_DROP,
                pubKeyBuffer,
                bitcoin.opcodes.OP_CHECKSIG
            ]);

            const redeemScriptHex = redeemScript.toString('hex');

            // 3. Generate Address (Modern p2sh)
            const { address } = bitcoin.payments.p2sh({ 
                redeem: { output: redeemScript, network: bitcoin.networks.bitcoin },
                network: bitcoin.networks.bitcoin 
            });

            // 4. Auto-Save Note
            const noteBody = `VAULT CREATED: ${new Date().toLocaleString()}\n\nUNLOCK DATE: ${dateStr} (Unix: ${lockTime})\n\nPAY TO ADDRESS:\n${address}\n\nREDEEM SCRIPT (REQUIRED TO SPEND):\n${redeemScriptHex}\n\nFUNDING TX ID (Fill this in after sending):\n--------------------------------------\n`;
            
            app.data.notes.push({
                id: Date.now(),
                title: `TIMELOCK VAULT (${dateStr})`,
                body: noteBody,
                date: new Date().toISOString(),
                color: '#FF9100' // Orange for Vault
            });
            app.save();
            app.renderNotes();

            // Display
            document.getElementById('tl-res').style.display = 'block';
            document.getElementById('tl-addr').innerText = address;
            document.getElementById('tl-script').innerText = redeemScriptHex;
            
            alert("Timelock Generated!\n\nSAFEGUARD: The Redeem Script has been saved to 'Quick Notes'.");

        } catch(e) {
            console.error(e);
            alert("Timelock Error: " + e.message);
        }
    },




        // --- RAW TRANSACTION BUILDER (CLTV Compatible) ---
    buildRawTx: () => {
        if (typeof bitcoin === 'undefined') return alert("Error: Bitcoin Library not loaded.");

        const txid = document.getElementById('rt-txid').value.trim();
        const vout = parseInt(document.getElementById('rt-n').value);
        const scriptHex = document.getElementById('rt-script').value.trim();
        const locktime = parseInt(document.getElementById('rt-lock').value);
        const wif = document.getElementById('rt-wif').value.trim();
        const dest = document.getElementById('rt-dest').value.trim();
        const sats = parseInt(document.getElementById('rt-sats').value);

        if (!txid || isNaN(vout) || !dest || isNaN(sats) || !wif) {
            return alert("Please fill in all fields.");
        }

        try {
            // Buffer Fix
            const B = (typeof Buffer !== 'undefined') ? Buffer : ((bitcoin.Buffer) ? bitcoin.Buffer : null);
            if (!B) throw new Error("Buffer missing.");

            const network = bitcoin.networks.bitcoin; 
            const txb = new bitcoin.TransactionBuilder(network);

            // 1. Set Locktime (CRITICAL for CLTV)
            // If spending a timelock, this MUST be >= the original unix timestamp
            if (!isNaN(locktime) && locktime > 0) {
                txb.setLockTime(locktime);
            }

            // 2. Add Input with Sequence (CRITICAL for CLTV)
            // 0xfffffffe enables LockTime. 
            // If this was 0xffffffff, the LockTime above would be ignored.
            txb.addInput(txid, vout, 0xfffffffe);

            txb.addOutput(dest, sats);

            const keyPair = bitcoin.ECPair.fromWIF(wif, network);
            let redeemScript = null;
            
            if (scriptHex) {
                redeemScript = B.from(scriptHex, 'hex');
            }

            txb.sign(0, keyPair, redeemScript);

            const tx = txb.build();
            const hex = tx.toHex();

            document.getElementById('rt-res').style.display = 'block';
            document.getElementById('rt-hex').innerText = hex;

        } catch(e) {
            console.error(e);
            alert("Build Error: " + e.message + "\n\nTip: Ensure LockTime matches the original date.");
        }
    },
};

window.onload = app.init;








