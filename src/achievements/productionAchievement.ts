import { hasOwnProperty } from "../helpers"
import { Achievement } from "./baseAchievement"

export class ProductionAchievement extends Achievement {
	/**`
	 * Creates a production achievement (Make \_ from only \_ achievements)
	 * @param name Name of the achievement
	 * @param building The building of the achivement
	 * @param tier The tier of productivity, not the normal tier, fully works with only `1`, `2`, `3`, otherwise icon will be messed up.
	 * @param quote The (optional) quote of it
	 * @param mult The additional multiplier, should be used if the achievement is too easy to obtain
	 */
	constructor(
		name: string,
		building: string | Game.Object,
		tier: number,
		quote?: string | null,
		mult?: number | null
	) {
		if (typeof building === "string") building = Game.Objects[building]
		const icon: Game.Icon = [
			building.iconColumn,
			21 + tier,
			hasOwnProperty(building, "iconLink") &&
			typeof building.iconLink === "string"
				? building.iconLink
				: undefined,
		]
		const pow = 10 ** (12 + building.id + (mult ?? 0) + (tier - 1) * 7)
		super(
			name,
			`Make <b>${toFixed(pow)}</b> cookies just from ${building.plural}.${
				quote ? `<q>${quote}</q>` : ""
			}`,
			icon
		)
		this.order = 1020 + building.id * 100 + this.id / 1000
		// Manually patch order since Orteil doesn't like consistency
		this.order -= Math.max(0, Math.min(building.id - 4, 3)) * 75
		if (building.id >= 8) this.order -= 75
		if (building.id === 0) this.order += 50
		building.productionAchievs.push({ pow, achiev: this })
	}
}
