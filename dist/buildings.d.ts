import gameType, { FoolBuilding } from "./gameType";
import Game from "./gameType";
declare let Game: gameType;
interface Art {
    base: string;
    xV: number;
    yV: number;
    w: number;
    rows: number;
    x: number;
    y: number;
    pic: string;
    bg: string;
}
export declare function createHooks(building: Building | Game["Object"]): void;
export declare class Building extends Game.Object {
    constructor(name: string, commonName: string, desc: string, icon: [number, number], art: Art, cpsFunc: (me: Building) => number, buyFunction: () => void, foolObject: FoolBuilding, buildingSpecial: [string, string]);
}
export {};
