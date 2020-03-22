import gameType, { Cppkies as CppkiesType } from "./gameType"
import LocalStorageWrapper from "./lib/localstorage"

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
	save: new LocalStorageWrapper("cppkiesSave").store,
	onLoad: [],
	Building: null,
	Upgrade: null,
	injectCode: null,
	DEFAULT_ONBUY: null,
	DEFAULT_CPS: null,
}
export default master
