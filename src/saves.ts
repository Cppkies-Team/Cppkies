import { Building } from "./buildings"
import { Upgrade } from "./upgrades"
import { applyAllProps, hasOwnProperty } from "./helpers"
import { Achievement } from "./achievements"
import {
	customAchievements,
	customBuildings,
	customUpgrades,
	mods,
} from "./vars"
import { Mod } from "./mods"
import { compressToUTF16, decompressFromUTF16 } from "./lib/lz-string"

export const VANILLA_DRAGON_LEVEL_AMOUNT = Game.dragonLevels.length + 0

export const SAVE_VER = 3 as const

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SpecififcMinigameSaves {}

/**
 * Called when loading a Cppkies save, used internally for treeshakable saving
 */
export const customLoad: (() => void)[] = []

/**
 * The save type for Cppkies
 */
export interface SaveType {
	saveVer: typeof SAVE_VER
	mods: Record<string, ModSave>
	foreign: ModSave
	dragon: DragonSave
	minigames?: SpecififcMinigameSaves & Record<string, object>
}

function createDefaultSaveFragment(name: "building"): BuildingSave
function createDefaultSaveFragment(name: "upgrade"): UpgradeSave
function createDefaultSaveFragment(name: "achievement"): AchievementSave
function createDefaultSaveFragment(name: "dragon"): DragonSave
function createDefaultSaveFragment(name: "mod"): ModSave
function createDefaultSaveFragment(name: string): unknown {
	switch (name) {
		case "mod":
			return {
				custom: null,
			}
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
	applyAllProps(save, newSave)
}

// #region Building

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
	owner,
}: Building): void {
	if (owner) {
		const buildingsObject = save.mods[owner.keyname].buildings
		if (!buildingsObject)
			save.mods[owner.keyname].buildings = {
				[name]: {
					amount,
					bought,
					free,
					totalCookies,
					level,
					muted,
					minigameSave,
				},
			}
		else
			buildingsObject[name] = {
				amount,
				bought,
				free,
				totalCookies,
				level,
				muted,
				minigameSave,
			}
	} else {
		if (!save.foreign.buildings) save.foreign.buildings = {}
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
}

/**
 * Loads the building save data
 * @param building The building to load savedata for
 */
export function loadBuilding(building: Building): BuildingSave {
	//Use names because ID conflicts
	return (
		(building.owner ? save.mods[building.owner.keyname] : save.foreign)
			?.buildings?.[building.name] || createDefaultSaveFragment("building")
	)
}

//#endregion

// #region Upgrade

/**
 * The save type for an upgrade
 */
export interface UpgradeSave {
	unlocked: boolean
	bought: boolean
}

/**
 * Saves an upgrade
 * @param upgrade The upgrade to save
 */
export function saveUpgrade(upgrade: Upgrade): void {
	if (upgrade.owner) {
		const upgradesObject = save.mods[upgrade.owner.keyname].upgrades
		if (!upgradesObject)
			save.mods[upgrade.owner.keyname].upgrades = {
				[upgrade.name]: {
					unlocked: !!upgrade.unlocked,
					bought: !!upgrade.bought,
				},
			}
		else
			upgradesObject[upgrade.name] = {
				unlocked: !!upgrade.unlocked,
				bought: !!upgrade.bought,
			}
	} else {
		if (!save.foreign.upgrades) save.foreign.upgrades = {}
		save.foreign.upgrades[upgrade.name] = {
			unlocked: !!upgrade.unlocked,
			bought: !!upgrade.bought,
		}
	}
}

/**
 * Loads an upgrade
 * @param upgrade The upgrade to load
 */
export function loadUpgrade(upgrade: Upgrade): UpgradeSave {
	return (
		(upgrade.owner ? save.mods[upgrade.owner.keyname] : save.foreign)
			?.upgrades?.[upgrade.name] || createDefaultSaveFragment("upgrade")
	)
}

//#endregion

// #region Achievement

/**
 * The save type for an achievement
 */
export interface AchievementSave {
	won: boolean
}

/**
 * Saves an achievement
 * @param upgrade The achievement to save
 */
export function saveAchievement(upgrade: Achievement): void {
	if (upgrade.owner) {
		const upgradesObject = save.mods[upgrade.owner.keyname].achievements
		if (!upgradesObject)
			save.mods[upgrade.owner.keyname].achievements = {
				[upgrade.name]: {
					won: !!upgrade.won,
				},
			}
		else
			upgradesObject[upgrade.name] = {
				won: !!upgrade.won,
			}
	} else {
		if (!save.foreign.achievements) save.foreign.achievements = {}
		save.foreign.achievements[upgrade.name] = {
			won: !!upgrade.won,
		}
	}
}

/**
 * Loads an achievement
 * @param upgrade The achievement to load
 */
export function loadAchievement(upgrade: Achievement): AchievementSave {
	return (
		(upgrade.owner ? save.mods[upgrade.owner.keyname] : save.foreign)
			?.achievements?.[upgrade.name] || createDefaultSaveFragment("achievement")
	)
}

// #endregion

// #region Dragon

/**
 * The save type for Krumblor
 */
interface DragonSave {
	level: number | "sync"
	auras: [number | "sync", number | "sync"]
}

//#endregion

// #region Mod
/**
 * The save type for a mod
 */
export interface ModSave {
	buildings?: Record<string, BuildingSave>
	upgrades?: Record<string, UpgradeSave>
	achievements?: Record<string, AchievementSave>
	ui?: Record<string, unknown>
	custom: object | null
}

export function saveMod(mod: Mod): void {
	if (!save.mods[mod.keyname])
		save.mods[mod.keyname] = {
			custom: mod.custom,
		}
	else save.mods[mod.keyname].custom = mod.custom

	for (const ui of mod.toggles)
		if (ui.save) {
			const modUI = save.mods[mod.keyname].ui
			if (!modUI) save.mods[mod.keyname].ui = {}
			else modUI[ui.keyname] = ui.save()
		}
}

export function loadMod(mod: Mod): ModSave {
	return save.mods[mod.keyname] || createDefaultSaveFragment("mod")
}

export function applyModSave(mod: Mod, modSave: ModSave): void {
	mod.custom = modSave.custom
	if (modSave.ui)
		for (const ui of mod.toggles)
			if (ui.load && hasOwnProperty(modSave.ui, ui.keyname))
				ui.load(modSave.ui[ui.keyname])
}

// #endregion

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

	for (const mod of mods) applyModSave(mod, loadMod(mod))

	for (const customFunc of customLoad) customFunc()
}
/**
 * Saves everything
 */
