import { toSentenseCase } from "../helpers"
import { Upgrade } from "./baseUpgrade"
export class SynergyUpgrade<Tier extends string> extends Upgrade
	implements Game.SynergyUpgradeClass<Tier> {
	buildingTie1: Game.Object
	buildingTie2: Game.Object
	tier: Tier
	pool: ""
	/**
	 * Creates a synergy upgrade
	 * @param name The name for the upgrade
	 * @param quote The flavor text for it
	 * @param building1 The first building, note that the icon will be inherited from this
	 * @param building2 The second building
	 * @param tier The upgrade's tier, is the id of the tier, ex. `synergy1`(Synergy I), `synergy2`(Synergy II), etc. **Warning: The tier must have a req field**
	 */
	constructor(
		name: string,
		quote: string,
		building1: Game.Object | string,
		building2: Game.Object | string,
		tier: Tier
	) {
		if (typeof building1 === "string") building1 = Game.Objects[building1]
		if (typeof building2 === "string") building2 = Game.Objects[building2]
		const icon = Game.GetIcon(building1.name, tier)
		// Swap
		if (building1.basePrice > building2.basePrice) {
			const temp = building1
			building1 = building2
			building2 = temp
		}
		super(
			name,
			`${toSentenseCase(
				building1.plural
			)} gain <b>+5% CpS</b> per ${building2.name.toLowerCase()}.<br>${toSentenseCase(
				building2.plural
			)} gain <b>+0.1% CpS</b> per 
			${building1.name.toLowerCase()}.<q>${quote}</q>`,
			(building1.basePrice * 10 + building2.basePrice * 1) *
				Game.Tiers[tier].price,
			icon
		)
		this.pool = ""
		this.tier = tier
		this.buildingTie1 = building1
		this.buildingTie2 = building2
		this.order = 5000 + this.id / 1000
		building1.synergies.push(this)
		building2.synergies.push(this)
		Game.Tiers[tier].upgrades.push(this)
		building1.buyFunction.apply(building1)
	}
}
