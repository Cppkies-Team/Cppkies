import { Injection } from "./generic"
import { injectCode } from "../helpers"
import { ReturnableEventEmitter } from "../lib/eventemitter"

export const buildingHooks: Record<
	string,
	BuildingHooks
> = window.__INTERNAL_CPPKIES_HOOKS__
	? window.__INTERNAL_CPPKIES_HOOKS__.buildings
	: {}

/**
 * Creates the hooks for a building
 * @param building The building to create hooks for
 */

export type BuildingHooks = ReturnableEventEmitter<{
	tooltip: [string, string]
	cps: [number, number]
	buy: [void, void]
	levelUp: [void, void]
}>

export function createBuildingHooks(building: Game.Object): void {
	const emitter: BuildingHooks = new ReturnableEventEmitter()
	const injections = [
		new Injection("tooltip", 1, () => {
			building.tooltip = injectCode(
				injectCode(building.tooltip, "return", "let tempRet = ", "replace"),
				null,
				`\n//Cppkies injection
				return __INTERNAL_CPPKIES_HOOKS__.buildings[this.name].emit("tooltip", tempRet)`,
				"after"
			)
		}),
		new Injection("buy", 1, () => {
			building.buy = injectCode(
				building.buy,
				null,
				`\n//Cppkies injection
				if(success) {
					__INTERNAL_CPPKIES_HOOKS__.buildings[this.name].emit("buy")
				}`,
				"after"
			)
		}),
		new Injection("levelUp", 1, () => {
			building.levelUp = injectCode(
				building.levelUp,
				"me.level+=1;",
				`\n// Cppkies injection
__INTERNAL_CPPKIES_HOOKS__.buildings[me.name].emit("levelUp")`,
				"after",
				{ me: building }
			)
		}),
	]
	injections.forEach(inject => inject.runHook())
	buildingHooks[building.name] = emitter
}
