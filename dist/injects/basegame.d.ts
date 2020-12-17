/// <reference types="cookieclicker" />
import { ReturnableEventEmitter } from "../lib/eventemitter";
export declare type Hooks = ReturnableEventEmitter<{
    /**
     * Allows you to add entries to all menus
     */
    menu: [void, void];
    /**
     * Allows you to add entries to the options menu
     */
    optionsMenu: [void, void];
    /**
     * Allows you to add entries to the stats menu
     */
    statsMenu: [void, void];
    /**
     * Allows you to add entries to the info menu
     */
    infoMenu: [void, void];
    /**
     * Allows you to execute a function on before saving, useful for cleaning up data which will be invalid if no mod is present
     */
    preSave: [void, void];
    /**
     * Allows you to execute a function on data load, useful for custom data resetting
     * @param hard whether or not this is a hard reset
     */
    reset: [boolean, void];
    getIcon: [
        {
            type: string;
            tier: string | number;
            icon: Game.Icon;
        },
        {
            type: string;
            tier: string | number;
            icon: Game.Icon;
        }
    ];
    /**
     * Called after BuildStore, used internally
     */
    buildStore: [void, void];
    /**
     * Adds grandma options for the grandma art
     */
    grandmaPic: [string[], string[]];
    rawCps: [number, number];
    rawCpsMult: [number, number];
    cps: [number, number];
    cpsMult: [number, number];
    /**
     * The multiplier of cursor finger bonus
     */
    cursorFingerMult: [number, number];
    /**
     * Cookies per click
     */
    cpc: [number, number];
    cpcAdd: [number, number];
    logic: [void, void];
    check: [void, void];
    buildingCps: [
        {
            building: string;
            cps: number;
        },
        {
            building: string;
            cps: number;
        }
    ];
}>;
/**
 * Creates the function hooks for base game
 * @returns A promise
 */
export declare function main(): Promise<Hooks>;
