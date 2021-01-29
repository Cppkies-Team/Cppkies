import { DragonAura, DragonLevel } from "../dragon"
import { hasOwnProperty } from "../helpers"
import hooks from "./basegame"
import { customBuildings, customTiers } from "../vars"

hooks.on("getIcon", ({ icon, type, tier }) => {
	customTiers.forEach(val => {
		if (val.keyName === tier.toString() && val.iconLink) icon[2] = val.iconLink
	})
	return { icon, type, tier }
})
hooks.on("getIcon", ({ icon, type, tier }) => {
	customBuildings.forEach(val => {
		if (val.name === type && val.iconLink) icon[2] = val.iconLink
	})
	return { icon, tier, type }
})
hooks.on("getIcon", ({ icon, type, tier }) => {
	if (
		(icon[2] === undefined || icon[2] === null) &&
		!hasOwnProperty(Game.Tiers[tier.toString()], "iconLink")
	)
		icon[2] = ""
	return { icon, tier, type }
})
