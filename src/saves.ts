import { applyAllProps } from "./helpers"
import { mods, setUnitOwner } from "./vars"
import { type Mod, OwnershipUnit } from "./mods"
import { compressToUTF16, decompressFromUTF16 } from "./lib/lz-string"

export const VANILLA_DRAGON_LEVEL_AMOUNT = Game.dragonLevels.length

export const SAVE_VER = 3 as const

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SpecififcMinigameSaves {}

export type PartitionResistance = "soft" | "hard" | "never" | "mixed"
export type ResetType = "soft" | "hard"

export abstract class SavePartition implements OwnershipUnit {
	owner?: Mod<object>
	active: boolean
	constructor(
		public name: string,
		public version: number,
		public resetOn: PartitionResistance
	) {
		setUnitOwner(this)
		const currentPartition = __INTERNAL_CPPKIES__.savePartitions[name]
		this.active = !currentPartition || version > currentPartition.version
		if (this.active) {
			if (currentPartition) currentPartition.active = false
			__INTERNAL_CPPKIES__.savePartitions[name] = this
		}
	}
	abstract saveAll(save: SaveType): void
	abstract loadAll(save: SaveType): void
}

export class GlobalSavePartition extends SavePartition {
	constructor(
		name: keyof SaveType,
		version: number,
		resetOn: Exclude<PartitionResistance, "mixed">,
		save: (save: SaveType) => void,
		load: (save: SaveType) => void
	)
	constructor(
		name: keyof SaveType,
		version: number,
		resetOn: "mixed",
		save: (save: SaveType) => void,
		load: (save: SaveType) => void,
		reset: (save: SaveType) => void
	)
	constructor(
		name: keyof SaveType,
		version: number,
		resetOn: PartitionResistance,
		public save?: (save: SaveType) => void,
		public load?: (save: SaveType) => void,
		public reset?: (save: SaveType, resetType: ResetType) => void
	) {
		super(name, version, resetOn)
	}
	saveAll(save: SaveType): void {
		this.save?.(save)
	}
	loadAll(save: SaveType): void {
		this.load?.(save)
	}
	resetAll(save: SaveType, resetType: "soft" | "hard"): void {
		if (this.resetOn === "never") return
		if (this.resetOn === "mixed") {
			this.reset?.(save, resetType)
			return
		}
		//@ts-expect-error `name` is more specific than `string`, but TS doesn't know that
		if (this.resetOn === "soft" || resetType === "hard") delete save[this.name]
	}
}

export class ModSavePartition extends SavePartition {
	constructor(
		name: keyof ModSave,
		version: number,
		resetOn: Exclude<PartitionResistance, "mixed">,
		save: (save: ModSave, mod?: Mod) => void,
		load: (save: ModSave, mod?: Mod) => void
	)
	constructor(
		name: keyof ModSave,
		version: number,
		resetOn: "mixed",
		save: (save: ModSave, mod?: Mod) => void,
		load: (save: ModSave, mod?: Mod) => void,
		reset: (save: ModSave, resetType: ResetType, mod?: Mod) => void
	)
	constructor(
		name: keyof ModSave,
		version: number,
		resetOn: PartitionResistance,
		public save: (save: ModSave, mod?: Mod) => void,
		public load: (save: ModSave, mod?: Mod) => void,
		public reset?: (save: ModSave, resetType: ResetType, mod?: Mod) => void
	) {
		super(name, version, resetOn)
	}
	saveAll(save: SaveType): void {
		this.save(save.foreign)
		for (const mod of mods) this.save(save.mods[mod.keyname], mod)
	}
	loadAll(save: SaveType): void {
		this.load(save.foreign)
		for (const mod of mods) this.load(save.mods[mod.keyname], mod)
	}
	protected resetOne(
		save: ModSave,
		mod: Mod,
		resetType: "soft" | "hard"
	): void {
		if (this.resetOn === "never") return
		if (this.resetOn === "mixed") {
			this.reset?.(save, resetType, mod)
			return
		}
		//@ts-expect-error `name` is more specific than `string`, but TS doesn't know that
		if (this.resetOn === "soft" || resetType === "hard") delete save[this.name]
	}
}

