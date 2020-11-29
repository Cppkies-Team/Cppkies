/**
 * The common type for a value, can be either the value or a function that returns a value with the type.
 */
export declare type CommonValue<T> = T | (() => T);
/**
 * A helper function which converts a common value to a value
 * @param value The common value to convert
 * @helper
 */
export declare function getValue<T>(value: CommonValue<T>): T;
/**
 * A helper function which escapes special regex characters.
 * @param str The string to escape
 * @helper
 */
export declare function escapeRegExp(str: string): string;
/**
 * A helper function which replaces(or appends) code in a function, returning the new function, and it's eval free!
 * @param func The source function
 * @param source What to replace, can be null for slicing
 * @param target What to put instead of (or before/after) the source
 * @param where Where to insert or replace your injection
 * @param context The optional context to use
 * @helper
 */
export declare function injectCode<T extends ((...args: unknown[]) => unknown) | (new (...args: unknown[]) => unknown)>(func: T, source: CommonValue<string> | CommonValue<RegExp> | null, target: CommonValue<string>, where: "before" | "replace" | "after", context?: object): T;
/**
 * Applies all props to an object via mutating
 * @param targObj The object which will be mutated
 * @param srcObj The object which properties will be applied to the target object
 */
export declare function applyAllProps(targObj: object, srcObj: object): void;
/**
 * Converts a string to sentense case, AKA first letter upper, all next lower
 * @param string
 */
export declare function toSentenseCase(string: string): string;
/**
 * A strongly typed `hasOwnProperty`
 * @helper
 */
export declare function hasOwnProperty<X extends object, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown>;
