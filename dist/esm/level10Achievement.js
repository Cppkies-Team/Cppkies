import{c as i}from"./tslib.es6-ac47674d.js";import"./vars.js";import"./spritesheets.js";import{hasOwnProperty as r}from"./helpers.js";import"./lz-string.js";import"./saves.js";import{Achievement as e}from"./baseAchievement.js";var t=function(e){function t(i,t,o){var s=this;"string"==typeof t&&(t=Game.Objects[t]);var n=[t.iconColumn,26,r(t,"iconLink")&&"string"==typeof t.iconLink?t.iconLink:void 0];return(s=e.call(this,i,"Reach level <b>10</b> "+t.plural+"."+(o?"<q>"+o+"</q>":""),n)||this).order=1020+100*t.id+s.id/1e3,s.order-=75*Math.max(0,Math.min(t.id-4,3)),t.id>=8&&(s.order-=75),0===t.id&&(s.order+=50),t.levelAchiev10=s,s}return i(t,e),t}(e);export{t as Level10Achievement};
