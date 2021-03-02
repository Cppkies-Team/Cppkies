import"./_tslib-e6397ef4.js";import{customBuildings as e,customUpgrades as n,customAchievements as r}from"./vars.js";import{applyAllProps as a,hasOwnProperty as o}from"./helpers.js";var t=Game.dragonLevels.length+0,i=1;function u(e){switch(e){case"mod":return{achievements:{},buildings:{},upgrades:{}};case"dragon":return{level:"sync",auras:["sync","sync"]};case"achievement":return{won:!1};case"upgrade":return{bought:!1,unlocked:!1};case"building":return{amount:0,bought:0,free:0,totalCookies:0,level:0,muted:0,minigameSave:""};default:throw new Error("Invalid fragment name!")}}function g(){return{mods:{},foreign:u("mod"),saveVer:1,dragon:u("dragon")}}var s=g();function l(){var e=g();for(var n in e)s[n]=e[n]}function d(e){return s.foreign.buildings[e.name]||u("building")}function f(e){var n=e.amount,r=e.bought,a=e.free,o=e.totalCookies,t=e.level,i=e.muted,u=e.minigameSave,g=e.name;s.foreign.buildings[g]={amount:n,bought:r,free:a,totalCookies:o,level:t,muted:i,minigameSave:u}}function v(e){return s.foreign.upgrades[e.name]||u("upgrade")}function c(e){s.foreign.upgrades[e.name]={unlocked:!!e.unlocked,bought:!!e.bought}}function m(e){return s.foreign.achievements[e.name]||u("achievement")}function p(e){s.foreign.achievements[e.name]={won:!!e.won}}function h(){"sync"!==s.dragon.level&&s.dragon.level<=Game.dragonLevels.length-1&&(Game.dragonLevel=s.dragon.level),"sync"!==s.dragon.auras[0]&&s.dragon.auras[0]<=Object.keys(Game.dragonAuras).length-1&&(Game.dragonAura=s.dragon.auras[0]),"sync"!==s.dragon.auras[1]&&s.dragon.auras[1]<=Object.keys(Game.dragonAuras).length-1&&(Game.dragonAura2=s.dragon.auras[1])}function b(){for(var o=0,t=e;o<t.length;o++){var i=t[o];a(i,d(i))}for(var u=0,g=n;u<g.length;u++){var s=g[u];a(s,v(s)),s.bought&&Game.CountsAsUpgradeOwned(s.pool)&&Game.UpgradesOwned++}for(var l=0,f=r;l<f.length;l++){var c=f[l];a(c,m(c)),c.won&&Game.CountsAsAchievementOwned(c.pool)&&Game.AchievementsOwned++}h()}function y(){for(var a=0,o=e;a<o.length;a++){f(o[a])}for(var t=0,i=n;t<i.length;t++){c(i[t])}for(var u=0,g=r;u<g.length;u++){p(g[u])}}function j(e){var n=g();if("object"!=typeof e||null===e)return n;if(!o(e,"saveVer")||"number"!=typeof e.saveVer||e.saveVer>1)return n;if(o(e,"foreign")?n.foreign=function(e){var n=u("mod");if("object"!=typeof e||null===e)return n;if(o(e,"buildings")&&"object"==typeof e.buildings&&null!==e.buildings)for(var r in e.buildings){var a=e.buildings[r];if("object"==typeof a&&null!==a)for(var t in n.buildings[r]=u("building"),a)typeof n.buildings[r][t]==typeof a[t]&&(n.buildings[r][t]=a[t])}if(o(e,"upgrades")&&"object"==typeof e.upgrades&&null!==e.upgrades)for(var i in e.upgrades){var g=e.upgrades[i];if("object"==typeof g&&null!==g)for(var t in n.upgrades[i]=u("upgrade"),n.upgrades[i])typeof n.upgrades[i][t]==typeof g[t]&&(n.upgrades[i][t]=g[t])}if(o(e,"achievements")&&"object"==typeof e.achievements&&null!==e.achievements)for(var s in e.achievements){var l=e.achievements[s];if("object"==typeof l&&null!==l)for(var t in n.achievements[s]=u("achievement"),n.achievements[s])typeof n.achievements[s][t]==typeof l[t]&&(n.achievements[s][t]=l[t])}return n}(e.foreign):n.foreign=u("mod"),o(e,"dragon")&&"object"==typeof e.dragon&&null!==e.dragon&&(!o(e.dragon,"level")||"number"!=typeof e.dragon.level&&"sync"!==e.dragon.level||(n.dragon.level=e.dragon.level),o(e.dragon,"auras")&&e.dragon.auras instanceof Array))for(var r in e.dragon.auras){var a=e.dragon.auras[r];"number"!=typeof a&&"sync"!==a||(n.dragon.auras[r]=a)}return n}function w(e){var n;try{n=JSON.parse(e)}catch(n){""!==e&&"{}"!==e&&console.warn("CPPKIES: Found invalid save, creating new one..."),l()}var r=j(n);for(var a in r)s[a]=r[a];b()}function G(){return y(),JSON.stringify(s)}export{i as SAVE_VER,t as VANILLA_DRAGON_LEVEL_AMOUNT,j as applySave,G as exportSave,w as importSave,l as initSave,m as loadAchievement,b as loadAll,d as loadBuilding,h as loadDragon,v as loadUpgrade,s as save,p as saveAchievement,y as saveAll,f as saveBuilding,c as saveUpgrade};