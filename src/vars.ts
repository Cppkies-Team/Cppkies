import { Cppkies as CppkiesType } from "./gameType"

//The *main* variable
const master: CppkiesType = {
	hooks: {},
	iconLink: "",
	buildingLink: "",
	buildingHooks: {},
	buildingHooksById: [],
	customBuildings: [],
	customUpgrades: [],
	save: null,
	onLoad: [],
	Building: null,
	Upgrade: null,
	HeavenlyUpgrade: null,
	injectCode: null,
	DEFAULT_ONBUY: null,
	DEFAULT_CPS: null,
}
export default master
