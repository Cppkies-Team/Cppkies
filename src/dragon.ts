import { hasOwnProperty } from "./helpers"
import { customLoad, save, VANILLA_DRAGON_LEVEL_AMOUNT } from "./saves"
import { resolveIcon } from "./spritesheets"
import hooks from "./injects/basegame"
import { shouldRunVersioned } from "./injects/generic"
import { Mod, OwnershipUnit } from "./mods"
import { setUnitOwner } from "./vars"

export class DragonAura implements Game.DragonAura, OwnershipUnit {
	pic: Game.Icon
	isCppkies = true
	owner?: Mod
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
		setUnitOwner(this)
		if (typeof buildingOrIcon === "string")
			buildingOrIcon = Game.Objects[buildingOrIcon]
		if (buildingOrIcon instanceof Game.Object)
			this.pic = resolveIcon([
				buildingOrIcon.iconColumn,
				25,
				hasOwnProperty(buildingOrIcon, "iconLink") &&
				typeof buildingOrIcon.iconLink === "string"
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

export class DragonLevel implements Game.DragonLevel, OwnershipUnit {
	isCppkies = true
	owner?: Mod
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
		setUnitOwner(this)
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
		const buildingObject =
			typeof building === "string" ? Game.Objects[building] : building

		super(
			null,
			`Train ${auraName}<br/><small>Aura : ${auraDesc}</small>`,
			`100 ${buildingObject.plural}`,
			() => buildingObject.amount >= 100,
			() => buildingObject.sacrifice(100)
		)
	}
}

if (shouldRunVersioned(1)) {
	/**
	 * **Auras**
	 * Three levels of being loaded:
	 * 1. Not loaded
	 * The user can't manipulate Cppkies dragon data, has no aura if aura is custom
	 * 2. Cppkies loaded (here)
	 * When loaded with custom aura:
	 * a. If normal aura is none (has not been modified), keep it at that, but  keep  the custom aura data on save
	 * b. If normal aura is not none (has been modified), keep it at that, but remove the custom aura data on save
	 * 3. Aura loaded
	 * On aura creation, if aura id exists now, set the normal aura to the custom aura
	 */
	hooks.on("preSave", () => {
		if (Game.dragonAura !== 0) save.dragon.auras[0] = "sync"
		if (Game.dragonAura2 !== 0) save.dragon.auras[1] = "sync"

		if (Game.dragonAuras[Game.dragonAura] instanceof DragonAura) {
			save.dragon.auras[0] = Game.dragonAura
			Game.dragonAura = 0
		}
		if (Game.dragonAuras[Game.dragonAura2] instanceof DragonAura) {
			save.dragon.auras[1] = Game.dragonAura2
			Game.dragonAura2 = 0
		}
		if (
			Game.dragonLevels[Game.dragonLevel] instanceof DragonLevel ||
			Game.dragonLevel >= VANILLA_DRAGON_LEVEL_AMOUNT
		) {
			save.dragon.level = Game.dragonLevel
			while (
				Game.dragonLevels[Game.dragonLevel] instanceof DragonLevel ||
				Game.dragonLevel >= VANILLA_DRAGON_LEVEL_AMOUNT
			)
				Game.dragonLevel--
		} // else save.dragon.level = "sync"
	})
	hooks.on("postSave", () => {
		if (
			save.dragon.auras[0] !== "sync" &&
			Game.dragonAuras[save.dragon.auras[0]]
		)
			Game.dragonAura = save.dragon.auras[0]
		if (
			save.dragon.auras[1] !== "sync" &&
			Game.dragonAuras[save.dragon.auras[1]]
		)
			Game.dragonAura2 = save.dragon.auras[1]
		if (save.dragon.level !== "sync" && Game.dragonLevels[save.dragon.level])
			Game.dragonLevel = save.dragon.level
	})

	hooks.on("reset", () => {
		save.dragon.auras = ["sync", "sync"]
		save.dragon.level = "sync"
	})

	hooks.on("specialPic", pic => {
		const level = Game.dragonLevels[Game.dragonLevel]
		if (pic.tab === "dragon" && level instanceof DragonLevel)
			pic.pic = level.picLink ?? pic.pic
		return pic
	})
	customLoad.push(() => {
		if (
			save.dragon.level !== "sync" &&
			save.dragon.level <= Game.dragonLevels.length - 1
		)
			Game.dragonLevel = save.dragon.level
		if (
			save.dragon.auras[0] !== "sync" &&
			save.dragon.auras[0] <= Object.keys(Game.dragonAuras).length - 1
		)
			Game.dragonAura = save.dragon.auras[0]
		if (
			save.dragon.auras[1] !== "sync" &&
			save.dragon.auras[1] <= Object.keys(Game.dragonAuras).length - 1
		)
			Game.dragonAura2 = save.dragon.auras[1]
	})
}
