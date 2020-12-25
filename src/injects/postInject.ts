import { DragonAura, DragonLevel } from "../dragon"
import { hasOwnProperty } from "../helpers"
import { save, VANILLA_DRAGON_LEVEL_AMOUNT } from "../saves"
import master from "../vars"

export default function postInject(): void {
	master.on("getIcon", ({ icon, type, tier }) => {
		master.customTiers.forEach(val => {
			if (val.keyName === tier.toString() && val.iconLink)
				icon[2] = val.iconLink
		})
		return { icon, type, tier }
	})
	master.on("getIcon", ({ icon, type, tier }) => {
		master.customBuildings.forEach(val => {
			if (val.name === type && val.iconLink) icon[2] = val.iconLink
		})
		return { icon, tier, type }
	})
	master.on("getIcon", ({ icon, type, tier }) => {
		if (
			(icon[2] === undefined || icon[2] === null) &&
			!hasOwnProperty(Game.Tiers[tier.toString()], "iconLink")
		)
			icon[2] = ""
		return { icon, tier, type }
	})
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
	master.on("preSave", () => {
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
	master.on("postSave", () => {
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

	master.on("reset", () => {
		save.dragon.auras = ["sync", "sync"]
		save.dragon.level = "sync"
	})

	master.on("specialPic", pic => {
		const level = Game.dragonLevels[Game.dragonLevel]
		if (pic.tab === "dragon" && level instanceof DragonLevel)
			pic.pic = level.picLink ?? pic.pic

		return pic
	})
}
