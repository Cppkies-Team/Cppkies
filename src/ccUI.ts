import { getValue, CommonValue } from "./helpers"

export type FriendlyHtml = CommonValue<string | HTMLElement>

function friendlyAppendHtml(
	value: FriendlyHtml,
	element: HTMLElement,
	containerName?: string | null
) {
	if (containerName === undefined) containerName = "div"
	value = getValue(value)
	if (typeof value === "string") {
		if (!containerName) element.innerHTML = value
		else {
			const container = document.createElement(containerName)
			container.innerHTML = value
			element.appendChild(container)
		}
	} else element.appendChild(value)
}

/**
 * Creates a cookie clicker UI button
 * @param name Text on the button
 * @param description The grey label describing the effects of the button
 * @param onClick Is called on click
 * @param type The color type of the button
 * @param off If it is true, the button is faded out
 * @param additionalClasses Additional classes to add to the button
 */
export function ccButton(
	name: FriendlyHtml,
	description?: FriendlyHtml | null,
	onClick?: null | (() => void),
	type?: "normal" | "warning" | "neato" | null,
	off?: boolean | null,
	additionalClasses?: string[]
): HTMLDivElement {
	const button = document.createElement("a")
	button.classList.add("option")
	if (type && type !== "normal") button.classList.add(type)
	if (off) button.classList.add("off")
	if (additionalClasses) button.classList.add(...additionalClasses)

	friendlyAppendHtml(name, button)

	button.addEventListener("click", () => {
		PlaySound("snd/tick.mp3")
		onClick?.()
	})

	const div = document.createElement("div")
	div.appendChild(button)

	if (description) {
		const label = document.createElement("label")
		friendlyAppendHtml(description, label, "span")
		div.appendChild(label)
	}

	return div
}

const sectionState: Record<string, boolean> = {}

/**
 * Creates a section which can be collapsed by a button
 * Note that you need to manually refresh the menu the section is in
 * @param keyname The id name reference to track if the
 * @param title The title of the section, which is never hidden
 * @param body The collapsible part of the section
 * @param onClick Called when the collapse button is clicked
 */
export function ccHideableSection(
	keyname: string,
	title: FriendlyHtml,
	body: FriendlyHtml,
	onClick?: (() => void) | null
): HTMLDivElement {
	const titleDiv = document.createElement("div")
	titleDiv.className = "title"

	if (typeof sectionState[keyname] === "undefined") sectionState[keyname] = true

	// From CCSE, which is from CM
	const showHideButton = document.createElement("span")
	showHideButton.style.cursor = "pointer"
	showHideButton.style.display = "inline-block"
	showHideButton.style.height = showHideButton.style.width = "14px"
	showHideButton.style.borderRadius = "7px"
	showHideButton.style.textAlign = "center"
	showHideButton.style.backgroundColor = "#C0C0C0"
	showHideButton.style.color = "black"
	showHideButton.style.fontSize = "13px"
	showHideButton.style.verticalAlign = "middle"
	showHideButton.style.marginRight = "13px"
	showHideButton.textContent = sectionState[keyname] ? "-" : "+"

	showHideButton.addEventListener("click", () => {
		sectionState[keyname] = !sectionState[keyname]
		onClick?.()
	})

	titleDiv.appendChild(showHideButton)

	friendlyAppendHtml(title, titleDiv, "span")

	const div = document.createElement("div")
	div.appendChild(titleDiv)
	if (sectionState[keyname]) friendlyAppendHtml(body, div)

	return div
}

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
