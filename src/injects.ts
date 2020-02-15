import { injectCode } from "./helpers"
import Game, { Cppkies } from "./gameType"

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
		class Injection {
			constructor(
				public value: string,
				public defValue: [],
				public func?: Function
			) {}
		}
		const dummy = {}
		const injections: Array<Injection> = [
			//Custom menus
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
			//Data manipulation
			new Injection("customLoad", [], () => {
				window.Game.LoadSave = injectCode(
					window.Game.LoadSave,
					"if (Game.prefs.showBackupWarning==1)",
					`
					// Cppkies injection
					for(const i in CLL.customLoad) CLL.customLoad[i](); 
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
			//Misc
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
			//Tooltips
			new Injection("customTooltipDraw", [], () => {
				window.Game.tooltip.draw = injectCode(
					window.Game.tooltip.draw,
					null,
					`
					// Cppkies injection
					for(const i in Cppkies.hooks.customTooltipDraw) CLL.customTooltipDraw[i](from, text, origin);
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
					for(const i in Cppkies.hooks.customTooltipUpdate) CLL.customTooltipUpdate[i]();
					`,
					"before"
				)
			}),
			//Ascension
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
			new Injection("customHeavenlyMultiplier", []),
			new Injection("UpdateAscensionModePrompt", []),
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
