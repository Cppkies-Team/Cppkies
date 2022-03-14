import { ccHideableSection } from "../ccUI"
import hooks from "../injects/basegame"
import { shouldRunVersioned } from "../injects/generic"
import { Mod } from "../mods"
import { ModSavePartition, save } from "../saves"
import { mods, currentMod } from "../vars"

declare module "../saves" {
	export interface ModSave {
		ui?: Record<string, unknown>
	}
}

new ModSavePartition(
	"ui",
	1,
	"never",
	(save, mod) => {
		if (!mod) return

		for (const toggle of mod.toggles) {
			if (!toggle.save) continue
			if (!save.ui) save.ui = {}
			save.ui[toggle.keyname] = toggle.save()
		}
	},
	(save, mod) => {
		if (!mod || !save.ui) return

		for (const toggle of mod.toggles) {
			if (!toggle.load || !save.ui[toggle.keyname]) continue
			toggle.load(save.ui[toggle.keyname])
		}
	}
)

export const TOGGLE_UI_RESET = Symbol()

export abstract class ToggleBase<C = unknown> {
	mod: Mod
	constructor(public keyname: string) {
		if (!currentMod)
			throw new Error(
				"You are instancing a mod UI class outside of a mod declaration."
			)
		currentMod.toggles.push(this)
		this.mod = currentMod
		if (
			this.load &&
			save.mods[this.mod.keyname]?.ui?.[this.keyname] !== undefined
		)
			// @ts-expect-error We are trusting the save here
			this.load(save.mods[this.mod.keyname].ui[this.keyname])
	}
	abstract render(): HTMLElement
	save?(this: this): C
	load?(this: this, save: C | typeof TOGGLE_UI_RESET): void
}

if (shouldRunVersioned("modUIInject"))
	hooks.on("optionsMenu", () => {
		const menuDiv = document.querySelector("#menu")
		if (!menuDiv || mods.length === 0) return

		const menuSubsection = menuDiv.children[3].children[0].children[0]
		const menuListing =
			menuSubsection.children[menuSubsection.children.length - 1]

		for (const mod of mods)
			menuListing.appendChild(
				ccHideableSection(
					`${mod.keyname}ui`,
					mod.name ?? mod.keyname,
					mod.render(),
					Game.UpdateMenu
				)
			)
	})
