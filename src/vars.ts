import { Achievement } from "./achievements"
import Tier from "./tiers"
import { Upgrade } from "./upgrades"
import { Building } from "./buildings"
import { Mod, OwnershipUnit } from "./mods"

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
