import { resolveIcon } from "../spritesheets"
import { applyAllProps } from "../helpers"
import { customAchievements, setUnitOwner } from "../vars"
import { loadAchievement } from "../saves"
import { Mod, OwnershipUnit } from "../mods"

export class Achievement extends Game.Achievement implements OwnershipUnit {
	owner?: Mod
	/**
	 * Creates an achievement
	 * @param name The name of the achievement
	 * @param desc The description of it
	 * @param icon  The icon for it
	 */
	constructor(name: string, desc: string, icon: Game.Icon) {
		super(name, desc, resolveIcon(icon))
		setUnitOwner(this)
		applyAllProps(this, loadAchievement(this))
		customAchievements.push(this)
		if (this.won && Game.CountsAsAchievementOwned(this.pool))
			Game.AchievementsOwned++
	}
}
