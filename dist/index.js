(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):(a=a||self,a.Cppkies=b())})(this,function(){'use strict';var z=Math.max;function a(a){return a instanceof Function?a():a}function b(a){return a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}function c(c,d,e,f,g){void 0===g&&(g={});var h,j=c.toString(),k=null===d;k||(d=a(d),h="string"==typeof d?new RegExp(b(d),"g"):d),e=a(e);var l=/(\)[^{]*{)/,m=/(}?)$/;switch(k||h.test(j)||console.warn("Nothing to inject."),f){case"before":j=k?j.replace(l,"$1"+e):j.replace(h,""+e+d);break;case"replace":j=k?""+e:j.replace(h,""+e);break;case"after":j=k?j.replace(m,e+"$1"):j.replace(h,""+d+e);break;default:throw new Error("where Parameter must be \"before\", \"replace\" or \"after\"");}var n="";for(var o in g)n+="var "+o+" = globalThis.tempCtx."+o+"\n";globalThis.tempCtx=g;var i=new Function(n+"globalThis.tempCtx = null\nreturn ("+j+")")();return i.prototype=c.prototype,i}function d(a,b){for(var c in b)a[c]=b}function e(a){return a.charAt(0).toUpperCase()+a.slice(1).toLowerCase()}function f(){S.save=C={mods:{},foreign:F,saveVer:0,exists:!0}}function g(a){return C.foreign.buildings[a.name]||D}function h(a){var b=a.amount,c=a.bought,d=a.free,e=a.totalCookies,f=a.level,g=a.muted,h=a.minigameSave,i=a.name;C.foreign.buildings[i]={amount:b,bought:c,free:d,totalCookies:e,level:f,muted:g,minigameSave:h}}function j(a){return C.foreign.upgrades[a.name]||E}function k(a){C.foreign.upgrades[a.name]={unlocked:!!a.unlocked,bought:!!a.bought}}function l(){for(var a in S.customBuildings){var b=S.customBuildings[a];d(Game.Objects[b.name],g(b))}for(var a in S.customUpgrades){var b=S.customUpgrades[a];d(Game.Upgrades[b.name],j(b))}}function m(){for(var a in S.customBuildings)h(S.customBuildings[a]);for(var a in S.customUpgrades)k(S.customUpgrades[a])}function n(){return C}function o(a){try{S.save=C=JSON.parse(a),C.exists||f()}catch(a){f()}l()}function p(){return m(),JSON.stringify(C)}function q(a,c){function b(){this.constructor=a}G(a,c),a.prototype=null===c?Object.create(c):(b.prototype=c.prototype,new b)}function r(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})}function s(a,b){function c(a){return function(b){return d([a,b])}}function d(c){if(e)throw new TypeError("Generator is already executing.");for(;k;)try{if(e=1,h&&(i=2&c[0]?h["return"]:c[0]?h["throw"]||((i=h["return"])&&i.call(h),0):h.next)&&!(i=i.call(h,c[1])).done)return i;switch((h=0,i)&&(c=[2&c[0],i.value]),c[0]){case 0:case 1:i=c;break;case 4:return k.label++,{value:c[1],done:!1};case 5:k.label++,h=c[1],c=[0];continue;case 7:c=k.ops.pop(),k.trys.pop();continue;default:if((i=k.trys,!(i=0<i.length&&i[i.length-1]))&&(6===c[0]||2===c[0])){k=0;continue}if(3===c[0]&&(!i||c[1]>i[0]&&c[1]<i[3])){k.label=c[1];break}if(6===c[0]&&k.label<i[1]){k.label=i[1],i=c;break}if(i&&k.label<i[2]){k.label=i[2],k.ops.push(c);break}i[2]&&k.ops.pop(),k.trys.pop();continue;}c=b.call(a,k)}catch(a){c=[6,a],h=0}finally{e=i=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}var e,h,i,j,k={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return j={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(j[Symbol.iterator]=function(){return this}),j}function t(a,b){I[a]=b}function u(a){if(J.includes(a))throw new Error("Recursive alias");return(J.push(a),a in I)?u(I[a]):(J=[],a)}function v(a,b,c,d,e){return new Promise(function(f){c[0]instanceof Array||(c=[c]),c=c;var g={};for(var h in c)for(var i in c[h]){if(c[h][i]=c[h][i].toString().toLowerCase(),!(c[h][i]in b))throw new Error("Invalid icon name");g[c[h][i]]=[parseInt(i),parseInt(h)]}var j=document.createElement("canvas").getContext("2d"),k=new Image;k.src=a,k.crossOrigin="Anonymous",k.addEventListener("load",function(){for(var a in j.canvas.width=e[0],j.canvas.height=e[1],g)j.drawImage(k,g[a][0]*d[0],g[a][1]*d[1],d[0],d[1],b[a][0]*d[0],b[a][1]*d[1],d[0],d[1]);j.canvas.toBlob(function(a){f(URL.createObjectURL(a))})})})}function w(a){var b=[new B("tooltip",function(){a.tooltip=c(c(a.tooltip,"return","let ret = ","replace"),null,"\n//Cppkies injection\n\t\tfor(const i in Cppkies.buildingHooks[\""+a.name+"\"].tooltip) {\n\t\t\tconst tempRet = Cppkies.buildingHooks[\""+a.name+"\"].tooltip[i].call(this, ret)\n\t\t\tret = tempRet || ret\n\t\t}\n\t\treturn ret","after")})],d={};b.forEach(function(a){d[a.value]=a.defValue,a.func&&a.func()}),S.buildingHooks[a.name]=d}function x(a){return"fortune"===a.tier}function y(){S.hooks.customGetIcon.push(function(a,b,c){return S.customTiers.forEach(function(a){a.keyName===b.toString()&&a.iconLink&&(c[2]=a.iconLink)}),c},function(a,b,c){return S.customBuildings.forEach(function(b){b.name===a&&b.iconLink&&(c[2]=b.iconLink)}),c})}var A,B=function(){return function(a,b){this.value=a,this.func=b,this.defValue=[]}}(),C=null,D={amount:0,bought:0,free:0,totalCookies:0,level:0,muted:0,minigameSave:""},E={bought:!1,unlocked:!1},F={buildings:{},upgrades:{}},G=function(a,c){return G=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])},G(a,c)},H=function(){return H=Object.assign||function(a){for(var b,c=1,d=arguments.length;c<d;c++)for(var e in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,e)&&(a[e]=b[e]);return a},H.apply(this,arguments)},I={},J=[],K={"3d":[0,21],milestone1:[0,22],milestone2:[0,23],milestone3:[0,24],krumblor:[0,25],level1:[0,26],level2:[0,27]},L=function(a){function b(b,c,d,e,f,h,j,k,l,m){var n=this;0!==e[0]&&console.warn("All icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder"),0!==f[1]&&console.warn("All big icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder"),n=a.call(this,b,c,d,f[0],e[1],h,0,j,k)||this,S.customBuildings.push(n),w(n);var o=function(a){if(0>=parseInt(a))return"continue";var b=Game.ObjectsById[a];if(b.canvas=window.l("rowCanvas"+a),!b.canvas)return"continue";if(b.ctx=b.canvas.getContext("2d"),b.canvas.addEventListener("mouseover",function(){b.mouseOn=!0}),b.canvas.addEventListener("mouseout",function(){b.mouseOn=!1}),b.canvas.addEventListener("mousemove",function(a){var c=b.canvas.getBoundingClientRect();b.mousePos[0]=a.pageX-c.left,b.mousePos[1]=a.pageY-c.top}),b.minigame&&b.minigameLoaded){var c=b.minigame.save();b.minigame.launch(),b.minigame.load(c)}};for(var p in Game.ObjectsById)o(p);n.buildingLink=f[2]||S.buildingLink+"",n.iconLink=u(e[2]||S.iconLink+""),l&&(Game.foolObjects[b]=l),m&&(Game.goldenCookieBuildingBuffs[b]=m),n.iconLink&&S.buildingHooks[n.name].tooltip.push(function(a){return n.locked?a:a.replace("background-position","background-image:url("+n.iconLink+");background-position")}),Game.BuildStore(),n.buildingLink&&S.hooks.postBuildStore.push(function(){window.l("productIcon"+n.id).style.backgroundImage="url("+n.buildingLink+")",window.l("productIconOff"+n.id).style.backgroundImage="url("+n.buildingLink+")"}),Game.BuildStore(),n.canvas=window.l("rowCanvas"+n.id),n.ctx=n.canvas.getContext("2d"),n.pics=[];var q=document.createElement("div");q.className="tinyProductIcon",q.id="mutedProduct"+n.id,q.style.display="none",n.buildingLink&&(q.style.backgroundImage="url("+n.buildingLink+")"),q.style.backgroundPositionX="-"+e[0]+"px",q.style.backgroundPositionY="-"+e[1]+"px",q.addEventListener("click",function(){n.mute(0),window.PlaySound(n.muted?"snd/clickOff.mp3":"snd/clickOn.mp3")}),window.AddEvent(n.canvas,"mouseover",function(){n.mouseOn=!0}),window.AddEvent(n.canvas,"mouseout",function(){n.mouseOn=!1}),n.canvas.addEventListener("mousemove",function(a){var b=n.canvas.getBoundingClientRect();n.mousePos[0]=a.pageX-b.left,n.mousePos[1]=a.pageY-b.top}),window.l("buildingsMute").appendChild(q);var r=g(n);for(var p in r)n[p]=r[p];return Game.recalculateGains=1,n}return q(b,a),b}(Game.Object),M=function(a){function b(b,c,d,e,f){void 0===f&&(f=function(){});var g=this;e[2]||(e[2]=S.iconLink+""),e[2]=u(e[2]),g=a.call(this,b,"function"==typeof c?"":c,"function"==typeof d?0:d,"function"==typeof e?[0,0]:e,f)||this,"function"==typeof c&&(g.descFunc=c),"function"==typeof d&&(g.priceFunc=d),"function"==typeof e&&(g.iconFunction=e),S.customUpgrades.push(g);var h=j(g);for(var k in h)g[k]=h[k];return g}return q(b,a),b}(Game.Upgrade),N=function(a){function b(b,c,d,e,f,g,h){void 0===g&&(g=["Legacy"]),void 0===h&&(h=function(){});var i=a.call(this,b,c,d,e,h)||this;return i.pool="prestige",i.posX=f[0],i.posY=f[1],i.parents=g.map(function(a){return Game.Upgrades[a]||Game.UpgradesById[a]}),Game.PrestigeUpgrades.push(i),Game.UpgradePositions[i.id]=f,i}return q(b,a),b}(M),O=function(a){function b(b,c,d,f){var g=Math.min,h=this;return"string"==typeof d&&(d=Game.Objects[d]),h=a.call(this,b,e(d.plural)+" are <b>twice</b> as efficient.<q>"+c+"</q>",d.basePrice*Game.Tiers[f.toString()].price,Game.GetIcon(d.name,f))||this,Game.SetTier(d.name,f),h.buildingTie1=d,x(h)&&(d.fortune=h),"number"==typeof f&&(h.order=100*(d.id+1)+f),h.order-=75*z(0,g(d.id-4,3)),h}return q(b,a),b}(M),P=function(a){function b(b,c,d,f){var g=this;"string"==typeof d&&(d=Game.Objects[d]);var h=d.id-1;return 1===h?h="grandma":h+=" grandmas",g=a.call(this,b,"Grandmas are <b>twice</b> as efficient."+e(d.plural)+" gain <b>+1% CpS</b> per "+h+".<q>"+c+"</q>",d.basePrice*Game.Tiers[2].price,[10,9],Game.Objects.Grandma.redraw)||this,d.grandma=g,g.buildingTie=d,Game.GrandmaSynergies.push(g.name),f&&S.hooks.customGrandmaPic.push(function(){if(g.bought)return f}),g}return q(b,a),b}(M),Q=function(a){function b(b,c,d,f,g){var h=this;return"string"==typeof d&&(d=Game.Objects[d]),"string"==typeof f&&(f=Game.Objects[f]),c=e(d.plural)+" gain <b>+5% CpS</b> per "+f.name.toLowerCase()+".<br>"+e(f.plural)+" gain <b>+0.1% CpS</b> per \n\t\t\t"+d.name.toLowerCase()+".<q>"+c+"</q>",h=a.call(this,b,c,(10*d.basePrice+1*f.basePrice)*Game.Tiers[g].price,Game.GetIcon(d.name,g))||this,h.tier=g,h.buildingTie1=d,h.buildingTie2=f,d.synergies.push(h),f.synergies.push(h),h}return q(b,a),b}(M),R=function(){return function(a,b,c,d,e,f,g,h,i){void 0===d&&(d=!1),void 0===e&&(e="auto"),void 0===f&&(f=null),void 0===g&&(g=null),void 0===h&&(h=null),void 0===i&&(i="auto"),this.name=a,this.color=c,this.upgrades=[],this.special=d,null===f&&(this.unlock=-1),"number"==typeof f&&(this.unlock=f),(!1===d&&null===f||"auto"===f)&&(this.unlock=Game.Tiers[parseInt(this.keyName)-1].unlock+50),"number"==typeof g&&(this.achievUnlock=g),(!1===d&&null===g||"auto"===g)&&(this.achievUnlock=Game.Tiers[parseInt(this.keyName)-1].achievUnlock+50),h&&(this.req=h),this.price="auto"===e?1e8*Game.Tiers[Object.keys(Game.Tiers).filter(function(a){return!isNaN(parseInt(a))}).length.toString()].price:e,this.iconRow=b[1],b[2]&&(this.iconLink=b[2]),this.keyName="auto"===i?d?a:(Object.keys(Game.Tiers).filter(function(a){return!isNaN(parseInt(a))}).length+1).toString():i,Game.Tiers[this.keyName]=this,S.customTiers.push(this)}}(),S={hooks:null,iconLink:"",buildingLink:"",buildingHooks:{},buildingHooksById:[],customBuildings:[],customUpgrades:[],customTiers:[],save:n(),onLoad:[],Building:L,Upgrade:M,TieredUpgrade:O,Tier:R,HeavenlyUpgrade:N,GrandmaSynergy:P,SynergyUpgrade:Q,injectCode:c,DEFAULT_ONBUY:function(){Game.UnlockTiered(this),this.amount>=Game.SpecialGrandmaUnlock&&0<Game.Objects.Grandma.amount&&this.grandma&&Game.Unlock(this.grandma.name)},DEFAULT_CPS:function(a){return Game.GetTieredCpsMult(a)*Game.magicCpS(a.name)*a.baseCps},icons:{relinkColumn:function(a,b){return r(this,void 0,void 0,function(){var c,d,e,f;return s(this,function(g){switch(g.label){case 0:for(d in c=H({},K),Game.Tiers)c[Game.Tiers[d].name.toLowerCase()]=c[d.toString()]=[0,Game.Tiers[d].iconRow];return e=t,f=[a],[4,v(a,c,b,[48,48],[48,48*(Object.values(c).reduce(function(a,b){return z(a,b[1])},-Infinity)+1)])];case 1:return e.apply(void 0,f.concat([g.sent()])),[2];}})})},relinkRow:null}};window.Cppkies?A=window.Cppkies:(A=S,function(){return new Promise(function(a){var b={},d=[new B("customMenu",function(){Game.UpdateMenu=c(Game.UpdateMenu,null,"\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tswitch (Game.onMenu) {\n\t\t\t\t\t\tcase \"prefs\":\n\t\t\t\t\t\t\tfor(const i in Cppkies.hooks.customOptionsMenu) Cppkies.hooks.customOptionsMenu[i]()\n\t\t\t\t\t\t\tbreak\n\t\t\t\t\t\tcase \"stats\":\n\t\t\t\t\t\t\tfor(const i in Cppkies.hooks.customStatsMenu) Cppkies.hooks.customStatsMenu[i]()\n\t\t\t\t\t\t\tbreak\n\t\t\t\t\t\tcase \"log\":\n\t\t\t\t\t\t\tfor(const i in Cppkies.hooks.customInfoMenu) Cppkies.hooks.customInfoMenu[i]()\n\t\t\t\t\t\t\tbreak\n\t\t\t\t\t}\n\t\t\t\t\tfor(const i in Cppkies.hooks.customMenu) Cppkies.hooks.customMenu[i]()\n\t\t\t\t\t","before")}),new B("customOptionsMenu"),new B("customStatsMenu"),new B("customInfoMenu"),new B("customLoad",function(){Game.LoadSave=c(Game.LoadSave,"if (Game.prefs.showBackupWarning==1)","\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tfor(const i in Cppkies.hooks.customLoad) Cppkies.hooks.customLoad[i]()\n\t\t\t\t\t","before")}),new B("customReset",function(){Game.Reset=c(Game.Reset,null,"\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tfor(const i in Cppkies.hooks.customReset) Cppkies.hooks.customReset[i](hard)\n\t\t\t\t\t","before")}),new B("customGetIcon",function(){Game.GetIcon=c(Game.GetIcon,"return [col,Game.Tiers[tier].iconRow];","\n\t\t\t\t\t// Cppkies Injection\n\t\t\t\t\tlet icon = [col, Game.Tiers[tier].iconRow]\n\t\t\t\t\tfor(const i in Cppkies.hooks.customGetIcon) icon = Cppkies.hooks.customGetIcon[i](type, tier, icon) || icon\n\t\t\t\t\treturn icon\n","replace")}),new B("postBuildStore",function(){Game.BuildStore=c(Game.BuildStore,null,";\nfor(const i in Cppkies.hooks.postBuildStore) Cppkies.hooks.postBuildStore[i]()","after")}),new B("customGrandmaPic",function(){Game.Objects.Grandma.art.pic=c(Game.Objects.Grandma.art.pic,"return choose(list)+'.png'","// Cppkies injection\n\t\t\t\t\tlist = list.concat(Cppkies.hooks.customGrandmaPic.map(val=> val()).filter(val => val))\n\t\t\t\t\t","before")})];d.forEach(function(a){var c;b[a.value]=a.defValue,null===(c=a.func)||void 0===c?void 0:c.call(a)}),Game.Loader.Load=c(Game.Loader.Load,"img.src=this.domain","\n\t\t\t// Cppkies injection\n\t\t\timg.src = (assets[i].indexOf('http') !== -1 ? \"\" : this.domain)\n","replace"),Game.Objects.Cursor.buyFunction=c(Game.Objects.Cursor.buyFunction,"Game.Unlock('Octillion fingers');","\n \t\t\t// Cppkies injection\n\t\t\tfor(const i in this.tieredUpgrades) {\n\t\t\t\tif (isNaN(parseInt(i))) break\n\t\t\t\tif (this.amount >= Game.Tiers[this.tieredUpgrades[i].tier].unlock - 50) this.tieredUpgrades[i].unlock()\n\t\t\t}\n","after"),a(b)})}().then(function(a){A.hooks=a,Game.Notify("Cppkies loaded!","",[32,17]),Game.modSaveData.cppkies||(Game.modSaveData.cppkies="{}"),Game.registerMod("cppkies",{init:function(){},save:p,load:o}),Game.Win("Third-party"),S.onLoad.forEach(function(a){return a()}),S.onLoad=new Proxy(S.onLoad,{set:function(a,b,c){return"length"!==b&&c(),!0}}),window.CPPKIES_ONLOAD||(window.CPPKIES_ONLOAD=[]),window.CPPKIES_ONLOAD.forEach(function(a){return a()}),window.CPPKIES_ONLOAD=new Proxy(S.onLoad,{set:function(a,b,c){return"length"!==b&&c(),!0}}),y(),window.Cppkies=A}));var T=A;return T});
//# sourceMappingURL=index.js.map
