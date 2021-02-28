import { currentMod, Mod } from "./mods"
import { CommonValue } from "./helpers"
import { ccButton, ccHideableSection } from "./ccUI"
import hooks from "./injects/basegame"
import { mods } from "./vars"

export abstract class ToggleBase {
	mod: Mod
	constructor() {
		if (!currentMod)
			throw new Error(
				"You are instancing a mod UI class outside of a mod declaration."
			)
		currentMod.toggles.push(this)
		this.mod = currentMod
	}
	abstract render(): HTMLElement
}

export class Button extends ToggleBase {
	additionalClasses: string[] = []
	constructor(
		public name: CommonValue<string>,
		public description?: CommonValue<string>,
		public onClick?: (this: Button) => void,
		public type?: "warning" | "neato" | "normal" | null
	) {
		super()
	}
	render(): HTMLDivElement {
		return ccButton(
			this.name,
			this.description,
			() => {
				this.onClick?.()
				Game.UpdateMenu()
			},
			this.type,
			null,
			this.additionalClasses
		)
	}
}

export class MultiStateButton<T extends string[]> extends Button {
	state: T[number]
	constructor(
		name: string | ((state: T[number]) => string),
		public states: T,
		public description?: CommonValue<string>,
		onClick?: (this: Button) => void,
		public type?: "warning" | "neato" | "normal" | null
	) {
		super(
			typeof name === "string"
				? () => `${name} ${this.state}`
				: () => name(this.state),
			description,
			() => {
				this.state =
					this.states[this.states.indexOf(this.state) + 1] ?? this.states[0]
				onClick?.apply(this)
			}
		)
	}
}

export class ToggleButton extends MultiStateButton<["ON", "OFF"]> {
	constructor(
		name: string | ((state: boolean) => string),
		public description?: CommonValue<string>,
		onClick?: (this: Button) => void,
		public type?: "warning" | "neato" | "normal" | null,
		public defaultState?: boolean
	) {
		super(
			typeof name === "string" ? name : () => name(this.state === "ON"),
			["ON", "OFF"],
			description,
			() => {
				if (this.state === "ON")
					this.additionalClasses.splice(
						this.additionalClasses.indexOf("off"),
						1
					)
				else this.additionalClasses.push("off")
				onClick?.apply(this)
			}
		)
		this.state =
			this.defaultState || this.defaultState === undefined ? "ON" : "OFF"
		if (this.state === "OFF") this.additionalClasses.push("off")
	}
}

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
