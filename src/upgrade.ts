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
	 * @param description The description of the upgrade
	 * @param building The building it boosts
	 * @param tier The upgrade's tier
	 */
	constructor(
		name: string,
		description: string,
		building: Game.Object | string,
		tier: Tier
	) {
		if (typeof building === "string") building = Game.Objects[building]
		super(
			name,
			`${toSentenseCase(
				building.plural
			)} are <b>twice</b> as efficient.<q>${description}</q>`,
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
			this.order = (building.id + 1) * 100 + tier
			// Manually patch order since Orteil doesn't like consistency
			this.order -= Math.max(0, Math.min(building.id - 4, 3)) * 75
		}
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
			master.hooks.customGrandmaPic.push(() => {
				if (this.bought) return grandmaPicture
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
	 * @param desc The flavor text for it
	 * @param building1Name The first building
	 * @param building2Name The second building
	 * @param tier The synergy tier **Warning: The tier must have a req field**
	 */
	constructor(
		name: string,
		desc: string,
		building1: Game.Object | string,
		building2: Game.Object | string,
		tier: Tier
	) {
		if (typeof building1 === "string") building1 = Game.Objects[building1]
		if (typeof building2 === "string") building2 = Game.Objects[building2]
		desc = `${toSentenseCase(
			building1.plural
		)} gain <b>+5% CpS</b> per ${building2.name.toLowerCase()}.<br>${toSentenseCase(
			building2.plural
		)} gain <b>+0.1% CpS</b> per 
			${building1.name.toLowerCase()}.<q>${desc}</q>`
		super(
			name,
			desc,
			(building1.basePrice * 10 + building2.basePrice * 1) *
				Game.Tiers[tier].price,
			Game.GetIcon(building1.name, tier)
		)
		this.tier = tier
		this.buildingTie1 = building1
		this.buildingTie2 = building2
		this.order = 5000
		building1.synergies.push(this)
		building2.synergies.push(this)
	}
}
