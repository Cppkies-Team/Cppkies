import { resolveIcon } from "../spritesheets"
import { applyAllProps } from "../helpers"
import { customAchievements } from "../vars"
import { loadAchievement } from "../saves"

export class Achievement extends Game.Achievement {
	/**
	 * Creates an achievement
	 * @param name The name of the achievement
	 * @param desc The description of it
	 * @param icon  The icon for it
	 */
	constructor(name: string, desc: string, icon: Game.Icon) {
		super(name, desc, resolveIcon(icon))
		applyAllProps(this, loadAchievement(this))
		customAchievements.push(this)
		if (this.won && Game.CountsAsAchievementOwned(this.pool))
			Game.AchievementsOwned++
	}
}
