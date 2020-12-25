import { main } from "./injects/basegame"

import master from "./vars"
import { exportSave, importSave } from "./saves"
import { prod } from "../isprod.json"
import postInject from "./injects/postInject"
import { hookAllBuildings } from "./buildings"
import { InjectParams } from "./helpers"

let CppkiesExport: typeof master

declare global {
	interface Window {
		Cppkies: typeof master | undefined
		CPPKIES_ONLOAD: (() => void)[] | undefined
	}
}

//Check if Cppkies is already created
if (window.Cppkies) {
	//If so, just reexport it
	CppkiesExport = window.Cppkies
} else {
	CppkiesExport = master
	//Force manual addition since in-module injects b r e a k
	window.Cppkies = CppkiesExport
	//Inject maingame and create hooks
	main().then(answer => {
		CppkiesExport.hooks = answer
		CppkiesExport.on = answer.on.bind(answer)
		Game.Notify("Cppkies loaded!", "", [32, prod ? 17 : 21], 1.5)

		const cppkiesNote = document.createElement("div")
		cppkiesNote.textContent = "Cppkies!"
		;(document.querySelector("#topBar") as HTMLElement).insertBefore(
			cppkiesNote,
			(document.querySelector("#topBar") as HTMLElement).children[1]
		)

		if (!Game.modSaveData["cppkies"]) Game.modSaveData["cppkies"] = "{}"
		Game.registerMod("cppkies", {
			save: exportSave,
			load: importSave,
		})
		Game.Win("Third-party")
		hookAllBuildings()
		//Run all onLoad events
		master.onLoad.forEach(val => val())
		//Force all new onLoad events to run
		master.onLoad = new Proxy(master.onLoad, {
			set: (_target, key, value): boolean => {
				if (key !== "length") value()
				return true
			},
		})
		//Do the same for CPPKIES_ONLOAD
		if (!window.CPPKIES_ONLOAD) window.CPPKIES_ONLOAD = []
		//Run all onLoad events
		window.CPPKIES_ONLOAD.forEach(val => val())
		//Force all new onLoad events to run
		window.CPPKIES_ONLOAD = new Proxy(master.onLoad, {
			set: (_target, key, value): boolean => {
				if (key !== "length") value()
				return true
			},
		})
		postInject()
	})
}
export default CppkiesExport
export { InjectParams } from "./helpers"
