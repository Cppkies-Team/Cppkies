import { ccHideableSection } from "../ccUI"
import hooks from "../injects/basegame"
import { shouldRunVersioned } from "../injects/generic"
import { Mod } from "../mods"
import { save } from "../saves"
import { mods, currentMod } from "../vars"

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
	load?(this: this, save: C): void
}

if (shouldRunVersioned("modUIInject"))
	hooks.on("optionsMenu", () => {
		const menuDiv = document.querySelector("#menu")
		if (!menuDiv || mods.length === 0) return
		const menuSubsection = menuDiv.children[menuDiv.children.length - 1]
		const menuListing =
			menuSubsection.children[menuSubsection.children.length - 2]

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
