/**
 * The localStotrage wrapper class
 */
export default class LocalStorageWrapper {
    private name;
    store: Record<string | number, unknown>;
    /**
     * The wrapper class for localStorage
     * @param name The name of the key
     */
    constructor(name: string);
    /**
     * Reads the values from the name
     * @param name The key to read from
     */
    updateValues(name: string): void;
    /**
     * Writes store to localstorage
     */
    writeValues(): void;
}
