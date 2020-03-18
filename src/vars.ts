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
	onLoad: [],
	Building: null,
	injectCode: null,
}
export default master
