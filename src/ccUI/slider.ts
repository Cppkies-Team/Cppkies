import { friendlyAppendHtml, FriendlyHtml } from "./appendHTML"

const additionalCss = document.createElement("style")

additionalCss.textContent = `
.cppkiesSliderBox {
	display: flex;
	flex-direction: column;
}
.cppkiesSliderRight {
	position: absolute;
	align-self: flex-end;
} 
`

document.head.appendChild(additionalCss)

export function ccSlider(
	name: FriendlyHtml,
	valueFunc: (value: number) => FriendlyHtml,
	value: number,
	bounds: [number, number, number?],
	onChange?: (newValue: number) => void
): HTMLDivElement {
	const div = document.createElement("div")
	div.classList.add("sliderBox", "cppkiesSliderBox")
	friendlyAppendHtml(name, div)
	const rightDiv = document.createElement("div")
	rightDiv.classList.add("cppkiesSliderRight")
	friendlyAppendHtml(valueFunc(value), rightDiv, null)
	div.appendChild(rightDiv)
	const slider = document.createElement("input")
	slider.classList.add("slider")
	slider.type = "range"
	slider.min = bounds[0].toString()
	slider.max = bounds[1].toString()
	slider.step = (bounds[2] ?? 1).toString()
	slider.value = value.toString()
	slider.addEventListener("input", () => {
		// Reset the right div and apply new value
		rightDiv.innerText = ""
		friendlyAppendHtml(valueFunc(parseFloat(slider.value)), rightDiv, null)
		onChange?.(parseFloat(slider.value))
	})
	slider.addEventListener("mouseup", () => PlaySound("snd/tick.mp3"))
	div.appendChild(slider)
	return div
}