export function saveAll(): void {
	for (const mod of mods) saveMod(mod)
	for (const building of customBuildings) saveBuilding(building)
	for (const upgrade of customUpgrades) saveUpgrade(upgrade)
	for (const achievement of customAchievements) saveAchievement(achievement)
	// Saving the dragon is in dragon.ts
}

function assume<T>(val: unknown): val is T {
	return true
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

	// Create mods
	function applyModSave(modSave: unknown): ModSave {
		const virtualModSave = createDefaultSaveFragment("mod")

		// Assert type
		if (typeof modSave !== "object" || modSave === null) return virtualModSave
		// Assert buildings
		if (
			hasOwnProperty(modSave, "buildings") &&
			typeof modSave.buildings === "object" &&
			modSave.buildings !== null &&
			assume<Record<string, unknown>>(modSave.buildings)
		) {
			virtualModSave.buildings = {}
			for (const buildingName in modSave.buildings) {
				const building = modSave.buildings[buildingName] as object
				if (typeof building !== "object" || building === null) continue
				virtualModSave.buildings[buildingName] = createDefaultSaveFragment(
					"building"
				)
				applyAllProps(virtualModSave.buildings[buildingName], building)
			}
		}
		// Assert upgrades and achievements
		if (
			hasOwnProperty(modSave, "upgrades") &&
			typeof modSave.upgrades === "object" &&
			modSave.upgrades !== null &&
			assume<Record<string, unknown>>(modSave.upgrades)
		) {
			virtualModSave.upgrades = {}
			for (const upgradeName in modSave.upgrades) {
				const upgrade = modSave.upgrades[upgradeName]
				if (typeof upgrade !== "object" || upgrade === null) continue
				virtualModSave.upgrades[upgradeName] = createDefaultSaveFragment(
					"upgrade"
				)
				applyAllProps(virtualModSave.upgrades[upgradeName], upgrade)
			}
		}
		if (
			hasOwnProperty(modSave, "achievements") &&
			typeof modSave.achievements === "object" &&
			modSave.achievements !== null &&
			assume<Record<string, unknown>>(modSave.achievements)
		) {
			virtualModSave.achievements = {}
			for (const achievementName in modSave.achievements) {
				const achievement = modSave.achievements[achievementName]
				if (typeof achievement !== "object" || achievement === null) continue
				virtualModSave.achievements[
					achievementName
				] = createDefaultSaveFragment("achievement")
				applyAllProps(virtualModSave.achievements[achievementName], achievement)
			}
		}

		if (
			hasOwnProperty(modSave, "ui") &&
			typeof modSave.ui === "object" &&
			modSave.ui !== null &&
			assume<Record<string, unknown>>(modSave.ui)
		) {
			virtualModSave.ui = {}
			for (const uiName in modSave.ui)
				virtualModSave.ui[uiName] = modSave.ui[uiName]
		}

		if (hasOwnProperty(modSave, "custom") && typeof modSave.custom === "object")
			virtualModSave.custom = modSave.custom

		return virtualModSave
	}

	// `foreign` check
	if (!hasOwnProperty(newSave, "foreign"))
		virtualSave.foreign = createDefaultSaveFragment("mod")
	else virtualSave.foreign = applyModSave(newSave.foreign)
	if (
		hasOwnProperty(newSave, "mods") &&
		typeof newSave.mods === "object" &&
		newSave.mods !== null &&
		assume<Record<string, unknown>>(newSave.mods)
	)
		for (const modName in newSave.mods)
			virtualSave.mods[modName] = applyModSave(newSave.mods[modName])

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
	if (
		hasOwnProperty(newSave, "minigames") &&
		typeof newSave.minigames === "object" &&
		newSave.minigames !== null &&
		assume<Record<string, unknown>>(newSave.minigames)
	) {
		virtualSave.minigames = {}
		for (const minigameName in newSave.minigames) {
			const minigame = newSave.minigames[minigameName]
			if (typeof minigame === "object" && minigame !== null)
				virtualSave.minigames[minigameName] = minigame
		}
	}
	return virtualSave
}

export function importSave(data: string): void {
	let newSave: unknown
	if (data === "" || data === "{}") initSave()
	else
		try {
			let decompressedData = decompressFromUTF16(data)
			// If it's invalid LZ-string, try raw string
			if (!decompressedData) decompressedData = data
			newSave = JSON.parse(decompressedData)
		} catch (err) {
			console.warn("CPPKIES: Found invalid save, creating new one...")
			console.error(err)
			initSave()
		}

	const computedSave = applySave(newSave)
	applyAllProps(save, computedSave)
	loadAll()
}

export function exportSave(): string {
	saveAll()
	return compressToUTF16(JSON.stringify(save))
}
