export { iconsNamespace as icons } from "./spritesheets"
export { miscValues } from "./vars"
export { InjectParams, injectCode, injectCodes } from "./helpers"
export * from "./upgrades"
export * from "./achievements"
export * from "./buildings"
export * from "./dragon"
export * from "./milk"
export * from "./tiers"
export * from "./mods"
export * from "./modUI"
export { default as hooks } from "./injects/basegame"
export { buildingHooks } from "./injects/buildings"
export { save } from "./saves"
export * from "./ccUI"

declare global {
	interface Window {
		CPPKIES_ONLOAD: (() => void)[] | undefined
		Cppkies: unknown
	}
}

export { deffer, onLoad } from "./loadValues"
export * from "./minigames"

import { prod } from "../isprod.json"
import { exportSave, importSave } from "./saves"

import { defferResolve, setLoaded, onLoad, todoBeforeLoad } from "./loadValues"

const isFirstCppkies = !window.__INTERNAL_CPPKIES_HOOKS__

if (isFirstCppkies && Game.UpdateMenu.toString().includes("Cppkies")) {
	Game.Prompt(
		`<h3>Hello!</h3>
<div class="block">
It seems like you are trying to load Cppkies 0.3 or higher while having Cppkies 0.2 or lower already loaded.<br/>
Sadly, due to internal changes, Cppkies 0.3 mods are incompatible with Cppkies 0.2 mods. <br/>
(The mod will still be launched, but it may or may not work correctly)<br/>
<small>((If you are a mod author, please update your mods to use Cppkies 0.3 or higher.))</small><br/>
</div>`,
		[[`Ok${Math.random() < 0.01 ? " boomer" : ""}`, "Game.ClosePrompt()"]]
	)
}
if (isFirstCppkies)
	window.__INTERNAL_CPPKIES_HOOKS__ = {
		hiddenMilkMult: 1,
		injectedHooks: new Set(),
		injectedBuildingHooks: {},
	}
todoBeforeLoad.map(val => val())

setLoaded()
if (isFirstCppkies) {
	Game.Notify("Cppkies loaded!", "", [32, prod ? 17 : 21], 1.5)

	const cppkiesNote = document.createElement("div")
	cppkiesNote.textContent = "Cppkies!"
	const topBar = document.querySelector("#topBar")
	if (topBar) topBar.insertBefore(cppkiesNote, topBar.children[1])

	if (!Game.modSaveData["cppkies"]) Game.modSaveData["cppkies"] = "{}"
	Game.registerMod("cppkies", {
		save: exportSave,
		load: importSave,
		init: () => {},
	})
}
//Run all onLoad events
onLoad.forEach(val => val())
//Force all new onLoad events to run
if (isFirstCppkies) {
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
}
defferResolve?.()
