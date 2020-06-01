import { Icon } from "./gameType"
import master from "./vars"
import { loadUpgrade } from "./saves"
import { CommonValue } from "./helpers"

/**
 * The class for upgrades
 */
export class Upgrade extends window.Game.Upgrade {
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
		price: CommonValue<number>,
		icon: CommonValue<Icon>,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		buyFunc: () => void = (): void => {}
	) {
		if (!icon[2]) icon[2] = master.iconLink + ""
		super(
			name,
			typeof desc === "function" ? "" : desc,
			typeof price === "function" ? 0 : price,
			typeof icon === "function" ? [0, 0] : icon,
			buyFunc
		)
		if (typeof desc === "function") this.descFunc = desc
		if (typeof price === "function") this.priceFunc = price
		if (typeof icon === "function") this.iconFunction = icon
		master.customUpgrades.push(this)
		const loadProps = loadUpgrade(this)
		for (const i in loadProps) this[i] = loadProps[i]
	}
}

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
		desc: CommonValue<string>,
		price: CommonValue<number>,
		icon: CommonValue<Icon>,
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
			this.parents[i] = window.Game.Upgrades[me] || window.Game.UpgradesById[me]
		}
		window.Game.PrestigeUpgrades.push(this)
		window.Game.UpgradePositions[this.id] = position
	}
}

export class TieredUpgrade extends Upgrade {
	constructor(
		name: string,
		description: string,
		building: string,
		tier: string | number
	) {
		super(
			name,
			description,
			window.Game.Objects[building].basePrice * window.Game.Tiers[tier].price,
			window.Game.GetIcon(building, tier)
		)
		window.Game.SetTier(building, tier)
		this.buildingTie1 = window.Game.Objects[building]
		if (tier === "fortune") window.Game.Objects[building].fortune = this
		if (typeof tier === "number")
			this.order = (window.Game.Objects[building].id + 1) * 100 + tier
	}
}
