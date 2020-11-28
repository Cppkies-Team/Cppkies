/// <reference types="cookieclicker" />
import { ReturnableEventEmitter } from "./lib/eventemitter";
export declare const buildingHooks: Record<string, BuildingHooks>;
export declare const customBuildings: Building[];
/**
 * Creates the hooks for a building
 * @param building The building to create hooks for
 */
export declare type BuildingHooks = ReturnableEventEmitter<{
    tooltip: [
        {
            building: Game.Object;
            str: string;
        },
        {
            building: Game.Object;
            str: string;
        }
    ];
    cps: [number, number];
}>;
export declare function createHooks(building: Building | Game.Object): void;
/**
 * The building class for creating new buildings
 */
export declare class Building extends Game.Object {
    iconLink: string;
    buildingLink: string;
    /**
     * Creates a new building and creates the hooks for it
     * @param name The name of the building
     * @param commonName Various additional string for the building, split by |:  The name of the building, then in plural, how the building produced the cookies, the effect from sugar lumps, then in plural
     * @param desc The description of the building
     * @param icon The icon for the building (Only the column matters) (See http://cppkies.js.org/#/./CommonProblems?id=relink-column for instructions about the icons)
     * @param bigIcon The icon that shows up in store (Only the row matters) (See http://cppkies.js.org/#/./CommonProblems?id=big-icons for instructions about the big icons)
     * @param art The art for the building
     * @param cpsFunc The function to calculate CPS
     * @param buyFunction The function which gets called when it's bought
     * @param foolObject The fool building to display during business day
     * @param buildingSpecial The building special and building debuff
     */
    constructor(name: string, commonName: string, desc: string, icon: Game.Icon, bigIcon: Game.Icon, art: Game.Art, cpsFunc: (me: Building) => number, buyFunction: () => void, foolObject: Game.FoolBuilding, buildingSpecial: [string, string]);
}
/**
 * The recommended function to pass in building CpsFunc
 * @param me Itself
 */
export declare const defaultCps: (me: Building) => number;
/**
 * The reccomended function to pass in building BuyFunc
 */
export declare const defaultOnBuy: () => void;
