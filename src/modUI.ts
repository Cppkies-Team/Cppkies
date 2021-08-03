import { currentMod, Mod } from "./mods"
import { CommonValue } from "./helpers"
import { ccButton, ccHideableSection, ccSlider, FriendlyHtml } from "./ccUI"
import hooks from "./injects/basegame"
import { mods } from "./vars"
import { save } from "./saves"
import { shouldRunVersioned } from "./injects/generic"

export abstract class ToggleBase<C = unknown> {
	mod: Mod
	constructor(public keyname: string) {
		if (!currentMod)
			throw new Error(
				"You are instancing a mod UI class outside of a mod declaration."
			)
		currentMod.toggles.push(this)
		this.mod = currentMod
		if (this.load && save.mods[this.mod.keyname].ui[this.keyname] !== undefined)
			// @ts-expect-error We are trusting the save
			this.load(save.mods[this.mod.keyname].ui[this.keyname])
	}
	abstract render(): HTMLElement
	save?(this: this): C
	load?(this: this, save: C): void
}

export class Slider extends ToggleBase<number> {
	value: number
	constructor(
		keyname: string,
		public name: FriendlyHtml,
		public bounds: [number, number, number?],
		public valueFunc: (value: number) => FriendlyHtml,
		defaultValue = bounds[0],
		public onChange?: (this: Slider, value: number) => void
	) {
		super(keyname)
		if (this.value === undefined) this.value = defaultValue
	}
	save(): number {
		return this.value
	}
	load(save: number): void {
		this.value = save
	}
	render(): HTMLDivElement {
		return ccSlider(
			this.name,
			this.valueFunc,
			this.value,
			this.bounds,
			(val: number) => {
				this.value = val
				this.onChange?.(val)
			}
		)
	}
}

export class Button<C = unknown> extends ToggleBase<C> {
	additionalClasses: string[] = []
	off?: boolean
	constructor(
		keyname: string,
		public name: FriendlyHtml,
		public description?: FriendlyHtml,
		public onClick?: (this: Button) => void,
		public type?: "warning" | "neato" | "normal" | null
	) {
		super(keyname)
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
			this.off,
			this.additionalClasses
		)
	}
}

export class MultiStateButton<T extends string[]> extends Button<string> {
	state: T[number]
	private stateFunc?: (state: string) => FriendlyHtml
	constructor(
		keyname: string,
		name: FriendlyHtml | ((state: string) => FriendlyHtml),
		public states: T,
		public description?: FriendlyHtml,
		onClick?: (this: Button) => void,
		public type?: "warning" | "neato" | "normal" | null
	) {
		super(
			keyname,
			typeof name === "function" ? "TEMP" : name,
			description,
			() => {
				this.state =
					this.states[this.states.indexOf(this.state) + 1] ?? this.states[0]
				onClick?.apply(this)
			}
		)
		if (this.state === undefined) this.state = this.states[0]
	}
	save(): string {
		return this.state
	}
	load(save: string): void {
		this.state = save
	}
	render(): HTMLDivElement {
		if (this.stateFunc) this.name = this.stateFunc(this.state)
		return super.render()
	}
}

export class ToggleButton extends MultiStateButton<["ON", "OFF"]> {
	constructor(
		keyname: string,
		name: FriendlyHtml | ((state: boolean) => FriendlyHtml),
		public description?: CommonValue<string>,
		onClick?: (this: Button) => void,
		public type?: "warning" | "neato" | "normal" | null,
		public defaultState?: boolean
	) {
		super(
			keyname,
			typeof name === "function"
				? (state: "ON" | "OFF") => name(state === "ON")
				: () => `${name} ${this.state}`,
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
		if (this.state === undefined)
			this.state =
				this.defaultState || this.defaultState === undefined ? "ON" : "OFF"
		if (this.state === "OFF") this.additionalClasses.push("off")
	}
	render(): HTMLDivElement {
		this.off = this.state === "OFF"
		return super.render()
	}
}

if (shouldRunVersioned(1))
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
