import Game, { Cppkies } from "./gameType";
declare global {
    interface Window {
        Game: Game;
        Cppkies: Cppkies;
        Beautify: Function;
    }
}
export declare function main(): {
    [key: string]: Function[];
};
