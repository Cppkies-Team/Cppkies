import{c as e}from"./_tslib-e6397ef4.js";import"./vars.js";import"./spritesheets.js";import"./helpers.js";import"./saves.js";import{Achievement as r}from"./baseAchievement.js";import"./eventemitter.js";import"./generic.js";import{b as i}from"./buildings-304ebdb3.js";var s=function(r){function s(e,s,a,t){var o=this,n="object"==typeof a?a:Game.Objects[a],m=null,c=-1;if(0===n.id){switch(t){case"cursor2":m=[0,6],c=2;break;case"cursor50":m=[1,6],c=50;break;default:if(Game.Tiers[t].achievUnlock<=0){console.warn("Tier has invalid unlock amount");break}c=1===t?1:2*Game.Tiers[t].achievUnlock}i.Cursor.on("buy",(function(){Game.Objects.Cursor.amount>=c&&Game.Win(o.name)}))}else c=Game.Tiers[t].achievUnlock;return o=r.call(this,e,"Have <b>"+c+"</b> "+(1===Math.abs(c)?n.single:n.plural)+"."+(s?"<q>"+s+"</q>":""),null!=m?m:Game.GetIcon(n.name,t))||this,Game.SetTier(n.name,"cursor2"===t||"cursor50"===t?1:t),n.tieredAchievs[t]=o,o.buildingTie=n,o.order=1e3+100*n.id+o.id/1e3,o.order-=75*Math.max(0,Math.min(n.id-4,3)),n.id>=8&&(o.order-=75),0===n.id&&(o.order+=50),o}return e(s,r),s}(r);export{s as TieredAchievement};
