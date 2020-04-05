import { injectCode } from "../helpers"
import Game from "../gameType"
import { Injection } from "./generic"

declare global {
	interface Window {
		Game: Game
		Beautify: Function
	}
}
/**
 * Creates the function hooks for base game
 * @returns A promise
 */
export function main(): Promise<{ [key: string]: Function[] }> {
	return new Promise(resolve => {
		const dummy = {}
		const injections: Array<Injection> = [
			//// -- Custom menus -- ////
			/*
			Hooks that allow you to add new stuff do the menu 

			customOptionsMenu()
			Allows you to add entries to the options menu

			customStatsMenu()
			Allows you to add entries to the stats menu

			customInfoMenu()
			Allows you to add entries to the info menu

			customMenu()
			Allows you to add entries to all menus
			*/
			new Injection("customMenu", () => {
				window.Game.UpdateMenu = injectCode(
					window.Game.UpdateMenu,
					null,
					`
					// Cppkies injection
					switch (Game.onMenu) {
						case "prefs":
							for(const i in Cppkies.hooks.customOptionsMenu) Cppkies.hooks.customOptionsMenu[i]();
							break;
						case "stats":
							for(const i in Cppkies.hooks.customStatsMenu) Cppkies.hooks.customStatsMenu[i]();
							break;
						case "log":
							for(const i in Cppkies.hooks.customInfoMenu) Cppkies.hooks.customInfoMenu[i]();
							break;
						default:
							break;
					}
					for(const i in Cppkies.hooks.customMenu) Cppkies.hooks.customMenu[i]();
					`,
					"before"
				)
			}),
			new Injection("customOptionsMenu"),
			new Injection("customStatsMenu"),
			new Injection("customInfoMenu"),
			//// -- Data manipulation -- ////
			/*
			General Description

			customLoad() 
			Allows you to execute a function on data load, useful for custom data loading

			customReset(hard)
			Allows you to execute a function on data load, useful for custom data resetting
			hard: bool - whether or not this is a hard reset
			*/
			new Injection("customLoad", () => {
				window.Game.LoadSave = injectCode(
					window.Game.LoadSave,
					"if (Game.prefs.showBackupWarning==1)",
					`
					// Cppkies injection
					for(const i in Cppkies.hooks.customLoad) Cppkies.hooks.customLoad[i](); 
					`,
					"before"
				)
			}),
			new Injection("customReset", () => {
				window.Game.Reset = injectCode(
					window.Game.Reset,
					null,
					`
					// Cppkies injection
					for(const i in Cppkies.hooks.customReset) Cppkies.hooks.customReset[i](hard);
					`,
					"before"
				)
			}),

			//// -- Sugar Lump -- ////
			// TODO Rewrite Game.computeLumpType
			// TODO Cppkies.hooks.customComputeLumpType
			// TODO Cppkies.hooks.customDoLumps
			//// -- Economics -- ////
			// TODO Cppkies.hooks.customCps
			//// -- Shimmers -- ////
			// TODO everything shimmer related
			//// -- Prompts -- ////
			//Idk what here
			//// -- Menus -- ////
			// TODO Patch disabled buttons(?)
			//// -- Buildings -- ////
			new Injection("postBuildStore", () => {
				window.Game.BuildStore = injectCode(
					window.Game.BuildStore,
					null,
					";\nfor(const i in Cppkies.hooks.postBuildStore) Cppkies.hooks.postBuildStore[i]()",
					"after"
				)
			}),
			new Injection("customGrandmaPic", () => {
				window.Game.Objects.Grandma.art.pic = injectCode(
					window.Game.Objects.Grandma.art.pic,
					"return choose(list)+'.png'",
					`// Cppkies injection
					list = list.concat(Cppkies.hooks.customGrandmaPic.map(val=>val() || null).filter(val=>val !== null))
					`,
					"before"
				)
			}),
		]
		injections.forEach(inject => {
			dummy[inject.value] = inject.defValue
			if (inject.func) inject.func()
		})
		//Misc stuff
		window.Game.Loader.Load = injectCode(
			window.Game.Loader.Load,
			"img.src=this.domain",
			"img.src=(assets[i].indexOf('http') !== -1 ? \"\" : this.domain)",
			"replace"
		)
		resolve(dummy)
	})
}
