import"./tslib.es6-9a9d7607.js";import{mods as e}from"./vars.js";import{applyAllProps as t}from"./helpers.js";import"./lz-string.js";import{applyModSave as r,loadMod as i}from"./saves.js";import"./generic.js";import"./eventemitter.js";import"./buildings.js";import"./basegame.js";import{deffer as o}from"./onLoad.js";var n=null,s=function(){function s(s,m){var a=this;this.modFunction=m,this.custom=null,this.toggles=[],t(this,s);var l=e.find((function(e){return e.keyname===s.keyname}));if(l){if(l.version!==this.version)throw new Error("You are trying to load multiple versions of the same mod");console.warn("Loading the same mod ("+l.keyname+") multiple times.")}else e.push(this),r(this,i(this)),o.then((function(){n=a,null==m||m.apply(a),Game.UpdateMenu(),n=null}))}return s.prototype.render=function(){for(var e=document.createElement("div"),t=0,r=this.toggles;t<r.length;t++){var i=r[t];e.appendChild(i.render())}return e},s}();export{s as Mod,n as currentMod};
