import { friendlyAppendHtml, FriendlyHtml } from "./appendHTML"

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
