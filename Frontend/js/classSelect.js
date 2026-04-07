'use strict';
console.log("classSelect.js loaded");

let isInternalUpdate = false;
let charPath = 'Images/ClassChar/';

    // ── CHARACTER REGISTRY ───────────────────────────────────────
    const CHARACTERS = {
        Novice: {
            sprite: charPath + 'novice.gif',
            name: 'NOVICE',
            stars: 3,
            maxJobLv: 9,
            weapons: ['Hand', 'Dagger', 'One-handed Sword', 'One-handed Axe', 'One-handed Mace', 'Two-handed Mace', 'Rod & Staff', 'Two-handed  Staff']
        },
        Swordsman: {
            sprite: charPath + 'swordman.gif',
            name: 'SWORDMAN',
            stars: 4,
            maxJobLv: 50,
            weapons: ['Hand', 'Dagger', 'One-handed sword', 'Two-handed Sword', 'One-handed Spear', 'Two-handed Spear', 'One-handed Axe', 'Two-handed Axe', 'One-handed Mace', 'Two-handed Mace']
        },
        Magician: {
            sprite: charPath + 'magician.gif',
            name: 'MAGICIAN',
            stars: 4,
            maxJobLv: 50,
            weapons: ['Hand', 'Dagger', 'Rod & Staff', 'Two-handed Staff']
        },
        Archer: {
            sprite: charPath + 'archer.gif',
            name: 'ARCHER',
            stars: 4,
            maxJobLv: 50,
            weapons: ['Hand', 'Dagger', 'Bow']
        },
        Acolyte: {
            sprite: charPath + 'acolyte.gif',
            name: 'ACOLYTE',
            stars: 4,
            maxJobLv: 50,
            weapons: ['Hand', 'One-handed Mace', 'Two-handed Mace', 'Rod & Staff', 'Two-handed Staff']
        },
        Merchant: {
            sprite: charPath + 'merchant.gif',
            name: 'MERCHANT',
            stars: 4,
            maxJobLv: 50,
            weapons: ['Hand', 'Dagger', 'One-handed Sword', 'One-handed Axe', 'Two-handed Axe', 'One-handed Mace', 'Two-handed Mace']
        },
        Thief: {
            sprite: charPath + 'thief.gif',
            name: 'THIEF',
            stars: 4,
            maxJobLv: 50,
            weapons: ['Hand', 'Dagger', 'One-handed Sword', 'One-handed Axe', 'Bow']
        },
    };

// ── DOM REFS ─────────────────────────────────────────────────
const classSelect = document.querySelector('.hsr-select');
const sprite = document.querySelector('.hsr-sprite');
const namePlate = document.querySelector('.character-name-plate h2');
const starsEl = document.querySelector('.rarity-stars');
const jobLvSelect = document.querySelector('.job-level-badge select');
const weaponSelect = document.getElementById('weaponSelect');

// ── UPDATER ──────────────────────────────────────────────────
function applyCharacter(className) {
    const char = CHARACTERS[className];
    if (!char) return;

    // 1. Start Glitch
    sprite.classList.add('glitch-flash');

    // 2. Swap content mid-glitch (around 125ms is the peak of a 250ms anim)
    setTimeout(() => {
        sprite.src = char.sprite;
        sprite.alt = char.name;

        // Remove class so it can be re-triggered later
        setTimeout(() => {
            sprite.classList.remove('glitch-flash');
        }, 150);
    }, 125);

    // Name plate
    if (namePlate) namePlate.textContent = char.name;

    // Stars
    if (starsEl) starsEl.textContent = '★'.repeat(char.stars);

    // Populate job level dropdown
    populateJobLevels(char.maxJobLv);

    // Populate weapon dropdown
    populateWeapons(char.weapons);

    // Notify C# of class change
    if (window.chrome?.webview) {
        window.chrome.webview.postMessage({
            type: 'CLASS_CHANGE',
            class: className
        });
    }

    // Save to localStorage for SkillSim sync
    saveJob(className);
}

// ── POPULATE JOB LEVEL DROPDOWN ──────────────────────────────
function populateJobLevels(maxLevel) {
    if (!jobLvSelect) return;

    const currentValue = parseInt(jobLvSelect.value) || 1;
    jobLvSelect.innerHTML = '';

    for (let i = 1; i <= maxLevel; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        jobLvSelect.appendChild(opt);
    }

    jobLvSelect.value = currentValue <= maxLevel ? currentValue : 1;
    jobLvSelect.dispatchEvent(new Event('change'));
}

// ── POPULATE WEAPON DROPDOWN ─────────────────────────────────
function populateWeapons(weapons) {
    if (!weaponSelect) return;

    const currentValue = weaponSelect.value;
    weaponSelect.innerHTML = '';

    weapons.forEach(weapon => {
        const opt = document.createElement('option');
        opt.value = weapon.toLowerCase().replace(/\s+/g, '_');
        opt.textContent = weapon;
        weaponSelect.appendChild(opt);
    });

    // Restore previous value if still valid, otherwise default to first
    const stillValid = weapons.some(w => w.toLowerCase().replace(/\s+/g, '_') === currentValue);
    weaponSelect.value = stillValid ? currentValue : weapons[0].toLowerCase().replace(/\s+/g, '_');

    // Trigger change event
    weaponSelect.dispatchEvent(new Event('change'));
}

// ── SYNC LOGIC ────────────────────────────────────────────────
const CLASS_MAPPING = {
    'Novice': 'novice',
    'Swordsman': 'swordman',
    'Magician': 'magician',
    'Archer': 'archer',
    'Acolyte': 'acolyte',
    'Merchant': 'merchant',
    'Thief': 'thief'
};

function saveJob(jobName) {
    const syncName = CLASS_MAPPING[jobName] || jobName.toLowerCase();
    localStorage.setItem('selectedJob', syncName);
}

function loadJob() {
    const savedJob = localStorage.getItem('selectedJob');
    if (!savedJob) return null;
    
    // Find the original key
    for (const [key, val] of Object.entries(CLASS_MAPPING)) {
        if (val === savedJob) return key;
    }
    return null;
}

// ── SPRITE TRANSITION STYLE ───────────────────────────────────
sprite.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

// ── INIT + LISTENERS ──────────────────────────────────────────
const savedJob = loadJob();
if (savedJob && CHARACTERS[savedJob]) {
    classSelect.value = savedJob;
}

applyCharacter(classSelect.value);

classSelect.addEventListener('change', (e) => {
    localStorage.removeItem('passiveSkills');
    applyCharacter(e.target.value);
});

// Job level change
if (jobLvSelect) {
    jobLvSelect.addEventListener('change', (e) => {

        if (isInternalUpdate) return;

        if (window.chrome?.webview) {
            window.chrome.webview.postMessage({
                type: 'JOB_LEVEL_CHANGE',
                value: parseInt(e.target.value) || 1
            });
        }
    });
}

// Weapon change
if (weaponSelect) {
    weaponSelect.addEventListener('change', (e) => {
        if (window.chrome?.webview) {
            window.chrome.webview.postMessage({
                type: 'WEAPON_CHANGE',
                weapon: e.target.value
            });
        }
    });
}