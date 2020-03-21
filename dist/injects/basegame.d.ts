import Game from "../gameType";
declare global {
    interface Window {
        Game: Game;
        Beautify: Function;
    }
}
/**
 * Creates the function hooks for base game
 * @returns A promise
 */
export declare function main(): Promise<{
    [key: string]: Function[];
}>;
