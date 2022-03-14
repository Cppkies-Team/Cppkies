import { ccSlider, FriendlyHtml } from "../ccUI"
import { ToggleBase, TOGGLE_UI_RESET } from "./toggleBase"

export class Slider extends ToggleBase<number> {
	value: number
	constructor(
		keyname: string,
		public name: FriendlyHtml,
		public bounds: [number, number, number?],
		public valueFunc: (value: number) => FriendlyHtml,
		public defaultValue = bounds[0],
		public onChange?: (this: Slider, value: number) => void
	) {
		super(keyname)
		// @ts-expect-error No, load may or may not have triggered already
		if (this.value === undefined) this.value = defaultValue
	}
	save(): number {
		return this.value
	}
	load(save: number | typeof TOGGLE_UI_RESET): void {
		if (save === TOGGLE_UI_RESET) this.value = this.defaultValue
		else this.value = save
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
