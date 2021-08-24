import{c as n}from"./tslib.es6-ac47674d.js";import{customBuildings as e,setUnitOwner as o,miscValues as i}from"./vars.js";import{resolveAlias as t}from"./spritesheets.js";import"./helpers.js";import"./lz-string.js";import{loadBuilding as a}from"./saves.js";import{shouldRunVersioned as s}from"./generic.js";import"./eventemitter.js";import{buildingHooks as r,createBuildingHooks as c}from"./buildings.js";import m from"./basegame.js";var u=function(s){function u(n,u,d,g,p,v,f,b,k,G){var L,h,j=this;if(Game.Objects[n])throw new Error("Can't create building, \""+n+'" is already used as a building name');0!==g[1]&&console.warn("All icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder?id=relink-column"),0!==p[0]&&console.warn("All big icon sheets must follow an order, see https://cppkies.js.org/#/CommonProblems#IconOrder?id=big-icons"),j=s.call(this,n,u,d,p[1],g[0],v,0,f,b)||this,o(j),e.push(j),r[n]||c(j);var y=function(n){if(parseInt(n)<=0)return"continue";var e=Game.ObjectsById[n];if(e.canvas=l("rowCanvas"+n),!e.canvas)return"continue";if(e.ctx=e.canvas.getContext("2d"),e.canvas.addEventListener("mouseover",(function(){e.mouseOn=!0})),e.canvas.addEventListener("mouseout",(function(){e.mouseOn=!1})),e.canvas.addEventListener("mousemove",(function(n){var o=e.canvas.getBoundingClientRect();e.mousePos[0]=n.pageX-o.left,e.mousePos[1]=n.pageY-o.top})),e.minigame&&e.minigameLoaded){var o=e.minigame.save();e.minigame.launch(),e.minigame.load(o)}};for(var I in Game.ObjectsById)y(I);j.buildingLink=null!==(L=p[2])&&void 0!==L?L:i.buildingLink,j.iconLink=t(null!==(h=g[2])&&void 0!==h?h:i.iconLink),k&&(Game.foolObjects[n]=k),G&&(Game.goldenCookieBuildingBuffs[n]=G),j.iconLink&&r[j.name].on("tooltip",(function(n){return j.locked?n:n.replace("background-position","background-image:url("+j.iconLink+");background-position")})),Game.BuildStore(),j.buildingLink&&m.on("buildStore",(function(){var n=document.getElementById("productIcon"+j.id),e=document.getElementById("productIconOff"+j.id);n&&e&&(n.style.backgroundImage="url("+j.buildingLink+")",e.style.backgroundImage="url("+j.buildingLink+")")})),Game.BuildStore(),j.canvas=l("rowCanvas"+j.id),j.ctx=j.canvas.getContext("2d"),j.pics=[];var O=document.createElement("div");O.className="tinyProductIcon",O.id="mutedProduct"+j.id,O.style.display="none",j.buildingLink&&(O.style.backgroundImage="url("+j.buildingLink+")"),O.style.backgroundPositionX="-"+g[0]+"px",O.style.backgroundPositionY="-"+g[1]+"px",O.addEventListener("click",(function(){j.mute(0),window.PlaySound(j.muted?"snd/clickOff.mp3":"snd/clickOn.mp3")})),window.AddEvent(j.canvas,"mouseover",(function(){j.mouseOn=!0})),window.AddEvent(j.canvas,"mouseout",(function(){j.mouseOn=!1})),j.canvas.addEventListener("mousemove",(function(n){var e=j.canvas.getBoundingClientRect();j.mousePos[0]=n.pageX-e.left,j.mousePos[1]=n.pageY-e.top}));var w=document.getElementById("buildingsMute");w&&w.appendChild(O);var C=a(j);for(var I in C)j[I]=C[I];return Game.recalculateGains=1,j}return n(u,s),u}(Game.Object),d=function(n){return Game.GetTieredCpsMult(n)*Game.magicCpS(n.name)*n.baseCps},g=function(){Game.UnlockTiered(this),this.amount>=Game.SpecialGrandmaUnlock&&Game.Objects.Grandma.amount>0&&this.grandma&&Game.Unlock(this.grandma.name)};s(1)&&m.on("getIcon",(function(n){var o=n.icon,i=n.type,t=n.tier;return e.forEach((function(n){n.name===i&&n.iconLink&&(o[2]=n.iconLink)})),{icon:o,tier:t,type:i}}));export{u as Building,d as DEFAULT_CPS,g as DEFAULT_ONBUY};
