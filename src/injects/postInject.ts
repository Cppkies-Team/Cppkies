import master from "../vars"
import { Icon } from "../gameType"

export default function postInject(): void {
	master.hooks.customGetIcon.push(
		(_type: string, tier: string | number, icon: Icon) => {
			master.customTiers.forEach(val => {
				if (val.keyName === tier.toString() && val.iconLink)
					icon[2] = val.iconLink
			})
			return icon
		}
	)
}
