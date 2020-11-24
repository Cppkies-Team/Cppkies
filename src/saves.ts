import master from "./vars"
import { Building } from "./buildings"
import { Upgrade } from "./upgrade"
import { applyAllProps } from "./helpers"
import { Achievement, customAchievements } from "./achievement"
export let save: SaveType = null
/**
 * The save type for Cppkies
 */
export interface SaveType {
	saveVer: number
	mods: Record<string, ModSave>
	foreign: ModSave
	exists: boolean
}
/**
 * The save type for a mod
 */
export interface ModSave {
	buildings: Record<string, BuildingSave>
	upgrades: Record<string, UpgradeSave>
	achievements: Record<string, AchievementSave>
}
/**
 * The save type for a building
 */
export interface BuildingSave {
	amount: number
	bought: number
	free: number
	totalCookies: number
	level: number
	muted: number
	minigameSave: string
}
/**
 * The save type for an upgrade
 */
export interface UpgradeSave {
	unlocked: boolean
	bought: boolean
}
/**
 * The save type for an achievement
 */
export interface AchievementSave {
	won: boolean
}
/**
 * The default save file for buildings
 */
export const DEFAULT_BUILDING_SAVE: BuildingSave = {
	amount: 0,
	bought: 0,
	free: 0,
	totalCookies: 0,
	level: 0,
	muted: 0,
	minigameSave: "",
}
/**
 * The default save for an upgrade
 */
export const DEFAULT_UPGRADE_SAVE: UpgradeSave = {
	bought: false,
	unlocked: false,
}
/**
 * The default save for an achievement
 */
export const DEFAULT_ACHIEVEMENT_SAVE: AchievementSave = {
	won: false,
}
export const DEFAULT_MOD_SAVE: ModSave = {
	buildings: {},
	upgrades: {},
	achievements: {},
}
/**
 * Creates a save for Cppkies
 */
export function initSave(): void {
	master.save = save = {
		mods: {},
		foreign: DEFAULT_MOD_SAVE,
		saveVer: 0,
		exists: true,
	}
}
/**
 * Loads the building save data
 * @param building The building to load savedata for
 */
export function loadBuilding(building: Building): BuildingSave {
	//Use names because ID conflicts
	return save.foreign.buildings[building.name] || DEFAULT_BUILDING_SAVE
}
/**
 * Saves a building
 * @param building The building to save
 */
export function saveBuilding({
	amount,
	bought,
	free,
	totalCookies,
	level,
	muted,
	minigameSave,
	name,
}: Building): void {
	save.foreign.buildings[name] = {
		amount,
		bought,
		free,
		totalCookies,
		level,
		muted,
		minigameSave,
	}
}
/**
 * Loads an upgrade
 * @param upgrade The upgrade to load
 */
export function loadUpgrade(upgrade: Upgrade): UpgradeSave {
	return save.foreign.upgrades[upgrade.name] || DEFAULT_UPGRADE_SAVE
}
/**
 * Saves an upgrade
 * @param upgrade The upgrade to save
 */
export function saveUpgrade(upgrade: Upgrade): void {
	save.foreign.upgrades[upgrade.name] = {
		unlocked: !!upgrade.unlocked,
		bought: !!upgrade.bought,
	}
}

/**
 * Loads an achievement
 * @param upgrade The achievement to load
 */
export function loadAchievement(upgrade: Achievement): AchievementSave {
	return save.foreign.achievements[upgrade.name] || DEFAULT_ACHIEVEMENT_SAVE
}
/**
 * Saves an achievement
 * @param upgrade The achievement to save
 */
export function saveAchievement(upgrade: Achievement): void {
	save.foreign.achievements[upgrade.name] = {
		won: !!upgrade.won,
	}
}
/**
 * Loads everything
 */
export function loadAll(): void {
	for (const building of master.customBuildings) {
		applyAllProps(building, loadBuilding(building))
	}
	for (const upgrade of master.customUpgrades) {
		applyAllProps(upgrade, loadUpgrade(upgrade))
	}
	for (const achievement of master.customAchievements) {
		applyAllProps(achievement, loadAchievement(achievement))
	}
}
/**
 * Saves everything
 */
export function saveAll(): void {
	for (const building of master.customBuildings) saveBuilding(building)
	for (const upgrade of master.customUpgrades) saveUpgrade(upgrade)
	for (const achievement of master.customAchievements)
		saveAchievement(achievement)
}

export function importSave(data: string): void {
	try {
		master.save = save = JSON.parse(data)
		if (!save.exists) initSave()
	} catch {
		initSave()
	}
	loadAll()
}

export function exportSave(): string {
	saveAll()
	return JSON.stringify(save)
}
