import{c as s}from"./_tslib-e6397ef4.js";import"./vars.js";import"./spritesheets.js";import"./helpers.js";import"./saves.js";import{Upgrade as e}from"./baseUpgrade.js";var r=function(e){function r(s,r,t,i,o,p,a){void 0===p&&(p=["Legacy"]),void 0===a&&(a=function(){});var m=e.call(this,s,r,t,i,a)||this;return m.pool="prestige",m.posX=o[0],m.posY=o[1],m.parents=p.map((function(s){return Game.Upgrades[s]||Game.UpgradesById[s]})),Game.PrestigeUpgrades.push(m),Game.UpgradePositions[m.id]=o,m}return s(r,e),r}(e);export{r as HeavenlyUpgrade};
