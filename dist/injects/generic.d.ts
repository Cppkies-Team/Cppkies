export declare class Injection {
    value: string;
    func?: (() => void) | undefined;
    constructor(value: string, func?: (() => void) | undefined);
}
