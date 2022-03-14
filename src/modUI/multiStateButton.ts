import { FriendlyHtml } from "../ccUI"
import { Button } from "./button"
import { TOGGLE_UI_RESET } from "./toggleBase"

export class MultiStateButton<T extends string[]> extends Button<string> {
	state: T[number]
	private stateFunc?: (state: T[number]) => FriendlyHtml
	constructor(
		keyname: string,
		name: FriendlyHtml | ((state: T[number]) => FriendlyHtml),
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
		// @ts-expect-error No, load may or may not have triggered already
		if (this.state === undefined) this.state = this.states[0]
	}
	save(): string {
		return this.state
	}
	load(save: string | typeof TOGGLE_UI_RESET): void {
		if (save === TOGGLE_UI_RESET) this.state = this.states[0]
		else this.state = save
	}
	render(): HTMLDivElement {
		if (this.stateFunc) this.name = this.stateFunc(this.state)
		return super.render()
	}
}
