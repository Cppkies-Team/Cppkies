/// <reference types="cookieclicker" />
/**
 * Currently defined alias
 */
export declare const aliases: Record<string, string>;
/**
 * Creates an alias from an old name to a new one
 * @param oldName The current name
 * @param aliasName The new, alias name
 */
export declare function alias(oldName: string, aliasName: string): void;
/**
 * Deletes an alias from the name
 * @param name The name to remove an alias from
 */
export declare function unalias(name: string): void;
/**
 * Resolves an aliased name
 * @param name The name to be resolved
 */
export declare function resolveAlias(name: string): string;
/**
 * A universal version of Icon which is not restricted to CC
 */
export declare type UniversalIcon = [number, number];
/**
 * Relocates the icons for a column and automatically aliases it
 * @param link The link to the original, unordered iconsheet
 * @param matrix The matrix of the names of the icon tiers
 * Valid tier names are:
 * * Tier ids: `1`, `5`, `7`, etc.
 * * Tier names: `"jetmint"`, `"plain"`, etc.
 * * Non-standard tier icon tiers: `"3d"`, `"milestone1"`, `"milestone2"`, `"milestone3"`, `"krumblor"`, `"level1"`, `"level2"`
 * @param offset The icon X to offset the column
 * @param followAlias If true, the original image URI will be de-aliased (`relinkColumn`, `relinkRow` and `patchIconsheet` create an alias!)
 */
export declare function relinkColumn(link: string, matrix: string[] | string[][], offset?: number, followAlias?: boolean): Promise<void>;
/**
 * Relocates the icons for a row and automatically aliases it
 * @param link The link to the original, unordered iconsheet
 * @param matrix The matrix of the names of the icon types
 * Valid tier types are:
 * * Building ids: `1, `5`, `7`, etc.
 * * Building names: `"cursor"`, `"farm"`, etc.
 * * Non-standard tier icon tiers: `"research"`, `"cookie"`, `"mouse"`, `"multicursor"`, `"kitten"`
 * @param offset The icon X to offset the column
 * @param followAlias If true, the original image URI will be de-aliased (`relinkColumn`, `relinkRow` and `patchIconsheet` create an alias!)
 */
export declare function relinkRow(link: string, matrix: string[] | string[][], offset?: number, followAlias?: boolean): Promise<void>;
/**
 * Patches an iconsheet with replacements
 * @param link The link to the original, unpatched iconsheet
 * @param replacements The replacements to make, first element in tuple is the original position,
 * second is the icon to replace with
 * @param followAlias If true, the original image URI will be de-aliased (`relinkColumn`, `relinkRow` and `patchIconsheet` create an alias!)
 */
export declare function patchIconsheet(link: string, replacements: [UniversalIcon, Game.Icon][], followAlias?: boolean): Promise<void>;
