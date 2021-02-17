import { Achievement } from "./baseAchievement"
import hooks from "../injects/basegame"

export class MouseAchievement<
	Tier extends string | number
> extends Achievement {
	pool: "normal"
	tier: Tier
	/**
	 * Creates an achievement which is unlocked when a specific amount of cookies is made
	 * @param name Name of the achievement
	 * @param quote Quote (flavour text) of it
	 * @param tier The achievement's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
	 */
	constructor(name: string, tier: Tier, quote: string) {
		const tierPow = parseInt(tier.toString())
		super(
			name,
			`Make <b>${toFixed(10 ** (1 + tierPow * 2))}</b> cookies from clicking.${
				quote ? `<q>${quote}</q>` : ""
			}`,
			Game.GetIcon("Mouse", tier) // Injected in `basegame.ts`
		)
		this.pool = "normal"
		this.tier = tier
		this.order = 1000 + this.id / 1000
		if (!Game.Tiers[tier].special && !isNaN(tierPow))
			hooks.on("check", () => {
				if (Game.handmadeCookies >= 10 ** (1 + tierPow * 2)) Game.Win(this.name)
			})
	}
}
