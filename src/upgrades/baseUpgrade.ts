import { loadUpgrade } from "../saves"
import { CommonValue } from "../helpers"
import { resolveIcon } from "../spritesheets"
import { customUpgrades } from "../vars"
import { TieredUpgrade } from "./tieredUpgrade"

// This file splitting is for the ebic treeshaking

export function isFortune(
	upgrade: TieredUpgrade
): upgrade is TieredUpgrade<"fortune"> {
	return upgrade.tier === "fortune"
}

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
		price: CommonValue<number>,
		icon: CommonValue<Game.Icon>,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		buyFunc: () => void = (): void => {}
	) {
		super(
			name,
			typeof desc === "function" ? "" : desc,
			typeof price === "function" ? 0 : price,
			typeof icon === "function" ? [0, 0] : resolveIcon(icon),
			buyFunc
		)

		if (typeof desc === "function") this.descFunc = desc
		if (typeof price === "function") this.priceFunc = price
		if (typeof icon === "function")
			this.iconFunction = () => resolveIcon(icon())
		customUpgrades.push(this)
		const loadProps = loadUpgrade(this)
		for (const i in loadProps) this[i] = loadProps[i]
		Game.upgradesToRebuild = 1
		if (this.bought && Game.CountsAsUpgradeOwned(this.pool))
			Game.UpgradesOwned++
	}
}
