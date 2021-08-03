import { ccSlider, FriendlyHtml } from "../ccUI"
import { ToggleBase } from "./toggleBase"

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
