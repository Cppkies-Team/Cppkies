import{c as e}from"./_tslib-e6397ef4.js";import"./vars.js";import"./spritesheets.js";import"./helpers.js";import"./saves.js";import{Achievement as i}from"./baseAchievement.js";import"./eventemitter.js";import"./generic.js";import{h as t}from"./buildings-304ebdb3.js";var o=function(i){function o(e,o,r){var s=this,a=parseInt(o.toString());return(s=i.call(this,e,"Make <b>"+toFixed(Math.pow(10,1+2*a))+"</b> cookies from clicking."+(r?"<q>"+r+"</q>":""),Game.GetIcon("Mouse",o))||this).pool="normal",s.tier=o,s.order=1e3+s.id/1e3,Game.Tiers[o].special||isNaN(a)||t.on("check",(function(){Game.handmadeCookies>=Math.pow(10,1+2*a)&&Game.Win(s.name)})),s}return e(o,i),o}(i);export{o as MouseAchievement};