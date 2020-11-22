/**
 * A small implementation of node's EventEmitter with return value support
 */
declare type EventList<T> = {
    [P in keyof T]: ((src: T[P]) => T[P])[];
};
export declare class ReturnableEventEmitter<T extends {
    [key: string]: unknown;
}> {
    _events: EventList<T>;
    /**
     * Registers an event listener which is called each time the event is emitted
     * @param name Name of the hook
     * @param func The event listener function
     */
    on<N extends keyof T>(name: N, func: (src: T[N]) => T[N]): void;
    /**
     * Registers an event listener which is called for the first time the event is emitted
     * @param name Name of the hook
     * @param func The event listener function
     */
    once<N extends keyof T>(name: N, func: (src: T[N]) => T[N]): void;
    /**
     * Removes an event listener which was registered before
     * @param name Name of the hook
     * @param func The event listener function
     */
    off<N extends keyof T>(name: N, func: (src: T[N]) => T[N]): void;
    /**
     * Emits the event, triggering all registered event listeners under the event name and modifying the given value
     * @param name The name of the event
     * @param startingValue The starting value for the listeners
     */
    emit<N extends keyof T>(name: N, ...startingValue: T[N] extends void ? [undefined?] : [T[N]]): T[N];
    /**
     * Emits the event, triggering all registered event listeners under the event name and *not* modifying the given value
     * @param name The name of the event
     * @param startingValue The starting value for the listeners
     */
    constEmit<N extends keyof T>(name: N, ...startingValue: T[N] extends void ? [undefined?] : [T[N]]): void;
}
export {};
