import gameType, { Icon } from "./gameType";
declare let Game: gameType;
export declare class Upgrade extends Game.Upgrade {
    constructor(name: string, desc: string, price: number, icon: Icon, buyFunc: () => void);
}
export {};
