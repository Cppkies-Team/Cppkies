import { Upgrade } from "./upgrade";
import { Icon } from "./gameType";
import { CommonValue } from "./helpers";
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
    constructor(name: string, desc: CommonValue<string>, price: number, icon: Icon, position: [number, number], parents?: (string | number)[], buyFunc?: () => void);
}
