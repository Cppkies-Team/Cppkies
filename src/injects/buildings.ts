import hooks from "./basegame"
import { Injection } from "./generic"
import { injectCode } from "../helpers"
import { ReturnableEventEmitter } from "../lib/eventemitter"

export const buildingHooks: Record<string, BuildingHooks> = {}

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

export function createHooks(building: Game.Object): void {
	const emitter: BuildingHooks = new ReturnableEventEmitter()
	const injections = [
		new Injection("tooltip", () => {
			building.tooltip = injectCode(
				injectCode(building.tooltip, "return", "let tempRet = ", "replace"),
				null,
				`\n//Cppkies injection
				return __INTERNAL_CPPKIES_HOOKS__.buildings[this.name].emit("tooltip", tempRet)`,
				"after"
			)
		}),
		new Injection("buy", () => {
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
		new Injection("levelUp", () => {
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
	injections.forEach(inject => {
		inject.func?.()
	})
	hooks.on("buildingCps", val => ({
		building: val.building,
		cps:
			Game.Objects[val.building] === building
				? emitter.emit("cps", val.cps)
				: val.cps,
	}))
	buildingHooks[building.name] = emitter
}

/**
 * Automatically finds buildings without hooks and creates them
 */
export function hookAllBuildings(): void {
	for (const building of Game.ObjectsById)
		if (!buildingHooks[building.name]) createHooks(building)
}
