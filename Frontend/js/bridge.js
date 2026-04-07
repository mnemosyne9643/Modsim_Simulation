if (window.chrome && window.chrome.webview) {
    window.chrome.webview.addEventListener('message', event => {
        // Parse the incoming data from C#
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        // 1. Update all the labels, bonuses, and button states
        CharacterUI.render(JSON.stringify(data));

        /// If C# says we are overspent, trigger the "Snap-back"
        if (data.IsOverspent) {
            CharacterUI.syncInputs(JSON.stringify(data));
            console.warn("Points overspent! Snapping back to safe values.");
        }
    });
}


const CharacterUI = (() => {
    // ── Private helper to update individual text values ──────
    const updateElement = (key, value) => {
        const targets = document.querySelectorAll(`[data-display="${key}"]`);
        console.log(`Updating ${key} to ${value} on ${targets.length} elements`);
        targets.forEach(el => {
            if (el.tagName === 'P') {
                const label = el.innerText.split(':')[0];
                el.innerText = `${label}: ${value}`;
            } else {
                el.innerText = value;
            }
        });
    };

    // ── Update stat bonus display ────────────────────────────
    const updateStatBonus = (stat, bonus) => {
        const bonusEl = document.querySelector(`[data-stat-bonus="${stat}"]`);
        if (!bonusEl) return;

        if (bonus > 0) {
            bonusEl.textContent = `+${bonus}`;
            bonusEl.style.color = '#5fb05f';
            bonusEl.style.fontWeight = '600';
            bonusEl.style.display = 'inline';
        } else {
            bonusEl.textContent = '0';
        }
    };

    return {
        render: (jsonString) => {
            try {
                const data = JSON.parse(jsonString);



                // Update all text/combat displays
                const modifiedData = { ...data };
                CharacterUI.applyCombatPassives(modifiedData);

                Object.keys(modifiedData).forEach(key => updateElement(key, modifiedData[key]));

                // ── Display job bonuses ───────────────────────────
                updateStatBonus('STR', data.BonusStr || 0);
                updateStatBonus('AGI', data.BonusAgi || 0);
                updateStatBonus('VIT', data.BonusVit || 0);
                updateStatBonus('INT', data.BonusInt || 0);
                updateStatBonus('DEX', data.BonusDex || 0);
                updateStatBonus('LUK', data.BonusLuk || 0);


                // ── Point Restriction Logic ───────────────────────
                const remainingPoints = data.StatusPoints;
                const stats = ['Str', 'Agi', 'Vit', 'Int', 'Dex', 'Luk'];

                stats.forEach(stat => {
                    const upperStat = stat.toUpperCase();
                    const cost = data[`Next${stat}Cost`];
                    const plusBtn = document.querySelector(`.btn-plus[data-stat="${upperStat}"]`);

                    if (plusBtn) {
                        const disabled = remainingPoints < cost;
                        plusBtn.disabled = disabled;
                        plusBtn.style.opacity = disabled ? '0.5' : '1';
                        plusBtn.style.cursor = disabled ? 'not-allowed' : 'pointer';
                    }
                });

                // ── Level cap: disable + button at max ───────────
                const lvInput = document.querySelector('[data-stat-input="BASELV"]');
                const lvPlusBtn = document.querySelector('.btn-plus[data-stat="BASELV"]');
                if (lvInput && lvPlusBtn) {
                    const atMax = parseInt(lvInput.value) >= 99;
                    lvPlusBtn.disabled = atMax;
                    lvPlusBtn.style.opacity = atMax ? '0.5' : '1';
                    lvPlusBtn.style.cursor = atMax ? 'not-allowed' : 'pointer';
                }

                // ── Visual warning for Status Points ──────────────
                const pointsDisplay = document.querySelector('[data-display="StatusPoints"]');
                if (pointsDisplay) {
                    pointsDisplay.style.color = remainingPoints <= 0 ? '#ff4d4d' : 'inherit';
                }

            } catch (err) {
                console.error("Render Error:", err);
            }
        },

        syncInputs: (jsonString) => {
            const data = JSON.parse(jsonString);
            // Include all fields that have inputs
            const fieldMap = {
                'STR': data.Str,
                'AGI': data.Agi,
                'VIT': data.Vit,
                'INT': data.Int,
                'DEX': data.Dex,
                'LUK': data.Luk,
                'BASELV': data.BaseLv,
                'JOBLV': data.JobLv
            };

            Object.keys(fieldMap).forEach(key => {
                const input = document.querySelector(`[data-stat-input="${key}"]`);
                const backendValue = fieldMap[key];

                if (input && backendValue !== undefined) {
                    // Only update and flash if the UI is out of sync with C#
                    if (parseInt(input.value) !== backendValue) {
                        input.value = backendValue;

                        // Visual feedback
                        input.classList.add('flash-reset');
                        setTimeout(() => input.classList.remove('flash-reset'), 500);
                    }

                    // Also update the 'oldValue' used by your StatBridge logic
                    input.dataset.oldValue = backendValue;
                }
            });
        },

        applyCombatPassives: (data) => {
            const passivesData = localStorage.getItem('passiveSkills');
            const weapon = document.querySelector('#weaponSelect')?.value || 'hand';
            
            // Re-initialize stat bonus tracking for this render cycle
            const statBonuses = { STR: 0, AGI: 0, VIT: 0, INT: 0, DEX: 0, LUK: 0 };
            
            if (!passivesData) {
                // Clear any existing bonus labels
                Object.keys(statBonuses).forEach(stat => updateStatBonus(stat, 0));
                return;
            }

            try {
                const passives = JSON.parse(passivesData);
                
                passives.forEach(sk => {
                    const level = parseInt(sk.level) || 0;

                    // --- PRIMARY STAT PASSIVES ---
                    if (sk.id === 'owl_eye') {
                        statBonuses.DEX += level;
                        // DEX boosts Hit and Ranged Atk
                        data.Hit = (parseInt(data.Hit) || 0) + level;
                        if (weapon.includes('bow')) {
                            data.Atk = (parseInt(data.Atk) || 0) + level;
                        }
                    }
                    if (sk.id === 'divine_protection') {
                        statBonuses.VIT += level; 
                        data.Def = (parseInt(data.Def) || 0) + (level * 3);
                    }

                    // --- ATK PASSIVES (MASTERIES) ---
                    // 1H Sword / Dagger Mastery
                    if (sk.id === 'sword_mastery' && (weapon === 'one-handed_sword' || weapon === 'dagger')) {
                        data.Atk = (parseInt(data.Atk) || 0) + (level * 4);
                    }
                    // 2H Sword Mastery
                    if (sk.id === '2h_sword_mastery' && weapon === 'two-handed_sword') {
                        data.Atk = (parseInt(data.Atk) || 0) + (level * 4);
                    }
                    // Axe Mastery
                    if (sk.id === 'axe_mastery' && weapon.includes('axe')) {
                        data.Atk = (parseInt(data.Atk) || 0) + (level * 3);
                    }
                    // Mace Mastery
                    if (sk.id === 'mace_mastery' && weapon.includes('mace')) {
                        data.Atk = (parseInt(data.Atk) || 0) + (level * 3);
                    }

                    // --- MERCHANT PASSIVES ---
                    if (sk.id === 'enlarge_weight') {
                        data.MaxWeight = (parseInt(data.MaxWeight) || 0) + (level * 200);
                    }

                    // --- HIT/FLEE PASSIVES ---
                    if (sk.id === 'vulture_eye') {
                        data.Hit = (parseInt(data.Hit) || 0) + level;
                    }
                    if (sk.id === 'increase_dodge') {
                        data.Flee = (parseInt(data.Flee) || 0) + (level * 3);
                    }
                });

                // Update the green bonus labels next to stats (STR, AGI, etc)
                // We combine Job Bonus with Passive Bonus for the label
                updateStatBonus('STR', (data.BonusStr || 0) + statBonuses.STR);
                updateStatBonus('AGI', (data.BonusAgi || 0) + statBonuses.AGI);
                updateStatBonus('VIT', (data.BonusVit || 0) + statBonuses.VIT);
                updateStatBonus('INT', (data.BonusInt || 0) + statBonuses.INT);
                updateStatBonus('DEX', (data.BonusDex || 0) + statBonuses.DEX);
                updateStatBonus('LUK', (data.BonusLuk || 0) + statBonuses.LUK);

            } catch (e) {
                console.error("Failed to apply passives in UI", e);
            }
        }
    };
})();