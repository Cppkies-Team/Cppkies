import { minigamePromises } from "./minigamePromises"
import { Mod, OwnershipUnit } from "../mods"
import hooks from "../injects/basegame"
import {
	BoostInfo,
	gardenHooks,
	PlotBoostInfo,
	requireGardenInjects,
} from "../injects/garden"
import { shouldRunVersioned } from "../injects/generic"
import { MinigameSavePartition, save } from "../saves"
import { resolveAlias, resolveIcon } from "../spritesheets"
import { setUnitOwner } from "../vars"
import { injectCodes } from "../helpers"

requireGardenInjects()

let mg: Game.GardenMinigame | undefined

minigamePromises["Farm"].then(() => {
	mg = Game.Objects["Farm"].minigame
	savePartition.loadAll(save)
})

function loadPlant(plant: Plant): void {
	if (!mg) return
	if (!save.minigames?.garden || !save.minigames.garden.plot) return
	const plot = save.minigames.garden.plot
	for (let y = 0; y < mg.plot.length; y++)
		for (let x = 0; x < mg.plot[y].length; x++) {
			if (plot[y][x]?.[0] !== plant.key) continue
			const [, age] = plot[y][x] as [string, number]
			mg.plot[y][x][0] = plant.id + 1
			mg.plot[y][x][1] = age
		}
}

export const customPlants: Plant[] = []

export class Plant implements Game.GardenPlant, OwnershipUnit {
	children: string[] = []
	isCppkies = true as const
	contam?: number
	detailsStr?: string
	owner?: Mod
	fungus?: boolean
	icon: number
	iconX = 0
	iconLink?: string
	id: number
	immortal?: Game.PseudoBoolean | boolean | undefined

	//@ts-expect-error This is assigned in buildPanel
	l: HTMLDivElement

	mature: number
	noContam?: boolean | undefined
	onDie?: ((x: number, y: number) => void) | undefined
	onHarvest?: ((x: number, y: number, age: number) => void) | undefined
	onKill?: ((x: number, y: number, age: number) => void) | undefined
	plantable = true

	unlocked: Game.PseudoBoolean | boolean = false
	weed = false
	effsStr: string
	/**
	 *
	 * @param icon The icon of the seed, the growth stages shall be on the right of it
	 */
	constructor(
		public name: string,
		public key: string,
		icon: Game.Icon,
		public cost: number,
		public costM: number,
		public ageTick: number,
		public ageTickR: number,
		public matureBase: number,
		effsStr:
			| string
			| ExEffects
			| ((state: BoostInfo | PlotBoostInfo) => ExEffects),
		public q: string
	) {
		setUnitOwner(this)
		if (!mg) throw new Error("The garden minigame has not loaded yet!")
		icon = resolveIcon(icon)
		this.icon = icon[0]
		this.iconX = icon[1]
		this.iconLink = icon[2]
		this.mature = this.matureBase
		if (typeof effsStr === "string") this.effsStr = effsStr
		else {
			const effs = new GardenEffect(key, effsStr)
			this.effsStr = effs.toString()
		}

		this.id = mg.plantsById.push(this) - 1
		mg.plants[key] = this
		mg.plantsN++
		customPlants.push(this)
		loadPlant(this)
		if (save.minigames?.garden?.seeds?.includes(this.key)) this.unlocked = true
		mg.getUnlockedN()
		mg.buildPanel()
		mg.buildPlot()
	}
}

type CompareAction = ">" | "<" | ">=" | "<=" | "=" | "!="

type BaseMutation = `${CompareAction}${number}`

type MutationMatrix = {
	[type: string]: BaseMutation | BaseMutation[]
}

type MultiMatrix = Partial<Record<"neighs" | "neighsMature", MutationMatrix>>

const mutations: PlantMutation[] = []

export class PlantMutation implements OwnershipUnit {
	owner?: Mod
	constructor(
		public matches:
			| MutationMatrix
			| MultiMatrix
			| ((
					neighsM: Record<string, number>,
					neighs: Record<string, number>
			  ) => boolean),
		public results: [string, number][]
	) {
		mutations.push(this)
	}
}

function parseMutationCondition(str: string): [CompareAction, number] {
	const action: string | undefined = str.match(/^(>=|<=|!=|[><=])/)?.[0]
	if (!action)
		throw new Error("Your string must start with a comparison operator!")
	const amount = parseInt(str.slice(action.length))
	return [action as CompareAction, amount]
}

