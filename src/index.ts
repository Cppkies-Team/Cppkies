import { injectCode } from "./helpers"
import { main } from "./injects/basegame"
import { Cppkies as CppkiesType } from "./gameType"
import { Building, defaultCps, defaultOnBuy } from "./buildings"
import master from "./vars"
import { Upgrade } from "./upgrade"
import { initSave, SaveType, saveAll } from "./saves"
import LocalStorageWrapper from "./lib/localstorage"
import { HeavenlyUpgrade } from "./heavenlyupgrade"
import { prod } from "../isprod.json"

let CppkiesExport: CppkiesType

//Check if Cppkies is already created
if (window.Cppkies) {
	//If so, just reexport it
	CppkiesExport = window.Cppkies
} else {
	//Set it to master, and set some stuff
	CppkiesExport = master
	CppkiesExport.Building = Building
	CppkiesExport.Upgrade = Upgrade
	CppkiesExport.HeavenlyUpgrade = HeavenlyUpgrade
	CppkiesExport.injectCode = injectCode
	CppkiesExport.DEFAULT_CPS = defaultCps
	CppkiesExport.DEFAULT_ONBUY = defaultOnBuy
	//Since we can't trust our data...
	master.save = (new LocalStorageWrapper("cppkiesSave")
		.store as unknown) as SaveType
	//Create a save if it doesn't exist
	if (!master.save.exists) {
		initSave()
	}
	window.Game.customSave.push(saveAll)

	//Inject maingame and create hooks
	main().then(answer => {
		CppkiesExport.hooks = answer
		window.Game.Notify("Cppkies loaded!!!", "", [32, prod ? 17 : 21])
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
