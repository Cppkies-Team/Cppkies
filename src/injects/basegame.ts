import { injectCode, injectCodes } from "../helpers"
import { ReturnableEventEmitter } from "../lib/eventemitter"
import { Injection } from "./generic"

export type Hooks = ReturnableEventEmitter<{
	//! Custom menus
	/**
	 * Allows you to add entries to all menus
	 */
	menu: [void, void]
	/**
	 * Allows you to add entries to the options menu
	 */
	optionsMenu: [void, void]
	/**
	 * Allows you to add entries to the stats menu
	 */
	statsMenu: [void, void]
	/**
	 * Allows you to add entries to the info menu
	 */
	infoMenu: [void, void]

	//! Data manipulation

	/**
	 * Allows you to execute a function on before saving, useful for cleaning up data which will be invalid if no mod is present
	 */
	preSave: [void, void]

	postSave: [void, void]
	/**
	 * Allows you to execute a function on data load, useful for custom data resetting
	 * @param hard whether or not this is a hard reset
	 */
	reset: [boolean, void]

	reincarnate: [void, void]
	//! Tiers

	getIcon: [
		{
			type: string
			tier: string | number
			icon: Game.Icon
		},
		{
			type: string
			tier: string | number
			icon: Game.Icon
		}
	]

	//! Buildings
	/**
	 * Called after BuildStore, used internally
	 */
	buildStore: [void, void]
	/**
	 * Adds grandma options for the grandma art
	 */
	grandmaPic: [string[], string[]]
	//! Gameplay
	rawCps: [number, number]
	rawCpsMult: [number, number]
	cps: [number, number]
	cpsMult: [number, number]
	/**
	 * The multiplier of cursor finger bonus
	 */
	cursorFingerMult: [number, number]
	/**
	 * Cookies per click
	 */
	cpc: [number, number]
	cpcAdd: [number, number]
	//! Vanilla hooks
	logic: [void, void]
	draw: [void, void]
	check: [void, void]
	ticker: [string[], string[]]
	// !!!INTERNAL DO NOT USE!!! Use buildingHooks' "cps" instead
	buildingCps: [
		{ building: string; cps: number },
		{ building: string; cps: number }
	]
	//! Special objects hooks
	specialPic: [
		{ tab: string; pic: string; frame: number },
		{ tab: string; pic: string; frame: number }
	]
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
					"after"
				)
			}),
			//// -- Data manipulation -- ////

			new Injection("preSave", () => {
				Game.WriteSave = injectCode(
					Game.WriteSave,
					null,
					`
					// Cppkies injection
					Cppkies.hooks.emit("preSave")
					`,
					"before"
				)
			}),
			new Injection("postSave", () => {
				Game.WriteSave = injectCode(
					Game.WriteSave,
					"if (type==2 || type==3)",
					`
					// Cppkies injection
					Cppkies.hooks.emit("postSave")
					`,
					"before"
				)
			}),
			new Injection("reset", () => {
				// Called before everything else, so ascend with _ achievements are possible
				Game.Reset = injectCode(
					Game.Reset,
					null,
					`
					// Cppkies injection
					Cppkies.hooks.constEmit("reset", hard)
					`,
					"before"
				)
			}),
			new Injection("reincarnate", () => {
				Game.registerHook("reincarnate", () => emitter.emit("reincarnate"))
			}),
			//// -- Tiers -- ////
			/**
				"customGetIcon"
				Overrides for icons gotten from GetIcon
				type: string - The type of icon, either a building name or "Kitten"
				tier: string - The tier of the icon, gotten from Tier.iconRow
				icon: Icon - the current icon
			 */
			new Injection("getIcon", () => {
				Game.GetIcon = injectCodes(Game.GetIcon, [
					[
						"return [col,Game.Tiers[tier].iconRow];",
						`// Cppkies Injection
					return Cppkies.hooks.emit("getIcon", { icon: [col, Game.Tiers[tier].iconRow], tier: tier, type: type }).icon`,
						"replace",
					],
					["col=18;", 'else if (type === "Mouse") col = 11;', "after"],
				])
			}),
			//// -- Sugar Lump -- ////
			// TODO Rewrite Game.computeLumpType
			// TODO Cppkies.hooks.customComputeLumpType
			// TODO Cppkies.hooks.customDoLumps
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
				)
			}),
			//// -- Gameplay -- ////
			new Injection("cps", () => {
				Game.CalculateGains = injectCodes(Game.CalculateGains, [
					[
						"var rawCookiesPs=Game.cookiesPs*mult;",
						`// Cppkies injection
					Game.cookiesPs = Cppkies.hooks.emit("rawCps", Game.cookiesPs);
					mult = Cppkies.hooks.emit("rawCpsMult", mult);\n`,
						"before",
					],
					[
						"Game.cookiesPs=Game.runModHookOnValue('cps',Game.cookiesPs);",
						`// Cppkies injection
						mult = Cppkies.hooks.emit("cpsMult", mult);\n`,
						"before",
					],
				])
				Game.registerHook("cps", cps => emitter.emit("cps", cps))
			}),
			new Injection("cursorFingerMult", () => {
				Game.Objects.Cursor.cps = injectCode(
					Game.Objects.Cursor.cps,
					`var mult=1;`,
					`// Cppkies injection
add = Cppkies.hooks.emit("cursorFingerMult", add);\n`,
					"before"
				)
			}),
			new Injection("cpc", () => {
				Game.mouseCps = injectCodes(Game.mouseCps, [
					[
						`var num=0;`,
						`// Cppkies injection
						add = Cppkies.hooks.emit("cursorFingerMult", add);\n`,
						"before",
					],
					[
						`var out`,
						`// Cppkies injection
						add = Cppkies.hooks.emit("cpcAdd", add);\n`,
						"before",
					],
				])

				Game.registerHook("cookiesPerClick", cpc => emitter.emit("cpc", cpc))
			}),
			// !!!INTERNAL DO NOT USE!!! Use buildingHooks' "cps" instead
			new Injection("buildingCps", () => {
				Game.CalculateGains = injectCode(
					Game.CalculateGains,
					"me.storedTotalCps=me.amount*me.storedCps;",
					`// Cppkies injection (internal, do not use)
me.storedCps = Cppkies.hooks.emit("buildingCps", { building: i, cps: me.storedCps }).cps;\n`,
					"before"
				)
			}),
			//// -- Vanilla -- ////
			new Injection("logic", () => {
				Game.registerHook("logic", () => emitter.emit("logic"))
			}),
			new Injection("draw", () => {
				Game.registerHook("draw", () => emitter.emit("draw"))
			}),
			new Injection("check", () => {
				Game.registerHook("check", () => emitter.emit("check"))
			}),
			new Injection("ticker", () => {
				Game.getNewTicker = injectCode(
					Game.getNewTicker,
					"Game.TickerAge=Game.fps*10;",
					`// Cppkies injection
list = Cppkies.hooks.emit("ticker", list);\n`,
					"before"
				)
			}),
			//// -- Specials -- ////
			new Injection("specialPic", () => {
				Game.DrawSpecial = injectCode(
					Game.DrawSpecial,
					"if (hovered || selected)",
					`// Cppkies injection
const override = Cppkies.hooks.emit("specialPic", {tab: Game.specialTabs[i], frame: frame, pic: pic})
pic = override.pic
frame = override.frame;\n`,
					"before"
				)
				Game.ToggleSpecialMenu = injectCode(
					Game.ToggleSpecialMenu,
					"else {pic='dragon.png?v='+Game.version;frame=4;}",
					`// Cppkies injection
const override = Cppkies.hooks.emit("specialPic", {tab: Game.specialTab, frame: frame, pic: pic})
pic = override.pic
frame = override.frame;\n`,
					"after"
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
		Game.UpdateMenu = injectCodes(Game.UpdateMenu, [
			[
				"url(img/'+milk.pic+'.png)",
				"url(' + (milk.pic.indexOf('http') >= 0 ? milk.pic : 'img/'+milk.pic) + '.png)",
				"replace",
			],
			[
				"img/icons.png?v='+Game.version+'",
				"' + (Game.Milks[i].iconLink ? Game.Milks[i].iconLink : 'img/icons.png?v='+Game.version) + '",
				"replace",
			],
		])

		Game.ToggleSpecialMenu = injectCodes(Game.ToggleSpecialMenu, [
			[
				">=5",
				'>=Game.dragonLevels.findIndex(val => val.name === "Krumblor, cookie hatchling")',
				"replace",
			],
			[
				">=25",
				'>=Game.dragonLevels.findIndex(val => val.action === "Train secondary aura<br><small>Lets you use two dragon auras simultaneously</small>") + 1',
				"replace",
			],
		])
		Game.Objects.Cursor.buyFunction = injectCode(
			Game.Objects.Cursor.buyFunction,
			"Game.Unlock('Octillion fingers');",
			`
 			// Cppkies injection
			for(const i in this.tieredUpgrades) {
				if (isNaN(parseInt(i))) continue
				if (this.amount >= Game.Tiers[this.tieredUpgrades[i].tier].unlock - 50) this.tieredUpgrades[i].unlock()
			}
`,
			"after"
		)
		Game.Object = injectCode(
			Game.Object,
			"Game.ObjectsN++",
			`
// Cppkies injection
Cppkies.hookAllBuildings();\n`,
			"after"
		)
		Game.CalculateGains = injectCode(
			Game.CalculateGains,
			"var catMult=1;",
			`// Cppkies injection
			Cppkies.hiddenMilkMult = milkMult;\n`,
			"before"
		)
		resolve(emitter)
	})
}
