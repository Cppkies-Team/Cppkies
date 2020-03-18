(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Cppkies = factory());
}(this, (function () { 'use strict';

	/**
	 * A helper function which converts a common string to a string.
	 * @param value The common string to convert
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
	    onLoad: [],
	    Building: null,
	    injectCode: null,
	};
	//# sourceMappingURL=vars.js.map

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
	 * Injects functions for basegame
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
	//# sourceMappingURL=basegame.js.map

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
	var Building = /** @class */ (function (_super) {
	    __extends(Building, _super);
	    function Building(name, commonName, desc, icon, art, cpsFunc, buyFunction, foolObject, buildingSpecial) {
	        var _this = _super.call(this, name, commonName, desc, icon[0], icon[1], art, 0, //Game automatically calculates Price and BaseCps
	        cpsFunc, buyFunction) || this;
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
	            }
	        };
	        //Manually relink canvases and contexts because Orteil made it so new buildings break the old canvas and context links
	        for (var i in Game.ObjectsById) {
	            _loop_1(i);
	        }
	        var localBuildingLink = Cppkies.buildingLink + "", localIconLink = Cppkies.iconLink + "";
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
	        Game.recalculateGains = 1;
	        return _this;
	    }
	    return Building;
	}(Game.Object));

	var CppkiesExport;
	//Check if Cppkies is already created
	if (window.Cppkies) {
	    //If so, just reexport it
	    console.warn("Duplicate Cppkies");
	    CppkiesExport = window.Cppkies;
	}
	else {
	    //Set it to master, and set some stuff
	    CppkiesExport = master;
	    CppkiesExport.Building = Building;
	    CppkiesExport.injectCode = injectCode;
	    //Inject maingame and create hooks
	    main().then(function (answer) {
	        CppkiesExport.hooks = answer;
	        window.Game.Note.call({}, "Cppkies loaded!", "", [32, 17]);
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
	    });
	}
	var CppkiesExport$1 = CppkiesExport;

	return CppkiesExport$1;

})));
//# sourceMappingURL=index.js.map
