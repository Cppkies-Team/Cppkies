import{c as e}from"./tslib.es6-ac47674d.js";import"./vars.js";import"./spritesheets.js";import"./helpers.js";import"./lz-string.js";import"./saves.js";import{Achievement as i}from"./baseAchievement.js";import"./generic.js";import"./eventemitter.js";import"./buildings.js";import t from"./basegame.js";var r=function(i){function r(e,r,s){var o=this,m=parseInt(r.toString());return(o=i.call(this,e,"Make <b>"+toFixed(Math.pow(10,1+2*m))+"</b> cookies from clicking."+(s?"<q>"+s+"</q>":""),Game.GetIcon("Mouse",r))||this).pool="normal",o.tier=r,o.order=1e3+o.id/1e3,Game.Tiers[r].special||isNaN(m)||t.on("check",(function(){Game.handmadeCookies>=Math.pow(10,1+2*m)&&Game.Win(o.name)})),o}return e(r,i),r}(i);export{r as MouseAchievement};