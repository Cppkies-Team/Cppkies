import{c as e}from"./_tslib-e6397ef4.js";import{customAchievements as r}from"./vars.js";import{resolveIcon as s}from"./spritesheets.js";import{applyAllProps as t}from"./helpers.js";import{loadAchievement as o}from"./saves.js";var m=function(m){function i(e,i,n){var p=m.call(this,e,i,s(n))||this;return t(p,o(p)),r.push(p),p.won&&Game.CountsAsAchievementOwned(p.pool)&&Game.AchievementsOwned++,p}return e(i,m),i}(Game.Achievement);export{m as Achievement};
