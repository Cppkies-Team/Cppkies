import { resolveAlias } from "./spritesheets"
import master from "./vars"
import { loadAchievement } from "./saves"
import { applyAllProps } from "./helpers"

export const customAchievements: Achievement[] = []

export class Achievement extends Game.Achievement {
	/**
	 * Creates an achievement
	 * @param name The name of the achievement
	 * @param desc The description of it
	 * @param icon  The icon for it
	 */
	constructor(name: string, desc: string, icon: Game.Icon) {
		if (!icon[2]) icon[2] = master.iconLink + ""
		icon[2] = resolveAlias(icon[2])
		super(name, desc, icon)
		applyAllProps(this, loadAchievement(this))
		customAchievements.push(this)
	}
}

export class BankAchievement extends Achievement
	implements Game.BankAchievementClass {
	treshold: number
	/**
	 * Creates an achievement which is automatically unlocked on CBTA amount
	 * @param name Name of the achievement
	 * @param icon The icon of it
	 * @param q The optional quote of it
	 * @param treshold The amount of cookies required, if not set, automatically calculated
	 */
	constructor(
		name: string,
		icon: Game.Icon,
		q?: string | null,
		treshold = 10 ** Math.floor(Game.BankAchievements.length * 1.5 + 2)
	) {
		super(
			name,
			`Bake <b>${toFixed(treshold)}</b> cookie${
				Math.abs(treshold) === 1 ? "" : "s"
			} in one ascension.${q ? `<q>${q}</q>` : ""}`,
			icon
		)
		this.treshold = treshold
		this.order = 100 + Game.BankAchievements.length * 0.01
		Game.BankAchievements.push(this)
	}
}

export class CpsAchievement extends Achievement
	implements Game.CpsAchievementClass {
	treshold: number
	/**
	 * Creates an achievement which is automatically unlocked on CpS amount
	 * @param name Name of the achievement
	 * @param icon The icon of it
	 * @param q The optional quote of it
	 * @param treshold The amount of cookies per second required, if not set, automatically calculated
	 */
	constructor(
		name: string,
		icon: Game.Icon,
		q?: string | null,
		treshold = 10 ** Math.floor(Game.BankAchievements.length * 1.2)
	) {
		super(
			name,
			`Bake <b>${toFixed(treshold)}</b> cookie${
				Math.abs(treshold) === 1 ? "" : "s"
			} per second.${q ? `<q>${q}</q>` : ""}`,
			icon
		)
		this.treshold = treshold
		this.order = 200 + Game.CpsAchievements.length * 0.01
		Game.CpsAchievements.push(this)
	}
}
