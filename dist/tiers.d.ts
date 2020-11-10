/// <reference types="cookieclicker" />
export declare const customTiers: Tier[];
export default class Tier implements Game.Tier {
    name: string;
    color: string;
    achievUnlock: number;
    iconRow: number;
    iconLink?: string;
    /**
        Indicates if the tier shouldn't be accounted for tiered upgrades
    */
    special: boolean;
    req: string;
    upgrades: Game.TieredUpgradeClass<this["name"]>[];
    unlock: number;
    price: number;
    keyName: string;
    /**
     * Adds a new tier to the game for upgrades and achievements
     * @param name The name of the new tier
     * @param sampleIcon A sample of an icon using the tier
     * @param color The color of the tier
     * @param price The base price of tiered upgrades
     * @param special Indicates if the tier shouldn't be accounted for tiered upgrades
     * @param unlock How many buildings are needed for the upgrade
     * @param achievUnlock How many buildings are needed for the achievement
     * @param req Which upgrade is required to unlock the upgrades
     * @param keyName Optional, the key for tiers, used in everything
     */
    constructor(name: string, sampleIcon: Game.Icon, color: string, special?: boolean, price?: number | "auto", unlock?: number | "auto" | null, achievUnlock?: number | "auto" | null, req?: string | null, keyName?: string | "auto");
}
