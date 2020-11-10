import { injectCode } from "../helpers"
import { Injection } from "./generic"
//import { Icon } from "../types/gameType"

export interface Hooks {
	//! Custom menus
	/**
	 * Allows you to add entries to all menus
	 */
	customMenu: (() => void)[]
	/**
	 * Allows you to add entries to the options menu
	 */
	customOptionsMenu: (() => void)[]
	/**
	 * Allows you to add entries to the stats menu
	 */
	customStatsMenu: (() => void)[]
	/**
	 * Allows you to add entries to the info menu
	 */
	customInfoMenu: (() => void)[]

	//! Data manipulation

	/**
	 * Allows you to execute a function on data load, useful for custom data loading
	 */
	customLoad: (() => void)[]

	/**
	 * Allows you to execute a function on data load, useful for custom data resetting
	 * @param hard whether or not this is a hard reset
	 */
	customReset: ((hard: boolean) => void)[]
	//! Tiers
	/**
	 * Overrides for icons gotten from GetIcon
	 * @param type The type of icon, either a building name or "Kitten"
	 * @param tier The tier of the icon, gotten from Tier.iconRow
	 * @param icon The current icon
	 * @returns An icon
	 */
	customGetIcon: ((
		type: string,
		tier: string | number,
		icon: Game.Icon
	) => Game.Icon)[]

	//! Buildings
	/**
	 * Called after BuildStore, used internally
	 */
	postBuildStore: (() => void)[]
	/**
	 * Adds grandma options, must return a truthy value to be considered an image
	 * @returns A link to an image, or a falsy value
	 */
	customGrandmaPic: (() => string | null)[]
}
/**
 * Creates the function hooks for base game
 * @returns A promise
 */
export function main(): Promise<Hooks> {
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
				Game.UpdateMenu = injectCode(
					Game.UpdateMenu,
					null,
					`
					// Cppkies injection
					switch (Game.onMenu) {
						case "prefs":
							for(const i in Cppkies.hooks.customOptionsMenu) Cppkies.hooks.customOptionsMenu[i]()
							break
						case "stats":
							for(const i in Cppkies.hooks.customStatsMenu) Cppkies.hooks.customStatsMenu[i]()
							break
						case "log":
							for(const i in Cppkies.hooks.customInfoMenu) Cppkies.hooks.customInfoMenu[i]()
							break
					}
					for(const i in Cppkies.hooks.customMenu) Cppkies.hooks.customMenu[i]()
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
			hard: boolean - whether or not this is a hard reset
			*/
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
			}),
			//// -- Tiers -- ////
			/**
				customGetIcon(type, tier, icon)
				Overrides for icons gotten from GetIcon
				type: string - The type of icon, either a building name or "Kitten"
				tier: string - The tier of the icon, gotten from Tier.iconRow
				icon: Icon - the current icon
			 */
			new Injection("customGetIcon", () => {
				Game.GetIcon = injectCode(
					Game.GetIcon,
					"return [col,Game.Tiers[tier].iconRow];",
					`
					// Cppkies Injection
					let icon = [col, Game.Tiers[tier].iconRow]
					for(const i in Cppkies.hooks.customGetIcon) icon = Cppkies.hooks.customGetIcon[i](type, tier, icon) || icon
					return icon
`,
					"replace"
				) as typeof Game.GetIcon
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
			/**
				Called after BuildStore, used internally
			 */
			new Injection("postBuildStore", () => {
				Game.BuildStore = injectCode(
					Game.BuildStore,
					null,
					";\nfor(const i in Cppkies.hooks.postBuildStore) Cppkies.hooks.postBuildStore[i]()",
					"after"
				)
			}),
			/**
				Adds grandma options, must return a truthy value to be considered an image
			 */
			new Injection("customGrandmaPic", () => {
				Game.Objects.Grandma.art.pic = injectCode(
					Game.Objects.Grandma.art.pic as (
						building: Game.Object,
						i: number
					) => string,
					"return choose(list)+'.png'",
					`// Cppkies injection
					list = list.concat(Cppkies.hooks.customGrandmaPic.map(val=> val()).filter(val => val))
					`,
					"before"
				) as (building: Game.Object, i: number) => string
			}),
		]
		injections.forEach(inject => {
			dummy[inject.value] = inject.defValue
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
		) as (this: Game.Object) => void
		resolve(dummy as Hooks)
	})
}
