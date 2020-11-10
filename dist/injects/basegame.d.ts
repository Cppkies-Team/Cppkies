/// <reference types="cookieclicker" />
export interface Hooks {
    /**
     * Allows you to add entries to all menus
     */
    customMenu: (() => void)[];
    /**
     * Allows you to add entries to the options menu
     */
    customOptionsMenu: (() => void)[];
    /**
     * Allows you to add entries to the stats menu
     */
    customStatsMenu: (() => void)[];
    /**
     * Allows you to add entries to the info menu
     */
    customInfoMenu: (() => void)[];
    /**
     * Allows you to execute a function on data load, useful for custom data loading
     */
    customLoad: (() => void)[];
    /**
     * Allows you to execute a function on data load, useful for custom data resetting
     * @param hard whether or not this is a hard reset
     */
    customReset: ((hard: boolean) => void)[];
    /**
     * Overrides for icons gotten from GetIcon
     * @param type The type of icon, either a building name or "Kitten"
     * @param tier The tier of the icon, gotten from Tier.iconRow
     * @param icon The current icon
     * @returns An icon
     */
    customGetIcon: ((type: string, tier: string | number, icon: Game.Icon) => Game.Icon)[];
    /**
     * Called after BuildStore, used internally
     */
    postBuildStore: (() => void)[];
    /**
     * Adds grandma options, must return a truthy value to be considered an image
     * @returns A link to an image, or a falsy value
     */
    customGrandmaPic: (() => string | null)[];
}
/**
 * Creates the function hooks for base game
 * @returns A promise
 */
export declare function main(): Promise<Hooks>;
