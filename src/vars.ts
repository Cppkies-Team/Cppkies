import { type Achievement } from "./achievements"
import type Tier from "./tiers"
import { type Upgrade } from "./upgrades"
import { type Building } from "./buildings"
import { type Mod, OwnershipUnit } from "./mods"

import { Hooks } from "./injects/basegame"
import {
	type buildingHooks,
	type createBuildingHooks,
} from "./injects/buildings"
import { GardenHooks } from "./injects/garden"
import { GrimoireHooks } from "./injects/grimoire"
import { PatheonHooks } from "./injects/pantheon"
import { type SavePartition } from "./saves"

interface CppkiesInternals {
	isFirstLoad: boolean
	basegame?: Hooks
	minigames?: {
		garden?: GardenHooks
		grimoire?: GrimoireHooks
		pantheon?: PatheonHooks
	}
	buildings?: typeof buildingHooks
	hiddenMilkMult: number
	createBuildingHooks?: typeof createBuildingHooks
	injectedHooks: Set<string>
	injectedBuildingHooks: Record<string, Set<string>>
	savePartitions: Partial<Record<string, SavePartition>>
	customBuildings: Building[]
	customAchievements: Achievement[]
	customUpgrades: Upgrade[]
	customTiers: Tier[]
	mods: Mod[]
}

declare global {
	// eslint-disable-next-line no-var
	var __INTERNAL_CPPKIES__: CppkiesInternals
}

export const isFirstCppkies = !window.__INTERNAL_CPPKIES__

if (isFirstCppkies)
	window.__INTERNAL_CPPKIES__ = {
		hiddenMilkMult: 1,
		minigames: {},
		injectedHooks: new Set(),
		injectedBuildingHooks: {},
		isFirstLoad: true,
		savePartitions: {},
		customAchievements: [],
		customBuildings: [],
		customTiers: [],
		customUpgrades: [],
		mods: [],
	}

export const miscValues = {
	cookieOrder: 121212,
	iconLink: "",
	buildingLink: "",
}

export const customBuildings = __INTERNAL_CPPKIES__.customBuildings

export const customAchievements = __INTERNAL_CPPKIES__.customAchievements

export const customUpgrades = __INTERNAL_CPPKIES__.customUpgrades

export const customTiers = __INTERNAL_CPPKIES__.customTiers

export const mods = __INTERNAL_CPPKIES__.mods

export let currentMod: Mod | null = null

export function setCurrentMod(mod: Mod | null): void {
	currentMod = mod
}

export function setUnitOwner(unit: OwnershipUnit): void {
	if (currentMod) {
		unit.owner = currentMod
		currentMod.ownedUnits.push(unit)
	}
}
