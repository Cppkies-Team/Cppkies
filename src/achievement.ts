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

export class TieredAchievement<Tier extends string | number> extends Achievement
	implements Game.TieredAchievementClass<Tier> {
	buildingTie: Game.Object
	pool: "normal"
	tier: Tier
	/**
	 *
	 * @param name
	 * @param quote
	 * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), etc.
	 * @param building
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
					if (Game.Tiers[tier.toString()].achievUnlock <= 0) {
						console.warn("Tier has invalid unlock amount")
						break
					}
					req =
						tier.toString() === "1"
							? 1
							: Game.Tiers[tier.toString()].achievUnlock * 2
					break
			}
			master.buildingHooks.Cursor.on("buy", () => {
				if (Game.Objects.Cursor.amount >= req) Game.Win(this.name)
			})
		} else req = Game.Tiers[tier.toString()].achievUnlock
		super(
			name,
			`Have <b>${req}</b> ${
				Math.abs(req) === 1 ? buildingObject.single : buildingObject.plural
			}.${quote ? `<q>${quote}</q>` : ""}`,
			[0, 7]
		)
		Game.SetTier(buildingObject.name, tier)
		if (icon) this.icon = icon
		else this.icon = Game.GetIcon(buildingObject.name, tier)

		buildingObject.tieredAchievs[tier as number] = this as TieredAchievement<
			number
		>
		this.buildingTie = buildingObject
		if (typeof tier === "number") {
			this.order = 1000 + buildingObject.id * 100 + this.id / 1000
			// Manually patch order since Orteil doesn't like consistency
			this.order -= Math.max(0, Math.min(buildingObject.id - 4, 3)) * 75
			if (buildingObject.id >= 8) this.order -= 75
			if (buildingObject.id === 0) this.order += 50
		}
	}
}
