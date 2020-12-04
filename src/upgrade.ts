import master from "./vars"
import { loadUpgrade } from "./saves"
import { CommonValue, toSentenseCase } from "./helpers"
import { resolveAlias } from "./spritesheets"

export const customUpgrades: Upgrade[] = []

/**
 * The class for upgrades
 */
export class Upgrade extends Game.Upgrade {
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
		if (!icon[2]) icon[2] = master.iconLink + ""
		icon[2] = resolveAlias(icon[2])
		super(
			name,
			typeof desc === "function" ? "" : desc,
			typeof price === "function" ? 0 : price,
			typeof icon === "function" ? [0, 0] : icon,
			buyFunc
		)

		if (typeof desc === "function") this.descFunc = desc
		if (typeof price === "function") this.priceFunc = price
		if (typeof icon === "function") this.iconFunction = icon
		customUpgrades.push(this)
		const loadProps = loadUpgrade(this)
		for (const i in loadProps) this[i] = loadProps[i]
	}
}

/**
 * The class for heavenly upgrades
 */
export class HeavenlyUpgrade extends Upgrade implements Game.HeavenlyUpgrade {
	posX: number
	posY: number

	pool = "prestige" as const
	/**
	 * Creates a heavenly upgrade
	 * @param name The name for it
	 * @param desc The description of it
	 * @param price The price of in (in Heavenly Chips)
	 * @param icon The icon for it
	 * @param position The position of it on the heavenly map screen
	 * @param parents It's parents, can be mixed ID's with names
	 * @param buyFunc The function which gets called on being bought
	 */
	constructor(
		name: string,
		desc: CommonValue<string>,
		price: CommonValue<number>,
		icon: CommonValue<Game.Icon>,
		position: [number, number],
		parents: (string | number)[] = ["Legacy"],
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		buyFunc: () => void = (): void => {}
	) {
		super(name, desc, price, icon, buyFunc)

		this.posX = position[0]
		this.posY = position[1]

		this.parents = parents.map(id => Game.Upgrades[id] || Game.UpgradesById[id])

		Game.PrestigeUpgrades.push(this)
		Game.UpgradePositions[this.id] = position
	}
}

function isFortune<Tier extends string | number>(
	upgrade: TieredUpgrade<Tier | "fortune">
): upgrade is TieredUpgrade<"fortune"> {
	return upgrade.tier === "fortune"
}

export class TieredUpgrade<Tier extends string | number = string | number>
	extends Upgrade
	implements Game.TieredUpgradeClass<Tier> {
	buildingTie: Game.Object
	buildingTie1: Game.Object
	tier: Tier
	pool: ""

	/**
	 * Creates a tiered upgrade
	 * @param name The name of the tiered upgrade
	 * @param quote The description of the upgrade
	 * @param building The building it boosts
	 * @param tier The upgrade's tier
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
			building.basePrice * Game.Tiers[tier.toString()].price,
			Game.GetIcon(building.name, tier)
		)

		Game.SetTier(building.name, tier)

		this.buildingTie1 = building
		if (isFortune(this)) {
			this.order = 19000
			building.fortune = this
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
		if (tier === "fortune")
			Game.Tiers[tier.toString()].upgrades.push(
				(this as unknown) as Game.TieredUpgradeClass<string>
			)
	}
}

export class GrandmaSynergy extends Upgrade
	implements Game.GrandmaSynergyClass {
	buildingTie: Game.Object
	pool: ""
	/**
	 * Creates a grandma synergy upgrade
	 * @param name The name for the upgrade(Usually something like "_ Grandmas")
	 * @param quote The flavor text of the upgrade
	 * @param buildingName The building to be tied with
	 * @param grandmaPicture Optional, the picture of the grandma to use in grandma art
	 */
	constructor(
		name: string,
		quote: string,
		building: Game.Object | string,
		grandmaPicture?: string
	) {
		if (typeof building === "string") building = Game.Objects[building]
		let grandmaNumber: string | number = building.id - 1
		if (grandmaNumber === 1) grandmaNumber = "grandma"
		else grandmaNumber = `${grandmaNumber} grandmas`
		super(
			name,
			`Grandmas are <b>twice</b> as efficient.${toSentenseCase(
				building.plural
			)} gain <b>+1% CpS</b> per ${grandmaNumber}.<q>${quote}</q>`,
			building.basePrice * Game.Tiers[2].price,
			[10, 9],
			Game.Objects.Grandma.redraw
		)
		building.grandma = this
		this.buildingTie = building
		this.order = 250 + (building.id / 12) * 5
		Game.GrandmaSynergies.push(this.name)
		if (grandmaPicture)
			master.hooks.on("grandmaPic", src => {
				if (this.bought) return [...src, grandmaPicture]
			})
	}
}

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
	 * @param building1Name The first building
	 * @param building2Name The second building
	 * @param tier The synergy tier **Warning: The tier must have a req field**
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
			Game.GetIcon(building1.name, tier)
		)
		this.tier = tier
		this.buildingTie1 = building1
		this.buildingTie2 = building2
		this.order = 5000 + this.id / 1000
		building1.synergies.push(this)
		building2.synergies.push(this)

		Game.Tiers[tier.toString()].upgrades.push(
			(this as unknown) as Game.TieredUpgradeClass<string>
		)
	}
}

