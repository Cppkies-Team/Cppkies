import { friendlyAppendHtml, FriendlyHtml } from "./appendHTML"

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
