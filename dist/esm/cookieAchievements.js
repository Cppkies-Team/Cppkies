import{c as e}from"./tslib.es6-ac47674d.js";import"./vars.js";import"./spritesheets.js";import"./helpers.js";import"./lz-string.js";import"./saves.js";import{Achievement as t}from"./baseAchievement.js";var s=function(t){function s(e,s,o,r){void 0===r&&(r=Math.pow(10,Math.floor(1.5*Game.BankAchievements.length+2)));var i=t.call(this,e,"Bake <b>"+toFixed(r)+"</b> cookie"+(1===Math.abs(r)?"":"s")+" in one ascension."+(o?"<q>"+o+"</q>":""),s)||this;return i.treshold=r,i.order=100+.01*Game.BankAchievements.length,Game.BankAchievements.push(i),i}return e(s,t),s}(t),o=function(t){function s(e,s,o,r){void 0===r&&(r=Math.pow(10,Math.floor(1.2*Game.BankAchievements.length)));var i=t.call(this,e,"Bake <b>"+toFixed(r)+"</b> cookie"+(1===Math.abs(r)?"":"s")+" per second."+(o?"<q>"+o+"</q>":""),s)||this;return i.treshold=r,i.order=200+.01*Game.CpsAchievements.length,Game.CpsAchievements.push(i),i}return e(s,t),s}(t);export{s as BankAchievement,o as CpsAchievement};
