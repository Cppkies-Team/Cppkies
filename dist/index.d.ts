import { injectCode } from "./helpers";
import GameType, { Cppkies as CppkiesType } from "./gameType";
declare global {
    interface Window {
        Game: GameType;
        Cppkies: CppkiesType | undefined;
    }
}
declare const master: {
    hooks: {
        [key: string]: Function[];
    };
    injectCode: typeof injectCode;
};
export default master;
