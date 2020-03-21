import gameType, { FoolBuilding, Icon } from "./gameType";
declare let Game: gameType;
interface Art {
    base?: string;
    xV?: number;
    yV?: number;
    w?: number;
    h?: number;
    rows?: number;
    x?: number;
    y?: number;
    pic?: string;
    bg?: string;
    frames?: number;
}
/**
 * Creates the hooks for a building
 * @param building The building to create hooks for
 */
export declare function createHooks(building: Building | gameType["Object"]): void;
/**
 * The building class for creating new buildings
 */
export declare class Building extends Game.Object {
    /**
     * Creates a new building and creates the hooks for it
     * @param name The name of the building
     * @param commonName Various additional string for the building, split by |:  The name of the building, then in plural, how the building produced the cookies, the effect from sugar lumps, then in plural
     * @param desc The description of the building
     * @param icon The icon for the building (Only the column matters)
     * @param bigIcon The icon that shows up in store (Only the row matters)
     * @param art The art for the building
     * @param cpsFunc The function to calculate CPS
     * @param buyFunction The function which gets called when it's bought
     * @param foolObject The fool building to display during business day
     * @param buildingSpecial The building special and building debuff
     */
    constructor(name: string, commonName: string, desc: string, icon: Icon, bigIcon: Icon, art: Art, cpsFunc: (me: Building) => number, buyFunction: () => void, foolObject: FoolBuilding, buildingSpecial: [string, string]);
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
export {};
