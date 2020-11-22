/// <reference types="cookieclicker" />
import { ReturnableEventEmitter } from "../lib/eventemitter";
export declare type Hooks = ReturnableEventEmitter<{
    /**
     * Allows you to add entries to all menus
     */
    menu: void;
    /**
     * Allows you to add entries to the options menu
     */
    optionsMenu: void;
    /**
     * Allows you to add entries to the stats menu
     */
    statsMenu: void;
    /**
     * Allows you to add entries to the info menu
     */
    infoMenu: void;
    /**
     * Allows you to execute a function on data load, useful for custom data loading
     *
    customLoad: void

    /**
     * Allows you to execute a function on data load, useful for custom data resetting
     * @param hard whether or not this is a hard reset
     *
    customReset: boolean
*/
    getIcon: {
        type: string;
        tier: string | number;
        icon: Game.Icon;
    };
    /**
     * Called after BuildStore, used internally
     */
    buildStore: void;
    /**
     * Adds grandma options, must return a truthy value to be considered an image
     * @returns A link to an image, or a falsy value
     */
    grandmaPic: string[];
    rawCps: number;
    cps: number;
    cpsMult: number;
}>;
/**
 * Creates the function hooks for base game
 * @returns A promise
 */
export declare function main(): Promise<Hooks>;
