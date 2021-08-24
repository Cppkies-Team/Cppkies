import{c as e}from"./tslib.es6-ac47674d.js";import"./vars.js";import"./spritesheets.js";import"./helpers.js";import"./lz-string.js";import"./saves.js";import"./generic.js";import"./eventemitter.js";import"./buildings.js";import t from"./basegame.js";import{Upgrade as i}from"./baseUpgrade.js";var r={1:5,2:4,4:4,default:3};var s=[.1,.125,.15,.175,.2,.2,.2,.2,.2,.175,.15,.125,.115],o=function(i){function o(e,o,a,n,l,p){void 0===n&&(n=Game.Tiers[a].special||isNaN(parseInt(a.toString()))?null:s[(parseInt(a.toString())-1)%(s.length-1)]),void 0===p&&(p=Game.Tiers[a].special||isNaN(parseInt(a.toString()))?null:1===a?.5:a-1);var m=i.call(this,e,"You gain <b>more CpS</b> the more milk you have.<q>"+o+"</q>",Game.Tiers[a].special||isNaN(parseInt(a.toString()))?null!=l?l:0:function(e){for(var t=1,i=1;i<=e;i++)t+=i in r?r[i]:r.default;return 9*Math.pow(10,t)}(a),Game.GetIcon("Kitten",a))||this;return m.tier=a,m.kitten=!0,m.pool="",null===n&&console.warn("Please make sure to specify the power if the kitten tier is special"),(Game.Tiers[a].special||isNaN(parseInt(a.toString())))&&void 0===l&&console.warn("Please make sure to specify the cost if the kitten tier is special"),null!==p&&t.on("logic",(function(){Game.milkProgress>=p&&Game.Unlock(m.name)})),m.order=2e4+m.id/1e3,null!==n&&t.on("rawCpsMult",(function(e){var t=m.bought?1+Game.milkProgress*n*window.__INTERNAL_CPPKIES_HOOKS__.hiddenMilkMult:1;return Game.cookiesMultByType.kittens*=t,e*t})),Game.UpgradesByPool.kitten.push(m),"fortune"===a&&Game.Tiers[a].upgrades.push(m),m}return e(o,i),o}(i);export{o as KittenUpgrade};
