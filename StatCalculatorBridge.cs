using Modsim_Simulation.Jobs;
using System.Runtime.InteropServices;
using System.Text.Json;

namespace Modsim_Simulation;

[ComVisible(true)]
public class StatCalculatorBridge
{
    public string CalculateStats(int str, int agi, int vit, int intel, int dex, int luk, int baseLv, int weaponType, string job)
    {
        // --- PHYSICAL ATK (Melee) ---
        // Formula: STR + (STR/10)^2 + (DEX/5) + (LUK/5)
        int strBonus = (int)Math.Floor(Math.Pow(Math.Floor(str / 10.0), 2));
        int meleeAtk = str + strBonus + (int)Math.Floor(dex / 5.0) + (int)Math.Floor(luk / 5.0);

        // --- MAGIC ATK (MATK) ---
        // Min: INT + (INT/7)^2  | Max: INT + (INT/5)^2
        int minMatk = intel + (int)Math.Floor(Math.Pow(Math.Floor(intel / 7.0), 2));
        int maxMatk = intel + (int)Math.Floor(Math.Pow(Math.Floor(intel / 5.0), 2));

        // --- HIT & FLEE ---
        int hit = baseLv + dex + (int)Math.Floor(luk / 3.0); // LUK contributes to HIT in classic
        int flee = baseLv + agi + (int)Math.Floor(luk / 5.0); // LUK adds minor Flee

        // --- CRITICAL & PERFECT DODGE ---
        double critical = 1.0 + (luk * 0.3); // Status window shows (LUK * 0.3) + 1
        int perfectDodge = 1 + (int)Math.Floor(luk / 10.0); // Bonus evade (Lucky!)

        // --- DEFENSE (Soft DEF) ---
        // For Novice: VIT adds damage reduction directly
        int softDef = vit;
        int softMdef = intel + (int)Math.Floor(vit / 5.0);

        // --- ASPD (Novice Base) ---
        // Base ASPD for Novice is usually 150 (Unarmed)
        int aspd = CalculateAspd(agi, dex, weaponType, job);

        // --- CAST TIME REDUCTION ---
        // 150 DEX = Instant Cast. Formula: % Reduction = (DEX / 150)
        double castReduction = (dex / 150.0) * 100;

        int pointsLeft = 48;
        // Loop through every level up to the target level
        for (int i = 1; i < baseLv; i++)
        {
            pointsLeft += (int)Math.Floor(i / 5.0) + 3;
        }

        int maxHP = Novice.CalculateMaxHP(baseLv, vit);
        int maxSP = Novice.CalculateMaxSP(baseLv, intel);

        return JsonSerializer.Serialize(new
        {
            atk = meleeAtk,
            matk = minMatk,
            maxMatk = maxMatk,
            hit = hit,
            flee = flee,
            perfectDodge = perfectDodge,
            crit = (int)Math.Round(critical, 1),
            def = softDef, // Classic shows Soft + Hard DEF
            mdef = softMdef,
            aspd = aspd,
            cast = Math.Round(Math.Min(castReduction, 100.0), 1) + "%",
            pointsUsed = pointsLeft - GetTotalPointCost(str, agi, vit, intel, dex, luk),
            maxHP = maxHP,
            maxSP = maxSP,
            hpRegen = Novice.CalculateHPRegen(maxHP, vit),
            spRegen = Novice.CalculateSPRegen(maxSP, intel),
        });
    }

    private int GetTotalPointCost(params int[] stats)
    {
        int total = 0;
        foreach (int val in stats)
        {
            for (int i = 2; i <= val; i++)
            {
                total += (int)Math.Floor((i - 2) / 10.0) + 2;
            }
        }
        return total;
    }
    public int CalculateAspd(int agi, int dex, int weaponType, string job)
    {
        // amotion base table [job][weaponType]
        // Columns: 0=Unarmed,1=Dagger,2=1HSword,3=2HSword,4=1HSpear,5=2HSpear,
        //          6=1HAxe,  7=2HAxe, 8=1HMace, 9=Rod,    10=Bow,   11=Knuckle
        // Values from eAthena job_db1.txt
        var aspdBase = new Dictionary<string, int[]>
    {
        // Novice
        { "Novice",   new[] { 500, 650, 700, 2000, 2000, 2000, 800, 2000, 700, 650, 2000, 2000 } },
        // Swordman
        { "Swordman", new[] { 400, 500, 550,  600,  650,  700, 700,  750, 650, 2000, 2000, 2000 } },
        // Magician
        { "Magician", new[] { 500, 600, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 700, 2000, 2000 } },
        // Archer
        { "Archer",   new[] { 400, 600, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 700, 2000 } },
        // Acolyte
        { "Acolyte",  new[] { 400, 600, 2000, 2000, 2000, 2000, 2000, 2000, 600, 550, 2000, 2000 } },
        // Merchant
        { "Merchant", new[] { 400, 600, 700, 2000, 2000, 2000, 600, 700, 600, 2000, 2000, 2000 } },
        // Thief
        { "Thief",    new[] { 400, 450, 500, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000 } },
    };

        int amotion = aspdBase[job][weaponType];

        // Stat reduction: floor(amotion * (4*AGI + DEX) / 1000)
        amotion -= (int)Math.Floor(amotion * (4.0 * agi + dex) / 1000.0);

        // Convert amotion to ASPD
        double aspd = (2000 - amotion) / 10.0;

        if (aspd > 190)
            aspd = 190;

        return (int)Math.Floor(aspd);
    }
    public int GetStatUpgradeCost(int currentVal)
    {
        // If the stat is currently 1-11, next point costs 2
        // If 12-21, costs 3, etc.
        if (currentVal < 2) return 2;

        return ((currentVal - 2) / 10) + 2;
    }
}
