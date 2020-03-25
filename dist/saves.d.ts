import { Building } from "./buildings";
import { Upgrade } from "./upgrade";
/**
 * The save type for Cppkies
 */
export interface SaveType {
    saveVer: number;
    mods: Record<string, ModSave>;
    foreign: ModSave;
    exists: boolean;
}
/**
 * The save type for a mod
 */
export interface ModSave {
    buildings: Record<string, BuildingSave>;
    upgrades: Record<string, UpgradeSave>;
}
/**
 * The save type for a building
 */
export interface BuildingSave {
    amount: number;
    bought: number;
    free: number;
    totalCookies: number;
    level: number;
    muted: number;
    minigameSave: string;
}
/**
 * The save type for an upgrade
 */
export interface UpgradeSave {
    unlocked: boolean;
    bought: boolean;
}
/**
 * The default save file for buildings
 */
export declare const DEFAULT_BUILDING_SAVE: BuildingSave;
/**
 * The default save for an upgrade
 */
export declare const DEFAULT_UPGRADE_SAVE: UpgradeSave;
export declare const DEFAULT_MOD_SAVE: ModSave;
/**
 * Creates a save for Cppkies
 */
export declare function initSave(): void;
/**
 * Loads the building save data
 * @param building The building to load savedata for
 */
export declare function loadBuilding(building: Building): BuildingSave;
/**
 * Saves a building
 * @param building The building to save
 */
export declare function saveBuilding({ amount, bought, free, totalCookies, level, muted, minigameSave, name, }: Building): void;
/**
 * Loads an upgrade
 * @param upgrade The upgrade to load
 */
export declare function loadUpgrade(upgrade: Upgrade): UpgradeSave;
/**
 * Saves an upgrade
 * @param upgrade The upgrade to save
 */
export declare function saveUpgrade(upgrade: Upgrade): void;
/**
 * Loads everything
 * (Doesn't get called on Game.Load since Cppkies save isn't saved in the normal one)
 */
export declare function loadAll(): void;
/**
 * Saves everything
 */
export declare function saveAll(): void;
