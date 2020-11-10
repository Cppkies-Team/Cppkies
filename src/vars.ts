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
} from "./upgrade"
import Tier, { customTiers } from "./tiers"
import { injectCode } from "./helpers"
import { relinkColumn, relinkRow } from "./spritesheets"
import { Hooks } from "./injects/basegame"

/**
 * The main object which is exported by Cppkies
 */
const master = {
	hooks: null as Hooks,
	iconLink: "",
	buildingLink: "",
	buildingHooks,
	buildingHooksById: [],
	customBuildings,
	customUpgrades: [] as Upgrade[],
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
	injectCode,
	DEFAULT_ONBUY: defaultOnBuy,
	DEFAULT_CPS: defaultCps,
	icons: {
		relinkColumn,
		relinkRow,
	},
}
export default master
