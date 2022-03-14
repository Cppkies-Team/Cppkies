import { Upgrade } from "./baseUpgrade"
import { toSentenseCase } from "../helpers"
import hooks from "../injects/basegame"

export class GrandmaSynergy
	extends Upgrade
	implements Game.GrandmaSynergyClass
{
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
		if (grandmaPicture) {
			if (!grandmaPicture.endsWith(".png"))
				throw new Error(
					`Can't use the grandma picture URL "${grandmaPicture}", URL must end with .png`
				)
			grandmaPicture = grandmaPicture.substring(0, grandmaPicture.length - 4)
		}
		if (typeof building === "string") building = Game.Objects[building]
		let grandmaNumber: string | number = building.id - 1
		if (grandmaNumber === 1) grandmaNumber = "grandma"
		else grandmaNumber = `${grandmaNumber} grandmas`
		super(
			name,
			`Grandmas are <b>twice</b> as efficient. ${toSentenseCase(
				building.plural
			)} gain <b>+1% CpS</b> per ${grandmaNumber}.<q>${quote}</q>`,
			building.basePrice * Game.Tiers[2].price,
			[10, 9, ""],
			Game.Objects.Grandma.redraw
		)
		this.pool = ""
		building.grandma = this
		this.buildingTie = building
		this.order = 250 + this.id / 1000
		if (building.id >= 12) this.order += 5
		Game.GrandmaSynergies.push(this.name)
		if (grandmaPicture) {
			hooks.on("grandmaPic", src => {
				if (this.bought) return [...src, grandmaPicture] as string[]
				else return src
			})
		}
		Game.Objects.Grandma.redraw()
		building.buyFunction.apply(building)
	}
}
