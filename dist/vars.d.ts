import { Building } from "./buildings";
import { Upgrade, TieredUpgrade, HeavenlyUpgrade, GrandmaSynergy, SynergyUpgrade } from "./upgrade";
import Tier from "./tiers";
import { injectCode } from "./helpers";
import { relinkColumn, relinkRow } from "./spritesheets";
import { Hooks } from "./injects/basegame";
/**
 * The main object which is exported by Cppkies
 */
declare const master: {
    hooks: Hooks;
    iconLink: string;
    buildingLink: string;
    buildingHooks: Record<string, import("./buildings").BuildingHooks>;
    buildingHooksById: any[];
    customBuildings: Building[];
    customUpgrades: Upgrade[];
    customTiers: Tier[];
    save: import("./saves").SaveType;
    onLoad: (() => void)[];
    Building: typeof Building;
    Upgrade: typeof Upgrade;
    TieredUpgrade: typeof TieredUpgrade;
    Tier: typeof Tier;
    HeavenlyUpgrade: typeof HeavenlyUpgrade;
    GrandmaSynergy: typeof GrandmaSynergy;
    SynergyUpgrade: typeof SynergyUpgrade;
    injectCode: typeof injectCode;
    DEFAULT_ONBUY: () => void;
    DEFAULT_CPS: (me: Building) => number;
    icons: {
        relinkColumn: typeof relinkColumn;
        relinkRow: typeof relinkRow;
    };
};
export default master;
