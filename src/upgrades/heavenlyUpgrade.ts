import { CommonValue } from "../helpers"
import { Upgrade } from "./baseUpgrade"
/**
 * The class for heavenly upgrades
 */
export class HeavenlyUpgrade extends Upgrade implements Game.HeavenlyUpgrade {
	posX: number
	posY: number

	pool = "prestige" as const
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
		desc: CommonValue<string>,
		price: CommonValue<number>,
		icon: CommonValue<Game.Icon>,
		position: [number, number],
		parents: (string | number)[] = ["Legacy"],
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		buyFunc: () => void = (): void => {}
	) {
		super(name, desc, price, icon, buyFunc)

		this.posX = position[0]
		this.posY = position[1]

		this.parents = parents.map(id =>
			typeof id === "number" ? Game.UpgradesById[id] : Game.Upgrades[id]
		)

		Game.PrestigeUpgrades.push(this)
		Game.UpgradePositions[this.id] = position
	}
}
