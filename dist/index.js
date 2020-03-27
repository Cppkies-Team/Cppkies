(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Cppkies = factory());
}(this, (function () { 'use strict';

	/**
	 * A helper function which converts a common value to a value
	 * @param value The common value to convert
	 * @helper
	 */
	function getValue(value) {
	    if (value instanceof Function)
	        return value();
	    return value;
	}
	/**
	 * A helper function which escapes special regex characters.
	 * @param str The string to escape
	 * @helper
	 */
	function escapeRegExp(str) {
	    // eslint-disable-next-line no-useless-escape
	    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	/**
	 * A helper function which replaces(or appends) code in a function, returning the new function, and it's eval free!
	 * @param func The source function
	 * @param source What to replace(or act as a anchor where to plane), can be null for slicing
	 * @param target What to put instead(or before/after) the source
	 * @param where Where to insert or replace your injection
	 * @helper
	 */
	function injectCode(func, source, target, where) {
	    var newFuncStr = func.toString();
	    var sliceMode = source === null;
	    var regex;
	    if (!sliceMode) {
	        source = getValue(source);
	        regex = new RegExp(escapeRegExp(source), "g");
	    }
	    target = getValue(target);
	    var findStart = /(\)[^{]*{)/;
	    var findEnd = /(}?)$/;
	    if (!sliceMode && !regex.test(newFuncStr))
	        console.warn("Nothing to inject.");
	    switch (where) {
	        case "before":
	            if (sliceMode)
	                newFuncStr = newFuncStr.replace(findStart, "$1" + target);
	            else
	                newFuncStr = newFuncStr.replace(regex, "" + target + source);
	            break;
	        case "replace":
	            if (sliceMode)
	                newFuncStr = "" + target;
	            else
	                newFuncStr = newFuncStr.replace(regex, "" + target);
	            break;
	        case "after":
	            if (sliceMode)
	                newFuncStr = newFuncStr.replace(findEnd, target + "$1");
	            else
	                newFuncStr = newFuncStr.replace(regex, "" + source + target);
	            break;
	        default:
	            throw new Error('where Parameter must be "before", "replace" or "after"');
	    }
	    var newFunc = new Function("return (" + newFuncStr + ")")();
	    newFunc.prototype = func.prototype;
	    return newFunc;
	}
	//# sourceMappingURL=helpers.js.map

	//The *main* variable
	var master = {
	    hooks: {},
	    iconLink: "",
	    buildingLink: "",
	    buildingHooks: {},
	    buildingHooksById: [],
	    customBuildings: [],
	    customUpgrades: [],
	    save: null,
	    onLoad: [],
	    Building: null,
	    Upgrade: null,
	    HeavenlyUpgrade: null,
	    injectCode: null,
	    DEFAULT_ONBUY: null,
	    DEFAULT_CPS: null,
	};

	var Injection = /** @class */ (function () {
	    function Injection(value, defValue, func) {
	        this.value = value;
	        this.defValue = defValue;
	        this.func = func;
	    }
	    return Injection;
	}());
	//# sourceMappingURL=generic.js.map

	/**
	 * Creates the function hooks for base game
	 * @returns A promise
	 */
	function main() {
	    return new Promise(function (resolve) {
	        var dummy = {};
	        var injections = [
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
	            new Injection("customMenu", [], function () {
	                window.Game.UpdateMenu = injectCode(window.Game.UpdateMenu, null, "\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tswitch (Game.onMenu) {\n\t\t\t\t\t\tcase \"prefs\":\n\t\t\t\t\t\t\tfor(const i in Cppkies.hooks.customOptionsMenu) Cppkies.hooks.customOptionsMenu[i]();\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase \"stats\":\n\t\t\t\t\t\t\tfor(const i in Cppkies.hooks.customStatsMenu) Cppkies.hooks.customStatsMenu[i]();\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase \"log\":\n\t\t\t\t\t\t\tfor(const i in Cppkies.hooks.customInfoMenu) Cppkies.hooks.customInfoMenu[i]();\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tdefault:\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\tfor(const i in Cppkies.hooks.customMenu) Cppkies.hooks.customMenu[i]();\n\t\t\t\t\t", "before");
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
	            new Injection("customLoad", [], function () {
	                window.Game.LoadSave = injectCode(window.Game.LoadSave, "if (Game.prefs.showBackupWarning==1)", "\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tfor(const i in Cppkies.hooks.customLoad) Cppkies.hooks.customLoad[i](); \n\t\t\t\t\t", "before");
	            }),
	            new Injection("customReset", [], function () {
	                window.Game.Reset = injectCode(window.Game.Reset, null, "\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tfor(const i in Cppkies.hooks.customReset) Cppkies.hooks.customReset[i](hard);\n\t\t\t\t\t", "before");
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
	            new Injection("customBeautify", [], function () {
	                window.Beautify = injectCode(window.Beautify, "return negative?'-'+output:output+decimal;", "\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tlet ret = negative?'-'+output:output+decimal;\n\t\t\t\t\tfor(const i in Cppkies.hooks.customBeautify) {\n\t\t\t\t\t\tlet returnedValue = Cppkies.hooks.customBeautify[i](value, floats, ret)\n\t\t\t\t\t\tret = returnedValue ? returnedValue : ret\n\t\t\t\t\t};\n\t\t\t\t\treturn ret;\n\t\t\t\t\t", "replace");
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
	            new Injection("customTooltipDraw", [], function () {
	                window.Game.tooltip.draw = injectCode(window.Game.tooltip.draw, null, "\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tfor(const i in Cppkies.hooks.customTooltipDraw) Cppkies.hooks.customTooltipDraw[i](from, text, origin);\n\t\t\t\t\t", "before");
	            }),
	            new Injection("customTooltipUpdate", [], function () {
	                window.Game.tooltip.update = injectCode(window.Game.tooltip.update, null, "\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tfor(const i in Cppkies.hooks.customTooltipUpdate) Cppkies.hooks.customTooltipUpdate[i]();\n\t\t\t\t\t", "before");
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
	            new Injection("customHowMuchPrestige", [], function () {
	                window.Game.HowMuchPrestige = injectCode(injectCode(window.Game.HowMuchPrestige, "return", "let ret =", "replace"), ";", "\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tfor(const i in Cppkies.hooks.customHowManyCookiesReset){ \n\t\t\t\t\t\treturnedValue = Cppkies.hooks.customHowManyCookiesReset[i](chips, ret);\n\t\t\t\t\t\tret = returnedValue ? returnedValue : ret\n\t\t\t\t\t}\n\t\t\t\t\treturn ret;\n\t\t\t\t\t", "after");
	            }),
	            new Injection("customHeavenlyMultiplier", []),
	            new Injection("UpdateAscensionModePrompt", []),
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
	            new Injection("customGrandmaPic", [], function () {
	                window.Game.Objects.Grandma.art.pic = injectCode(window.Game.Objects.Grandma.art.pic, "return choose(list)+'.png'", "// Cppkies injection\n\t\t\t\t\tlist = list.concat(Cppkies.hooks.customGrandmaPic.map(val=>val() || null).filter(val=>val !== null))\n\t\t\t\t\t", "before");
	            }),
	            //// -- Unsorted, for quick injections -- ////
	            new Injection("postBuildStore", [], function () {
	                var oldString = window.Game.BuildStore.toString();
	                window.Game.BuildStore = new Proxy(window.Game.BuildStore, {
	                    apply: function (target, _this, args) {
	                        target.apply(_this, args);
	                        for (var i in master.hooks.postBuildStore)
	                            master.hooks.postBuildStore[i]();
	                    },
	                });
	                window.Game.BuildStore.toString = function () { return oldString; };
	            }),
	        ];
	        injections.forEach(function (inject) {
	            dummy[inject.value] = inject.defValue;
	            if (inject.func)
	                inject.func();
	        });
	        //Misc stuff
	        window.Game.Loader.Load = injectCode(window.Game.Loader.Load, "img.src=this.domain", "img.src=(assets[i].indexOf('http') !== -1 ? \"\" : this.domain)", "replace");
	        resolve(dummy);
	    });
	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	/**
	 * The default save file for buildings
	 */
	var DEFAULT_BUILDING_SAVE = {
	    amount: 0,
	    bought: 0,
	    free: 0,
	    totalCookies: 0,
	    level: 0,
	    muted: 0,
	    minigameSave: "",
	};
	/**
	 * The default save for an upgrade
	 */
	var DEFAULT_UPGRADE_SAVE = {
	    bought: false,
	    unlocked: false,
	};
	var DEFAULT_MOD_SAVE = {
	    buildings: {},
	    upgrades: {},
	};
	/**
	 * Creates a save for Cppkies
	 */
	function initSave() {
	    master.save.mods = {};
	    master.save.foreign = DEFAULT_MOD_SAVE;
	    master.save.saveVer = 0;
	    master.save.exists = true;
	}
	/**
	 * Loads the building save data
	 * @param building The building to load savedata for
	 */
	function loadBuilding(building) {
	    //Use names because ID conflicts
	    return master.save.foreign.buildings[building.name] || DEFAULT_BUILDING_SAVE;
	}
	/**
	 * Saves a building
	 * @param building The building to save
	 */
	function saveBuilding(_a) {
	    var amount = _a.amount, bought = _a.bought, free = _a.free, totalCookies = _a.totalCookies, level = _a.level, muted = _a.muted, minigameSave = _a.minigameSave, name = _a.name;
	    master.save.foreign.buildings[name] = {
	        amount: amount,
	        bought: bought,
	        free: free,
	        totalCookies: totalCookies,
	        level: level,
	        muted: muted,
	        minigameSave: minigameSave,
	    };
	}
	/**
	 * Loads an upgrade
	 * @param upgrade The upgrade to load
	 */
	function loadUpgrade(upgrade) {
	    return master.save.foreign.upgrades[upgrade.name] || DEFAULT_UPGRADE_SAVE;
	}
	/**
	 * Saves an upgrade
	 * @param upgrade The upgrade to save
	 */
	function saveUpgrade(upgrade) {
	    master.save.foreign.upgrades[upgrade.name] = {
	        unlocked: upgrade.unlocked,
	        bought: upgrade.bought,
	    };
	}
	/**
	 * Saves everything
	 */
	function saveAll() {
	    for (var i in master.customBuildings)
	        saveBuilding(master.customBuildings[i]);
	    for (var i in master.customUpgrades)
	        saveUpgrade(master.customUpgrades[i]);
	}
	//# sourceMappingURL=saves.js.map

	/**
	 * Creates the hooks for a building
	 * @param building The building to create hooks for
	 */
	function createHooks(building) {
	    var injections = [
	        new Injection("tooltip", [], function () {
	            building.tooltip = injectCode(injectCode(building.tooltip, "return", "let ret = ", "replace"), null, "\n//Cppkies injection\n\t\tfor(const i in Cppkies.buildingHooks[\"" + building.name + "\"].tooltip) {\n\t\t\tconst tempRet = Cppkies.buildingHooks[\"" + building.name + "\"].tooltip[i].call(this, ret)\n\t\t\tret = tempRet || ret\n\t\t}\n\t\treturn ret", "after");
	        }),
	    ];
	    var dummy = {};
	    injections.forEach(function (inject) {
	        dummy[inject.value] = inject.defValue;
	        if (inject.func)
	            inject.func();
	    });
	    master.buildingHooks[building.name] = dummy;
	}
	/**
	 * The building class for creating new buildings
	 */
	var Building = /** @class */ (function (_super) {
	    __extends(Building, _super);
	    /**
	     * Creates a new building and creates the hooks for it
	     * @param name The name of the building
	     * @param commonName Various additional string for the building, split by |:  The name of the building, then in plural, how the building produced the cookies, the effect from sugar lumps, then in plural
	     * @param desc The description of the building
	     * @param icon The icon for the building (Only the column matters)
	     * @param bigIcon The icon that shows up in store (Only the row matters)
	     * @param art The art for the building
	     * @param cpsFunc The function to calculate CPS
	     * @param buyFunction The function which gets called when it's bought
	     * @param foolObject The fool building to display during business day
	     * @param buildingSpecial The building special and building debuff
	     */
	    function Building(name, commonName, desc, icon, bigIcon, art, cpsFunc, buyFunction, foolObject, buildingSpecial) {
	        var _this = _super.call(this, name, commonName, desc, bigIcon[1], icon[0], art, 0, //Game automatically calculates Price and BaseCps
	        cpsFunc, buyFunction) || this;
	        master.customBuildings.push(_this);
	        // Create hooks
	        createHooks(_this);
	        var _loop_1 = function (i) {
	            if (parseInt(i) > 0) {
	                var me_1 = Game.ObjectsById[i];
	                me_1.canvas = l("rowCanvas" + i);
	                me_1.ctx = me_1.canvas.getContext("2d");
	                //Relink their events too
	                AddEvent(me_1.canvas, "mouseover", function () {
	                    me_1.mouseOn = true;
	                });
	                AddEvent(me_1.canvas, "mouseout", function () {
	                    me_1.mouseOn = false;
	                });
	                AddEvent(me_1.canvas, "mousemove", function (e) {
	                    var box = me_1.canvas.getBoundingClientRect();
	                    me_1.mousePos[0] = e.pageX - box.left;
	                    me_1.mousePos[1] = e.pageY - box.top;
	                });
	                //Restore minigames
	                if (me_1.minigame && me_1.minigameLoaded) {
	                    var save = me_1.minigame.save();
	                    me_1.minigame.launch();
	                    me_1.minigame.load(save);
	                }
	            }
	        };
	        //Manually relink canvases and contexts because Orteil made it so new buildings break the old canvas and context links
	        for (var i in Game.ObjectsById) {
	            _loop_1(i);
	        }
	        var localBuildingLink = bigIcon[2] || master.buildingLink + "", localIconLink = icon[2] || master.iconLink + "";
	        // This is the name, description, and icon used during Business Season
	        if (foolObject)
	            Game.foolObjects[name] = foolObject;
	        // The name of this building's golden cookie buff and debuff
	        if (buildingSpecial)
	            Game.goldenCookieBuildingBuffs[name] = buildingSpecial;
	        //CCSE.ReplaceBuilding(name)
	        if (localIconLink) {
	            master.buildingHooks[_this.name].tooltip.push(function (ret) {
	                return _this.locked
	                    ? ret
	                    : ret.replace("background-position", "background-image:url(" + localIconLink + ");background-position");
	            });
	        }
	        /*if (CCSE.save.Buildings[name]) {
	            var saved = CCSE.save.Buildings[name]
	            me.amount = saved.amount
	            me.bought = saved.bought
	            me.totalCookies = saved.totalCookies
	            me.level = saved.level
	            me.muted = saved.muted
	            me.free = saved.free ? saved.free : 0 // Left this out earlier, can't expect it to be there
	            me.minigameSave = saved.minigameSave

	            Game.BuildingsOwned += me.amount
	        } else {
	            var saved = {}
	            saved.amount = 0
	            saved.bought = 0
	            saved.totalCookies = 0
	            saved.level = 0
	            saved.muted = 0
	            saved.minigameSave = ""

	            CCSE.save.Buildings[name] = saved
	        }*/
	        Game.BuildStore();
	        if (localBuildingLink) {
	            master.hooks.postBuildStore.push(function () {
	                l("productIcon" + _this.id).style.backgroundImage = "url(" + localBuildingLink + ")";
	                l("productIconOff" + _this.id).style.backgroundImage = "url(" + localBuildingLink + ")";
	            });
	        }
	        Game.BuildStore();
	        _this.canvas = l("rowCanvas" + _this.id);
	        _this.ctx = _this.canvas.getContext("2d");
	        _this.context = _this.ctx;
	        _this.pics = [];
	        var muteDiv = document.createElement("div");
	        muteDiv.className = "tinyProductIcon";
	        muteDiv.id = "mutedProduct" + _this.id;
	        muteDiv.style.display = "none";
	        if (localBuildingLink)
	            muteDiv.style.backgroundImage = "url(" + localBuildingLink + ")";
	        muteDiv.style.backgroundPositionX = "-" + icon[0] + "px";
	        muteDiv.style.backgroundPositionY = "-" + icon[1] + "px";
	        muteDiv.addEventListener("click", function () {
	            _this.mute(0);
	            PlaySound(_this.muted ? "snd/clickOff.mp3" : "snd/clickOn.mp3");
	        });
	        AddEvent(_this.canvas, "mouseover", function () {
	            _this.mouseOn = true;
	        });
	        AddEvent(_this.canvas, "mouseout", function () {
	            _this.mouseOn = false;
	        });
	        AddEvent(_this.canvas, "mousemove", function (e) {
	            var box = _this.canvas.getBoundingClientRect();
	            _this.mousePos[0] = e.pageX - box.left;
	            _this.mousePos[1] = e.pageY - box.top;
	        });
	        l("buildingsMute").appendChild(muteDiv);
	        // Load the save stuff
	        var loadProps = loadBuilding(_this);
	        for (var i in loadProps)
	            _this[i] = loadProps[i];
	        Game.recalculateGains = 1;
	        return _this;
	    }
	    return Building;
	}(Game.Object));
	/**
	 * The recommended function to pass in building CpsFunc
	 * @param me Itself
	 */
	var defaultCps = function (me) {
	    return Game.GetTieredCpsMult(me) * Game.magicCpS(me.name) * me.baseCps;
	};
	/**
	 * The reccomended function to pass in building BuyFunc
	 */
	var defaultOnBuy = function () {
	    Game.UnlockTiered(this);
	    if (this.amount >= Game.SpecialGrandmaUnlock &&
	        Game.Objects["Grandma"].amount > 0 &&
	        this.grandma)
	        Game.Unlock(this.grandma.name);
	};

	/**
	 * The class for upgrades
	 */
	var Upgrade = /** @class */ (function (_super) {
	    __extends(Upgrade, _super);
	    /**
	     * Creates an upgrade
	     * @param name The name of the upgrade
	     * @param desc The description of it
	     * @param price The price of it
	     * @param icon  The icon for it
	     * @param buyFunc The function that gets called when you buy the upgrade
	     */
	    function Upgrade(name, desc, price, icon, 
	    // eslint-disable-next-line @typescript-eslint/no-empty-function
	    buyFunc) {
	        if (buyFunc === void 0) { buyFunc = function () { }; }
	        var _this = this;
	        if (!icon[2])
	            icon[2] = master.iconLink + "";
	        _this = _super.call(this, name, typeof desc === "function" ? "" : desc, price, icon, buyFunc) || this;
	        if (typeof desc === "function") {
	            _this.descFunc = desc;
	        }
	        master.customUpgrades.push(_this);
	        var loadProps = loadUpgrade(_this);
	        for (var i in loadProps)
	            _this[i] = loadProps[i];
	        return _this;
	    }
	    return Upgrade;
	}(Game.Upgrade));

	var constants = {
		PATH_SEPARATOR: '.',
		TARGET: Symbol('target'),
		UNSUBSCRIBE: Symbol('unsubscribe')
	};

	var isArray = Array.isArray;

	var isSymbol = value => typeof value === 'symbol';

	const {PATH_SEPARATOR} = constants;



	var path = {
		after: (path, subPath) => {
			if (isArray(path)) {
				return path.slice(subPath.length);
			}

			if (subPath === '') {
				return path;
			}

			return path.slice(subPath.length + 1);
		},
		concat: (path, key) => {
			if (isArray(path)) {
				path = path.slice();

				if (key) {
					path.push(key);
				}

				return path;
			}

			if (key && key.toString !== undefined) {
				if (path !== '') {
					path += PATH_SEPARATOR;
				}

				if (isSymbol(key)) {
					return path + 'Symbol(' + key.description + ')';
				}

				return path + key;
			}

			return path;
		},
		initial: path => {
			if (isArray(path)) {
				return path.slice(0, -1);
			}

			if (path === '') {
				return path;
			}

			const index = path.lastIndexOf(PATH_SEPARATOR);

			if (index === -1) {
				return '';
			}

			return path.slice(0, index);
		},
		walk: (path, callback) => {
			if (isArray(path)) {
				path.forEach(callback);
			} else if (path !== '') {
				let position = 0;
				let index = path.indexOf(PATH_SEPARATOR);

				if (index === -1) {
					callback(path);
				} else {
					while (position < path.length) {
						if (index === -1) {
							index = path.length;
						}

						callback(path.slice(position, index));

						position = index + 1;
						index = path.indexOf(PATH_SEPARATOR, position);
					}
				}
			}
		}
	};

	const {TARGET, UNSUBSCRIBE} = constants;




	const isPrimitive = value => value === null || (typeof value !== 'object' && typeof value !== 'function');

	const isBuiltinWithoutMutableMethods = value => value instanceof RegExp || value instanceof Number;

	const isBuiltinWithMutableMethods = value => value instanceof Date;

	const isSameDescriptor = (a, b) => {
		return a !== undefined && b !== undefined &&
			Object.is(a.value, b.value) &&
			(a.writable || false) === (b.writable || false) &&
			(a.enumerable || false) === (b.enumerable || false) &&
			(a.configurable || false) === (b.configurable || false);
	};

	const shallowClone = value => {
		if (isArray(value)) {
			return value.slice();
		}

		return {...value};
	};

	const onChange = (object, onChange, options = {}) => {
		const proxyTarget = Symbol('ProxyTarget');
		let inApply = false;
		let changed = false;
		let applyPath;
		let applyPrevious;
		let isUnsubscribed = false;
		const equals = options.equals || Object.is;
		let propCache = new WeakMap();
		let pathCache = new WeakMap();
		let proxyCache = new WeakMap();

		const handleChange = (changePath, property, previous, value) => {
			if (isUnsubscribed) {
				return;
			}

			if (!inApply) {
				onChange(path.concat(changePath, property), value, previous);
				return;
			}

			if (inApply && applyPrevious && previous !== undefined && value !== undefined && property !== 'length') {
				let item = applyPrevious;

				if (changePath !== applyPath) {
					changePath = path.after(changePath, applyPath);

					path.walk(changePath, key => {
						item[key] = shallowClone(item[key]);
						item = item[key];
					});
				}

				item[property] = previous;
			}

			changed = true;
		};

		const getOwnPropertyDescriptor = (target, property) => {
			let props = propCache !== null && propCache.get(target);

			if (props) {
				props = props.get(property);
			}

			if (props) {
				return props;
			}

			props = new Map();
			propCache.set(target, props);

			let prop = props.get(property);

			if (!prop) {
				prop = Reflect.getOwnPropertyDescriptor(target, property);
				props.set(property, prop);
			}

			return prop;
		};

		const invalidateCachedDescriptor = (target, property) => {
			const props = propCache ? propCache.get(target) : undefined;

			if (props) {
				props.delete(property);
			}
		};

		const buildProxy = (value, path) => {
			if (isUnsubscribed) {
				return value;
			}

			pathCache.set(value, path);

			let proxy = proxyCache.get(value);

			if (proxy === undefined) {
				proxy = new Proxy(value, handler);
				proxyCache.set(value, proxy);
			}

			return proxy;
		};

		const unsubscribe = target => {
			isUnsubscribed = true;
			propCache = null;
			pathCache = null;
			proxyCache = null;

			return target;
		};

		const ignoreProperty = property => {
			return isUnsubscribed ||
				(options.ignoreSymbols === true && isSymbol(property)) ||
				(options.ignoreUnderscores === true && property.charAt(0) === '_') ||
				(options.ignoreKeys !== undefined && options.ignoreKeys.includes(property));
		};

		const handler = {
			get(target, property, receiver) {
				if (property === proxyTarget || property === TARGET) {
					return target;
				}

				if (property === UNSUBSCRIBE &&
					pathCache !== null &&
					pathCache.get(target) === '') {
					return unsubscribe(target);
				}

				const value = Reflect.get(target, property, receiver);
				if (
					isPrimitive(value) ||
					isBuiltinWithoutMutableMethods(value) ||
					property === 'constructor' ||
					options.isShallow === true ||
					ignoreProperty(property)
				) {
					return value;
				}

				// Preserve invariants
				const descriptor = getOwnPropertyDescriptor(target, property);
				if (descriptor && !descriptor.configurable) {
					if (descriptor.set && !descriptor.get) {
						return undefined;
					}

					if (descriptor.writable === false) {
						return value;
					}
				}

				return buildProxy(value, path.concat(pathCache.get(target), property));
			},

			set(target, property, value, receiver) {
				if (value && value[proxyTarget] !== undefined) {
					value = value[proxyTarget];
				}

				const ignore = ignoreProperty(property);
				const previous = ignore ? null : Reflect.get(target, property, receiver);
				const isChanged = !(property in target) || !equals(previous, value);
				let result = true;

				if (isChanged) {
					result = Reflect.set(target[proxyTarget] || target, property, value);

					if (!ignore && result) {
						handleChange(pathCache.get(target), property, previous, value);
					}
				}

				return result;
			},

			defineProperty(target, property, descriptor) {
				let result = true;

				if (!isSameDescriptor(descriptor, getOwnPropertyDescriptor(target, property))) {
					result = Reflect.defineProperty(target, property, descriptor);

					if (result && !ignoreProperty(property) && !isSameDescriptor()) {
						invalidateCachedDescriptor(target, property);

						handleChange(pathCache.get(target), property, undefined, descriptor.value);
					}
				}

				return result;
			},

			deleteProperty(target, property) {
				if (!Reflect.has(target, property)) {
					return true;
				}

				const ignore = ignoreProperty(property);
				const previous = ignore ? null : Reflect.get(target, property);
				const result = Reflect.deleteProperty(target, property);

				if (!ignore && result) {
					invalidateCachedDescriptor(target, property);

					handleChange(pathCache.get(target), property, previous);
				}

				return result;
			},

			apply(target, thisArg, argumentsList) {
				const compare = isBuiltinWithMutableMethods(thisArg);

				if (compare) {
					thisArg = thisArg[proxyTarget];
				}

				if (!inApply) {
					inApply = true;

					if (compare) {
						applyPrevious = thisArg.valueOf();
					}

					if (isArray(thisArg) || toString.call(thisArg) === '[object Object]') {
						applyPrevious = shallowClone(thisArg[proxyTarget]);
					}

					applyPath = path.initial(pathCache.get(target));

					const result = Reflect.apply(target, thisArg, argumentsList);

					inApply = false;

					if (changed || (compare && !equals(applyPrevious, thisArg.valueOf()))) {
						handleChange(applyPath, '', applyPrevious, thisArg[proxyTarget] || thisArg);
						applyPrevious = null;
						changed = false;
					}

					return result;
				}

				return Reflect.apply(target, thisArg, argumentsList);
			}
		};

		const proxy = buildProxy(object, options.pathAsArray === true ? [] : '');
		onChange = onChange.bind(proxy);

		return proxy;
	};

	onChange.target = proxy => proxy[TARGET] || proxy;
	onChange.unsubscribe = proxy => proxy[UNSUBSCRIBE] || proxy;

	var onChange_1 = onChange;

	/**
	 * The localStotrage wrapper class
	 */
	var LocalStorageWrapper = /** @class */ (function () {
	    /**
	     * The wrapper class for localStorage
	     * @param name The name of the key
	     */
	    function LocalStorageWrapper(name) {
	        var _this = this;
	        this.name = name;
	        this.updateValues(name);
	        if (!this.store)
	            this.store = {};
	        this.store = onChange_1(this.store, function () {
	            _this.writeValues();
	        });
	    }
	    /**
	     * Reads the values from the name
	     * @param name The key to read from
	     */
	    LocalStorageWrapper.prototype.updateValues = function (name) {
	        this.store = JSON.parse(localStorage.getItem(name));
	    };
	    /**
	     * Writes store to localstorage
	     */
	    LocalStorageWrapper.prototype.writeValues = function () {
	        localStorage.setItem(this.name, JSON.stringify(this.store));
	    };
	    return LocalStorageWrapper;
	}());
	//# sourceMappingURL=localstorage.js.map

	/**
	 * The class for heavenly upgrades
	 */
	var HeavenlyUpgrade = /** @class */ (function (_super) {
	    __extends(HeavenlyUpgrade, _super);
	    /**
	     * Creates a heavenly upgrade
	     * @param name The name for it
	     * @param desc The description of it
	     * @param price The price of in (in Heavenly Chips)
	     * @param icon The icon for it
	     * @param position The position of it on the heavenly map screen
	     * @param parents It's parents, can be mixed ID's with names
	     * @param buyFunc The function which gets called on being bought
	     */
	    function HeavenlyUpgrade(name, desc, price, icon, position, parents, 
	    // eslint-disable-next-line @typescript-eslint/no-empty-function
	    buyFunc) {
	        if (parents === void 0) { parents = ["Legacy"]; }
	        if (buyFunc === void 0) { buyFunc = function () { }; }
	        var _this = _super.call(this, name, desc, price, icon, buyFunc) || this;
	        _this.parents = parents;
	        _this.pool = "prestige";
	        _this.posX = position[0];
	        _this.posY = position[1];
	        for (var i in _this.parents) {
	            var me = _this.parents[i];
	            //Try both by name and by id
	            _this.parents[i] = Game.Upgrades[me] || Game.UpgradesById[me];
	        }
	        Game.PrestigeUpgrades.push(_this);
	        Game.UpgradePositions[_this.id] = position;
	        return _this;
	    }
	    return HeavenlyUpgrade;
	}(Upgrade));

	var CppkiesExport;
	//Check if Cppkies is already created
	if (window.Cppkies) {
	    //If so, just reexport it
	    CppkiesExport = window.Cppkies;
	}
	else {
	    //Set it to master, and set some stuff
	    CppkiesExport = master;
	    CppkiesExport.Building = Building;
	    CppkiesExport.Upgrade = Upgrade;
	    CppkiesExport.HeavenlyUpgrade = HeavenlyUpgrade;
	    CppkiesExport.injectCode = injectCode;
	    CppkiesExport.DEFAULT_CPS = defaultCps;
	    CppkiesExport.DEFAULT_ONBUY = defaultOnBuy;
	    //Since we can't trust our data...
	    master.save = new LocalStorageWrapper("cppkiesSave")
	        .store;
	    //Create a save if it doesn't exist
	    if (!master.save.exists) {
	        initSave();
	    }
	    //Inject maingame and create hooks
	    main().then(function (answer) {
	        CppkiesExport.hooks = answer;
	        window.Game.customSave.push(saveAll);
	        window.Game.Notify("Cppkies loaded!", "", [32, 17]);
	        window.Game.Win("Third-party");
	        //Run all onLoad events
	        master.onLoad.forEach(function (val) { return val(); });
	        //Force all new onLoad events to run
	        master.onLoad = new Proxy(master.onLoad, {
	            set: function (_target, key, value) {
	                if (key !== "length")
	                    value();
	                return true;
	            },
	        });
	        //Force manual addition since in-module injects b r e a k
	        window.Cppkies = CppkiesExport;
	    });
	}
	var CppkiesExport$1 = CppkiesExport;

	return CppkiesExport$1;

})));
//# sourceMappingURL=index.js.map
