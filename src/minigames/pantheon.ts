import { CommonValue, toSentenseCase } from "../helpers"
import hooks from "../injects/basegame"
import { shouldRunVersionedMinigame } from "../injects/generic"
import { save } from "../saves"
import { minigamePromises } from "./minigamePromises"

let mg: typeof Game.Objects.Temple.minigame | undefined

minigamePromises.Temple.then(() => (mg = Game.Objects.Temple.minigame))

/**
 * Same as mg.slotGod, but also changes the visual state
 */
export function slotGod(god: Spirit, slot: -1 | 0 | 1 | 2): void {
	if (!mg) throw new Error("The pantheon minigame has not loaded yet!")
	const slottedGod = document.querySelector<HTMLElement>("#templeGod" + god.id)
	if (!slottedGod) return
	slottedGod.className = "ready templeGod titleFont"
	slottedGod.style.transform = "none"
	if (slot !== -1) {
		const previousGod = mg.godsById[mg.slot[slot]],
			templeSlot = document.querySelector("#templeSlot" + slot)
		if (previousGod) {
			const previousGodDiv = document.querySelector<HTMLElement>(
				"#templeGod" + previousGod.id
			)
			if (!previousGodDiv) return
			if (god.slot !== -1)
				document
					.querySelector("#templeSlot" + god.slot)
					?.appendChild(previousGodDiv)
			else {
				const previousGodPlaceholder = document.querySelector(
					"#templeGodPlaceholder" + previousGod.id
				)
				if (previousGodPlaceholder)
					previousGodPlaceholder.parentNode?.insertBefore(
						previousGodDiv,
						previousGodPlaceholder
					)
			}
		}
		if (templeSlot) templeSlot.appendChild(slottedGod)
	} else {
		const godPlaceholder = document.querySelector<HTMLElement>(
			"#templeGodPlaceholder" + god.id
		)
		if (godPlaceholder) {
			godPlaceholder.parentNode?.insertBefore(slottedGod, godPlaceholder)
			godPlaceholder.style.display = "none"
		}
	}
	mg.slotGod(god, slot)
}

function attachTooltip(
	element: HTMLElement,
	text: CommonValue<string>,
	origin?: Game.TooltipOrigins
): void {
	element.addEventListener("mouseover", () => {
		Game.tooltip.dynamic = typeof text === "function" ? 1 : 0
		Game.tooltip.draw(element, text, origin)
		Game.tooltip.wobble()
	})
	element.addEventListener("mouseout", () => (Game.tooltip.shouldHide = 1))
}

export class Spirit implements Game.PantheonSpirit {
	activeDescFunc?: () => string
	desc1?: string
	desc2?: string
	desc3?: string
	descAfter?: string
	descBefore?: string
	id: number
	name: string
	slot: 0 | 2 | 1 | -1 = -1
	quote: string
	constructor(
		spiritName: string,
		spiritTitle: string,
		public icon: Game.Icon,
		descriptions: Partial<
			Record<1 | 2 | 3 | "before" | "after", string> &
				Record<"active", () => string>
		>,
		quote?: string,
		fullName?: string
	) {
		if (!mg) throw new Error("The pantheon minigame has not loaded yet!")
		if (quote) this.quote = quote
		// @ts-expect-error I messed up the typings, here
		else this.quote = undefined
		if (fullName) this.name = fullName
		else
			this.name = `${toSentenseCase(spiritName)}, Spirit of ${toSentenseCase(
				spiritTitle
			)}`
		if (descriptions) {
			if (descriptions[1]) this.desc1 = descriptions[1]
			if (descriptions[2]) this.desc2 = descriptions[2]
			if (descriptions[3]) this.desc3 = descriptions[3]
			if (descriptions.before) this.descBefore = descriptions.before
			if (descriptions.after) this.descAfter = descriptions.after
			if (descriptions.active) this.activeDescFunc = descriptions.active
		}
		this.id = mg.godsById.length
		mg.godsById.push(this)
		mg.gods[spiritTitle] = this
		const godDiv = document.createElement("div")
		godDiv.classList.add(
			"ready",
			"templeGod",
			"templeGod" + (this.id % 4),
			"titleFont"
		)
		godDiv.id = "templeGod" + this.id
		attachTooltip(godDiv, mg.godTooltip(this.id), "this")
		const godIconDiv = document.createElement("div")
		godIconDiv.classList.add("usesIcon", "shadowFilter", "templeIcon")
		godIconDiv.style.backgroundPosition = `${-icon[0] * 48}px ${-icon[1] *
			48}px`
		if (icon[2]) godIconDiv.style.backgroundImage = `url(${icon[2]})`
		godDiv.appendChild(godIconDiv)
		const godDragDiv = document.createElement("div")
		godDragDiv.classList.add("templeSlotDrag")
		godDragDiv.id = "templeGodDrag" + this.id
		godDragDiv.addEventListener("mousedown", ev => {
			if (ev.button === 0 && mg) mg.dragGod(this)
		})
		godDragDiv.addEventListener("mouseup", ev => {
			if (ev.button === 0 && mg) mg.dropGod()
		})
		godDiv.appendChild(godDragDiv)
		const godPlaceholder = document.createElement("div")
		godPlaceholder.classList.add("templeGodPlaceholder")
		godPlaceholder.id = "templeGodPlaceholder" + this.id
		const godsDiv = document.querySelector("#templeGods")
		if (godsDiv) {
			godsDiv.appendChild(godDiv)
			godsDiv.appendChild(godPlaceholder)
		}
		if (save.minigames?.pantheon)
			for (const slot in mg.slotNames)
				if (save.minigames.pantheon.slots[slot] === this.id)
					slotGod(this, parseInt(slot) as 0 | 1 | 2)
	}
}

export interface PantheonSave {
	slots: (number | "sync")[]
}

declare module "../saves" {
	export interface SpecififcMinigameSaves {
		pantheon?: PantheonSave
	}
}

// This is like the same thing as dragon auras
if (shouldRunVersionedMinigame("Pantheon", 1)) {
	hooks.on("preSave", () => {
		if (!mg) return
		if (!save.minigames) save.minigames = {}
		if (!save.minigames.pantheon) save.minigames.pantheon = { slots: [] }
		for (const slot in mg.slotNames) {
			if (mg.slot[slot] !== -1) save.minigames.pantheon.slots[slot] = "sync"
			if (mg.godsById[mg.slot[slot]] instanceof Spirit) {
				save.minigames.pantheon.slots[slot] = mg.slot[slot]
				mg.slot[slot] = -1
			}
		}
	})
	hooks.on("postSave", () => {
		if (!mg) return
		if (!save.minigames?.pantheon) return
		for (const slot in mg.slotNames) {
			const slotSaved = save.minigames.pantheon.slots[slot]
			if (slotSaved !== undefined && slotSaved !== "sync")
				mg.slot[slot] = slotSaved
		}
	})

	hooks.on("reset", () => {
		if (!save.minigames?.pantheon) return
		save.minigames.pantheon.slots = []
	})
}
