import { save } from "./saves"
import {
	Building,
	defaultOnBuy,
	defaultCps,
	customBuildings,
	buildingHooks,
} from "./buildings"
import {
	Upgrade,
	TieredUpgrade,
	HeavenlyUpgrade,
	GrandmaSynergy,
	SynergyUpgrade,
	customUpgrades,
	KittenUpgrade,
} from "./upgrade"
import Tier, { customTiers } from "./tiers"
import { injectCode } from "./helpers"
import {
	patchIconsheet,
	relinkColumn,
	relinkRow,
	extraColumnIcons,
	extraRowIcons,
	alias,
	aliases,
} from "./spritesheets"
import { Hooks } from "./injects/basegame"
import { hookAllBuildings } from "./buildings"
import { CursorUpgrade, MouseUpgrade, CookieUpgrade } from "./upgrade"
import { TieredAchievement, ProductionAchievement } from "./achievement"

import {
	Achievement,
	CpsAchievement,
	BankAchievement,
	customAchievements,
} from "./achievement"

/**
 * The main object which is exported by Cppkies
 */
const master = {
	hooks: (null as unknown) as Hooks,
	on: (null as unknown) as Hooks["on"],
	/**
	 * The multiplier of milk which is not accessible in game by default
	 */
	hiddenMilkMult: 1,
	iconLink: "",
	buildingLink: "",
	cookieOrder: 10020,
	buildingHooks,
	buildingHooksById: [],
	hookAllBuildings,
	customBuildings,
	customUpgrades,
	customTiers,
	save,
	onLoad: [] as (() => void)[],
	Building,
	Upgrade,
	TieredUpgrade,
	Tier,
	HeavenlyUpgrade,
	GrandmaSynergy,
	SynergyUpgrade,
	CursorUpgrade,
	KittenUpgrade,
	MouseUpgrade,
	CookieUpgrade,
	Achievement,
	CpsAchievement,
	BankAchievement,
	TieredAchievement,
	ProductionAchievement,
	customAchievements,
	injectCode,
	DEFAULT_ONBUY: defaultOnBuy,
	DEFAULT_CPS: defaultCps,
	icons: {
		relinkColumn,
		relinkRow,
		patchIconsheet,
		extraColumnIcons,
		extraRowIcons,
		alias,
		aliases,
	},
}

export default master
