import { applyAllProps } from "./helpers"
import { mods } from "./vars"
import { ToggleBase } from "./modUI"

export let currentMod: Mod | null = null

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

export class Mod implements ModMetadata {
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

	toggles: ToggleBase[] = []

	/**
	 * Creates a mod which can have a settings UI and is only launched on Cppkies load
	 * @param metadata The metadata of the mod, it is strongly recommended to set a name
	 * @param modFunction The function which is called when cppkies is loaded
	 */
	constructor(metadata: ModMetadata, public modFunction?: (this: Mod) => void) {
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
		currentMod = this
		// TODO: Add on Cppkies load waitting
		modFunction?.apply(this)
		// Update the menu, just in case
		Game.UpdateMenu()
		currentMod = null
	}

	render(): HTMLElement {
		const modDiv = document.createElement("div")
		for (const toggle of this.toggles) modDiv.appendChild(toggle.render())
		return modDiv
	}
}
