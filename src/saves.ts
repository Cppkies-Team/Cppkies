import master from "./vars"
import { Building } from "./buildings"
import { Upgrade } from "./upgrade"
import { applyAllProps } from "./helpers"
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
export const DEFAULT_MOD_SAVE: ModSave = {
	buildings: {},
	upgrades: {},
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
 * Loads everything
 * (Doesn't get called on Game.Load since Cppkies save isn't saved in the normal one)
 */
export function loadAll(): void {
	for (const i in master.customBuildings) {
		const me = master.customBuildings[i]
		applyAllProps(Game.Objects[me.name], loadBuilding(me))
	}
	for (const i in master.customUpgrades) {
		const me = master.customUpgrades[i]
		applyAllProps(Game.Upgrades[me.name], loadUpgrade(me))
	}
}
/**
 * Saves everything
 */
export function saveAll(): void {
	for (const i in master.customBuildings)
		saveBuilding(master.customBuildings[i])
	for (const i in master.customUpgrades) saveUpgrade(master.customUpgrades[i])
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
