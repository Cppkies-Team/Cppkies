import { FriendlyHtml } from "../ccUI"
import { CommonValue } from "../helpers"
import { MultiStateButton } from "./multiStateButton"
import { TOGGLE_UI_RESET } from "./toggleBase"

export class ToggleButton extends MultiStateButton<["OFF", "ON"]> {
	constructor(
		keyname: string,
		name: FriendlyHtml | ((state: boolean) => FriendlyHtml),
		public description?: CommonValue<string>,
		onClick?: (this: ToggleButton) => void,
		public type?: "warning" | "neato" | "normal" | null,
		public defaultState?: boolean
	) {
		super(
			keyname,
			typeof name === "function"
				? (state: "ON" | "OFF") => name(state === "ON")
				: () => `${name} ${this.state}`,
			["OFF", "ON"],
			description,
			() => onClick?.apply(this)
		)
		if (this.state === undefined && this.defaultState) this.state = "ON"
	}
	render(): HTMLDivElement {
		this.off = this.state === "OFF"
		return super.render()
	}
	load(save: string | typeof TOGGLE_UI_RESET): void {
		if (save === TOGGLE_UI_RESET) this.state = this.defaultState ? "ON" : "OFF"
		else super.load(save)
	}
}
