import master from "./vars"
import { Building } from "./buildings"
import { Upgrade } from "./upgrade"
import { applyAllProps, hasOwnProperty } from "./helpers"
import { Achievement } from "./achievement"
export let save: SaveType = null
const SAVE_VER = 1 as const
/**
 * The save type for Cppkies
 */
export interface SaveType {
	saveVer: typeof SAVE_VER
	mods: Record<string, ModSave>
	foreign: ModSave
}
/**
 * Legacy save types of Cppkies
 */

export type LegacySave = {
	saveVer: 0
	mods: Record<string, never>
	foreign: {
		buildings: Record<string, BuildingSave>
	}
	exists: true
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
		saveVer: SAVE_VER,
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
 * Upgrades the save from a previous version, and assigns it to the save
 */
export function migrateSave(oldSave: LegacySave): void {
	initSave()
	// Fancy upgrade system with fallthroughs
	/* eslint-disable no-fallthrough */
	switch (oldSave.saveVer) {
		case 0:
			// Migrate from 0.1, migrate building
			save.foreign.buildings = oldSave.foreign.buildings
			break
		default:
			throw new Error(
				`Invalid save version ${save.saveVer} (current version is ${SAVE_VER})`
			)
	}
	/* eslint-enable no-fallthrough */
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

export function validateSave(
	newSave: unknown
): newSave is LegacySave | SaveType {
	if (newSave === null) return false
	// Assert type
	if (typeof newSave !== "object") return false
	// Assert save version
	if (
		!hasOwnProperty(newSave, "saveVer") ||
		typeof newSave.saveVer !== "number" ||
		newSave.saveVer > SAVE_VER
	)
		return false
	// 0.1 had an "exists" property, it has been removed since
	if (newSave.saveVer === 0 && !hasOwnProperty(newSave, "exists")) return false
	// Assert mods
	// A typescript bug makes closure types which derive from returns in if's transits wacky
	const newSave_ = newSave
	function validateModSave(
		modSave: unknown
	): modSave is LegacySave["foreign"] | ModSave {
		// Assert type
		if (typeof modSave !== "object") return false
		// Assert buildings
		if (!hasOwnProperty(modSave, "buildings")) return false
		if (typeof modSave.buildings !== "object") return false
		for (const i in modSave.buildings) {
			const building = modSave.buildings[i]
			if (typeof building !== "object") return false
			for (const prop in DEFAULT_BUILDING_SAVE)
				if (typeof DEFAULT_BUILDING_SAVE[prop] !== typeof building[prop])
					return false
		}
		if (newSave_.saveVer >= 1) {
			// Assert upgrades and achievements
			if (!hasOwnProperty(modSave, "upgrades")) return false
			if (typeof modSave.upgrades !== "object") return false
			for (const i in modSave.upgrades) {
				const upgrade = modSave.upgrades[i]
				if (typeof upgrade !== "object") return false
				for (const prop in DEFAULT_UPGRADE_SAVE)
					if (typeof DEFAULT_UPGRADE_SAVE[prop] !== typeof upgrade[prop])
						return false
			}
			if (!hasOwnProperty(modSave, "achievements")) return false
			if (typeof modSave.achievements !== "object") return false
			for (const i in modSave.achievements) {
				const achievement = modSave.achievements[i]
				if (typeof achievement !== "object") return false
				for (const prop in DEFAULT_ACHIEVEMENT_SAVE)
					if (
						typeof DEFAULT_ACHIEVEMENT_SAVE[prop] !== typeof achievement[prop]
					)
						return false
			}
		}
		return true
	}
	// (Add actual mod checking later)
	if (!hasOwnProperty(newSave, "mods")) return false
	if (JSON.stringify(newSave.mods) !== "{}") return false
	// `foreign` check
	if (!hasOwnProperty(newSave, "foreign")) return false
	if (!validateModSave(newSave.foreign)) return false
	return true
}

export function importSave(data: string): void {
	let newSave: unknown
	try {
		newSave = JSON.parse(data)
	} catch {
		if (data !== "")
			console.warn("CPPKIES: Found invalid save, creating new one...")
		initSave()
		newSave = save
	}
	if (!validateSave(newSave)) {
		console.warn("CPPKIES: Found invalid save, creating new one...")
		initSave()
	} else {
		if (newSave.saveVer !== SAVE_VER) {
			console.warn("CPPKIES: Found old save, migrating to a new one...")
			migrateSave(newSave)
		} else {
			master.save = save = newSave
		}
	}

	loadAll()
}

export function exportSave(): string {
	saveAll()
	return JSON.stringify(save)
}
