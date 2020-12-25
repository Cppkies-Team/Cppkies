import { Building } from "./buildings"
import { save } from "./saves"
import { resolveIcon } from "./spritesheets"

export class DragonAura implements Game.DragonAura {
	pic: Game.Icon
	/**
	 * Creates a (non-building) dragon aura
	 * @param name Name of the dragon aura (in HTML text)
	 * @param desc Description of it (in HTML text)
	 * @param icon The icon of it
	 */
	constructor(name: string, desc: string, icon: Game.Icon)
	/**
	 * Creates a (building) dragon aura
	 * @param name Name of the dragon aura (in HTML text)
	 * @param desc Description of it (in HTML text)
	 * @param building The building (name or object) to link the aura to
	 */
	constructor(name: string, desc: string, building: string | Game.Object)
	constructor(
		public name: string,
		public desc: string,
		buildingOrIcon: string | Game.Object | Game.Icon
	) {
		if (typeof buildingOrIcon === "string")
			buildingOrIcon = Game.Objects[buildingOrIcon]
		if (buildingOrIcon instanceof Game.Object)
			this.pic = resolveIcon([
				buildingOrIcon.iconColumn,
				25,
				buildingOrIcon instanceof Building
					? buildingOrIcon.iconLink
					: undefined,
			])
		else this.pic = buildingOrIcon
		Game.dragonAuras[Object.keys(Game.dragonAuras).length] = this
		if (
			save.dragon.auras[0] !== "sync" &&
			Object.keys(Game.dragonAuras).length >= save.dragon.auras[0]
		)
			Game.dragonAura = save.dragon.auras[0]
		if (
			save.dragon.auras[1] !== "sync" &&
			Object.keys(Game.dragonAuras).length >= save.dragon.auras[1]
		)
			Game.dragonAura2 = save.dragon.auras[1]
	}
}

export class DragonLevel implements Game.DragonLevel {
	/**
	 * The X position of the dragon icon
	 */
	pic: number
	/**
	 * The Y position of the dragon icon
	 */
	picY = 0
	/**
	 * The link to the dragon icon
	 */
	picLink?: string
	// Dragon name
	name: string
	// Description of the cost
	costStr: () => string
	// Determines if the level can be upgraded
	cost: () => boolean

	// Description of effects of leveling up
	action: string
	/**
	 * Creates a new dragon level
	 * @param name Name of the dragon at this level, null for last name
	 * @param desc A string describing the effects of leveling up
	 * @param costDescription A string (or a function) describing the resources required to be able to buy the level
	 * @param canBuy A function which determines if it is possible to buy the level
	 * @param buy A function which spends the required resources
	 * @param icon  Icon of the dragon at this level, null for last icon, note that the icon is 96x96, not 48x48
	 */
	constructor(
		name: string | null,
		desc: string, // `this.action`
		costDescription: string | (() => string), // `this.costStr`
		canBuy: () => boolean, // `this.cost`
		public buy: () => void,
		icon?: Game.Icon | null, // `this.pic`, `this.picLink`, and `this.picY`
		order: number = Game.dragonLevels.length - 3
	) {
		const lastLevel = Game.dragonLevels[order - 1]
		this.name = name ?? lastLevel.name
		this.action = desc
		this.costStr =
			typeof costDescription === "string"
				? () => costDescription
				: costDescription
		this.cost = canBuy
		if (icon) {
			this.pic = icon[0]
			this.picY = icon[1]
			// TODO: Implement pic Y in specials
			if (this.picY !== 0)
				console.warn("For now, all dragon levels must not use pic Y, sorry.")
			this.picLink = icon[2]
		} else {
			this.pic = lastLevel.pic
			if (lastLevel instanceof DragonLevel) {
				this.picY = lastLevel.picY
				this.picLink = lastLevel.picLink
			}
		}
		Game.dragonLevels.splice(order, 0, this)
		if (
			save.dragon.level !== "sync" &&
			Game.dragonLevels.length >= save.dragon.level
		)
			Game.dragonLevel = save.dragon.level
	}
}

export class DragonAuraLevel extends DragonLevel {
	/**
	 * Creates a level which unlocks an aura
	 * @param auraName Name of the aura
	 * @param auraDesc Short description of the aura, in html text
	 * @param building The building which the aura is tied to
	 */
	constructor(
		auraName: string,
		auraDesc: string,
		building: string | Game.Object
	) {
		if (typeof building === "string") building = Game.Objects[building]

		super(
			null,
			`Train ${auraName}<br/><small>Aura : ${auraDesc}</small>`,
			`100 ${building.plural}`,
			// Grr typescript
			() => (building as Game.Object).amount >= 100,
			() =>
				(building as Game.Object & {
					sacrifice: (amount: number) => void // I made a typo, sorry
				}).sacrifice(100)
		)
	}
}
