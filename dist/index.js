!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).Cppkies={})}(this,(function(e){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])})(e,t)};function t(e,t){function i(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)}function i(e,n,t,i){return new(t||(t=Promise))((function(a,r){function o(e){try{c(i.next(e))}catch(e){r(e)}}function s(e){try{c(i.throw(e))}catch(e){r(e)}}function c(e){e.done?a(e.value):new t((function(n){n(e.value)})).then(o,s)}c((i=i.apply(e,n||[])).next())}))}function a(e,n){var t,i,a,r,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function s(r){return function(s){return function(r){if(t)throw new TypeError("Generator is already executing.");for(;o;)try{if(t=1,i&&(a=2&r[0]?i.return:r[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,r[1])).done)return a;switch(i=0,a&&(r=[2&r[0],a.value]),r[0]){case 0:case 1:a=r;break;case 4:return o.label++,{value:r[1],done:!1};case 5:o.label++,i=r[1],r=[0];continue;case 7:r=o.ops.pop(),o.trys.pop();continue;default:if(!(a=o.trys,(a=a.length>0&&a[a.length-1])||6!==r[0]&&2!==r[0])){o=0;continue}if(3===r[0]&&(!a||r[1]>a[0]&&r[1]<a[3])){o.label=r[1];break}if(6===r[0]&&o.label<a[1]){o.label=a[1],a=r;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(r);break}a[2]&&o.ops.pop(),o.trys.pop();continue}r=n.call(e,o)}catch(e){r=[6,e],i=0}finally{t=a=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,s])}}}function r(){for(var e=0,n=0,t=arguments.length;n<t;n++)e+=arguments[n].length;var i=Array(e),a=0;for(n=0;n<t;n++)for(var r=arguments[n],o=0,s=r.length;o<s;o++,a++)i[a]=r[o];return i}var o={cookieOrder:121212,iconLink:"",buildingLink:""},s=[],c=[],u=[],m={},d=[];function p(e,n){m[e]=n}function f(e){if(d.includes(e))throw new Error("Recursive alias");return d.push(e),e in m?f(m[e]):(d=[],e)}function g(e){return new Promise((function(n){var t=new Image;t.addEventListener("load",(function(){n(t)})),t.crossOrigin="Anonymous",t.src=e}))}function v(e){return new Promise((function(n){e.canvas.toBlob((function(e){n(URL.createObjectURL(e))}))}))}function h(e,n,t,i,a,r){return new Promise((function(o){t[0]instanceof Array||(t=[t]),t=t;var s={};for(var c in t)for(var u in t[c])if(t[c][u]){if(t[c][u]=t[c][u].toString().toLowerCase(),!(t[c][u]in n))throw new Error("Invalid icon name");s[t[c][u]]=[parseInt(u),parseInt(c)]}var l=document.createElement("canvas").getContext("2d"),m=new Image;m.addEventListener("load",(function(){for(var e in l.canvas.width=a[0],l.canvas.height=a[1],s)l.drawImage(m,s[e][0]*i[0],s[e][1]*i[1],i[0],i[1],n[e][0]*i[0],n[e][1]*i[1],i[0],i[1]);var t,c=function(){v(l).then(o)};r&&(t=r(l)),t instanceof Promise?t.then(c):c()})),m.crossOrigin="Anonymous",m.src=e}))}var b={},G={"3d":[0,21],milestone1:[0,22],milestone2:[0,23],milestone3:[0,24],krumblor:[0,25],level1:[0,26],level2:[0,27]};var k={},y={research:[9,0],cookie:[10,0],mouse:[11,0],multicursor:[12,0],kitten:[18,0]};function _(e){return void 0===(e=r(e))[2]||null===e[2]?e[2]=f(o.iconLink):e[2]=f(e[2]),e}function w(e,n){var t=null===n[0],i=new RegExp("");null!==n[0]&&((i="string"==typeof n[0]?new RegExp(n[0].replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1"),"g"):n[0]).test(e)||console.warn("Nothing to inject."));switch(n[2]){case"before":e=t?e.replace(/(\)[^{]*{)/,"$1"+n[1]):e.replace(i,""+n[1]+n[0]);break;case"replace":e=t?n[1]:e.replace(i,n[1]);break;case"after":e=t?e.replace(/(}?)$/,n[1]+"$1"):e.replace(i,""+n[0]+n[1]);break;default:throw new Error('where Parameter must be "before", "replace" or "after"')}return e}function C(e,n,t,i,a){void 0===a&&(a={});var o=Function.apply(void 0,r(Object.keys(a),["return ("+w(e.toString(),[n,t,i])+")"])).apply(void 0,Object.values(a));return o.prototype=e.prototype,o}function O(e,n,t){void 0===t&&(t={});for(var i=e.toString(),a=0,o=n;a<o.length;a++){i=w(i,o[a])}var s=Function.apply(void 0,r(Object.keys(t),["return ("+i+")"])).apply(void 0,Object.values(t));return s.prototype=e.prototype,s}function S(e,n){for(var t in n)e[t]=n[t]}function I(e){return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}function P(e,n){return e.hasOwnProperty(n)}var L=function(){function e(){this._events={}}return e.prototype.on=function(e,n){this._events[e]?this._events[e].push(n):this._events[e]=[n]},e.prototype.once=function(e,n){var t=this;this.on(e,(function(i){return t.off(e,n),n(i)}))},e.prototype.off=function(e,n){this._events[e].splice(this._events[e].indexOf(n),1)},e.prototype.emit=function(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];var i=n[0];this._events[e]||(this._events[e]=[]);for(var a=0,r=this._events[e];a<r.length;a++){var o=r[a];i=o(i)}return i},e.prototype.constEmit=function(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];this._events[e]||(this._events[e]=[]);for(var i=0,a=this._events[e];i<a.length;i++){var r=a[i];r(n[0])}},e}(),A=function(e,n){this.value=e,this.func=n},E={};function j(e){var n=new L;[new A("tooltip",(function(){e.tooltip=C(C(e.tooltip,"return","let tempRet = ","replace"),null,'\n//Cppkies injection\n\t\t\t\treturn __INTERNAL_CPPKIES_HOOKS__.buildings[this.name].emit("tooltip", tempRet)',"after")})),new A("buy",(function(){e.buy=C(e.buy,null,'\n//Cppkies injection\n\t\t\t\tif(success) {\n\t\t\t\t\t__INTERNAL_CPPKIES_HOOKS__.buildings[this.name].emit("buy")\n\t\t\t\t}',"after")})),new A("levelUp",(function(){e.levelUp=C(e.levelUp,"me.level+=1;",'\n// Cppkies injection\n__INTERNAL_CPPKIES_HOOKS__.buildings[me.name].emit("levelUp")',"after",{me:e})}))].forEach((function(e){var n;null===(n=e.func)||void 0===n||n.call(e)})),T.on("buildingCps",(function(t){return{building:t.building,cps:Game.Objects[t.building]===e?n.emit("cps",t.cps):t.cps}})),E[e.name]=n}function N(){for(var e=0,n=Game.ObjectsById;e<n.length;e++){var t=n[e];E[t.name]||j(t)}}var T=new L;var M=Game.dragonLevels.length+0;function K(e){switch(e){case"mod":return{achievements:{},buildings:{},upgrades:{}};case"dragon":return{level:"sync",auras:["sync","sync"]};case"achievement":return{won:!1};case"upgrade":return{bought:!1,unlocked:!1};case"building":return{amount:0,bought:0,free:0,totalCookies:0,level:0,muted:0,minigameSave:""};default:throw new Error("Invalid fragment name!")}}function R(){return{mods:{},foreign:K("mod"),saveVer:1,dragon:K("dragon")}}var U=R();function x(e){return U.foreign.buildings[e.name]||K("building")}function H(e){var n=e.amount,t=e.bought,i=e.free,a=e.totalCookies,r=e.level,o=e.muted,s=e.minigameSave,c=e.name;U.foreign.buildings[c]={amount:n,bought:t,free:i,totalCookies:a,level:r,muted:o,minigameSave:s}}function B(e){return U.foreign.upgrades[e.name]||K("upgrade")}function q(e){U.foreign.upgrades[e.name]={unlocked:!!e.unlocked,bought:!!e.bought}}function F(e){return U.foreign.achievements[e.name]||K("achievement")}function D(e){U.foreign.achievements[e.name]={won:!!e.won}}function Y(){for(var e=0,n=s;e<n.length;e++){var t=n[e];S(t,x(t))}for(var i=0,a=u;i<a.length;i++){var r=a[i];S(r,B(r)),r.bought&&Game.CountsAsUpgradeOwned(r.pool)&&Game.UpgradesOwned++}for(var o=0,l=c;o<l.length;o++){var m=l[o];S(m,F(m)),m.won&&Game.CountsAsAchievementOwned(m.pool)&&Game.AchievementsOwned++}"sync"!==U.dragon.level&&U.dragon.level<=Game.dragonLevels.length-1&&(Game.dragonLevel=U.dragon.level),"sync"!==U.dragon.auras[0]&&U.dragon.auras[0]<=Object.keys(Game.dragonAuras).length-1&&(Game.dragonAura=U.dragon.auras[0]),"sync"!==U.dragon.auras[1]&&U.dragon.auras[1]<=Object.keys(Game.dragonAuras).length-1&&(Game.dragonAura2=U.dragon.auras[1])}function W(e){var n;try{n=JSON.parse(e)}catch(n){""!==e&&"{}"!==e&&console.warn("CPPKIES: Found invalid save, creating new one..."),function(){var e=R();for(var n in e)U[n]=e[n]}()}var t=function(e){var n=R();if("object"!=typeof e||null===e)return n;if(!P(e,"saveVer")||"number"!=typeof e.saveVer||e.saveVer>1)return n;if(P(e,"foreign")?n.foreign=function(e){var n=K("mod");if("object"!=typeof e||null===e)return n;if(P(e,"buildings")&&"object"==typeof e.buildings&&null!==e.buildings)for(var t in e.buildings){var i=e.buildings[t];if("object"==typeof i&&null!==i)for(var a in n.buildings[t]=K("building"),i)typeof n.buildings[t][a]==typeof i[a]&&(n.buildings[t][a]=i[a])}if(P(e,"upgrades")&&"object"==typeof e.upgrades&&null!==e.upgrades)for(var r in e.upgrades){var o=e.upgrades[r];if("object"==typeof o&&null!==o)for(var a in n.upgrades[r]=K("upgrade"),n.upgrades[r])typeof n.upgrades[r][a]==typeof o[a]&&(n.upgrades[r][a]=o[a])}if(P(e,"achievements")&&"object"==typeof e.achievements&&null!==e.achievements)for(var s in e.achievements){var c=e.achievements[s];if("object"==typeof c&&null!==c)for(var a in n.achievements[s]=K("achievement"),n.achievements[s])typeof n.achievements[s][a]==typeof c[a]&&(n.achievements[s][a]=c[a])}return n}(e.foreign):n.foreign=K("mod"),P(e,"dragon")&&"object"==typeof e.dragon&&null!==e.dragon&&(!P(e.dragon,"level")||"number"!=typeof e.dragon.level&&"sync"!==e.dragon.level||(n.dragon.level=e.dragon.level),P(e.dragon,"auras")&&e.dragon.auras instanceof Array))for(var t in e.dragon.auras){var i=e.dragon.auras[t];"number"!=typeof i&&"sync"!==i||(n.dragon.auras[t]=i)}return n}(n);for(var i in t)U[i]=t[i];Y()}function V(){return function(){for(var e=0,n=s;e<n.length;e++)H(n[e]);for(var t=0,i=u;t<i.length;t++)q(i[t]);for(var a=0,r=c;a<r.length;a++)D(r[a])}(),JSON.stringify(U)}function X(e){return"fortune"===e.tier}var $=function(e){function n(n,t,i,a,r){void 0===r&&(r=function(){});var o=e.call(this,n,"function"==typeof t?"":t,"function"==typeof i?0:i,"function"==typeof a?[0,0]:_(a),r)||this;"function"==typeof t&&(o.descFunc=t),"function"==typeof i&&(o.priceFunc=i),"function"==typeof a&&(o.iconFunction=function(){return _(a())}),u.push(o);var s=B(o);for(var c in s)o[c]=s[c];return Game.upgradesToRebuild=1,o.bought&&Game.CountsAsUpgradeOwned(o.pool)&&Game.UpgradesOwned++,o}return t(n,e),n}(Game.Upgrade),J=function(e){function n(n,t,i,a,r,o,s){void 0===o&&(o=["Legacy"]),void 0===s&&(s=function(){});var c=e.call(this,n,t,i,a,s)||this;return c.pool="prestige",c.posX=r[0],c.posY=r[1],c.parents=o.map((function(e){return Game.Upgrades[e]||Game.UpgradesById[e]})),Game.PrestigeUpgrades.push(c),Game.UpgradePositions[c.id]=r,c}return t(n,e),n}($),z=function(e){function n(n,t,i,a){var r=this;return"string"==typeof i&&(i=Game.Objects[i]),r=e.call(this,n,I(i.plural)+" are <b>twice</b> as efficient.<q>"+t+"</q>",i.basePrice*Game.Tiers[a].price,Game.GetIcon(i.name,a))||this,Game.SetTier(i.name,a),r.buildingTie1=i,X(r)&&(r.order=19e3,i.fortune=r,Game.Tiers[a].upgrades.push(r)),isNaN(parseInt(a.toString()))||(a=parseInt(a.toString())),"number"==typeof a&&(r.order=100*(i.id+1)+r.id/1e3,r.order-=75*Math.max(0,Math.min(i.id-4,3)),i.id>=8&&(r.order-=75)),i.buyFunction.apply(i),r}return t(n,e),n}($),Q=function(e){function n(n,t,i,a){var o=this;if(a){if(!a.endsWith(".png"))throw new Error("Can't use the grandma picture URL \""+a+'", URL must end with .png');a=a.substring(0,a.length-4)}"string"==typeof i&&(i=Game.Objects[i]);var s=i.id-1;return 1===s?s="grandma":s+=" grandmas",o=e.call(this,n,"Grandmas are <b>twice</b> as efficient. "+I(i.plural)+" gain <b>+1% CpS</b> per "+s+".<q>"+t+"</q>",i.basePrice*Game.Tiers[2].price,[10,9,""],Game.Objects.Grandma.redraw)||this,i.grandma=o,o.buildingTie=i,o.order=250+o.id/1e3,i.id>=12&&(o.order+=5),Game.GrandmaSynergies.push(o.name),a&&T.on("grandmaPic",(function(e){return o.bought?r(e,[a]):e})),Game.Objects.Grandma.redraw(),i.buyFunction.apply(i),o}return t(n,e),n}($),Z=function(e){function n(n,t,i,a,r){var o=this;"string"==typeof i&&(i=Game.Objects[i]),"string"==typeof a&&(a=Game.Objects[a]);var s=Game.GetIcon(i.name,r);if(i.basePrice>a.basePrice){var c=i;i=a,a=c}return(o=e.call(this,n,I(i.plural)+" gain <b>+5% CpS</b> per "+a.name.toLowerCase()+".<br>"+I(a.plural)+" gain <b>+0.1% CpS</b> per \n\t\t\t"+i.name.toLowerCase()+".<q>"+t+"</q>",(10*i.basePrice+1*a.basePrice)*Game.Tiers[r].price,s)||this).tier=r,o.buildingTie1=i,o.buildingTie2=a,o.order=5e3+o.id/1e3,i.synergies.push(o),a.synergies.push(o),Game.Tiers[r].upgrades.push(o),i.buyFunction.apply(i),o}return t(n,e),n}($),ee=[5,7,8,9,10],ne=function(e){function n(n,t,i,a){void 0===a&&(a=20);var r=this,o=Game.Objects.Cursor,s=parseInt(i.toString());return(r=e.call(this,n,"Multiplies the gain from Thousand fingers by <b>"+a+"</b>.<q>"+t+"</q>",Game.Tiers[i].special||isNaN(s)?o.basePrice*Game.Tiers[i].price:Math.pow(10,ee[Math.min(s-4,ee.length-1)]+3*Math.max(s-8,0)),Game.GetIcon(o.name,i))||this).tier=i,r.pool="",r.order=100+r.id/1e3,T.on("cursorFingerMult",(function(e){return r.bought?e*a:e})),Game.Tiers[i].special||isNaN(s)||E.Cursor.on("buy",(function(){o.amount>=(4===s?25:50*(s-4))&&Game.Unlock(r.name)})),"fortune"===i&&Game.Tiers[i].upgrades.push(r),Game.Objects.Cursor.buyFunction.apply(Game.Objects.Cursor),r}return t(n,e),n}($),te={1:5,2:4,4:4,default:3};var ie=[.1,.125,.15,.175,.2,.2,.2,.2,.2,.175,.15,.125,.115],ae=function(e){function n(n,t,i,a,r,o){void 0===a&&(a=Game.Tiers[i].special||isNaN(parseInt(i.toString()))?null:ie[(parseInt(i.toString())-1)%(ie.length-1)]),void 0===o&&(o=Game.Tiers[i].special||isNaN(parseInt(i.toString()))?null:1===i?.5:i-1);var s=e.call(this,n,"You gain <b>more CpS</b> the more milk you have.<q>"+t+"</q>",Game.Tiers[i].special||isNaN(parseInt(i.toString()))?null!=r?r:0:function(e){for(var n,t=1,i=1;i<=e;i++)t+=null!==(n=te[i])&&void 0!==n?n:te.default;return 9*Math.pow(10,t)}(i),Game.GetIcon("Kitten",i))||this;return s.tier=i,s.kitten=!0,s.pool="",null===a&&console.warn("Please make sure to specify the power if the kitten tier is special"),(Game.Tiers[i].special||isNaN(parseInt(i.toString())))&&void 0===r&&console.warn("Please make sure to specify the cost if the kitten tier is special"),null!==o&&T.on("logic",(function(){Game.milkProgress>=o&&Game.Unlock(s.name)})),s.order=2e4+s.id/1e3,null!==a&&T.on("rawCpsMult",(function(e){var n=s.bought?1+Game.milkProgress*a*window.__INTERNAL_CPPKIES_HOOKS__.hiddenMilkMult:1;return Game.cookiesMultByType.kittens*=n,e*n})),Game.UpgradesByPool.kitten.push(s),"fortune"===i&&Game.Tiers[i].upgrades.push(s),s}return t(n,e),n}($),re=function(e){function n(n,t,i,a){void 0===a&&(a=1);var r=e.call(this,n,"Clicking gains <b>+"+a+"% of your CpS</b>.<q>"+t+"</q>",Math.pow(10,3+2*parseInt(i.toString())),Game.GetIcon("Mouse",i))||this;r.tier=i,r.pool="";var o=parseInt(i.toString());return r.order=150+r.id/1e3,T.on("cpcAdd",(function(e){return r.bought?e+Game.cookiesPs*a/100:e})),Game.Tiers[i].special||isNaN(o)||T.on("check",(function(){Game.handmadeCookies>=Math.pow(10,1+2*o)&&Game.Unlock(r.name)})),"fortune"===i&&Game.Tiers[i].upgrades.push(r),r}return t(n,e),n}($),oe=function(e){function n(n,t,i,a,r,s,c){var u,l=e.call(this,n,"Cookie production multiplier <b>+"+Beautify("function"==typeof r?r():r,1)+"%</b>.<q>"+t+"</q>",i,a)||this;return l.power=r,l.pool="cookie",l.order=(null!==(u=null!=c?c:o.cookieOrder)&&void 0!==u?u:10020)+l.id/1e3,l.unlockAt={name:n,cookies:("function"==typeof i?i():i)/20,require:null==s?void 0:s.require,season:null==s?void 0:s.season},Game.UnlockAt.push(l.unlockAt),Game.UpgradesByPool.cookie.push(l),Game.cookieUpgrades.push(l),l}return t(n,e),n}($),se=function(e){function n(n,t,i){var a=e.call(this,n,t,_(i))||this;return S(a,F(a)),c.push(a),a.won&&Game.CountsAsAchievementOwned(a.pool)&&Game.AchievementsOwned++,a}return t(n,e),n}(Game.Achievement),ce=function(e){function n(n,t,i,a){var r=this,o="object"==typeof i?i:Game.Objects[i],s=null,c=-1;if(0===o.id){switch(a){case"cursor2":s=[0,6],c=2;break;case"cursor50":s=[1,6],c=50;break;default:if(Game.Tiers[a].achievUnlock<=0){console.warn("Tier has invalid unlock amount");break}c=1===a?1:2*Game.Tiers[a].achievUnlock}E.Cursor.on("buy",(function(){Game.Objects.Cursor.amount>=c&&Game.Win(r.name)}))}else c=Game.Tiers[a].achievUnlock;return r=e.call(this,n,"Have <b>"+c+"</b> "+(1===Math.abs(c)?o.single:o.plural)+"."+(t?"<q>"+t+"</q>":""),null!=s?s:Game.GetIcon(o.name,a))||this,Game.SetTier(o.name,"cursor2"===a||"cursor50"===a?1:a),o.tieredAchievs[a]=r,r.buildingTie=o,r.order=1e3+100*o.id+r.id/1e3,r.order-=75*Math.max(0,Math.min(o.id-4,3)),o.id>=8&&(r.order-=75),0===o.id&&(r.order+=50),r}return t(n,e),n}(se),ue=function(e){function n(n,t,i,a){void 0===a&&(a=Math.pow(10,Math.floor(1.5*Game.BankAchievements.length+2)));var r=e.call(this,n,"Bake <b>"+toFixed(a)+"</b> cookie"+(1===Math.abs(a)?"":"s")+" in one ascension."+(i?"<q>"+i+"</q>":""),t)||this;return r.treshold=a,r.order=100+.01*Game.BankAchievements.length,Game.BankAchievements.push(r),r}return t(n,e),n}(se),le=function(e){function n(n,t,i,a){void 0===a&&(a=Math.pow(10,Math.floor(1.2*Game.BankAchievements.length)));var r=e.call(this,n,"Bake <b>"+toFixed(a)+"</b> cookie"+(1===Math.abs(a)?"":"s")+" per second."+(i?"<q>"+i+"</q>":""),t)||this;return r.treshold=a,r.order=200+.01*Game.CpsAchievements.length,Game.CpsAchievements.push(r),r}return t(n,e),n}(se),me=function(e){function n(n,t,i){var a=this;"string"==typeof t&&(t=Game.Objects[t]);var r=[t.iconColumn,26,P(t,"iconLink")&&"string"==typeof t.iconLink?t.iconLink:void 0];return(a=e.call(this,n,"Reach level <b>10</b> "+t.plural+"."+(i?"<q>"+i+"</q>":""),r)||this).order=1020+100*t.id+a.id/1e3,a.order-=75*Math.max(0,Math.min(t.id-4,3)),t.id>=8&&(a.order-=75),0===t.id&&(a.order+=50),t.levelAchiev10=a,a}return t(n,e),n}(se),de=function(e){function n(n,t,i){var a=this,r=parseInt(t.toString());return(a=e.call(this,n,"Make <b>"+toFixed(Math.pow(10,1+2*r))+"</b> cookies from clicking."+(i?"<q>"+i+"</q>":""),Game.GetIcon("Mouse",t))||this).pool="normal",a.tier=t,a.order=1e3+a.id/1e3,Game.Tiers[t].special||isNaN(r)||T.on("check",(function(){Game.handmadeCookies>=Math.pow(10,1+2*r)&&Game.Win(a.name)})),a}return t(n,e),n}(se),pe=function(e){function n(n,t,i,a,r){var o=this;"string"==typeof t&&(t=Game.Objects[t]);var s=[t.iconColumn,21+i,P(t,"iconLink")&&"string"==typeof t.iconLink?t.iconLink:void 0],c=Math.pow(10,12+t.id+(null!=r?r:0)+7*(i-1));return(o=e.call(this,n,"Make <b>"+toFixed(c)+"</b> cookies just from "+t.plural+"."+(a?"<q>"+a+"</q>":""),s)||this).order=1020+100*t.id+o.id/1e3,o.order-=75*Math.max(0,Math.min(t.id-4,3)),t.id>=8&&(o.order-=75),0===t.id&&(o.order+=50),t.productionAchievs.push({pow:c,achiev:o}),o}return t(n,e),n}(se),fe=function(e){function n(n,t,i,a,r,c,u,m,d,p){var g,v,h=this;if(Game.Objects[n])throw new Error("Can't create building, \""+n+'" is already used as a building name');0!==a[1]&&console.warn("All icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder?id=relink-column"),0!==r[0]&&console.warn("All big icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder?id=big-icons"),h=e.call(this,n,t,i,r[1],a[0],c,0,u,m)||this,s.push(h),E[n]||j(h);var b=function(e){if(parseInt(e)<=0)return"continue";var n=Game.ObjectsById[e];if(n.canvas=l("rowCanvas"+e),!n.canvas)return"continue";if(n.ctx=n.canvas.getContext("2d"),n.canvas.addEventListener("mouseover",(function(){n.mouseOn=!0})),n.canvas.addEventListener("mouseout",(function(){n.mouseOn=!1})),n.canvas.addEventListener("mousemove",(function(e){var t=n.canvas.getBoundingClientRect();n.mousePos[0]=e.pageX-t.left,n.mousePos[1]=e.pageY-t.top})),n.minigame&&n.minigameLoaded){var t=n.minigame.save();n.minigame.launch(),n.minigame.load(t)}};for(var G in Game.ObjectsById)b(G);h.buildingLink=null!==(g=r[2])&&void 0!==g?g:o.buildingLink,h.iconLink=f(null!==(v=a[2])&&void 0!==v?v:o.iconLink),d&&(Game.foolObjects[n]=d),p&&(Game.goldenCookieBuildingBuffs[n]=p),h.iconLink&&E[h.name].on("tooltip",(function(e){return h.locked?e:e.replace("background-position","background-image:url("+h.iconLink+");background-position")})),Game.BuildStore(),h.buildingLink&&T.on("buildStore",(function(){l("productIcon"+h.id).style.backgroundImage="url("+h.buildingLink+")",l("productIconOff"+h.id).style.backgroundImage="url("+h.buildingLink+")"})),Game.BuildStore(),h.canvas=l("rowCanvas"+h.id),h.ctx=h.canvas.getContext("2d"),h.pics=[];var k=document.createElement("div");k.className="tinyProductIcon",k.id="mutedProduct"+h.id,k.style.display="none",h.buildingLink&&(k.style.backgroundImage="url("+h.buildingLink+")"),k.style.backgroundPositionX="-"+a[0]+"px",k.style.backgroundPositionY="-"+a[1]+"px",k.addEventListener("click",(function(){h.mute(0),window.PlaySound(h.muted?"snd/clickOff.mp3":"snd/clickOn.mp3")})),window.AddEvent(h.canvas,"mouseover",(function(){h.mouseOn=!0})),window.AddEvent(h.canvas,"mouseout",(function(){h.mouseOn=!1})),h.canvas.addEventListener("mousemove",(function(e){var n=h.canvas.getBoundingClientRect();h.mousePos[0]=e.pageX-n.left,h.mousePos[1]=e.pageY-n.top})),l("buildingsMute").appendChild(k);var y=x(h);for(var G in y)h[G]=y[G];return Game.recalculateGains=1,h}return t(n,e),n}(Game.Object),ge=function(e,n,t){this.name=e,this.desc=n,this.isCppkies=!0,"string"==typeof t&&(t=Game.Objects[t]),t instanceof Game.Object?this.pic=_([t.iconColumn,25,P(t,"iconLink")&&"string"==typeof t.iconLink?t.iconLink:void 0]):this.pic=t,Game.dragonAuras[Object.keys(Game.dragonAuras).length]=this,"sync"!==U.dragon.auras[0]&&Object.keys(Game.dragonAuras).length>=U.dragon.auras[0]&&(Game.dragonAura=U.dragon.auras[0]),"sync"!==U.dragon.auras[1]&&Object.keys(Game.dragonAuras).length>=U.dragon.auras[1]&&(Game.dragonAura2=U.dragon.auras[1])},ve=function e(n,t,i,a,r,o,s){void 0===s&&(s=Game.dragonLevels.length-3),this.buy=r,this.isCppkies=!0,this.picY=0;var c=Game.dragonLevels[s-1];this.name=null!=n?n:c.name,this.action=t,this.costStr="string"==typeof i?function(){return i}:i,this.cost=a,o?(this.pic=o[0],this.picY=o[1],0!==this.picY&&console.warn("For now, all dragon levels must not use pic Y, sorry."),this.picLink=o[2]):(this.pic=c.pic,c instanceof e&&(this.picY=c.picY,this.picLink=c.picLink)),Game.dragonLevels.splice(s,0,this),"sync"!==U.dragon.level&&Game.dragonLevels.length>=U.dragon.level&&(Game.dragonLevel=U.dragon.level)},he=function(e){function n(n,t,i){return"string"==typeof i&&(i=Game.Objects[i]),e.call(this,null,"Train "+n+"<br/><small>Aura : "+t+"</small>","100 "+i.plural,(function(){return i.amount>=100}),(function(){return i.sacrifice(100)}))||this}return t(n,e),n}(ve);T.on("preSave",(function(){if(0!==Game.dragonAura&&(U.dragon.auras[0]="sync"),0!==Game.dragonAura2&&(U.dragon.auras[1]="sync"),Game.dragonAuras[Game.dragonAura]instanceof ge&&(U.dragon.auras[0]=Game.dragonAura,Game.dragonAura=0),Game.dragonAuras[Game.dragonAura2]instanceof ge&&(U.dragon.auras[1]=Game.dragonAura2,Game.dragonAura2=0),Game.dragonLevels[Game.dragonLevel]instanceof ve||Game.dragonLevel>=M)for(U.dragon.level=Game.dragonLevel;Game.dragonLevels[Game.dragonLevel]instanceof ve||Game.dragonLevel>=M;)Game.dragonLevel--})),T.on("postSave",(function(){"sync"!==U.dragon.auras[0]&&Game.dragonAuras[U.dragon.auras[0]]&&(Game.dragonAura=U.dragon.auras[0]),"sync"!==U.dragon.auras[1]&&Game.dragonAuras[U.dragon.auras[1]]&&(Game.dragonAura2=U.dragon.auras[1]),"sync"!==U.dragon.level&&Game.dragonLevels[U.dragon.level]&&(Game.dragonLevel=U.dragon.level)})),T.on("reset",(function(){U.dragon.auras=["sync","sync"],U.dragon.level="sync"})),T.on("specialPic",(function(e){var n,t=Game.dragonLevels[Game.dragonLevel];return"dragon"===e.tab&&t instanceof ve&&(e.pic=null!==(n=t.picLink)&&void 0!==n?n:e.pic),e}));var be=function(e,n,t,i){if(void 0===i&&(i=!1),this.name=e,this.pic=t,this.special=i,!t.endsWith(".png"))throw new Error("Can't create milk with the milk URL \""+t+'", the URL must end with .png!');i||(this.name="Rank "+function(e){for(var n="",t=0,i=[[1e3,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];t<i.length;t++)for(var a=i[t];e>=a[0];)n+=a[1],e-=a[0];return n}(Game.Milks.length+1)+" - "+e),this.pic=t.substr(0,t.length-4),_(n),this.icon=[n[0],n[1]],this.iconLink=n[2],i?Game.MilksByChoice[Object.keys(Game.MilksByChoice).length]=this:Game.Milks.push(this)},Ge={alias:p,aliases:m,extraColumnIcons:G,extraRowIcons:y,patchIconsheet:function(e,n,t){var r;return void 0===t&&(t=!0),i(this,void 0,void 0,(function(){var i,s,c,u,l,m,d,h,b,G,k,y,_,w,C;return a(this,(function(a){switch(a.label){case 0:return i=document.createElement("canvas").getContext("2d"),[4,g(t?f(e):e)];case 1:for(s=a.sent(),c=[s.width,s.height],u=0,l=n;u<l.length;u++)48*(m=l[u])[0][0]>c[0]&&(c[0]=48*m[0][0]),48*m[0][1]>c[1]&&(c[1]=48*m[0][1]);i.canvas.width=c[0],i.canvas.height=c[1],i.drawImage(s,0,0),d={},h=0,b=n,a.label=2;case 2:return h<b.length?(G=b[h],k=f((null!==(r=G[1][2])&&void 0!==r?r:o.iconLink)||"img/icons.png"),d[k]?[3,4]:(y=d,_=k,[4,g(k)])):[3,6];case 3:y[_]=a.sent(),a.label=4;case 4:i.clearRect(48*G[0][0],48*G[0][1],48,48),i.drawImage(d[k],48*G[1][0],48*G[1][1],48,48,48*G[0][0],48*G[0][1],48,48),a.label=5;case 5:return h++,[3,2];case 6:return w=p,C=[e],[4,v(i)];case 7:return w.apply(void 0,C.concat([a.sent()])),[2]}}))}))},relinkColumn:function(e,n,t,r){return void 0===r&&(r=!1),i(this,void 0,void 0,(function(){var i,o,s,c;return a(this,(function(a){switch(a.label){case 0:for(o in void 0===t&&(b[e]||(b[e]=0),t=b[e]++),i={},G)i[o]=[t,G[o][1]];for(o in Game.Tiers)i[Game.Tiers[o].name.toLowerCase()]=i[o.toString()]=[t,Game.Tiers[o].iconRow];return s=p,c=[e],[4,h(r?f(e):e,i,n,[48,48],[48*(t+1),48*(Object.values(i).reduce((function(e,n){return Math.max(e,n[1])}),-1/0)+1)],(function(n){return new Promise((function(t){if(f(e)!==e){var i=new Image;i.addEventListener("load",(function(){n.drawImage(i,0,0),t()})),i.src=f(e),i.crossOrigin="Anonymous"}else t()}))}))];case 1:return s.apply(void 0,c.concat([a.sent()])),[2]}}))}))},relinkRow:function(e,n,t,r){return void 0===r&&(r=!1),i(this,void 0,void 0,(function(){var i,o,s,c;return a(this,(function(a){switch(a.label){case 0:for(o in void 0===t&&(k[e]||(k[e]=0),t=k[e]++),i={},y)i[o]=[y[o][0],t];for(o in Game.ObjectsById)i[Game.ObjectsById[o].single.toLowerCase()]=i[o]=[Game.ObjectsById[o].iconColumn,t];return s=p,c=[e],[4,h(r?f(e):e,i,n,[48,48],[48*(Object.values(i).reduce((function(e,n){return Math.max(e,n[0])}),-1/0)+1),48*(t+1)],(function(n){return new Promise((function(t){if(f(e)!==e){var i=new Image;i.addEventListener("load",(function(){n.drawImage(i,0,0),t()})),i.src=f(e),i.crossOrigin="Anonymous"}else t()}))}))];case 1:return s.apply(void 0,c.concat([a.sent()])),[2]}}))}))},resolveAlias:f,resolveIcon:_,unalias:function(e){delete p[e]}},ke=!1,ye=new Proxy([],{set:function(e,n,t){return"function"==typeof t&&ke&&t(),e[n]=t,!0}});window.__INTERNAL_CPPKIES_HOOKS__?(ke=!0,ye.forEach((function(e){return e()}))):Game.UpdateMenu.toString().includes("Cppkies")?Game.Prompt('<h3>Hello!</h3>\n<div class="block">\nIt seems like you are trying to load Cppkies 0.3 or higher while having Cppkies 0.2 or less already loaded.<br/>\nSadly, due to internal changes, Cppkies 0.3 mods are incompatible with Cppkies 0.2 mods. <br/>\n(The mod will still be launched, but it may or may not work correctly)<br/>\n<small>((If you are a mod author, please update your mods to use Cppkies 0.3 or higher.))</small><br/>\n</div>',[["Ok","Game.ClosePrompt()"]]):new Promise((function(e){[new A("menu",(function(){Game.UpdateMenu=C(Game.UpdateMenu,null,'\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tswitch (Game.onMenu) {\n\t\t\t\t\t\tcase "prefs":\n\t\t\t\t\t\t\t__INTERNAL_CPPKIES_HOOKS__.basegame.emit("optionsMenu")\n\t\t\t\t\t\t\tbreak\n\t\t\t\t\t\tcase "stats":\n\t\t\t\t\t\t\t__INTERNAL_CPPKIES_HOOKS__.basegame.emit("statsMenu")\n\t\t\t\t\t\t\tbreak\n\t\t\t\t\t\tcase "log":\n\t\t\t\t\t\t\t__INTERNAL_CPPKIES_HOOKS__.basegame.emit("logMenu")\n\t\t\t\t\t\t\tbreak\n\t\t\t\t\t}\n\t\t\t\t\t__INTERNAL_CPPKIES_HOOKS__.basegame.emit("menu")\n\t\t\t\t\t',"after")})),new A("preSave",(function(){Game.WriteSave=C(Game.WriteSave,null,'\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\t__INTERNAL_CPPKIES_HOOKS__.basegame.emit("preSave")\n\t\t\t\t\t',"before")})),new A("postSave",(function(){Game.WriteSave=C(Game.WriteSave,"if (type==2 || type==3)",'\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\t__INTERNAL_CPPKIES_HOOKS__.basegame.emit("postSave")\n\t\t\t\t\t',"before")})),new A("reset",(function(){Game.Reset=C(Game.Reset,null,'\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\t__INTERNAL_CPPKIES_HOOKS__.basegame.constEmit("reset", hard)\n\t\t\t\t\t',"before")})),new A("reincarnate",(function(){Game.registerHook("reincarnate",(function(){return T.emit("reincarnate")}))})),new A("getIcon",(function(){Game.GetIcon=O(Game.GetIcon,[["return [col,Game.Tiers[tier].iconRow];",'// Cppkies Injection\n\t\t\t\t\treturn __INTERNAL_CPPKIES_HOOKS__.basegame.emit("getIcon", { icon: [col, Game.Tiers[tier].iconRow], tier: tier, type: type }).icon',"replace"],["col=18;",'else if (type === "Mouse") col = 11;',"after"]])})),new A("buildStore",(function(){Game.BuildStore=C(Game.BuildStore,null,';\n__INTERNAL_CPPKIES_HOOKS__.basegame.emit("buildStore")',"after")})),new A("grandmaPic",(function(){Game.Objects.Grandma.art.pic=C(Game.Objects.Grandma.art.pic,"return choose(list)+'.png'",'// Cppkies injection\n\t\t\t\t\tlist = __INTERNAL_CPPKIES_HOOKS__.basegame.emit("grandmaPic", list)\n\t\t\t\t\t',"before")})),new A("cps",(function(){Game.CalculateGains=O(Game.CalculateGains,[["var rawCookiesPs=Game.cookiesPs*mult;",'// Cppkies injection\n\t\t\t\t\tGame.cookiesPs = __INTERNAL_CPPKIES_HOOKS__.basegame.emit("rawCps", Game.cookiesPs);\n\t\t\t\t\tmult = __INTERNAL_CPPKIES_HOOKS__.basegame.emit("rawCpsMult", mult);\n',"before"],["Game.cookiesPs=Game.runModHookOnValue('cps',Game.cookiesPs);",'// Cppkies injection\n\t\t\t\t\t\tmult = __INTERNAL_CPPKIES_HOOKS__.basegame.emit("cpsMult", mult);\n',"before"]]),Game.registerHook("cps",(function(e){return T.emit("cps",e)}))})),new A("cursorFingerMult",(function(){Game.Objects.Cursor.cps=C(Game.Objects.Cursor.cps,"var mult=1;",'// Cppkies injection\nadd = __INTERNAL_CPPKIES_HOOKS__.basegame.emit("cursorFingerMult", add);\n',"before")})),new A("cpc",(function(){Game.mouseCps=O(Game.mouseCps,[["var num=0;",'// Cppkies injection\n\t\t\t\t\t\tadd = __INTERNAL_CPPKIES_HOOKS__.basegame.emit("cursorFingerMult", add);\n',"before"],["var out",'// Cppkies injection\n\t\t\t\t\t\tadd = __INTERNAL_CPPKIES_HOOKS__.basegame.emit("cpcAdd", add);\n',"before"]]),Game.registerHook("cookiesPerClick",(function(e){return T.emit("cpc",e)}))})),new A("buildingCps",(function(){Game.CalculateGains=C(Game.CalculateGains,"me.storedTotalCps=me.amount*me.storedCps;",'// Cppkies injection (internal, do not use)\nme.storedCps = __INTERNAL_CPPKIES_HOOKS__.basegame.emit("buildingCps", { building: i, cps: me.storedCps }).cps;\n',"before")})),new A("logic",(function(){Game.registerHook("logic",(function(){return T.emit("logic")}))})),new A("draw",(function(){Game.registerHook("draw",(function(){return T.emit("draw")}))})),new A("check",(function(){Game.registerHook("check",(function(){return T.emit("check")}))})),new A("ticker",(function(){Game.getNewTicker=C(Game.getNewTicker,"Game.TickerAge=Game.fps*10;",'// Cppkies injection\nlist = __INTERNAL_CPPKIES_HOOKS__.basegame.emit("ticker", list);\n',"before")})),new A("specialPic",(function(){Game.DrawSpecial=C(Game.DrawSpecial,"if (hovered || selected)",'// Cppkies injection\nconst override = __INTERNAL_CPPKIES_HOOKS__.basegame.emit("specialPic", {tab: Game.specialTabs[i], frame: frame, pic: pic})\npic = override.pic\nframe = override.frame;\n',"before"),Game.ToggleSpecialMenu=C(Game.ToggleSpecialMenu,"else {pic='dragon.png?v='+Game.version;frame=4;}",'// Cppkies injection\nconst override = __INTERNAL_CPPKIES_HOOKS__.basegame.emit("specialPic", {tab: Game.specialTab, frame: frame, pic: pic})\npic = override.pic\nframe = override.frame;\n',"after")}))].forEach((function(e){var n;return null===(n=e.func)||void 0===n?void 0:n.call(e)})),Game.Loader.Load=C(Game.Loader.Load,"img.src=this.domain","\n\t\t\t// Cppkies injection\n\t\t\timg.src = (assets[i].indexOf('http') !== -1 ? \"\" : this.domain)\n","replace"),Game.UpdateMenu=O(Game.UpdateMenu,[["url(img/'+milk.pic+'.png)","url(' + (milk.pic.indexOf('http') >= 0 ? milk.pic : 'img/'+milk.pic) + '.png)","replace"],["img/icons.png?v='+Game.version+'","' + (Game.Milks[i].iconLink ? Game.Milks[i].iconLink : 'img/icons.png?v='+Game.version) + '","replace"]]),Game.ToggleSpecialMenu=O(Game.ToggleSpecialMenu,[[">=5",'>=Game.dragonLevels.findIndex(val => val.name === "Krumblor, cookie hatchling")',"replace"],[">=25",'>=Game.dragonLevels.findIndex(val => val.action === "Train secondary aura<br><small>Lets you use two dragon auras simultaneously</small>") + 1',"replace"]]),Game.Objects.Cursor.buyFunction=C(Game.Objects.Cursor.buyFunction,"Game.Unlock('Octillion fingers');","\n \t\t\t// Cppkies injection\n\t\t\tfor(const i in this.tieredUpgrades) {\n\t\t\t\tif (isNaN(parseInt(i))) continue\n\t\t\t\tif (this.amount >= Game.Tiers[this.tieredUpgrades[i].tier].unlock - 50) this.tieredUpgrades[i].unlock()\n\t\t\t}\n","after"),Game.Object=C(Game.Object,"Game.ObjectsN++","\n// Cppkies injection\n__INTERNAL_CPPKIES_HOOKS__.hookAllBuildings();\n","after"),Game.CalculateGains=C(Game.CalculateGains,"var catMult=1;","// Cppkies injection\n\t\t\t__INTERNAL_CPPKIES_HOOKS__.hiddenMilkMult = milkMult;\n","before"),window.__INTERNAL_CPPKIES_HOOKS__={basegame:T,buildings:E,hiddenMilkMult:1,hookAllBuildings:N},e(T)})).then((function(){ke=!0,Game.Notify("Cppkies loaded!","",[32,17],1.5);var e=document.createElement("div");e.textContent="Cppkies!",document.querySelector("#topBar").insertBefore(e,document.querySelector("#topBar").children[1]),Game.modSaveData.cppkies||(Game.modSaveData.cppkies="{}"),Game.registerMod("cppkies",{save:V,load:W}),Game.Win("Third-party"),N(),ye.forEach((function(e){return e()})),window.CPPKIES_ONLOAD||(window.CPPKIES_ONLOAD=[]),window.CPPKIES_ONLOAD.forEach((function(e){return e()})),window.CPPKIES_ONLOAD=new Proxy([],{set:function(e,n,t){return"length"!==n&&t(),!0}})})),e.Achievement=se,e.BankAchievement=ue,e.Building=fe,e.CookieUpgrade=oe,e.CpsAchievement=le,e.CursorUpgrade=ne,e.DragonAura=ge,e.DragonAuraLevel=he,e.DragonLevel=ve,e.GrandmaSynergy=Q,e.HeavenlyUpgrade=J,e.KittenUpgrade=ae,e.Level10Achievement=me,e.Milk=be,e.MouseAchievement=de,e.MouseUpgrade=re,e.ProductionAchievement=pe,e.SynergyUpgrade=Z,e.TieredAchievement=ce,e.TieredUpgrade=z,e.Upgrade=$,e.buildingHooks=E,e.defaultCps=function(e){return Game.GetTieredCpsMult(e)*Game.magicCpS(e.name)*e.baseCps},e.defaultOnBuy=function(){Game.UnlockTiered(this),this.amount>=Game.SpecialGrandmaUnlock&&Game.Objects.Grandma.amount>0&&this.grandma&&Game.Unlock(this.grandma.name)},e.hooks=T,e.icons=Ge,e.isFortune=X,e.miscValues=o,e.onLoad=ye,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=index.js.map
