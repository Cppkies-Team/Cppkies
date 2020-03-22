/**
 * The localStotrage wrapper class
 */
export default class LocalStorageWrapper {
    private name;
    store: Record<string | number, unknown>;
    constructor(name: string);
    updateValues(name: string): void;
    writeValues(): void;
}
