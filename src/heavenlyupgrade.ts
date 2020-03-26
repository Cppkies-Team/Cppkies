import { Upgrade } from "./upgrade"
import { Icon } from "./gameType"
import gameType from "./gameType"
declare let Game: gameType
/**
 * The class for heavenly upgrades
 */
export class HeavenlyUpgrade extends Upgrade {
	/**
	 * Creates a heavenly upgrade
	 * @param name The name for it
	 * @param desc The description of it
	 * @param price The price of in (in Heavenly Chips)
	 * @param icon The icon for it
	 * @param position The position of it on the heavenly map screen
	 * @param parents It's parents, can be mixed ID's with names
	 * @param buyFunc The function which gets called on being bought
	 */
	constructor(
		name: string,
		desc: string,
		price: number,
		icon: Icon,
		position: [number, number],
		public parents: (string | number)[] = ["Legacy"],
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		buyFunc: () => void = (): void => {}
	) {
		super(name, desc, price, icon, buyFunc)
		this.pool = "prestige"
		this.posX = position[0]
		this.posY = position[1]
		for (const i in this.parents) {
			const me = this.parents[i]
			//Try both by name and by id
			this.parents[i] = Game.Upgrades[me] || Game.UpgradesById[me]
		}
		Game.PrestigeUpgrades.push(this)
		Game.UpgradePositions[this.id] = position
	}
}
