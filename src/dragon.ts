import { hasOwnProperty } from "./helpers"
import { GlobalSavePartition, save, VANILLA_DRAGON_LEVEL_AMOUNT } from "./saves"
import { resolveIcon } from "./spritesheets"
import hooks from "./injects/basegame"
import { Mod, OwnershipUnit } from "./mods"
import { setUnitOwner } from "./vars"
import { shouldRunVersioned } from "./injects/generic"

/**
 * The save type for Krumblor
 */
interface DragonSave {
	level: number | null
	auras: [string | null, string | null]
}

declare module "./saves" {
	export interface SaveType {
		dragon?: DragonSave
	}
}

export class DragonAura implements Game.DragonAura, OwnershipUnit {
	pic: Game.Icon
	id: number
	owner?: Mod
	dname: string
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
		else this.pic = resolveIcon(buildingOrIcon)
		this.id = Object.keys(Game.dragonAuras).length
		Game.dragonAuras[this.id] = this
		this.dname = loc(this.name)
		if (save.dragon) {
			if (this.name === save.dragon.auras[0]) Game.dragonAura = this.id
			if (this.name === save.dragon.auras[1]) Game.dragonAura2 = this.id
		}
	}
}

export class DragonLevel implements Game.DragonLevel, OwnershipUnit {
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
	buy: () => void
	/**
	 * Creates a new dragon level
	 * @param name Name of the dragon at this level, `null` for the name of the dragon level before it (default)
	 * @param desc A string describing the effects of leveling up
	 * @param costDescription A string (or a function) describing the resources required to be able to buy the level
	 * @param canBuy A function which determines if it is possible to buy the level
	 * @param buy A function which spends the required resources
	 * @param icon  Icon of the dragon at this level, non-icon modes: `null` - Uses the icon of the dragon level before it (default), `"final"` - Uses the icon of final last dragon level
	 * @param order Position of the dragon level, non-number modes: `"final"` - Uses the icon of final last dragon level (default), `"aura-level"` - Sets the position to be right after the aura levels of the dragon
	 */
	constructor(
		name: string | null,
		desc: string, // `this.action`
		costDescription: string | (() => string), // `this.costStr`
		canBuy: () => boolean, // `this.cost`
		buy: () => void,
		icon: Game.Icon | null | "final" = null, // `this.pic`, `this.picLink`, and `this.picY`
		order: number | "aura-level" | "final" = "final"
	) {
		setUnitOwner(this)
		if (order === "aura-level")
			order =
				Game.dragonLevels.findIndex(
					val =>
						val.action === "Bake dragon cookie<br><small>Delicious!</small>"
				) - 1
		else if (order === "final") order = Game.dragonLevels.length
		const lastLevel = Game.dragonLevels[order - 1]
		this.name = name ?? lastLevel.name

		// Get the `action`, `costStr`, and `cost` of the last level
		this.action = lastLevel.action
		this.costStr = lastLevel.costStr
		this.cost = lastLevel.cost
		this.buy = lastLevel.buy
		// Give the last level the costs for this level
		lastLevel.action = desc
		lastLevel.costStr =
			typeof costDescription === "string"
				? () => costDescription
				: costDescription
		lastLevel.cost = canBuy
		lastLevel.buy = buy

		if (typeof icon === "object" && icon !== null) {
			this.pic = icon[0]
			this.picY = icon[1]
			// TODO: Implement pic Y in specials
			if (this.picY !== 0)
				console.warn("For now, all dragon levels must not use pic Y, sorry.")
			this.picLink = icon[2]
		} else if (icon === "final") {
			const finalLevel = Game.dragonLevels[Game.dragonLevels.length - 1]
			this.pic = finalLevel.pic
			if (finalLevel instanceof DragonLevel) {
				this.picY = finalLevel.picY
				this.picLink = finalLevel.picLink
			}
		} else {
			this.pic = lastLevel.pic
			if (lastLevel instanceof DragonLevel) {
				this.picY = lastLevel.picY
				this.picLink = lastLevel.picLink
			}
		}
		Game.dragonLevels.splice(order, 0, this)
		if (save.dragon)
			if (
				save.dragon.level !== null &&
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
			() => buildingObject.sacrifice(100),
			undefined,
			"aura-level"
		)
	}
}

