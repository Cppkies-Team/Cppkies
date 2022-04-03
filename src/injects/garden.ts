import { Injection } from "./generic"
import { todoBeforeLoad } from "../loadValues"
import { injectCode, injectCodes } from "../helpers"
import { minigamePromises } from "../minigames/minigamePromises"
import { ReturnableEventEmitter } from "../lib/eventemitter"

export interface MutationInfo {
	neighs: Record<string, number>
	neighsM: Record<string, number>
	muts: [string, number][]
}

export interface PlotBoostInfo {
	x: number
	y: number
	name: string
	age: number
	ageMult: number
	powerMult: number
	weedMult: number
	range: number
	mult: number
}

export interface BoostInfo {
	x: number
	y: number
	name: string
	age: number
	mult: number
	effs: Game.Effects
}

export type GardenHooks = ReturnableEventEmitter<{
	mutations: [MutationInfo, MutationInfo]
	plotBoosts: [PlotBoostInfo, PlotBoostInfo]
	boosts: [BoostInfo, BoostInfo]
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
	if (!__INTERNAL_CPPKIES__.minigames) __INTERNAL_CPPKIES__.minigames = {}
	if (__INTERNAL_CPPKIES__.minigames.garden)
		__INTERNAL_CPPKIES__.minigames.garden.setForwardTarget(gardenHooks)
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
		}),
		new Injection("mutations", () => {
			mg.getMuts = injectCode(
				mg.getMuts,
				"return muts;",
				'return __INTERNAL_CPPKIES__.minigames.garden.emit("mutations", { muts, neighs, neighsM }).muts;',
				"replace",
				{ M: mg }
			)
		}),
		new Injection("gardenCppkiesSeeds", () => {
			mg.save = injectCode(
				mg.save,
				"str+=''+(M.plants[i].unlocked?'1':'0')",
				"if (!M.plants[i].isCppkies);\n",
				"before",
				{ M: mg }
			)
		}),
		new Injection("plotBoosts", () => {
			mg.computeBoostPlot = injectCode(
				mg.computeBoostPlot,
				"//by god i hope these are right",
				`var boostInfo = __INTERNAL_CPPKIES__.minigames.garden.emit("plotBoosts", { x: x, y: y, name: name, age: tile[1], ageMult: ageMult, powerMult: powerMult, weedMult: weedMult, range: range, mult: mult });
				ageMult = boostInfo.ageMult
				powerMult = boostInfo.powerMult
				weedMult = boostInfo.weedMult
				range = boostInfo.range
				mult = boostInfo.mult;\n`,
				"before",
				{ M: mg }
			)
		}),
		new Injection("boosts", () => {
			mg.computeEffs = injectCode(
				mg.computeEffs,
				"mult*=M.plotBoost[y][x][1];",
				`var boostInfo = __INTERNAL_CPPKIES__.minigames.garden.emit("boosts", { x: x, y: y, name: name, age: tile[1], mult: mult, effs: effs })
				effs = effs
				mult = mult;\n`,
				"before",
				{ M: mg }
			)
		}),
	]
	for (const injection of injections) injection.runHook()
	__INTERNAL_CPPKIES__.minigames.garden = gardenHooks
}

todoBeforeLoad.push(injectGarden)
