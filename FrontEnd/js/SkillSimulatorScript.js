// ═══════════════════════════════════════════
//  SKILL DATA  (Pre-Renewal RO)
// ═══════════════════════════════════════════
const CLASSES = {
  novice: {
    name: "Novice",
    sp: 9,
    skills: [
      {
        id: "basic_skill",
        name: "Basic Skill",
        maxLv: 9,
        type: ["passive"],
        desc: "Unlocks basic commands: trade, chatroom, party, emotes, sit/stand, map, change job, etc.",
        sp_cost: 0,
        cast: 0,
        stats: {
          "Unlocks": [
            "Trade",
            "Emotes",
            "Sit/Stand",
            "Chatroom",
            "Party Select",
            "Kafra Storage",
            "Party Map",
            "Job Change",
            "Maxed"
          ],
          "SP Cost": "Passive"
        },
        reqs: [],
      },
      {
        id: "q_first_aid",
        name: "First Aid",
        maxLv: 1,
        type: ["active", "support", "quest"],
        desc: "[Quest] Restores 5 HP to yourself.",
        sp_cost: [3],
        cast: 0,
        stats: {
          "HP Restore": "5",
          "SP Cost": "3",
          "How to Get": "Basic Skill Lv4 (Training Grounds)",
        },
        jobLvReq: 4,
        reqs: [],
      },
      {
        id: "q_play_dead",
        name: "Play Dead",
        maxLv: 1,
        type: ["active", "support", "quest"],
        desc: "[Quest] Feign death for 30s — most monsters ignore you.",
        sp_cost: [5],
        cast: 0,
        stats: {
          Duration: "30s",
          "SP Cost": "5",
          "How to Get": "Basic Skill Lv7 (Training Grounds)",
        },
        jobLvReq: 4,
        reqs: [],
      },
    ],
    layout: [
      { id: "basic_skill", angle: 90, dist: 160 },
      { id: "q_first_aid", angle: 63, dist: 310 },
      { id: "q_play_dead", angle: 117, dist: 310 },
    ],
  },

  swordman: {
    name: "Swordman",
    sp: 49,
    skills: [
      {
        id: "bash",
        name: "Bash",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Hits a target with crushing force. Higher levels deal more damage and increase accuracy.",
        sp_cost: [8, 8, 8, 8, 8, 15, 15, 15, 15, 15],
        cast: 0,
        stats: {
          ATK: ["130%", "160%", "190%", "210%", "240%", "270%", "310%", "340%", "370%", "400%"],
          Accuracy: ["+5%", "+10%", "+15%", "+20%", "+25%", "+30%", "+35%", "+40%", "+45%", "+50%"],
          "Fatal Stun": ["-", "-", "-", "-", "-", "5%", "10%", "15%", "20%", "25%"],
          "SP Cost": [8, 8, 8, 8, 8, 15, 15, 15, 15, 15]
        },
        reqs: [],
      },
      {
        id: "provoke",
        name: "Provoke",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Enrages a target, reducing its defense while increasing its attack power.",
        sp_cost: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        cast: 0,
        stats: {
          "Enemy ATK": ["+2%", "+4%", "+6%", "+8%", "+10%", "+12%", "+14%", "+16%", "+18%", "+20%"],
          "Enemy DEF": ["-6%", "-12%", "-18%", "-24%", "-30%", "-36%", "-42%", "-48%", "-54%", "-60%"],
          "SP Cost": 10
        },
        reqs: [],
      },
      {
        id: "hp_recovery",
        name: "HP Recovery",
        maxLv: 10,
        type: ["passive"],
        desc: "Passively boosts natural HP regeneration while standing still.",
        sp_cost: 0,
        cast: 0,
        stats: {
          "Recovery": [
            "5 HP/10s",
            "10 HP/10s",
            "15 HP/10s",
            "20 HP/10s",
            "25 HP/10s",
            "30 HP/10s",
            "35 HP/10s",
            "40 HP/10s",
            "45 HP/10s",
            "50 HP/10s"
          ],
          "Max HP Mod": ["0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "+10%"]
        },
        reqs: [],
      },
      {
        id: "sword_mastery",
        name: "Sword Mastery",
        maxLv: 10,
        type: ["passive"],
        desc: "Increases attack damage when using one-handed swords or daggers.",
        sp_cost: 0,
        cast: 0,
        stats: { "ATK Bonus": ["+4", "+8", "+12", "+16", "+20", "+24", "+28", "+32", "+36", "+40"] },
        reqs: [],
      },
      {
        id: "magnum_break",
        name: "Magnum Break",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "AoE fire strike near caster. Targets are pushed back 2 cells.",
        sp_cost: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        cast: 0,
        stats: {
          ATK: ["115%", "130%", "145%", "160%", "175%", "190%", "205%", "220%", "235%", "250%"],
          Element: "Fire",
          Radius: "5x5"
        },
        reqs: [{ id: "bash", lv: 5 }],
      },
      {
        id: "endure",
        name: "Endure",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Prevents flinching when being attacked. Canceled after a certain number of hits.",
        sp_cost: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        cast: 0,
        stats: {
          Duration: ["10s", "10s", "15s", "15s", "20s", "20s", "25s", "25s", "30s", "30s"],
          "MDEF Bonus": ["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10"],
          Hits: "7"
        },
        reqs: [{ id: "provoke", lv: 5 }],
      },
      {
        id: "2h_sword_mastery",
        name: "2H Sword Mastery",
        maxLv: 10,
        type: ["passive"],
        desc: "Increases attack damage when using two-handed swords.",
        sp_cost: 0,
        cast: 0,
        stats: { "ATK Bonus": ["+4", "+8", "+12", "+16", "+20", "+24", "+28", "+32", "+36", "+40"] },
        reqs: [{ id: "sword_mastery", lv: 1 }],
      },
      {
        id: "auto_berserk",
        name: "Auto Berserk",
        maxLv: 1,
        type: ["passive", "quest"],
        desc: "[Quest Skill] Automatically casts Provoke Lv 10 on self when HP drops below 25%.",
        sp_cost: 0,
        cast: 0,
        stats: {
          Trigger: "HP < 25%",
          Effect: "Provoke Lv10",
          "Obtainment": "Free (Quest)"
        },
        jobLvReq: 30,
        reqs: [],
      },
      {
        id: "q_moving_hp_recovery",
        name: "Moving HP Recovery",
        maxLv: 1,
        type: ["passive", "quest"],
        desc: "[Quest Skill] Allows HP to recover naturally even while moving.",
        sp_cost: 0,
        cast: 0,
        stats: { Effect: "HP Regen while moving", "Obtainment": "Free (Quest)" },
        jobLvReq: 35,
        reqs: [],
      },
      {
        id: "q_fatal_blow",
        name: "Fatal Blow",
        maxLv: 1,
        type: ["active", "offensive", "quest"],
        desc: "[Quest Skill] Adds a chance to stun enemies when using Bash at level 6 or higher.",
        sp_cost: 0,
        cast: 0,
        stats: { Effect: "Stun on Bash Lv6+", "Obtainment": "Free (Quest)" },
        jobLvReq: 30,
        reqs: [],
      },
    ],
    layout: [
      // Ring 1 — 4 root skills spread 47°–122°
      { id: "bash", angle: 47, dist: 160 },
      { id: "provoke", angle: 77, dist: 160 },
      { id: "hp_recovery", angle: 102, dist: 160 },
      { id: "sword_mastery", angle: 132, dist: 160 },
      // Ring 2 — children directly above parents
      { id: "magnum_break", angle: 47, dist: 320 },
      { id: "endure", angle: 77, dist: 320 },
      { id: "2h_sword_mastery", angle: 122, dist: 320 },
      // Quest skills — outer ring
      { id: "q_fatal_blow", angle: 20, dist: 160 },
      { id: "q_moving_hp_recovery", angle: 160, dist: 160 },
      { id: "auto_berserk", angle: 180, dist: 320 },
    ],
  },

  magician: {
    name: "Magician",
    sp: 49,
    skills: [
      {
        id: "sp_recovery",
        name: "Increase SP Recovery",
        maxLv: 10,
        type: ["passive"],
        desc: "Passively increases natural SP recovery speed while not moving.",
        sp_cost: 0,
        cast: 0,
        stats: {
          Bonus: ["+3 SP/10s", "+6 SP/10s", "+9 SP/10s", "+12 SP/10s", "+15 SP/10s", "+18 SP/10s", "+21 SP/10s", "+24 SP/10s", "+27 SP/10s", "+30 SP/10s"],
          "Max SP Mod": ["0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "+10%"]
        },
        reqs: [],
      },
      {
        id: "napalm_beat",
        name: "Napalm Beat",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Ghost-element magic that hits enemies in a 3x3 area around the target.",
        sp_cost: [9, 9, 9, 11, 11, 11, 13, 13, 13, 15],
        cast: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
        stats: {
          MATK: ["80%", "90%", "100%", "110%", "120%", "130%", "140%", "150%", "160%", "170%"],
          Element: "Ghost",
          Area: "3x3"
        },
        reqs: [],
      },
      {
        id: "sight",
        name: "Sight",
        maxLv: 1,
        type: ["active", "support"],
        desc: "Reveals hidden enemies in a 7x7 area around the caster.",
        sp_cost: [10],
        cast: [0],
        stats: { Area: "7x7", Duration: "10s", SP: "10" },
        reqs: [],
      },
      {
        id: "cold_bolt",
        name: "Cold Bolt",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Fires Water-element bolts at a single target.",
        sp_cost: [12, 12, 12, 12, 12, 14, 14, 14, 16, 16],
        cast: [0.7, 1.4, 2.1, 2.8, 3.5, 4.2, 4.9, 5.6, 6.3, 7.0],
        stats: {
          Bolts: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          MATK: ["100%", "200%", "300%", "400%", "500%", "600%", "700%", "800%", "900%", "1000%"],
          Element: "Water"
        },
        reqs: [],
      },
      {
        id: "stone_curse",
        name: "Stone Curse",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Attempts to petrify an enemy, turning them into stone.",
        sp_cost: [25, 24, 23, 22, 21, 20, 19, 18, 17, 16],
        cast: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        stats: {
          Success: ["24%", "28%", "32%", "36%", "40%", "44%", "48%", "52%", "56%", "60%"],
          Effect: "Petrify",
          Requirement: "1 Red Gemstone"
        },
        reqs: [],
      },
      {
        id: "fire_bolt",
        name: "Fire Bolt",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Fires Fire-element bolts at a single target.",
        sp_cost: [12, 12, 12, 12, 12, 14, 14, 14, 16, 16],
        cast: [0.7, 1.4, 2.1, 2.8, 3.5, 4.2, 4.9, 5.6, 6.3, 7.0],
        stats: {
          Bolts: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          MATK: ["100%", "200%", "300%", "400%", "500%", "600%", "700%", "800%", "900%", "1000%"],
          Element: "Fire"
        },
        reqs: [],
      },
      {
        id: "lightning_bolt",
        name: "Lightning Bolt",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Fires Wind-element bolts at a single target.",
        sp_cost: [12, 12, 12, 12, 12, 14, 14, 14, 16, 16],
        cast: [0.7, 1.4, 2.1, 2.8, 3.5, 4.2, 4.9, 5.6, 6.3, 7.0],
        stats: {
          Bolts: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          MATK: ["100%", "200%", "300%", "400%", "500%", "600%", "700%", "800%", "900%", "1000%"],
          Element: "Wind"
        },
        reqs: [],
      },
      {
        id: "q_energy_coat",
        name: "Energy Coat",
        maxLv: 1,
        type: ["active", "support", "quest"],
        desc: "[Quest Skill] Creates a barrier that reduces incoming damage at the cost of SP.",
        sp_cost: [30],
        cast: [1],
        stats: { "Red. Max": "30%", Duration: "5m", "Obtainment": "Free (Quest)" },
        jobLvReq: 35,
        reqs: [],
      },
      {
        id: "soul_strike",
        name: "Soul Strike",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Fires Ghost-element bolts rapidly at a single target.",
        sp_cost: [18, 18, 24, 24, 30, 30, 36, 36, 42, 42],
        cast: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
        stats: {
          Bolts: ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5"],
          MATK: ["100%", "100%", "200%", "200%", "300%", "300%", "400%", "400%", "500%", "500%"],
          Element: "Ghost"
        },
        reqs: [{ id: "napalm_beat", lv: 4 }],
      },
      {
        id: "frost_diver",
        name: "Frost Diver",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Strikes a target with Water magic and has a chance to freeze them.",
        sp_cost: [25, 24, 23, 22, 21, 20, 19, 18, 17, 16],
        cast: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        stats: {
          MATK: ["110%", "120%", "130%", "140%", "150%", "160%", "170%", "180%", "190%", "200%"],
          Freeze: ["38%", "41%", "44%", "47%", "50%", "53%", "56%", "59%", "62%", "65%"],
          Element: "Water"
        },
        reqs: [{ id: "cold_bolt", lv: 5 }],
      },
      {
        id: "fire_ball",
        name: "Fire Ball",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Hurls a fireball that explodes in a 5x5 area.",
        sp_cost: [25, 25, 25, 25, 25, 30, 30, 30, 30, 30],
        cast: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
        stats: {
          MATK: ["115%", "130%", "145%", "160%", "175%", "190%", "205%", "220%", "235%", "250%"],
          Area: "5x5",
          Element: "Fire"
        },
        reqs: [{ id: "fire_bolt", lv: 4 }],
      },
      {
        id: "fire_wall",
        name: "Fire Wall",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Creates a wall of fire on the ground that hits enemies passing through.",
        sp_cost: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
        cast: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        stats: {
          Hits: ["4", "5", "6", "7", "8", "9", "10", "11", "12", "14"],
          Duration: ["10s", "11s", "12s", "13s", "14s", "15s", "16s", "17s", "18s", "23s"],
          Element: "Fire"
        },
        reqs: [
          { id: "sight", lv: 1 },
          { id: "fire_ball", lv: 5 },
        ],
      },
      {
        id: "safety_wall",
        name: "Safety Wall",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Creates a barrier on one cell that blocks physical melee attacks.",
        sp_cost: [30, 30, 30, 30, 30, 40, 40, 40, 40, 40],
        cast: [4, 3.5, 3, 2.5, 2, 1.5, 1, 1, 1, 1],
        stats: {
          Hits: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
          Duration: ["5s", "10s", "15s", "20s", "25s", "30s", "35s", "40s", "45s", "50s"],
          "Cost": "1 Blue Gem"
        },
        reqs: [
          { id: "napalm_beat", lv: 7 },
          { id: "soul_strike", lv: 5 },
        ],
      },
      {
        id: "thunderstorm",
        name: "Thunder Storm",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Calls down lightning bolts in a 5x5 area.",
        sp_cost: [29, 34, 39, 44, 49, 54, 59, 64, 69, 74],
        cast: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        stats: {
          MATK: ["100%", "200%", "300%", "400%", "500%", "600%", "700%", "800%", "900%", "1000%"],
          Area: "5x5",
          Element: "Wind"
        },
        reqs: [{ id: "lightning_bolt", lv: 4 }],
      },
    ],
    layout: [
      // Ring 1 — base skills spread 25-155 degrees
      { id: "cold_bolt", angle: 35, dist: 165 },
      { id: "napalm_beat", angle: 60, dist: 165 },
      { id: "fire_bolt", angle: 82, dist: 165 },
      { id: "lightning_bolt", angle: 104, dist: 165 },
      { id: "sp_recovery", angle: 130, dist: 165 },
      { id: "sight", angle: 10, dist: 220 },
      { id: "stone_curse", angle: 155, dist: 165 },
      // Quest
      { id: "q_energy_coat", angle: 180, dist: 310 },
      // Ring 2 — unlockables
      { id: "soul_strike", angle: 45, dist: 400 },
      { id: "frost_diver", angle: 35, dist: 310 },
      { id: "fire_ball", angle: 82, dist: 310 },
      { id: "thunderstorm", angle: 104, dist: 310 },
      // Ring 3
      { id: "fire_wall", angle: 72, dist: 460 },
      { id: "safety_wall", angle: 51, dist: 460 },
    ],
  },

  archer: {
    name: "Archer",
    sp: 49,
    skills: [
      {
        id: "owl_eye",
        name: "Owl's Eye",
        maxLv: 10,
        type: ["passive"],
        desc: "Passively increases DEX by 1 per level.",
        sp_cost: 0,
        cast: 0,
        stats: { DEX: ["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10"] },
        reqs: [],
      },
      {
        id: "double_strafe",
        name: "Double Strafing",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Shoots two arrows rapidly at a single target.",
        sp_cost: [12, 12, 12, 12, 14, 14, 14, 14, 16, 16],
        cast: 0,
        stats: {
          ATK: ["200%", "220%", "240%", "260%", "280%", "300%", "320%", "340%", "360%", "380%"],
          Hits: "2",
          Element: "Arrow Base"
        },
        reqs: [],
      },
      {
        id: "q_making_arrow",
        name: "Making Arrow",
        maxLv: 1,
        type: ["active", "support", "quest"],
        desc: "[Quest Skill] Converts materials into different types of arrows.",
        sp_cost: [10],
        cast: 0,
        stats: { "Obtainment": "Free (Quest)", SP: "10" },
        jobLvReq: 30,
        reqs: [],
      },
      {
        id: "q_charge_arrow",
        name: "Charge Arrow",
        maxLv: 1,
        type: ["active", "offensive", "quest"],
        desc: "[Quest Skill] Fires a powerful arrow that knocks back the target.",
        sp_cost: [15],
        cast: [1.5],
        stats: { ATK: "150%", Knockback: "6 cells", "Obtainment": "Free (Quest)" },
        jobLvReq: 35,
        reqs: [],
      },
      {
        id: "vulture_eye",
        name: "Vulture's Eye",
        maxLv: 10,
        type: ["passive"],
        desc: "Increases attack range and Hit rate with bows.",
        sp_cost: 0,
        cast: 0,
        stats: {
          Range: ["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10"],
          HIT: ["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10"]
        },
        reqs: [{ id: "owl_eye", lv: 3 }],
      },
      {
        id: "improve_concentration",
        name: "Attention Concentrate",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Temporarily boosts AGI and DEX. Also reveals hidden enemies nearby.",
        sp_cost: [25, 27, 29, 31, 33, 35, 37, 39, 41, 45],
        cast: 0,
        stats: {
          "AGI/DEX": ["+3%", "+4%", "+5%", "+6%", "+7%", "+8%", "+9%", "+10%", "+11%", "+12%"],
          Duration: ["40s", "50s", "60s", "70s", "80s", "90s", "100s", "110s", "120s", "160s"]
        },
        reqs: [{ id: "vulture_eye", lv: 1 }],
      },
      {
        id: "arrow_shower",
        name: "Arrow Shower",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Fires a volley of arrows damaging all enemies in a small area.",
        sp_cost: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        cast: 0,
        stats: {
          ATK: ["80%", "85%", "90%", "95%", "100%", "105%", "110%", "115%", "120%", "125%"],
          Area: "3x3",
          Knockback: "2 cells"
        },
        reqs: [{ id: "double_strafe", lv: 5 }],
      },
    ],
    layout: [
      { id: "owl_eye", angle: 75, dist: 165 },
      { id: "double_strafe", angle: 105, dist: 165 },
      { id: "q_making_arrow", angle: 48, dist: 165 },
      { id: "q_charge_arrow", angle: 132, dist: 165 },
      { id: "vulture_eye", angle: 63, dist: 320 },
      { id: "improve_concentration", angle: 90, dist: 320 },
      { id: "arrow_shower", angle: 113, dist: 320 },
    ],
  },

  acolyte: {
    name: "Acolyte",
    sp: 49,
    skills: [
      {
        id: "divine_protection",
        name: "Divine Protection",
        maxLv: 10,
        type: ["passive"],
        desc: "Increases defense against Undead and Demon monsters.",
        sp_cost: 0,
        cast: 0,
        stats: { "DEF Bonus": ["+3", "+6", "+9", "+12", "+15", "+18", "+21", "+24", "+27", "+30"] },
        reqs: [],
      },
      {
        id: "ruwach",
        name: "Ruwach",
        maxLv: 1,
        type: ["active", "support"],
        desc: "Detects hidden enemies and deals Holy damage in a 5x5 area.",
        sp_cost: [10],
        cast: [0],
        stats: { Area: "5x5", MATK: "145%", Element: "Holy", SP: "10" },
        reqs: [],
      },
      {
        id: "heal",
        name: "Heal",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Restores HP to a target. Deals damage to Undead monsters.",
        sp_cost: [13, 16, 19, 22, 25, 28, 31, 34, 37, 40],
        cast: [0],
        stats: {
          HP_Restored: ["~40", "~80", "~130", "~190", "~260", "~340", "~430", "~530", "~640", "~760"],
          "vs Undead": "Damage",
          Range: "9 cells"
        },
        reqs: [],
      },
      {
        id: "aqua_benedicta",
        name: "Aqua Benedicta",
        maxLv: 1,
        type: ["active", "support"],
        desc: "Creates Holy Water while standing in water.",
        sp_cost: [10],
        cast: [1],
        stats: { Creates: "1 Holy Water", "Cost": "1 Empty Bottle", SP: "10" },
        reqs: [],
      },
      {
        id: "q_holy_light",
        name: "Holy Light",
        maxLv: 1,
        type: ["active", "offensive", "quest"],
        desc: "[Quest Skill] Strikes a target with a burst of Holy light.",
        sp_cost: [15],
        cast: [2],
        stats: { MATK: "125%", Element: "Holy", "Obtainment": "Free (Quest)" },
        jobLvReq: 30,
        reqs: [],
      },
      {
        id: "demon_bane",
        name: "Demon Bane",
        maxLv: 10,
        type: ["passive"],
        desc: "Increases attack damage against Undead and Demon monsters.",
        sp_cost: 0,
        cast: 0,
        stats: { "ATK Bonus": ["+3", "+6", "+9", "+12", "+15", "+18", "+21", "+24", "+27", "+30"] },
        reqs: [{ id: "divine_protection", lv: 3 }],
      },
      {
        id: "teleportation",
        name: "Teleportation",
        maxLv: 2,
        type: ["active", "support"],
        desc: "Instantly moves the caster to a random or fixed location.",
        sp_cost: [10, 9],
        cast: [0, 0],
        stats: { Effect: ["Random Spot", "Saved City"], SP: ["10", "9"] },
        reqs: [{ id: "ruwach", lv: 1 }],
      },
      {
        id: "warp_portal",
        name: "Warp Portal",
        maxLv: 4,
        type: ["active", "support"],
        desc: "Creates a portal that teleports people to a remembered location.",
        sp_cost: [35, 35, 35, 35],
        cast: [1, 1, 1, 1],
        stats: {
          Memo: ["1 location", "2 locations", "3 locations", "3 locations"],
          Capacity: "8 people",
          "Cost": "1 Blue Gem"
        },
        reqs: [{ id: "teleportation", lv: 2 }],
      },
      {
        id: "pneuma",
        name: "Pneuma",
        maxLv: 1,
        type: ["active", "support"],
        desc: "Creates a 3x3 barrier that blocks all long-range physical attacks.",
        sp_cost: [10],
        cast: [0],
        stats: { Area: "3x3", Duration: "10s", Effect: "Blocks Ranged" },
        reqs: [{ id: "warp_portal", lv: 4 }],
      },
      {
        id: "increase_agi",
        name: "Increase Agility",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Temporarily increases a target's AGI and movement speed.",
        sp_cost: [18, 21, 24, 27, 30, 33, 36, 39, 42, 45],
        cast: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        stats: {
          AGI: ["+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10", "+11", "+12"],
          Duration: ["40s", "60s", "80s", "100s", "120s", "140s", "160s", "180s", "200s", "220s"]
        },
        reqs: [{ id: "heal", lv: 3 }],
      },
      {
        id: "decrease_agi",
        name: "Decrease Agility",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Attempts to reduce an enemy's AGI and movement speed.",
        sp_cost: [15, 17, 19, 21, 23, 25, 27, 29, 31, 33],
        cast: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        stats: {
          Success: ["42%", "44%", "46%", "48%", "50%", "52%", "54%", "56%", "58%", "60%"],
          AGI_Red: ["-3", "-4", "-5", "-6", "-7", "-8", "-9", "-10", "-11", "-12"]
        },
        reqs: [{ id: "increase_agi", lv: 1 }],
      },
      {
        id: "signum_crusis",
        name: "Signum Crusis",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Reduces the defense of all Undead and Demon monsters on screen.",
        sp_cost: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
        cast: [0.5],
        stats: {
          "DEF Red": ["-14%", "-18%", "-22%", "-26%", "-30%", "-34%", "-38%", "-42%", "-46%", "-50%"],
          Target: "Screen Wide"
        },
        reqs: [{ id: "demon_bane", lv: 3 }],
      },
      {
        id: "angelus",
        name: "Angelus",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Temporarily increases the soft defense of all party members.",
        sp_cost: [23, 26, 29, 32, 35, 38, 41, 44, 47, 50],
        cast: [0.5],
        stats: {
          "VitDEF Bonus": ["+5%", "+10%", "+15%", "+20%", "+25%", "+30%", "+35%", "+40%", "+45%", "+50%"],
          Duration: ["30s", "60s", "90s", "120s", "150s", "180s", "210s", "240s", "270s", "300s"]
        },
        reqs: [{ id: "divine_protection", lv: 3 }],
      },
      {
        id: "blessing",
        name: "Blessing",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Temporarily increases a target's STR, INT, and DEX.",
        sp_cost: [28, 32, 36, 40, 44, 48, 52, 56, 60, 64],
        cast: [0],
        stats: {
          "Stats Bonus": ["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10"],
          Duration: ["60s", "80s", "100s", "120s", "140s", "160s", "180s", "200s", "220s", "240s"]
        },
        reqs: [{ id: "divine_protection", lv: 5 }],
      },
      {
        id: "cure",
        name: "Cure",
        maxLv: 1,
        type: ["active", "support"],
        desc: "Removes Silence, Chaos, and Blind status effects.",
        sp_cost: [15],
        cast: [0],
        stats: { Cures: "Silence/Chaos/Blind", SP: "15" },
        reqs: [{ id: "heal", lv: 2 }],
      },
    ],
    layout: [
      // Ring 1 — 4 base + 1 quest (25-145 degrees, 30 apart)
      { id: "divine_protection", angle: 35, dist: 165 },
      { id: "ruwach", angle: 65, dist: 165 },
      { id: "heal", angle: 90, dist: 190 },
      { id: "aqua_benedicta", angle: 115, dist: 165 },
      { id: "q_holy_light", angle: 140, dist: 165 },
      // Ring 2 — unlockables branching from their parents
      { id: "demon_bane", angle: 45, dist: 315 },
      { id: "angelus", angle: 30, dist: 315 },
      { id: "blessing", angle: 15, dist: 315 },
      { id: "teleportation", angle: 65, dist: 315 },
      { id: "warp_portal", angle: 65, dist: 460 },
      { id: "pneuma", angle: 65, dist: 590 },
      { id: "increase_agi", angle: 90, dist: 315 },
      { id: "decrease_agi", angle: 90, dist: 460 },
      { id: "signum_crusis", angle: 45, dist: 420 },
      { id: "cure", angle: 105, dist: 315 },
    ],
  },

  merchant: {
    name: "Merchant",
    sp: 49,
    skills: [
      {
        id: "enlarge_weight",
        name: "Enlarge Weight Limit",
        maxLv: 10,
        type: ["passive"],
        desc: "Passively increases the maximum weight the merchant can carry.",
        sp_cost: 0,
        cast: 0,
        stats: { "Weight Bonus": ["+200", "+400", "+600", "+800", "+1000", "+1200", "+1400", "+1600", "+1800", "+2000"] },
        reqs: [],
      },
      {
        id: "identify",
        name: "Item Appraisal",
        maxLv: 1,
        type: ["active", "support"],
        desc: "Identifies an unknown 'Appraisal' item.",
        sp_cost: [10],
        cast: [0],
        stats: { Effect: "Identify Item", SP: "10" },
        reqs: [],
      },
      {
        id: "mammonite",
        name: "Mammonite",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Strikes a target with great force at the cost of Zeny.",
        sp_cost: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        cast: [0],
        stats: {
          ATK: ["150%", "200%", "250%", "300%", "350%", "400%", "450%", "500%", "550%", "600%"],
          "Cost (Zeny)": ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"]
        },
        reqs: [],
      },
      {
        id: "q_loud_exclamation",
        name: "Loud Exclamation",
        maxLv: 1,
        type: ["active", "support", "quest"],
        desc: "[Quest Skill] Shouts loudly to temporarily increase personal strength.",
        sp_cost: [8],
        cast: [0],
        stats: { STR: "+4", Duration: "5m", "Obtainment": "Free (Quest)" },
        jobLvReq: 15,
        reqs: [],
      },
      {
        id: "q_cart_revolution",
        name: "Cart Revolution",
        maxLv: 1,
        type: ["active", "offensive", "quest"],
        desc: "[Quest Skill] Swings the cart to damage all nearby enemies and push them back.",
        sp_cost: [12],
        cast: [0],
        stats: { ATK: "150% + CartWeight", Radius: "3x3", "Obtainment": "Free (Quest)" },
        jobLvReq: 35,
        reqs: [{ id: "pushcart", lv: 1 }],
      },
      {
        id: "q_change_cart",
        name: "Change Cart",
        maxLv: 1,
        type: ["active", "support", "quest"],
        desc: "[Quest Skill] Changes the appearance of the merchant's cart.",
        sp_cost: [40],
        cast: [0],
        stats: { Effect: "Change Visuals", "Obtainment": "Free (Quest)" },
        jobLvReq: 30,
        reqs: [{ id: "pushcart", lv: 1 }],
      },
      {
        id: "q_cart_decoration",
        name: "Cart Decoration",
        maxLv: 1,
        type: ["passive", "quest"],
        desc: "[Quest Skill] Allows cart decoration. Also permanently increases INT by 1.",
        sp_cost: 0,
        cast: 0,
        stats: { INT: "+1", "Obtainment": "Free (Quest)" },
        jobLvReq: 0,
        reqs: [{ id: "q_change_cart", lv: 1 }],
      },
      {
        id: "discount",
        name: "Discount",
        maxLv: 10,
        type: ["passive"],
        desc: "Reduces NPC purchase prices.",
        sp_cost: 0,
        cast: 0,
        stats: { "Buy Discount": ["9%", "11%", "13%", "15%", "17%", "19%", "21%", "23%", "24%", "24%"] },
        reqs: [{ id: "enlarge_weight", lv: 3 }],
      },
      {
        id: "overcharge",
        name: "Overcharge",
        maxLv: 10,
        type: ["passive"],
        desc: "Increases NPC sell prices.",
        sp_cost: 0,
        cast: 0,
        stats: { "Sell Bonus": ["7%", "9%", "11%", "13%", "15%", "17%", "19%", "21%", "23%", "24%"] },
        reqs: [{ id: "discount", lv: 3 }],
      },
      {
        id: "pushcart",
        name: "Pushcart",
        maxLv: 10,
        type: ["passive"],
        desc: "Attaches a cart for extra item storage weight.",
        sp_cost: 0,
        cast: 0,
        stats: { "Move Penalty": ["-50%", "-45%", "-40%", "-35%", "-30%", "-25%", "-20%", "-15%", "-10%", "None"] },
        reqs: [{ id: "enlarge_weight", lv: 5 }],
      },
      {
        id: "vending",
        name: "Vending",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Opens a personal vendor shop to sell items to other players.",
        sp_cost: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        cast: [0],
        stats: { "Item Slots": ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] },
        reqs: [{ id: "pushcart", lv: 3 }],
      },
      {
        id: "buying_store",
        name: "Buying Store",
        maxLv: 1,
        type: ["active", "support", "quest"],
        desc: "Opens a buying shop to purchase specific items from other players.",
        sp_cost: [30],
        cast: [0],
        stats: { SP: "30", "Obtainment": "Free (Quest)" },
        jobLvReq: 0,
        reqs: [{ id: "vending", lv: 1 }],
      },
    ],
    layout: [
      // Ring 1 — 3 base + quest skills
      { id: "enlarge_weight", angle: 60, dist: 165 },
      { id: "identify", angle: 90, dist: 165 },
      { id: "mammonite", angle: 120, dist: 165 },
      { id: "q_loud_exclamation", angle: 145, dist: 165 },
      // Ring 2 — unlockables
      { id: "discount", angle: 45, dist: 315 },
      { id: "overcharge", angle: 45, dist: 460 },
      { id: "pushcart", angle: 72, dist: 315 },
      { id: "vending", angle: 72, dist: 460 },
      { id: "buying_store", angle: 72, dist: 590 },
      // Quest skills off pushcart
      { id: "q_cart_revolution", angle: 94, dist: 345 },
      { id: "q_change_cart", angle: 110, dist: 315 },
      { id: "q_cart_decoration", angle: 110, dist: 460 },
    ],
  },

  thief: {
    name: "Thief",
    sp: 49,
    skills: [
      {
        id: "double_attack",
        name: "Double Attack",
        maxLv: 10,
        type: ["passive"],
        desc: "Passively grants a chance to deal two hits with a dagger.",
        sp_cost: 0,
        cast: 0,
        stats: {
          Chance: ["5%", "10%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", "50%"],
          Weapon: "Dagger"
        },
        reqs: [],
      },
      {
        id: "increase_dodge",
        name: "Increase Dodge",
        maxLv: 10,
        type: ["passive"],
        desc: "Passively increases FLEE rate.",
        sp_cost: 0,
        cast: 0,
        stats: { FLEE: ["+3", "+6", "+9", "+12", "+15", "+18", "+21", "+24", "+27", "+30"] },
        reqs: [],
      },
      {
        id: "steal",
        name: "Steal",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Attempts to steal an item from a target enemy.",
        sp_cost: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        cast: [0],
        stats: {
          Success: ["DEX-linked", "DEX-linked", "DEX-linked", "DEX-linked", "DEX-linked", "DEX-linked", "DEX-linked", "DEX-linked", "DEX-linked", "DEX-linked"],
          SP: "10"
        },
        reqs: [],
      },
      {
        id: "envenom",
        name: "Envenom",
        maxLv: 10,
        type: ["active", "offensive"],
        desc: "Attacks with a poison-coated weapon. Chance to inflict Poison status.",
        sp_cost: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        cast: [0],
        stats: {
          ATK: ["115%", "130%", "145%", "160%", "175%", "190%", "205%", "220%", "235%", "250%"],
          Poison: ["14%", "18%", "22%", "26%", "30%", "34%", "38%", "42%", "46%", "50%"]
        },
        reqs: [],
      },
      {
        id: "q_sprinkle_sand",
        name: "Sand Attack",
        maxLv: 1,
        type: ["active", "offensive", "quest"],
        desc: "[Quest Skill] Throws sand to damage an enemy and potentially Blind them.",
        sp_cost: [9],
        cast: [0],
        stats: { ATK: "130%", Blind: "15%", Element: "Earth", "Obtainment": "Free (Quest)" },
        jobLvReq: 25,
        reqs: [],
      },
      {
        id: "q_back_sliding",
        name: "Back Sliding",
        maxLv: 1,
        type: ["active", "support", "quest"],
        desc: "[Quest Skill] Slides backward rapidly to escape danger.",
        sp_cost: [7],
        cast: [0],
        stats: { Effect: "Reverse Move", SP: "7", "Obtainment": "Free (Quest)" },
        jobLvReq: 35,
        reqs: [],
      },
      {
        id: "q_pick_stone",
        name: "Pick Stone",
        maxLv: 1,
        type: ["active", "support", "quest"],
        desc: "[Quest Skill] Picks up a stone from the ground.",
        sp_cost: [2],
        cast: [0],
        stats: { Creates: "1 Stone", SP: "2", "Obtainment": "Free (Quest)" },
        jobLvReq: 20,
        reqs: [],
      },
      {
        id: "q_throw_stone",
        name: "Throw Stone",
        maxLv: 1,
        type: ["active", "offensive", "quest"],
        desc: "[Quest Skill] Throws a stone to deal fixed damage and potentially stun the target.",
        sp_cost: [2],
        cast: [0],
        stats: { Damage: "50 Fixed", Stun: "5%", "Obtainment": "Free (Quest)" },
        jobLvReq: 15,
        reqs: [],
      },
      {
        id: "hiding",
        name: "Hiding",
        maxLv: 10,
        type: ["active", "support"],
        desc: "Conceals the user underground. Canceled if SP reaches 0.",
        sp_cost: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        cast: [0],
        stats: {
          Duration: ["30s", "60s", "90s", "120s", "150s", "180s", "210s", "240s", "270s", "300s"],
          "SP Drain": ["1/s", "1/s", "1/s", "1/s", "1/s", "1/s", "1/s", "1/s", "1/s", "1/s"]
        },
        reqs: [{ id: "steal", lv: 5 }],
      },
      {
        id: "detoxify",
        name: "Detoxify",
        maxLv: 1,
        type: ["active", "support"],
        desc: "Cures the Poison status effect from itself or others.",
        sp_cost: [10],
        cast: [0],
        stats: { Cures: "Poison", SP: "10" },
        reqs: [{ id: "envenom", lv: 3 }],
      },
    ],
    layout: [
      // Ring 1 — 4 base + 2 quest skills
      { id: "double_attack", angle: 38, dist: 165 },
      { id: "increase_dodge", angle: 65, dist: 165 },
      { id: "steal", angle: 92, dist: 165 },
      { id: "envenom", angle: 119, dist: 165 },
      { id: "q_sprinkle_sand", angle: -5, dist: 165 },
      { id: "q_back_sliding", angle: 15, dist: 165 },
      // Quest skills (stone related)
      { id: "q_pick_stone", angle: 180, dist: 165 },
      { id: "q_throw_stone", angle: 150, dist: 165 },
      // Ring 2 — unlockables
      { id: "hiding", angle: 82, dist: 315 },
      { id: "detoxify", angle: 112, dist: 315 },
    ],
  },
};

// ═══════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════
let currentClass = "novice",
  learnedSkills = {},
  selectedSkill = null;
let currentJobLv = 1; // tracked job level
Object.keys(CLASSES).forEach((c) => {
  learnedSkills[c] = {};
});

// Job level max per class (pre-renewal first class = 50)
const JOB_LV_MAX = {
  novice: 10,
  swordman: 50,
  magician: 50,
  archer: 50,
  acolyte: 50,
  merchant: 50,
  thief: 50,
};

// ─ JOB LEVEL SELECTOR ─
const joblvSelect = document.getElementById("joblv-select");
const joblvBadge = document.getElementById("joblv-badge");

function buildJobLvOptions(cls) {
  const max = JOB_LV_MAX[cls] || 50;
  joblvSelect.innerHTML = "";
  for (let i = 1; i <= max; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    if (i === currentJobLv) opt.selected = true;
    joblvSelect.appendChild(opt);
  }
  updateJobLvBadge();
}

function updateJobLvBadge() {
  // Show a key icon if any quest skills become available at current job lv
  const cls = CLASSES[currentClass];
  const unlockable = cls.skills.filter(
    (sk) =>
      sk.type.includes("quest") &&
      (sk.jobLvReq || 0) > 0 &&
      currentJobLv >= (sk.jobLvReq || 0) &&
      getSkillLv(currentClass, sk.id) === 0
  );
  joblvBadge.textContent = unlockable.length > 0 ? "🗝" : "▲";
  joblvBadge.style.color = unlockable.length > 0 ? "var(--teal)" : "var(--dim)";
}

joblvSelect.addEventListener("change", () => {
  if (currentJobLv > parseInt(joblvSelect.value)) {
    resetSelection();
  }

  currentJobLv = parseInt(joblvSelect.value);

  updateJobLvBadge();
  updateSPDisplay();
  renderTree();
  // refresh info panel if a skill is selected
  if (selectedSkill) showSkillInfo(selectedSkill);
});

// For fallback
const resetSelection = () => {
    learnedSkills[currentClass] = {};
    selectedSkill = null;
}

// ─ WHEEL ─
const wheelEl = document.getElementById("wheel");
const items = wheelEl.querySelectorAll(".wheel-item");
const ITEM_H = 36;

function selectClass(idx) {
  items.forEach((el, i) => el.classList.toggle("active", i === idx));
  const off = -(idx * ITEM_H) + (7 * ITEM_H) / 2 - ITEM_H / 2;
  wheelEl.style.transform = `translateY(${off}px)`;
  const el = items[idx];
  const cls = el.dataset.class;
  document.getElementById("current-label").textContent =
    CLASSES[cls].name.toUpperCase();
  document.getElementById("class-title").textContent =
    CLASSES[cls].name.toUpperCase();
  currentClass = cls;
  resetSelection();
  currentJobLv = 1; // reset job level when switching class
  buildJobLvOptions(cls);
  updateSPDisplay();
  renderTree();
  hideSkillInfo();
  // load character gif
  const gifSrc = el.dataset.gif;
  const frame = document.getElementById("char-frame");
  const ph = document.getElementById("char-placeholder");
  const old = frame.querySelector("img");
  if (old) old.remove();
  if (gifSrc) {
    const img = document.createElement("img");
    img.src = gifSrc;
    img.alt = CLASSES[cls].name;
    img.style.cssText =
      "image-rendering:pixelated;max-width:100%;max-height:100%;object-fit:contain;position:absolute;inset:0;width:100%;height:100%;";
    img.onload = () => {
      if (ph) ph.style.display = "none";
    };
    img.onerror = () => {
      img.remove();
      if (ph) ph.style.display = "";
    };
    frame.appendChild(img);
  }
}
items.forEach((el, i) => el.addEventListener("click", () => selectClass(i)));

// ─ SP ─
function getTotalSpent(c) {
  return Object.values(learnedSkills[c] || {}).reduce((s, v) => s + v, 0);
}
function getRemaining(c) {
  CLASSES[c].sp = currentJobLv - 1;
  return CLASSES[c].sp - getTotalSpent(c);
}
function updateSPDisplay() {
  document.getElementById("sp-display").textContent =
    getRemaining(currentClass);
}

// ─ QUEST JOB LEVEL CHECK ─
// Returns true if a quest skill is locked due to job level requirement
function isQuestJobLocked(skill) {
  if (!skill.type.includes("quest")) return false;
  const req = skill.jobLvReq || 0;
  return req > 0 && currentJobLv < req;
}

// ─ CANVAS ─
const canvasWrap = document.getElementById("canvas-wrap");
const canvas = document.getElementById("tree-canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

let camX = 0,
  camY = 0,
  camScale = 1;
let isDragging = false,
  dragStart = { x: 0, y: 0 },
  camAtDrag = { x: 0, y: 0 };
const NS = 30; // node half-size — bigger for icon display

function d2r(d) {
  return (d * Math.PI) / 180;
}
function nodePos(l, ox, oy) {
  const r = d2r(l.angle);
  return { x: ox + Math.cos(r) * l.dist, y: oy - Math.sin(r) * l.dist };
}
function getSkillLv(c, id) {
  return (learnedSkills[c] && learnedSkills[c][id]) || 0;
}
function unlocked(c, skill) {
  // Quest skills locked by job level are not unlocked regardless of skill reqs
  if (isQuestJobLocked(skill)) return false;
  for (const r of skill.reqs) if (getSkillLv(c, r.id) < r.lv) return false;
  return true;
}

function getAutofillData(c, skill, planned = {}) {
  for (const r of skill.reqs) {
    const rs = CLASSES[c].skills.find((s) => s.id === r.id);
    if (!rs) continue;
    const cur = getSkillLv(c, r.id);
    const pld = planned[r.id] || cur;
    if (pld < r.lv) {
      planned[r.id] = r.lv;
      getAutofillData(c, rs, planned);
    }
  }
  return planned;
}

function calculateAutofillCost(c, planned) {
  let cost = 0;
  for (const [id, target] of Object.entries(planned)) {
    const cur = getSkillLv(c, id);
    if (target > cur) {
      const sk = CLASSES[c].skills.find((s) => s.id === id);
      if (sk && !sk.type.includes("quest")) cost += target - cur;
    }
  }
  return cost;
}

// Colours matching the parchment/wood theme
const C = {
  parch: "#d4b06a",
  parch2: "#c8a050",
  parchDark: "#a07830",
  wood: "#3a2210",
  woodMid: "#7a4a1a",
  woodLt: "#b87828",
  teal: "#2ab8a0",
  teal2: "#1e9080",
  tealLt: "#60d8c0",
  rust: "#c84020",
  gold: "#f8d040",
  goldDim: "#806010",
  ink: "#1a0e00",
  ink2: "#3a2000",
  questPrp: "#7040c0",
  questLt: "#b080ff",
  greenHi: "#2a9a40",
  white: "#fff8e8",
  sky: "#5ca8c8",
};

function pxRect(x, y, w, h, fill, bdr) {
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(x + 3, y + 3, w, h);
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = bdr;
  ctx.fillRect(x, y, w, 2);
  ctx.fillRect(x, y, 2, h);
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(x, y + h - 2, w, 2);
  ctx.fillRect(x + w - 2, y, 2, h);
}
function pxDiamond(x, y, s, fill, bdr) {
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.beginPath();
  ctx.moveTo(x + 3, y - s + 3);
  ctx.lineTo(x + s + 3, y + 3);
  ctx.lineTo(x + 3, y + s + 3);
  ctx.lineTo(x - s + 3, y + 3);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(x, y - s);
  ctx.lineTo(x + s, y);
  ctx.lineTo(x, y + s);
  ctx.lineTo(x - s, y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = bdr;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y - s);
  ctx.lineTo(x + s, y);
  ctx.lineTo(x, y + s);
  ctx.lineTo(x - s, y);
  ctx.closePath();
  ctx.stroke();
}
function pxTxt(txt, x, y, col, size) {
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.font = `bold ${size}px "Press Start 2P",monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillText(txt, x + 1, y + 1);
  ctx.fillStyle = col;
  ctx.fillText(txt, x, y);
  ctx.restore();
}

// ═══════════════════════════════════════════════════════════
//  SKILL ICON SYSTEM
//
//  Icons are loaded from:  icons/<skill_id>.png
//  e.g.   icons/bash.png  /  icons/heal.png  /  icons/q_fatal_blow.png
//
//  If the image file is missing, a styled fallback glyph is drawn.
//  Drop any 40×40 (or similar) PNG into the icons/ folder and it
//  will automatically appear on the correct node.
//
//  SKILL ID → FILE MAPPING:
//    Novice:    basic_skill, q_first_aid, q_play_dead
//    Swordman:  bash, provoke, hp_recovery, sword_mastery,
//               magnum_break, auto_berserk, endure, 2h_sword_mastery,
//               q_fatal_blow, q_moving_hp_recovery
//    Magician:  sp_recovery, napalm_beat, sight, soul_strike,
//               cold_bolt, fire_bolt, lightning_bolt,
//               frost_diver, fire_wall, stone_curse, thunderstorm, q_energy_coat
//    Archer:    owl_eye, vulture_eye, double_strafe, improve_concentration,
//               arrow_shower, charge_arrow, arrow_crafting, q_ankle_snare
//    Acolyte:   heal, ruwach, aqua_benedicta, pneuma,
//               blessing, signum_crusis, increase_agi, warp_portal,
//               decrease_agi, q_resurrection
//    Merchant:  enlarge_weight, pushcart, discount, overcharge, identify,
//               vending, mammonite, cart_revolution, q_cart_boost, q_merchant_voc
//    Thief:     steal, envenom, hiding, double_attack, detoxify,
//               pick_stone, dagger_mastery, throw_stone, q_back_stab, q_find_stone
// ═══════════════════════════════════════════════════════════

// Fallback glyph map — shown when no icon image file exists
const SKILL_GLYPHS = {
  // Novice
  basic_skill: "★",
  q_first_aid: "♥",
  q_play_dead: "☽",
  // Swordman
  bash: "⚔",
  provoke: "!",
  hp_recovery: "❤",
  sword_mastery: "✦",
  magnum_break: "🔥",
  auto_berserk: "⚡",
  endure: "🛡",
  "2h_sword_mastery": "⚔",
  q_moving_hp_recovery: "♥",
  q_fatal_blow: "💀",
  // Magician
  sp_recovery: "✦",
  napalm_beat: "💥",
  sight: "👁",
  soul_strike: "☄",
  cold_bolt: "❄",
  fire_bolt: "🔥",
  lightning_bolt: "⚡",
  stone_curse: "🪨",
  frost_diver: "❄",
  fire_wall: "🔥",
  fire_ball: "●",
  safety_wall: "🛡",
  thunderstorm: "⚡",
  q_energy_coat: "◎",
  // Archer
  owl_eye: "👁",
  double_strafe: "➤",
  q_making_arrow: "⚒",
  q_charge_arrow: "➤",
  vulture_eye: "◎",
  improve_concentration: "✦",
  arrow_shower: "↯",
  // Acolyte
  divine_protection: "🛡",
  ruwach: "✨",
  heal: "✚",
  aqua_benedicta: "💧",
  q_holy_light: "✦",
  demon_bane: "⚔",
  teleportation: "⬡",
  warp_portal: "⬡",
  pneuma: "🕊",
  increase_agi: "↑",
  decrease_agi: "↓",
  signum_crusis: "☩",
  angelus: "✦",
  blessing: "✝",
  cure: "✚",
  // Merchant
  enlarge_weight: "⚖",
  identify: "🔍",
  mammonite: "💥",
  q_loud_exclamation: "!",
  q_cart_revolution: "🌀",
  q_change_cart: "🛒",
  q_cart_decoration: "🛒",
  discount: "%",
  overcharge: "$",
  pushcart: "🛒",
  vending: "🏪",
  buying_store: "🏪",
  // Thief
  double_attack: "✕",
  increase_dodge: "↯",
  steal: "✋",
  envenom: "☠",
  q_sprinkle_sand: "●",
  q_back_sliding: "↙",
  q_pick_stone: "●",
  q_throw_stone: "●",
  hiding: "👤",
  detoxify: "✚",
};

// Glyph bg/fg colours per type
const GLYPH_COLORS = {
  offensive: { bg: "#5a1a0a", fg: "#ff9060" },
  support: { bg: "#0a2a30", fg: "#60e0c0" },
  passive: { bg: "#2a1a50", fg: "#c0a0ff" },
  default: { bg: "#302010", fg: "#f0c840" },
};

// Image cache: { skillId: HTMLImageElement | 'error' | 'loading' }
const iconCache = {};
const ICON_SIZE = NS * 2; // square drawn inside node

function loadSkillIcon(skillId) {
  if (iconCache[skillId]) return; // already started
  iconCache[skillId] = "loading";
  const img = new Image();
  img.onload = () => {
    iconCache[skillId] = img;
    renderTree();
  };
  img.onerror = () => {
    iconCache[skillId] = "error";
  };
  img.src = `Images/icons/${skillId}.png`;
}

// Pre-load icons for all skills in all classes
function preloadAllIcons() {
  Object.values(CLASSES).forEach((cls) =>
    cls.skills.forEach((sk) => loadSkillIcon(sk.id))
  );
}

// Draw one node icon (image or fallback glyph)
function drawNodeIcon(ctx, skillId, px, py, S, unlk, lv) {
  const cached = iconCache[skillId];
  const pad = 2;
  const iconW = S * 2 - pad * 2;
  const stripH = 11; // level strip at bottom
  const iconH = S * 2 - pad * 2 - stripH;
  const ix = px - S + pad;
  const iy = py - S + pad;

  if (cached && cached !== "loading" && cached !== "error") {
    // — real image —
    ctx.save();
    // clip to icon area (above level strip)
    ctx.beginPath();
    ctx.rect(ix, iy, iconW, iconH);
    ctx.clip();

    // brightness / greyscale when locked or not yet learned
    if (!unlk) {
      ctx.globalAlpha = 0.45;
    } else if (lv === 0) {
      ctx.globalAlpha = 0.7;
    } else {
      ctx.globalAlpha = 1.0;
    }
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(cached, ix, iy, iconW, iconH);
    ctx.globalAlpha = 1.0;
    ctx.restore();

    // dim overlay for locked nodes
    if (!unlk) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(ix, iy, iconW, iconH);
      ctx.clip();
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(ix, iy, iconW, iconH);
      ctx.restore();
    }
  } else {
    // — fallback glyph —
    const glyph = SKILL_GLYPHS[skillId] || "?";
    const sk = Object.values(CLASSES)
      .flatMap((c) => c.skills)
      .find((s) => s.id === skillId);
    const typeName = sk
      ? sk.type.includes("offensive")
        ? "offensive"
        : sk.type.includes("support")
        ? "support"
        : sk.type.includes("passive")
        ? "passive"
        : "default"
      : "default";
    const col = GLYPH_COLORS[typeName];

    // glyph background
    ctx.fillStyle = unlk ? col.bg : "rgba(0,0,0,0.3)";
    ctx.fillRect(ix, iy, iconW, iconH);

    // subtle diagonal lines texture
    ctx.save();
    ctx.beginPath();
    ctx.rect(ix, iy, iconW, iconH);
    ctx.clip();
    ctx.strokeStyle = unlk ? col.fg + "18" : "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let d = -iconW; d < iconH + iconW; d += 6) {
      ctx.beginPath();
      ctx.moveTo(ix + d, iy);
      ctx.lineTo(ix + d + iconH, iy + iconH);
      ctx.stroke();
    }
    ctx.restore();

    // glyph
    ctx.save();
    ctx.font = `${S}px "VT323", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = unlk ? (lv > 0 ? 1.0 : 0.6) : 0.3;
    // shadow
    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillText(glyph, px + 1, iy + iconH / 2 + 1);
    // glyph
    ctx.fillStyle = col.fg;
    ctx.fillText(glyph, px, iy + iconH / 2);
    ctx.globalAlpha = 1.0;
    ctx.restore();
  }
}

function drawTree() {
  const W = canvasWrap.clientWidth,
    H = canvasWrap.clientHeight;
  canvas.width = W;
  canvas.height = H;
  ctx.imageSmoothingEnabled = false;

  // parchment background
  ctx.fillStyle = C.parch2;
  ctx.fillRect(0, 0, W, H);
  for (let y = 0; y < H; y += 4) {
    ctx.fillStyle = "rgba(0,0,0,0.04)";
    ctx.fillRect(0, y, W, 1);
  }

  ctx.save();
  ctx.translate(camX + W / 2, camY + H / 2);
  ctx.scale(camScale, camScale);
  ctx.translate(-W / 2, -H / 2);

  const cls = CLASSES[currentClass];
  const ox = W / 2,
    oy = H * 0.78;
  const posMap = {};
  cls.layout.forEach((l) => {
    posMap[l.id] = nodePos(l, ox, oy);
  });

  // fan arc rings
  const maxD = Math.max(...cls.layout.map((l) => l.dist)) + NS + 20;
  for (let r = 50; r <= maxD; r += 70) {
    ctx.beginPath();
    ctx.arc(ox, oy, r, d2r(180 + 5), d2r(360 - 5), false);
    ctx.strokeStyle = `rgba(160,120,48,${0.18 - (r / maxD) * 0.12})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // connection lines — staircase pixel style
  cls.skills.forEach((sk) => {
    const to = posMap[sk.id];
    if (!to) return;
    const isQ = sk.type.includes("quest");
    const lv = getSkillLv(currentClass, sk.id);
    const srcs =
      sk.reqs.length === 0
        ? [{ x: ox, y: oy, met: true }]
        : sk.reqs.map((r) => ({
            ...posMap[r.id],
            met: getSkillLv(currentClass, r.id) >= r.lv,
          }));
    srcs.forEach((fr) => {
      if (!fr) return;
      const active = fr.met && lv > 0;
      ctx.strokeStyle = isQ
        ? active
          ? "rgba(112,64,192,0.75)"
          : "rgba(80,40,140,0.3)"
        : active
        ? "rgba(42,184,160,0.75)"
        : "rgba(160,120,48,0.3)";
      ctx.lineWidth = active ? 2.5 : 1.5;
      if (isQ) ctx.setLineDash([5, 5]);
      else ctx.setLineDash([]);
      const mx = (fr.x + to.x) / 2;
      ctx.beginPath();
      ctx.moveTo(Math.round(fr.x), Math.round(fr.y));
      ctx.lineTo(Math.round(mx), Math.round(fr.y));
      ctx.lineTo(Math.round(mx), Math.round(to.y));
      ctx.lineTo(Math.round(to.x), Math.round(to.y));
      ctx.stroke();
      ctx.setLineDash([]);
    });
  });

  // origin gem
  const gs = 6;
  ctx.fillStyle = C.wood;
  ctx.fillRect(ox - gs + 3, oy - gs + 3, gs * 2, gs * 2);
  ctx.fillStyle = C.gold;
  ctx.fillRect(ox - gs, oy - gs, gs * 2, gs * 2);
  ctx.fillStyle = C.tealLt;
  ctx.fillRect(ox - gs, oy - gs, gs, gs);
  ctx.fillStyle = C.woodLt;
  ctx.fillRect(ox - gs, oy + gs - 2, gs * 2, 2);

  // ── NODES ──
  cls.skills.forEach((sk) => {
    const pos = posMap[sk.id];
    if (!pos) return;
    const lv = getSkillLv(currentClass, sk.id);
    const ul = unlocked(currentClass, sk);
    const sel = selectedSkill && selectedSkill.id === sk.id;
    const isQ = sk.type.includes("quest");
    const S = NS,
      px = Math.round(pos.x),
      py = Math.round(pos.y);

    // ── pixel glow when learned ──
    if (lv > 0) {
      const gc = isQ ? "rgba(112,64,192,0.22)" : "rgba(42,184,160,0.22)";
      for (let dx = -S - 10; dx <= S + 10; dx += 8)
        for (let dy = -S - 10; dy <= S + 10; dy += 8)
          if (Math.abs(dx) > S + 2 || Math.abs(dy) > S + 2) {
            ctx.fillStyle = gc;
            ctx.fillRect(px + dx, py + dy, 6, 6);
          }
    }

    // ── selection border ──
    if (sel) {
      const sc = isQ ? C.questLt : C.tealLt;
      ctx.fillStyle = sc;
      ctx.fillRect(px - S - 5, py - S - 5, (S + 5) * 2 + 1, 2);
      ctx.fillRect(px - S - 5, py + S + 3, (S + 5) * 2 + 1, 2);
      ctx.fillRect(px - S - 5, py - S - 5, 2, (S + 5) * 2 + 1);
      ctx.fillRect(px + S + 3, py - S - 5, 2, (S + 5) * 2 + 1);
    }

    // ── node shell (box or diamond) ──
    if (isQ) {
      const qf = !ul
        ? "#3a1040"
        : lv >= sk.maxLv
        ? "#5a2090"
        : lv > 0
        ? "#4a1880"
        : "#2a0830";
      const qb = !ul
        ? C.questPrp
        : lv >= sk.maxLv
        ? C.questLt
        : lv > 0
        ? C.questPrp
        : "#5030a0";
      pxDiamond(px, py, S, qf, qb);
      if (sel) {
        ctx.strokeStyle = C.questLt;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, py - S - 7);
        ctx.lineTo(px + S + 7, py);
        ctx.lineTo(px, py + S + 7);
        ctx.lineTo(px - S - 7, py);
        ctx.closePath();
        ctx.stroke();
      }
    } else {
      const bf = !ul
        ? C.woodMid
        : lv >= sk.maxLv
        ? "#4a8a3c"
        : lv > 0
        ? "#226840"
        : C.parch2;
      const bb = !ul
        ? C.woodLt
        : lv >= sk.maxLv
        ? "#8ac860"
        : lv > 0
        ? C.tealLt
        : C.parchDark;
      pxRect(px - S, py - S, S * 2, S * 2, bf, bb);
    }

    // ── skill icon / glyph ──
    // For diamond quest nodes, clip to the inner rotated area
    if (isQ) {
      ctx.save();
      ctx.beginPath();
      // clip to a slightly inset diamond
      const ci = S - 4;
      ctx.moveTo(px, py - ci);
      ctx.lineTo(px + ci, py);
      ctx.lineTo(px, py + ci);
      ctx.lineTo(px - ci, py);
      ctx.closePath();
      ctx.clip();
      drawNodeIcon(ctx, sk.id, px, py, S - 2, ul, lv);
      ctx.restore();
    } else {
      drawNodeIcon(ctx, sk.id, px, py, S, ul, lv);
    }

    // ── level strip at bottom of node ──
    const ls = sk.maxLv > 1 ? `${lv}/${sk.maxLv}` : lv > 0 ? "MAX" : "0/1";
    const lvBg =
      lv > 0
        ? isQ
          ? "rgba(80,30,160,0.85)"
          : "rgba(20,110,80,0.85)"
        : "rgba(0,0,0,0.6)";
    const lc =
      lv > 0
        ? isQ
          ? C.questLt
          : C.tealLt
        : isQ
        ? "#8060d0"
        : C.parch3 || "#e8cc90";
    // strip background
    ctx.fillStyle = lvBg;
    ctx.fillRect(px - S + 2, py + S - 10, S * 2 - 4, 10);
    // level text
    pxTxt(ls, px, py + S - 5, lc, 6);

    // ── maxed glow badge (top-left corner) ──
    if (lv >= sk.maxLv && sk.maxLv > 1) {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(px - S + 1, py - S + 1, 10, 10);
      ctx.fillStyle = "#f0c840";
      ctx.fillRect(px - S + 1, py - S + 1, 9, 9);
      pxTxt("★", px - S + 5, py - S + 6, "#3a2000", 5);
    }

    // ── quest Q badge (top-right corner) ──
    if (isQ) {
      const bx = px + S - 10,
        by = py - S + 1;
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(bx + 1, by + 1, 10, 10);
      ctx.fillStyle = lv > 0 ? C.questPrp : "#2a1040";
      ctx.fillRect(bx, by, 10, 10);
      ctx.fillStyle = lv > 0 ? C.questLt : "#6040b0";
      ctx.fillRect(bx, by, 10, 1);
      ctx.fillRect(bx, by, 1, 10);
      pxTxt("Q", bx + 5, by + 5, "#fff8e8", 5);
    }

    // ── locked overlay ──
    if (!ul) {
      ctx.save();
      // clip to node shape
      if (isQ) {
        ctx.beginPath();
        ctx.moveTo(px, py - S);
        ctx.lineTo(px + S, py);
        ctx.lineTo(px, py + S);
        ctx.lineTo(px - S, py);
        ctx.closePath();
        ctx.clip();
      } else {
        ctx.beginPath();
        ctx.rect(px - S, py - S, S * 2, S * 2);
        ctx.clip();
      }
      ctx.fillStyle = "rgba(0,0,0,0.42)";
      ctx.fillRect(px - S, py - S, S * 2, S * 2);
      ctx.restore();

      const jobLocked = isQuestJobLocked(sk);
      if (jobLocked) {
        // ── Job-level-locked quest skill: gold key + "JLV XX" badge ──
        const req = sk.jobLvReq || 0;
        // Key body (pixel art: 7x7 circle + 3x4 shaft + 2x2 teeth)
        const kx = px - 5,
          ky = py - S + 12;
        // shadow
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(kx + 1, ky + 1, 4, 4);
        ctx.fillRect(kx + 3, ky + 4, 2, 4);
        ctx.fillRect(kx + 4, ky + 6, 2, 2);
        // gold key
        ctx.fillStyle = "#f0c840";
        ctx.fillRect(kx, ky, 4, 4); // key head
        ctx.fillRect(kx + 3, ky + 4, 2, 4); // shaft
        ctx.fillRect(kx + 4, ky + 6, 2, 2); // tooth
        // key hole
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(kx + 1, ky + 1, 2, 2);
        // "JLV XX" label at bottom of node
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(px - S + 2, py + S - 13, S * 2 - 4, 12);
        ctx.fillStyle = "#f0c840";
        ctx.save();
        ctx.font = 'bold 7px "Press Start 2P",monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("JLV " + req, px, py + S - 7);
        ctx.restore();
      } else {
        // ── Skill-requirement-locked: pixel padlock ──
        const lkx = px - 4,
          lky = py - 3;
        // shadow
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(lkx + 1, lky + 1, 8, 7);
        ctx.fillRect(lkx + 1, lky - 2, 6, 2);
        // body
        ctx.fillStyle = "#c8a050";
        ctx.fillRect(lkx, lky, 8, 7);
        // shackle
        ctx.fillRect(lkx, lky - 4, 2, 5);
        ctx.fillRect(lkx + 6, lky - 4, 2, 5);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(lkx + 1, lky - 4, 6, 2);
        // keyhole
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(lkx + 3, lky + 2, 2, 3);
      }
    }
  });

  ctx.restore();
}

function renderTree() {
  requestAnimationFrame(drawTree);
}

// ─ ZOOM/PAN ─
document.getElementById("zoom-in").addEventListener("click", () => {
  camScale = Math.min(2.5, camScale + 0.2);
  renderTree();
});
document.getElementById("zoom-out").addEventListener("click", () => {
  camScale = Math.max(0.3, camScale - 0.2);
  renderTree();
});
document.getElementById("zoom-fit").addEventListener("click", () => {
  camScale = 1;
  camX = 0;
  camY = 0;
  renderTree();
});

canvasWrap.addEventListener("mousedown", (e) => {
  isDragging = true;
  dragStart = { x: e.clientX, y: e.clientY };
  camAtDrag = { x: camX, y: camY };
  canvasWrap.classList.add("grabbing");
});
window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  camX = camAtDrag.x + (e.clientX - dragStart.x);
  camY = camAtDrag.y + (e.clientY - dragStart.y);
  renderTree();
});
window.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  canvasWrap.classList.remove("grabbing");
  if (
    Math.abs(e.clientX - dragStart.x) < 5 &&
    Math.abs(e.clientY - dragStart.y) < 5
  )
    handleClick(e);
});
canvasWrap.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    camScale = Math.max(
      0.3,
      Math.min(2.5, camScale + (e.deltaY > 0 ? -0.1 : 0.1))
    );
    renderTree();
  },
  { passive: false }
);

let lastTD = 0;
canvasWrap.addEventListener(
  "touchstart",
  (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      camAtDrag = { x: camX, y: camY };
    } else if (e.touches.length === 2)
      lastTD = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
  },
  { passive: true }
);
canvasWrap.addEventListener(
  "touchmove",
  (e) => {
    if (e.touches.length === 1 && isDragging) {
      camX = camAtDrag.x + (e.touches[0].clientX - dragStart.x);
      camY = camAtDrag.y + (e.touches[0].clientY - dragStart.y);
      renderTree();
    } else if (e.touches.length === 2) {
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      camScale = Math.max(0.3, Math.min(2.5, camScale * (d / lastTD)));
      lastTD = d;
      renderTree();
    }
  },
  { passive: true }
);
canvasWrap.addEventListener("touchend", () => {
  isDragging = false;
});

function wPos(e) {
  const r = canvasWrap.getBoundingClientRect();
  const mx = e.clientX - r.left,
    my = e.clientY - r.top;
  const W = canvas.width,
    H = canvas.height;
  return {
    wx: (mx - camX - W / 2) / camScale + W / 2,
    wy: (my - camY - H / 2) / camScale + H / 2,
    W,
    H,
  };
}
function handleClick(e) {
  const { wx, wy, W, H } = wPos(e);
  const cls = CLASSES[currentClass];
  const ox = W / 2,
    oy = H * 0.78;
  let hit = null;
  cls.layout.forEach((l) => {
    const p = nodePos(l, ox, oy);
    if (Math.abs(wx - p.x) <= NS + 5 && Math.abs(wy - p.y) <= NS + 5)
      hit = l.id;
  });
  if (hit) {
    const s = cls.skills.find((x) => x.id === hit);
    if (s) {
      selectedSkill = s;
      showSkillInfo(s);
      renderTree();
    }
  }
}

canvasWrap.addEventListener("mousemove", (e) => {
  if (isDragging) return;
  const { wx, wy, W, H } = wPos(e);
  const cls = CLASSES[currentClass];
  const ox = W / 2,
    oy = H * 0.78;
  const tip = document.getElementById("node-tooltip");
  let hit = null;
  cls.layout.forEach((l) => {
    const p = nodePos(l, ox, oy);
    if (Math.abs(wx - p.x) <= NS + 5 && Math.abs(wy - p.y) <= NS + 5)
      hit = l.id;
  });
  if (hit) {
    const s = cls.skills.find((x) => x.id === hit);
    if (s) {
      const lv = getSkillLv(currentClass, s.id);
      tip.textContent = `${s.name} [${lv}/${s.maxLv}]`;
      tip.style.left = e.clientX + 12 + "px";
      tip.style.top = e.clientY - 10 + "px";
      tip.classList.add("show");
      canvasWrap.style.cursor = "pointer";
    }
  } else {
    tip.classList.remove("show");
    canvasWrap.style.cursor = isDragging ? "grabbing" : "grab";
  }
});
canvasWrap.addEventListener("mouseleave", () =>
  document.getElementById("node-tooltip").classList.remove("show")
);

// ─ SKILL INFO ─
function showSkillInfo(sk) {
  document.getElementById("sip").style.display = "none";
  const box = document.getElementById("skill-info");
  box.classList.add("visible");
  document.getElementById("si-class").textContent =
    CLASSES[currentClass].name.toUpperCase() + " SKILL";
  document.getElementById("si-name").textContent = sk.name;

  const tyEl = document.getElementById("si-types");
  tyEl.innerHTML = "";
  if (sk.type.includes("quest")) {
    const b = document.createElement("span");
    b.className = "si-tag";
    b.style.cssText = "border-color:#7040c0;color:#7040c0;";
    b.textContent = "[Q] QUEST";
    tyEl.appendChild(b);
  }
  sk.type
    .filter((t) => t !== "quest")
    .forEach((t) => {
      const tag = document.createElement("span");
      tag.className = `si-tag ${t}`;
      tag.textContent = t;
      tyEl.appendChild(tag);
    });

  // Remove old quest/joblv notes
  ["quest-note", "joblv-note"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  if (sk.type.includes("quest")) {
    const jobReq = sk.jobLvReq || 0;
    const jobLocked = isQuestJobLocked(sk);

    // Job level requirement banner
    if (jobReq > 0) {
      const jn = document.createElement("div");
      jn.id = "joblv-note";
      const met = currentJobLv >= jobReq;
      jn.style.cssText = `font-family:VT323,monospace;font-size:.78rem;
    color:${met ? "var(--green-hi)" : "#f0c840"};
    border:2px solid ${met ? "rgba(42,154,64,.5)" : "rgba(240,200,64,.4)"};
    padding:3px 6px;margin-bottom:6px;
    background:${met ? "rgba(42,154,64,.08)" : "rgba(200,160,0,.08)"};
    box-shadow:2px 2px 0 rgba(0,0,0,.3);`;
      jn.innerHTML = met
        ? `🗝 JOB LV ${jobReq}: REQUIREMENT MET`
        : `🔑 REQUIRES JOB LV ${jobReq} (current: ${currentJobLv})`;
      tyEl.insertAdjacentElement("afterend", jn);
    }

    // How to Get info
    const howTo = sk.stats["How to Get"];
    if (howTo) {
      const qn = document.createElement("div");
      qn.id = "quest-note";
      qn.style.cssText =
        "font-family:VT323,monospace;font-size:.75rem;color:#9060d0;border:2px solid rgba(112,64,192,.35);padding:3px 6px;margin-bottom:6px;background:rgba(112,64,192,.07);box-shadow:2px 2px 0 rgba(0,0,0,.3);";
      qn.innerHTML = `<span style="opacity:.6">HOW TO GET: </span>${howTo}`;
      // Insert after joblv-note if exists, otherwise after tyEl
      const jlvNote = document.getElementById("joblv-note");
      (jlvNote || tyEl).insertAdjacentElement("afterend", qn);
    }
  }

  const lv = getSkillLv(currentClass, sk.id);
  updateLevelDots(sk, lv);
  document.getElementById("si-desc").textContent = sk.desc;

  const stEl = document.getElementById("si-stats");
  stEl.innerHTML = "";
  // Filter out meta fields from stats display
  const hiddenKeys = new Set(["How to Get", "Obtain"]);
  Object.entries(sk.stats)
    .filter(([k]) => !hiddenKeys.has(k))
    .forEach(([k, v]) => {
      const c = document.createElement("div");
      c.className = "si-stat";
      let displayedValue = v;
      if (Array.isArray(v)) {
        if (lv > 0) {
          displayedValue = v[Math.min(lv - 1, v.length - 1)];
        } else {
          const first = v[0];
          const last = v[v.length - 1];
          displayedValue = first === last ? first : `${first}-${last}`;
        }
      }
      c.innerHTML = `<div class="si-stat-lbl">${k}</div><div class="si-stat-val">${displayedValue}</div>`;
      stEl.appendChild(c);
    });

  const rqEl = document.getElementById("si-reqs");
  rqEl.innerHTML = "";
  sk.reqs.forEach((req) => {
    const rs = CLASSES[currentClass].skills.find((s) => s.id === req.id);
    const met = getSkillLv(currentClass, req.id) >= req.lv;
    const d = document.createElement("div");
    d.className = "si-req";
    d.style.color = met ? "var(--green-hi)" : "var(--rust)";
    d.textContent = `${met ? "[OK]" : "[X]"} ${rs ? rs.name : req.id} Lv.${
      req.lv
    }`;
    rqEl.appendChild(d);
  });
  updateButtons(sk);
}

function updateLevelDots(sk, lv) {
  const de = document.getElementById("level-dots");
  de.innerHTML = "";
  const show = Math.min(sk.maxLv, 10);
  for (let i = 1; i <= show; i++) {
    const d = document.createElement("div");
    d.className = "ldot" + (i <= lv ? " filled" : "");
    de.appendChild(d);
  }
  document.getElementById("si-lv-text").textContent = `${lv}/${sk.maxLv}`;
}

function updateButtons(sk) {
  const lv = getSkillLv(currentClass, sk.id);
  const ul = unlocked(currentClass, sk);
  const sp = getRemaining(currentClass);
  const isQ = sk.type.includes("quest");
  const jobLocked = isQuestJobLocked(sk);
  const lb = document.getElementById("btn-learn"),
    fb = document.getElementById("btn-forget");

  // Autofill check
  let canAuto = false;
  let autoCost = 0;
  if (!ul && !jobLocked) {
    const planned = getAutofillData(currentClass, sk, {});
    autoCost = calculateAutofillCost(currentClass, planned);
    if (sp >= autoCost + (isQ ? 0 : 1)) {
      canAuto = true;
    }
  }

  lb.disabled =
    (!ul && !canAuto) || lv >= sk.maxLv || (!isQ && sp <= 0 && !canAuto) || jobLocked;

  if (jobLocked) {
    lb.textContent = `JLV ${sk.jobLvReq || 0}`;
  } else if (!ul && canAuto) {
    lb.textContent = `+UNLOCK (${autoCost + (isQ ? 0 : 1)} SP)`;
  } else {
    lb.textContent = isQ ? "[Q]OBTAIN" : "+LEARN";
  }
  fb.disabled = lv <= 0;
}

function hideSkillInfo() {
  document.getElementById("sip").style.display = "flex";
  document.getElementById("skill-info").classList.remove("visible");
}

document.getElementById("btn-learn").addEventListener("click", () => {
  if (!selectedSkill) return;
  const sk = selectedSkill,
    lv = getSkillLv(currentClass, sk.id),
    isQ = sk.type.includes("quest");

  if (isQuestJobLocked(sk)) {
    showToast(`NEED JOB LV ${sk.jobLvReq || 0} TO OBTAIN!`);
    return;
  }

  const ul = unlocked(currentClass, sk);
  if (lv >= sk.maxLv) return;

  if (!ul) {
    const planned = getAutofillData(currentClass, sk, {});
    const cost = calculateAutofillCost(currentClass, planned);
    const totalCost = cost + (isQ ? 0 : 1);

    if (getRemaining(currentClass) < totalCost) {
      showToast(`NOT ENOUGH SP TO UNLOCK! (NEEDS ${totalCost})`);
      return;
    }

    // Apply autofill
    Object.entries(planned).forEach(([id, target]) => {
      learnedSkills[currentClass][id] = target;
    });
    learnedSkills[currentClass][sk.id] = lv + 1;
    showToast(`UNLOCKED: ${sk.name} AND PREREQUISITES!`);
  } else {
    if (!isQ && getRemaining(currentClass) <= 0) {
      showToast("NO SP REMAINING!");
      return;
    }
    learnedSkills[currentClass][sk.id] = lv + 1;
    showToast(isQ ? `QUEST: ${sk.name} OBTAINED!` : `LEARNED: ${sk.name} LV.${lv + 1}`);
  }

  updateSPDisplay();
  updateLevelDots(sk, getSkillLv(currentClass, sk.id));
  updateButtons(sk);
  showSkillInfo(sk);
  renderTree();
});
document.getElementById("btn-forget").addEventListener("click", () => {
  if (!selectedSkill) return;
  const sk = selectedSkill,
    lv = getSkillLv(currentClass, sk.id);
  if (lv <= 0) return;
  const dep = checkDeps(sk.id, lv - 1);
  if (dep) {
    showToast(`CANNOT FORGET: ${dep} NEEDS THIS`);
    return;
  }
  learnedSkills[currentClass][sk.id] = lv - 1;
  updateSPDisplay();
  updateLevelDots(sk, lv - 1);
  updateButtons(sk);
  showSkillInfo(sk);
  renderTree();
  showToast(`FORGOT ${sk.name} LV.${lv}→${lv - 1}`);
});
function checkDeps(id, nv) {
  for (const s of CLASSES[currentClass].skills) {
    if (getSkillLv(currentClass, s.id) > 0) {
      for (const r of s.reqs) {
        if (r.id === id && nv < r.lv) return s.name;
      }
    }
  }
  return null;
}

document.getElementById("reset-btn").addEventListener("click", () => {
  learnedSkills[currentClass] = {};
  selectedSkill = null;
  updateSPDisplay();
  hideSkillInfo();
  updateJobLvBadge();
  renderTree();
  showToast("SKILLS RESET!");
});

let toastT;
function showToast(m) {
  const t = document.getElementById("toast");
  t.textContent = m;
  t.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("show"), 2400);
}

window.addEventListener("resize", () => renderTree());
preloadAllIcons();
buildJobLvOptions("novice");
selectClass(0);
