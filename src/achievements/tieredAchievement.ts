import { Achievement } from "./baseAchievement"
import { buildingHooks } from "../injects/buildings"

export class TieredAchievement<Tier extends string | number>
	extends Achievement
	implements Game.TieredAchievementClass<Tier>
{
	buildingTie: Game.Object
	pool: "normal"
	tier: Tier
	/**
	 * Creates an achievement which is won by having an amount of buildings
	 * @param name The name of it
	 * @param quote The optional quote of it
	 * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), etc. (Can be "cursor2" or "cursor50" for special cursor amounts)
	 * @param building The buildings linked to this achievement
	 */
	constructor(
		name: string,
		quote: string | null,
		building: Game.Object | string,
		tier: Tier | "cursor2" | "cursor50"
	) {
		const buildingObject =
			typeof building === "object" ? building : Game.Objects[building]
		let icon: Game.Icon | null = null
		let req = -1
		if (buildingObject.id === 0) {
			switch (tier) {
				case "cursor2":
					icon = [0, 6]
					req = 2
					break
				case "cursor50":
					icon = [1, 6]
					req = 50
					break
				default:
					if (Game.Tiers[tier].achievUnlock <= 0) {
						console.warn("Tier has invalid unlock amount")
						break
					}
					req = tier === 1 ? 1 : Game.Tiers[tier].achievUnlock * 2
					break
			}
			buildingHooks.Cursor.on("buy", () => {
				if (Game.Objects.Cursor.amount >= req) Game.Win(this.name)
			})
		} else req = Game.Tiers[tier].achievUnlock
		super(
			name,
			`Have <b>${req}</b> ${
				Math.abs(req) === 1 ? buildingObject.single : buildingObject.plural
			}.${quote ? `<q>${quote}</q>` : ""}`,
			icon ?? Game.GetIcon(buildingObject.name, tier)
		)
		this.pool = "normal"
		this.tier = tier === "cursor2" || tier === "cursor50" ? (1 as Tier) : tier
		this.buildingTie = buildingObject
		buildingObject.tieredAchievs[tier] = this

		this.buildingTie = buildingObject

		this.order = 1000 + buildingObject.id * 100 + this.id / 1000
		// Manually patch order since Orteil doesn't like consistency
		this.order -= Math.max(0, Math.min(buildingObject.id - 4, 3)) * 75
		if (buildingObject.id >= 8) this.order -= 75
		if (buildingObject.id === 0) this.order += 50
	}
}
