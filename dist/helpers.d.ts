/**
 * The common type for a string, can be either a string or a function that returns a string
 */
export declare type CommonString = string | (() => string);
/**
 * A helper function which converts a common string to a string.
 * @param value The common string to convert
 * @helper
 */
export declare function getValue(value: CommonString): string;
/**
 * A helper function which escapes special regex characters.
 * @param str The string to escape
 * @helper
 */
export declare function escapeRegExp(str: string): string;
/**
 * A helper function which replaces(or appends) code in a function, returning the new function, and it's eval free!
 * @param func The source function
 * @param source What to replace(or act as a anchor where to plane), can be null for slicing
 * @param target What to put instead(or before/after) the source
 * @param where Where to insert or replace your injection
 * @helper
 */
export declare function injectCode(func: Function, source: CommonString | null, target: CommonString, where: "before" | "replace" | "after"): Function;
