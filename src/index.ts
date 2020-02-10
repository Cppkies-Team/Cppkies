import { injectCode } from "./helpers"
import { main } from "./injects"
import GameType, { Cppkies as CppkiesType } from "./gameType"
declare global {
	interface Window {
		Game: GameType
		Cppkies: CppkiesType | undefined
	}
}

if (window.Cppkies) throw new Error("Duplicate Cppkies import")
main().then((answer: { [key: string]: Function[] }) => {
	window.Cppkies.hooks = answer
})
const master = {
	hooks: {},
	injectCode,
}
export default master
