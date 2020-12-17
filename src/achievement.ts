import { resolveIcon } from "./spritesheets"
import master from "./vars"
import { loadAchievement } from "./saves"
import { applyAllProps } from "./helpers"
import { Building } from "./buildings"

export const customAchievements: Achievement[] = []

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

export class TieredAchievement<Tier extends string | number> extends Achievement
	implements Game.TieredAchievementClass<Tier> {
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
			master.buildingHooks.Cursor.on("buy", () => {
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
		Game.SetTier(
			buildingObject.name,
			tier === "cursor2" || tier === "cursor50" ? 1 : tier
		)

		buildingObject.tieredAchievs[tier] = this
		this.buildingTie = buildingObject

		this.order = 1000 + buildingObject.id * 100 + this.id / 1000
		// Manually patch order since Orteil doesn't like consistency
		this.order -= Math.max(0, Math.min(buildingObject.id - 4, 3)) * 75
		if (buildingObject.id >= 8) this.order -= 75
		if (buildingObject.id === 0) this.order += 50
	}
}

export class ProductionAchievement extends Achievement {
	/**
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
			building instanceof Building ? building.iconLink : undefined,
		]
		const pow = 10 ** (12 + building.id + (mult ?? 0) + (tier - 1) * 7)
		resolveIcon(icon)
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
