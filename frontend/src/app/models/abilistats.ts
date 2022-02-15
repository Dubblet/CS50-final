export class AbiliStats {
    public dex_num: number = 1;
    public name: string = "Bulbasaur";
    public ability: string = "Overgrow:When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Grass-type attack.;Chlorophyll:If Sunny Day is active and this Pokemon is not holding Utility Umbrella, this Pokemon's Speed is doubled.";
    public hp: number = 45;
    public attack: number = 49;
    public defense: number = 49;
    public sp_attack: number = 65;
    public sp_defense: number = 65;
    public speed: number = 45;

    constructor() {}
}

export function bst(stats: AbiliStats): number {
    return stats.hp + stats.attack + stats.defense + stats.sp_attack + stats.sp_defense + stats.speed;
}