import"./tslib.es6-9a9d7607.js";import{mods as e}from"./vars.js";import"./helpers.js";import"./lz-string.js";import{save as o}from"./saves.js";import{shouldRunVersioned as i}from"./generic.js";import"./eventemitter.js";import"./buildings.js";import t from"./basegame.js";import"./appendHTML.js";import"./button.js";import{ccHideableSection as r}from"./hidableSection.js";import"./slider.js";import"./onLoad.js";import{currentMod as s}from"./mods.js";var m=function(e){if(this.keyname=e,!s)throw new Error("You are instancing a mod UI class outside of a mod declaration.");s.toggles.push(this),this.mod=s,this.load&&void 0!==o.mods[this.mod.keyname].ui[this.keyname]&&this.load(o.mods[this.mod.keyname].ui[this.keyname])};i(1)&&t.on("optionsMenu",(function(){var o,i=document.querySelector("#menu");if(i&&0!==e.length)for(var t=i.children[i.children.length-1],s=t.children[t.children.length-2],m=0,n=e;m<n.length;m++){var a=n[m];s.appendChild(r(a.keyname+"ui",null!==(o=a.name)&&void 0!==o?o:a.keyname,a.render(),Game.UpdateMenu))}}));export{m as ToggleBase};
