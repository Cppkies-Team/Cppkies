import { CommonValue, toSentenseCase } from "../helpers"

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
	constructor(
		spiritName: string,
		spiritTitle: string,
		public icon: Game.Icon,
		descriptions: Partial<
			Record<1 | 2 | 3 | "before" | "after", string> &
				Record<"active", () => string>
		>,
		public quote: string,
		fullName?: string
	) {
		if (!Game.Objects.Temple.minigameLoaded)
			throw new Error("The pantheon minigame has not loaded yet!")
		const mg = Game.Objects.Temple.minigame
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
			if (ev.button === 0) mg.dragGod(this)
		})
		godDragDiv.addEventListener("mouseup", ev => {
			if (ev.button === 0) mg.dropGod()
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
	}
}
