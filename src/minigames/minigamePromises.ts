import { injectCode } from "../helpers"

const actualMinigamePromises: Record<string, Promise<void>> = {}
const waitingForLoadResolves: Record<string, () => void> = {}

declare global {
	interface Window {
		__CPPKIES_MINIGAME_PROMISES_MARK__: (name: string) => void
	}
}

window.__CPPKIES_MINIGAME_PROMISES_MARK__ = name => {
	if (waitingForLoadResolves[name]) {
		waitingForLoadResolves[name]()
		delete waitingForLoadResolves[name]
	}
}
Game.LoadMinigames = injectCode(
	Game.LoadMinigames,
	"document.head.appendChild(script);",
	"\n__CPPKIES_MINIGAME_PROMISES_MARK__(me.name);",
	"after"
)

/**
 * An object which has promises for when a building minigame loads
 */
export const minigamePromises = new Proxy(actualMinigamePromises, {
	get(target, p): Promise<void> {
		if (typeof p === "symbol") throw new Error(`No such building as [symbol]!`)
		if (target[p]) return target[p]
		const building = Game.Objects[p]
		if (!building) throw new Error(`No such building as ${p}!`)
		if (building.minigameLoaded) {
			return (target[p] = Promise.resolve())
		}
		const mgScript = document.querySelector<HTMLScriptElement>(
			"#minigameScript-" + building.id
		)
		if (mgScript)
			target[p] = new Promise<void>((res, rej) => {
				mgScript.addEventListener("load", () => res())
				mgScript.addEventListener("error", rej)
			})
		else
			target[p] = new Promise<void>((res, rej) => {
				waitingForLoadResolves[p] = () => {
					const mgScript = document.querySelector<HTMLScriptElement>(
						"#minigameScript-" + building.id
					)
					if (mgScript) {
						mgScript.addEventListener("load", () => res())
						mgScript.addEventListener("error", rej)
					}
				}
			})
		return target[p]
	},
})
