import { Upgrade } from "./baseUpgrade"
import hooks from "../injects/basegame"
import { buildingHooks } from "../injects/buildings"
/**
 * Early cursor logs which don't follow any pattern
 */
const cursorEarlyLogs = [5, 7, 8, 9, 10]

export class CursorUpgrade<Tier extends string | number>
	extends Upgrade
	implements Game.GenericTieredUpgrade<Tier>
{
	pool: ""
	tier: Tier
	/**
	 * Creates an upgrade which powers up the Thousand Fingers upgrade
	 * @param name Name of the upgrade
	 * @param quote Quote (flavour text) of it
	 * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
	 * @param power The multiplier of of thousand fingers, if omitted, 20 by default, which is the multiplier of later cursor upgrades
	 */
	constructor(name: string, quote: string, tier: Tier, power = 20) {
		const building = Game.Objects.Cursor
		const tierPow = parseInt(tier.toString())
		super(
			name,
			`Multiplies the gain from Thousand fingers by <b>${power}</b>.<q>${quote}</q>`,
			Game.Tiers[tier].special || isNaN(tierPow)
				? building.basePrice * Game.Tiers[tier].price
				: // Calculate the cursor price
				  10 **
						// Early logs kinda don't really follow anything
						(cursorEarlyLogs[
							// Get the latest one
							Math.min(tierPow - 4, cursorEarlyLogs.length - 1)
						] +
							// The normal *10^3 for all other stuffs
							Math.max(tierPow - 8, 0) * 3),
			Game.GetIcon(building.name, tier)
		)
		this.tier = tier
		this.pool = ""
		this.order = 100 + this.id / 1000
		hooks.on("cursorFingerMult", mult => (this.bought ? mult * power : mult))
		if (!Game.Tiers[tier].special && !isNaN(tierPow))
			buildingHooks.Cursor.on("buy", () => {
				if (building.amount >= (tierPow === 4 ? 25 : (tierPow - 4) * 50))
					Game.Unlock(this.name)
			})
		if (tier === "fortune") Game.Tiers[tier].upgrades.push(this)
		Game.Objects.Cursor.buyFunction.apply(Game.Objects.Cursor)
	}
}
