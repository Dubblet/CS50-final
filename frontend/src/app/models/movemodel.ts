export class MoveModel {
    public dex_num: number = 1;
    public move: string = "Growl";
    public type: string = "Normal";
    public category: number = 0;
    public damage: number = 0;
    public accuracy: number = 100;
    public description: string = "Lowers the foe(s) Attack by 1.";
    public learn_lvl?: number;
    public tm?: number;
    public tr?: number;
    public tutor?: number;

    constructor() {}
}