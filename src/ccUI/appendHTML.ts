import { getValue, CommonValue } from "../helpers"

export type FriendlyHtml = CommonValue<string | HTMLElement>

export function friendlyAppendHtml(
	value: FriendlyHtml,
	element: HTMLElement,
	containerName?: string | null
): void {
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
