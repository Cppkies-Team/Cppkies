import { CommonValue } from "../helpers"
import { requireGrimoireInjects } from "../injects/grimoire"
import { Mod, OwnershipUnit } from "../mods"
import { setUnitOwner } from "../vars"
import { minigamePromises } from "./minigamePromises"

requireGrimoireInjects()

let mg: typeof Game.Objects["Wizard tower"]["minigame"] | undefined

minigamePromises["Wizard tower"].then(
	() => (mg = Game.Objects["Wizard tower"].minigame)
)

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

export class Spell implements Game.GrimoireSpell, OwnershipUnit {
	/**
	 * If set, the fail chance is overwritten with the result of the function
	 *
	 * (This is actually a vanilla cookie clicker type, but the typings missed it, whoops)
	 */
	failFunc?: (failChance: number) => number
	/**
	 * If true, this spell doesn't count for the total spell count
	 *
	 * (This is actually a vanilla cookie clicker type, but the typings missed it, whoops)
	 */
	passthrough?: boolean
	owner?: Mod
	costPercent?: number
	id: number
	/**
	 * @param costMult The cost of the spell, in raw multiplier of max mana (added to `costMin`)
	 * @param win Called when the spell is casted.
	 *
	 * -1 means that the spell's requirements were failed, the spell's cost will be refunded
	 */
	constructor(
		name: string,
		icon: Game.Icon,
		costMin: number,
		costMult: number | null,
		desc: string,
		win: () => void | -1
	)
	/**
	 * @param costMult The cost of the spell, in raw multiplier of max mana (added to `costMin`)
	 * @param win Called when the spell succeeds.
	 *
	 * -1 means that the spell's requirements were failed, the spell's cost will be refunded
	 * @param fail Called when the spell backfires.
	 *
	 * -1 means that the spell's requirements were failed, the spell's cost will be refunded
	 */
	constructor(
		name: string,
		icon: Game.Icon,
		costMin: number,
		costMult: number | null,
		desc: string,
		win: () => void | -1,
		failDesc: string,
		fail: () => void | -1
	)
	constructor(
		public name: string,
		public icon: Game.Icon,
		public costMin: number,
		costMult: number | null,
		public desc: string,
		public win: () => void | -1,
		public failDesc?: string,
		public fail?: () => void | -1
	) {
		setUnitOwner(this)
		if (!mg) throw new Error("The grimoire minigame has not loaded yet!")
		if (costMult) this.costPercent = costMult
		this.id = mg.spellsById.length
		mg.spells[name.toLowerCase()] = mg.spellsById[this.id] = this
		const grimoreSpells = document.querySelector("#grimoireSpells")
		const spellDiv = document.createElement("div")
		spellDiv.classList.add("grimoireSpell", "titleFont")
		spellDiv.id = "grimoireSpell" + this.id
		attachTooltip(spellDiv, mg.spellTooltip(this.id), "this")
		spellDiv.addEventListener("click", () => mg && mg.castSpell(this))
		const grimoireIconDiv = document.createElement("div")
		grimoireIconDiv.classList.add("usesIcon", "shadowFilter", "grimoireIcon")
		grimoireIconDiv.style.backgroundPosition = `${-icon[0] * 48}px ${
			-icon[1] * 48
		}px`
		if (icon[2]) grimoireIconDiv.style.backgroundImage = `url(${icon[2]})`
		spellDiv.appendChild(grimoireIconDiv)
		const grimoirePriceDiv = document.createElement("div")
		grimoirePriceDiv.classList.add("grimoirePrice")
		grimoirePriceDiv.id = "grimoirePrice" + this.id
		spellDiv.appendChild(grimoirePriceDiv)
		grimoreSpells?.appendChild(spellDiv)
	}
}
