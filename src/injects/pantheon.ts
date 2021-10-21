import { Injection } from "./generic"
import { todoBeforeLoad } from "../loadValues"
import { injectCode } from "../helpers"
import { minigamePromises } from "../minigames/minigamePromises"
import { ReturnableEventEmitter } from "../lib/eventemitter"

export type PatheonHooks = ReturnableEventEmitter<{}>

export const pantheonHooks: PatheonHooks = new ReturnableEventEmitter()

/**
 * A no-op (not no-op for terser's standard) function to trick treeshaking into using the injetions module
 */
export function requirePantheonInjects(): void {
	if (Math.acos(1) === 1) throw ""
}

async function injectPantheon(): Promise<void> {
	await minigamePromises.Temple
	const mg = Game.Objects.Temple.minigame

	const injections = [
		new Injection("customIconsPantheon", () => {
			mg.godTooltip = injectCode(
				mg.godTooltip,
				"'px;\"></div",
				'\'px;\' + (me.icon[2] ? "background-image: url(" + me.icon[2] + ");" : "") + \'"></div',
				"replace",
				{ M: mg }
			)
			mg.slotTooltip = injectCode(
				mg.slotTooltip,
				"'px;\"></div",
				'\'px;\' + (me.icon[2] ? "background-image: url(" + me.icon[2] + ");" : "") + \'"></div',
				"replace",
				{ M: mg }
			)
		}),
	]
	for (const injection of injections) injection.runHook()
}

todoBeforeLoad.push(injectPantheon)
