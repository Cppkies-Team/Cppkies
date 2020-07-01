import { Icon } from "./gameType";
import { CommonValue } from "./helpers";
/**
 * The class for upgrades
 */
export declare class Upgrade extends window.Game.Upgrade {
    /**
     * Creates an upgrade
     * @param name The name of the upgrade
     * @param desc The description of it
     * @param price The price of it
     * @param icon  The icon for it
     * @param buyFunc The function that gets called when you buy the upgrade
     */
    constructor(name: string, desc: CommonValue<string>, price: CommonValue<number>, icon: CommonValue<Icon>, buyFunc?: () => void);
}
/**
 * The class for heavenly upgrades
 */
export declare class HeavenlyUpgrade extends Upgrade {
    parents: (string | number)[];
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
    constructor(name: string, desc: CommonValue<string>, price: CommonValue<number>, icon: CommonValue<Icon>, position: [number, number], parents?: (string | number)[], buyFunc?: () => void);
}
export declare class TieredUpgrade extends Upgrade {
    /**
     * Creates a tiered upgrade
     * @param name The name of the tiered upgrade
     * @param description The description of the upgrade
     * @param building The building it boosts
     * @param tier The upgrade's tier
     */
    constructor(name: string, description: string, building: string, tier: string | number);
}
export declare class GrandmaSynergy extends Upgrade {
    /**
     * Creates a grandma synergy upgrade
     * @param name The name for the upgrade(Usually something like "_ Grandmas")
     * @param quote The flavor text of the upgrade
     * @param buildingName The building to be tied with
     * @param grandmaPicture Optional, the picture of the grandma to use in grandma art
     */
    constructor(name: string, quote: string, buildingName: string, grandmaPicture?: string);
}
export declare class SynergyUpgrade extends Upgrade {
    /**
     * Creates a synergy upgrade
     * @param name The name for the upgrade
     * @param desc The flavor text for it
     * @param building1Name The first building
     * @param building2Name The second building
     * @param tier The synergy tier **Warning: The tier must have a req field**
     */
    constructor(name: string, desc: string, building1Name: string, building2Name: string, tier: string | number);
}
