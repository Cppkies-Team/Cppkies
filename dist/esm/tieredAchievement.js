import{c as e}from"./tslib.es6-ac47674d.js";import"./vars.js";import"./spritesheets.js";import"./helpers.js";import"./lz-string.js";import"./saves.js";import{Achievement as r}from"./baseAchievement.js";import"./generic.js";import"./eventemitter.js";import{buildingHooks as i}from"./buildings.js";var s=function(r){function s(e,s,o,t){var a=this,n="object"==typeof o?o:Game.Objects[o],m=null,c=-1;if(0===n.id){switch(t){case"cursor2":m=[0,6],c=2;break;case"cursor50":m=[1,6],c=50;break;default:if(Game.Tiers[t].achievUnlock<=0){console.warn("Tier has invalid unlock amount");break}c=1===t?1:2*Game.Tiers[t].achievUnlock}i.Cursor.on("buy",(function(){Game.Objects.Cursor.amount>=c&&Game.Win(a.name)}))}else c=Game.Tiers[t].achievUnlock;return(a=r.call(this,e,"Have <b>"+c+"</b> "+(1===Math.abs(c)?n.single:n.plural)+"."+(s?"<q>"+s+"</q>":""),null!=m?m:Game.GetIcon(n.name,t))||this).pool="normal",a.tier="cursor2"===t||"cursor50"===t?1:t,a.buildingTie=n,n.tieredAchievs[t]=a,a.buildingTie=n,a.order=1e3+100*n.id+a.id/1e3,a.order-=75*Math.max(0,Math.min(n.id-4,3)),n.id>=8&&(a.order-=75),0===n.id&&(a.order+=50),a}return e(s,r),s}(r);export{s as TieredAchievement};
