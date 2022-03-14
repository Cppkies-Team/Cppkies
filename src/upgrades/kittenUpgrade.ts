import hooks from "../injects/basegame"
import { Upgrade } from "./baseUpgrade"

/**
 * Exceptions when the change kitten cost is not 3 (in log10)
 */
const kittenPriceRules: Record<number | "default", number> = {
	1: 5,
	2: 4,
	4: 4,
	default: 3,
}

/**
 * Calculates the cost of a kitten, based on price rules and tier.
 * @param tier The tier, must be a number
 */
function computeKittenCost(tier: number): number {
	let cost = 1
	for (let i = 1; i <= tier; i++)
		if (i in kittenPriceRules) cost += kittenPriceRules[i]
		else cost += kittenPriceRules.default
	return 9 * 10 ** cost
}

/**
 * The pattern of kitten powers, might be inaccurate on further versions.
 * (Loops if tier is beyond length)
 */
const kittenPowerPattern = [
	0.1, 0.125, 0.15, 0.175, 0.2, 0.2, 0.2, 0.2, 0.2, 0.175, 0.15, 0.125, 0.115,
]

export class KittenUpgrade<Tier extends string | number>
	extends Upgrade
	implements Game.KittenUpgrade<Tier>
{
	kitten = true as const
	pool = "" as const
	/**
	 * Creates a new kitten upgrade, which boosts CpS based on achievement amount
	 * @param name Name of the upgrade
	 * @param quote The quote (flavour text) of it
	 * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), `synergy2`(Synergy II), etc.
	 * @param power The multiplier of CpS per 25 achievement, if not set, automatically calculated
	 * @param cost The cost of the upgrade, if not set, automatically calculated
	 * @param milkUnlockAmount The milk progess (achievements / 25) required to unlock the upgrade, if not set, automatically calculated
	 */
	constructor(
		name: string,
		quote: string,
		public tier: Tier,
		power = Game.Tiers[tier].special || isNaN(parseInt(tier.toString()))
			? null
			: kittenPowerPattern[
					(parseInt(tier.toString()) - 1) % (kittenPowerPattern.length - 1)
			  ],
		cost?: number,
		milkUnlockAmount = Game.Tiers[tier].special ||
		isNaN(parseInt(tier.toString()))
			? null
			: tier === 1
			? 0.5
			: // Trust me
			  (tier as number) - 1
	) {
		super(
			name,
			`You gain <b>more CpS</b> the more milk you have.<q>${quote}</q>`,
			Game.Tiers[tier].special || isNaN(parseInt(tier.toString()))
				? cost ?? 0
				: computeKittenCost(tier as number), //Just trust me.
			Game.GetIcon("Kitten", tier)
		)
		if (power === null)
			console.warn(
				"Please make sure to specify the power if the kitten tier is special"
			)
		if (
			(Game.Tiers[tier].special || isNaN(parseInt(tier.toString()))) &&
			cost === undefined
		)
			console.warn(
				"Please make sure to specify the cost if the kitten tier is special"
			)
		if (milkUnlockAmount !== null)
			hooks.on("logic", () => {
				if (Game.milkProgress >= milkUnlockAmount) Game.Unlock(this.name)
			})
		this.order = 20000 + this.id / 1000
		if (power !== null)
			hooks.on("rawCpsMult", mult => {
				const addMult = this.bought
					? 1 + Game.milkProgress * power * __INTERNAL_CPPKIES__.hiddenMilkMult
					: 1
				Game.cookiesMultByType["kittens"] *= addMult

				return mult * addMult
			})
		Game.UpgradesByPool["kitten"].push(this)
		if (tier === "fortune") Game.Tiers[tier].upgrades.push(this)
	}
}
