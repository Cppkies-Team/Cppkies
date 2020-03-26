import gameType, { Icon } from "./gameType";
declare let Game: gameType;
/**
 * The class for upgrades
 */
export declare class Upgrade extends Game.Upgrade {
    /**
     * Creates an upgrade
     * @param name The name of the upgrade
     * @param desc The description of it
     * @param price The price of it
     * @param icon  The icon for it
     * @param buyFunc The function that gets called when you buy the upgrade
     */
    constructor(name: string, desc: string, price: number, icon: Icon, buyFunc?: () => void);
}
export {};
