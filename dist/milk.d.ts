/// <reference types="cookieclicker" />
declare type MilkClass = typeof Game.Milk & Game.ChoiceCosmetics;
export declare class Milk implements MilkClass {
    name: string;
    pic: string;
    special: boolean;
    icon: [number, number];
    iconLink?: string;
    /**
     * Creates a new milk type
     * @param name The name of the milk
     * @param icon The icon of the mink
     * @param pic The image to use for the milk itself, must end in .png
     * @param special If true, the milk is only avaliable via milk selector
     */
    constructor(name: string, icon: Game.Icon, pic: string, special?: boolean);
}
export {};
