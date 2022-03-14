import { Hooks } from "./injects/basegame"
import { buildingHooks, createBuildingHooks } from "./injects/buildings"
import { GardenHooks } from "./injects/garden"
import { GrimoireHooks } from "./injects/grimoire"
import { PatheonHooks } from "./injects/pantheon"
import { SavePartition } from "./saves"

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
