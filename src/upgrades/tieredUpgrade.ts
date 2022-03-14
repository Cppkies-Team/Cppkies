import { toSentenseCase } from "../helpers"
import { Upgrade } from "./baseUpgrade"
import { isFortune } from "./baseUpgrade"

export class TieredUpgrade<Tier extends string | number = string | number>
	extends Upgrade
	implements Game.TieredUpgradeClass<Tier>
{
	buildingTie: Game.Object
	buildingTie1: Game.Object
	tier: Tier
	pool: ""

	/**
	 * Creates a tiered upgrade
	 * @param name The name of the tiered upgrade
	 * @param quote The description of the upgrade
	 * @param building The building it boosts
	 * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
	 */
	constructor(
		name: string,
		quote: string,
		building: Game.Object | string,
		tier: Tier
	) {
		if (typeof building === "string") building = Game.Objects[building]
		super(
			name,
			`${toSentenseCase(
				building.plural
			)} are <b>twice</b> as efficient.<q>${quote}</q>`,
			building.basePrice * Game.Tiers[tier].price,
			Game.GetIcon(building.name, tier)
		)
		this.pool = ""
		this.tier = tier
		this.buildingTie = building
		building.tieredUpgrades[tier] = this

		this.buildingTie1 = building
		if (isFortune(this)) {
			this.order = 19000
			building.fortune = this
			Game.Tiers[tier].upgrades.push(this)
		}
		if (!isNaN(parseInt(tier.toString()))) {
			tier = parseInt(tier.toString()) as Tier
		}
		if (typeof tier === "number") {
			this.order = (building.id + 1) * 100 + this.id / 1000
			// Manually patch order since Orteil doesn't like consistency
			this.order -= Math.max(0, Math.min(building.id - 4, 3)) * 75
			if (building.id >= 8) this.order -= 75
		}

		building.buyFunction.apply(building)
	}
}
