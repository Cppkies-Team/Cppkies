/// <reference types="cookieclicker" />
import { Building } from "./buildings";
import { Upgrade, TieredUpgrade, HeavenlyUpgrade, GrandmaSynergy, SynergyUpgrade } from "./upgrade";
import Tier from "./tiers";
import { injectCode } from "./helpers";
import { patchIconsheet, relinkColumn, relinkRow } from "./spritesheets";
import { Hooks } from "./injects/basegame";
/**
 * The main object which is exported by Cppkies
 */
declare const master: {
    hooks: Hooks;
    on: <N extends "menu" | "optionsMenu" | "statsMenu" | "infoMenu" | "getIcon" | "buildStore" | "grandmaPic" | "rawCps" | "cps" | "cpsMult">(name: N, func: (src: {
        menu: void;
        optionsMenu: void;
        statsMenu: void;
        infoMenu: void;
        getIcon: {
            type: string;
            tier: string | number;
            icon: Game.Icon;
        };
        buildStore: void;
        grandmaPic: string[];
        rawCps: number;
        cps: number;
        cpsMult: number;
    }[N]) => {
        menu: void;
        optionsMenu: void;
        statsMenu: void;
        infoMenu: void;
        getIcon: {
            type: string;
            tier: string | number;
            icon: Game.Icon;
        };
        buildStore: void;
        grandmaPic: string[];
        rawCps: number;
        cps: number;
        cpsMult: number;
    }[N]) => void;
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
        patchIconsheet: typeof patchIconsheet;
    };
};
export default master;
