import { Upgrade } from "./upgrade"
import { Icon } from "./gameType"
import master from "./vars"
export default class Tier {
	achievUnlock?: number
	iconRow: number
	iconLink?: string

	/**
		Indicates if the tier shouldn't be accounted for tiered upgrades
	*/
	special: boolean
	req?: string
	upgrades: Upgrade[] = []
	/**
	 * Adds a new tier to the game for upgrades and achievements
	 * @param name The name of the new tier
	 * @param sampleIcon A sample of an icon using the tier
	 * @param color The color of the tier
	 * @param price The base price of tiered upgrades
	 * @param special Indicates if the tier shouldn't be accounted for tiered upgrades
	 * @param unlock How many buildings are needed for the upgrade
	 * @param achievUnlock How many buildings are needed for the achievement
	 * @param req Which upgrade is required to unlock the upgrades
	 * @param keyName Optional, the key for tiers, used in everything
	 */
	constructor(
		public name: string,
		sampleIcon: Icon,
		public color: string,
		special = false,
		public price: number | "auto" = "auto",
		public unlock: number | "auto" | null = null,
		achievUnlock: number | "auto" | null = null,
		req: string | null = null,
		public keyName: string | "auto" = "auto"
	) {
		this.special = special
		if (unlock === null) this.unlock = -1
		if (typeof achievUnlock === "number") this.achievUnlock = achievUnlock
		if (req) this.req = req
		if (price === "auto")
			this.price =
				window.Game.Tiers[
					Object.keys(window.Game.Tiers)
						.filter(val => !isNaN(parseInt(val)))
						.length.toString()
				].price * 1e8
		/*
			Analyze sample icon
		*/
		this.iconRow = sampleIcon[1]
		if (sampleIcon[2]) this.iconLink = sampleIcon[2]
		if (keyName === "auto")
			if (!special)
				this.keyName = (
					Object.keys(window.Game.Tiers).filter(val => !isNaN(parseInt(val)))
						.length + 1
				).toString()
			else this.keyName = name
		if ((special === false && unlock === null) || unlock === "auto")
			this.unlock = window.Game.Tiers[parseInt(this.keyName) - 1].unlock + 50
		if ((special === false && achievUnlock === null) || achievUnlock === "auto")
			this.achievUnlock =
				window.Game.Tiers[parseInt(this.keyName) - 1].achievUnlock + 50
		window.Game.Tiers[this.keyName] = this
		master.customTiers.push(this)
	}
}
