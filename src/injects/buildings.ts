import { BuildingInjection, Injection } from "./generic"
import { injectCode, injectCodes } from "../helpers"
import { ReturnableEventEmitter } from "../lib/eventemitter"
import { todoBeforeLoad } from "../loadValues"

export const buildingHooks: BuildingHooks =
	window.__INTERNAL_CPPKIES__?.buildings || new ReturnableEventEmitter()

/**
 * Creates the hooks for a building
 * @param building The building to create hooks for
 */

type BuildingHookRet<T extends object = {}> = T & {
	building: Game.Object
}

type CompleteBuildingHookNoRet<T extends object = {}> = [
	BuildingHookRet<T>,
	void
]
type CompleteBuildingHookRet<T extends object = {}> = [
	BuildingHookRet<T>,
	T[keyof T]
]

export type BuildingHooks = ReturnableEventEmitter<{
	tooltip: CompleteBuildingHookRet<{ tooltip: string }>
	buy: CompleteBuildingHookNoRet
	levelUp: CompleteBuildingHookNoRet
}>

export function createBuildingHooks(building: Game.Object): void {
	const injections = [
		new BuildingInjection("tooltip", () => {
			building.tooltip = injectCodes(building.tooltip, [
				["return", "let tempRet = ", "replace"],
				[
					null,
					`\n//Cppkies injection
					return __INTERNAL_CPPKIES__.buildings.convertableEmit("tooltip", tooltip => ({ building: this, tooltip: tooltip }), tempRet);\n`,
					"after",
				],
			])
		}),
		new BuildingInjection("buy", () => {
			building.buy = injectCode(
				building.buy,
				null,
				`\n//Cppkies injection
				if(success) {
					__INTERNAL_CPPKIES__.buildings.constEmit("buy", { building: this });\n
				}`,
				"after"
			)
		}),
		new BuildingInjection("levelUp", () => {
			building.levelUp = injectCode(
				building.levelUp,
				"me.level+=1;",
				`\n// Cppkies injection
__INTERNAL_CPPKIES__.buildings.constEmit("levelUp", { building: me});\n`,
				"after",
				{ me: building }
			)
		}),
	]

	injections.forEach(inject => {
		inject.runHook(building)
	})
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
