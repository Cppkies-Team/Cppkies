import gameType, { Cppkies as CppkiesType } from "./gameType"

declare global {
	interface Window {
		Game: gameType
		Cppkies: CppkiesType
	}
}
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
	injectCode: null,
	DEFAULT_ONBUY: null,
	DEFAULT_CPS: null,
}
export default master