/**
 * Early cursor logs which don't follow any pattern
 */
const cursorEarlyLogs = [5, 7, 8, 9, 10]

export class CursorUpgrade<Tier extends string | number> extends Upgrade
	implements Game.GenericTieredUpgrade<Tier> {
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
			Game.Tiers[tier.toString()].special || isNaN(tierPow)
				? building.basePrice * Game.Tiers[tier.toString()].price
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
		master.on("cursorFingerMult", mult => (this.bought ? mult * power : mult))
		if (!Game.Tiers[tier.toString()].special && !isNaN(tierPow))
			master.buildingHooks.Cursor.on("buy", () => {
				if (building.amount >= (tierPow === 4 ? 25 : (tierPow - 4) * 50))
					Game.Unlock(this.name)
			})
		if (tier === "fortune")
			Game.Tiers[tier.toString()].upgrades.push(
				(this as unknown) as Game.TieredUpgradeClass<string>
			)
	}
}

/**
 * Exceptions when the change kitten cost is not 3 (in log10)
 */
export const kittenPriceRules = { 1: 5, 2: 4, 4: 4, default: 3 }

/**
 * Calculates the cost of a kitten, based on price rules and tier.
 * @param tier The tier, must be a number
 */
export function computeKittenCost(tier: number): number {
	let cost = 1
	for (let i = 1; i <= tier; i++)
		cost += kittenPriceRules[i] ?? kittenPriceRules.default
	return 9 * 10 ** cost
}

/**
 * The pattern of kitten powers, might be inaccurate on further versions.
 * (Loops if tier is beyond length)
 */
const kittenPowerPattern = [
	0.1,
	0.125,
	0.15,
	0.175,
	0.2,
	0.2,
	0.2,
	0.2,
	0.2,
	0.175,
	0.15,
	0.125,
	0.115,
]

export class KittenUpgrade<Tier extends string | number> extends Upgrade
	implements Game.KittenUpgrade<Tier> {
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
		power = Game.Tiers[tier.toString()].special ||
		isNaN(parseInt(tier.toString()))
			? null
			: kittenPowerPattern[
					(parseInt(tier.toString()) - 1) % (kittenPowerPattern.length - 1)
			  ],
		cost?: number,
		milkUnlockAmount = Game.Tiers[tier.toString()].special ||
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
			Game.Tiers[tier.toString()].special || isNaN(parseInt(tier.toString()))
				? cost ?? 0
				: computeKittenCost(tier as number), //Just trust me.
			Game.GetIcon("Kitten", tier)
		)
		if (power === null)
			console.warn(
				"Please make sure to specify the power if the kitten tier is special"
			)
		if (
			(Game.Tiers[tier.toString()].special ||
				isNaN(parseInt(tier.toString()))) &&
			cost === undefined
		)
			console.warn(
				"Please make sure to specify the cost if the kitten tier is special"
			)
		if (milkUnlockAmount !== null)
			master.on("logic", () => {
				if (Game.milkProgress >= milkUnlockAmount) Game.Unlock(this.name)
			})
		this.order = 20000 + this.id / 1000
		master.on("rawCpsMult", mult => {
			const addMult = this.bought
				? 1 + Game.milkProgress * power * master.hiddenMilkMult
				: 1
			Game.cookiesMultByType["kittens"] *= addMult

			return mult * addMult
		})
		Game.UpgradesByPool["kitten"].push(this)
		if (tier === "fortune")
			Game.Tiers[tier.toString()].upgrades.push(
				(this as unknown) as Game.TieredUpgradeClass<string>
			)
	}
}

export class MouseUpgrade<Tier extends string | number> extends Upgrade
	implements Game.GenericTieredUpgrade<Tier> {
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
			1,
			Game.GetIcon("Mouse", tier) // Injected in `basegame.ts`
		)
		const tierPow = parseInt(tier.toString())
		this.order = 150 + this.id / 1000
		master.on("cpcAdd", add =>
			this.bought ? add + (Game.cookiesPs * power) / 100 : add
		)
		if (!Game.Tiers[tier.toString()].special && !isNaN(tierPow))
			master.on("check", () => {
				if (Game.handmadeCookies >= 10 ** (1 + tierPow * 2))
					Game.Unlock(this.name)
			})
		if (tier === "fortune")
			Game.Tiers[tier.toString()].upgrades.push(
				(this as unknown) as Game.TieredUpgradeClass<string>
			)
	}
}
