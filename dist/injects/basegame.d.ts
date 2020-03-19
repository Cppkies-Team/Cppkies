import Game from "../gameType";
declare global {
    interface Window {
        Game: Game;
        Beautify: Function;
    }
}
/**
 * Injects functions for basegame
 * @returns A promise
 */
export declare function main(): Promise<{
    [key: string]: Function[];
}>;
