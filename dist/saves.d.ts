import { Building } from "./buildings";
import { Upgrade } from "./upgrade";
import { Achievement } from "./achievement";
export declare const VANILLA_DRAGON_LEVEL_AMOUNT: number;
export declare const SAVE_VER: 1;
/**
 * The save type for Cppkies
 */
export interface SaveType {
    saveVer: typeof SAVE_VER;
    mods: Record<string, ModSave>;
    foreign: ModSave;
    dragon: DragonSave;
}
/**
 * Legacy save types of Cppkies
 */
export declare type LegacySave = {
    saveVer: 0;
    mods: Record<string, never>;
    foreign: {
        buildings: Record<string, BuildingSave>;
    };
    exists: true;
};
/**
 * The save type for a mod
 */
export interface ModSave {
    buildings: Record<string, BuildingSave>;
    upgrades: Record<string, UpgradeSave>;
    achievements: Record<string, AchievementSave>;
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
 * The save type for an achievement
 */
export interface AchievementSave {
    won: boolean;
}
/**
 * The save type for Krumblor
 */
interface DragonSave {
    level: number | "sync";
    auras: [number | "sync", number | "sync"];
}
export declare let save: SaveType;
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
 * Loads an achievement
 * @param upgrade The achievement to load
 */
export declare function loadAchievement(upgrade: Achievement): AchievementSave;
/**
 * Saves an achievement
 * @param upgrade The achievement to save
 */
export declare function saveAchievement(upgrade: Achievement): void;
export declare function loadDragon(): void;
/**
 * Loads everything
 */
export declare function loadAll(): void;
/**
 * Saves everything
 */
export declare function saveAll(): void;
export declare function applySave(newSave: unknown): SaveType;
export declare function importSave(data: string): void;
export declare function exportSave(): string;
export {};
