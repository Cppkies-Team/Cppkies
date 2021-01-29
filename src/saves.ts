import { Building } from "./buildings"
import { Upgrade } from "./upgrade"
import { applyAllProps, hasOwnProperty } from "./helpers"
import { Achievement } from "./achievement"
import { customAchievements, customBuildings, customUpgrades } from "./vars"

export const VANILLA_DRAGON_LEVEL_AMOUNT = Game.dragonLevels.length + 0

export const SAVE_VER = 1 as const
/**
 * The save type for Cppkies
 */
export interface SaveType {
	saveVer: typeof SAVE_VER
	mods: Record<string, ModSave>
	foreign: ModSave
	dragon: DragonSave
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
 * The save type for Krumblor
 */
interface DragonSave {
	level: number | "sync"
	auras: [number | "sync", number | "sync"]
}

function createDefaultSaveFragment(name: "building"): BuildingSave
function createDefaultSaveFragment(name: "upgrade"): UpgradeSave
function createDefaultSaveFragment(name: "achievement"): AchievementSave
function createDefaultSaveFragment(name: "dragon"): DragonSave
function createDefaultSaveFragment(name: "mod"): ModSave
function createDefaultSaveFragment(name: string): unknown {
	switch (name) {
		case "mod":
			return { achievements: {}, buildings: {}, upgrades: {} }
		case "dragon":
			return {
				level: "sync",
				auras: ["sync", "sync"],
			}
		case "achievement":
			return { won: false }
		case "upgrade":
			return {
				bought: false,
				unlocked: false,
			}
		case "building":
			return {
				amount: 0,
				bought: 0,
				free: 0,
				totalCookies: 0,
				level: 0,
				muted: 0,
				minigameSave: "",
			}
		default:
			throw new Error("Invalid fragment name!")
	}
}

function createDefaultSave(): SaveType {
	return {
		mods: {},
		foreign: createDefaultSaveFragment("mod"),
		saveVer: SAVE_VER,
		dragon: createDefaultSaveFragment("dragon"),
	}
}

export const save: SaveType = createDefaultSave()

/**
 * Creates a save for Cppkies
 */
export function initSave(): void {
	const newSave = createDefaultSave()
	for (const i in newSave) save[i] = newSave[i]
}
/**
 * Loads the building save data
 * @param building The building to load savedata for
 */
export function loadBuilding(building: Building): BuildingSave {
	//Use names because ID conflicts
	return (
		save.foreign.buildings[building.name] ||
		createDefaultSaveFragment("building")
	)
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
	return (
		save.foreign.upgrades[upgrade.name] || createDefaultSaveFragment("upgrade")
	)
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
	return (
		save.foreign.achievements[upgrade.name] ||
		createDefaultSaveFragment("achievement")
	)
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
export function loadDragon(): void {
	if (
		save.dragon.level !== "sync" &&
		save.dragon.level <= Game.dragonLevels.length - 1
	)
		Game.dragonLevel = save.dragon.level
	if (
		save.dragon.auras[0] !== "sync" &&
		save.dragon.auras[0] <= Object.keys(Game.dragonAuras).length - 1
	)
		Game.dragonAura = save.dragon.auras[0]
	if (
		save.dragon.auras[1] !== "sync" &&
		save.dragon.auras[1] <= Object.keys(Game.dragonAuras).length - 1
	)
		Game.dragonAura2 = save.dragon.auras[1]
}

/**
 * Loads everything
 */
export function loadAll(): void {
	for (const building of customBuildings)
		applyAllProps(building, loadBuilding(building))

	for (const upgrade of customUpgrades) {
		applyAllProps(upgrade, loadUpgrade(upgrade))
		if (upgrade.bought && Game.CountsAsUpgradeOwned(upgrade.pool))
			Game.UpgradesOwned++
	}

	for (const achievement of customAchievements) {
		applyAllProps(achievement, loadAchievement(achievement))
		if (achievement.won && Game.CountsAsAchievementOwned(achievement.pool))
			Game.AchievementsOwned++
	}

	loadDragon()
}
/**
 * Saves everything
 */
export function saveAll(): void {
	for (const building of customBuildings) saveBuilding(building)
	for (const upgrade of customUpgrades) saveUpgrade(upgrade)
	for (const achievement of customAchievements) saveAchievement(achievement)
	// Saving the dragon is in `injects/postInject.ts` due to no mod support
}

export function applySave(newSave: unknown): SaveType {
	const virtualSave = createDefaultSave()
	// Assert type
	if (typeof newSave !== "object" || newSave === null) return virtualSave
	// Assert save version
	if (
		!hasOwnProperty(newSave, "saveVer") ||
		typeof newSave.saveVer !== "number" ||
		newSave.saveVer > SAVE_VER
	)
		return virtualSave

	// Assert mods
	function applyModSave(modSave: unknown): ModSave {
		const virtualModSave = createDefaultSaveFragment("mod")
		// Assert type
		if (typeof modSave !== "object" || modSave === null) return virtualModSave
		// Assert buildings
		if (
			hasOwnProperty(modSave, "buildings") &&
			typeof modSave.buildings === "object" &&
			modSave.buildings !== null
		)
			for (const buildingName in modSave.buildings) {
				const building = modSave.buildings[buildingName]
				if (typeof building !== "object" || building === null) continue
				virtualModSave.buildings[buildingName] = createDefaultSaveFragment(
					"building"
				)
				for (const prop in building)
					if (
						typeof virtualModSave.buildings[buildingName][prop] ===
						typeof building[prop]
					)
						virtualModSave.buildings[buildingName][prop] = building[prop]
			}

		// Assert upgrades and achievements
		if (
			hasOwnProperty(modSave, "upgrades") &&
			typeof modSave.upgrades === "object" &&
			modSave.upgrades !== null
		)
			for (const upgradeName in modSave.upgrades) {
				const upgrade = modSave.upgrades[upgradeName]
				if (typeof upgrade !== "object" || upgrade === null) continue
				virtualModSave.upgrades[upgradeName] = createDefaultSaveFragment(
					"upgrade"
				)
				for (const prop in virtualModSave.upgrades[upgradeName])
					if (
						typeof virtualModSave.upgrades[upgradeName][prop] ===
						typeof upgrade[prop]
					)
						virtualModSave.upgrades[upgradeName][prop] = upgrade[prop]
			}

		if (
			hasOwnProperty(modSave, "achievements") &&
			typeof modSave.achievements === "object" &&
			modSave.achievements !== null
		)
			for (const achievementName in modSave.achievements) {
				const achievement = modSave.achievements[achievementName]
				if (typeof achievement !== "object" || achievement === null) continue
				virtualModSave.achievements[
					achievementName
				] = createDefaultSaveFragment("achievement")
				for (const prop in virtualModSave.achievements[achievementName])
					if (
						typeof virtualModSave.achievements[achievementName][prop] ===
						typeof achievement[prop]
					)
						virtualModSave.achievements[achievementName][prop] =
							achievement[prop]
			}

		return virtualModSave
	}

	// `foreign` check
	if (!hasOwnProperty(newSave, "foreign"))
		virtualSave.foreign = createDefaultSaveFragment("mod")
	else virtualSave.foreign = applyModSave(newSave.foreign)
	// Dragon
	if (
		hasOwnProperty(newSave, "dragon") &&
		typeof newSave.dragon === "object" &&
		newSave.dragon !== null
	) {
		if (
			hasOwnProperty(newSave.dragon, "level") &&
			(typeof newSave.dragon.level === "number" ||
				newSave.dragon.level === "sync")
		)
			virtualSave.dragon.level = newSave.dragon.level
		if (
			hasOwnProperty(newSave.dragon, "auras") &&
			newSave.dragon.auras instanceof Array
		) {
			for (const i in newSave.dragon.auras) {
				const aura = newSave.dragon.auras[i]
				if (typeof aura === "number" || aura === "sync")
					virtualSave.dragon.auras[i] = aura
			}
		}
	}
	return virtualSave
}

export function importSave(data: string): void {
	let newSave: unknown
	try {
		newSave = JSON.parse(data)
	} catch {
		if (data !== "" && data !== "{}")
			console.warn("CPPKIES: Found invalid save, creating new one...")
		initSave()
	}
	const computedSave = applySave(newSave)
	for (const i in computedSave) save[i] = computedSave[i]
	loadAll()
}

export function exportSave(): string {
	saveAll()
	return JSON.stringify(save)
}
