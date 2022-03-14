import { BuildingInjection, Injection } from "./generic"
import { injectCode } from "../helpers"
import { ReturnableEventEmitter } from "../lib/eventemitter"
import { todoBeforeLoad } from "../loadValues"

export const buildingHooks: Record<string, BuildingHooks> =
	window.__INTERNAL_CPPKIES__?.buildings || {}

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
		new BuildingInjection("tooltip", () => {
			building.tooltip = injectCode(
				injectCode(building.tooltip, "return", "let tempRet = ", "replace"),
				null,
				`\n//Cppkies injection
				return __INTERNAL_CPPKIES__.buildings[this.name].emit("tooltip", tempRet)`,
				"after"
			)
		}),
		new BuildingInjection("buy", () => {
			building.buy = injectCode(
				building.buy,
				null,
				`\n//Cppkies injection
				if(success) {
					__INTERNAL_CPPKIES__.buildings[this.name].emit("buy")
				}`,
				"after"
			)
		}),
		new BuildingInjection("levelUp", () => {
			building.levelUp = injectCode(
				building.levelUp,
				"me.level+=1;",
				`\n// Cppkies injection
__INTERNAL_CPPKIES__.buildings[me.name].emit("levelUp")`,
				"after",
				{ me: building }
			)
		}),
	]

	injections.forEach(inject => {
		inject.runHook(building)
	})
	buildingHooks[building.name] = emitter
}

todoBeforeLoad.push(() => {
	if (!__INTERNAL_CPPKIES__.buildings)
		__INTERNAL_CPPKIES__.buildings = buildingHooks
	__INTERNAL_CPPKIES__.createBuildingHooks = createBuildingHooks

	for (const building of Object.values(Game.ObjectsById))
		createBuildingHooks(building)
	new Injection("buildingAutoHook", () => {
		Game.Object = injectCode(
			Game.Object,
			"Game.ObjectsN++",
			`
// Cppkies injection
__INTERNAL_CPPKIES__.createBuildingHooks(this);\n`,
			"after"
		)
	}).runHook()
})
