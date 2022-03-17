import { injectCode, injectCodes } from "../helpers"
import { ReturnableEventEmitter } from "../lib/eventemitter"
import { todoBeforeLoad } from "../loadValues"
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
	 * Allows you to execute a function on data reset, useful for custom data resetting
	 * @param hard whether or not this is a hard reset
	 */
	reset: [boolean, void]

	reincarnate: [void, void]
	preLoad: [void, void]
	minigameSave: [
		{ building: Game.Object; save: string },
		{ building: Game.Object; save: string }
	]
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

const hooks: Hooks = new ReturnableEventEmitter()

export default hooks

/**
 * Creates the function hooks for base game
 * @returns A promise
 */
export function injectBasegame(): void {
	if (__INTERNAL_CPPKIES__.basegame)
		__INTERNAL_CPPKIES__.basegame.setForwardTarget(hooks)

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
		new Injection("menu", () => {
			Game.UpdateMenu = injectCode(
				Game.UpdateMenu,
				null,
				`
					// Cppkies injection
					switch (Game.onMenu) {
						case "prefs":
							__INTERNAL_CPPKIES__.basegame.emit("optionsMenu")
							break
						case "stats":
							__INTERNAL_CPPKIES__.basegame.emit("statsMenu")
							break
						case "log":
							__INTERNAL_CPPKIES__.basegame.emit("logMenu")
							break
					}
					__INTERNAL_CPPKIES__.basegame.emit("menu")
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
					__INTERNAL_CPPKIES__.basegame.emit("preSave")
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
					__INTERNAL_CPPKIES__.basegame.emit("postSave")
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
					__INTERNAL_CPPKIES__.basegame.constEmit("reset", hard)
					`,
				"before"
			)
		}),
		new Injection("reincarnate", () => {
			Game.registerHook("reincarnate", () => hooks.emit("reincarnate"))
		}),
		new Injection("preLoad", () => {
			Game.LoadSave = injectCode(
				Game.LoadSave,
				null,
				'__INTERNAL_CPPKIES__.isFirstLoad = false;\n__INTERNAL_CPPKIES__.basegame.emit("preLoad");\n',
				"before"
			)
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
					return __INTERNAL_CPPKIES__.basegame.emit("getIcon", { icon: [col, Game.Tiers[tier].iconRow], tier: tier, type: type }).icon`,
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
				`;\n__INTERNAL_CPPKIES__.basegame.emit("buildStore")`,
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
					list = __INTERNAL_CPPKIES__.basegame.emit("grandmaPic", list)
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
					Game.cookiesPs = __INTERNAL_CPPKIES__.basegame.emit("rawCps", Game.cookiesPs);
					mult = __INTERNAL_CPPKIES__.basegame.emit("rawCpsMult", mult);\n`,
					"before",
				],
				[
					"Game.cookiesPs=Game.runModHookOnValue('cps',Game.cookiesPs);",
					`// Cppkies injection
						mult = __INTERNAL_CPPKIES__.basegame.emit("cpsMult", mult);\n`,
					"before",
				],
			])
			Game.registerHook("cps", cps => hooks.emit("cps", cps))
		}),
		new Injection("cursorFingerMult", () => {
			Game.Objects.Cursor.cps = injectCode(
				Game.Objects.Cursor.cps,
				`var mult=1;`,
				`// Cppkies injection
add = __INTERNAL_CPPKIES__.basegame.emit("cursorFingerMult", add);\n`,
				"before"
			)
		}),
		new Injection("cpc", () => {
			Game.mouseCps = injectCodes(Game.mouseCps, [
				[
					`var num=0;`,
					`// Cppkies injection
						add = __INTERNAL_CPPKIES__.basegame.emit("cursorFingerMult", add);\n`,
					"before",
				],
				[
					`var out`,
					`// Cppkies injection
						add = __INTERNAL_CPPKIES__.basegame.emit("cpcAdd", add);\n`,
					"before",
				],
			])

			Game.registerHook("cookiesPerClick", cpc => hooks.emit("cpc", cpc))
		}),
		// !!!INTERNAL DO NOT USE!!! Use buildingHooks' "cps" instead
		new Injection("buildingCps", () => {
			Game.CalculateGains = injectCode(
				Game.CalculateGains,
				"me.storedTotalCps=me.amount*me.storedCps;",
				`// Cppkies injection (internal, do not use)
me.storedCps = __INTERNAL_CPPKIES__.basegame.emit("buildingCps", { building: i, cps: me.storedCps }).cps;\n`,
				"before"
			)
		}),
		//// -- Vanilla -- ////
		new Injection("logic", () => {
			Game.registerHook("logic", () => hooks.emit("logic"))
		}),
		new Injection("draw", () => {
			Game.registerHook("draw", () => hooks.emit("draw"))
		}),
		new Injection("check", () => {
			Game.registerHook("check", () => hooks.emit("check"))
		}),
		new Injection("ticker", () => {
			Game.getNewTicker = injectCode(
				Game.getNewTicker,
				"Game.TickerAge=Game.fps*10;",
				`// Cppkies injection
list = __INTERNAL_CPPKIES__.basegame.emit("ticker", list);\n`,
				"before"
			)
		}),
		//// -- Specials -- ////
		new Injection("specialPic", () => {
			Game.DrawSpecial = injectCode(
				Game.DrawSpecial,
				"if (hovered || selected)",
				`// Cppkies injection
const override = __INTERNAL_CPPKIES__.basegame.emit("specialPic", {tab: Game.specialTabs[i], frame: frame, pic: pic})
pic = override.pic
frame = override.frame;\n`,
				"before"
			)
			Game.ToggleSpecialMenu = injectCode(
				Game.ToggleSpecialMenu,
				"else {pic='dragon.png?v='+Game.version;frame=4;}",
				`// Cppkies injection
const override = __INTERNAL_CPPKIES__.basegame.emit("specialPic", {tab: Game.specialTab, frame: frame, pic: pic})
pic = override.pic
frame = override.frame;\n`,
				"after"
			)
		}),
		new Injection("autoMoveDragonLevels", () => {
			Game.ToggleSpecialMenu = injectCodes(Game.ToggleSpecialMenu, [
				[
					">=5",
					'>=Game.dragonLevels.findIndex(val => val.name === "Krumblor, cookie hatchling")',
					"replace",
				],
				[
					/>=\d{2}/g,
					'>=Game.dragonLevels.findIndex(val => val.action === "Train secondary aura<br><small>Lets you use two dragon auras simultaneously</small>") + 1',
					"replace",
				],
			])
		}),
		new Injection("loaderFreedom", () => {
			Game.UpdateMenu = injectCodes(Game.UpdateMenu, [
				[
					"url(img/'+milk.pic+')",
					"url(' + (milk.pic.indexOf('/') >= 0 ? milk.pic : 'img/' + milk.pic) + ')",
					"replace",
				],
				[
					"img/icons.png?v='+Game.version+'",
					"' + (Game.Milks[i].iconLink ? Game.Milks[i].iconLink : 'img/icons.png?v='+Game.version) + '",
					"replace",
				],
			])
		}),
		new Injection("milkMult", () => {
			Game.CalculateGains = injectCode(
				Game.CalculateGains,
				"var catMult=1;",
				`// Cppkies injection
			__INTERNAL_CPPKIES__.hiddenMilkMult = milkMult;\n`,
				"before"
			)
		}),
		new Injection("overrideMinigameSave", () => {
			Game.LoadSave = injectCode(
				Game.LoadSave,
				"if (me.minigame",
				`if (mestr[4]) mestr[4] = __INTERNAL_CPPKIES__.basegame.emit("minigameSave", { building: me, save: mestr[4] }).save;`,
				"before"
			)
		}),
	]
	injections.forEach(inject => inject.runHook())
	__INTERNAL_CPPKIES__.basegame = hooks
}

todoBeforeLoad.push(injectBasegame)
