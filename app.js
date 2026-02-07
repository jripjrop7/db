const app = {
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
        document.querySelectorAll('.filter-chip').forEach(el => el.classList.remove('active'));
        document.getElementById(`filter-${mode}`).classList.add('active');
        const isRange = mode === 'custom';
        document.getElementById('custom-date-range').classList.toggle('show', isRange);
        if(isRange) {
            app.filter.start = document.getElementById('date-start').value;
            app.filter.end = document.getElementById('date-end').value;
        }
        app.render(); 
        if(document.getElementById('view-stats').style.display !== 'none') { 
            app.renderChart(); app.renderPies(); app.renderHeatmap(); 
            app.renderExpenseChart(); app.renderSportsChart(); app.renderROITable();
            app.renderCalendar(); app.renderDrawdown(); app.renderHOF();
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

    render: () => {
        const list = document.getElementById('tx-list');
        list.innerHTML = '';
        const allTimeTotal = app.data.txs.reduce((sum, t) => sum + t.amt, 0);
        document.getElementById('total-liquidity').innerText = `$${Math.round(allTimeTotal).toLocaleString()}`;
        document.getElementById('total-liquidity').className = `big-val ${allTimeTotal < 0 ? 'neg' : ''}`;
        
        const goal = app.data.goal || 10000;
        const pct = Math.min(100, Math.max(0, (allTimeTotal / goal) * 100));
        document.getElementById('goal-current').innerText = `$${Math.round(allTimeTotal).toLocaleString()}`;
        document.getElementById('goal-target').innerText = `/ $${goal.toLocaleString()}`;
        document.getElementById('goal-bar').style.width = `${pct}%`;
        document.getElementById('goal-pct').innerText = `${pct.toFixed(1)}% Completed`;

        const filteredTxs = app.data.txs.filter(t => app.checkFilter(t));
        const periodTotal = filteredTxs.reduce((sum, t) => sum + t.amt, 0);
        const periodEl = document.getElementById('period-profit');
        periodEl.innerText = (periodTotal >= 0 ? '+' : '-') + `$${Math.abs(Math.round(periodTotal)).toLocaleString()}`;
        periodEl.style.color = periodTotal >= 0 ? 'var(--success)' : 'var(--error)';
        const sorted = [...filteredTxs].sort((a, b) => new Date(b.date) - new Date(a.date));
        let k401 = 0; 
        
        sorted.forEach(t => {
            if(t.cat === 'job' && t.details && t.details.k401) k401 += parseFloat(t.details.k401);
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
                if(t.details.book) {
                    tags.push(app.bookAbbr[t.details.book] || t.details.book);
                }
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
        document.getElementById('401k-mini').innerText = `$${Math.round(k401).toLocaleString()}`;
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
        const list = document.getElementById('notes-list'); list.innerHTML = '';
        const sorted = [...app.data.notes].sort((a,b) => new Date(b.date) - new Date(a.date));
        sorted.forEach(n => {
            const el = document.createElement('div');
            el.className = 'note-card';
            el.style.borderLeftColor = n.color;
            el.onclick = () => app.openNoteModal(n);
            const d = new Date(n.date).toLocaleString('en-US', {weekday:'short', month:'short', day:'numeric', hour:'numeric', minute:'2-digit'});
            el.innerHTML = `<span class="note-date" style="color:${n.color}">${d}</span><div class="note-header">${n.title}</div><div class="note-body">${n.body}</div>`;
            list.appendChild(el);
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
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(app.data));
        const anchor = document.createElement('a'); anchor.setAttribute("href", dataStr);
        const date = new Date().toISOString().split('T')[0];
        anchor.setAttribute("download", `bankroll_backup_${date}.json`);
        document.body.appendChild(anchor); anchor.click(); anchor.remove();
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

    // --- CRYPTO VAULT LOGIC ---
    
    // Helper to copy text
    copyText: (txt) => {
        navigator.clipboard.writeText(txt);
        alert("Copied to clipboard!");
    },

    // 1. Brainwallet
        calcBrainwallet: () => {
        // 1. Safety Check
        if (typeof bitcoin === 'undefined') return alert("Error: bitcoin.js not loaded.");
        
        const pass = document.getElementById('btc-pass').value;
        if (!pass) { document.getElementById('btc-keys').style.display = 'none'; return; }

        try {
            // 2. Handle Text-to-Buffer (Fixes "Buffer is not defined")
            let hash;
            // Try standard Buffer (Node/Browserify) or bitcoin.Buffer
            const bufferFn = (typeof Buffer !== 'undefined') ? Buffer.from : ((bitcoin.Buffer && bitcoin.Buffer.from) ? bitcoin.Buffer.from : null);
            
            if (bufferFn) {
                hash = bitcoin.crypto.sha256(bufferFn(pass));
            } else {
                // Fallback for modern browsers if Buffer is missing
                const encoder = new TextEncoder();
                const data = encoder.encode(pass);
                // Note: older bitcoin libs might not accept Uint8Array directly, but we try:
                hash = bitcoin.crypto.sha256(data); 
            }

            // 3. Generate Key Pair
            const keyPair = bitcoin.ECPair.fromPrivateKey(hash);

            // 4. Generate Address (Fixes "getAddress is not a function")
            let address = '';
            if (typeof keyPair.getAddress === 'function') {
                // Old Syntax (Coinb.in / v4)
                address = keyPair.getAddress();
            } else if (bitcoin.payments && bitcoin.payments.p2pkh) {
                // New Syntax (v5+)
                const { address: addr } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
                address = addr;
            } else {
                address = "Error: Unknown Lib Version";
            }

            // 5. Display Results
            document.getElementById('btc-keys').style.display = 'block';
            document.getElementById('btc-wif').innerText = keyPair.toWIF();
            document.getElementById('btc-addr').innerText = address;
            document.getElementById('btc-pub').innerText = keyPair.publicKey.toString('hex');

        } catch(e) {
            console.error("Brainwallet Error:", e);
            alert("Error: " + e.message + ". Check Console for details.");
        }
    },
    // 2. Timelock Generator (CLTV)
    calcTimelock: () => {
        if (typeof bitcoin === 'undefined') return alert("Error: Bitcoin Library not loaded.");

        const dateStr = document.getElementById('tl-date').value;
        const pubKeyHex = document.getElementById('tl-pub').value.trim();
        
        if (!dateStr || !pubKeyHex) return alert("Please enter a Date and a Public Key.");

        try {
            // 1. Convert Date to Unix Timestamp
            const lockTime = Math.floor(new Date(dateStr).getTime() / 1000);
            document.getElementById('tl-unix').innerText = lockTime;

            // 2. Create the CLTV Script
            // OP_CHECKLOCKTIMEVERIFY requires the locktime in little-endian format if constructing manually,
            // but bitcoinjs-lib handles the number encoding for us via 'bitcoin.script.number.encode'
            
            const pubKeyBuffer = Buffer.from(pubKeyHex, 'hex');
            const lockTimeBuffer = bitcoin.script.number.encode(lockTime);
            
            // Script: <expiry> OP_CLTV OP_DROP <pubKey> OP_CHECKSIG
            const redeemScript = bitcoin.script.compile([
                lockTimeBuffer,
                bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
                bitcoin.opcodes.OP_DROP,
                pubKeyBuffer,
                bitcoin.opcodes.OP_CHECKSIG
            ]);

            // 3. Hash the script to get P2SH Address
            const scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript));
            const address = bitcoin.address.fromOutputScript(scriptPubKey);

            // Display Results
            document.getElementById('tl-res').style.display = 'block';
            document.getElementById('tl-addr').innerText = address;
            document.getElementById('tl-script').innerText = redeemScript.toString('hex');

        } catch(e) {
            console.error(e);
            alert("Error generating timelock: " + e.message + "\nCheck that your Public Key is valid hex.");
        }
    },

        // --- RAW TRANSACTION BUILDER ---

    buildRawTx: () => {
        if (typeof bitcoin === 'undefined') return alert("Error: Bitcoin Library not loaded.");

        // 1. Gather Inputs
        const txid = document.getElementById('rt-txid').value.trim();
        const vout = parseInt(document.getElementById('rt-n').value);
        const scriptHex = document.getElementById('rt-script').value.trim();
        const locktime = parseInt(document.getElementById('rt-lock').value);
        const wif = document.getElementById('rt-wif').value.trim();
        const dest = document.getElementById('rt-dest').value.trim();
        const sats = parseInt(document.getElementById('rt-sats').value);

        if (!txid || isNaN(vout) || !dest || isNaN(sats) || !wif) {
            return alert("Please fill in all fields (TxID, Index, Destination, Amount, WIF).");
        }

        try {
            // 2. Initialize Network & Builder
            const network = bitcoin.networks.bitcoin; // Mainnet
            const txb = new bitcoin.TransactionBuilder(network);

            // 3. Set Locktime (Crucial for CLTV)
            // If spending a timelock, this MUST be set to the original date or higher.
            if (!isNaN(locktime) && locktime > 0) {
                txb.setLockTime(locktime);
            }

            // 4. Add Input
            // Sequence 0xfffffffe enables LockTime but disables RBF (usually standard for CLTV)
            txb.addInput(txid, vout, 0xfffffffe);

            // 5. Add Output
            txb.addOutput(dest, sats);

            // 6. Sign
            const keyPair = bitcoin.ECPair.fromWIF(wif, network);
            let redeemScript = null;
            
            // If a redeem script is provided (P2SH/Timelock), we must use it to sign
            if (scriptHex) {
                redeemScript = Buffer.from(scriptHex, 'hex');
            }

            // Sign Input 0
            // txb.sign(inputIndex, keyPair, redeemScript)
            txb.sign(0, keyPair, redeemScript);

            // 7. Build
            const tx = txb.build();
            const hex = tx.toHex();

            // Display
            document.getElementById('rt-res').style.display = 'block';
            document.getElementById('rt-hex').innerText = hex;

        } catch(e) {
            console.error(e);
            alert("Transaction Failed: " + e.message + "\n\nCommon errors:\n- Incorrect WIF Key\n- Wrong Network (Testnet vs Mainnet)\n- Invalid Hex");
        }
    },

    // --- BROADCAST LOGIC (Was Missing) ---
    broadcastTx: async () => {
        const hex = document.getElementById('rt-hex').innerText;
        const statusEl = document.getElementById('bc-status');
        const btn = document.getElementById('btn-broadcast');
        
        if (!hex || hex === '-') return alert("No signed transaction to broadcast.");
        if (!confirm("Are you sure? This will permanently spend the funds.")) return;

        btn.disabled = true;
        btn.innerText = "BROADCASTING...";
        statusEl.innerText = "Attempting broadcast via Blockstream...";
        statusEl.style.color = "#FFEA00"; 

        try {
            const response = await fetch('https://blockstream.info/api/tx', { method: 'POST', body: hex });
            const text = await response.text();
            if (response.ok) {
                statusEl.innerHTML = `✅ SUCCESS! TX ID: <a href="https://mempool.space/tx/${text}" target="_blank" style="color:#fff">${text}</a>`;
                statusEl.style.color = "#00E676";
                btn.innerText = "SENT";
                return;
            } 
            throw new Error(text);
        } catch (e1) {
            console.warn("Blockstream failed, trying BlockCypher...", e1);
            statusEl.innerText = "Blockstream failed. Trying BlockCypher backup...";
            try {
                const response2 = await fetch('https://api.blockcypher.com/v1/btc/main/txs/push', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tx: hex })
                });
                const json2 = await response2.json();
                if (response2.ok && json2.tx && json2.tx.hash) {
                    statusEl.innerHTML = `✅ SUCCESS! TX ID: <a href="https://mempool.space/tx/${json2.tx.hash}" target="_blank" style="color:#fff">${json2.tx.hash}</a>`;
                    statusEl.style.color = "#00E676";
                    btn.innerText = "SENT";
                } else { throw new Error(json2.error || "Unknown Error"); }
            } catch (e2) {
                statusEl.innerText = "❌ FAILED: " + e1.message;
                statusEl.style.color = "#D50000";
                btn.innerText = "RETRY";
                btn.disabled = false;
            }
        }
    },

    // 2. Parlay Architect
    addParlayLeg: () => {
        const id = Date.now();
        const row = document.createElement('div'); row.className = 'parlay-leg-row'; row.id = `leg-${id}`;
        row.innerHTML = `<input type="text" class="leg-odds" placeholder="-110" oninput="app.calcParlay()" style="margin:0; width:100px;"><button style="background:none;border:none;color:#555;" onclick="app.removeParlayLeg('${id}')">✕</button>`;
        document.getElementById('parlay-legs-container').appendChild(row);
    },
    removeParlayLeg: (id) => { document.getElementById(`leg-${id}`).remove(); app.calcParlay(); },
    calcParlay: () => {
        const inputs = document.querySelectorAll('.leg-odds');
        let decTotal = 1; let validLegs = 0;
        inputs.forEach(i => {
            const val = parseFloat(i.value);
            if(!isNaN(val)) {
                const dec = val > 0 ? (val/100)+1 : (100/Math.abs(val))+1;
                decTotal *= dec; validLegs++;
            }
        });
        if(validLegs < 2) { document.getElementById('parlay-results').style.display='none'; return; }
        
        document.getElementById('parlay-results').style.display='block';
        const prob = (1 / decTotal) * 100;
        const trueAm = decTotal >= 2 ? (decTotal-1)*100 : -100/(decTotal-1);
        const trueStr = trueAm > 0 ? `+${Math.round(trueAm)}` : Math.round(trueAm);
        
        document.getElementById('pl-true').innerText = trueStr;
        document.getElementById('pl-prob').innerText = `${prob.toFixed(1)}%`;

        const offer = parseFloat(document.getElementById('parlay-offer').value);
        if(!isNaN(offer)) {
            const offerDec = offer > 0 ? (offer/100)+1 : (100/Math.abs(offer))+1;
            const diff = ((offerDec - decTotal) / decTotal) * 100;
            const evEl = document.getElementById('pl-ev');
            evEl.innerText = diff > 0 ? `+${diff.toFixed(1)}% (Good)` : `${diff.toFixed(1)}% (Bad)`;
            evEl.style.color = diff > 0 ? '#00E676' : '#D50000';
            
            // Kelly
            const b = offerDec - 1; const p = prob / 100; const q = 1-p;
            const f = (b*p - q) / b;
            document.getElementById('pl-kelly').innerText = f > 0 ? `${(f*100).toFixed(2)}% Unit` : 'No Bet';
        } else {
            document.getElementById('pl-ev').innerText = '-';
            document.getElementById('pl-kelly').innerText = '-';
        }
    },    
};

window.onload = app.init;

