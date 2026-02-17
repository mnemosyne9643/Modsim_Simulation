using System.Runtime.InteropServices;
using System.Text.Json;

namespace Modsim_Simulation;

[ComVisible(true)]
public class StatCalculatorBridge
{
    public string CalculateStats(int str, int agi, int vit, int intel, int dex, int luk, int baseLv)
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
        double aspd = CalculateAccurateASPD(agi, dex);

        // --- CAST TIME REDUCTION ---
        // 150 DEX = Instant Cast. Formula: % Reduction = (DEX / 150)
        double castReduction = (dex / 150.0) * 100;

        return JsonSerializer.Serialize(new
        {
            atk = meleeAtk,
            matk = minMatk,
            maxMatk = maxMatk,
            hit = hit,
            flee = flee,
            perfectDodge = perfectDodge,
            crit = (int) Math.Round(critical, 1),
            def = softDef, // Classic shows Soft + Hard DEF
            mdef = softMdef,
            aspd = Math.Round(aspd, 1),
            cast = Math.Round(Math.Min(castReduction, 100.0), 1) + "%",
            pointsUsed = GetTotalPointCost(str, agi, vit, intel, dex, luk)
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

    // ASPD Correction and the Penalty Multiplier used by the Aegis engine.
    public double CalculateAccurateASPD(int agi, int dex, int jobBaseAspd = 156)
    {
        // 1. In Classic, every class has a 'Correction' based on AGI
        // This is why a level 1 Novice doesn't start at exactly 150.
        double aspdCorrection = Math.Ceiling((Math.Sqrt(205) - Math.Sqrt(agi)) / 7.15);

        // 2. The Penalty Multiplier (Classic uses this to slow down the gain)
        // Most classes use 0.96 or a formula based on the Job Base.
        double aspdPenalty = 1.0 - (jobBaseAspd - 144) / 50.0;

        // 3. The Actual Calculation
        // Formula: 200 - (200 - (Base + Stats)) * Penalty
        // Note: AGI has 1.0x weight, DEX has ~0.19x weight in classic
        double statGain = Math.Sqrt(agi * 9.9987 + dex * 0.1922) * aspdPenalty;

        double finalAspd = 200 - (200 - (jobBaseAspd - aspdCorrection + statGain));

        // The game client TRUNCATES (rounds down) the display value.
        return Math.Floor(finalAspd * 10) / 10.0;
    }

    public int GetStatUpgradeCost(int currentVal)
    {
        // If the stat is currently 1-11, next point costs 2
        // If 12-21, costs 3, etc.
        if (currentVal < 2) return 2;

        return ((currentVal - 2) / 10) + 2;
    }
}