export class MinigameSavePartition extends SavePartition {
	constructor(
		name: keyof SpecififcMinigameSaves,
		version: number,
		resetOn: Exclude<PartitionResistance, "mixed">,
		save: (save: SpecififcMinigameSaves) => void,
		load: (save: SpecififcMinigameSaves) => void
	)
	constructor(
		name: keyof SpecififcMinigameSaves,
		version: number,
		resetOn: "mixed",
		save: (save: SpecififcMinigameSaves) => void,
		load: (save: SpecififcMinigameSaves) => void,
		reset: (save: SpecififcMinigameSaves, resetType: ResetType) => void
	)
	constructor(
		name: keyof SpecififcMinigameSaves,
		version: number,
		resetOn: PartitionResistance,
		public save: (save: SpecififcMinigameSaves) => void,
		public load: (save: SpecififcMinigameSaves) => void,
		public reset?: (save: SpecififcMinigameSaves, resetType: ResetType) => void
	) {
		super(name, version, resetOn)
	}
	saveAll(save: SaveType): void {
		if (!save.minigames) save.minigames = {}
		this.save(save.minigames)
	}
	loadAll(save: SaveType): void {
		if (!save.minigames) return
		this.load(save.minigames)
	}
	resetAll(save: SaveType, resetType: "soft" | "hard"): void {
		if (!save.minigames) return
		if (this.resetOn === "never") return
		if (this.resetOn === "mixed") {
			this.reset?.(save.minigames, resetType)
			return
		}
		if (this.resetOn === "soft" || resetType === "hard")
			delete save.minigames[this.name]
	}
}

/**
 * The save type for Cppkies
 */
export interface SaveType {
	saveVer: typeof SAVE_VER
	mods: Record<string, ModSave>
	foreign: ModSave
	minigames?: SpecififcMinigameSaves & Record<string, object>
}

function createDefaultSave(): SaveType {
	return {
		mods: {},
		foreign: { custom: null },
		saveVer: SAVE_VER,
	}
}

export const save: SaveType = createDefaultSave()

/**
 * Creates a save for Cppkies
 */
export function initSave(): void {
	const newSave = createDefaultSave()
	applyAllProps(save, newSave)
}

/**
 * The save type for a mod
 */
export interface ModSave {
	custom: object | null
}

/**
 * Saves everything
 */
export function saveAll(): void {
	for (const mod of mods) save.mods[mod.keyname] = { custom: null }
	for (const partition of Object.values(__INTERNAL_CPPKIES__.savePartitions)) {
		partition!.saveAll(save)
	}
	for (const mod of mods) {
		const modSave = save.mods[mod.keyname]
		if (Object.keys(modSave).length === 1 && modSave.custom === null)
			delete save.mods[mod.keyname]
	}
}
/**
 * Loads everything
 */
export function loadAll(): void {
	for (const partition of Object.values(__INTERNAL_CPPKIES__.savePartitions)) {
		partition!.loadAll(save)
	}
}

export function importSave(data: string): void {
	if (data === "" || data === "{}") initSave()
	else
		try {
			let decompressedData = decompressFromUTF16(data)
			// If it's invalid LZ-string, try raw string
			if (!decompressedData || decompressedData.length < 10)
				decompressedData = data
			const newSave = JSON.parse(decompressedData)
			applyAllProps(save, newSave)
		} catch (err) {
			console.warn("CPPKIES: Found invalid save, creating new one...")
			console.error(err)
			initSave()
		}
	loadAll()
}

export function exportSave(): string {
	saveAll()
	return compressToUTF16(JSON.stringify(save))
}
