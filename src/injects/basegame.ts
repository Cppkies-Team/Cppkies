import { injectCode } from "../helpers"
import { ReturnableEventEmitter } from "../lib/eventemitter"
import { Injection } from "./generic"

export type Hooks = ReturnableEventEmitter<{
	//! Custom menus
	/**
	 * Allows you to add entries to all menus
	 */
	menu: void
	/**
	 * Allows you to add entries to the options menu
	 */
	optionsMenu: void
	/**
	 * Allows you to add entries to the stats menu
	 */
	statsMenu: void
	/**
	 * Allows you to add entries to the info menu
	 */
	infoMenu: void

	//! Data manipulation

	/**
	 * Allows you to execute a function on data load, useful for custom data loading
	 *
	customLoad: void

	/**
	 * Allows you to execute a function on data load, useful for custom data resetting
	 * @param hard whether or not this is a hard reset
	 *
	customReset: boolean
*/
	//! Tiers

	getIcon: {
		type: string
		tier: string | number
		icon: Game.Icon
	}

	//! Buildings
	/**
	 * Called after BuildStore, used internally
	 */
	buildStore: void
	/**
	 * Adds grandma options, must return a truthy value to be considered an image
	 * @returns A link to an image, or a falsy value
	 */
	grandmaPic: string[]
	//! Gameplay
	rawCps: number
	cps: number
	cpsMult: number
}>
/**
 * Creates the function hooks for base game
 * @returns A promise
 */
export function main(): Promise<Hooks> {
	return new Promise(resolve => {
		const emitter: Hooks = new ReturnableEventEmitter()
		const injections: Array<Injection> = [
			//// -- Custom menus -- ////
			/*
			Hooks that allow you to add new stuff do the menu 

			"optionsMenu"
			Allows you to add entries to the options menu

			"statsMenu"
			Allows you to add entries to the stats menu

			"logMenu"
			Allows you to add entries to the info menu

			"menu"
			Allows you to add entries to all menus
			*/
			new Injection("customMenu", () => {
				Game.UpdateMenu = injectCode(
					Game.UpdateMenu,
					null,
					`
					// Cppkies injection
					switch (Game.onMenu) {
						case "prefs":
							Cppkies.hooks.emit("optionsMenu")
							break
						case "stats":
							Cppkies.hooks.emit("statsMenu")
							break
						case "log":
							Cppkies.hooks.emit("logMenu")
							break
					}
					Cppkies.hooks.emit("menu")
					`,
					"before"
				)
			}),
			//// -- Data manipulation -- ////
			// TODO: Will be a 0.3 thing
			/*
			General Description
			Allows you to execute a function on data load, useful for custom data loading

			customReset(hard)
			Allows you to execute a function on data load, useful for custom data resetting
			hard: boolean - whether or not this is a hard reset
			
			new Injection("customLoad", () => {
				Game.LoadSave = injectCode(
					Game.LoadSave,
					"if (Game.prefs.showBackupWarning==1)",
					`
					// Cppkies injection
					for(const i in Cppkies.hooks.customLoad) Cppkies.hooks.customLoad[i]()
					`,
					"before"
				)
			}),
			new Injection("customReset", () => {
				Game.Reset = injectCode(
					Game.Reset,
					null,
					`
					// Cppkies injection
					for(const i in Cppkies.hooks.customReset) Cppkies.hooks.customReset[i](hard)
					`,
					"before"
				)
			}),*/
			//// -- Tiers -- ////
			/**
				"customGetIcon"
				Overrides for icons gotten from GetIcon
				type: string - The type of icon, either a building name or "Kitten"
				tier: string - The tier of the icon, gotten from Tier.iconRow
				icon: Icon - the current icon
			 */
			new Injection("getIcon", () => {
				Game.GetIcon = injectCode(
					Game.GetIcon,
					"return [col,Game.Tiers[tier].iconRow];",
					`
					// Cppkies Injection
					return Cppkies.hooks.emit("getIcon", { icon: [col, Game.Tiers[tier].iconRow], tier: tier, type: type })`,
					"replace"
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
			// Idk what here
			//// -- Menus -- ////
			// TODO Patch disabled buttons(?)
			//// -- Buildings -- ////
			new Injection("buildStore", () => {
				Game.BuildStore = injectCode(
					Game.BuildStore,
					null,
					`;\nCppkies.hooks.emit("buildStore")`,
					"after"
				)
			}),
			new Injection("grandmaPic", () => {
				Game.Objects.Grandma.art.pic = injectCode(
					Game.Objects.Grandma.art.pic as (
						building: Game.Object,
						i: number
					) => string,
					"return choose(list)+'.png'",
					`// Cppkies injection
					list = Cppkies.hooks.emit("grandmaPic", list)
					`,
					"before"
				) as (building: Game.Object, i: number) => string
			}),
			//// -- Gameplay -- ////
			new Injection("cps", () => {
				Game.CalculateGains = injectCode(
					Game.CalculateGains,
					"Game.cookiesPsRaw=rawCookiesPs;",
					'rawCookiesPs = Cppkies.hooks.emit("rawCps", rawCookiesPs);\n',
					"before"
				)
				Game.CalculateGains = injectCode(
					Game.CalculateGains,
					"Game.cookiesPs=Game.runModHookOnValue('cps',Game.cookiesPs);",
					`mult = Cppkies.hooks.emit("cpsMult", mult);
Game.cookiesPs = Cppkies.hooks.emit("cps", Game.cookiesPs);\n`,
					"before"
				)
			}),
		]
		injections.forEach(inject => {
			inject.func?.()
		})
		//Misc stuff
		Game.Loader.Load = injectCode(
			Game.Loader.Load,
			"img.src=this.domain",
			`
			// Cppkies injection
			img.src = (assets[i].indexOf('http') !== -1 ? "" : this.domain)
`,
			"replace"
		)
		Game.Objects.Cursor.buyFunction = injectCode(
			Game.Objects.Cursor.buyFunction,
			"Game.Unlock('Octillion fingers');",
			`
 			// Cppkies injection
			for(const i in this.tieredUpgrades) {
				if (isNaN(parseInt(i))) break
				if (this.amount >= Game.Tiers[this.tieredUpgrades[i].tier].unlock - 50) this.tieredUpgrades[i].unlock()
			}
`,
			"after"
		)
		resolve(emitter)
	})
}
