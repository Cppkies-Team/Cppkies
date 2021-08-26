import { MinigameInjection, setMinigameInjection } from "./generic"
import { ReturnableEventEmitter } from "../lib/eventemitter"
import { deffer } from "../loadValues"
import { injectCode } from "../helpers"

function injectPantheon(): void {
	const mg = Game.Objects.Temple.minigame
	setMinigameInjection(mg)
	const injections = [
		new MinigameInjection("customIcons", 1, () => {
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
	setMinigameInjection()
}

deffer.then(injectPantheon)
