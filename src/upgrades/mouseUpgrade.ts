import { Upgrade } from "./baseUpgrade"
import hooks from "../injects/basegame"

export class MouseUpgrade<Tier extends string | number>
	extends Upgrade
	implements Game.GenericTieredUpgrade<Tier>
{
	pool = "" as const
	/**
	 * Creates an upgrade which powers up the cookies per click
	 * @param name Name of the upgrade
	 * @param quote Quote (flavour text) of it
	 * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
	 * @param power The multiplier of CpS per click, `0.01` by default, which is what all other cursor upgrades give
	 */
	constructor(name: string, quote: string, public tier: Tier, power = 1) {
		super(
			name,
			`Clicking gains <b>+${power}% of your CpS</b>.<q>${quote}</q>`,
			10 ** (3 + parseInt(tier.toString()) * 2),
			Game.GetIcon("Mouse", tier) // Injected in `basegame.ts`
		)
		const tierPow = parseInt(tier.toString())
		this.order = 150 + this.id / 1000
		hooks.on("cpcAdd", add =>
			this.bought ? add + (Game.cookiesPs * power) / 100 : add
		)
		if (!Game.Tiers[tier].special && !isNaN(tierPow))
			hooks.on("check", () => {
				if (Game.handmadeCookies >= 10 ** (1 + tierPow * 2))
					Game.Unlock(this.name)
			})
		if (tier === "fortune") Game.Tiers[tier].upgrades.push(this)
	}
}
