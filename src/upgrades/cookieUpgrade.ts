import { CommonValue } from "../helpers"
import { Upgrade } from "./baseUpgrade"
import { miscValues } from "../vars"

export class CookieUpgrade extends Upgrade implements Game.CookieUpgrade {
	pool = "cookie" as const
	/**
	 * Create an upgrade which multiplier cookie production
	 * @param name Name of the cookie
	 * @param quote Quote (flavour text) of it
	 * @param price The price of the cookie
	 * @param icon The icon of it
	 * @param power The multiplier of CpS, in %, so `5` means +5% CpS, etc.
	 * @param req Some optional conditions, etc. the season, the upgrade required, or if the upgrade can be unlocked naturally at all to unlock this
	 * (Note: All cookies which aren't locked *require* you to have 1/20 of it's cost to be unlocked)
	 * @param order Position of the cookie in the list, Most cookies have 10020 by default, cookies from boxes and special cookies have different orders.
	 */
	constructor(
		name: string,
		quote: string,
		price: CommonValue<number>,
		icon: Game.Icon,
		public power: CommonValue<number>,
		req?: { require?: string; season?: string; locked?: boolean },
		order?: number
	) {
		super(
			name,
			`Cookie production multiplier <b>+${Beautify(
				typeof power === "function" ? power() : power,
				1
			)}%</b>.<q>${quote}</q>`,
			price,
			icon
		)
		this.order = (order ?? miscValues.cookieOrder ?? 10020) + this.id / 1000
		this.unlockAt = {
			name,
			cookies: (typeof price === "function" ? price() : price) / 20,
			require: req?.require,
			season: req?.season,
		}
		Game.UnlockAt.push(this.unlockAt)
		Game.UpgradesByPool.cookie.push(this)
		Game.cookieUpgrades.push(this)
	}
}
