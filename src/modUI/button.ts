import { ccButton, FriendlyHtml } from "../ccUI"
import { ToggleBase } from "./toggleBase"

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
