import { resolveIcon } from "../spritesheets"
import { customAchievements, setUnitOwner } from "../vars"
import { ModSave, ModSavePartition, save } from "../saves"
import { Mod, OwnershipUnit } from "../mods"
import { localizeThing } from "../helpers"

export interface AchievementSave {
	won: boolean
}

declare module "../saves" {
	export interface ModSave {
		achievements?: Record<string, AchievementSave>
	}
}

function loadAchievement(save: ModSave, achievement: Achievement): void {
	const achievementSave = save.achievements?.[achievement.name] || {
		won: false,
	}

	achievement.won = achievementSave.won ? 1 : 0
	if (achievement.won && Game.CountsAsAchievementOwned(achievement.pool))
		Game.AchievementsOwned++
}

new ModSavePartition(
	"achievements",
	1,
	"hard",
	(save, mod) => {
		if (customAchievements.length === 0) return

		for (const achievement of customAchievements) {
			if (achievement.owner !== mod) continue
			if (!save.achievements) save.achievements = {}
			save.achievements[achievement.name] = { won: !!achievement.won }
		}
	},
	(save, mod) => {
		if (!save.achievements) return
		for (const achievement of customAchievements) {
			if (achievement.owner !== mod) continue
			loadAchievement(save, achievement)
		}
	}
)

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
		localizeThing(this)
		setUnitOwner(this)
		loadAchievement(this.owner || save.foreign, this)
		customAchievements.push(this)
	}
}
