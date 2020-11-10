import master from "../vars"

export default function postInject(): void {
	master.hooks.customGetIcon.push(
		(_type: string, tier: string | number, icon: Game.Icon) => {
			master.customTiers.forEach(val => {
				if (val.keyName === tier.toString() && val.iconLink)
					icon[2] = val.iconLink
			})
			return icon
		},
		(type: string, _tier: string | number, icon: Game.Icon) => {
			master.customBuildings.forEach(val => {
				if (val.name === type && val.iconLink) icon[2] = val.iconLink
			})
			return icon
		}
	)
}
