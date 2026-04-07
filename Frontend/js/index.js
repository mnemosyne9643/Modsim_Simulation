class StatBridge {
    static LEVEL_MIN = 1;
    static LEVEL_MAX = 99;

    constructor() {
        this.sendToCSharp = this.debounce((statName, value) => {
            if (window.chrome?.webview) {
                window.chrome.webview.postMessage({
                    type: "STAT_CHANGE",
                    stat: statName,
                    newValue: parseInt(value) || 1
                });
                this.saveState();
            }
        }, 50);

        this.initListeners();
        this.updatePassivesUI();
        this.loadState();
    }

    initListeners() {
        // Select all text when focusing an input
        document.addEventListener('focus', (e) => {
            if (e.target.dataset.statInput !== undefined) {
                e.target.select();
                e.target.dataset.oldValue = e.target.value;
            }
        }, true);

        // Block special characters mientras se escribe
        document.addEventListener('keydown', (e) => {
            const statName = e.target.dataset.statInput;
            if (!statName) return;

            if (e.repeat) {
                e.preventDefault();
                return;
            }

            if (['-', '+', 'e', '.'].includes(e.key)) {
                e.preventDefault();
            }
        });

        // Solo enviar a C# cuando se sale del campo (o al cambiar via +/-)
        document.addEventListener('focusout', (e) => {
            const statName = e.target.dataset.statInput;
            if (!statName) return;

            let val = parseInt(e.target.value);
            if (isNaN(val) || val < 1) val = 1;
            else if (val > 146) val = 146;

            e.target.value = val;
            this.sendToCSharp(statName, val);
        });

        // Input handler
        document.addEventListener('input', (e) => {
            const statName = e.target.dataset.statInput;
            if (!statName) return;
            if (e.target.value === '') return;

            const val = parseInt(e.target.value);
            if (val > 146) {
                e.target.value = 146;
            }

            if (statName === 'BASELV') {
                const clamped = this.#clampLevel(val);
                if (val !== clamped) e.target.value = clamped;
                this.sendToCSharp(statName, clamped);
                return;
            }

            this.sendToCSharp(statName, e.target.value);
        });

        // Help click
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn || !btn.dataset.stat) return;

            const statName = btn.dataset.stat;
            const action = btn.dataset.type;
            const input = document.querySelector(`[data-stat-input="${statName}"]`);

            if (input) {
                let val = parseInt(input.value) || 0;
                if (action === 'plus') val++;
                else if (action === 'minus' && val > 1) val--;

                if (statName === 'BASELV') val = this.#clampLevel(val);

                input.value = val;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                this.saveState();
            }
        });
    }

    #clampLevel(value) {
        const n = parseInt(value) || StatBridge.LEVEL_MIN;
        return Math.min(Math.max(n, StatBridge.LEVEL_MIN), StatBridge.LEVEL_MAX);
    }

    debounce(func, timeout = 100) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    // --- State Persistence ---
    saveState() {
        const state = {
            baseLv: parseInt(document.querySelector('[data-stat-input="BASELV"]')?.value) || 1,
            jobLv: parseInt(document.querySelector('#job-level-select')?.value) || 1,
            str: parseInt(document.querySelector('[data-stat-input="STR"]')?.value) || 1,
            agi: parseInt(document.querySelector('[data-stat-input="AGI"]')?.value) || 1,
            vit: parseInt(document.querySelector('[data-stat-input="VIT"]')?.value) || 1,
            int: parseInt(document.querySelector('[data-stat-input="INT"]')?.value) || 1,
            dex: parseInt(document.querySelector('[data-stat-input="DEX"]')?.value) || 1,
            luk: parseInt(document.querySelector('[data-stat-input="LUK"]')?.value) || 1,
            job: document.querySelector('.hsr-job-name')?.innerText?.trim() || 'Novice',
            weapon: document.querySelector('#weaponSelect')?.value || 'Hand'
        };
        localStorage.setItem('statSimState', JSON.stringify(state));
    }

    loadState() {
        const saved = localStorage.getItem('statSimState');
        if (!saved) return;

        try {
            const state = JSON.parse(saved);
            
            // Update UI inputs
            const setVal = (sel, val) => {
                const el = document.querySelector(sel);
                if (el) el.value = val;
            };

            setVal('[data-stat-input="BASELV"]', state.baseLv);
            setVal('#job-level-select', state.jobLv);
            setVal('[data-stat-input="STR"]', state.str);
            setVal('[data-stat-input="AGI"]', state.agi);
            setVal('[data-stat-input="VIT"]', state.vit);
            setVal('[data-stat-input="INT"]', state.int);
            setVal('[data-stat-input="DEX"]', state.dex);
            setVal('[data-stat-input="LUK"]', state.luk);
            setVal('#weaponSelect', state.weapon);

            // Trigger sync with C#
            if (window.chrome?.webview) {
                window.chrome.webview.postMessage({
                    type: "SYNC_STATE",
                    ...state
                });
            }
        } catch (e) {
            console.error("Failed to load state", e);
        }
    }

    getPassiveStatBonus(statName) {
        const passivesData = localStorage.getItem('passiveSkills');
        if (!passivesData) return 0;

        try {
            const passives = JSON.parse(passivesData);
            let totalBonus = 0;

            passives.forEach(sk => {
                // Simplified mapping for common stat passives
                if (sk.id === 'owl_eye' && statName === 'DEX') {
                    totalBonus += sk.level;
                }
                // Add more stat passives here if needed
                // if (sk.id === 'divine_protection' && statName === 'VIT') totalBonus += Math.floor(sk.level / 2);
            });

            return totalBonus;
        } catch (e) {
            return 0;
        }
    }

    updatePassivesUI() {
        const grid = document.getElementById('passivesGrid');
        if (!grid) return;

        const passivesData = localStorage.getItem('passiveSkills');
        const passives = passivesData ? JSON.parse(passivesData) : [];

        grid.innerHTML = '';

        if (passives.length === 0) {
            grid.innerHTML = '<div class="passive-empty-tip">LEARN PASSIVE SKILLS IN THE SKILL SIMULATOR TO SEE THEM HERE</div>';
            return;
        }

        passives.forEach(sk => {
            const bar = document.createElement('div');
            bar.className = 'passive-bar';
            bar.title = sk.name;

            bar.innerHTML = `
                <div class="passive-icon">
                    <img src="Images/icons/${sk.id}.png" alt="${sk.name}">
                </div>
                <div class="passive-info">
                    <div class="passive-name">${sk.name} Lv.${sk.level}</div>
                    <div class="passive-stats">${sk.stat}</div>
                </div>
            `;
            grid.appendChild(bar);
        });
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    window.bridge = new StatBridge();
});

// Storage sync (Passives)
window.addEventListener('storage', (e) => {
    if (e.key === 'passiveSkills') {
        if (window.bridge) window.bridge.updatePassivesUI();
    }
});
