import { applyAllProps, hasOwnProperty } from "./helpers"
import { mods, setCurrentMod } from "./vars"
import { ToggleBase } from "./modUI"
import { deffer } from "./loadValues"
import { ModSavePartition, save } from "./saves"

new ModSavePartition(
	"custom",
	1,
	"never",
	(save, mod) => {
		if (!mod) return
		save.custom = mod.custom
	},
	(save, mod) => {
		if (!mod) return
		mod.custom = save.custom
	}
)

/**
 * An object which mods can own
 */
export interface OwnershipUnit {
	owner?: Mod
}

export interface ModMetadata {
	/**
	 * The unique keyname of the mod, can consist of
	 * A-Z a-z 0-9 - _ . ! ~ * ' ( )
	 */
	keyname: string
	/**
	 * The shown name of the mod, doesn't contain any restrictions
	 */
	name?: string
	/**
	 * The icon of the mod
	 */
	icon?: Game.Icon
	/**
	 * The version of the mod, must be in semver
	 */
	version: string
}

export class Mod<C extends object = object> implements ModMetadata {
	/**
	 * The unique keyname of the mod, can consist of
	 * A-Z a-z 0-9 - _ . ! ~ * ' ( )
	 */
	keyname = "never-should-happen"
	/**
	 * The shown name of the mod, doesn't contain any restrictions
	 */
	name?: string
	/**
	 * The icon of the mod
	 */
	icon?: Game.Icon
	/**
	 * The version of the mod, must be in semver
	 */
	version = "1.0"
	/**
	 * Custom additional data which mods can read/write to
	 */
	custom: C | null = null

	toggles: ToggleBase[] = []
	ownedUnits: OwnershipUnit[] = []
	/**
	 * Creates a mod which can have a settings UI and is only launched on Cppkies load
	 * @param metadata The metadata of the mod, it is strongly recommended to set a name
	 * @param modFunction The function which is called when cppkies is loaded
	 */
	constructor(
		metadata: ModMetadata,
		public modFunction?: <T extends Mod<any> = Mod<C>>(this: T) => void
	) {
		applyAllProps(this, metadata)
		const ogMod = mods.find(val => val.keyname === metadata.keyname)
		if (ogMod)
			if (ogMod.version !== this.version)
				throw new Error(
					"You are trying to load multiple versions of the same mod"
				)
			else {
				console.warn(`Loading the same mod (${ogMod.keyname}) multiple times.`)
				return
			}
		mods.push(this)
		this.custom = (save.mods[this.keyname]?.custom as C) ?? null
		deffer.then(() => {
			setCurrentMod(this)
			modFunction?.apply(this)
			// Update the menu, just in case
			Game.UpdateMenu()
			setCurrentMod(null)
		})
	}

	render(): HTMLElement {
		const modDiv = document.createElement("div")
		for (const toggle of this.toggles) modDiv.appendChild(toggle.render())
		return modDiv
	}
}
