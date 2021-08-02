import { main } from "./injects/basegame"
import { prod } from "../isprod.json"
import { exportSave, importSave } from "./saves"
import { createBuildingHooks } from "./injects/buildings"

let loaded = false

/**
 * An array of functions to call on Cppkies load
 * Functions pushed here after Cppkies has loaded are executed immediately
 * It is reccomended to use `Cppkies.deffer` instead
 */
export const onLoad: Array<() => void> = new Proxy([], {
	set: (target, key, value): boolean => {
		if (typeof value === "function" && loaded) value()
		target[key] = value
		return true
	},
})

let defferResolve: (() => void) | undefined

/**
 * A promise which is resolved on Cppkies load
 */
export const deffer = new Promise<void>(res => (defferResolve = res))

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
} else {
	for (const building of Game.ObjectsById) createBuildingHooks(building)
	main().then(() => {
		loaded = true
		if (isFirstCppkies) {
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
	})
}
