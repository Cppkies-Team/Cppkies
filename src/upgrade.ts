import gameType, { Icon } from "./gameType"
import master from "./vars"
import { loadUpgrade } from "./saves"
declare let Game: gameType

export class Upgrade extends Game.Upgrade {
	constructor(
		name: string,
		desc: string,
		price: number,
		icon: Icon,
		buyFunc: () => void
	) {
		if (!icon[2]) icon[2] = master.iconLink + ""
		super(name, desc, price, icon, buyFunc)
		master.customUpgrades.push(this)
		const loadProps = loadUpgrade(this)
		for (const i in loadProps) this[i] = loadProps[i]
	}
}
