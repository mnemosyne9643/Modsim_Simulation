using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modsim_Simulation.Jobs;
public static class Novice
{
    // --- MAX HP FORMULA ---
    // Classical Calculation (PRE-RENEWAL)
    public static int CalculateMaxHP(int baseLv, int vit)
    {
        double baseHP = 35 + (5 * baseLv);
        return (int)Math.Floor(baseHP * (1 + (vit / 100.0)));
    }

    // --- MAX SP FORMULA ---
    // Formula: Floor( (BaseSP * (1 + INT/100) * JobModifier) )
    public static int CalculateMaxSP(int baseLv, int intel)
    {
        // Novices gain exactly 1 SP per level + small INT bonus
        double noviceBaseSP = 10 + baseLv;

        // 2. Apply INT bonus (1% per INT)
        double totalSP = Math.Floor(noviceBaseSP * (1 + (intel / 100.0)));

        return (int)totalSP;
    }

    // --- HP REGEN (Natural Recovery) ---
    // Happens every 6 seconds (Standing) or 3 seconds (Sitting)
    public static int CalculateHPRegen(int maxHP, int vit)
    {
        // Formula: Max(1, Floor(MaxHP / 200) + Floor(VIT / 5))
        int regen = (int)(Math.Floor(maxHP / 200.0) + Math.Floor(vit / 5.0));
        return Math.Max(1, regen);
    }

    // --- SP REGEN (Natural Recovery) ---
    // Happens every 8 seconds (Standing) or 4 seconds (Sitting)
    public static int CalculateSPRegen(int maxSP, int intel)
    {
        // Formula: 1 + Floor(MaxSP / 100) + Floor(INT / 6)
        // Bonus: If INT >= 120, there's a huge hidden jump, but Novices rarely reach it.
        int regen = 1 + (int)Math.Floor(maxSP / 100.0) + (int)Math.Floor(intel / 6.0);

        // Hidden INT bonus for high-end builds
        if (intel >= 120) regen += (int)(Math.Floor((intel - 120) / 2.0) + 4);

        return regen;
    }
}