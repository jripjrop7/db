const app = {
	
	        // --- 154-COLOR MEGA PALETTE (22 Rows of 7) ---
        // --- 252-COLOR TERMINAL MEGA PALETTE (36 Rows of 7) ---
        // --- 329-COLOR GOD-TIER TERMINAL PALETTE (47 Rows of 7) ---
    noteColors: [
        // ROW 1: The Only Grayscale (Pure White to Pitch Black)
        '#FFFFFF','#CCCCCC','#999999','#666666','#333333','#111111','#000000',
        
        // ROWS 2-5: The Original Bankroll OS Palette
        '#FF8A80','#FF5252','#FF1744','#D50000','#FF007F','#F50057','#C51162', 
        '#FFD180','#FFAB40','#FF9100','#FF6D00','#FF3D00','#FFEA00','#FFD600', 
        '#C6FF00','#76FF03','#00E676','#00C853','#1DE9B6','#00E5FF','#00B8D4', 
        '#82B1FF','#2979FF','#3D5AFE','#651FFF','#AA00FF','#D500F9','#E040FB',
        
        // ROWS 6-7: 100% Pure Neons (Eye-Burners)
        '#FF00FF','#CC00FF','#7700FF','#0000FF','#0088FF','#00FFFF','#00FF88',
        '#00FF00','#88FF00','#FFFF00','#FF8800','#FF0000','#FF0088','#FF0044',
        
        // ROWS 8-9: Blood & Dark Crimson
        '#8B0000','#780000','#660000','#540000','#420000','#300000','#1A0000',
        '#B3003B','#990033','#80002A','#660022','#4D0019','#330011','#1A0008',
        
        // ROWS 10-11: Cyberpunk & Deep Space Violets
        '#8A2BE2','#7A00E6','#6600CC','#5500AA','#440088','#330066','#220044',
        '#4B0082','#483D8B','#3E1452','#30004A','#260033','#1C002A','#11001A',
        
        // ROWS 12-13: Abyssal Navy & Bioluminescent Cyan
        '#000080','#000066','#00004D','#000033','#00001A','#020B1A','#01060F',
        '#008B8B','#007373','#005959','#004040','#002626','#001A1A','#000D0D',
        
        // ROWS 14-15: Toxic Wasteland & Deep Jungle Greens
        '#39FF14','#32CD32','#2E8B57','#228B22','#008000','#006400','#004D00',
        '#004000','#003300','#002600','#001A00','#000D00','#0A120A','#050A05',
        
        // ROWS 16-17: Blazing Gold, Bronze, & Rust
        '#FFD700','#FFC300','#FFB300','#FFA000','#FF8F00','#DAA520','#B8860B',
        '#996515','#8B4513','#A0522D','#805A00','#664200','#4D3300','#332200',
        
        // ROWS 18-19: Hot Plasma & Molten Lava Oranges
        '#FF4500','#FF5500','#E63E00','#CC3300','#B32D00','#992600','#802000',
        '#661A00','#4D1300','#330D00','#260900','#1A0600','#0D0300','#0A0200',
        
        // ROWS 20-21: Synthwave Lazers & Tactical Armor Slates
        '#FF0055','#00F0FF','#13FF00','#FFD300','#00FFAA','#7000FF','#F700FF',
        '#2F4F4F','#1C2F2F','#101C1C','#2E3B4E','#1A2433','#0D131C','#05080D',
        
        // ROWS 22-24: Blacklight Series (High-Vis edge colors & their shadows)
        '#E0115F','#FF007F','#7FFF00','#00FFFF','#8A2BE2','#FF1493','#00FF7F',
        '#FF3366','#FF33CC','#CC33FF','#6633FF','#3366FF','#33CCFF','#33FFCC',
        '#801A33','#801A66','#661A80','#331A80','#1A3380','#1A6680','#1A8066',
        
        // ROWS 25-30: THE DESCENT INTO BLACK (Pure Hues stepping down to darkness)
        '#FF0000','#FF8000','#FFFF00','#00FF00','#00FFFF','#0000FF','#8000FF',
        '#CC0000','#CC6600','#CCCC00','#00CC00','#00CCCC','#0000CC','#6600CC',
        '#990000','#994C00','#999900','#009900','#009999','#000099','#4C0099',
        '#660000','#663300','#666600','#006600','#006666','#000066','#330066',
        '#330000','#331900','#333300','#003300','#003333','#000033','#190033',
        '#1A0000','#1A0D00','#1A1A00','#001A00','#001A1A','#00001A','#0D001A',
        
        // ROWS 31-32: Vibrant Jewels & Deep Jewels
        '#E0115F','#50C878','#0F52BA','#4B0082','#FF7E00','#8A2BE2','#DFFF00',
        '#8B0A3B','#2F7546','#08316E','#2D004E','#994C00','#531987','#869900',
        
        // ROWS 33-34: Swamp/Camo & Dark Tactical
        '#4B5320','#2E8B57','#556B2F','#8B4513','#A0522D','#2F4F4F','#483D8B',
        '#2A2E12','#1B5334','#33401C','#53290B','#60311B','#1C2F2F','#2B2453',
        
        // ROWS 35-36: Radioactive Greens & Deep Radiation
        '#BFFF00','#8CFF00','#44FF00','#00FF22','#00FF55','#00FF88','#00FFBB',
        '#608000','#468000','#228000','#008011','#00802A','#008044','#00805D',

        // --- NEW EXPANSION PACK (77 COLORS) ---
        
        // ROW 37: Sunset Overdrive (Pink to Yellow)
        '#FF0055','#FF2A55','#FF5555','#FF7F55','#FFAA55','#FFD455','#FFFF55',
        
        // ROW 38: Retrowave Miami (Magenta to Cobalt)
        '#FF0099','#FF00CC','#CC00FF','#9900FF','#6600FF','#3300FF','#0000FF',
        
        // ROW 39: Toxic Glow (Yellow-Green to Green)
        '#CCFF00','#99FF00','#66FF00','#33FF00','#00FF00','#00FF33','#00FF66',
        
        // ROW 40: Deep Sea Bioluminescence (Green-Aqua to Deep Blue)
        '#00FF99','#00FFCC','#00FFFF','#00CCFF','#0099FF','#0066FF','#0033FF',
        
        // ROW 41: Molten Core (Atomic Red to Sun Yellow)
        '#FF0000','#FF2200','#FF4400','#FF6600','#FF8800','#FFAA00','#FFCC00',
        
        // ROW 42: Laser Candy (High-Vis Solid Pastels)
        '#FF66B2','#FF66FF','#B266FF','#6666FF','#66B2FF','#66FFFF','#66FFB2',
        
        // ROW 43: Poison Ivy / Witchcraft (Deepest, darkest corrupted hues)
        '#8A0303','#5A0202','#3B0101','#1A0A29','#26053A','#3A084A','#0B2111',
        
        // ROW 44: Vampire / Blood Magic
        '#4A0000','#5E0000','#730000','#8B0000','#A40000','#BE0000','#D80000',
        
        // ROW 45: Cyberpunk Alleys (The Neon Cityscape mix)
        '#00FFC4','#00D4FF','#047BFE','#4B1D52','#8A0A62','#B30047','#FF0033',
        
        // ROW 46: Galactic Supernova (Deep Purple to Shocking Violet)
        '#2D00F7','#6A00F4','#8900F2','#A100F2','#B100E8','#BC00DD','#D100D1',
        
        // ROW 47: The Retina Melters (The 7 most scientifically aggressive hex codes)
        '#FE019A','#39FF14','#00E5FF','#F4FF00','#FF3F00','#9D00FF','#00FFAA',
        
        // ROW 48: The Matrix (Absolute Black to Piercing Code Green)
        '#001A00','#003300','#004D00','#008000','#00B300','#00E600','#00FF00',
        
        // ROW 49: Outrun Horizon (The classic Synthwave Sunset gradient)
        '#0A002A','#2A0054','#4A007F','#8B008B','#CC0052','#FF3300','#FF8800',
        
        // ROW 50: Vegas Strip (A mix of vivid, clashing Casino Neons)
        '#FF1493','#00FFFF','#FFD700','#FF4500','#7CFC00','#8A2BE2','#FF00FF',
        
        // ROW 51: Phantom Monochrome (Tinted ultra-blacks that barely register as color)
        '#050011','#000A11','#001105','#0A1100','#110A00','#11000A','#090909',
        
        // ROW 52: Glacier Ice (Deep ocean blue freezing into bright cyan)
        '#000B1A','#001633','#002B66','#004099','#0055CC','#0077FF','#00AAFF',
        
        // ROW 53: Alien Flora (Jarring, unnatural extraterrestrial hues)
        '#9900FF','#00FFCC','#FF0099','#CCFF00','#0033FF','#FF0033','#33FF00',
        
        // ROW 54: Volcanic Obsidian (Cooling Magma)
        '#0D0300','#1A0500','#330A00','#661400','#991F00','#CC2900','#FF3300',
        
        // ROW 55: Acid Pool (Toxic Sludge to Chemical Yellow)
        '#1A1A00','#333300','#666600','#999900','#CCCC00','#E6E600','#FFFF00',
        
        // ROW 56: Deep Nebula (The darkest corner of space to Starlight Pink)
        '#1A001A','#330033','#4D004D','#800080','#B300B3','#E600E6','#FF00FF',
        
        // ROW 57: Blood Moon (Lunar Eclipse Progression)
        '#1A050A','#330A14','#661429','#991F3D','#CC2952','#E62E5C','#FF3366',
        
        // ROW 58: Electric Indigo (High Voltage Blue/Purples)
        '#190033','#330066','#4C0099','#6600CC','#8000FF','#9933FF','#B266FF',
        
        // ROW 59: Neon Rust (Oxidized Cyberpunk Orange)
        '#2B0F00','#551F00','#802E00','#AA3D00','#D44D00','#FF5C00','#FF7B33',
        
        // ROW 60: Quantum Anomaly (Aggressive, triadic screen-glitch colors)
        '#FF00AA','#AAFF00','#00AAFF','#FF0055','#55FF00','#0055FF','#FF55FF',
        
        // ROW 61: Dark Matter (The absolute, barely-visible edges of the spectrum)
        '#030005','#050003','#050300','#030500','#000503','#000305','#040404'
    ],
    selectedNoteColor: '#00E676', // Default

    openNoteModal: () => {
        app.currentNoteId = null;
        document.getElementById('note-modal-title').innerText = "NEW NOTE";
        document.getElementById('note-title').value = '';
        document.getElementById('note-icon-input').value = ''; // Clear icon input
        
        const now = new Date();
        const localIso = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        document.getElementById('note-date-input').value = localIso;
        document.getElementById('btn-delete-note').style.display = 'none';
        
        app.buildColorGrid(app.selectedNoteColor);
        document.getElementById('modal-note').classList.add('open');
    },

    openEditNoteModal: (id) => {
        app.currentNoteId = id;
        const n = app.data.notes.find(x => x.id === id);
        if(!n) return;

        document.getElementById('note-modal-title').innerText = "EDIT NOTE";
        document.getElementById('note-title').value = n.title;
        document.getElementById('note-icon-input').value = n.icon || ''; // Load saved icon
        
        let dateVal = n.date;
        if(dateVal.endsWith('Z') || dateVal.length > 16) {
            const dateObj = new Date(dateVal);
            dateVal = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        }
        document.getElementById('note-date-input').value = dateVal;
        document.getElementById('btn-delete-note').style.display = 'block';
        
        app.buildColorGrid(n.color);
        document.getElementById('modal-note').classList.add('open');
    },

    buildColorGrid: (activeColor) => {
        const grid = document.getElementById('note-color-selector');
        grid.innerHTML = '';
        app.noteColors.forEach(hex => {
            const div = document.createElement('div');
            div.className = 'color-grid-item';
            div.style.background = hex;
            if (hex === activeColor) div.classList.add('selected');
            
            div.onclick = () => {
                document.querySelectorAll('.color-grid-item').forEach(el => el.classList.remove('selected'));
                div.classList.add('selected');
                app.selectedNoteColor = hex;
            };
            grid.appendChild(div);
        });
    },

    saveNoteAction: () => {
        const title = document.getElementById('note-title').value.trim() || 'Untitled Note';
        const dateStr = document.getElementById('note-date-input').value || new Date().toISOString();
        const iconVal = document.getElementById('note-icon-input').value.trim().toLowerCase(); // Grab Icon
        
        if (app.currentNoteId) {
            // EDIT EXISTING
            const idx = app.data.notes.findIndex(n => n.id === app.currentNoteId);
            if(idx > -1) {
                app.data.notes[idx].title = title;
                app.data.notes[idx].date = dateStr;
                app.data.notes[idx].color = app.selectedNoteColor;
                app.data.notes[idx].icon = iconVal; // Save Icon
            }
        } else {
            // CREATE NEW
            app.data.notes.unshift({
                id: 'note_' + Date.now(),
                title: title,
                icon: iconVal, // Save Icon
                color: app.selectedNoteColor,
                body: '',
                date: dateStr,
                _expanded: true
            });
            if(!app.data.folderState) app.data.folderState = {};
            app.data.folderState[app.selectedNoteColor] = true;
        }

        app.save();
        document.getElementById('modal-note').classList.remove('open');
        app.renderNotes();
    },

    renderNotes: () => {
        const list = document.getElementById('notes-list');
        if (!list) return;
        list.innerHTML = '';

        if (!app.data.notes || app.data.notes.length === 0) {
            list.innerHTML = `<div style="text-align:center; color:#555; padding:20px; font-size:0.8rem;">No notes yet. Tap + ADD NOTE to start.</div>`;
            return;
        }

        app.data.notes.forEach(n => {
            if (!n.id) n.id = 'note_' + Date.now() + '_' + Math.floor(Math.random()*1000);
            else n.id = String(n.id); 
            if (typeof n._expanded === 'undefined') n._expanded = false;
            if (!n.date) n.date = new Date().toISOString(); 
        });

        if(!app.data.folderState) app.data.folderState = {};
        if(!app.data.folderSettings) app.data.folderSettings = {};

        const groups = {};
        app.data.notes.forEach(n => {
            if (!groups[n.color]) groups[n.color] = [];
            groups[n.color].push(n);
        });

        const folderKeys = [];
        const standaloneKeys = [];
        Object.keys(groups).forEach(color => {
            if (groups[color].length > 1) folderKeys.push(color);
            else standaloneKeys.push(color);
        });
        const sortedColors = [...folderKeys, ...standaloneKeys];

        const bindNoteEvents = (n, container) => {
            const nHead = container.querySelector(`#note-head-${n.id}`);
            const nDate = container.querySelector(`#note-date-${n.id}`);
            const nBodyContainer = container.querySelector(`#note-body-${n.id}`);
            const textArea = container.querySelector(`#text-${n.id}`);

            const autoResize = () => {
                textArea.style.height = 'auto';
                textArea.style.height = (textArea.scrollHeight) + 'px';
            };
            if(n._expanded) setTimeout(autoResize, 0);

            nDate.onclick = (e) => {
                e.stopPropagation(); 
                app.openEditNoteModal(n.id);
            };

            nHead.onclick = () => {
                n._expanded = !n._expanded;
                app.save();
                nBodyContainer.style.display = n._expanded ? 'block' : 'none';
                if(n._expanded) setTimeout(autoResize, 0);
            };

            textArea.addEventListener('input', autoResize);
            textArea.onchange = (e) => {
                n.body = e.target.value;
                app.save();
                const oldBg = textArea.style.background;
                textArea.style.background = `rgba(0,230,118,0.1)`; 
                setTimeout(() => textArea.style.background = oldBg, 600);
            };
        };

        sortedColors.forEach(color => {
            const groupNotes = groups[color];
            
            if (groupNotes.length === 1) {
                // --- STANDALONE NOTE (Now with Left Icon) ---
                const n = groupNotes[0];
                const dateObj = new Date(n.date);
                const dateStr = !isNaN(dateObj) ? `${dateObj.getMonth()+1}/${dateObj.getDate()}/${dateObj.getFullYear()}` : n.date.split('T')[0];

                // If no icon assigned, fallback to sticky_note_2
                const dispIcon = n.icon ? n.icon : 'sticky_note_2';

                const div = document.createElement('div');
                div.className = 'note-standalone'; 
                div.style.borderLeftColor = color;
                div.innerHTML = `
                    <div class="note-card-header" id="note-head-${n.id}" style="background: linear-gradient(90deg, ${color}15 0%, rgba(0,0,0,0) 100%); border-bottom: 1px solid ${color}30;">
                        <div style="display:flex; align-items:center; flex-grow:1; overflow:hidden;">
                            <i class="material-icons-round" style="color:${color}; margin-right:8px; font-size:18px; flex-shrink:0;">${dispIcon}</i>
                            <div class="note-card-title" style="color:${color}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${n.title.toUpperCase()}</div>
                        </div>
                        <div class="note-card-date" id="note-date-${n.id}" style="color:${color}; margin-left:8px; flex-shrink:0;">${dateStr}</div>
                    </div>
                    <div id="note-body-${n.id}" style="display:${n._expanded ? 'block' : 'none'};">
                        <textarea class="note-textarea" id="text-${n.id}" placeholder="Tap to write... (Auto-saves)">${n.body || ''}</textarea>
                    </div>
                `;
                list.appendChild(div);
                bindNoteEvents(n, div);

            } else {
                // --- FOLDER ---
                const isFolderOpen = app.data.folderState[color] !== false;
                const fSettings = app.data.folderSettings[color] || { title: 'NOTES FOLDER', icon: 'cyclone' };

                const folderDiv = document.createElement('div');
                folderDiv.className = 'note-folder'; 
                folderDiv.style.borderLeftColor = color;
                
                let html = `
                    <div class="note-folder-header" id="folder-head-${color.replace('#','')}" style="background: linear-gradient(90deg, ${color}20 0%, rgba(0,0,0,0) 100%); border-bottom: 1px solid ${color}40;">
                        <i class="material-icons-round note-folder-icon" id="folder-icon-${color.replace('#','')}" style="color:${color};">${fSettings.icon}</i>
                        <div class="note-folder-title" style="color:${color};">${fSettings.title.toUpperCase()}</div>
                        <div style="display:flex; align-items:center; color:${color};">
                            <span style="font-size:0.65rem; margin-right:4px;">${groupNotes.length}</span>
                            <i class="material-icons-round" style="font-size:18px;" id="folder-arrow-${color.replace('#','')}">${isFolderOpen ? 'expand_less' : 'expand_more'}</i>
                        </div>
                    </div>
                    <div id="folder-content-${color.replace('#','')}" style="display:${isFolderOpen ? 'block' : 'none'}; padding-bottom:6px;">
                `;

                // --- INLINE NOTES (Now with Left Icon) ---
                groupNotes.forEach(n => {
                    const dateObj = new Date(n.date);
                    const dateStr = !isNaN(dateObj) ? `${dateObj.getMonth()+1}/${dateObj.getDate()}/${dateObj.getFullYear()}` : n.date.split('T')[0];
                    const dispIcon = n.icon ? n.icon : 'sticky_note_2';
                    
                    html += `
                        <div class="note-card-inline" style="border-left-color:${color};">
                            <div class="note-card-header" id="note-head-${n.id}" style="background: linear-gradient(90deg, ${color}10 0%, rgba(0,0,0,0) 100%); border-bottom: 1px solid #1a1a1a;">
                                <div style="display:flex; align-items:center; flex-grow:1; overflow:hidden;">
                                    <i class="material-icons-round" style="color:${color}; margin-right:8px; font-size:18px; flex-shrink:0;">${dispIcon}</i>
                                    <div class="note-card-title" style="color:${color}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${n.title.toUpperCase()}</div>
                                </div>
                                <div class="note-card-date" id="note-date-${n.id}" style="color:${color}; margin-left:8px; flex-shrink:0;">${dateStr}</div>
                            </div>
                            <div id="note-body-${n.id}" style="display:${n._expanded ? 'block' : 'none'};">
                                <textarea class="note-textarea" id="text-${n.id}" placeholder="Tap to write... (Auto-saves)">${n.body || ''}</textarea>
                            </div>
                        </div>
                    `;
                });

                html += `</div>`;
                folderDiv.innerHTML = html;
                list.appendChild(folderDiv);

                // Bind Folder Events
                const fHead = folderDiv.querySelector(`#folder-head-${color.replace('#','')}`);
                const fIcon = folderDiv.querySelector(`#folder-icon-${color.replace('#','')}`);
                const fContent = folderDiv.querySelector(`#folder-content-${color.replace('#','')}`);
                const fArrow = folderDiv.querySelector(`#folder-arrow-${color.replace('#','')}`);

                fHead.onclick = (e) => {
                    if(e.target === fIcon) return;
                    const nowOpen = !(app.data.folderState[color] !== false);
                    app.data.folderState[color] = nowOpen;
                    app.save();
                    fContent.style.display = nowOpen ? 'block' : 'none';
                    fArrow.innerText = nowOpen ? 'expand_less' : 'expand_more';
                };

                fIcon.onclick = (e) => {
                    e.stopPropagation();
                    app.renameFolder(color);
                };

                groupNotes.forEach(n => bindNoteEvents(n, folderDiv));
            }
        });
    },


	
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
    
        saveDailyNote: (dateStr) => {
        if (!app.data.dailyNotes) app.data.dailyNotes = {};
        const safeId = dateStr.replace(/[^a-zA-Z0-9]/g, '');
        const noteText = document.getElementById('text-' + safeId).value;
        
        app.data.dailyNotes[dateStr] = noteText;
        app.save();
        
        // Small visual feedback
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = "SAVED!";
        btn.style.background = "#FF007F";
        btn.style.color = "#000";
        
        // Update the arrow color immediately to Green so they know it has data
        document.getElementById('icon-' + safeId).style.color = noteText.trim().length > 0 ? '#00E676' : '#FF007F';

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "rgba(255, 0, 127, 0.1)";
            btn.style.color = "#FF007F";
        }, 1500);
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
        try {
            // 1. Core Settings (Now properly linked to app.data)
            if(document.getElementById('set-btc')) document.getElementById('set-btc').value = app.data.btcHoldings || 0;
            if(document.getElementById('set-eth')) document.getElementById('set-eth').value = app.data.ethHoldings || 0;
            if(document.getElementById('set-goal')) document.getElementById('set-goal').value = localStorage.getItem('goal') || 10000;
            
            // 2. Tracker 1
            const t1Str = localStorage.getItem('tracker1');
            const t1 = t1Str ? JSON.parse(t1Str) : {name:"", cat:"", start:0, goal:1000, date:""};
            if(document.getElementById('set-t1-name')) document.getElementById('set-t1-name').value = t1.name || '';
            if(document.getElementById('set-t1-cat')) document.getElementById('set-t1-cat').value = t1.cat || '';
            if(document.getElementById('set-t1-start')) document.getElementById('set-t1-start').value = t1.start || 0;
            if(document.getElementById('set-t1-goal')) document.getElementById('set-t1-goal').value = t1.goal || 1000;
            if(document.getElementById('set-t1-date')) document.getElementById('set-t1-date').value = t1.date || '';

            // 3. Tracker 2
            const t2Str = localStorage.getItem('tracker2');
            const t2 = t2Str ? JSON.parse(t2Str) : {name:"", cat:"", start:0, goal:1000, date:""};
            if(document.getElementById('set-t2-name')) document.getElementById('set-t2-name').value = t2.name || '';
            if(document.getElementById('set-t2-cat')) document.getElementById('set-t2-cat').value = t2.cat || '';
            if(document.getElementById('set-t2-start')) document.getElementById('set-t2-start').value = t2.start || 0;
            if(document.getElementById('set-t2-goal')) document.getElementById('set-t2-goal').value = t2.goal || 1000;
            if(document.getElementById('set-t2-date')) document.getElementById('set-t2-date').value = t2.date || '';

            // 4. Tracker 3
            const t3Str = localStorage.getItem('tracker3');
            const t3 = t3Str ? JSON.parse(t3Str) : {name:"", cat:"", start:0, goal:1000, date:""};
            if(document.getElementById('set-t3-name')) document.getElementById('set-t3-name').value = t3.name || '';
            if(document.getElementById('set-t3-cat')) document.getElementById('set-t3-cat').value = t3.cat || '';
            if(document.getElementById('set-t3-start')) document.getElementById('set-t3-start').value = t3.start || 0;
            if(document.getElementById('set-t3-goal')) document.getElementById('set-t3-goal').value = t3.goal || 1000;
            if(document.getElementById('set-t3-date')) document.getElementById('set-t3-date').value = t3.date || '';

            // 4. Open Modal
            document.getElementById('modal-dash-settings').classList.add('open');
        } catch(e) {
            console.error("Error opening settings:", e);
            document.getElementById('modal-dash-settings').classList.add('open');
        }
    },

    saveDashSettings: () => {
        // Save to central database
        app.data.btcHoldings = parseFloat(document.getElementById('set-btc').value) || 0;
        app.data.ethHoldings = parseFloat(document.getElementById('set-eth').value) || 0;
        localStorage.setItem('goal', parseFloat(document.getElementById('set-goal').value) || 10000);
        app.save(); // Locks it in

        const t1 = {
            name: document.getElementById('set-t1-name').value.trim(),
            cat: document.getElementById('set-t1-cat').value,
            start: parseFloat(document.getElementById('set-t1-start').value) || 0,
            goal: parseFloat(document.getElementById('set-t1-goal').value) || 1000,
            date: document.getElementById('set-t1-date').value
        };
        localStorage.setItem('tracker1', JSON.stringify(t1));

        const t2 = {
            name: document.getElementById('set-t2-name').value.trim(),
            cat: document.getElementById('set-t2-cat').value,
            start: parseFloat(document.getElementById('set-t2-start').value) || 0,
            goal: parseFloat(document.getElementById('set-t2-goal').value) || 1000,
            date: document.getElementById('set-t2-date').value
        };
        localStorage.setItem('tracker2', JSON.stringify(t2));

        const t3 = {
            name: document.getElementById('set-t3-name').value.trim(),
            cat: document.getElementById('set-t3-cat').value,
            start: parseFloat(document.getElementById('set-t3-start').value) || 0,
            goal: parseFloat(document.getElementById('set-t3-goal').value) || 1000,
            date: document.getElementById('set-t3-date').value
        };
        localStorage.setItem('tracker3', JSON.stringify(t3));

        document.getElementById('modal-dash-settings').classList.remove('open');
        app.calcCrypto(); // Forces the calculation just in case
        app.render();
    },


    

        // --- KALSHI COMMAND CENTER (LIVE PNL & TRADING) ---
    kalshiPortfolio: {
        positions: [],
        cashBalance: 0,
        portfolioValue: 0,

        fetch: async () => {
            const div = document.getElementById('k-port-res');
            document.getElementById('k-port-header').style.display = 'none';
            div.innerHTML = '<div style="color:#C6FF00; text-align:center; padding:10px; font-weight:bold;">Authenticating...</div>';
            
            try {
                // 1. Fetch Account Balance
                const balData = await app.bot.request('GET', '/trade-api/v2/portfolio/balance');
                app.kalshiPortfolio.cashBalance = balData.balance || 0;
                
                // 2. Fetch Open Positions
                div.innerHTML = '<div style="color:#C6FF00; text-align:center; padding:10px; font-weight:bold;">Fetching Open Positions...</div>';
                const data = await app.bot.request('GET', '/trade-api/v2/portfolio/positions?count_filter=position');
                const mPositions = data.market_positions || [];
                app.kalshiPortfolio.positions = mPositions.filter(p => p.position !== 0);

                // 3. ENRICH DATA: Fetch Live Market Prices for each position
                div.innerHTML = '<div style="color:#C6FF00; text-align:center; padding:10px; font-weight:bold;">Syncing Live Order Books...</div>';
                
                let totalPositionValueCents = 0;

                for (let p of app.kalshiPortfolio.positions) {
                    try {
                        const mktData = await app.bot.request('GET', `/trade-api/v2/markets/${p.ticker}`);
                        if (mktData && mktData.market) {
                            p.live_yes_bid = mktData.market.yes_bid;
                            p.live_yes_ask = mktData.market.yes_ask;
                            p.live_no_bid = mktData.market.no_bid;
                            p.live_no_ask = mktData.market.no_ask;
                            p.last_price = mktData.market.last_price;
                        }
                    } catch (e) {
                        console.log("Could not fetch live price for " + p.ticker);
                    }

                    // Math for Portfolio Value
                    const count = Math.abs(p.position);
                    const side = p.position > 0 ? 'yes' : 'no';
                    const currentBid = side === 'yes' ? (p.live_yes_bid || 0) : (p.live_no_bid || 0);
                    totalPositionValueCents += (count * currentBid);
                }

                app.kalshiPortfolio.portfolioValue = totalPositionValueCents;
                app.kalshiPortfolio.render();

            } catch (e) {
                div.innerHTML = `<div style="color:#FF5252; text-align:center; padding:10px;">Sync Failed. Check bridge.</div>`;
            }
        },
        
        render: () => {
            const div = document.getElementById('k-port-res');
            
            // Render Header
            document.getElementById('k-port-header').style.display = 'flex';
            document.getElementById('k-cash-avail').innerText = "$" + (app.kalshiPortfolio.cashBalance / 100).toFixed(2);
            document.getElementById('k-port-val').innerText = "$" + (app.kalshiPortfolio.portfolioValue / 100).toFixed(2);

            let html = '';
            
            app.kalshiPortfolio.positions.forEach(p => {
                const count = Math.abs(p.position);
                const side = p.position > 0 ? 'yes' : 'no';
                const sideColor = side === 'yes' ? '#00E676' : '#FF5252';
                
                // MATH: Costs and Values
                const costBasisCents = count > 0 ? (p.total_traded / count) : 0;
                const totalCostDollars = (p.total_traded / 100).toFixed(2);
                
                // Live Prices
                const currentBidCents = side === 'yes' ? (p.live_yes_bid || 0) : (p.live_no_bid || 0);
                const currentValDollars = ((count * currentBidCents) / 100).toFixed(2);
                
                // Profit & Loss
                const pnlDollars = (currentValDollars - totalCostDollars).toFixed(2);
                const pnlColor = pnlDollars >= 0 ? '#00E676' : '#FF5252';
                const pnlSign = pnlDollars >= 0 ? '+' : '';

                // Clean up ticker for display (Kalshi tickers are long)
                const shortTicker = p.ticker.substring(0, 35) + '...';
                
                html += `
                    <div style="background: linear-gradient(135deg, #11131a 0%, #050608 100%); border-left: 3px solid ${sideColor}; border-top: 1px solid #222; border-radius: 8px; padding: 12px; margin-bottom: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                        
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px; border-bottom: 1px solid #1a1a1a; padding-bottom: 8px;">
                            <div style="font-weight:bold; color:#fff; font-size:0.75rem; width: 75%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${p.ticker}">${shortTicker}</div>
                            <div style="color:${sideColor}; font-weight:bold; font-size:0.75rem; background:rgba(255,255,255,0.05); padding:2px 6px; border-radius:4px;">${count} ${side.toUpperCase()}</div>
                        </div>
                        
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
                            <div style="background: rgba(0,0,0,0.3); padding: 6px; border-radius: 4px; border: 1px solid #222;">
                                <div style="font-size:0.55rem; color:#888;">AVG COST</div>
                                <div style="font-size:0.85rem; color:#fff; font-family:'Martian Mono', monospace;">${costBasisCents.toFixed(1)}¢ <span style="font-size:0.6rem; color:#aaa;">($${totalCostDollars})</span></div>
                            </div>
                            <div style="background: rgba(0,0,0,0.3); padding: 6px; border-radius: 4px; border: 1px solid #222;">
                                <div style="font-size:0.55rem; color:#888;">CURRENT BID (VALUE)</div>
                                <div style="font-size:0.85rem; color:#C6FF00; font-family:'Martian Mono', monospace;">${currentBidCents}¢ <span style="font-size:0.6rem; color:#aaa;">($${currentValDollars})</span></div>
                            </div>
                            <div style="grid-column: 1 / -1; background: rgba(0,0,0,0.3); padding: 6px; border-radius: 4px; border: 1px solid #222; display:flex; justify-content:space-between; align-items:center;">
                                <div style="font-size:0.65rem; color:#888; font-weight:bold;">UNREALIZED P/L:</div>
                                <div style="font-size:0.9rem; color:${pnlColor}; font-family:'Martian Mono', monospace; font-weight:bold;">${pnlSign}$${pnlDollars}</div>
                            </div>
                        </div>

                        <div style="display:flex; justify-content:space-between; gap: 8px;">
                            <button class="btn" style="flex:1; padding:8px 0; font-size:0.65rem; background:rgba(255, 255, 255, 0.05); border: 1px solid #333;" onclick="app.kalshiPortfolio.stageSell('${p.ticker}', '${side}', ${count})">SELL LIMIT</button>
                            <button class="btn" style="flex:1; padding:8px 0; font-size:0.65rem; background:rgba(255, 82, 82, 0.1); color:#FF5252; border: 1px solid #FF5252;" onclick="app.kalshiPortfolio.executeMarketSell('${p.ticker}', '${side}', ${count}, ${currentBidCents})">CASH OUT (MKT)</button>
                        </div>
                    </div>
                `;
            });
            
            if (html === '') html = '<div style="color:#555; text-align:center; padding:10px;">No active positions found in wallet.</div>';
            div.innerHTML = html;
        },
        
        stageSell: (ticker, side, maxCount) => {
            const price = prompt(`MARKET: ${ticker}\nSIDE: ${side.toUpperCase()}\n\nSet your target SELL PRICE (1 to 99 cents):`);
            if(!price || isNaN(price) || price < 1 || price > 99) return;
            
            const sellCount = prompt(`How many contracts do you want to sell at ${price}¢?\n(You currently have ${maxCount} available)`, maxCount);
            if(!sellCount || isNaN(sellCount) || sellCount < 1 || sellCount > maxCount) return;
            
            app.kalshiPortfolio.executeOrder(ticker, side, parseInt(sellCount), 'limit', parseInt(price));
        },

        executeMarketSell: (ticker, side, count, currentBid) => {
            if(!confirm(`⚠️ INSTANT CASH OUT ⚠️\n\nYou are about to MARKET SELL ${count} [${side.toUpperCase()}] contracts.\n\nThe current highest bid is ${currentBid}¢.\nAre you sure you want to dump these instantly?`)) return;
            
            app.kalshiPortfolio.executeOrder(ticker, side, count, 'market', null);
        },
        
        executeOrder: async (ticker, side, count, type, price) => {
            const div = document.getElementById('k-port-res');
            div.innerHTML = `<div style="color:#FFEA00; text-align:center; padding:20px; font-weight:bold;">Executing ${type.toUpperCase()} Order on Exchange...</div>`;

            const body = {
                action: 'sell',
                count: count,
                side: side,
                ticker: ticker,
                type: type, // 'limit' or 'market'
                expiration_ts: null
            };

            if (type === 'limit') {
                if (side === 'yes') body.yes_price = price;
                if (side === 'no') body.no_price = price;
            }
            
            const res = await app.bot.request('POST', '/trade-api/v2/portfolio/orders', body);
            
            if(res && res.order) {
                alert(`✅ ${type.toUpperCase()} ORDER SUBMITTED!\n\nOrder ID: ${res.order.order_id}`);
                app.kalshiPortfolio.fetch(); // Auto-refresh the board
            } else {
                alert("❌ Order Rejected by Exchange. Check API limits or liquidity.");
                app.kalshiPortfolio.fetch(); // Reload the board
            }
        }
    },



            // --- PARLAY ENGINE v3 (PERSISTENCE + EVEN DISTRO) ---
    parlay: {
        currentEditId: null,

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

        // 2. UI MANAGEMENT & PERSISTENCE
        openLegModal: (id = null) => {
            app.data.parlayLegs = app.data.parlayLegs || [];
            if(id) {
                app.parlay.currentEditId = id;
                const l = app.data.parlayLegs.find(x => x.id === id);
                document.getElementById('leg-name').value = l.name;
                document.getElementById('leg-odds').value = l.odds;
                // Convert decimal back to 1-100% for the UI
                document.getElementById('leg-conf').value = l.customConf ? Math.round(l.conf * 100) : '';
                document.getElementById('leg-group-a').value = l.groupA || '';
                document.getElementById('leg-group-b').value = l.groupB || '';
                document.getElementById('leg-modal-title').innerText = "EDIT LEG";
            } else {
                app.parlay.currentEditId = null;
                document.getElementById('leg-name').value = '';
                document.getElementById('leg-odds').value = '-110';
                document.getElementById('leg-conf').value = '';
                document.getElementById('leg-group-a').value = '';
                document.getElementById('leg-group-b').value = '';
                document.getElementById('leg-modal-title').innerText = "ADD LEG";
            }
            document.getElementById('modal-leg').classList.add('open');
        },

        saveLeg: () => {
            app.data.parlayLegs = app.data.parlayLegs || [];
            const name = document.getElementById('leg-name').value || 'Untitled';
            const odds = parseFloat(document.getElementById('leg-odds').value) || -110;
            const groupA = document.getElementById('leg-group-a').value.trim();
            const groupB = document.getElementById('leg-group-b').value.trim();
            const confInput = parseFloat(document.getElementById('leg-conf').value); // 1-100

            const dec = app.parlay.americanToDecimal(odds);
            const implied = 1 / dec;
            
            let conf = implied;
            let customConf = false;
            if (!isNaN(confInput) && confInput > 0 && confInput <= 100) {
                conf = confInput / 100; // Convert to decimal for math
                customConf = true;
            }

            const legObj = {
                id: app.parlay.currentEditId || Date.now().toString(),
                name, odds, dec, groupA, groupB, conf, customConf,
                active: true // Default to selected
            };

            if (app.parlay.currentEditId) {
                const i = app.data.parlayLegs.findIndex(x => x.id === app.parlay.currentEditId);
                if (i > -1) {
                    // Preserve active state when editing
                    legObj.active = app.data.parlayLegs[i].active; 
                    app.data.parlayLegs[i] = legObj;
                }
            } else {
                app.data.parlayLegs.push(legObj);
            }

            app.save();
            document.getElementById('modal-leg').classList.remove('open');
            app.parlay.renderLegs();
        },

        toggleLeg: (id) => {
            const l = app.data.parlayLegs.find(x => x.id === id);
            if(l) { l.active = !l.active; app.save(); app.parlay.renderLegs(); }
        },

        removeLeg: (id) => {
            if(confirm("Delete this leg?")) {
                app.data.parlayLegs = app.data.parlayLegs.filter(x => x.id !== id);
                app.save();
                app.parlay.renderLegs();
            }
        },
        
        clearLegs: () => {
            if(confirm("Clear ALL legs and saved tickets?")) {
                app.data.parlayLegs = [];
                app.data.parlayTickets = [];
                app.save();
                app.parlay.renderLegs();
                app.parlay.renderSavedTickets();
            }
        },

        renderLegs: () => {
            app.data.parlayLegs = app.data.parlayLegs || [];
            const div = document.getElementById('pe-legs-list');
            
            const activeCount = app.data.parlayLegs.filter(l => l.active).length;
            document.getElementById('pe-leg-count').innerText = `${activeCount}/${app.data.parlayLegs.length} Selected`;
            
            if(app.data.parlayLegs.length === 0) {
                div.innerHTML = '<div style="text-align:center; color:#555; padding:10px;">No legs added.</div>';
                return;
            }

            div.innerHTML = app.data.parlayLegs.map(l => `
                <div style="background:#111; border:1px solid ${l.active ? '#00FF41' : '#333'}; padding:8px; margin-bottom:5px; border-radius:4px; display:flex; align-items:center; opacity: ${l.active ? '1' : '0.5'}; transition:0.3s;">
                    <input type="checkbox" class="visible-box" style="margin:0 10px 0 0 !important; width:18px !important; height:18px !important;" ${l.active ? 'checked' : ''} onchange="app.parlay.toggleLeg('${l.id}')">
                    
                    <div style="flex-grow:1; cursor:pointer;" onclick="app.parlay.openLegModal('${l.id}')">
                        <div style="font-weight:bold; color:#fff;">${l.name}</div>
                        <div style="font-size:0.65rem; color:#aaa;">
                            ${l.odds > 0 ? '+'+l.odds : l.odds} • ${(l.conf*100).toFixed(1)}% Win
                            ${l.groupA ? `<span style="color:#FF5252; margin-left:4px;">⛔ ${l.groupA}</span>` : ''}
                            ${l.groupB ? `<span style="color:#FFAB40; margin-left:4px;">🔗 ${l.groupB}</span>` : ''}
                        </div>
                    </div>
                    <i class="material-icons-round" style="color:#FF5252; font-size:18px; cursor:pointer; padding:5px;" onclick="app.parlay.removeLeg('${l.id}')">delete</i>
                </div>
            `).join('');
        },

        // 3. THE ADVANCED ALGORITHM (Now with Even Distribution)
        generate: () => {
            app.data.parlayLegs = app.data.parlayLegs || [];
            const activeLegs = app.data.parlayLegs.filter(l => l.active);
            if(activeLegs.length < 2) return alert("Select at least 2 active legs.");

            // Inputs
            const bankroll = parseFloat(document.getElementById('pe-bankroll').value) || 1000;
            const kellyFrac = parseFloat(document.getElementById('pe-kelly').value) || 0.25;
            const minLegs = parseInt(document.getElementById('pe-min').value) || 2;
            const maxLegs = parseInt(document.getElementById('pe-max').value) || 4;
            const targetCount = parseInt(document.getElementById('pe-count').value) || 10;
            const maxExposurePct = (parseFloat(document.getElementById('pe-exposure').value) || 50) / 100;
            const strategyMix = (parseInt(document.getElementById('pe-strategy').value) || 30) / 100;
            const isEvenDist = document.getElementById('pe-even').checked;

            const resultsDiv = document.getElementById('pe-results');
            resultsDiv.innerHTML = '<div style="text-align:center; color:#aaa; margin-top:20px;">Running Simulations...</div>';

            // A. GENERATE MEGA POOL
            let pool = [];
            const uniqueHashes = new Set();
            let attempts = 0;

            while (pool.length < 3000 && attempts < 15000) {
                attempts++;
                const size = Math.floor(Math.random() * (maxLegs - minLegs + 1)) + minLegs;
                const shuffled = [...activeLegs].sort(() => 0.5 - Math.random());
                
                const combo = [];
                const usedGroupA = new Set();
                const usedGroupB = new Set();

                for(let leg of shuffled) {
                    if (combo.length >= size) break;
                    if (leg.groupA && usedGroupA.has(leg.groupA)) continue; 
                    if (leg.groupB && usedGroupB.has(leg.groupB)) continue; 

                    combo.push(leg);
                    if(leg.groupA) usedGroupA.add(leg.groupA);
                    if(leg.groupB) usedGroupB.add(leg.groupB);
                }

                if(combo.length < minLegs) continue;

                combo.sort((a,b) => a.id > b.id ? 1 : -1);
                const hash = combo.map(c => c.id).join('|');
                if(uniqueHashes.has(hash)) continue;
                uniqueHashes.add(hash);

                const totalDec = combo.reduce((acc, l) => acc * l.dec, 1);
                const trueProb = combo.reduce((acc, l) => acc * l.conf, 1);
                
                const b = totalDec - 1;
                const p = trueProb;
                const q = 1 - p;
                let f = ((b * p) - q) / b;
                const wager = Math.max(0, bankroll * (f * kellyFrac));
                const ev = (p * (totalDec * wager - wager)) - (q * wager);

                // Only keep positive EV or non-zero bets
                if(ev > 0 && wager > 0) {
                    pool.push({ legs: combo, odds: totalDec, prob: trueProb, wager, ev, payout: wager * totalDec });
                }
            }

            // B. SELECTION ALGORITHM
            const finalPortfolio = [];
            const legCounts = {}; // For hard max exposure limit

            const canAdd = (bet) => {
                for(let l of bet.legs) {
                    const currentCount = legCounts[l.id] || 0;
                    if ((currentCount + 1) / targetCount > maxExposurePct) return false;
                }
                return true;
            };

            const commit = (bet) => {
                finalPortfolio.push(bet);
                for(let l of bet.legs) {
                    legCounts[l.id] = (legCounts[l.id] || 0) + 1;
                }
            };

            if (isEvenDist) {
                // --- THE EVEN DISTRIBUTION ENGINE ---
                let usage = {};
                activeLegs.forEach(l => usage[l.id] = 0);

                let escapeHatch = 0;
                while (finalPortfolio.length < targetCount && pool.length > 0 && escapeHatch < 5000) {
                    escapeHatch++;
                    
                    // 1. Find the leg(s) used the absolute least so far
                    let minUse = Math.min(...Object.values(usage));
                    let candidateLegIds = Object.keys(usage).filter(id => usage[id] === minUse);
                    let targetLegId = candidateLegIds[Math.floor(Math.random() * candidateLegIds.length)];

                    // 2. Filter the remaining pool for tickets containing this neglected leg
                    let validTickets = pool.filter(t => t.legs.some(l => l.id === targetLegId));

                    if (validTickets.length === 0) {
                        // This leg is impossible to place anymore (due to limits/conflicts). Stop trying to balance it.
                        delete usage[targetLegId];
                        if (Object.keys(usage).length === 0) break;
                        continue;
                    }

                    // 3. Apply Strategy Mix (Greedy EV vs Random)
                    let pickedTicket;
                    if (Math.random() > strategyMix) { 
                        validTickets.sort((a,b) => b.ev - a.ev); // Top EV
                        pickedTicket = validTickets[0];
                    } else {
                        pickedTicket = validTickets[Math.floor(Math.random() * validTickets.length)]; // Random Diversity
                    }

                    // 4. Try to commit
                    if (canAdd(pickedTicket)) {
                        commit(pickedTicket);
                        // Update our local balancing tracker
                        for(let l of pickedTicket.legs) {
                            if(usage[l.id] !== undefined) usage[l.id]++;
                        }
                        // Remove from pool so we don't pick it twice
                        pool = pool.filter(t => t !== pickedTicket);
                    } else {
                        // Max exposure hit. Burn the ticket from the pool and try again next loop
                        pool = pool.filter(t => t !== pickedTicket);
                    }
                }

            } else {
                // --- STANDARD ENGINE (Top-Heavy / Greedy) ---
                pool.sort((a, b) => b.ev - a.ev); 

                const greedyTarget = Math.floor(targetCount * (1 - strategyMix));
                for (let i = 0; i < pool.length; i++) {
                    if (finalPortfolio.length >= greedyTarget) break;
                    if (canAdd(pool[i])) commit(pool[i]);
                }

                const remainingPool = pool.filter(p => !finalPortfolio.includes(p));
                remainingPool.sort(() => 0.5 - Math.random()); 
                for (let i = 0; i < remainingPool.length; i++) {
                    if (finalPortfolio.length >= targetCount) break;
                    if (canAdd(remainingPool[i])) commit(remainingPool[i]);
                }
            }

            // Save to memory so it doesn't wipe on reload
            app.data.parlayTickets = finalPortfolio;
            app.save();
            app.parlay.renderSavedTickets();
        },

        renderSavedTickets: () => {
            const resultsDiv = document.getElementById('pe-results');
            const tickets = app.data.parlayTickets || [];
            
            if (tickets.length === 0) {
                resultsDiv.innerHTML = '';
                return;
            }

            resultsDiv.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; margin-top:20px; border-bottom:1px solid #333; padding-bottom:10px;">
                    <h3 style="margin:0;">${tickets.length} ACTIVE TICKETS</h3>
                </div>
            ` + tickets.map((t, i) => {
                const amer = app.parlay.decimalToAmerican(t.odds);
                const oddsStr = amer > 0 ? `+${amer.toFixed(0)}` : amer.toFixed(0);
                
                return `
                <div class="card" style="border-left: 4px solid #00FF41; margin-bottom:10px; padding:12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                        <span style="font-weight:bold; color:#00FF41;">TICKET #${i+1}</span>
                        <span style="font-weight:bold; color:#fff; font-size:1.1rem;">${oddsStr}</span>
                    </div>
                    <div style="font-size:0.8rem; color:#ccc; margin-bottom:12px; line-height:1.4;">
                        ${t.legs.map(l => `• ${l.name}`).join('<br>')}
                    </div>
                    <div style="background:#0a0a0a; padding:8px; border-radius:4px; font-size:0.75rem; display:flex; justify-content:space-between; border:1px solid #333;">
                        <span style="color:#aaa;">Bet: <b style="color:#fff; font-size:0.85rem;">$${t.wager.toFixed(2)}</b></span>
                        <span style="color:#aaa;">Pay: <b style="color:#00E676; font-size:0.85rem;">$${t.payout.toFixed(2)}</b></span>
                        <span style="color:#aaa;">EV: <b style="color:#00FF41;">$${t.ev.toFixed(2)}</b></span>
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
        


    colors: { pokerCash:'#1DE9B6', pokerTourney:'#3D5AFE', bets:'#FF6D00', job:'#00C853', sales:'#F50057', crypto:'#FFD600', dice:'#2962FF', casino:'#C51162', kalshi:'#C6FF00', expenses:'#D50000', miscIncome:'#AA00FF' },


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
        // Global Chart.js UI Overrides (Bloomberg Terminal Style)
        Chart.defaults.color = '#888'; 
        Chart.defaults.font.family = "'Chakra Petch', sans-serif"; 
        Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.03)'; // Barely visible ghost grid
        Chart.defaults.scale.grid.borderColor = 'rgba(255, 255, 255, 0.1)'; 
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(5, 5, 5, 0.95)'; // Pitch black tooltips
        Chart.defaults.plugins.tooltip.titleColor = '#FF007F'; // Neon Pink Titles
        Chart.defaults.plugins.tooltip.padding = 12;
        Chart.defaults.plugins.tooltip.cornerRadius = 8;
        Chart.defaults.plugins.tooltip.borderColor = '#333';
        Chart.defaults.plugins.tooltip.borderWidth = 1;
        Chart.defaults.plugins.tooltip.titleFont = { size: 13, family: "'Chakra Petch', sans-serif", weight: 'bold' };

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
        app.iconTools.init();

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
                if(app.parlay) {
            app.parlay.renderLegs();
            app.parlay.renderSavedTickets();
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

                    // --- ICON EXPLORER ENGINE (OFFLINE PRO VERSION) ---
    iconTools: {
        // Massive hardcoded dictionary of 1,200+ Material Icons (Zero Network Required)
        allIcons: ["10k","10mp","11mp","12mp","13mp","14mp","15mp","16mp","17mp","18mp","19mp","1x_mobiledata","20mp","21mp","22mp","23mp","24mp","30fps","30fps_select","360","3d_rotation","3p","4g","4g_mobiledata","4g_plus_mobiledata","5g","60fps","60fps_select","8k","8k_plus","8mp","9mp","abc","ac_unit","access_alarm","access_alarms","access_time","access_time_filled","accessibility","accessibility_new","accessible","accessible_forward","account_balance","account_balance_wallet","account_box","account_circle","account_tree","ad_units","adb","add","add_a_photo","add_alarm","add_alert","add_box","add_business","add_card","add_chart","add_circle","add_circle_outline","add_comment","add_ic_call","add_link","add_location","add_location_alt","add_moderator","add_photo_alternate","add_reaction","add_road","add_shopping_cart","add_task","add_to_drive","add_to_home_screen","add_to_photos","add_to_queue","adjust","admin_panel_settings","ads_click","agriculture","air","airline_seat_flat","airline_seat_flat_angled","airline_seat_individual_suite","airline_seat_legroom_extra","airline_seat_legroom_normal","airline_seat_legroom_reduced","airline_seat_recline_extra","airline_seat_recline_normal","airline_stops","airlines","airplane_ticket","airplanemode_active","airplanemode_inactive","airplay","airport_shuttle","alarm","alarm_add","alarm_off","alarm_on","album","align_horizontal_center","align_horizontal_left","align_horizontal_right","align_vertical_bottom","align_vertical_center","align_vertical_top","all_inbox","all_inclusive","all_out","alt_route","alternate_email","analytics","anchor","android","animation","announcement","aod","apartment","api","app_blocking","app_registration","app_settings_alt","app_shortcut","apple","approval","apps","apps_outage","architecture","archive","area_chart","arrow_back","arrow_back_ios","arrow_back_ios_new","arrow_circle_down","arrow_circle_left","arrow_circle_right","arrow_circle_up","arrow_downward","arrow_drop_down","arrow_drop_down_circle","arrow_drop_up","arrow_forward","arrow_forward_ios","arrow_left","arrow_right","arrow_right_alt","arrow_upward","art_track","article","aspect_ratio","assessment","assignment","assignment_ind","assignment_late","assignment_return","assignment_returned","assignment_turned_in","assistant","assistant_direction","assistant_photo","assured_workload","atm","attach_email","attach_file","attach_money","attachment","attractions","attribution","audio_file","audiotrack","auto_awesome","auto_awesome_mosaic","auto_awesome_motion","auto_delete","auto_fix_high","auto_fix_normal","auto_fix_off","auto_graph","auto_stories","autofps_select","autorenew","av_timer","baby_changing_station","back_hand","backpack","backspace","backup","backup_table","badge","bakery_dining","balance","balcony","ballot","bar_chart","batch_prediction","bathroom","bathtub","battery_0_bar","battery_1_bar","battery_2_bar","battery_3_bar","battery_4_bar","battery_5_bar","battery_6_bar","battery_alert","battery_charging_full","battery_full","battery_saver","battery_std","battery_unknown","beach_access","bed","bedroom_baby","bedroom_child","bedroom_parent","bedtime","bedtime_off","beenhere","bento","bike_scooter","biotech","blender","block","bloodtype","bluetooth","bluetooth_audio","bluetooth_connected","bluetooth_disabled","bluetooth_drive","bluetooth_searching","blur_circular","blur_linear","blur_off","blur_on","bolt","book","book_online","bookmark","bookmark_add","bookmark_added","bookmark_border","bookmark_remove","bookmarks","border_all","border_bottom","border_clear","border_color","border_horizontal","border_inner","border_left","border_outer","border_right","border_style","border_top","border_vertical","boy","branding_watermark","breakfast_dining","brightness_1","brightness_2","brightness_3","brightness_4","brightness_5","brightness_6","brightness_7","brightness_auto","brightness_high","brightness_low","brightness_medium","broken_image","browser_not_supported","browser_updated","brunch_dining","brush","bubble_chart","bug_report","build","build_circle","bungalow","burst_mode","bus_alert","business","business_center","cabin","cable","cached","cake","calculate","calendar_month","calendar_today","calendar_view_day","calendar_view_month","calendar_view_week","call","call_end","call_made","call_merge","call_missed","call_missed_outgoing","call_received","call_split","call_to_action","camera","camera_alt","camera_enhance","camera_front","camera_indoor","camera_outdoor","camera_rear","camera_roll","cameraswitch","campaign","cancel","cancel_presentation","cancel_schedule_send","candlestick_chart","car_crash","car_rental","car_repair","card_giftcard","card_membership","card_travel","carpenter","cases","casino","cast","cast_connected","cast_for_education","castle","catching_pokemon","category","celebration","cell_wifi","center_focus_strong","center_focus_weak","chair","chair_alt","chalet","change_circle","change_history","charging_station","chat","chat_bubble","chat_bubble_outline","check","check_box","check_box_outline_blank","check_circle","check_circle_outline","checklist","checklist_rtl","checkroom","chevron_left","chevron_right","child_care","child_friendly","chrome_reader_mode","church","circle","circle_notifications","class","clean_hands","cleaning_services","clear","clear_all","close","close_fullscreen","closed_caption","closed_caption_disabled","closed_caption_off","cloud","cloud_circle","cloud_done","cloud_download","cloud_off","cloud_queue","cloud_sync","cloud_upload","co2","co_present","code","code_off","coffee","coffee_maker","collections","collections_bookmark","color_lens","colorize","comment","comment_bank","comments_disabled","commit","commute","compare","compare_arrows","compass_calibration","compost","compress","computer","confirmation_number","connect_without_contact","connected_tv","connecting_airports","construction","contact_mail","contact_page","contact_phone","contact_support","contactless","contacts","content_copy","content_cut","content_paste","content_paste_go","content_paste_off","content_paste_search","contrast","control_camera","control_point","control_point_duplicate","cookie","copy_all","copyright","coronavirus","corporate_fare","cottage","countertops","create","create_new_folder","credit_card","credit_card_off","credit_score","crib","crisis_alert","crop","crop_16_9","crop_3_2","crop_5_4","crop_7_5","crop_din","crop_free","crop_landscape","crop_original","crop_portrait","crop_rotate","crop_square","cruelty_free","css","currency_bitcoin","currency_exchange","currency_franc","currency_lira","currency_pound","currency_ruble","currency_rupee","currency_yen","currency_yuan","cyclone","dangerous","dark_mode","dashboard","dashboard_customize","data_array","data_exploration","data_object","data_saver_off","data_saver_on","data_thresholding","data_usage","dataset","dataset_linked","date_range","deck","dehaze","delete","delete_forever","delete_outline","delete_sweep","delivery_dining","density_large","density_medium","density_small","departure_board","description","deselect","design_services","desk","desktop_access_disabled","desktop_mac","desktop_windows","details","developer_board","developer_board_off","developer_mode","device_hub","device_thermostat","device_unknown","devices","devices_other","dialer_sip","dialpad","diamond","difference","dining","dinner_dining","directions","directions_bike","directions_boat","directions_boat_filled","directions_bus","directions_bus_filled","directions_car","directions_car_filled","directions_off","directions_railway","directions_railway_filled","directions_run","directions_subway","directions_subway_filled","directions_transit","directions_transit_filled","directions_walk","dirty_lens","disabled_by_default","disabled_visible","disc_full","discount","display_settings","dns","do_disturb","do_disturb_alt","do_disturb_off","do_disturb_on","do_not_disturb","do_not_disturb_alt","do_not_disturb_off","do_not_disturb_on","do_not_disturb_on_total_silence","do_not_step","do_not_touch","dock","document_scanner","domain","domain_add","domain_disabled","domain_verification","done","done_all","done_outline","donut_large","donut_small","door_back","door_front","door_sliding","doorbell","double_arrow","downhill_skiing","download","download_done","download_for_offline","downloading","drafts","drag_handle","drag_indicator","draw","drive_eta","drive_file_move","drive_file_move_rtl","drive_file_rename_outline","drive_folder_upload","dry","dry_cleaning","duo","dvr","dynamic_feed","dynamic_form","e_mobiledata","earbuds","earbuds_battery","east","edgesensor_high","edgesensor_low","edgesensor_clear","edit","edit_attributes","edit_calendar","edit_location","edit_location_alt","edit_note","edit_notifications","edit_off","edit_road","egg","egg_alt","eject","elderly","elderly_woman","electric_bike","electric_car","electric_moped","electric_rickshaw","electric_scooter","electrical_services","elevator","email","emergency","emoji_emotions","emoji_events","emoji_flags","emoji_food_beverage","emoji_nature","emoji_objects","emoji_people","emoji_symbols","emoji_transportation","engineering","enhanced_encryption","equalizer","error","error_outline","escalator","escalator_warning","euro","euro_symbol","ev_station","event","event_available","event_busy","event_note","event_repeat","event_seat","exit_to_app","expand","expand_circle_down","expand_less","expand_more","explicit","explore","explore_off","exposure","exposure_neg_1","exposure_neg_2","exposure_plus_1","exposure_plus_2","exposure_zero","extension","extension_off","face","face_retouching_natural","face_retouching_off","fact_check","factory","family_restroom","fast_forward","fast_rewind","fastfood","favorite","favorite_border","fax","featured_play_list","featured_video","feed","feedback","female","fence","festival","fiber_dvr","fiber_manual_record","fiber_new","fiber_pin","fiber_smart_record","file_copy","file_download","file_download_done","file_download_off","file_open","file_present","file_upload","filter","filter_1","filter_2","filter_3","filter_4","filter_5","filter_6","filter_7","filter_8","filter_9","filter_9_plus","filter_alt","filter_alt_off","filter_b_and_w","filter_center_focus","filter_drama","filter_frames","filter_hdr","filter_list","filter_list_off","filter_none","filter_tilt_shift","filter_vintage","find_in_page","find_replace","fingerprint","fire_extinguisher","fireplace","fit_screen","fitbit","fitness_center","flag","flag_circle","flaky","flare","flash_auto","flash_off","flash_on","flashlight_off","flashlight_on","flatware","flight","flight_class","flight_land","flight_takeoff","flip","flip_camera_android","flip_camera_ios","flip_to_back","flip_to_front","flourescent","flutter_dash","fmd_bad","fmd_good","folder","folder_copy","folder_delete","folder_off","folder_open","folder_shared","folder_special","folder_zip","follow_the_signs","font_download","font_download_off","food_bank","forest","fork_left","fork_right","format_align_center","format_align_justify","format_align_left","format_align_right","format_bold","format_clear","format_color_fill","format_color_reset","format_color_text","format_indent_decrease","format_indent_increase","format_italic","format_line_spacing","format_list_bulleted","format_list_numbered","format_list_numbered_rtl","format_paint","format_quote","format_shapes","format_size","format_strikethrough","format_textdirection_l_to_r","format_textdirection_r_to_l","format_underlined","fort","forum","forward","forward_10","forward_30","forward_5","forward_to_inbox","foundation","free_breakfast","free_cancellation","front_hand","fullscreen","fullscreen_exit","functions","gamepad","games","garage","gavel","generating_tokens","gesture","get_app","gif","gif_box","girl","gite","golf_course","gpp_bad","gpp_good","gpp_maybe","gps_fixed","gps_not_fixed","gps_off","grade","gradient","grading","grain","graphic_eq","grass","grid_3x3","grid_4x4","grid_goldenratio","grid_off","grid_on","grid_view","group","group_add","group_remove","group_work","groups","h_mobiledata","h_plus_mobiledata","hail","handshake","handyman","hardware","hd","hdr_auto","hdr_auto_select","hdr_enhanced_select","hdr_off","hdr_off_select","hdr_on","hdr_on_select","hdr_plus","hdr_strong","hdr_weak","headphones","headphones_battery","headset","headset_mic","headset_off","healing","health_and_safety","hearing","hearing_disabled","heart_broken","height","help","help_center","help_outline","hevc","hexagon","hide_image","hide_source","high_quality","highlight","highlight_alt","highlight_off","hiking","history","history_edu","history_toggle_off","hive","hls","hls_off","holiday_village","home","home_max","home_mini","home_repair_service","home_work","horizontal_distribute","horizontal_rule","horizontal_split","hot_tub","hotel","hotel_class","hourglass_bottom","hourglass_disabled","hourglass_empty","hourglass_full","hourglass_top","house","house_siding","houseboat","how_to_reg","how_to_vote","html","http","https","hub","hvac","ice_skating","icecream","image","image_aspect_ratio","image_not_supported","image_search","imagesearch_roller","import_contacts","import_export","important_devices","inbox","incomplete_circle","indeterminate_check_box","info","input","insert_chart","insert_chart_outlined","insert_comment","insert_drive_file","insert_emoticon","insert_invitation","insert_link","insert_page_break","insert_photo","insights","install_desktop","install_mobile","integration_instructions","interests","interpreter_mode","inventory","inventory_2","invert_colors","invert_colors_off","ios_share","iron","iso","javascript","join_full","join_inner","join_left","join_right","kayaking","kebab_dining","key","key_off","keyboard","keyboard_alt","keyboard_arrow_down","keyboard_arrow_left","keyboard_arrow_right","keyboard_arrow_up","keyboard_backspace","keyboard_capslock","keyboard_command_key","keyboard_control_key","keyboard_double_arrow_down","keyboard_double_arrow_left","keyboard_double_arrow_right","keyboard_double_arrow_up","keyboard_hide","keyboard_option_key","keyboard_return","keyboard_tab","keyboard_voice","king_bed","kitchen","kitesurfing","label","label_important","label_off","lan","landscape","landslide","language","laptop","laptop_chromebook","laptop_mac","laptop_windows","last_page","launch","layers","layers_clear","leaderboard","leak_add","leak_remove","legend_toggle","lens","lens_blur","library_add","library_add_check","library_books","library_music","light","light_mode","lightbulb","line_axis","line_style","line_weight","linear_scale","link","link_off","linked_camera","liquor","list","list_alt","live_help","live_tv","living","local_activity","local_airport","local_atm","local_bar","local_cafe","local_car_wash","local_convenience_store","local_dining","local_drink","local_fire_department","local_florist","local_gas_station","local_grocery_store","local_hospital","local_hotel","local_laundry_service","local_library","local_mall","local_movies","local_offer","local_parking","local_pharmacy","local_phone","local_pizza","local_play","local_police","local_post_office","local_printshop","local_see","local_shipping","local_taxi","location_city","location_disabled","location_off","location_on","location_searching","lock","lock_clock","lock_open","lock_person","lock_reset","login","logo_dev","logout","looks","looks_3","looks_4","looks_5","looks_6","looks_one","looks_two","loop","loupe","low_priority","loyalty","lte_mobiledata","lte_plus_mobiledata","luggage","lunch_dining","mail","mail_outline","male","man","manage_accounts","manage_history","manage_search","map","maps_home_work","maps_ugc","margin","mark_as_unread","mark_chat_read","mark_chat_unread","mark_email_read","mark_email_unread","mark_unread_chat_alt","markunread","markunread_mailbox","masks","maximize","media_bluetooth_off","media_bluetooth_on","mediation","medical_information","medical_services","medication","medication_liquid","meeting_room","memory","menu","menu_book","menu_open","merge","merge_type","message","mic","mic_external_off","mic_external_on","mic_none","mic_off","microwave","military_tech","minimize","minor_crash","miscellaneous_services","missed_video_call","mms","mobile_friendly","mobile_off","mobile_screen_share","mobiledata_off","mode","mode_comment","mode_edit","mode_edit_outline","mode_night","mode_of_travel","mode_standby","model_training","monetization_on","money","money_off","money_off_csred","monitor","monitor_heart","monitor_weight","monochrome_photos","mood","mood_bad","moped","more","more_horiz","more_time","more_vert","mosque","motion_photos_auto","motion_photos_off","motion_photos_on","motion_photos_pause","motion_photos_paused","mouse","move_down","move_to_inbox","move_up","movie","movie_creation","movie_filter","moving","mp","multiline_chart","multiple_stop","museum","music_note","music_off","music_video","my_location","nat","nature","nature_people","navigate_before","navigate_next","navigation","near_me","near_me_disabled","nearby_error","nearby_off","network_cell","network_check","network_locked","network_ping","network_wifi","network_wifi_1_bar","network_wifi_2_bar","network_wifi_3_bar","new_label","new_releases","newspaper","next_plan","next_week","nfc","night_shelter","nightlife","nightlight","nightlight_round","nights_stay","no_accounts","no_adult_content","no_backpack","no_cell","no_crash","no_drinks","no_encryption","no_encryption_gmailerrorred","no_flash","no_food","no_luggage","no_meals","no_meeting_room","no_photography","no_sim","no_stroller","no_transfer","noise_aware","noise_control_off","nordic_walking","north","north_east","north_west","not_accessible","not_interested","not_listed_location","not_started","note","note_add","note_alt","notes","notification_add","notification_important","notifications","notifications_active","notifications_none","notifications_off","notifications_paused","numbers","offline_bolt","offline_pin","offline_share","ondemand_video","online_prediction","opacity","open_in_browser","open_in_full","open_in_new","open_in_new_off","open_with","other_houses","outbound","outbox","outdoor_grill","outlet","outlined_flag","output","padding","pages","pageview","palette","pan_tool","pan_tool_alt","panorama","panorama_fish_eye","panorama_horizontal","panorama_horizontal_select","panorama_photosphere","panorama_photosphere_select","panorama_vertical","panorama_vertical_select","panorama_wide_angle","panorama_wide_angle_select","paragliding","park","party_mode","password","pattern","pause","pause_circle","pause_circle_filled","pause_circle_outline","pause_presentation","payment","payments","pedal_bike","pending","pending_actions","pentagon","people","people_alt","people_outline","percent","perm_camera_mic","perm_contact_calendar","perm_data_setting","perm_device_information","perm_identity","perm_media","perm_phone_msg","perm_scan_wifi","person","person_add","person_add_alt","person_add_alt_1","person_add_disabled","person_off","person_outline","person_pin","person_pin_circle","person_remove","person_remove_alt_1","person_search","personal_injury","personal_video","pest_control","pest_control_rodent","pets","phishing","phone","phone_android","phone_bluetooth_speaker","phone_callback","phone_disabled","phone_enabled","phone_forwarded","phone_in_talk","phone_iphone","phone_locked","phone_missed","phone_paused","phonelink","phonelink_erase","phonelink_lock","phonelink_off","phonelink_ring","phonelink_setup","photo","photo_album","photo_camera","photo_camera_back","photo_camera_front","photo_filter","photo_library","photo_size_select_actual","photo_size_select_large","photo_size_select_small","php","piano","piano_off","picture_as_pdf","picture_in_picture","picture_in_picture_alt","pie_chart","pie_chart_outline","pin","pin_drop","pin_end","pin_invoke","pinch","pivot_table_chart","pix","place","plagiarism","play_arrow","play_circle","play_circle_filled","play_circle_outline","play_disabled","play_for_work","play_lesson","playlist_add","playlist_add_check","playlist_add_check_circle","playlist_add_circle","playlist_play","plumbing","plus_one","podcasts","point_of_sale","policy","poll","polyline","polymer","pool","portable_wifi_off","portrait","post_add","power","power_input","power_off","power_settings_new","precision_manufacturing","pregnating_woman","present_to_all","preview","price_change","price_check","print","print_disabled","priority_high","privacy_tip","private_connectivity","production_quantity_limits","propane","propane_tank","psychology","public","public_off","publish","published_with_changes","punch_clock","push_pin","qr_code","qr_code_2","qr_code_scanner","query_builder","query_stats","question_answer","question_mark","queue","queue_music","queue_play_next","quickreply","quiz","r_mobiledata","radar","radio","radio_button_checked","radio_button_unchecked","railway_alert","ramen_dining","ramp_left","ramp_right","rate_review","raw_on","raw_off","read_more","real_estate_agent","receipt","receipt_long","recent_actors","recommend","record_voice_over","rectangle","recycling","redeem","redo","reduce_capacity","refresh","remember_me","remove","remove_circle","remove_circle_outline","remove_done","remove_from_queue","remove_moderator","remove_red_eye","remove_shopping_cart","reorder","repeat","repeat_on","repeat_one","repeat_one_on","replay","replay_10","replay_30","replay_5","replay_circle_filled","reply","reply_all","report","report_gmailerrorred","report_off","report_problem","request_page","request_quote","reset_tv","restart_alt","restaurant","restaurant_menu","restore","restore_from_trash","restore_page","reviews","rice_bowl","ring_volume","rocket","rocket_launch","roller_shades","roller_shades_closed","roller_skating","roofing","room","room_preferences","room_service","rotate_90_degrees_ccw","rotate_90_degrees_cw","rotate_left","rotate_right","roundabout_left","roundabout_right","rounded_corner","route","router","rowing","rss_feed","rsvp","rtt","rule","rule_folder","run_circle","running_with_errors","rv_hookup","safety_divider","sailing","sanitizer","satellite","satellite_alt","save","save_alt","save_as","saved_search","savings","scale","scanner","scatter_plot","schedule","schedule_send","schema","school","science","score","scoreboard","screen_lock_landscape","screen_lock_portrait","screen_lock_rotation","screen_rotation","screen_rotation_alt","screen_search_desktop","screen_share","screenshot","scuba_diving","sd","sd_card","sd_card_alert","sd_storage","search","search_off","security","security_update","security_update_good","security_update_warning","segment","select_all","self_improvement","sell","send","send_and_archive","send_time_extension","send_to_mobile","sensor_door","sensor_window","sensors","sensors_off","sentiment_dissatisfied","sentiment_neutral","sentiment_satisfied","sentiment_satisfied_alt","sentiment_very_dissatisfied","sentiment_very_satisfied","set_meal","settings","settings_accessibility","settings_applications","settings_backup_restore","settings_bluetooth","settings_brightness","settings_cell","settings_ethernet","settings_input_antenna","settings_input_component","settings_input_composite","settings_input_hdmi","settings_input_svideo","settings_overscan","settings_phone","settings_power","settings_remote","settings_system_daydream","settings_voice","share","share_location","shield","shield_moon","shop","shop_2","shop_two","shopping_bag","shopping_basket","shopping_cart","shopping_cart_checkout","short_text","shortcut","show_chart","shower","shuffle","shuffle_on","shutter_speed","sick","sign_language","signal_cellular_0_bar","signal_cellular_4_bar","signal_cellular_alt","signal_cellular_alt_1_bar","signal_cellular_alt_2_bar","signal_cellular_connected_no_internet_0_bar","signal_cellular_connected_no_internet_4_bar","signal_cellular_no_sim","signal_cellular_nodata","signal_cellular_null","signal_cellular_off","signal_wifi_0_bar","signal_wifi_4_bar","signal_wifi_4_bar_lock","signal_wifi_bad","signal_wifi_connected_no_internet_4","signal_wifi_off","signal_wifi_statusbar_4_bar","signal_wifi_statusbar_connected_no_internet_4","signal_wifi_statusbar_null","signature","signpost","sim_card","sim_card_alert","sim_card_download","single_bed","sip","skateboarding","skip_next","skip_previous","sledding","slideshow","slow_motion_video","smart_button","smart_display","smart_screen","smart_toy","smartphone","smell","smile","smoke_free","smoking_rooms","sms","sms_failed","snippet_folder","snooze","snowboarding","snowmobile","snowshoeing","soap","social_distance","sort","sort_by_alpha","soup_kitchen","source","south","south_america","south_east","south_west","spa","space_bar","space_dashboard","spatial_audio","spatial_audio_off","spatial_tracking","speaker","speaker_group","speaker_notes","speaker_notes_off","speaker_phone","speed","spellcheck","splitscreen","spoke","sports","sports_bar","sports_baseball","sports_basketball","sports_cricket","sports_esports","sports_football","sports_golf","sports_gymnastics","sports_handball","sports_hockey","sports_kabaddi","sports_martial_arts","sports_mma","sports_motorsports","sports_rugby","sports_score","sports_soccer","sports_tennis","sports_volleyball","square","square_foot","ssid_chart","stacked_bar_chart","stacked_line_chart","stadium","stairs","star","star_border","star_border_purple500","star_half","star_outline","star_purple500","star_rate","stars","start","state_layer","stay_current_landscape","stay_current_portrait","stay_primary_landscape","stay_primary_portrait","sticky_note_2","stop","stop_circle","stop_screen_share","storage","store","store_mall_directory","storefront","storm","straight","straighten","stream","streetview","strikethrough_s","stroller","style","subdirectory_arrow_left","subdirectory_arrow_right","subject","subscript","subscriptions","subtitles","subtitles_off","subway","summarize","superscript","supervised_user_circle","supervisor_account","support","support_agent","surfing","surround_sound","swap_calls","swap_horiz","swap_horizontal_circle","swap_vert","swap_vertical_circle","swipe","swipe_down","swipe_down_alt","swipe_left","swipe_left_alt","swipe_right","swipe_right_alt","swipe_up","swipe_up_alt","switch_access_shortcut","switch_access_shortcut_add","switch_account","switch_camera","switch_left","switch_right","switch_video","synagogue","sync","sync_alt","sync_lock","sync_problem","system_security_update","system_security_update_good","system_security_update_warning","system_update","system_update_alt","tab","tab_unselected","table_bar","table_chart","table_restaurant","table_rows","table_view","tablet","tablet_android","tablet_mac","tag","tag_faces","takeout_dining","tap_and_play","tapas","task","task_alt","taxi_alert","temple_buddhist","temple_hindu","terminal","terrain","text_decrease","text_fields","text_format","text_increase","text_rotate_up","text_rotate_vertical","text_rotation_angledown","text_rotation_angleup","text_rotation_down","text_rotation_none","text_snippet","textsms","texture","theater_comedy","theaters","thermostat","thermostat_auto","thumb_down","thumb_down_alt","thumb_down_off_alt","thumb_up","thumb_up_alt","thumb_up_off_alt","thumbs_up_down","time_to_leave","timelapse","timeline","timer","timer_10","timer_10_select","timer_3","timer_3_select","timer_off","tips_and_updates","tire_repair","title","toc","today","toggle_off","toggle_on","token","toll","tonality","topic","touch_app","tour","toys","track_changes","traffic","train","tram","transcribe","transfer_within_a_station","transform","transgender","transit_enterexit","translate","travel_explore","trending_down","trending_flat","trending_up","trip_origin","try","tty","tune","tungsten","turn_left","turn_right","turn_sharp_left","turn_sharp_right","turn_slight_left","turn_slight_right","turned_in","turned_in_not","tv","tv_off","two_wheeler","type_specimen","u_turn_left","u_turn_right","umbrella","unarchive","undo","unfold_less","unfold_more","unpublished","unsubscribe","upcoming","update","update_disabled","upgrade","upload","upload_file","usb","usb_off","vaccines","vape_free","vaping_rooms","vector_circle","view_agenda","view_array","view_carousel","view_column","view_comfy","view_comfy_alt","view_compact","view_compact_alt","view_cozy","view_day","view_headline","view_in_ar","view_kanban","view_list","view_module","view_quilt","view_sidebar","view_stream","view_timeline","view_week","vignette","villa","visibility","visibility_off","voice_chat","voice_over_off","voicemail","volume_down","volume_mute","volume_off","volume_up","volunteer_activism","vpn_key","vpn_key_off","vpn_lock","vrpano","wallet","wallpaper","warning","warning_amber","wash","watch","watch_later","water","water_damage","water_drop","waterfall_chart","waves","waving_hand","wb_auto","wb_cloudy","wb_incandescent","wb_iridescent","wb_shade","wb_sunny","wb_twilight","wc","web","web_asset","web_asset_off","web_stories","webhook","weekend","west","whatsapp","whatshot","wheelchair_pickup","where_to_vote","widgets","wifi","wifi_calling","wifi_calling_3","wifi_channel","wifi_find","wifi_lock","wifi_off","wifi_password","wifi_protected_setup","wifi_tethering","wifi_tethering_error","wifi_tethering_off","window","wine_bar","woman","woo_commerce","work","work_history","work_off","work_outline","workspace_premium","workspaces","wrap_text","wrong_location","wysiwyg","yard","youtube_searched_for","zoom_in","zoom_in_map","zoom_out","zoom_out_map"],

        init: () => {
            // Nothing to fetch! Just instantly render.
            app.iconTools.render();
        },

        render: () => {
            const grid = document.getElementById('icon-explorer-res');
            let search = document.getElementById('icon-search').value.toLowerCase().replace(/ /g, '_');
            if (!grid) return;

            // Start with the entire hardcoded database
            let targetIcons = app.iconTools.allIcons;

            // Filter instantly based on search
            if (search) {
                targetIcons = targetIcons.filter(word => word.includes(search));
            }

            if (targetIcons.length === 0) {
                grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color:#555; padding:20px;">No icons found.</div>';
                return;
            }

            // SAFETY LIMIT: Only physically draw up to 150 cards so the phone doesn't freeze
            const displayLimit = 150;
            const displayIcons = targetIcons.slice(0, displayLimit);

            // Generate HTML
            let html = displayIcons.map(word => `
                <div class="icon-card" onclick="app.iconTools.copy('${word}', this)">
                    <i class="material-icons-round">${word}</i>
                    <span>${word}</span>
                </div>
            `).join('');

            // If there are more than 150 hidden results, tell the user!
            if (targetIcons.length > displayLimit) {
                html += `<div style="grid-column: 1/-1; text-align:center; color:#777; padding:15px; font-size:0.75rem; border-top:1px dashed #333; margin-top:10px;">
                    + ${targetIcons.length - displayLimit} more icons hidden to save memory.<br>Keep typing to narrow them down!
                </div>`;
            }

            grid.innerHTML = html;
        },

        copy: (word, el) => {
            navigator.clipboard.writeText(word);
            
            // Visual Click Feedback
            const originalHtml = el.innerHTML;
            el.innerHTML = `<i class="material-icons-round" style="color:#00E676;">check_circle</i><span style="color:#00E676; font-weight:bold;">COPIED!</span>`;
            el.style.borderColor = '#00E676';
            el.style.background = 'rgba(0, 230, 118, 0.1)';
            
            setTimeout(() => {
                el.innerHTML = originalHtml;
                el.style.borderColor = '#222';
                el.style.background = '';
            }, 800);
        }
    },



            // --- ICON EXPLORER ENGINE (2,600+ OFFICIAL MASTER LIST) ---
    iconDirectory: {
        isOpen: false,
        
        toggle: () => {
            app.iconDirectory.isOpen = !app.iconDirectory.isOpen;
            const container = document.getElementById('icon-dir-list');
            const btn = document.getElementById('btn-icon-dir');
            
            if (app.iconDirectory.isOpen) {
                btn.innerText = "HIDE LIST";
                container.style.display = "block";
                if (container.innerHTML.trim() === "") {
                    app.iconDirectory.render();
                }
            } else {
                btn.innerText = "LOAD LIST";
                container.style.display = "none";
            }
        },

        render: () => {
            const container = document.getElementById('icon-dir-list');
            container.innerHTML = '<div style="color:#AA00FF; text-align:center; padding:20px; font-weight:bold;">Generating 2,600+ icons...</div>';
            
            setTimeout(() => {
                // Here lies the full 2,600+ official Material Symbols dictionary!
                const allIcons = ["10k","10mp","11mp","12mp","13mp","14mp","15mp","16mp","17mp","18mp","19mp","1x_mobiledata","20mp","21mp","22mp","23mp","24mp","30fps","30fps_select","360","3d_rotation","3p","4g","4g_mobiledata","4g_plus_mobiledata","5g","60fps","60fps_select","8k","8k_plus","8mp","9mp","abc","ac_unit","access_alarm","access_alarms","access_time","access_time_filled","accessibility","accessibility_new","accessible","accessible_forward","account_balance","account_balance_wallet","account_box","account_circle","account_tree","ad_units","adb","add","add_a_photo","add_alarm","add_alert","add_box","add_business","add_card","add_chart","add_circle","add_circle_outline","add_comment","add_ic_call","add_link","add_location","add_location_alt","add_moderator","add_photo_alternate","add_reaction","add_road","add_shopping_cart","add_task","add_to_drive","add_to_home_screen","add_to_photos","add_to_queue","adjust","admin_panel_settings","ads_click","agriculture","air","airline_seat_flat","airline_seat_flat_angled","airline_seat_individual_suite","airline_seat_legroom_extra","airline_seat_legroom_normal","airline_seat_legroom_reduced","airline_seat_recline_extra","airline_seat_recline_normal","airline_stops","airlines","airplane_ticket","airplanemode_active","airplanemode_inactive","airplay","airport_shuttle","alarm","alarm_add","alarm_off","alarm_on","album","align_horizontal_center","align_horizontal_left","align_horizontal_right","align_vertical_bottom","align_vertical_center","align_vertical_top","all_inbox","all_inclusive","all_out","alt_route","alternate_email","analytics","anchor","android","animation","announcement","aod","apartment","api","app_blocking","app_registration","app_settings_alt","app_shortcut","apple","approval","apps","apps_outage","architecture","archive","area_chart","arrow_back","arrow_back_ios","arrow_back_ios_new","arrow_circle_down","arrow_circle_left","arrow_circle_right","arrow_circle_up","arrow_downward","arrow_drop_down","arrow_drop_down_circle","arrow_drop_up","arrow_forward","arrow_forward_ios","arrow_left","arrow_right","arrow_right_alt","arrow_upward","art_track","article","aspect_ratio","assessment","assignment","assignment_ind","assignment_late","assignment_return","assignment_returned","assignment_turned_in","assistant","assistant_direction","assistant_photo","assured_workload","atm","attach_email","attach_file","attach_money","attachment","attractions","attribution","audio_file","audiotrack","auto_awesome","auto_awesome_mosaic","auto_awesome_motion","auto_delete","auto_fix_high","auto_fix_normal","auto_fix_off","auto_graph","auto_stories","autofps_select","autorenew","av_timer","baby_changing_station","back_hand","backpack","backspace","backup","backup_table","badge","bakery_dining","balance","balcony","ballot","bar_chart","batch_prediction","bathroom","bathtub","battery_0_bar","battery_1_bar","battery_2_bar","battery_3_bar","battery_4_bar","battery_5_bar","battery_6_bar","battery_alert","battery_charging_full","battery_full","battery_saver","battery_std","battery_unknown","beach_access","bed","bedroom_baby","bedroom_child","bedroom_parent","bedtime","bedtime_off","beenhere","bento","bike_scooter","biotech","blender","block","bloodtype","bluetooth","bluetooth_audio","bluetooth_connected","bluetooth_disabled","bluetooth_drive","bluetooth_searching","blur_circular","blur_linear","blur_off","blur_on","bolt","book","book_online","bookmark","bookmark_add","bookmark_added","bookmark_border","bookmark_remove","bookmarks","border_all","border_bottom","border_clear","border_color","border_horizontal","border_inner","border_left","border_outer","border_right","border_style","border_top","border_vertical","boy","branding_watermark","breakfast_dining","brightness_1","brightness_2","brightness_3","brightness_4","brightness_5","brightness_6","brightness_7","brightness_auto","brightness_high","brightness_low","brightness_medium","broken_image","browser_not_supported","browser_updated","brunch_dining","brush","bubble_chart","bug_report","build","build_circle","bungalow","burst_mode","bus_alert","business","business_center","cabin","cable","cached","cake","calculate","calendar_month","calendar_today","calendar_view_day","calendar_view_month","calendar_view_week","call","call_end","call_made","call_merge","call_missed","call_missed_outgoing","call_received","call_split","call_to_action","camera","camera_alt","camera_enhance","camera_front","camera_indoor","camera_outdoor","camera_rear","camera_roll","cameraswitch","campaign","cancel","cancel_presentation","cancel_schedule_send","candlestick_chart","car_crash","car_rental","car_repair","card_giftcard","card_membership","card_travel","carpenter","cases","casino","cast","cast_connected","cast_for_education","castle","catching_pokemon","category","celebration","cell_wifi","center_focus_strong","center_focus_weak","chair","chair_alt","chalet","change_circle","change_history","charging_station","chat","chat_bubble","chat_bubble_outline","check","check_box","check_box_outline_blank","check_circle","check_circle_outline","checklist","checklist_rtl","checkroom","chevron_left","chevron_right","child_care","child_friendly","chrome_reader_mode","church","circle","circle_notifications","class","clean_hands","cleaning_services","clear","clear_all","close","close_fullscreen","closed_caption","closed_caption_disabled","closed_caption_off","cloud","cloud_circle","cloud_done","cloud_download","cloud_off","cloud_queue","cloud_sync","cloud_upload","co2","co_present","code","code_off","coffee","coffee_maker","collections","collections_bookmark","color_lens","colorize","comment","comment_bank","comments_disabled","commit","commute","compare","compare_arrows","compass_calibration","compost","compress","computer","confirmation_number","connect_without_contact","connected_tv","connecting_airports","construction","contact_mail","contact_page","contact_phone","contact_support","contactless","contacts","content_copy","content_cut","content_paste","content_paste_go","content_paste_off","content_paste_search","contrast","control_camera","control_point","control_point_duplicate","cookie","copy_all","copyright","coronavirus","corporate_fare","cottage","countertops","create","create_new_folder","credit_card","credit_card_off","credit_score","crib","crisis_alert","crop","crop_16_9","crop_3_2","crop_5_4","crop_7_5","crop_din","crop_free","crop_landscape","crop_original","crop_portrait","crop_rotate","crop_square","cruelty_free","css","currency_bitcoin","currency_exchange","currency_franc","currency_lira","currency_pound","currency_ruble","currency_rupee","currency_yen","currency_yuan","cyclone","dangerous","dark_mode","dashboard","dashboard_customize","data_array","data_exploration","data_object","data_saver_off","data_saver_on","data_thresholding","data_usage","dataset","dataset_linked","date_range","deck","dehaze","delete","delete_forever","delete_outline","delete_sweep","delivery_dining","density_large","density_medium","density_small","departure_board","description","deselect","design_services","desk","desktop_access_disabled","desktop_mac","desktop_windows","details","developer_board","developer_board_off","developer_mode","device_hub","device_thermostat","device_unknown","devices","devices_other","dialer_sip","dialpad","diamond","difference","dining","dinner_dining","directions","directions_bike","directions_boat","directions_boat_filled","directions_bus","directions_bus_filled","directions_car","directions_car_filled","directions_off","directions_railway","directions_railway_filled","directions_run","directions_subway","directions_subway_filled","directions_transit","directions_transit_filled","directions_walk","dirty_lens","disabled_by_default","disabled_visible","disc_full","discount","display_settings","dns","do_disturb","do_disturb_alt","do_disturb_off","do_disturb_on","do_not_disturb","do_not_disturb_alt","do_not_disturb_off","do_not_disturb_on","do_not_disturb_on_total_silence","do_not_step","do_not_touch","dock","document_scanner","domain","domain_add","domain_disabled","domain_verification","done","done_all","done_outline","donut_large","donut_small","door_back","door_front","door_sliding","doorbell","double_arrow","downhill_skiing","download","download_done","download_for_offline","downloading","drafts","drag_handle","drag_indicator","draw","drive_eta","drive_file_move","drive_file_move_rtl","drive_file_rename_outline","drive_folder_upload","dry","dry_cleaning","duo","dvr","dynamic_feed","dynamic_form","e_mobiledata","earbuds","earbuds_battery","east","edgesensor_high","edgesensor_low","edgesensor_clear","edit","edit_attributes","edit_calendar","edit_location","edit_location_alt","edit_note","edit_notifications","edit_off","edit_road","egg","egg_alt","eject","elderly","elderly_woman","electric_bike","electric_car","electric_moped","electric_rickshaw","electric_scooter","electrical_services","elevator","email","emergency","emoji_emotions","emoji_events","emoji_flags","emoji_food_beverage","emoji_nature","emoji_objects","emoji_people","emoji_symbols","emoji_transportation","engineering","enhanced_encryption","equalizer","error","error_outline","escalator","escalator_warning","euro","euro_symbol","ev_station","event","event_available","event_busy","event_note","event_repeat","event_seat","exit_to_app","expand","expand_circle_down","expand_less","expand_more","explicit","explore","explore_off","exposure","exposure_neg_1","exposure_neg_2","exposure_plus_1","exposure_plus_2","exposure_zero","extension","extension_off","face","face_retouching_natural","face_retouching_off","fact_check","factory","family_restroom","fast_forward","fast_rewind","fastfood","favorite","favorite_border","fax","featured_play_list","featured_video","feed","feedback","female","fence","festival","fiber_dvr","fiber_manual_record","fiber_new","fiber_pin","fiber_smart_record","file_copy","file_download","file_download_done","file_download_off","file_open","file_present","file_upload","filter","filter_1","filter_2","filter_3","filter_4","filter_5","filter_6","filter_7","filter_8","filter_9","filter_9_plus","filter_alt","filter_alt_off","filter_b_and_w","filter_center_focus","filter_drama","filter_frames","filter_hdr","filter_list","filter_list_off","filter_none","filter_tilt_shift","filter_vintage","find_in_page","find_replace","fingerprint","fire_extinguisher","fireplace","fit_screen","fitbit","fitness_center","flag","flag_circle","flaky","flare","flash_auto","flash_off","flash_on","flashlight_off","flashlight_on","flatware","flight","flight_class","flight_land","flight_takeoff","flip","flip_camera_android","flip_camera_ios","flip_to_back","flip_to_front","flourescent","flutter_dash","fmd_bad","fmd_good","folder","folder_copy","folder_delete","folder_off","folder_open","folder_shared","folder_special","folder_zip","follow_the_signs","font_download","font_download_off","food_bank","forest","fork_left","fork_right","format_align_center","format_align_justify","format_align_left","format_align_right","format_bold","format_clear","format_color_fill","format_color_reset","format_color_text","format_indent_decrease","format_indent_increase","format_italic","format_line_spacing","format_list_bulleted","format_list_numbered","format_list_numbered_rtl","format_paint","format_quote","format_shapes","format_size","format_strikethrough","format_textdirection_l_to_r","format_textdirection_r_to_l","format_underlined","fort","forum","forward","forward_10","forward_30","forward_5","forward_to_inbox","foundation","free_breakfast","free_cancellation","front_hand","fullscreen","fullscreen_exit","functions","gamepad","games","garage","gavel","generating_tokens","gesture","get_app","gif","gif_box","girl","gite","golf_course","gpp_bad","gpp_good","gpp_maybe","gps_fixed","gps_not_fixed","gps_off","grade","gradient","grading","grain","graphic_eq","grass","grid_3x3","grid_4x4","grid_goldenratio","grid_off","grid_on","grid_view","group","group_add","group_remove","group_work","groups","h_mobiledata","h_plus_mobiledata","hail","handshake","handyman","hardware","hd","hdr_auto","hdr_auto_select","hdr_enhanced_select","hdr_off","hdr_off_select","hdr_on","hdr_on_select","hdr_plus","hdr_strong","hdr_weak","headphones","headphones_battery","headset","headset_mic","headset_off","healing","health_and_safety","hearing","hearing_disabled","heart_broken","height","help","help_center","help_outline","hevc","hexagon","hide_image","hide_source","high_quality","highlight","highlight_alt","highlight_off","hiking","history","history_edu","history_toggle_off","hive","hls","hls_off","holiday_village","home","home_max","home_mini","home_repair_service","home_work","horizontal_distribute","horizontal_rule","horizontal_split","hot_tub","hotel","hotel_class","hourglass_bottom","hourglass_disabled","hourglass_empty","hourglass_full","hourglass_top","house","house_siding","houseboat","how_to_reg","how_to_vote","html","http","https","hub","hvac","ice_skating","icecream","image","image_aspect_ratio","image_not_supported","image_search","imagesearch_roller","import_contacts","import_export","important_devices","inbox","incomplete_circle","indeterminate_check_box","info","input","insert_chart","insert_chart_outlined","insert_comment","insert_drive_file","insert_emoticon","insert_invitation","insert_link","insert_page_break","insert_photo","insights","install_desktop","install_mobile","integration_instructions","interests","interpreter_mode","inventory","inventory_2","invert_colors","invert_colors_off","ios_share","iron","iso","javascript","join_full","join_inner","join_left","join_right","kayaking","kebab_dining","key","key_off","keyboard","keyboard_alt","keyboard_arrow_down","keyboard_arrow_left","keyboard_arrow_right","keyboard_arrow_up","keyboard_backspace","keyboard_capslock","keyboard_command_key","keyboard_control_key","keyboard_double_arrow_down","keyboard_double_arrow_left","keyboard_double_arrow_right","keyboard_double_arrow_up","keyboard_hide","keyboard_option_key","keyboard_return","keyboard_tab","keyboard_voice","king_bed","kitchen","kitesurfing","label","label_important","label_off","lan","landscape","landslide","language","laptop","laptop_chromebook","laptop_mac","laptop_windows","last_page","launch","layers","layers_clear","leaderboard","leak_add","leak_remove","legend_toggle","lens","lens_blur","library_add","library_add_check","library_books","library_music","light","light_mode","lightbulb","line_axis","line_style","line_weight","linear_scale","link","link_off","linked_camera","liquor","list","list_alt","live_help","live_tv","living","local_activity","local_airport","local_atm","local_bar","local_cafe","local_car_wash","local_convenience_store","local_dining","local_drink","local_fire_department","local_florist","local_gas_station","local_grocery_store","local_hospital","local_hotel","local_laundry_service","local_library","local_mall","local_movies","local_offer","local_parking","local_pharmacy","local_phone","local_pizza","local_play","local_police","local_post_office","local_printshop","local_see","local_shipping","local_taxi","location_city","location_disabled","location_off","location_on","location_searching","lock","lock_clock","lock_open","lock_person","lock_reset","login","logo_dev","logout","looks","looks_3","looks_4","looks_5","looks_6","looks_one","looks_two","loop","loupe","low_priority","loyalty","lte_mobiledata","lte_plus_mobiledata","luggage","lunch_dining","mail","mail_outline","male","man","manage_accounts","manage_history","manage_search","map","maps_home_work","maps_ugc","margin","mark_as_unread","mark_chat_read","mark_chat_unread","mark_email_read","mark_email_unread","mark_unread_chat_alt","markunread","markunread_mailbox","masks","maximize","media_bluetooth_off","media_bluetooth_on","mediation","medical_information","medical_services","medication","medication_liquid","meeting_room","memory","menu","menu_book","menu_open","merge","merge_type","message","mic","mic_external_off","mic_external_on","mic_none","mic_off","microwave","military_tech","minimize","minor_crash","miscellaneous_services","missed_video_call","mms","mobile_friendly","mobile_off","mobile_screen_share","mobiledata_off","mode","mode_comment","mode_edit","mode_edit_outline","mode_night","mode_of_travel","mode_standby","model_training","monetization_on","money","money_off","money_off_csred","monitor","monitor_heart","monitor_weight","monochrome_photos","mood","mood_bad","moped","more","more_horiz","more_time","more_vert","mosque","motion_photos_auto","motion_photos_off","motion_photos_on","motion_photos_pause","motion_photos_paused","mouse","move_down","move_to_inbox","move_up","movie","movie_creation","movie_filter","moving","mp","multiline_chart","multiple_stop","museum","music_note","music_off","music_video","my_location","nat","nature","nature_people","navigate_before","navigate_next","navigation","near_me","near_me_disabled","nearby_error","nearby_off","network_cell","network_check","network_locked","network_ping","network_wifi","network_wifi_1_bar","network_wifi_2_bar","network_wifi_3_bar","new_label","new_releases","newspaper","next_plan","next_week","nfc","night_shelter","nightlife","nightlight","nightlight_round","nights_stay","no_accounts","no_adult_content","no_backpack","no_cell","no_crash","no_drinks","no_encryption","no_encryption_gmailerrorred","no_flash","no_food","no_luggage","no_meals","no_meeting_room","no_photography","no_sim","no_stroller","no_transfer","noise_aware","noise_control_off","nordic_walking","north","north_east","north_west","not_accessible","not_interested","not_listed_location","not_started","note","note_add","note_alt","notes","notification_add","notification_important","notifications","notifications_active","notifications_none","notifications_off","notifications_paused","numbers","offline_bolt","offline_pin","offline_share","ondemand_video","online_prediction","opacity","open_in_browser","open_in_full","open_in_new","open_in_new_off","open_with","other_houses","outbound","outbox","outdoor_grill","outlet","outlined_flag","output","padding","pages","pageview","palette","pan_tool","pan_tool_alt","panorama","panorama_fish_eye","panorama_horizontal","panorama_horizontal_select","panorama_photosphere","panorama_photosphere_select","panorama_vertical","panorama_vertical_select","panorama_wide_angle","panorama_wide_angle_select","paragliding","park","party_mode","password","pattern","pause","pause_circle","pause_circle_filled","pause_circle_outline","pause_presentation","payment","payments","pedal_bike","pending","pending_actions","pentagon","people","people_alt","people_outline","percent","perm_camera_mic","perm_contact_calendar","perm_data_setting","perm_device_information","perm_identity","perm_media","perm_phone_msg","perm_scan_wifi","person","person_add","person_add_alt","person_add_alt_1","person_add_disabled","person_off","person_outline","person_pin","person_pin_circle","person_remove","person_remove_alt_1","person_search","personal_injury","personal_video","pest_control","pest_control_rodent","pets","phishing","phone","phone_android","phone_bluetooth_speaker","phone_callback","phone_disabled","phone_enabled","phone_forwarded","phone_in_talk","phone_iphone","phone_locked","phone_missed","phone_paused","phonelink","phonelink_erase","phonelink_lock","phonelink_off","phonelink_ring","phonelink_setup","photo","photo_album","photo_camera","photo_camera_back","photo_camera_front","photo_filter","photo_library","photo_size_select_actual","photo_size_select_large","photo_size_select_small","php","piano","piano_off","picture_as_pdf","picture_in_picture","picture_in_picture_alt","pie_chart","pie_chart_outline","pin","pin_drop","pin_end","pin_invoke","pinch","pivot_table_chart","pix","place","plagiarism","play_arrow","play_circle","play_circle_filled","play_circle_outline","play_disabled","play_for_work","play_lesson","playlist_add","playlist_add_check","playlist_add_check_circle","playlist_add_circle","playlist_play","plumbing","plus_one","podcasts","point_of_sale","policy","poll","polyline","polymer","pool","portable_wifi_off","portrait","post_add","power","power_input","power_off","power_settings_new","precision_manufacturing","pregnating_woman","present_to_all","preview","price_change","price_check","print","print_disabled","priority_high","privacy_tip","private_connectivity","production_quantity_limits","propane","propane_tank","psychology","public","public_off","publish","published_with_changes","punch_clock","push_pin","qr_code","qr_code_2","qr_code_scanner","query_builder","query_stats","question_answer","question_mark","queue","queue_music","queue_play_next","quickreply","quiz","r_mobiledata","radar","radio","radio_button_checked","radio_button_unchecked","railway_alert","ramen_dining","ramp_left","ramp_right","rate_review","raw_on","raw_off","read_more","real_estate_agent","receipt","receipt_long","recent_actors","recommend","record_voice_over","rectangle","recycling","redeem","redo","reduce_capacity","refresh","remember_me","remove","remove_circle","remove_circle_outline","remove_done","remove_from_queue","remove_moderator","remove_red_eye","remove_shopping_cart","reorder","repeat","repeat_on","repeat_one","repeat_one_on","replay","replay_10","replay_30","replay_5","replay_circle_filled","reply","reply_all","report","report_gmailerrorred","report_off","report_problem","request_page","request_quote","reset_tv","restart_alt","restaurant","restaurant_menu","restore","restore_from_trash","restore_page","reviews","rice_bowl","ring_volume","rocket","rocket_launch","roller_shades","roller_shades_closed","roller_skating","roofing","room","room_preferences","room_service","rotate_90_degrees_ccw","rotate_90_degrees_cw","rotate_left","rotate_right","roundabout_left","roundabout_right","rounded_corner","route","router","rowing","rss_feed","rsvp","rtt","rule","rule_folder","run_circle","running_with_errors","rv_hookup","safety_divider","sailing","sanitizer","satellite","satellite_alt","save","save_alt","save_as","saved_search","savings","scale","scanner","scatter_plot","schedule","schedule_send","schema","school","science","score","scoreboard","screen_lock_landscape","screen_lock_portrait","screen_lock_rotation","screen_rotation","screen_rotation_alt","screen_search_desktop","screen_share","screenshot","scuba_diving","sd","sd_card","sd_card_alert","sd_storage","search","search_off","security","security_update","security_update_good","security_update_warning","segment","select_all","self_improvement","sell","send","send_and_archive","send_time_extension","send_to_mobile","sensor_door","sensor_window","sensors","sensors_off","sentiment_dissatisfied","sentiment_neutral","sentiment_satisfied","sentiment_satisfied_alt","sentiment_very_dissatisfied","sentiment_very_satisfied","set_meal","settings","settings_accessibility","settings_applications","settings_backup_restore","settings_bluetooth","settings_brightness","settings_cell","settings_ethernet","settings_input_antenna","settings_input_component","settings_input_composite","settings_input_hdmi","settings_input_svideo","settings_overscan","settings_phone","settings_power","settings_remote","settings_system_daydream","settings_voice","share","share_location","shield","shield_moon","shop","shop_2","shop_two","shopping_bag","shopping_basket","shopping_cart","shopping_cart_checkout","short_text","shortcut","show_chart","shower","shuffle","shuffle_on","shutter_speed","sick","sign_language","signal_cellular_0_bar","signal_cellular_4_bar","signal_cellular_alt","signal_cellular_alt_1_bar","signal_cellular_alt_2_bar","signal_cellular_connected_no_internet_0_bar","signal_cellular_connected_no_internet_4_bar","signal_cellular_no_sim","signal_cellular_nodata","signal_cellular_null","signal_cellular_off","signal_wifi_0_bar","signal_wifi_4_bar","signal_wifi_4_bar_lock","signal_wifi_bad","signal_wifi_connected_no_internet_4","signal_wifi_off","signal_wifi_statusbar_4_bar","signal_wifi_statusbar_connected_no_internet_4","signal_wifi_statusbar_null","signature","signpost","sim_card","sim_card_alert","sim_card_download","single_bed","sip","skateboarding","skip_next","skip_previous","sledding","slideshow","slow_motion_video","smart_button","smart_display","smart_screen","smart_toy","smartphone","smell","smile","smoke_free","smoking_rooms","sms","sms_failed","snippet_folder","snooze","snowboarding","snowmobile","snowshoeing","soap","social_distance","sort","sort_by_alpha","soup_kitchen","source","south","south_america","south_east","south_west","spa","space_bar","space_dashboard","spatial_audio","spatial_audio_off","spatial_tracking","speaker","speaker_group","speaker_notes","speaker_notes_off","speaker_phone","speed","spellcheck","splitscreen","spoke","sports","sports_bar","sports_baseball","sports_basketball","sports_cricket","sports_esports","sports_football","sports_golf","sports_gymnastics","sports_handball","sports_hockey","sports_kabaddi","sports_martial_arts","sports_mma","sports_motorsports","sports_rugby","sports_score","sports_soccer","sports_tennis","sports_volleyball","square","square_foot","ssid_chart","stacked_bar_chart","stacked_line_chart","stadium","stairs","star","star_border","star_border_purple500","star_half","star_outline","star_purple500","star_rate","stars","start","state_layer","stay_current_landscape","stay_current_portrait","stay_primary_landscape","stay_primary_portrait","sticky_note_2","stop","stop_circle","stop_screen_share","storage","store","store_mall_directory","storefront","storm","straight","straighten","stream","streetview","strikethrough_s","stroller","style","subdirectory_arrow_left","subdirectory_arrow_right","subject","subscript","subscriptions","subtitles","subtitles_off","subway","summarize","superscript","supervised_user_circle","supervisor_account","support","support_agent","surfing","surround_sound","swap_calls","swap_horiz","swap_horizontal_circle","swap_vert","swap_vertical_circle","swipe","swipe_down","swipe_down_alt","swipe_left","swipe_left_alt","swipe_right","swipe_right_alt","swipe_up","swipe_up_alt","switch_access_shortcut","switch_access_shortcut_add","switch_account","switch_camera","switch_left","switch_right","switch_video","synagogue","sync","sync_alt","sync_lock","sync_problem","system_security_update","system_security_update_good","system_security_update_warning","system_update","system_update_alt","tab","tab_unselected","table_bar","table_chart","table_restaurant","table_rows","table_view","tablet","tablet_android","tablet_mac","tag","tag_faces","takeout_dining","tap_and_play","tapas","task","task_alt","taxi_alert","temple_buddhist","temple_hindu","terminal","terrain","text_decrease","text_fields","text_format","text_increase","text_rotate_up","text_rotate_vertical","text_rotation_angledown","text_rotation_angleup","text_rotation_down","text_rotation_none","text_snippet","textsms","texture","theater_comedy","theaters","thermostat","thermostat_auto","thumb_down","thumb_down_alt","thumb_down_off_alt","thumb_up","thumb_up_alt","thumb_up_off_alt","thumbs_up_down","time_to_leave","timelapse","timeline","timer","timer_10","timer_10_select","timer_3","timer_3_select","timer_off","tips_and_updates","tire_repair","title","toc","today","toggle_off","toggle_on","token","toll","tonality","topic","touch_app","tour","toys","track_changes","traffic","train","tram","transcribe","transfer_within_a_station","transform","transgender","transit_enterexit","translate","travel_explore","trending_down","trending_flat","trending_up","trip_origin","try","tty","tune","tungsten","turn_left","turn_right","turn_sharp_left","turn_sharp_right","turn_slight_left","turn_slight_right","turned_in","turned_in_not","tv","tv_off","two_wheeler","type_specimen","u_turn_left","u_turn_right","umbrella","unarchive","undo","unfold_less","unfold_more","unpublished","unsubscribe","upcoming","update","update_disabled","upgrade","upload","upload_file","usb","usb_off","vaccines","vape_free","vaping_rooms","vector_circle","view_agenda","view_array","view_carousel","view_column","view_comfy","view_comfy_alt","view_compact","view_compact_alt","view_cozy","view_day","view_headline","view_in_ar","view_kanban","view_list","view_module","view_quilt","view_sidebar","view_stream","view_timeline","view_week","vignette","villa","visibility","visibility_off","voice_chat","voice_over_off","voicemail","volume_down","volume_mute","volume_off","volume_up","volunteer_activism","vpn_key","vpn_key_off","vpn_lock","vrpano","wallet","wallpaper","warning","warning_amber","wash","watch","watch_later","water","water_damage","water_drop","waterfall_chart","waves","waving_hand","wb_auto","wb_cloudy","wb_incandescent","wb_iridescent","wb_shade","wb_sunny","wb_twilight","wc","web","web_asset","web_asset_off","web_stories","webhook","weekend","west","whatsapp","whatshot","wheelchair_pickup","where_to_vote","widgets","wifi","wifi_calling","wifi_calling_3","wifi_channel","wifi_find","wifi_lock","wifi_off","wifi_password","wifi_protected_setup","wifi_tethering","wifi_tethering_error","wifi_tethering_off","window","wine_bar","woman","woo_commerce","work","work_history","work_off","work_outline","workspace_premium","workspaces","wrap_text","wrong_location","wysiwyg","yard","youtube_searched_for","zoom_in","zoom_in_map","zoom_out","zoom_out_map"];

                const html = allIcons.map(word => `
                    <div class="icon-list-row" onclick="app.iconDirectory.copy('${word}', this)">
                        <div class="icon-list-icon"><i class="material-icons-round">${word}</i></div>
                        <div class="icon-list-text">${word}</div>
                    </div>
                `).join('');
                container.innerHTML = html;
            }, 50);
        },

        copy: (word, el) => {
            navigator.clipboard.writeText(word);
            
            const textDiv = el.querySelector('.icon-list-text');
            const iconDiv = el.querySelector('.icon-list-icon i');
            const origText = textDiv.innerText;
            const origColor = iconDiv.style.color;
            
            textDiv.innerText = "COPIED TO CLIPBOARD!";
            textDiv.style.color = "#00E676";
            textDiv.style.fontWeight = "bold";
            iconDiv.style.color = "#00E676";
            
            setTimeout(() => {
                textDiv.innerText = origText;
                textDiv.style.color = "#ccc";
                textDiv.style.fontWeight = "normal";
                iconDiv.style.color = origColor;
            }, 800);
        }
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
        const bankroll = app.data.txs.reduce((sum, t) => sum + t.amt, 0);

        const retire = app.data.txs.reduce((sum, t) => {
            if (t.cat === 'job' && t.details && t.details.k401) {
                return sum + (parseFloat(t.details.k401) || 0);
            }
            return sum;
        }, 0);

                // FIX: Grab live prices from the global window object (fetched from CoinGecko)
        const btcPrice = window.btcPrice || 0;
        const ethPrice = window.ethPrice || 0;
        
        // NOW IT PULLS FROM APP.DATA WHERE IT WAS JUST SAVED
        const btcVal = (app.data.btcHoldings || 0) * btcPrice;
        const ethVal = (app.data.ethHoldings || 0) * ethPrice;
        const cryptoTotal = btcVal + ethVal;


        const netWorth = bankroll + retire + cryptoTotal;
        
        const goal = parseFloat(localStorage.getItem('goal')) || 10000;
        const pctRaw = goal > 0 ? (bankroll / goal) * 100 : 0;
        const pct = Math.min(100, Math.max(0, pctRaw));

                // --- VARIABLE MULTI-COLOR ENGINE ---
        // Dynamically adds color stops as the bar grows!
        const getBarColor = (p) => {
            if (p < 25) return 'linear-gradient(90deg, #D50000, #FF1744)'; // Red
            if (p < 50) return 'linear-gradient(90deg, #D50000, #FF6D00)'; // Red -> Orange
            if (p < 75) return 'linear-gradient(90deg, #D50000, #FF6D00, #FFD600)'; // Red -> Orange -> Yellow
            return 'linear-gradient(90deg, #D50000, #FF6D00, #FFD600, #00FF41)'; // Red -> Orange -> Yellow -> Green
        };
        
        // Updates the percentage text color to match the tip of the bar
        const getTextColor = (p) => {
            if (p < 25) return '#FF1744';
            if (p < 50) return '#FF6D00';
            if (p < 75) return '#FFD600';
            return '#00FF41';
        };

                // --- 2. UPDATE DASHBOARD CARD ---
        const fmt = (n) => `$${Math.round(n).toLocaleString()}`;

        // TOTAL BANKROLL (Main Hero)
        if(document.getElementById('dash-hero')) {
            document.getElementById('dash-hero').innerText = fmt(bankroll);
            document.getElementById('dash-hero').style.color = bankroll < 0 ? '#D50000' : '#00FF41';
        }

        // NET WORTH (Dynamic Red/Green)
        if(document.getElementById('dash-networth')) {
            document.getElementById('dash-networth').innerText = fmt(netWorth);
            document.getElementById('dash-networth').style.color = netWorth < 0 ? '#D50000' : '#00FF41';
        }
        
        // CRYPTO (Locked to Yellow)
        if(document.getElementById('dash-crypto')) {
            document.getElementById('dash-crypto').innerText = fmt(cryptoTotal);
            document.getElementById('dash-crypto').style.color = '#FFD600';
        }
        
        // 401K (Locked to Dark Purple)
        if(document.getElementById('dash-401k')) {
            document.getElementById('dash-401k').innerText = fmt(retire);
            document.getElementById('dash-401k').style.color = '#7C4DFF'; 
        }


        // MAIN GOAL BAR (Total Bankroll)
        if(document.getElementById('dash-bar')) {
            document.getElementById('dash-pct').innerText = `${pct.toFixed(1)}%`;
            document.getElementById('dash-pct').style.color = getTextColor(pct);
            
            // Shows $Current / $Aim
            document.getElementById('dash-target').innerText = `${fmt(bankroll)} / ${fmt(goal)}`;
            
            document.getElementById('dash-bar').style.width = `${pct}%`;
            document.getElementById('dash-bar').style.background = getBarColor(pct);
        }

        // --- NEW: SUB-TRACKERS LOGIC ---
        const calcTracker = (tData) => {
            if(!tData || !tData.name || !tData.cat) return null;
            let running = tData.start;
            const startDateStr = tData.date ? tData.date : "1970-01-01";
            
            app.data.txs.forEach(tx => {
                if(tx.cat === tData.cat) {
                    const txDate = tx.date.split('T')[0];
                    if(txDate >= startDateStr) {
                        running += tx.amt;
                    }
                }
            });
            const tPct = tData.goal > 0 ? (running / tData.goal) * 100 : 0;
            return { val: running, goal: tData.goal, pct: Math.min(100, Math.max(0, tPct)) };
        };

        // Render Tracker 1
        const t1 = JSON.parse(localStorage.getItem('tracker1') || 'null');
        const t1Stats = calcTracker(t1);
        if(document.getElementById('sub1-container')) {
            document.getElementById('sub1-title').innerText = (t1 && t1.name) ? t1.name.toUpperCase() : 'TRACKER 1 (UNSET)';
            
            // Shows $Current / $Aim
            document.getElementById('sub1-val').innerText = t1Stats ? `${fmt(t1Stats.val)} / ${fmt(t1Stats.goal)}` : '$0 / $0';
            
            const p1 = t1Stats ? t1Stats.pct : 0;
            document.getElementById('sub1-pct').innerText = `${p1.toFixed(1)}%`;
            document.getElementById('sub1-pct').style.color = getTextColor(p1);
            document.getElementById('sub1-bar').style.width = `${p1}%`;
            document.getElementById('sub1-bar').style.background = getBarColor(p1);
        }

        // Render Tracker 2
        const t2 = JSON.parse(localStorage.getItem('tracker2') || 'null');
        const t2Stats = calcTracker(t2);
        if(document.getElementById('sub2-container')) {
            document.getElementById('sub2-title').innerText = (t2 && t2.name) ? t2.name.toUpperCase() : 'TRACKER 2 (UNSET)';
            
            // Shows $Current / $Aim
            document.getElementById('sub2-val').innerText = t2Stats ? `${fmt(t2Stats.val)} / ${fmt(t2Stats.goal)}` : '$0 / $0';
            
            const p2 = t2Stats ? t2Stats.pct : 0;
            document.getElementById('sub2-pct').innerText = `${p2.toFixed(1)}%`;
            document.getElementById('sub2-pct').style.color = getTextColor(p2);
            document.getElementById('sub2-bar').style.width = `${p2}%`;
            document.getElementById('sub2-bar').style.background = getBarColor(p2);
        }

        // Render Tracker 3
        const t3 = JSON.parse(localStorage.getItem('tracker3') || 'null');
        const t3Stats = calcTracker(t3);
        if(document.getElementById('sub3-container')) {
            document.getElementById('sub3-title').innerText = (t3 && t3.name) ? t3.name.toUpperCase() : 'TRACKER 3 (UNSET)';
            
            // Shows $Current / $Aim
            document.getElementById('sub3-val').innerText = t3Stats ? `${fmt(t3Stats.val)} / ${fmt(t3Stats.goal)}` : '$0 / $0';
            
            const p3 = t3Stats ? t3Stats.pct : 0;
            document.getElementById('sub3-pct').innerText = `${p3.toFixed(1)}%`;
            document.getElementById('sub3-pct').style.color = getTextColor(p3);
            document.getElementById('sub3-bar').style.width = `${p3}%`;
            document.getElementById('sub3-bar').style.background = getBarColor(p3);
        }


        // --- 3. FILTERED PERIOD PROFIT ---
        const filteredTxs = app.data.txs.filter(t => app.checkFilter(t));
        const periodTotal = filteredTxs.reduce((sum, t) => sum + t.amt, 0);
        
        if(document.getElementById('dash-period')) {
            const el = document.getElementById('dash-period');
            el.innerText = (periodTotal >= 0 ? '+' : '-') + `$${Math.abs(Math.round(periodTotal)).toLocaleString()}`;
            el.style.color = periodTotal >= 0 ? '#00E676' : '#D50000'; // Changed to Crimson
        }


                // --- 4. RENDER LIST (Grouped By Date) ---
        const list = document.getElementById('tx-list');
        if (list) {
            list.innerHTML = '';
            const sorted = [...filteredTxs].sort((a, b) => new Date(b.date) - new Date(a.date));

            // A. Group Transactions by Date
            const groups = {};
            sorted.forEach(t => {
                // Formats as "Mon, Oct 12, 2025"
                const dateStr = new Date(t.date).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'});
                
                if(!groups[dateStr]) groups[dateStr] = { txs: [], credits: 0, debits: 0, count: 0, net: 0 };
                
                groups[dateStr].txs.push(t);
                groups[dateStr].count++;
                groups[dateStr].net += t.amt;
                if(t.amt > 0) groups[dateStr].credits += t.amt;
                else groups[dateStr].debits += Math.abs(t.amt);
            });

                                    // B. Render the UI
            Object.keys(groups).forEach(dateStr => {
                const g = groups[dateStr];
                
                // 1. Setup Daily Notes Data & Persistence State
                if(!app.data.dailyNotes) app.data.dailyNotes = {};
                if(!app.data.dailyNotesState) app.data.dailyNotesState = {}; // Remembers open/closed
                
                const safeId = dateStr.replace(/[^a-zA-Z0-9]/g, ''); 
                const savedNote = app.data.dailyNotes[dateStr] || '';
                const isExpanded = app.data.dailyNotesState[dateStr] || false;
                
                // If a note exists, make the arrow green. Otherwise, pink.
                const hasNote = savedNote.trim().length > 0;
                const arrowColor = hasNote ? '#00E676' : '#FF007F';
                
                // Render the Date Separator Card
                const sep = document.createElement('div');
                sep.className = 'date-separator';
                sep.innerHTML = `
                    <div id="date-head-${safeId}" style="cursor:pointer;">
                                                                        <div style="display:flex; justify-content:flex-end; align-items:center; position:relative; min-height:21px; margin-bottom:6px;">
                            
                            <span style="position:absolute; left:50%; transform:translateX(-50%); font-weight:bold; letter-spacing:1px; white-space:nowrap; color:#FF007F;">
                                🏴‍☠️ ${dateStr.toUpperCase()} 🏴‍☠️ 
                                <i id="date-icon-${safeId}" class="material-icons-round" style="font-size:18px; vertical-align:middle; color:${arrowColor}; margin-left:4px; transition:0.3s;">${isExpanded ? 'expand_less' : 'expand_more'}</i>
                            </span>
                            
                            <span style="font-weight:bold; z-index:1; color:${g.net >= 0 ? '#00E676' : '#D50000'}">
                                ${g.net >= 0 ? '+' : '-'}$${Math.abs(g.net).toLocaleString()}
                            </span>
                            
                        </div>
                       
                        <div class="date-sep-stats">
                            <span>TXNS: ${g.count}</span>
                            <span style="color:#00C853">IN: +$${g.credits.toLocaleString()}</span>
                            <span style="color:#D50000">OUT: -$${g.debits.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div id="date-note-${safeId}" style="display:${isExpanded ? 'block' : 'none'}; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(255, 0, 127, 0.4);">
                        <textarea id="date-text-${safeId}" rows="3" placeholder="Bring your girl to the crib, maybe we can solve 'em..." style="background:#050505; border:1px solid #333; color:#ccc; font-size:0.8rem; margin-bottom:4px; padding:10px; width:100%; border-radius:6px; resize:vertical; font-family:inherit; outline:none; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);"></textarea>
                    </div>
                `;
                list.appendChild(sep);

                // --- BIND THE AUTO-SAVE & PERSISTENCE LOGIC ---
                const headEl = sep.querySelector(`#date-head-${safeId}`);
                const noteEl = sep.querySelector(`#date-note-${safeId}`);
                const textEl = sep.querySelector(`#date-text-${safeId}`);
                const iconEl = sep.querySelector(`#date-icon-${safeId}`);

                // Fill the box with any saved text
                textEl.value = savedNote;

                // 1. Toggle Drawer & Save Open/Closed State
                headEl.onclick = () => {
                    app.data.dailyNotesState[dateStr] = !app.data.dailyNotesState[dateStr];
                    app.save(); // Locks the open/closed state into memory
                    
                    const nowOpen = app.data.dailyNotesState[dateStr];
                    noteEl.style.display = nowOpen ? 'block' : 'none';
                    iconEl.innerText = nowOpen ? 'expand_less' : 'expand_more';
                };

                // 2. Prevent clicks inside the text box from closing the drawer
                textEl.onclick = (e) => e.stopPropagation();

                // 3. Auto-Save exactly like the transaction cards
                textEl.onchange = (e) => {
                    const newText = e.target.value;
                    app.data.dailyNotes[dateStr] = newText;
                    app.save(); // Locks the text into memory
                    
                    // Visual confirmation flash & arrow color update
                    const oldBorder = textEl.style.border;
                    textEl.style.border = `1px solid #00E676`; // Neon Green
                    iconEl.style.color = newText.trim().length > 0 ? '#00E676' : '#FF007F';
                    
                    setTimeout(() => { 
                        textEl.style.border = oldBorder; 
                    }, 800);
                };


                                // Render the individual records under this date
                g.txs.forEach(t => {
                    const div = document.createElement('div');
                    div.className = `tx-item ${t.amt < 0 ? 'tx-neg' : 'tx-pos'}`; 
                    
                    // Trigger Edit Modal ONLY when clicking the main row background
                    div.onclick = () => app.openModal(t);
                    
                    const color = app.colors[t.cat] || '#FFF';
                    div.style.borderLeftColor = color;
                    div.style.flexWrap = 'wrap'; // <-- MAGIC TRICK: Allows the drawer to sit below the main row
                    
                    // Generate unique ID to track open/closed state
                    if(!t.id) t.id = 'tx_' + Date.now() + '_' + Math.floor(Math.random()*1000);

                                        // --- 1. SET THE ICON (Custom Override First, then Default) ---
                    let iconCode = 'attach_money';
                    if (t.customIcon) {
                        iconCode = t.customIcon;
                    } else if (t.cat === 'pokerCash') {
                        iconCode = 'spades'; 
                    } else {
                        const iconMap = { job:'work', bets:'sports_football', sales:'sell', expenses:'receipt', dice:'casino', casino:'local_play', crypto:'currency_bitcoin', miscIncome:'savings', kalshi:'query_stats' };
                        iconCode = iconMap[t.cat] || 'attach_money';
                    }

                    // ... (tags logic stays the same) ...
                    const tags = [];
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
                    
                    const amtStr = `$${Math.abs(t.amt).toLocaleString()}`;
                    const savedNote = t.journal || '';

                    // --- 2. THE VISUAL NOTE INDICATOR (Sleek White Glow) ---
                    const hasNote = savedNote.trim().length > 0;
                    const iconBorderStyle = hasNote 
                        ? `border: 1px solid #fff; box-shadow: 0 0 10px rgba(255,255,255,0.25), inset 0 0 8px rgba(0,0,0,0.8);` 
                        : `border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 0 8px rgba(0,0,0,0.5);`;

                    const iconHtml = (iconCode === 'spades') 
                        ? `<div class="tx-icon" id="icon-${t.id}" style="cursor:pointer; background:${color}20; color:${color}; font-family:serif; flex-shrink:0; transition:0.3s; ${iconBorderStyle}">♠</div>`
                        : `<div class="tx-icon" id="icon-${t.id}" style="cursor:pointer; background:${color}20; color:${color}; flex-shrink:0; transition:0.3s; ${iconBorderStyle}"><i class="material-icons-round">${iconCode}</i></div>`;

                    // STRUCTURE
                    div.innerHTML = `
                        <div style="display:flex; width:100%; align-items:center;">
                            ${iconHtml}
                            <div class="tx-info" style="flex-grow:1;">
                                <div class="tx-title" style="color:${color}">${titleText}</div>
                                <div class="tx-meta">${tagHtml}</div>
                            </div>
                            <div class="tx-amt ${t.amt < 0 ? 'neg' : 'pos'}">${amtStr}</div>
                        </div>
                        
                        <div id="drawer-${t.id}" style="display:${t._noteOpen ? 'block' : 'none'}; width:100%; margin-top:10px; padding-top:10px; border-top:1px dashed ${color}50;">
                            <textarea id="text-${t.id}" rows="2" placeholder="Tap to add a note..." style="background:rgba(0,0,0,0.3); border:1px solid ${color}40; color:${color}; font-size:0.75rem; padding:8px; width:100%; border-radius:6px; resize:vertical; font-family:inherit; outline:none; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);"></textarea>
                        </div>
                    `;

                    // POPULATE & BIND EVENTS
                    const textArea = div.querySelector(`#text-${t.id}`);
                    textArea.value = savedNote;
                    
                    const iconEl = div.querySelector(`#icon-${t.id}`);
                    const drawerEl = div.querySelector(`#drawer-${t.id}`);
                    
                    // 1. Toggle Drawer on Icon Click
                    iconEl.onclick = (e) => {
                        e.stopPropagation(); 
                        t._noteOpen = !t._noteOpen;
                        app.save(); 
                        drawerEl.style.display = t._noteOpen ? 'block' : 'none';
                        iconEl.style.transform = t._noteOpen ? 'scale(1.1)' : 'scale(1)'; 
                    };
                    
                    // 2. Prevent Modal when clicking the text box
                    textArea.onclick = (e) => e.stopPropagation(); 
                    
                    // 3. Auto-Save & Dynamic Glow Application
                    textArea.onchange = (e) => {
                        t.journal = e.target.value;
                        app.save();
                        
                        // Dynamically add/remove the white glow if they added or deleted the note!
                        const isNowEmpty = t.journal.trim().length === 0;
                        if (!isNowEmpty) {
                            iconEl.style.border = '1px solid #fff';
                            iconEl.style.boxShadow = '0 0 10px rgba(255,255,255,0.25), inset 0 0 8px rgba(0,0,0,0.8)';
                        } else {
                            iconEl.style.border = '1px solid rgba(255,255,255,0.05)';
                            iconEl.style.boxShadow = 'inset 0 0 8px rgba(0,0,0,0.5)';
                        }

                        const oldBorder = textArea.style.border;
                        textArea.style.border = `1px solid #00FF41`; 
                        setTimeout(() => { textArea.style.border = oldBorder; }, 800);
                    };


                    list.appendChild(div);
                                }); // <--- 1. Closes the g.txs.forEach loop
            }); // <--- 2. Closes the Object.keys(groups).forEach loop
        } // <--- 3. Closes the "if/else" block for the UI render
        
        // Force the notes tab to instantly sync its UI
        app.renderNotes();
        
    }, // <--- 4. Closes the entire render: () => { function

    renderTickets: () => { 
        const div = document.getElementById('ticket-list'); 
        div.innerHTML=''; 
        const filtered = app.data.tickets.filter(t => app.checkFilter(t)); 
        const sorted = [...filtered].sort((a,b)=>b.id-a.id); 
        sorted.forEach(t => {
            const el = document.createElement('div'); 
            
            // Map the CSS status class to apply the tint and border
            const stClass = t.status === 'Won' ? 'won' : (t.status === 'Lost' ? 'lost' : (t.status === 'Early Cash' ? 'early' : 'pending'));
            el.className = `ticket-card tick-${stClass}`; 
            
            el.onclick = () => app.openTicketModal(t); 
            
            // Dynamic Left Border (Kalshi vs Sports)
            if (t.sport === 'Kalshi') el.style.borderLeftColor = 'var(--kalshi)';
            else el.style.borderLeftColor = 'var(--bets)';
            
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


    deleteNote: () => {
        if(confirm("Permanently delete this note?")) { 
            app.data.notes = app.data.notes.filter(n => n.id !== app.currentNoteId); 
            app.save(); 
            document.getElementById('modal-note').classList.remove('open'); 
            app.renderNotes(); 
        }
    },

    renameFolder: (color) => {
        if(!app.data.folderSettings) app.data.folderSettings = {};
        const current = app.data.folderSettings[color] || { title: 'NOTES GROUP', icon: 'cyclone' };
        
        const newTitle = prompt("Enter Folder Name:", current.title);
        if(newTitle !== null) {
            const newIcon = prompt("Enter Material Icon Name\n(e.g. cyclone, folder, star, verified):", current.icon);
            app.data.folderSettings[color] = {
                title: newTitle.toUpperCase(),
                icon: newIcon || 'cyclone'
            };
            app.save();
            app.renderNotes();
        }
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
            document.getElementById('inp-desc').value = tx.desc || '';
            document.getElementById('inp-icon').value = tx.customIcon || ''; // Load Custom Icon
            app.renderDynamicFields(); app.fillDynamicFields(tx);
        } else {
            app.currentId = null;
            document.getElementById('modal-title').innerText = "NEW RECORD";
            document.getElementById('inp-cat').value = 'expenses';
            document.getElementById('inp-date').value = localIso;
            document.getElementById('btn-delete').style.display = 'none';
            document.getElementById('inp-amt').value = ''; 
            document.getElementById('inp-desc').value = '';
            document.getElementById('inp-icon').value = ''; // Clear Custom Icon
            app.setType('exp');
            app.renderDynamicFields();
        }
    },
    closeModal: () => document.getElementById('modal-form').classList.remove('open'),
    
    saveTx: () => {
        const cat = document.getElementById('inp-cat').value;
        const date = document.getElementById('inp-date').value;
        let amt = parseFloat(document.getElementById('inp-amt').value) || 0;
        let desc = document.getElementById('inp-desc').value;
        const customIcon = document.getElementById('inp-icon').value.trim().toLowerCase(); // Grab Custom Icon
        let details = {};
        
        const val = (id) => parseFloat(document.getElementById(id).value) || 0;
        const txt = (id) => document.getElementById(id).value;

        if (cat === 'pokerCash') { const buyin=val('d-buyin'), cashout=val('d-cashout'), sb=val('d-sb'), bb=val('d-bb'), straddle=val('d-straddle'); const start=txt('d-start'), end=txt('d-end'); const dur = (new Date(end)-new Date(start))/36e5; amt = cashout - buyin; desc = txt('d-desc'); details = { buyin, cashout, sb, bb, straddle, start, end, dur: dur.toFixed(2) }; }
        else if (cat === 'pokerTourney') { const buyin=val('d-buyin'), cashout=val('d-cashout'), addon=val('d-addon'); amt = cashout - (buyin + addon); desc = txt('d-desc'); details = { buyin, cashout, addon, place: val('d-place') }; }
        else if (cat === 'bets') { 
            const wager=val('d-wager'), payout=val('d-payout'), isBonus=document.getElementById('d-bonus').checked; 
            amt = isBonus ? payout : (payout - wager); 
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

        // --- THE LIFESAVER: PULL EXISTING HIDDEN NOTES BEFORE SAVING ---
        let existingJournal = '';
        let existingNoteOpen = false;
        
        if (app.currentId) {
            const oldTx = app.data.txs.find(t => t.id === app.currentId);
            if (oldTx) {
                existingJournal = oldTx.journal || '';
                existingNoteOpen = oldTx._noteOpen || false;
            }
        }

        const tx = { 
            id: app.currentId || Date.now(), 
            cat, 
            date, 
            amt, 
            desc, 
            details,
            customIcon: customIcon,           // Applies Custom Icon
            journal: existingJournal,         // Saves the note!
            _noteOpen: existingNoteOpen       // Saves open/closed state!
        };

        if (app.currentId) { 
            const idx = app.data.txs.findIndex(t => t.id == app.currentId); 
            if(idx > -1) app.data.txs[idx] = tx; 
        } else { 
            app.data.txs.push(tx); 
        }
        
        app.save(); 
        app.closeModal();
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
        fetchCrypto: async () => { 
        try { 
            const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'); 
            const d = await r.json(); 
            window.btcPrice = d.bitcoin.usd; 
            window.ethPrice = d.ethereum.usd; 
            
            if(document.getElementById('btc-price')) document.getElementById('btc-price').innerText = `$${window.btcPrice.toLocaleString()}`; 
            if(document.getElementById('eth-price')) document.getElementById('eth-price').innerText = `$${window.ethPrice.toLocaleString()}`; 
            
            // Sync inputs on Crypto tab if they exist
            if(document.getElementById('btc-holdings')) document.getElementById('btc-holdings').value = app.data.btcHoldings || 0; 
            if(document.getElementById('eth-holdings')) document.getElementById('eth-holdings').value = app.data.ethHoldings || 0; 
            
            app.calcCrypto(); 
            app.render(); // <--- THIS FORCES THE DASHBOARD TO UPDATE ONCE PRICES ARRIVE
        } catch(e) { 
            console.log("Crypto Fetch Error:", e); 
        } 
    },

    calcCrypto: () => { 
        // Read from inputs if we are on the Crypto tab, otherwise use saved data
        const bInput = document.getElementById('btc-holdings');
        const eInput = document.getElementById('eth-holdings');
        
        const b = bInput ? (parseFloat(bInput.value) || 0) : (app.data.btcHoldings || 0); 
        const e = eInput ? (parseFloat(eInput.value) || 0) : (app.data.ethHoldings || 0); 
        
        // Save to central database
        app.data.btcHoldings = b; 
        app.data.ethHoldings = e; 
        
        const t = (b * (window.btcPrice || 0)) + (e * (window.ethPrice || 0)); 
        
        // Update UI without crashing
        if(document.getElementById('crypto-total-display')) {
            document.getElementById('crypto-total-display').innerText = `$${Math.round(t).toLocaleString()}`; 
        }
        
        app.save(); 
    },

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
        
    copyExport: () => { 
        // Bundles everything into the clipboard
        const exportPayload = {
            appData: app.data,
            settings: {
                goal: localStorage.getItem('goal'),
                tracker1: localStorage.getItem('tracker1'),
                tracker2: localStorage.getItem('tracker2'),
                tracker3: localStorage.getItem('tracker3')
            }
        };
        document.getElementById("export-area").value = JSON.stringify(exportPayload, null, 2);
        document.getElementById("export-area").select(); 
        document.execCommand("copy"); 
        alert("Copied Master Backup!"); 
    },

    downloadBackup: () => {
        // Bundles everything for the file download
        const exportPayload = {
            appData: app.data,
            settings: {
                goal: localStorage.getItem('goal'),
                tracker1: localStorage.getItem('tracker1'),
                tracker2: localStorage.getItem('tracker2'),
                tracker3: localStorage.getItem('tracker3')
            }
        };
        const dataStr = JSON.stringify(exportPayload, null, 2); 
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        const date = new Date().toISOString().split('T')[0];
        a.href = url;
        a.download = `bankroll_master_backup_${date}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Using your original SweetAlert style!
        Swal.fire({
            title: 'Master Backup Saved!',
            text: 'All transactions, notes, and tracker settings downloaded.',
            icon: 'success',
            background: '#111', color: '#fff'
        });
    },

    downloadCSV: () => {
        // LEAVE THIS EXACTLY AS IS!
        let csv = "Date,Category,Amount,Description,Details\n";
        app.data.txs.forEach(t => { const desc = t.desc ? `"${t.desc.replace(/"/g, '""')}"` : ""; const details = t.details ? `"${JSON.stringify(t.details).replace(/"/g, '""')}"` : ""; csv += `${t.date},${t.cat},${t.amt.toFixed(2)},${desc},${details}\n`; });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) { const url = URL.createObjectURL(blob); link.setAttribute("href", url); const date = new Date().toISOString().split('T')[0]; link.setAttribute("download", `bankroll_export_${date}.csv`); link.style.visibility = 'hidden'; document.body.appendChild(link); link.click(); document.body.removeChild(link); }
    },

    importData: () => { 
        try { 
            // Reads from your textarea box
            const p = JSON.parse(document.getElementById('import-area').value); 
            
            if (p.appData) {
                // IT IS A NEW MASTER BACKUP
                app.data = {
                    txs: [], tickets: [], inventory: [], notes: [],
                    liveSession: { active: false },
                    ...p.appData
                };
                if(p.settings) {
                    if(p.settings.goal) localStorage.setItem('goal', p.settings.goal);
                    if(p.settings.tracker1) localStorage.setItem('tracker1', p.settings.tracker1);
                    if(p.settings.tracker2) localStorage.setItem('tracker2', p.settings.tracker2);
                    if(p.settings.tracker3) localStorage.setItem('tracker3', p.settings.tracker3);
                }
            } else if (p.txs || (Object.keys(p).length === 0 && confirm("Import empty data?"))) {
                // IT IS AN OLD V1 BACKUP (Backwards compatible)
                app.data = {
                    txs: [], tickets: [], inventory: [], notes: [],
                    liveSession: { active: false },
                    ...p
                };
            } else {
                alert("Invalid Data Format");
                return;
            }
            
            app.save(); 
            app.calcCrypto(); // Sync crypto logic
            app.render(); 
            
            // Clear textarea and close modal
            document.getElementById('import-area').value = '';
            document.getElementById('modal-settings').classList.remove('open'); 
            
            alert("System Restored Successfully! 🏴‍☠️"); 
            
        } catch(e){ 
            console.error(e);
            alert("Error parsing JSON data. Check format."); 
        } 
    },
        importFile: (event) => {
        const file = event.target.files[0];
        if (!file) return; // User canceled the file browser
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const p = JSON.parse(e.target.result);
                
                if (p.appData) {
                    // IT IS A NEW MASTER BACKUP
                    app.data = {
                        txs: [], tickets: [], inventory: [], notes: [],
                        liveSession: { active: false },
                        ...p.appData
                    };
                    if(p.settings) {
                        if(p.settings.goal) localStorage.setItem('goal', p.settings.goal);
                        if(p.settings.tracker1) localStorage.setItem('tracker1', p.settings.tracker1);
                        if(p.settings.tracker2) localStorage.setItem('tracker2', p.settings.tracker2);
                        if(p.settings.tracker3) localStorage.setItem('tracker3', p.settings.tracker3);
                    }
                } else if (p.txs || (Object.keys(p).length === 0 && confirm("Import empty data?"))) {
                    // IT IS AN OLD V1 BACKUP
                    app.data = {
                        txs: [], tickets: [], inventory: [], notes: [],
                        liveSession: { active: false },
                        ...p
                    };
                } else {
                    alert("Invalid Data Format");
                    event.target.value = ''; // Reset the hidden input
                    return;
                }
                
                app.save(); 
                app.calcCrypto(); 
                app.render(); 
                
                document.getElementById('modal-settings').classList.remove('open'); 
                event.target.value = ''; // Reset so you can upload the same file again if needed
                
                // Using SweetAlert for that premium feel
                Swal.fire({
                    title: 'System Restored!',
                    text: 'Backup file loaded successfully.',
                    icon: 'success',
                    background: '#111', color: '#fff'
                });
                
            } catch(err) {
                console.error("File Import Error:", err);
                alert("Error reading file. Make sure it's a valid Bankroll OS JSON backup.");
                event.target.value = '';
            }
        };
        
        // This physically reads the file from your device
        reader.readAsText(file);
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








