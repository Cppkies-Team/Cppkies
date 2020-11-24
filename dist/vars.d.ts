/// <reference types="cookieclicker" />
import { Building } from "./buildings";
import { Upgrade, TieredUpgrade, HeavenlyUpgrade, GrandmaSynergy, SynergyUpgrade } from "./upgrade";
import Tier from "./tiers";
import { injectCode } from "./helpers";
import { patchIconsheet, relinkColumn, relinkRow } from "./spritesheets";
import { Hooks } from "./injects/basegame";
import { Achievement, CpsAchievement, BankAchievement } from "./achievement";
/**
 * The main object which is exported by Cppkies
 */
declare const master: {
    hooks: Hooks;
    on: <N extends "menu" | "optionsMenu" | "statsMenu" | "infoMenu" | "preSave" | "customReset" | "getIcon" | "buildStore" | "grandmaPic" | "rawCps" | "cps" | "cpsMult">(name: N, func: (src: {
        menu: [void, void];
        optionsMenu: [void, void];
        statsMenu: [void, void];
        infoMenu: [void, void];
        preSave: [void, void];
        customReset: [boolean, void];
        getIcon: [{
            type: string;
            tier: string | number;
            icon: Game.Icon;
        }, {
            type: string;
            tier: string | number;
            icon: Game.Icon;
        }];
        buildStore: [void, void];
        grandmaPic: [string[], string[]];
        rawCps: [number, number];
        cps: [number, number];
        cpsMult: [number, number];
    }[N][0]) => {
        menu: [void, void];
        optionsMenu: [void, void];
        statsMenu: [void, void];
        infoMenu: [void, void];
        preSave: [void, void];
        customReset: [boolean, void];
        getIcon: [{
            type: string;
            tier: string | number;
            icon: Game.Icon;
        }, {
            type: string;
            tier: string | number;
            icon: Game.Icon;
        }];
        buildStore: [void, void];
        grandmaPic: [string[], string[]];
        rawCps: [number, number];
        cps: [number, number];
        cpsMult: [number, number];
    }[N][1]) => void;
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
    Achievement: typeof Achievement;
    CpsAchievement: typeof CpsAchievement;
    BankAchievement: typeof BankAchievement;
    customAchievements: Achievement[];
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
