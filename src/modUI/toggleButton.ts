import { FriendlyHtml } from "../ccUI"
import { CommonValue } from "../helpers"
import { MultiStateButton } from "./multiStateButton"

export class ToggleButton extends MultiStateButton<["ON", "OFF"]> {
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