function matchMatrix(
	mut: MutationMatrix,
	plantStats: Partial<Record<string, number>>
): boolean {
	if (!mg) throw new Error("This should never happen!")
	for (const plantName in mut) {
		if (!mg.plants[plantName])
			throw new Error("You aren't giving a real plant id!")
		const plantN = plantStats[plantName] || 0
		const match = mut[plantName]
		const conditions: BaseMutation[] =
			typeof match === "string" ? [match] : match
		for (const condition of conditions) {
			const [action, amount] = parseMutationCondition(condition)

			let isTrue = false
			switch (action) {
				case ">":
					isTrue = plantN > amount
					break
				case "<":
					isTrue = plantN < amount
					break
				case ">=":
					isTrue = plantN >= amount
					break
				case "<=":
					isTrue = plantN <= amount
					break
				case "=":
					isTrue = plantN === amount
					break
				case "!=":
					isTrue = plantN !== amount
					break
			}
			if (!isTrue) {
				return false
			}
		}
	}
	return true
}

function isMultiMatrix(
	matrix: MutationMatrix | MultiMatrix
): matrix is MultiMatrix {
	return !!(
		(matrix.neighs || matrix.neighsMature) &&
		!(
			matrix.neighs instanceof Array ||
			typeof matrix.neighs === "string" ||
			matrix.neighsMature instanceof Array ||
			typeof matrix.neighsMature === "string"
		)
	)
}

if (shouldRunVersioned("plantMutations"))
	gardenHooks.on("mutations", ({ muts, neighs, neighsM }) => {
		if (!mg) throw new Error("This should never happen!")
		for (const mut of mutations) {
			if (typeof mut.matches === "function") {
				if (mut.matches(neighsM, neighs)) muts.push(...mut.results)
			} else if (!isMultiMatrix(mut.matches)) {
				if (matchMatrix(mut.matches, neighsM)) muts.push(...mut.results)
			} else {
				if (
					(!mut.matches.neighs || matchMatrix(mut.matches.neighs, neighs)) &&
					(!mut.matches.neighsMature ||
						matchMatrix(mut.matches.neighsMature, neighsM))
				)
					muts.push(...mut.results)
			}
		}
		return { muts, neighs, neighsM }
	})

type CppkiesPlot = ([string, number] | null)[][]

interface SeedGardenSave {
	seeds: string[]
	plot?: undefined
	nextStep?: undefined
}

interface PlotGardenSave {
	plot: CppkiesPlot
	nextStep: number
	seeds?: undefined
}

interface FullGardenSave {
	plot: CppkiesPlot
	nextStep: number
	seeds: string[]
}

export type GardenSave = PlotGardenSave | SeedGardenSave | FullGardenSave

declare module "../saves" {
	export interface SpecififcMinigameSaves {
		garden?: GardenSave
	}
}

function createEmptyPlot(plot: Game.GardenMinigame["plot"]): CppkiesPlot {
	return new Array(plot.length)
		.fill(null)
		.map((_, i) => Array(plot[i].length).fill(null))
}

const savePartition = new MinigameSavePartition(
	"garden",
	1,
	"mixed",
	save => {
		const seeds: string[] = save.garden?.seeds || []

		for (const plant of customPlants) {
			const savePlantUnlocked = seeds.includes(plant.key)
			if (plant.unlocked && !savePlantUnlocked) seeds.push(plant.key)
			else if (!plant.unlocked && savePlantUnlocked)
				seeds.splice(seeds.indexOf(plant.key), 1)
		}
		if (seeds.length === 0) {
			delete save.garden?.seeds
			if (!save.garden?.plot) delete save.garden
		} else {
			if (!save.garden) save.garden = { seeds }
			else save.garden.seeds = seeds
		}
	},
	save => {
		if (!mg) return
		if (!save?.garden) return
		if (save.garden.plot) {
			if (
				__INTERNAL_CPPKIES__.isFirstLoad &&
				mg.nextStep - save.garden.nextStep === mg.stepT * 1000
			) {
				// We only load plants if only one tick (the offline tick) has passed
				const plot = save.garden.plot
				for (let y = 0; y < mg.plot.length; y++)
					for (let x = 0; x < mg.plot[y].length; x++) {
						if (plot[y][x] === null) {
							mg.plot[y][x] = [0, 0]
							continue
						}
						const [plantName, age] = plot[y][x] as [string, number]
						mg.plot[y][x][0] = mg.plants[plantName].id + 1
						mg.plot[y][x][1] = age
					}
				mg.nextStep = save.garden.nextStep
				mg.logic?.()
			} else if (mg.nextStep - save.garden.nextStep === 0) {
				const plot = save.garden.plot
				for (let y = 0; y < mg.plot.length; y++)
					for (let x = 0; x < mg.plot[y].length; x++) {
						if (plot[y][x] === null) {
							mg.plot[y][x] = [0, 0]
							continue
						}
						const [plantName, age] = plot[y][x] as [string, number]
						if (mg.plants[plantName] === undefined) continue
						mg.plot[y][x][0] = mg.plants[plantName].id + 1
						mg.plot[y][x][1] = age
					}
			}
		}
		if (save.garden.seeds) {
			for (const plantName of save.garden.seeds) {
				if (!mg.plants[plantName]) continue
				mg.plants[plantName].unlocked = true
			}
		}
	},
	(save, resetType) => {
		if (resetType === "hard") {
			delete save.garden
		} else {
			delete save.garden?.nextStep
			delete save.garden?.plot
			if (!save.garden?.seeds) delete save.garden
		}
	}
)

