import { ModSave, ModSavePartition, save } from "../saves"
import { CommonValue, localizeThing } from "../helpers"
import { resolveIcon } from "../spritesheets"
import { customUpgrades, setUnitOwner } from "../vars"
import { TieredUpgrade } from "./tieredUpgrade"
import { Mod, OwnershipUnit } from "../mods"

/**
 * The save type for an upgrade
 */
export interface UpgradeSave {
	unlocked: boolean
	bought: boolean
}

declare module "../saves" {
	export interface ModSave {
		upgrades?: Record<string, UpgradeSave>
	}
}

function loadUpgrade(save: ModSave, upgrade: Upgrade): void {
	const upgradeSave = save.upgrades?.[upgrade.name] || {
		bought: false,
		unlocked: false,
	}

	upgrade.unlocked = upgradeSave.unlocked ? 1 : 0
	upgrade.bought = upgradeSave.bought ? 1 : 0
	if (upgrade.bought && Game.CountsAsUpgradeOwned(upgrade.pool))
		Game.UpgradesOwned++
}

new ModSavePartition(
	"upgrades",
	1,
	"soft",
	(save, mod) => {
		for (const upgrade of customUpgrades) {
			if (upgrade.owner !== mod) continue
			if (!save.upgrades) save.upgrades = {}
			save.upgrades[upgrade.name] = {
				bought: !!upgrade.bought,
				unlocked: !!upgrade.unlocked,
			}
		}
	},
	(save, mod) => {
		if (!save.upgrades) return
		for (const upgrade of customUpgrades) {
			if (upgrade.owner !== mod) continue
			loadUpgrade(save, upgrade)
		}
	}
)

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
		localizeThing(this)
		setUnitOwner(this)
		if (typeof desc === "function") this.descFunc = desc
		if (typeof price === "function") this.priceFunc = price
		if (typeof icon === "function")
			this.iconFunction = () => resolveIcon(icon())
		customUpgrades.push(this)
		loadUpgrade(this.owner || save.foreign, this)

		Game.upgradesToRebuild = 1
	}
}
