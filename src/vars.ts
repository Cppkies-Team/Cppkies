import { getSave } from "./saves"
import { Building, defaultOnBuy, defaultCps } from "./buildings"
import {
	Upgrade,
	TieredUpgrade,
	HeavenlyUpgrade,
	GrandmaSynergy,
	SynergyUpgrade,
} from "./upgrade"
import Tier from "./tiers"
import { injectCode } from "./helpers"
import { relinkColumn } from "./spritesheets"
import { Hooks } from "./injects/basegame"

/**
 * The main object which is exported by Cppkies
 */
const master = {
	hooks: null as Hooks,
	iconLink: "",
	buildingLink: "",
	buildingHooks: {},
	buildingHooksById: [],
	customBuildings: [],
	customUpgrades: [],
	customTiers: [],
	save: getSave(),
	onLoad: [],
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
		relinkColumn: relinkColumn,
		relinkRow: null,
	},
}
export default master
