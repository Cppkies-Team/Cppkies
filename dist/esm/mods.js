import"./tslib.es6-ac47674d.js";import{mods as e,setCurrentMod as t}from"./vars.js";import{applyAllProps as i}from"./helpers.js";import"./lz-string.js";import{applyModSave as r,loadMod as n}from"./saves.js";import"./generic.js";import"./eventemitter.js";import"./buildings.js";import"./basegame.js";import{deffer as o}from"./onLoad.js";var s=function(){function s(s,m){var a=this;this.modFunction=m,this.keyname="never-should-happen",this.version="1.0",this.custom=null,this.toggles=[],this.ownedUnits=[],i(this,s);var l=e.find((function(e){return e.keyname===s.keyname}));if(l){if(l.version!==this.version)throw new Error("You are trying to load multiple versions of the same mod");console.warn("Loading the same mod ("+l.keyname+") multiple times.")}else e.push(this),r(this,n(this)),o.then((function(){t(a),null==m||m.apply(a),Game.UpdateMenu(),t(null)}))}return s.prototype.render=function(){for(var e=document.createElement("div"),t=0,i=this.toggles;t<i.length;t++){var r=i[t];e.appendChild(r.render())}return e},s}();export{s as Mod};