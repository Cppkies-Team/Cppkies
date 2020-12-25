import master from "./vars";
declare let CppkiesExport: typeof master;
declare global {
    interface Window {
        Cppkies: typeof master | undefined;
        CPPKIES_ONLOAD: (() => void)[] | undefined;
    }
}
export default CppkiesExport;
