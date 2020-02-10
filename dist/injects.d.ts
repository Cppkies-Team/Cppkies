import Game, { Cppkies } from "./gameType";
declare global {
    interface Window {
        Game: Game;
        Cppkies: Cppkies;
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
