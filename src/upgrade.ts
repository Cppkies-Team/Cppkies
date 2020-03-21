import gameType, { Icon } from "./gameType"
import master from "./vars"
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
		/*
		if (CCSE.save.Upgrades[name]) {
			me.unlocked = CCSE.save.Upgrades[name].unlocked
			me.bought = CCSE.save.Upgrades[name].bought
		} else {
			CCSE.save.Upgrades[name] = {
				unlocked: 0,
				bought: 0,
			}
		}
		*/
	}
}
