/// <reference types="cookieclicker" />
import { CommonValue } from "./helpers";
export declare const customUpgrades: Upgrade[];
/**
 * The class for upgrades
 */
export declare class Upgrade extends Game.Upgrade {
    /**
     * Creates an upgrade
     * @param name The name of the upgrade
     * @param desc The description of it
     * @param price The price of it
     * @param icon  The icon for it
     * @param buyFunc The function that gets called when you buy the upgrade
     */
    constructor(name: string, desc: CommonValue<string>, price: CommonValue<number>, icon: CommonValue<Game.Icon>, buyFunc?: () => void);
}
/**
 * The class for heavenly upgrades
 */
export declare class HeavenlyUpgrade extends Upgrade implements Game.HeavenlyUpgrade {
    posX: number;
    posY: number;
    pool: "prestige";
    /**
     * Creates a heavenly upgrade
     * @param name The name for it
     * @param desc The description of it
     * @param price The price of in (in Heavenly Chips)
     * @param icon The icon for it
     * @param position The position of it on the heavenly map screen
     * @param parents It's parents, can be mixed ID's with names
     * @param buyFunc The function which gets called on being bought
     */
    constructor(name: string, desc: CommonValue<string>, price: CommonValue<number>, icon: CommonValue<Game.Icon>, position: [number, number], parents?: (string | number)[], buyFunc?: () => void);
}
export declare class TieredUpgrade<Tier extends string | number = string | number> extends Upgrade implements Game.TieredUpgradeClass<Tier> {
    buildingTie: Game.Object;
    buildingTie1: Game.Object;
    tier: Tier;
    pool: "";
    /**
     * Creates a tiered upgrade
     * @param name The name of the tiered upgrade
     * @param quote The description of the upgrade
     * @param building The building it boosts
     * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
     */
    constructor(name: string, quote: string, building: Game.Object | string, tier: Tier);
}
export declare class GrandmaSynergy extends Upgrade implements Game.GrandmaSynergyClass {
    buildingTie: Game.Object;
    pool: "";
    /**
     * Creates a grandma synergy upgrade
     * @param name The name for the upgrade(Usually something like "_ Grandmas")
     * @param quote The flavor text of the upgrade
     * @param buildingName The building to be tied with
     * @param grandmaPicture Optional, the picture of the grandma to use in grandma art
     */
    constructor(name: string, quote: string, building: Game.Object | string, grandmaPicture?: string);
}
export declare class SynergyUpgrade<Tier extends string> extends Upgrade implements Game.SynergyUpgradeClass<Tier> {
    buildingTie1: Game.Object;
    buildingTie2: Game.Object;
    tier: Tier;
    pool: "";
    /**
     * Creates a synergy upgrade
     * @param name The name for the upgrade
     * @param quote The flavor text for it
     * @param building1Name The first building
     * @param building2Name The second building
     * @param tier The upgrade's tier, is the id of the tier, ex. `synergy1`(Synergy I), `synergy2`(Synergy II), etc. **Warning: The tier must have a req field**
     */
    constructor(name: string, quote: string, building1: Game.Object | string, building2: Game.Object | string, tier: Tier);
}
export declare class CursorUpgrade<Tier extends string | number> extends Upgrade implements Game.GenericTieredUpgrade<Tier> {
    pool: "";
    tier: Tier;
    /**
     * Creates an upgrade which powers up the Thousand Fingers upgrade
     * @param name Name of the upgrade
     * @param quote Quote (flavour text) of it
     * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
     * @param power The multiplier of of thousand fingers, if omitted, 20 by default, which is the multiplier of later cursor upgrades
     */
    constructor(name: string, quote: string, tier: Tier, power?: number);
}
/**
 * Exceptions when the change kitten cost is not 3 (in log10)
 */
export declare const kittenPriceRules: {
    1: number;
    2: number;
    4: number;
    default: number;
};
/**
 * Calculates the cost of a kitten, based on price rules and tier.
 * @param tier The tier, must be a number
 */
export declare function computeKittenCost(tier: number): number;
export declare class KittenUpgrade<Tier extends string | number> extends Upgrade implements Game.KittenUpgrade<Tier> {
    tier: Tier;
    kitten: true;
    pool: "";
    /**
     * Creates a new kitten upgrade, which boosts CpS based on achievement amount
     * @param name Name of the upgrade
     * @param quote The quote (flavour text) of it
     * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
     * @param power The multiplier of CpS per 25 achievement, if not set, automatically calculated
     * @param cost The cost of the upgrade, if not set, automatically calculated
     * @param milkUnlockAmount The milk progess (achievements / 25) required to unlock the upgrade, if not set, automatically calculated
     */
    constructor(name: string, quote: string, tier: Tier, power?: number | null, cost?: number, milkUnlockAmount?: number | null);
}
export declare class MouseUpgrade<Tier extends string | number> extends Upgrade implements Game.GenericTieredUpgrade<Tier> {
    tier: Tier;
    pool: "";
    /**
     * Creates an upgrade which powers up the cookies per click
     * @param name Name of the upgrade
     * @param quote Quote (flavour text) of it
     * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
     * @param power The multiplier of CpS per click, `0.01` by default, which is what all other cursor upgrades give
     */
    constructor(name: string, quote: string, tier: Tier, power?: number);
}
export declare class CookieUpgrade extends Upgrade implements Game.CookieUpgrade {
    power: CommonValue<number>;
    pool: "cookie";
    /**
     * Create an upgrade which multiplier cookie production
     * @param name Name of the cookie
     * @param quote Quote (flavour text) of it
     * @param price The price of the cookie
     * @param icon The icon of it
     * @param power The multiplier of CpS, in %, so `5` means +5% CpS, etc.
     * @param req Some optional conditions, etc. the season, the upgrade required, or if the upgrade can be unlocked naturally at all to unlock this
     * (Note: All cookies which aren't locked *require* you to have 1/20 of it's cost to be unlocked)
     * @param order Position of the cookie in the list, Most cookies have 10020 by default, cookies from boxes and special cookies have different orders.
     */
    constructor(name: string, quote: string, price: CommonValue<number>, icon: Game.Icon, power: CommonValue<number>, req?: {
        require?: string;
        season?: string;
        locked?: boolean;
    }, order?: number);
}
