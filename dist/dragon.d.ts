/// <reference types="cookieclicker" />
export declare class DragonAura implements Game.DragonAura {
    name: string;
    desc: string;
    pic: Game.Icon;
    /**
     * Creates a (non-building) dragon aura
     * @param name Name of the dragon aura (in HTML text)
     * @param desc Description of it (in HTML text)
     * @param icon The icon of it
     */
    constructor(name: string, desc: string, icon: Game.Icon);
    /**
     * Creates a (building) dragon aura
     * @param name Name of the dragon aura (in HTML text)
     * @param desc Description of it (in HTML text)
     * @param building The building (name or object) to link the aura to
     */
    constructor(name: string, desc: string, building: string | Game.Object);
}
export declare class DragonLevel implements Game.DragonLevel {
    buy: () => void;
    /**
     * The X position of the dragon icon
     */
    pic: number;
    /**
     * The Y position of the dragon icon
     */
    picY: number;
    /**
     * The link to the dragon icon
     */
    picLink?: string;
    name: string;
    costStr: () => string;
    cost: () => boolean;
    action: string;
    /**
     * Creates a new dragon level
     * @param name Name of the dragon at this level, null for last name
     * @param desc A string describing the effects of leveling up
     * @param costDescription A string (or a function) describing the resources required to be able to buy the level
     * @param canBuy A function which determines if it is possible to buy the level
     * @param buy A function which spends the required resources
     * @param icon  Icon of the dragon at this level, null for last icon, note that the icon is 96x96, not 48x48
     */
    constructor(name: string | null, desc: string, // `this.action`
    costDescription: string | (() => string), // `this.costStr`
    canBuy: () => boolean, // `this.cost`
    buy: () => void, icon?: Game.Icon | null, // `this.pic`, `this.picLink`, and `this.picY`
    order?: number);
}
export declare class DragonAuraLevel extends DragonLevel {
    /**
     * Creates a level which unlocks an aura
     * @param auraName Name of the aura
     * @param auraDesc Short description of the aura, in html text
     * @param building The building which the aura is tied to
     */
    constructor(auraName: string, auraDesc: string, building: string | Game.Object);
}
