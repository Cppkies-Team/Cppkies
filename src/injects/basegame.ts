import { injectCode } from "../helpers"
import Game, { Cppkies } from "../gameType"
import master from "../vars"
import { Injection } from "./generic"

declare global {
	interface Window {
		Game: Game
		Cppkies: Cppkies
		Beautify: Function
	}
}
/**
 * Injects functions for basegame
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
			new Injection("customMenu", [], () => {
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
			new Injection("customOptionsMenu", []),
			new Injection("customStatsMenu", []),
			new Injection("customInfoMenu", []),
			//// -- Data manipulation -- ////
			/*
			General Description

			customLoad() 
			Allows you to execute a function on data load, useful for custom data loading

			customReset(hard)
			Allows you to execute a function on data load, useful for custom data resetting
			hard: bool - whether or not this is a hard reset
			*/
			new Injection("customLoad", [], () => {
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
			new Injection("customReset", [], () => {
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
			//// -- Misc -- ////
			/**
			General Description

			customBeautify(value, floats, ret)
			Allows you to "Insert Text Here" should return the new string of a beautied 
			value - original value
			floats - The floating value
			ret - current value

			*/
			new Injection("customBeautify", [], () => {
				window.Beautify = injectCode(
					window.Beautify,
					"return negative?'-'+output:output+decimal;",
					`
					// Cppkies injection
					let ret = negative?'-'+output:output+decimal;
					for(const i in Cppkies.hooks.customBeautify) {
						let returnedValue = Cppkies.hooks.customBeautify[i](value, floats, ret)
						ret = returnedValue ? returnedValue : ret
					};
					return ret;
					`,
					"replace"
				)
			}),
			//// -- Tooltips -- ////
			/*
			General Description
			
			customTooltipDraw(from, text, origin)
			Allows you to "Insert Text Here"
			from - 
			text - 
			origin - 

			customTooltipUpdate()
			Allows you to "Insert Text Here"

			*/
			new Injection("customTooltipDraw", [], () => {
				window.Game.tooltip.draw = injectCode(
					window.Game.tooltip.draw,
					null,
					`
					// Cppkies injection
					for(const i in Cppkies.hooks.customTooltipDraw) Cppkies.hooks.customTooltipDraw[i](from, text, origin);
					`,
					"before"
				)
			}),
			new Injection("customTooltipUpdate", [], () => {
				window.Game.tooltip.update = injectCode(
					window.Game.tooltip.update,
					null,
					`
					// Cppkies injection
					for(const i in Cppkies.hooks.customTooltipUpdate) Cppkies.hooks.customTooltipUpdate[i]();
					`,
					"before"
				)
			}),
			//// -- Ascension -- ////
			/**
			General Description
			
			customHowMuchPrestige(chips, ret)
			Allows you to "Insert Text Here" should return "value"
			chips - How many chips 
			ret - 

			customHeavenlyMultiplier() // TODO
			Allows you to "Insert Text Here"

			UpdateAscensionModePrompt() // TODO
			Allows you to "Insert Text Here"

			*/
			new Injection("customHowMuchPrestige", [], () => {
				window.Game.HowMuchPrestige = injectCode(
					injectCode(
						window.Game.HowMuchPrestige,
						"return",
						"let ret =",
						"replace"
					),
					";",
					`
					// Cppkies injection
					for(const i in Cppkies.hooks.customHowManyCookiesReset){ 
						returnedValue = Cppkies.hooks.customHowManyCookiesReset[i](chips, ret);
						ret = returnedValue ? returnedValue : ret
					}
					return ret;
					`,
					"after"
				)
			}),
			new Injection("customHeavenlyMultiplier", []), //TODO
			new Injection("UpdateAscensionModePrompt", []), //TODO
			new Injection("customReincarnate", []),
			new Injection("customAscend", []),
			new Injection("customUpdateAscend", []),
			new Injection("customBuildAscendTree", []),
			new Injection("customAscend", []),
			//TODO: Everything else
			//Should I declare functions in this file or in another place entirely? - Bob
			//I have to go so just dm me the answer to the question when you have the time

			//// -- Sugar Lump -- ////
			//// -- Economics -- ////
			//// -- Shimmers -- ////
			//// -- Particles -- ////
			//// -- Notifications -- ////
			//// -- Prompts -- ////
			//// -- Menus -- ////
			//// -- Buildings -- ////
			new Injection("customGrandmaPic", [], () => {
				window.Game.Objects.Grandma.art.pic = injectCode(
					window.Game.Objects.Grandma.art.pic,
					"return choose(list)+'.png'",
					`// Cppkies injection
					list = list.concat(Cppkies.hooks.customGrandmaPic.map(val=>val() || null).filter(val=>val !== null))
					`,
					"before"
				)
			}),
			//// -- Unsorted, for quick injections -- ////
			new Injection("postBuildStore", [], () => {
				const oldString = window.Game.BuildStore.toString()
				window.Game.BuildStore = new Proxy(window.Game.BuildStore, {
					apply: (target, _this, args): void => {
						target.apply(_this, args)
						for (const i in master.hooks.postBuildStore)
							master.hooks.postBuildStore[i]()
					},
				})
				window.Game.BuildStore.toString = (): string => oldString
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
