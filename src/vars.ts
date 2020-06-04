import { getSave } from "./saves"
import { Building, defaultOnBuy, defaultCps } from "./buildings"
import { Upgrade, TieredUpgrade, HeavenlyUpgrade } from "./upgrade"
import Tier from "./tiers"
import { injectCode } from "./helpers"
import { relinkColumn } from "./spritesheets"
import { Cppkies } from "./gameType"

//The *main* variable
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
	injectCode,
	DEFAULT_ONBUY: defaultOnBuy,
	DEFAULT_CPS: defaultCps,
	icons: {
		relinkColumn: relinkColumn,
		relinkRow: null,
	},
}
export default master
