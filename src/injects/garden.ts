import { Injection } from "./generic"
import { todoBeforeLoad } from "../loadValues"
import { injectCode, injectCodes } from "../helpers"
import { minigamePromises } from "../minigames/minigamePromises"
import { ReturnableEventEmitter } from "../lib/eventemitter"

interface MutationInfo {
	neighs: Record<string, number>
	neighsM: Record<string, number>
	muts: [string, number][]
}

export type GardenHooks = ReturnableEventEmitter<{
	mutations: [MutationInfo, MutationInfo]
}>

export const gardenHooks: GardenHooks = new ReturnableEventEmitter()

/**
 * A no-op (not no-op for terser's standard) function to trick treeshaking into using the injetions module
 */
export function requireGardenInjects(): void {
	if (Math.acos(1) === 1) throw ""
}

async function injectGarden(): Promise<void> {
	await minigamePromises["Farm"]
	const mg = Game.Objects["Farm"].minigame
	if (!window.__INTERNAL_CPPKIES_HOOKS__.minigames)
		window.__INTERNAL_CPPKIES_HOOKS__.minigames = {}
	if (window.__INTERNAL_CPPKIES_HOOKS__.minigames.garden)
		window.__INTERNAL_CPPKIES_HOOKS__.minigames.garden.setForwardTarget(
			gardenHooks
		)
	const injections = [
		new Injection("customIconsGarden", () => {
			mg.getPlantDesc = injectCode(
				mg.getPlantDesc,
				"it.icon*48)+'px;",
				"' + (it.iconLink ? 'background-image: url(' + it.iconLink + ');' : '') + '",
				"after",
				{ M: mg }
			)
			mg.seedTooltip = injectCode(
				mg.seedTooltip,
				"me.icon*48)+'px;",
				"' + (me.iconLink ? 'background-image: url(' + me.iconLink + ');' : '') + '",
				"after",
				{ M: mg }
			)
			mg.buildPanel = injectCode(
				mg.buildPanel,
				"1]*48)+'px;",
				"' + (me.iconLink ? 'background-image: url(' + me.iconLink + ');' : '') + '",
				"after",
				{ M: mg }
			)
			mg.tileTooltip = injectCodes(
				mg.tileTooltip,
				[
					["[stage,me.icon]", "[stage + (me.iconX || 0),me.icon]", "replace"],
					[/-(\d)\*48/, "-($1 + (me.iconX || 0)) * 48", "replace"],
					[
						"1]*48)+'px;",
						"' + (me.iconLink ? 'background-image: url(' + me.iconLink + ');' : '') + '",
						"after",
					],
				],
				{ M: mg }
			)
			if (mg.draw)
				mg.draw = injectCodes(
					mg.draw,
					[
						["[0,seed.icon]", "[(seed.iconX || 0), seed.icon]", "replace"],
						[
							"M.cursorL.style.display='block';",
							'if (seed.iconLink) M.cursorL.style.backgroundImage = "url(" + seed.iconLink + ")";else M.cursorL.style.backgroundImage = "";',
							"after",
						],
					],
					{ M: mg }
				)
			mg.buildPlot = injectCodes(
				mg.buildPlot,
				[
					["[stage,me.icon]", "[stage + (me.iconX || 0), me.icon]", "replace"],
					[
						"iconL.style.display='block';",
						'if (me.iconLink) iconL.style.backgroundImage = "url(" + me.iconLink + ")";else iconL.style.backgroundImage = "";',
						"after",
					],
				],
				{ M: mg }
			)
			mg.getMuts = injectCode(
				mg.getMuts,
				"return muts;",
				'return __INTERNAL_CPPKIES_HOOKS__.minigames.garden.emit("mutations", { muts, neighs, neighsM }).muts;',
				"replace",
				{ M: mg }
			)
		}),
	]
	for (const injection of injections) injection.runHook()
	window.__INTERNAL_CPPKIES_HOOKS__.minigames.garden = gardenHooks
}

todoBeforeLoad.push(injectGarden)
