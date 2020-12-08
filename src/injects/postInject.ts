import { hasOwnProperty } from "../helpers"
import master from "../vars"

export default function postInject(): void {
	master.hooks.on("getIcon", ({ icon, type, tier }) => {
		master.customTiers.forEach(val => {
			if (val.keyName === tier.toString() && val.iconLink)
				icon[2] = val.iconLink
		})
		return { icon, type, tier }
	})
	master.hooks.on("getIcon", ({ icon, type, tier }) => {
		master.customBuildings.forEach(val => {
			if (val.name === type && val.iconLink) icon[2] = val.iconLink
		})
		return { icon, tier, type }
	})
	master.hooks.on("getIcon", ({ icon, type, tier }) => {
		if (!hasOwnProperty(Game.Tiers[tier.toString()], "iconLink")) {
			icon[2] = ""
		}
		return { icon, tier, type }
	})
}
