import gameType, { Cppkies as CppkiesType } from "./gameType";
declare global {
    interface Window {
        Game: gameType;
        Cppkies: CppkiesType;
    }
}
declare const master: CppkiesType;
export default master;
