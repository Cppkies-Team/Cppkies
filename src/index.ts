import {
	alias,
	aliases,
	extraColumnIcons,
	extraRowIcons,
	patchIconsheet,
	relinkColumn,
	relinkRow,
	resolveAlias,
	resolveIcon,
	unalias,
} from "./spritesheets"
const icons = {
	alias,
	aliases,
	extraColumnIcons,
	extraRowIcons,
	patchIconsheet,
	relinkColumn,
	relinkRow,
	resolveAlias,
	resolveIcon,
	unalias,
}
export { icons }

import { main } from "./injects/basegame"

export { miscValues } from "./vars"
export { InjectParams } from "./helpers"
export * from "./upgrade"
export * from "./achievement"
export * from "./buildings"
export * from "./dragon"
export * from "./milk"
export * from "./tiers"
export { default as hooks } from "./injects/basegame"
export { buildingHooks } from "./injects/buildings"
import { prod } from "../isprod.json"
import { exportSave, importSave } from "./saves"
import { hookAllBuildings } from "./injects/buildings"

declare global {
	interface Window {
		CPPKIES_ONLOAD: (() => void)[] | undefined
	}
}

let loaded = false

export const onLoad: Array<() => void> = new Proxy([], {
	set: (target, key, value): boolean => {
		if (typeof value === "function" && loaded) value()
		target[key] = value
		return true
	},
})

// If Cppkies exists, don't do much
if (window.__INTERNAL_CPPKIES_HOOKS__) {
	loaded = true
	onLoad.forEach(val => val())
} else
	main().then(() => {
		loaded = true
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
		onLoad.forEach(val => val())
		//Force all new onLoad events to run

		//Do the same for CPPKIES_ONLOAD
		if (!window.CPPKIES_ONLOAD) window.CPPKIES_ONLOAD = []
		//Run all onLoad events
		window.CPPKIES_ONLOAD.forEach(val => val())
		//Force all new onLoad events to run
		window.CPPKIES_ONLOAD = new Proxy([], {
			set: (_target, key, value): boolean => {
				if (key !== "length") value()
				return true
			},
		})
	})
