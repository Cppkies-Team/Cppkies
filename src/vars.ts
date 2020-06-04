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
import { Cppkies } from "./gameType"

/**
 * The main object which is exported by Cppkies
 */
const master: Cppkies = {
	hooks: null,
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
