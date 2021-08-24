import { loadUpgrade } from "../saves"
import { applyAllProps, CommonValue } from "../helpers"
import { resolveIcon } from "../spritesheets"
import { customUpgrades, setUnitOwner } from "../vars"
import { TieredUpgrade } from "./tieredUpgrade"
import { Mod, OwnershipUnit } from "../mods"

// This file splitting is for the ebic treeshaking

export function isFortune(
	upgrade: TieredUpgrade
): upgrade is TieredUpgrade<"fortune"> {
	return upgrade.tier === "fortune"
}

/**
 * The class for upgrades
 */
export class Upgrade extends Game.Upgrade implements OwnershipUnit {
	owner?: Mod
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
		setUnitOwner(this)
		if (typeof desc === "function") this.descFunc = desc
		if (typeof price === "function") this.priceFunc = price
		if (typeof icon === "function")
			this.iconFunction = () => resolveIcon(icon())
		customUpgrades.push(this)
		const loadProps = loadUpgrade(this)
		applyAllProps(this, loadProps)
		Game.upgradesToRebuild = 1
		if (this.bought && Game.CountsAsUpgradeOwned(this.pool))
			Game.UpgradesOwned++
	}
}
