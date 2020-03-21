import { injectCode } from "./helpers"
import { main } from "./injects/basegame"
import gameType, { Cppkies as CppkiesType } from "./gameType"
import { Building, defaultCps, defaultOnBuy } from "./buildings"
import master from "./vars"
import { Upgrade } from "./upgrade"
declare global {
	interface Window {
		Game: gameType
		Cppkies: CppkiesType
	}
}
let CppkiesExport: CppkiesType
//Check if Cppkies is already created
if (window.Cppkies) {
	//If so, just reexport it
	console.warn("Duplicate Cppkies")
	CppkiesExport = window.Cppkies
} else {
	//Set it to master, and set some stuff
	CppkiesExport = master
	CppkiesExport.Building = Building
	CppkiesExport.Upgrade = Upgrade
	CppkiesExport.injectCode = injectCode
	CppkiesExport.DEFAULT_CPS = defaultCps
	CppkiesExport.DEFAULT_ONBUY = defaultOnBuy
	//Inject maingame and create hooks
	main().then((answer: Record<string, Function[]>) => {
		CppkiesExport.hooks = answer
		window.Game.Note.call({}, "Cppkies loaded!", "", [32, 17])
		window.Game.Win("Third-party")
		//Run all onLoad events
		master.onLoad.forEach(val => val())
		//Force all new onLoad events to run
		master.onLoad = new Proxy(master.onLoad, {
			set: (_target, key, value): boolean => {
				if (key !== "length") value()
				return true
			},
		})
		//Force manual addition since in-module injects b r e a k
		window.Cppkies = CppkiesExport
	})
}
export default CppkiesExport
