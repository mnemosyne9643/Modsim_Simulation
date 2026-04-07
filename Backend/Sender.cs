using Modsim_Simulation.Backend.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modsim_Simulation.Backend
{
    public class CharacterService
    {
        public CharacterData CurrentCharacter { get; private set; } = new CharacterData();

        public ResultModel UpdateStat(string statName, int value)
        {
            // ── GUARD: Null or empty stat name ──────────────────────────
            if (string.IsNullOrEmpty(statName))
            {
                // Return current state without changes
                return Calculator.CalculateAll(CurrentCharacter);
            }

            // Get current value to see if user is decreasing it
            int oldValue = GetCurrentValue(statName);

            // Create a "Test Clone" to check if points go negative
            var tempChar = new CharacterData
            {
                Job = CurrentCharacter.Job,
                BaseLevel = CurrentCharacter.BaseLevel,
                JobLevel = CurrentCharacter.JobLevel,
                Str = CurrentCharacter.Str,
                Agi = CurrentCharacter.Agi,
                Vit = CurrentCharacter.Vit,
                Int = CurrentCharacter.Int,
                Dex = CurrentCharacter.Dex,
                Luk = CurrentCharacter.Luk
            };

            // Apply change to clone
            ApplyValue(tempChar, statName, value);

            // Test the points
            var testResult = Calculator.CalculateAll(tempChar);

            // Check if the change resulted in negative points
            if (testResult.StatusPoints < 0)
            {
                // If it was a Level Change that caused the negative points, 
                // we force a reset of all stats to 1.
                if (statName.ToUpper() == "BASELV" || statName.ToUpper() == "JOBLV")
                {
                    ResetAttributes(CurrentCharacter); // Reset STR, AGI, etc. to 1
                    ApplyValue(CurrentCharacter, statName, value); // Apply the new level
                    return Calculator.CalculateAll(CurrentCharacter);
                }

                // If it was a regular Stat increase that caused negative points, just reject it
                return Calculator.CalculateAll(CurrentCharacter);
            }

            // If points are fine, apply the change normally
            ApplyValue(CurrentCharacter, statName, value);

            return Calculator.CalculateAll(CurrentCharacter);
        }

        // Helper to reset all attributes to 1
        private void ResetAttributes(CharacterData data)
        {
            data.Str = 1;
            data.Agi = 1;
            data.Vit = 1;
            data.Int = 1;
            data.Dex = 1;
            data.Luk = 1;
        }

        private int GetCurrentValue(string stat)
        {
            // ── GUARD: Null check ────────────────────────────────────
            if (string.IsNullOrEmpty(stat))
                return 1;

            return stat.ToUpper() switch
            {
                "STR" => CurrentCharacter.Str,
                "AGI" => CurrentCharacter.Agi,
                "VIT" => CurrentCharacter.Vit,
                "INT" => CurrentCharacter.Int,
                "DEX" => CurrentCharacter.Dex,
                "LUK" => CurrentCharacter.Luk,
                "BASELV" => CurrentCharacter.BaseLevel,
                "JOBLV" => CurrentCharacter.JobLevel,
                _ => 1
            };
        }


        //Apply the value to the Character Data
        private void ApplyValue(CharacterData data, string stat, int val)
        {
            // ── GUARD: Null check ────────────────────────────────────
            if (string.IsNullOrEmpty(stat))
                return;

            if (val < 1) val = 1; // Minimum stat is 1

            switch (stat.ToUpper())
            {
                case "STR": data.Str = val; break;
                case "AGI": data.Agi = val; break;
                case "VIT": data.Vit = val; break;
                case "INT": data.Int = val; break;
                case "DEX": data.Dex = val; break;
                case "LUK": data.Luk = val; break;
                case "BASELV": data.BaseLevel = val; break;
                case "JOBLV": data.JobLevel = val; break;
            }
        }

        public ResultModel UpdateJob(string newJob)
        {
            // ── GUARD: Null or empty job name ───────────────────────
            if (string.IsNullOrEmpty(newJob))
                newJob = "Novice";

            // Update the job class string in your character data
            CurrentCharacter.Job = newJob;

            // Reset Job LV to 1 on class change
            CurrentCharacter.JobLevel = 1;

            // Re-run all calculations because HP/SP multipliers depend on Job
            return Calculator.CalculateAll(CurrentCharacter);
        }

        public void Reset() => CurrentCharacter = new CharacterData();
    }

    public class JobData
    {
        // Basic info
        public string Name { get; set; }
        public int MaxJobLevel { get; set; }

        //Weight
        public int Weight { get; set; }

        // HP/SP growth constants
        public double HpJobA { get; set; }
        public double HpJobB { get; set; }
        public double SpJobA { get; set; }
        public double SpJobB { get; set; }

        // Job level → stat bonus tables (sorted by job level)
        public Dictionary<int, int> StrBonusTable { get; set; } = new Dictionary<int, int>();
        public Dictionary<int, int> AgiBonusTable { get; set; } = new Dictionary<int, int>();
        public Dictionary<int, int> VitBonusTable { get; set; } = new Dictionary<int, int>();
        public Dictionary<int, int> IntBonusTable { get; set; } = new Dictionary<int, int>();
        public Dictionary<int, int> DexBonusTable { get; set; } = new Dictionary<int, int>();
        public Dictionary<int, int> LukBonusTable { get; set; } = new Dictionary<int, int>();

        public double WeaponDelay { get; set; }
        //public int AspdOffset { get; set; } = 35;  // Default AspdOffSet

        public Dictionary<WeaponType, int> WeaponAspdOffsets { get; set; } = new Dictionary<WeaponType, int>();

        public int GetAspdOffset(WeaponType weapon)
        {
            return WeaponAspdOffsets.TryGetValue(weapon, out int offset) ? offset : 35;
        }

        //Weapon-specific delays
        public Dictionary<WeaponType, double> WeaponDelays { get; set; } = new Dictionary<WeaponType, double>();

        public double GetWeaponDelay(WeaponType weapon)
        {
            // If the weapon isn't defined for this job, return a very high delay (slow)
            return WeaponDelays.TryGetValue(weapon, out double delay) ? delay : 2000.0;
        }

        // Base Time Between Attacks

        public Dictionary<WeaponType, double> WeaponBTBAs { get; set; } = new Dictionary<WeaponType, double>();

        public double GetBTBA(WeaponType weapon)
        {
            return WeaponBTBAs.TryGetValue(weapon, out double val) ? val : 2.0; // Default slow
        }


        //Get stat bonus for a specific job level.
        // Returns the highest bonus where jobLevel >= threshold.
        public int GetStatBonus(Dictionary<int, int> bonusTable, int currentJobLevel)
        {

            // If table is empty or we are level 0/1 (usually no bonuses at lv 1), return 0
            if (bonusTable == null || bonusTable.Count == 0 || currentJobLevel <= 1)
                return 0;

            // Direct Lookup Logic:
            // Find all bonuses assigned to a level equal to or LOWER than current level.
            // Then, take the one with the HIGHEST level (the most recent one reached).
            var bonus = bonusTable
                .Where(kvp => kvp.Key <= currentJobLevel)
                .OrderByDescending(kvp => kvp.Key)
                .Select(kvp => kvp.Value)
                .FirstOrDefault();

            return bonus;
        }
    }

    public static class JobRegistry
    {
        private static readonly Dictionary<string, JobData> _jobs = new Dictionary<string, JobData>
        {
            // ── NOVICE ───────────────────────────────────────────────────
            ["Novice"] = new JobData
            {
                Name = "Novice",
                MaxJobLevel = 10,
                HpJobA = 0,
                HpJobB = 5.0,
                SpJobA = 1.0,
                SpJobB = 1.0,
                Weight = 0,

                //WeaponDelay = 50.0,

                WeaponDelays = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 495 },            
                    { WeaponType.Dagger, 650 },          
                    { WeaponType.OnehandedSword, 698 },  
                    { WeaponType.OnehandedAxe, 803 },    
                    { WeaponType.OnehandedMace, 698 },   
                    { WeaponType.TwohandedMace, 698 },   
                    { WeaponType.RodStaff, 650 },        
                    { WeaponType.TwohandedStaff, 650 }   
                },

                //BTBAs value
                WeaponBTBAs = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 1.0 },
                    { WeaponType.Dagger, 1.3 },
                    { WeaponType.OnehandedSword, 1.4 },
                    { WeaponType.OnehandedAxe, 1.6 },
                    { WeaponType.OnehandedMace, 1.4 },
                    { WeaponType.TwohandedMace, 1.4 },
                    { WeaponType.RodStaff, 1.3 },
                    { WeaponType.TwohandedStaff, 1.3 }
                }
            },

            // ── SWORDSMAN ────────────────────────────────────────────────
            ["Swordsman"] = new JobData
            {
                Name = "Swordsman",
                MaxJobLevel = 50,
                HpJobA = 0.7,
                HpJobB = 5.0,
                SpJobA = 1.0,
                SpJobB = 2.0,
                Weight = 800,

                StrBonusTable = new Dictionary<int, int>
                {
                    { 2, 1 }, { 14, 2 }, { 33, 3 }, { 40, 4 }, { 47, 5 }, { 49, 6 }, { 50, 7 }
                },
                AgiBonusTable = new Dictionary<int, int>
                {
                    { 30, 1 }, { 46, 2 }
                },
                VitBonusTable = new Dictionary<int, int>
                {
                    { 6, 1 }, { 18, 2 }, { 38, 3 }, { 42, 4 }
                },
                DexBonusTable = new Dictionary<int, int>
                {
                    { 10, 1 }, { 22, 2 }, { 36, 3 }
                },
                LukBonusTable = new Dictionary<int, int>
                {
                    { 26, 1 }, { 44, 2 }
                },

                //WeaponDelay = 45.0,

                WeaponDelays = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 405 },            
                    { WeaponType.Dagger, 500 },          
                    { WeaponType.OnehandedSword, 555 }, 
                    { WeaponType.TwohandedSword, 608 },  
                    { WeaponType.OnehandedSpear, 650 },  
                    { WeaponType.TwohandedSpear, 700 },  
                    { WeaponType.OnehandedAxe, 700 },    
                    { WeaponType.TwohandedAxe, 755 },    
                    { WeaponType.OnehandedMace, 650 },   
                    { WeaponType.TwohandedMace, 700 }    
                },

                //BTBAs value
                WeaponBTBAs = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 0.8 },
                    { WeaponType.Dagger, 1 },
                    { WeaponType.OnehandedSword, 1.1 },
                    { WeaponType.TwohandedSword, 1.2 },
                    { WeaponType.OnehandedSpear, 1.3 },
                    { WeaponType.TwohandedSpear, 1.4 },
                    { WeaponType.OnehandedAxe, 1.4 },
                    { WeaponType.TwohandedAxe, 1.5 },
                    { WeaponType.OnehandedMace, 1.3 },
                    { WeaponType.TwohandedMace, 1.4 }
                }


            },

            // ── Mage ─────────────────────────────────────────────────
            ["Magician"] = new JobData
            {
                Name = "Magician",
                MaxJobLevel = 50,
                HpJobA = 0.3,
                HpJobB = 5.0,
                SpJobA = 1.5,
                SpJobB = 6.0,
                Weight = 200,


                AgiBonusTable = new Dictionary<int, int>
                {
                    { 18, 1 }, { 26, 2 }, {40, 3 }, { 47, 4 }
                },
                IntBonusTable = new Dictionary<int, int>
                {
                    { 2, 1 }, { 14, 2 }, { 22, 3 }, { 33, 4 }, {38, 5 }, {44, 6 }, {46, 7 }, {50, 8 }
                },
                DexBonusTable = new Dictionary<int, int>
                {
                    { 6, 1 }, { 10, 2 }, { 36, 3 }
                },
                LukBonusTable = new Dictionary<int, int>
                {
                    { 30, 1 }, { 42, 2 }, {49, 3 }
                },


                WeaponAspdOffsets = new Dictionary<WeaponType, int>
                {
                    { WeaponType.Hand, 35 },
                    { WeaponType.Dagger, 46 },
                    { WeaponType.RodStaff,  57 },
                    { WeaponType.TwohandedStaff, 57 }
                },

                WeaponDelays = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 500 },
                    { WeaponType.Dagger, 600 },
                    { WeaponType.RodStaff, 700 },
                    { WeaponType.TwohandedStaff, 700 }
                },

                //BTBAs value
                WeaponBTBAs = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 1 },
                    { WeaponType.Dagger, 1.2 },
                    { WeaponType.RodStaff, 1.4 },
                    { WeaponType.TwohandedStaff, 1.4 }
                }
            },

            // ── ARCHER ───────────────────────────────────────────────────
            ["Archer"] = new JobData
            {
                Name = "Archer",
                MaxJobLevel = 50,
                HpJobA = 0.5,
                HpJobB = 5.0,
                SpJobA = 1.0,
                SpJobB = 2.0,
                Weight = 600,

                StrBonusTable = new Dictionary<int, int>
                {
                    { 6, 1 }, { 38, 2 }, { 40, 3 }
                },
                AgiBonusTable = new Dictionary<int, int>
                {
                    { 26, 1 }, { 33, 2 }, {49, 3 }
                },
                VitBonusTable = new Dictionary<int, int>
                {
                    { 46, 1 }
                },
                IntBonusTable = new Dictionary<int, int>
                {
                    { 10, 1 }, {47, 2 }
                },
                DexBonusTable = new Dictionary<int, int>
                {
                    { 2, 1 }, { 14, 2 }, { 18, 3 }, {30, 4}, {36, 5 }, {42, 6}, {50, 7}
                },
                LukBonusTable = new Dictionary<int, int>
                {
                    { 22, 1 }, { 44, 2 }
                },

                //WeaponDelay values
                WeaponDelays = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 405 },    
                    { WeaponType.Dagger, 600 },  
                    { WeaponType.Bow, 700 }      
                },

                //BTBAs value
                WeaponBTBAs = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 0.8 },
                    { WeaponType.Dagger, 1.2 },
                    { WeaponType.Bow, 1.4 }
                }
                //WeaponDelay = 42.0,
            },

            // ── THIEF ────────────────────────────────────────────────────
            ["Thief"] = new JobData
            {
                Name = "Thief",
                MaxJobLevel = 50,
                HpJobA = 0.5,
                HpJobB = 5.0,
                SpJobA = 1.0,
                SpJobB = 2.0,
                Weight = 400,

                StrBonusTable = new Dictionary<int, int>
                {
                    { 6, 1 }, { 30, 2 }, { 38, 3 }, { 47, 4}
                },
                AgiBonusTable = new Dictionary<int, int>
                {
                    { 2, 1 }, { 33, 2 }, {36, 3 }, {50, 4 }
                },
                VitBonusTable = new Dictionary<int, int>
                {
                    { 14, 1 }, {44, 2 }
                },
                IntBonusTable = new Dictionary<int, int>
                {
                    { 18, 1 }
                },
                DexBonusTable = new Dictionary<int, int>
                {
                    { 10, 1 }, { 22, 2 }, { 42, 3 }, {49, 4}
                },
                LukBonusTable = new Dictionary<int, int>
                {
                    { 26, 1 }, { 40, 2 }, {46, 3 }
                },

                //Weapon delays value
                WeaponDelays = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 405 },            
                    { WeaponType.Dagger, 500 },          
                    { WeaponType.OnehandedSword, 650 },  
                    { WeaponType.OnehandedAxe, 803 },    
                    { WeaponType.Bow, 803 },             
                },

                //BTBAs value
                WeaponBTBAs = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 0.8 },
                    { WeaponType.Dagger, 1 },
                    { WeaponType.OnehandedSword, 1.3 },
                    { WeaponType.OnehandedAxe, 1.6 },
                    { WeaponType.Bow, 1.6 }
                }

                //WeaponDelay = 40.0,
            },

            // ── ACOLYTE ──────────────────────────────────────────────────
            ["Acolyte"] = new JobData
            {
                Name = "Acolyte",
                MaxJobLevel = 50,
                HpJobA = 0.4,
                HpJobB = 5.0,
                SpJobA = 1.2,
                SpJobB = 5.0,
                Weight = 400,

                StrBonusTable = new Dictionary<int, int>
                {
                    { 26, 1 }, { 42, 2 }, { 49, 3 }
                },
                AgiBonusTable = new Dictionary<int, int>
                {
                    { 22, 1 }, { 40, 2 }
                },
                VitBonusTable = new Dictionary<int, int>
                {
                    { 6, 1 }, { 30, 2 }, { 44, 3}
                },
                IntBonusTable = new Dictionary<int, int>
                {
                    { 10, 1 }, { 33, 2 }, { 46, 3 }
                },
                DexBonusTable = new Dictionary<int, int>
                {
                    { 14, 1 }, { 36, 2 }, { 46, 3 }
                },
                LukBonusTable = new Dictionary<int, int>
                {
                    { 2, 1 }, { 18, 2 }, { 38, 3 }, { 50, 4 }
                },

                WeaponDelays = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 405 },            
                    { WeaponType.OnehandedMace, 600 },   
                    { WeaponType.TwohandedMace, 600 },   
                    { WeaponType.RodStaff, 600 },        
                    { WeaponType.TwohandedStaff, 600 }   
                },

                //BTBAs value
                WeaponBTBAs = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 0.8 },
                    { WeaponType.OnehandedMace, 1.2 },
                    { WeaponType.TwohandedMace, 1.2 },
                    { WeaponType.RodStaff, 1.2 },
                    { WeaponType.TwohandedStaff, 1.2 }
                }

                //WeaponDelay = 52.0,
            },

            // ── MERCHANT ─────────────────────────────────────────────────
            ["Merchant"] = new JobData
            {
                Name = "Merchant",
                MaxJobLevel = 50,
                HpJobA = 0.4,
                HpJobB = 5.0,
                SpJobA = 1.0,
                SpJobB = 3.0,
                Weight = 800,

                StrBonusTable = new Dictionary<int, int>
                {
                    { 10, 1 }, { 22, 2 }, { 40, 3 }, { 44, 4 }, { 49, 5 }
                },
                AgiBonusTable = new Dictionary<int, int>
                {
                    { 33, 1 }
                },
                VitBonusTable = new Dictionary<int, int>
                {
                    { 2, 1 }, { 18, 2 }, { 30, 3 }, { 47, 4 }
                },
                IntBonusTable = new Dictionary<int, int>
                {
                    { 26, 1 }
                },
                DexBonusTable = new Dictionary<int, int>
                {
                    { 6, 1 }, { 14, 2 }, { 38, 3 }, { 42, 4 }, { 50, 5 }
                },
                LukBonusTable = new Dictionary<int, int>
                {
                    { 36, 1 }, { 46, 2 }
                },

                WeaponDelays = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 415 },            // Result: 164
                    { WeaponType.Dagger, 615 },          // Result: 147
                    { WeaponType.OnehandedSword, 720 },  // Result: 138
                    { WeaponType.OnehandedAxe, 720 },    // Result: 138
                    { WeaponType.TwohandedAxe, 765 },    // Result: 134
                    { WeaponType.OnehandedMace, 720 },   // Result: 138
                    { WeaponType.TwohandedMace, 720 }    // Result: 138
                },

                //BTBAs value
                WeaponBTBAs = new Dictionary<WeaponType, double>
                {
                    { WeaponType.Hand, 0.8 },
                    { WeaponType.Dagger, 1.2 },
                    { WeaponType.OnehandedSword, 1.4 },
                    { WeaponType.OnehandedAxe, 1.4 },
                    { WeaponType.TwohandedAxe, 1.5 },
                    { WeaponType.OnehandedMace, 1.4 },
                    { WeaponType.TwohandedMace, 1.4 }
                }

                //WeaponDelay = 48.0,
            },

        };

        public static JobData Get(string jobName)
        {
            return _jobs.TryGetValue(jobName, out var job) ? job : _jobs["Novice"];
        }

        public static IEnumerable<string> GetAllJobNames()
        {
            return _jobs.Keys;
        }

        public static bool IsValidJobLevel(string jobName, int jobLevel)
        {
            var job = Get(jobName);
            return jobLevel >= 1 && jobLevel <= job.MaxJobLevel;
        }
    }

    public class StatUpdateMessage
    {
        [JsonProperty("stat")]
        public string Stat { get; set; }  // Nullable - only for STAT_CHANGE

        // to handle stat inputs

        [JsonProperty("newValue")]
        public int NewValue { get; set; }

        // "STAT_UPDATE" or "CLASS_CHANGE" or "JOB_LEVEL_CHANGE"

        [JsonProperty("type")]
        public string Type { get; set; }

        // to handle "Swordsman", "Mage", etc.

        [JsonProperty("class")]
        public string ClassName { get; set; } // Only for CLASS_CHANGE

        [JsonProperty("value")]
        public int Value { get; set; }  // Alternative field name from JS

        [JsonProperty("weapon")]
        public string Weapon { get; set; }  // Only for WEAPON_CHANGE

        // Constructor with safe defaults
        public StatUpdateMessage()
        {
            Type = "STAT_CHANGE";
            Stat = null;
            NewValue = 1;
            Value = 1;
            ClassName = null;
            Weapon = null;
        }
    }

    /// <summary>
    /// Message sent from JS to sync the entire character state on load/init
    /// </summary>
    public class SyncStateMessage
    {
        public string Type { get; set; } = "SYNC_STATE";
        public int BaseLv { get; set; } = 1;
        public int JobLv { get; set; } = 1;
        public int Str { get; set; } = 1;
        public int Agi { get; set; } = 1;
        public int Vit { get; set; } = 1;
        public int Int { get; set; } = 1;
        public int Dex { get; set; } = 1;
        public int Luk { get; set; } = 1;
        public string Job { get; set; } = "Novice";
        public string Weapon { get; set; } = "Hand";
    }
}
