(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):(a=a||self,a.Cppkies=b())})(this,function(){'use strict';function a(a){return a instanceof Function?a():a}function b(a){return a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}function c(c,d,e,f){var g,h=c.toString(),i=null===d;i||(d=a(d),g="string"==typeof d?new RegExp(b(d),"g"):d),e=a(e);var j=/(\)[^{]*{)/,k=/(}?)$/;switch(i||g.test(h)||console.warn("Nothing to inject."),f){case"before":h=i?h.replace(j,"$1"+e):h.replace(g,""+e+d);break;case"replace":h=i?""+e:h.replace(g,""+e);break;case"after":h=i?h.replace(k,e+"$1"):h.replace(g,""+d+e);break;default:throw new Error("where Parameter must be \"before\", \"replace\" or \"after\"");}var l=new Function("return ("+h+")")();return l.prototype=c.prototype,l}function d(a,c){function b(){this.constructor=a}m(a,c),a.prototype=null===c?Object.create(c):(b.prototype=c.prototype,new b)}function e(a){return n.save.foreign.buildings[a.name]||o}function f(a){var b=a.amount,c=a.bought,d=a.free,e=a.totalCookies,f=a.level,g=a.muted,h=a.minigameSave,i=a.name;n.save.foreign.buildings[i]={amount:b,bought:c,free:d,totalCookies:e,level:f,muted:g,minigameSave:h}}function g(a){return n.save.foreign.upgrades[a.name]||p}function h(a){n.save.foreign.upgrades[a.name]={unlocked:a.unlocked,bought:a.bought}}function j(a){var b=[new l("tooltip",function(){a.tooltip=c(c(a.tooltip,"return","let ret = ","replace"),null,"\n//Cppkies injection\n\t\tfor(const i in Cppkies.buildingHooks[\""+a.name+"\"].tooltip) {\n\t\t\tconst tempRet = Cppkies.buildingHooks[\""+a.name+"\"].tooltip[i].call(this, ret)\n\t\t\tret = tempRet || ret\n\t\t}\n\t\treturn ret","after")})],d={};b.forEach(function(a){d[a.value]=a.defValue,a.func&&a.func()}),n.buildingHooks[a.name]=d}function k(){n.hooks.customGetIcon.push(function(a,b,c){return n.customTiers.forEach(function(a){a.keyName===b.toString()&&a.iconLink&&(c[2]=a.iconLink)}),c})}var l=function(){return function(a,b){this.value=a,this.func=b,this.defValue=[]}}(),m=function(a,c){return m=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])},m(a,c)},n={hooks:{},iconLink:"",buildingLink:"",buildingHooks:{},buildingHooksById:[],customBuildings:[],customUpgrades:[],customTiers:[],save:null,onLoad:[],Building:null,Upgrade:null,TieredUpgrade:null,Tier:null,HeavenlyUpgrade:null,injectCode:null,DEFAULT_ONBUY:null,DEFAULT_CPS:null},o={amount:0,bought:0,free:0,totalCookies:0,level:0,muted:0,minigameSave:""},p={bought:!1,unlocked:!1},q={buildings:{},upgrades:{}},r=function(a){function b(b,c,d,f,g,h,k,l,m,o){var p=this;0!==f[0]&&console.warn("All icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder"),0!==g[1]&&console.warn("All big icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder"),p=a.call(this,b,c,d,g[0],f[1],h,0,k,l)||this,n.customBuildings.push(p),j(p);var q=function(a){if(0>=parseInt(a))return"continue";var b=window.Game.ObjectsById[a];if(b.canvas=window.l("rowCanvas"+a),b.ctx=b.canvas.getContext("2d"),window.AddEvent(b.canvas,"mouseover",function(){b.mouseOn=!0}),window.AddEvent(b.canvas,"mouseout",function(){b.mouseOn=!1}),window.AddEvent(b.canvas,"mousemove",function(a){var c=b.canvas.getBoundingClientRect();b.mousePos[0]=a.pageX-c.left,b.mousePos[1]=a.pageY-c.top}),b.minigame&&b.minigameLoaded){var c=b.minigame.save();b.minigame.launch(),b.minigame.load(c)}};for(var r in window.Game.ObjectsById)q(r);p.buildingLink=g[2]||n.buildingLink+"",p.iconLink=f[2]||n.iconLink+"",m&&(window.Game.foolObjects[b]=m),o&&(window.Game.goldenCookieBuildingBuffs[b]=o),p.iconLink&&n.buildingHooks[p.name].tooltip.push(function(a){return p.locked?a:a.replace("background-position","background-image:url("+p.iconLink+");background-position")}),window.Game.BuildStore(),p.buildingLink&&n.hooks.postBuildStore.push(function(){window.l("productIcon"+p.id).style.backgroundImage="url("+p.buildingLink+")",window.l("productIconOff"+p.id).style.backgroundImage="url("+p.buildingLink+")"}),window.Game.BuildStore(),p.canvas=window.l("rowCanvas"+p.id),p.ctx=p.canvas.getContext("2d"),p.context=p.ctx,p.pics=[];var s=document.createElement("div");s.className="tinyProductIcon",s.id="mutedProduct"+p.id,s.style.display="none",p.buildingLink&&(s.style.backgroundImage="url("+p.buildingLink+")"),s.style.backgroundPositionX="-"+f[0]+"px",s.style.backgroundPositionY="-"+f[1]+"px",s.addEventListener("click",function(){p.mute(0),window.PlaySound(p.muted?"snd/clickOff.mp3":"snd/clickOn.mp3")}),window.AddEvent(p.canvas,"mouseover",function(){p.mouseOn=!0}),window.AddEvent(p.canvas,"mouseout",function(){p.mouseOn=!1}),window.AddEvent(p.canvas,"mousemove",function(a){var b=p.canvas.getBoundingClientRect();p.mousePos[0]=a.pageX-b.left,p.mousePos[1]=a.pageY-b.top}),window.l("buildingsMute").appendChild(s);var t=e(p);for(var r in t)p[r]=t[r];return window.Game.recalculateGains=1,p}return d(b,a),b}(window.Game.Object),s=function(a){function b(b,c,d,e,f){void 0===f&&(f=function(){});var h=this;e[2]||(e[2]=n.iconLink+""),h=a.call(this,b,"function"==typeof c?"":c,"function"==typeof d?0:d,"function"==typeof e?[0,0]:e,f)||this,"function"==typeof c&&(h.descFunc=c),"function"==typeof d&&(h.priceFunc=d),"function"==typeof e&&(h.iconFunction=e),n.customUpgrades.push(h);var j=g(h);for(var k in j)h[k]=j[k];return h}return d(b,a),b}(window.Game.Upgrade),t=function(a){function b(b,c,d,e,f,g,h){void 0===g&&(g=["Legacy"]),void 0===h&&(h=function(){});var j=a.call(this,b,c,d,e,h)||this;for(var k in j.parents=g,j.pool="prestige",j.posX=f[0],j.posY=f[1],j.parents){var i=j.parents[k];j.parents[k]=window.Game.Upgrades[i]||window.Game.UpgradesById[i]}return window.Game.PrestigeUpgrades.push(j),window.Game.UpgradePositions[j.id]=f,j}return d(b,a),b}(s),u=function(a){function b(b,c,d,e){var f=Math.max,g=Math.min,h=a.call(this,b,c,window.Game.Objects[d].basePrice*window.Game.Tiers[e].price,window.Game.GetIcon(d,e))||this;return window.Game.SetTier(d,e),h.buildingTie1=window.Game.Objects[d],"fortune"===e&&(window.Game.Objects[d].fortune=h),"number"==typeof e&&(h.order=100*(window.Game.Objects[d].id+1)+e),h.order-=75*f(0,g(window.Game.Objects[d].id-4,3)),h}return d(b,a),b}(s),v={PATH_SEPARATOR:".",TARGET:Symbol("target"),UNSUBSCRIBE:Symbol("unsubscribe")},w=Array.isArray,x=a=>"symbol"==typeof a;const{PATH_SEPARATOR:y}=v;var z={after:(a,b)=>w(a)?a.slice(b.length):""===b?a:a.slice(b.length+1),concat:(a,b)=>w(a)?(a=a.slice(),b&&a.push(b),a):b&&void 0!==b.toString?(""!==a&&(a+=y),x(b)?a+"Symbol("+b.description+")":a+b):a,initial:a=>{if(w(a))return a.slice(0,-1);if(""===a)return a;const b=a.lastIndexOf(y);return-1===b?"":a.slice(0,b)},walk:(a,b)=>{if(w(a))a.forEach(b);else if(""!==a){let c=0,d=a.indexOf(y);if(-1===d)b(a);else for(;c<a.length;)-1===d&&(d=a.length),b(a.slice(c,d)),c=d+1,d=a.indexOf(y,c)}}};const{TARGET:A,UNSUBSCRIBE:B}=v,C=a=>null===a||"object"!=typeof a&&"function"!=typeof a,D=a=>a instanceof RegExp||a instanceof Number,E=a=>a instanceof Date,F=(c,a)=>void 0!==c&&void 0!==a&&Object.is(c.value,a.value)&&(c.writable||!1)===(a.writable||!1)&&(c.enumerable||!1)===(a.enumerable||!1)&&(c.configurable||!1)===(a.configurable||!1),G=a=>w(a)?a.slice():{...a},H=(a,b,c={})=>{const d=Symbol("ProxyTarget");let e,f,g=!1,h=!1,i=!1;const j=c.equals||Object.is;let k=new WeakMap,l=new WeakMap,m=new WeakMap;const n=(a,c,d,j)=>{if(!i){if(!g)return void b(z.concat(a,c),j,d);if(g&&f&&void 0!==d&&void 0!==j&&"length"!==c){let b=f;a!==e&&(a=z.after(a,e),z.walk(a,a=>{b[a]=G(b[a]),b=b[a]})),b[c]=d}h=!0}},o=(a,b)=>{let c=null!==k&&k.get(a);if(c&&(c=c.get(b)),c)return c;c=new Map,k.set(a,c);let d=c.get(b);return d||(d=Reflect.getOwnPropertyDescriptor(a,b),c.set(b,d)),d},p=(a,b)=>{const c=k?k.get(a):void 0;c&&c.delete(b)},q=(a,b)=>{if(i)return a;l.set(a,b);let c=m.get(a);return void 0===c&&(c=new Proxy(a,t),m.set(a,c)),c},r=a=>(i=!0,k=null,l=null,m=null,a),s=a=>i||!0===c.ignoreSymbols&&x(a)||!0===c.ignoreUnderscores&&"_"===a.charAt(0)||void 0!==c.ignoreKeys&&c.ignoreKeys.includes(a),t={get(a,b,e){if(b===d||b===A)return a;if(b===B&&null!==l&&""===l.get(a))return r(a);const f=Reflect.get(a,b,e);if(C(f)||D(f)||"constructor"===b||!0===c.isShallow||s(b))return f;const g=o(a,b);if(g&&!g.configurable){if(g.set&&!g.get)return;if(!1===g.writable)return f}return q(f,z.concat(l.get(a),b))},set(a,b,c,e){c&&void 0!==c[d]&&(c=c[d]);const f=s(b),g=f?null:Reflect.get(a,b,e),h=!(b in a)||!j(g,c);let i=!0;return h&&(i=Reflect.set(a[d]||a,b,c),!f&&i&&n(l.get(a),b,g,c)),i},defineProperty(a,b,c){let d=!0;return F(c,o(a,b))||(d=Reflect.defineProperty(a,b,c),d&&!s(b)&&!F()&&(p(a,b),n(l.get(a),b,void 0,c.value))),d},deleteProperty(a,b){if(!Reflect.has(a,b))return!0;const c=s(b),d=c?null:Reflect.get(a,b),e=Reflect.deleteProperty(a,b);return!c&&e&&(p(a,b),n(l.get(a),b,d)),e},apply(a,b,c){const i=E(b);if(i&&(b=b[d]),!g){g=!0,i&&(f=b.valueOf()),(w(b)||"[object Object]"===toString.call(b))&&(f=G(b[d])),e=z.initial(l.get(a));const k=Reflect.apply(a,b,c);return g=!1,(h||i&&!j(f,b.valueOf()))&&(n(e,"",f,b[d]||b),f=null,h=!1),k}return Reflect.apply(a,b,c)}},u=q(a,!0===c.pathAsArray?[]:"");return b=b.bind(u),u};H.target=a=>a[A]||a,H.unsubscribe=a=>a[B]||a;var I,J=function(){function a(a){var b=this;this.name=a,this.updateValues(a),this.store||(this.store={}),this.store=H(this.store,function(){b.writeValues()})}return a.prototype.updateValues=function(a){this.store=JSON.parse(localStorage.getItem(a))},a.prototype.writeValues=function(){localStorage.setItem(this.name,JSON.stringify(this.store))},a}(),K=function(){return function(a,b,c,d,e,f,g,h,i){void 0===d&&(d=!1),void 0===e&&(e="auto"),void 0===f&&(f=null),void 0===g&&(g=null),void 0===h&&(h=null),void 0===i&&(i="auto"),this.name=a,this.color=c,this.price=e,this.unlock=f,this.keyName=i,this.upgrades=[],this.special=d,null===f&&(this.unlock=-1),"number"==typeof g&&(this.achievUnlock=g),h&&(this.req=h),"auto"===e&&(this.price=1e8*window.Game.Tiers[Object.keys(window.Game.Tiers).filter(function(a){return!isNaN(parseInt(a))}).length.toString()].price),this.iconRow=b[1],b[2]&&(this.iconLink=b[2]),"auto"===i&&(d?this.keyName=a:this.keyName=(Object.keys(window.Game.Tiers).filter(function(a){return!isNaN(parseInt(a))}).length+1).toString()),(!1===d&&null===f||"auto"===f)&&(this.unlock=window.Game.Tiers[parseInt(this.keyName)-1].unlock+50),(!1===d&&null===g||"auto"===g)&&(this.achievUnlock=window.Game.Tiers[parseInt(this.keyName)-1].achievUnlock+50),window.Game.Tiers[this.keyName]=this,n.customTiers.push(this)}}();window.Cppkies?I=window.Cppkies:(I=n,I.Building=r,I.Upgrade=s,I.HeavenlyUpgrade=t,I.TieredUpgrade=u,I.Tier=K,I.injectCode=c,I.DEFAULT_CPS=function(a){return window.Game.GetTieredCpsMult(a)*window.Game.magicCpS(a.name)*a.baseCps},I.DEFAULT_ONBUY=function(){window.Game.UnlockTiered(this),this.amount>=window.Game.SpecialGrandmaUnlock&&0<window.Game.Objects.Grandma.amount&&this.grandma&&window.Game.Unlock(this.grandma.name)},n.save=new J("cppkiesSave").store,!n.save.exists&&function(){n.save.mods={},n.save.foreign=q,n.save.saveVer=0,n.save.exists=!0}(),window.Game.customSave.push(function(){for(var a in n.customBuildings)f(n.customBuildings[a]);for(var a in n.customUpgrades)h(n.customUpgrades[a])}),function(){return new Promise(function(a){var b={},d=[new l("customMenu",function(){window.Game.UpdateMenu=c(window.Game.UpdateMenu,null,"\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tswitch (Game.onMenu) {\n\t\t\t\t\t\tcase \"prefs\":\n\t\t\t\t\t\t\tfor(const i in Cppkies.hooks.customOptionsMenu) Cppkies.hooks.customOptionsMenu[i]()\n\t\t\t\t\t\t\tbreak\n\t\t\t\t\t\tcase \"stats\":\n\t\t\t\t\t\t\tfor(const i in Cppkies.hooks.customStatsMenu) Cppkies.hooks.customStatsMenu[i]()\n\t\t\t\t\t\t\tbreak\n\t\t\t\t\t\tcase \"log\":\n\t\t\t\t\t\t\tfor(const i in Cppkies.hooks.customInfoMenu) Cppkies.hooks.customInfoMenu[i]()\n\t\t\t\t\t\t\tbreak\n\t\t\t\t\t}\n\t\t\t\t\tfor(const i in Cppkies.hooks.customMenu) Cppkies.hooks.customMenu[i]()\n\t\t\t\t\t","before")}),new l("customOptionsMenu"),new l("customStatsMenu"),new l("customInfoMenu"),new l("customLoad",function(){window.Game.LoadSave=c(window.Game.LoadSave,"if (Game.prefs.showBackupWarning==1)","\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tfor(const i in Cppkies.hooks.customLoad) Cppkies.hooks.customLoad[i]()\n\t\t\t\t\t","before")}),new l("customReset",function(){window.Game.Reset=c(window.Game.Reset,null,"\n\t\t\t\t\t// Cppkies injection\n\t\t\t\t\tfor(const i in Cppkies.hooks.customReset) Cppkies.hooks.customReset[i](hard)\n\t\t\t\t\t","before")}),new l("customGetIcon",function(){window.Game.GetIcon=c(window.Game.GetIcon,"return [col,Game.Tiers[tier].iconRow];","\n\t\t\t\t\tlet icon = [col, Game.Tiers[tier].iconRow]\n\t\t\t\t\t// Cppkies Injection\n\t\t\t\t\tfor(const i in Cppkies.hooks.customGetIcon) icon = Cppkies.hooks.customGetIcon[i](type, tier, icon) || icon\n\t\t\t\t\treturn icon\n","replace")}),new l("postBuildStore",function(){window.Game.BuildStore=c(window.Game.BuildStore,null,";\nfor(const i in Cppkies.hooks.postBuildStore) Cppkies.hooks.postBuildStore[i]()","after")}),new l("customGrandmaPic",function(){window.Game.Objects.Grandma.art.pic=c(window.Game.Objects.Grandma.art.pic,"return choose(list)+'.png'","// Cppkies injection\n\t\t\t\t\tlist = list.concat(Cppkies.hooks.customGrandmaPic.map(val=> val() || null).filter(val=>val !== null))\n\t\t\t\t\t","before")})];d.forEach(function(a){var c,d;b[a.value]=a.defValue,null===(d=(c=a).func)||void 0===d?void 0:d.call(c)}),window.Game.Loader.Load=c(window.Game.Loader.Load,"img.src=this.domain","\n\t\t\t// Cppkies injection\n\t\t\timg.src = (assets[i].indexOf('http') !== -1 ? \"\" : this.domain)\n","replace"),window.Game.Objects.Cursor.buyFunction=c(window.Game.Objects.Cursor.buyFunction,"Game.Unlock('Octillion fingers');","\n \t\t\t// Cppkies injection\n\t\t\tdebugger\n\t\t\tfor(const i in this.tieredUpgrades) {\n\t\t\t\tif (isNaN(parseInt(i))) break\n\t\t\t\tif (this.amount >= window.Game.Tiers[this.tieredUpgrades[i].tier].unlock - 50) this.tieredUpgrades[i].unlock()\n\t\t\t}\n","after"),a(b)})}().then(function(a){I.hooks=a,window.Game.Notify("Cppkies loaded!","",[32,17]),window.Game.Win("Third-party"),n.onLoad.forEach(function(a){return a()}),n.onLoad=new Proxy(n.onLoad,{set:function(a,b,c){return"length"!==b&&c(),!0}}),k(),window.Cppkies=I}));var L=I;return L});
//# sourceMappingURL=index.js.map
