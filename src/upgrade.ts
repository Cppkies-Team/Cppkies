import gameType, { Icon } from "./gameType"
import master from "./vars"
import { loadUpgrade } from "./saves"
import { CommonValue } from "./helpers"
declare let Game: gameType

/**
 * The class for upgrades
 */
export class Upgrade extends Game.Upgrade {
	/**
	 * Creates an upgrade
	 * @param name The name of the upgrade
	 * @param desc The description of it
	 * @param price The price of it
	 * @param icon  The icon for it
	 * @param buyFunc The function that gets called when you buy the upgrade
	 */
	constructor(
		name: string,
		desc: CommonValue<string>,
		price: number,
		icon: Icon,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		buyFunc: () => void = (): void => {}
	) {
		if (!icon[2]) icon[2] = master.iconLink + ""
		super(name, typeof desc === "function" ? "" : desc, price, icon, buyFunc)
		if (typeof desc === "function") {
			this.descFunc = desc
		}
		master.customUpgrades.push(this)
		const loadProps = loadUpgrade(this)
		for (const i in loadProps) this[i] = loadProps[i]
	}
}
