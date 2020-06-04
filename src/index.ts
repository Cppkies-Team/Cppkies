import { main } from "./injects/basegame"

import master from "./vars"
import { saveAll } from "./saves"
import { prod } from "../isprod.json"
import postInject from "./injects/postInject"

let CppkiesExport: typeof master

//Check if Cppkies is already created
if (window.Cppkies) {
	//If so, just reexport it
	CppkiesExport = window.Cppkies
} else {
	CppkiesExport = master
	window.Game.customSave.push(saveAll)
	//Inject maingame and create hooks
	main().then(answer => {
		CppkiesExport.hooks = answer
		window.Game.Notify("Cppkies loaded!", "", [32, prod ? 17 : 21])
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
		postInject()
		//Force manual addition since in-module injects b r e a k
		window.Cppkies = CppkiesExport
	})
}
export default CppkiesExport
