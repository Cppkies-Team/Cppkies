/// <reference types="cookieclicker" />
import { Building } from "./buildings";
import { Upgrade, TieredUpgrade, HeavenlyUpgrade, GrandmaSynergy, SynergyUpgrade, KittenUpgrade } from "./upgrade";
import Tier from "./tiers";
import { injectCode, injectCodes } from "./helpers";
import { patchIconsheet, relinkColumn, relinkRow, alias } from "./spritesheets";
import { Hooks } from "./injects/basegame";
import { hookAllBuildings } from "./buildings";
import { CursorUpgrade, MouseUpgrade, CookieUpgrade } from "./upgrade";
import { MouseAchievement } from "./achievement";
import { DragonAura, DragonLevel, DragonAuraLevel } from "./dragon";
import { Milk } from "./milk";
import { TieredAchievement, ProductionAchievement, Level10Achievement } from "./achievement";
import { Achievement, CpsAchievement, BankAchievement } from "./achievement";
/**
 * The main object which is exported by Cppkies
 */
declare const master: {
    hooks: Hooks;
    on: <N extends "menu" | "optionsMenu" | "statsMenu" | "infoMenu" | "preSave" | "postSave" | "reset" | "reincarnate" | "getIcon" | "buildStore" | "grandmaPic" | "rawCps" | "rawCpsMult" | "cps" | "cpsMult" | "cursorFingerMult" | "cpc" | "cpcAdd" | "logic" | "draw" | "check" | "ticker" | "buildingCps" | "specialPic">(name: N, func: (src: {
        menu: [void, void];
        optionsMenu: [void, void];
        statsMenu: [void, void];
        infoMenu: [void, void];
        preSave: [void, void];
        postSave: [void, void];
        reset: [boolean, void];
        reincarnate: [void, void];
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
        rawCpsMult: [number, number];
        cps: [number, number];
        cpsMult: [number, number];
        cursorFingerMult: [number, number];
        cpc: [number, number];
        cpcAdd: [number, number];
        logic: [void, void];
        draw: [void, void];
        check: [void, void];
        ticker: [string[], string[]];
        buildingCps: [{
            building: string;
            cps: number;
        }, {
            building: string;
            cps: number;
        }];
        specialPic: [{
            tab: string;
            pic: string;
            frame: number;
        }, {
            tab: string;
            pic: string;
            frame: number;
        }];
    }[N][0]) => {
        menu: [void, void];
        optionsMenu: [void, void];
        statsMenu: [void, void];
        infoMenu: [void, void];
        preSave: [void, void];
        postSave: [void, void];
        reset: [boolean, void];
        reincarnate: [void, void];
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
        rawCpsMult: [number, number];
        cps: [number, number];
        cpsMult: [number, number];
        cursorFingerMult: [number, number];
        cpc: [number, number];
        cpcAdd: [number, number];
        logic: [void, void];
        draw: [void, void];
        check: [void, void];
        ticker: [string[], string[]];
        buildingCps: [{
            building: string;
            cps: number;
        }, {
            building: string;
            cps: number;
        }];
        specialPic: [{
            tab: string;
            pic: string;
            frame: number;
        }, {
            tab: string;
            pic: string;
            frame: number;
        }];
    }[N][1]) => void;
    /**
     * The multiplier of milk which is not accessible in game by default
     */
    hiddenMilkMult: number;
    iconLink: string;
    buildingLink: string;
    cookieOrder: number;
    buildingHooks: Record<string, import("./buildings").BuildingHooks>;
    buildingHooksById: never[];
    hookAllBuildings: typeof hookAllBuildings;
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
    CursorUpgrade: typeof CursorUpgrade;
    KittenUpgrade: typeof KittenUpgrade;
    MouseUpgrade: typeof MouseUpgrade;
    CookieUpgrade: typeof CookieUpgrade;
    Achievement: typeof Achievement;
    CpsAchievement: typeof CpsAchievement;
    BankAchievement: typeof BankAchievement;
    TieredAchievement: typeof TieredAchievement;
    ProductionAchievement: typeof ProductionAchievement;
    Level10Achievement: typeof Level10Achievement;
    MouseAchievement: typeof MouseAchievement;
    customAchievements: Achievement[];
    DragonAura: typeof DragonAura;
    DragonLevel: typeof DragonLevel;
    DragonAuraLevel: typeof DragonAuraLevel;
    Milk: typeof Milk;
    injectCode: typeof injectCode;
    injectCodes: typeof injectCodes;
    DEFAULT_ONBUY: () => void;
    DEFAULT_CPS: (me: Building) => number;
    icons: {
        relinkColumn: typeof relinkColumn;
        relinkRow: typeof relinkRow;
        patchIconsheet: typeof patchIconsheet;
        extraColumnIcons: Record<string, import("./spritesheets").UniversalIcon>;
        extraRowIcons: Record<string, import("./spritesheets").UniversalIcon>;
        alias: typeof alias;
        aliases: Record<string, string>;
    };
};
export default master;
