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
	    var findStart = /\)\s+{/;
	    if (!sliceMode && !regex.test(newFuncStr))
	        console.warn("Nothing to inject.");
	    switch (where) {
	        case "before":
	            if (sliceMode)
	                newFuncStr = newFuncStr.replace(findStart, ") {" + target);
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
	                throw new Error("Yikes, can't add to end!");
	            else
	                newFuncStr = newFuncStr.replace(regex, "" + source + target);
	            break;
	        default:
	            throw new Error('re Parameter must be "before", "replace" or "after"');
	    }
	    var newFunc = new Function("return (" + newFuncStr + ")")();
	    newFunc.prototype = func.prototype;
	    return newFunc;
	}
	//# sourceMappingURL=helpers.js.map

	/**
	 * Injects functions for basegame
	 * @returns A promise
	 */
	function main() {
	    return new Promise(function (resolve) {
	        var Injection = /** @class */ (function () {
	            function Injection(value, defValue, func) {
	                this.value = value;
	                this.defValue = defValue;
	                this.func = func;
	            }
	            return Injection;
	        }());
	        var dummy = {};
	        var injections = [
	            //Custom menus
	            new Injection("customMenu", [], function () {
	                window.Game.UpdateMenu = injectCode(window.Game.UpdateMenu, null, "\n\t\t\t\t\t// Cppkies injection\n\t\t\tswitch (Game.onMenu) {\n\t\t\t\tcase \"prefs\":\n\t\t\t\t\tfor(const i in Cppkies.hooks.customOptionsMenu) Cppkies.hooks.customOptionsMenu[i]();\n\t\t\t\t\tbreak;\n\t\t\t\tcase \"stats\":\n\t\t\t\t\tfor(const i in Cppkies.hooks.customStatsMenu) Cppkies.hooks.customStatsMenu[i]();\n\t\t\t\t\tbreak;\n\t\t\t\tcase \"log\":\n\t\t\t\t\tfor(const i in Cppkies.hooks.customInfoMenu) Cppkies.hooks.customInfoMenu[i]();\n\t\t\t\t\tbreak;\n\t\t\t\tdefault:\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t\tfor(const i in Cppkies.hooks.customMenu) Cppkies.hooks.customMenu[i]();", "before");
	            }),
	            new Injection("customOptionsMenu", []),
	            new Injection("customStatsMenu", []),
	            new Injection("customInfoMenu", []),
	            //Data manipulation
	            new Injection("customLoad", [], function () {
	                window.Game.LoadSave = injectCode(window.Game.LoadSave, "if (Game.prefs.showBackupWarning==1)", "\n\t\t\t// Cppkies injection\n\t\t\tfor(const i in CLL.customLoad) CLL.customLoad[i](); ", "before");
	            }),
	            new Injection("customReset", [], function () {
	                window.Game.Reset = injectCode(window.Game.Reset, null, "\n\t\t\t// Cppkies injection\n\t\t\tfor(const i in Cppkies.hooks.customReset) Cppkies.hooks.customReset[i](hard);\n\t\t", "before");
	            }),
	            //Misc
	            new Injection("customBeautify", [], function () {
	                window.Beautify = injectCode(window.Beautify, "return negative?'-'+output:output+decimal;", "// Cppkies injection\n  let ret = negative?'-'+output:output+decimal;\n\tfor(const i in Cppkies.hooks.customBeautify) {\n\t\tlet returnedValue = Cppkies.hooks.customBeautify[i](value, floats, ret)\n\t\tret = returnedValue ? returnedValue : ret\n\t};\n\treturn ret;", "replace");
	            }),
	            //Tooltips
	            new Injection("customTooltipDraw", [], function () {
	                window.Game.tooltip.draw = injectCode(window.Game.tooltip.draw, null, "\n\t\t\t// Cppkies injection\n\t\t\tfor(const i in Cppkies.hooks.customTooltipDraw) CLL.customTooltipDraw[i](from, text, origin);\n\t\t", "before");
	            }),
	            new Injection("customTooltipUpdate", [], function () {
	                window.Game.tooltip.update = injectCode(window.Game.tooltip.update, null, "\n\t\t\t// Cppkies injection\n\t\t\tfor(const i in Cppkies.hooks.customTooltipUpdate) CLL.customTooltipUpdate[i]();\n\t\t", "before");
	            }),
	            //Ascension
	            new Injection("customHowMuchPrestige", [], function () {
	                window.Game.HowMuchPrestige = injectCode(injectCode(window.Game.HowMuchPrestige, "return", "let ret =", "replace"), ";", "// Cppkies injection\n\t\t\tfor(const i in Cppkies.hooks.customHowManyCookiesReset){ \n\t\t\t\treturnedValue = Cppkies.hooks.customHowManyCookiesReset[i](chips, ret);\n\t\t\t\tret = returnedValue ? returnedValue : ret\n\t\t\t}\n\t\t\treturn ret;", "after");
	            }),
	            new Injection("customHeavenlyMultiplier", []),
	            new Injection("UpdateAscensionModePrompt", []),
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
	//# sourceMappingURL=injects.js.map

	if (window.Cppkies)
	    throw new Error("Duplicate Cppkies import");
	main().then(function (answer) {
	    window.Cppkies.hooks = answer;
	});
	var master = {
	    hooks: {},
	    injectCode: injectCode,
	};
	//# sourceMappingURL=index.js.map

	return master;

})));
//# sourceMappingURL=index.js.map