const savePartition = new GlobalSavePartition(
	"dragon",
	1,
	"soft",
	() => {},
	() => {
		if (!save.dragon) return
		if (
			save.dragon.level !== null &&
			save.dragon.level <= Game.dragonLevels.length - 1
		)
			Game.dragonLevel = save.dragon.level
		const customAura1 = Object.keys(Game.dragonAuras).find(
			val =>
				//@ts-expect-error We already checked save.dragon's existence
				Game.dragonAuras[val as unknown as number].name === save.dragon.auras[0]
		)
		const customAura2 = Object.keys(Game.dragonAuras).find(
			val =>
				//@ts-expect-error We already checked save.dragon's existence

				Game.dragonAuras[val as unknown as number].name === save.dragon.auras[1]
		)
		if (customAura1) Game.dragonAura = parseInt(customAura1)
		if (customAura2) Game.dragonAura2 = parseInt(customAura2)
	}
)

if (savePartition.active) {
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
		if (!savePartition.active) return
		const aura1 = Game.dragonAuras[Game.dragonAura]
		const aura2 = Game.dragonAuras[Game.dragonAura2]
		const hasCustomLevel =
			Game.dragonLevels[Game.dragonLevel] instanceof DragonLevel ||
			Game.dragonLevel >= VANILLA_DRAGON_LEVEL_AMOUNT
		if (
			!(
				hasCustomLevel ||
				aura1 instanceof DragonAura ||
				aura2 instanceof DragonAura
			) &&
			!save.dragon
		)
			return
		if (!save.dragon) save.dragon = { auras: [null, null], level: null }
		if (Game.dragonAura !== 0) save.dragon.auras[0] = null
		if (Game.dragonAura2 !== 0) save.dragon.auras[1] = null

		if (aura1 instanceof DragonAura) {
			save.dragon.auras[0] = aura1.name
			Game.dragonAura = 0
		}

		if (aura2 instanceof DragonAura) {
			save.dragon.auras[1] = aura2.name
			Game.dragonAura2 = 0
		}

		if (hasCustomLevel) {
			save.dragon.level = Game.dragonLevel
			while (
				Game.dragonLevels[Game.dragonLevel] instanceof DragonLevel ||
				Game.dragonLevel >= VANILLA_DRAGON_LEVEL_AMOUNT
			)
				Game.dragonLevel--
		} // else save.dragon.level = "sync"
	})
	hooks.on("postSave", () => {
		if (!savePartition.active || !save.dragon) return
		const customAura1 = Object.keys(Game.dragonAuras).find(
			val =>
				//@ts-expect-error TS is wrong
				Game.dragonAuras[val as unknown as number].name === save.dragon.auras[0]
		)
		const customAura2 = Object.keys(Game.dragonAuras).find(
			val =>
				//@ts-expect-error TS is wrong
				Game.dragonAuras[val as unknown as number].name === save.dragon.auras[1]
		)
		if (customAura1) Game.dragonAura = parseInt(customAura1)
		if (customAura2) Game.dragonAura2 = parseInt(customAura2)
		if (save.dragon.level !== null && Game.dragonLevels[save.dragon.level])
			Game.dragonLevel = save.dragon.level
	})
}

if (shouldRunVersioned("dragonSpecObjPic"))
	hooks.on("specialPic", pic => {
		const level = Game.dragonLevels[Game.dragonLevel]
		if (pic.tab === "dragon" && level instanceof DragonLevel)
			pic.pic = level.picLink ?? pic.pic
		return { frame: pic.frame, pic: pic.pic }
	})