if (savePartition.active) {
	hooks.on("preSave", () => {
		if (!mg || !savePartition.active) return

		const plot = createEmptyPlot(mg.plot)
		let hasAnything = false
		for (let y = 0; y < mg.plot.length; y++)
			for (let x = 0; x < mg.plot[y].length; x++) {
				const spot = mg.plot[y][x]
				if (spot[0] === 0) continue
				const plant = mg.plantsById[spot[0] - 1]
				plot[y][x] = [plant.key, spot[1]]
				if (!(plant instanceof Plant)) continue
				spot[0] = spot[1] = 0
				hasAnything = true
			}

		if (hasAnything) {
			if (!save.minigames) save.minigames = {}
			if (save.minigames.garden) {
				save.minigames.garden.plot = plot
				save.minigames.garden.nextStep = mg.nextStep
			} else save.minigames.garden = { plot, nextStep: mg.nextStep }
		} else if (save.minigames?.garden) {
			delete save.minigames.garden.nextStep
			delete save.minigames.garden.plot
		}
	})
	hooks.on("postSave", () => {
		if (!mg || !savePartition.active) return
		if (!save.minigames?.garden?.plot) return
		const plot = save.minigames.garden.plot
		for (let y = 0; y < mg.plot.length; y++)
			for (let x = 0; x < mg.plot[y].length; x++) {
				if (plot[y][x] === null) continue
				const [plantName, age] = plot[y][x] as [string, number]
				mg.plot[y][x][0] = mg.plants[plantName].id + 1
				mg.plot[y][x][1] = age
			}
	})
}

export type ExEffects = Game.Effects & {
	multAge?: number | undefined
	multWeed?: number | undefined
	multPow?: number | undefined
	multRange?: number | undefined
}

export const gardenEffects: GardenEffect[] = []
interface EffectString {
	n: string
	rev?: boolean
}

export class GardenEffect {
	constructor(
		public plantName: string,
		public effects:
			| ExEffects
			| ((state: BoostInfo | PlotBoostInfo) => ExEffects),
		public customDesc?: string
	) {
		gardenEffects.push(this)
	}
	toString(): string {
		if (!mg) throw new Error("Wait for the minigame to load!")
		const effNames = injectCodes(mg.tools.info.descFunc as () => string, [
			["M.freeze", "false", "replace"],
			["var effStr='';", "return effs;}\n/*", "before"],
			[null, "*/", "after"],
		])() as unknown as Record<string, EffectString>
		if (this.customDesc) return this.customDesc
		if (typeof this.effects === "function")
			throw new Error("Should have supplied `customDesc`!")
		let str = ""
		for (const [effName, mult] of Object.entries(this.effects)) {
			const effData = effNames[effName]
			const amount = (mult - 1) * 100
			const karmaAmount = (effData.rev ? -1 : 1) * amount
			str += `<div class="${karmaAmount > 0 ? "green" : "red"}">&bull; ${
				effData.n
			} ${amount > 0 ? "+" : "-"}${Beautify(Math.abs(amount), 2)}%</div>`
		}
		return str
	}
}

type ObjectKeysOfValue<O extends object, V> = keyof {
	[P in keyof O as O[P] extends V ? P : never]: null
}

if (shouldRunVersioned("plantEffects")) {
	gardenHooks.on("boosts", boost => {
		for (const effect of gardenEffects) {
			const effects =
				typeof effect.effects === "function"
					? effect.effects(boost)
					: effect.effects
			for (const [effectName, mult] of Object.entries(effects)) {
				if (effectName.startsWith("mult")) continue
				if (!(effectName in boost.effs)) continue
				if (mult > 0) {
					//@ts-expect-error The effect name is checked beforehand
					boost.effs[effectName] += boost.mult * mult
				} else {
					//@ts-expect-error The effect name is checked beforehand
					boost.effs[effectName] *= 1 - boost.mult * mult
				}
			}
		}
		return boost
	})
	gardenHooks.on("plotBoosts", boost => {
		for (const effect of gardenEffects) {
			const effects =
				typeof effect.effects === "function"
					? effect.effects(boost)
					: effect.effects
			for (const [effectName, mult] of Object.entries(effects)) {
				if (!effectName.startsWith("mult")) continue
				if (
					!["multAge", "multWeed", "multPow", "multRange"].includes(effectName)
				)
					continue
				let key: ObjectKeysOfValue<typeof boost, number>
				if (effectName === "multAge") key = "ageMult"
				else if (effectName === "multWeed") key = "weedMult"
				else if (effectName === "multPow") key = "powerMult"
				else if (effectName === "multRange") key = "range"
				else continue
				boost[key] *= mult
			}
		}
		return boost
	})
}
