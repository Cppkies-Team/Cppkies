import"./_tslib-e6397ef4.js";export{miscValues}from"./vars.js";import{alias as e,aliases as r,extraColumnIcons as o,extraRowIcons as t,patchIconsheet as i,relinkColumn as n,relinkRow as s,resolveAlias as a,resolveIcon as m,unalias as p}from"./spritesheets.js";import"./helpers.js";import{exportSave as d,importSave as l}from"./saves.js";export{Achievement}from"./baseAchievement.js";export{BankAchievement,CpsAchievement}from"./cookieAchievements.js";import"./eventemitter.js";import"./generic.js";import{m as c,a as u}from"./buildings-304ebdb3.js";export{b as buildingHooks,h as hooks}from"./buildings-304ebdb3.js";export{TieredAchievement}from"./tieredAchievement.js";export{Level10Achievement}from"./level10Achievement.js";export{MouseAchievement}from"./mouseAchievement.js";export{ProductionAchievement}from"./productionAchievement.js";export{Building,DEFAULT_CPS,DEFAULT_ONBUY}from"./buildings.js";export{ccButton,ccHideableSection}from"./ccUI.js";export{DragonAura,DragonAuraLevel,DragonLevel}from"./dragon.js";export{Upgrade,isFortune}from"./baseUpgrade.js";export{HeavenlyUpgrade}from"./heavenlyUpgrade.js";export{TieredUpgrade}from"./tieredUpgrade.js";export{GrandmaSynergy}from"./grandmaSynergy.js";export{SynergyUpgrade}from"./synergyUpgrade.js";export{CursorUpgrade}from"./cursorUpgrade.js";export{KittenUpgrade}from"./kittenUpgrade.js";export{MouseUpgrade}from"./mouseUpgrade.js";export{CookieUpgrade}from"./cookieUpgrade.js";export{Milk}from"./milk.js";import"./tiers.js";export{Mod,currentMod}from"./mods.js";export{Button,MultiStateButton,ToggleBase,ToggleButton}from"./modUI.js";var g={alias:e,aliases:r,extraColumnIcons:o,extraRowIcons:t,patchIconsheet:i,relinkColumn:n,relinkRow:s,resolveAlias:a,resolveIcon:m,unalias:p},f=!1,v=new Proxy([],{set:function(e,r,o){return"function"==typeof o&&f&&o(),e[r]=o,!0}});window.__INTERNAL_CPPKIES_HOOKS__?(f=!0,v.forEach((function(e){return e()}))):Game.UpdateMenu.toString().includes("Cppkies")?Game.Prompt('<h3>Hello!</h3>\n<div class="block">\nIt seems like you are trying to load Cppkies 0.3 or higher while having Cppkies 0.2 or lower already loaded.<br/>\nSadly, due to internal changes, Cppkies 0.3 mods are incompatible with Cppkies 0.2 mods. <br/>\n(The mod will still be launched, but it may or may not work correctly)<br/>\n<small>((If you are a mod author, please update your mods to use Cppkies 0.3 or higher.))</small><br/>\n</div>',[["Ok","Game.ClosePrompt()"]]):c().then((function(){f=!0,Game.Notify("Cppkies loaded!","",[32,17],1.5);var e=document.createElement("div");e.textContent="Cppkies!",document.querySelector("#topBar").insertBefore(e,document.querySelector("#topBar").children[1]),Game.modSaveData.cppkies||(Game.modSaveData.cppkies="{}"),Game.registerMod("cppkies",{save:d,load:l}),Game.Win("Third-party"),u(),v.forEach((function(e){return e()})),window.CPPKIES_ONLOAD||(window.CPPKIES_ONLOAD=[]),window.CPPKIES_ONLOAD.forEach((function(e){return e()})),window.CPPKIES_ONLOAD=new Proxy([],{set:function(e,r,o){return"length"!==r&&o(),!0}})}));export{g as icons,v as onLoad};