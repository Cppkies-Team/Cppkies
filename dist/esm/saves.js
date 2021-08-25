import"./tslib.es6-ac47674d.js";import{customBuildings as e,customUpgrades as n,customAchievements as o,mods as r}from"./vars.js";import{applyAllProps as a,hasOwnProperty as i}from"./helpers.js";import{decompressFromUTF16 as u,compressToUTF16 as t}from"./lz-string.js";var s=Game.dragonLevels.length+0,d=3;function m(e){switch(e){case"mod":return{custom:null};case"dragon":return{level:"sync",auras:["sync","sync"]};case"achievement":return{won:!1};case"upgrade":return{bought:!1,unlocked:!1};case"building":return{amount:0,bought:0,free:0,totalCookies:0,level:0,muted:0,minigameSave:""};default:throw new Error("Invalid fragment name!")}}function l(){return{mods:{},foreign:m("mod"),saveVer:3,dragon:m("dragon")}}var g=l();function v(){var e=l();a(g,e)}function c(e){var n,o=e.amount,r=e.bought,a=e.free,i=e.totalCookies,u=e.level,t=e.muted,s=e.minigameSave,d=e.name,m=e.owner;if(m){var l=g.mods[m.keyname].buildings;l?l[d]={amount:o,bought:r,free:a,totalCookies:i,level:u,muted:t,minigameSave:s}:g.mods[m.keyname].buildings=((n={})[d]={amount:o,bought:r,free:a,totalCookies:i,level:u,muted:t,minigameSave:s},n)}else g.foreign.buildings||(g.foreign.buildings={}),g.foreign.buildings[d]={amount:o,bought:r,free:a,totalCookies:i,level:u,muted:t,minigameSave:s}}function f(e){var n,o;return(null===(o=null===(n=e.owner?g.mods[e.owner.keyname]:g.foreign)||void 0===n?void 0:n.buildings)||void 0===o?void 0:o[e.name])||m("building")}function h(e){var n;if(e.owner){var o=g.mods[e.owner.keyname].upgrades;o?o[e.name]={unlocked:!!e.unlocked,bought:!!e.bought}:g.mods[e.owner.keyname].upgrades=((n={})[e.name]={unlocked:!!e.unlocked,bought:!!e.bought},n)}else g.foreign.upgrades||(g.foreign.upgrades={}),g.foreign.upgrades[e.name]={unlocked:!!e.unlocked,bought:!!e.bought}}function b(e){var n,o;return(null===(o=null===(n=e.owner?g.mods[e.owner.keyname]:g.foreign)||void 0===n?void 0:n.upgrades)||void 0===o?void 0:o[e.name])||m("upgrade")}function p(e){var n;if(e.owner){var o=g.mods[e.owner.keyname].achievements;o?o[e.name]={won:!!e.won}:g.mods[e.owner.keyname].achievements=((n={})[e.name]={won:!!e.won},n)}else g.foreign.achievements||(g.foreign.achievements={}),g.foreign.achievements[e.name]={won:!!e.won}}function y(e){var n,o;return(null===(o=null===(n=e.owner?g.mods[e.owner.keyname]:g.foreign)||void 0===n?void 0:n.achievements)||void 0===o?void 0:o[e.name])||m("achievement")}function k(){"sync"!==g.dragon.level&&g.dragon.level<=Game.dragonLevels.length-1&&(Game.dragonLevel=g.dragon.level),"sync"!==g.dragon.auras[0]&&g.dragon.auras[0]<=Object.keys(Game.dragonAuras).length-1&&(Game.dragonAura=g.dragon.auras[0]),"sync"!==g.dragon.auras[1]&&g.dragon.auras[1]<=Object.keys(Game.dragonAuras).length-1&&(Game.dragonAura2=g.dragon.auras[1])}function w(e){g.mods[e.keyname]?g.mods[e.keyname].custom=e.custom:g.mods[e.keyname]={custom:e.custom};for(var n=0,o=e.toggles;n<o.length;n++){var r=o[n];if(r.save){var a=g.mods[e.keyname].ui;a?a[r.keyname]=r.save():g.mods[e.keyname].ui={}}}}function j(e){return g.mods[e.keyname]||m("mod")}function G(e,n){if(e.custom=n.custom,n.ui)for(var o=0,r=e.toggles;o<r.length;o++){var a=r[o];a.load&&i(n.ui,a.keyname)&&a.load(n.ui[a.keyname])}}function A(){for(var i=0,u=e;i<u.length;i++){var t=u[i];a(t,f(t))}for(var s=0,d=n;s<d.length;s++){var m=d[s];a(m,b(m)),m.bought&&Game.CountsAsUpgradeOwned(m.pool)&&Game.UpgradesOwned++}for(var l=0,g=o;l<g.length;l++){var v=g[l];a(v,y(v)),v.won&&Game.CountsAsAchievementOwned(v.pool)&&Game.AchievementsOwned++}k();for(var c=0,h=r;c<h.length;c++){var p=h[c];G(p,j(p))}}function C(){for(var a=0,i=r;a<i.length;a++){w(i[a])}for(var u=0,t=e;u<t.length;u++){c(t[u])}for(var s=0,d=n;s<d.length;s++){h(d[s])}for(var m=0,l=o;m<l.length;m++){p(l[m])}}function O(e){var n=l();if("object"!=typeof e||null===e)return n;if(!i(e,"saveVer")||"number"!=typeof e.saveVer||e.saveVer>3)return n;function o(e){var n=m("mod");if("object"!=typeof e||null===e)return n;if(i(e,"buildings")&&"object"==typeof e.buildings&&null!==e.buildings&&(e.buildings,1))for(var o in n.buildings={},e.buildings){var r=e.buildings[o];"object"==typeof r&&null!==r&&(n.buildings[o]=m("building"),a(n.buildings[o],r))}if(i(e,"upgrades")&&"object"==typeof e.upgrades&&null!==e.upgrades&&(e.upgrades,1))for(var u in n.upgrades={},e.upgrades){var t=e.upgrades[u];"object"==typeof t&&null!==t&&(n.upgrades[u]=m("upgrade"),a(n.upgrades[u],t))}if(i(e,"achievements")&&"object"==typeof e.achievements&&null!==e.achievements&&(e.achievements,1))for(var s in n.achievements={},e.achievements){var d=e.achievements[s];"object"==typeof d&&null!==d&&(n.achievements[s]=m("achievement"),a(n.achievements[s],d))}if(i(e,"ui")&&"object"==typeof e.ui&&null!==e.ui&&(e.ui,1))for(var l in n.ui={},e.ui)n.ui[l]=e.ui[l];return i(e,"custom")&&"object"==typeof e.custom&&(n.custom=e.custom),n}if(i(e,"foreign")?n.foreign=o(e.foreign):n.foreign=m("mod"),i(e,"mods")&&"object"==typeof e.mods&&null!==e.mods&&(e.mods,1))for(var r in e.mods)n.mods[r]=o(e.mods[r]);if(i(e,"dragon")&&"object"==typeof e.dragon&&null!==e.dragon&&(!i(e.dragon,"level")||"number"!=typeof e.dragon.level&&"sync"!==e.dragon.level||(n.dragon.level=e.dragon.level),i(e.dragon,"auras")&&e.dragon.auras instanceof Array))for(var u in e.dragon.auras){var t=e.dragon.auras[u];"number"!=typeof t&&"sync"!==t||(n.dragon.auras[u]=t)}return n}function S(e){var n;if(""===e||"{}"===e)v();else try{var o=u(e);o||(o=e),n=JSON.parse(o)}catch(e){console.warn("CPPKIES: Found invalid save, creating new one..."),console.error(e),v()}var r=O(n);a(g,r),A()}function F(){return C(),t(JSON.stringify(g))}export{d as SAVE_VER,s as VANILLA_DRAGON_LEVEL_AMOUNT,G as applyModSave,O as applySave,F as exportSave,S as importSave,v as initSave,y as loadAchievement,A as loadAll,f as loadBuilding,k as loadDragon,j as loadMod,b as loadUpgrade,g as save,p as saveAchievement,C as saveAll,c as saveBuilding,w as saveMod,h as saveUpgrade};
