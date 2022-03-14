import { type Achievement } from "./achievements"
import type Tier from "./tiers"
import { type Upgrade } from "./upgrades"
import { type Building } from "./buildings"
import { type Mod, OwnershipUnit } from "./mods"

export const miscValues = {
	cookieOrder: 121212,
	iconLink: "",
	buildingLink: "",
}

export const customBuildings: Building[] = []

export const customAchievements: Achievement[] = []

export const customUpgrades: Upgrade[] = []

export const customTiers: Tier[] = []

export const mods: Mod[] = []

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
}

declare global {
	var __INTERNAL_CPPKIES__: CppkiesInternals
}
