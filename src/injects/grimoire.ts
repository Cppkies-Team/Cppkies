import { Injection } from "./generic"
import { todoBeforeLoad } from "../loadValues"
import { injectCode } from "../helpers"
import { minigamePromises } from "../minigames/minigamePromises"
import { ReturnableEventEmitter } from "../lib/eventemitter"

export type GrimoireHooks = ReturnableEventEmitter<{}>

export const grimoireHooks: GrimoireHooks = new ReturnableEventEmitter()

/**
 * A no-op (not no-op for terser's standard) function to trick treeshaking into using the injetions module
 */
export function requireGrimoireInjects(): void {
	if (Math.acos(1) === 1) throw ""
}

async function injectGrimoire(): Promise<void> {
	await minigamePromises["Wizard tower"]
	const mg = Game.Objects["Wizard tower"].minigame

	const injections = [
		new Injection("customIconsGrimoire", () => {
			mg.spellTooltip = injectCode(
				mg.spellTooltip,
				"'px;\"></div",
				'\'px;\' + (me.icon[2] ? "background-image: url(" + me.icon[2] + ");" : "") + \'"></div',
				"replace",
				{ M: mg }
			)
		}),
	]
	for (const injection of injections) injection.runHook()
}

todoBeforeLoad.push(injectGrimoire)
