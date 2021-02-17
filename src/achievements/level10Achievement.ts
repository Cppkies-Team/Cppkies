import { hasOwnProperty } from "../helpers"
import { Achievement } from "./baseAchievement"

export class Level10Achievement extends Achievement {
	/**
	 * Creates an achievement which is given for getting level 10 of the building
	 * @param name Name of the achievement
	 * @param building The building to track the level of
	 * @param quote The (optional) quote of it
	 */
	constructor(
		name: string,
		building: string | Game.Object,
		quote?: string | null
	) {
		if (typeof building === "string") building = Game.Objects[building]
		const icon: Game.Icon = [
			building.iconColumn,
			26,
			hasOwnProperty(building, "iconLink") &&
			typeof building.iconLink === "string"
				? building.iconLink
				: undefined,
		]
		super(
			name,
			`Reach level <b>10</b> ${building.plural}.${
				quote ? `<q>${quote}</q>` : ""
			}`,
			icon
		)
		this.order = 1020 + building.id * 100 + this.id / 1000
		// Manually patch order since Orteil doesn't like consistency
		this.order -= Math.max(0, Math.min(building.id - 4, 3)) * 75
		if (building.id >= 8) this.order -= 75
		if (building.id === 0) this.order += 50
		building.levelAchiev10 = this
	}
}
