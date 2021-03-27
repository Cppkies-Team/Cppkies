import{c as e}from"./tslib.es6-9a9d7607.js";import"./vars.js";import"./spritesheets.js";import"./helpers.js";import"./lz-string.js";import"./saves.js";import"./eventemitter.js";import"./generic.js";import{h as r,b as s}from"./buildings-2e5b77fa.js";import{Upgrade as t}from"./baseUpgrade.js";var i=[5,7,8,9,10],o=function(t){function o(e,o,a,n){void 0===n&&(n=20);var m=this,p=Game.Objects.Cursor,u=parseInt(a.toString());return(m=t.call(this,e,"Multiplies the gain from Thousand fingers by <b>"+n+"</b>.<q>"+o+"</q>",Game.Tiers[a].special||isNaN(u)?p.basePrice*Game.Tiers[a].price:Math.pow(10,i[Math.min(u-4,i.length-1)]+3*Math.max(u-8,0)),Game.GetIcon(p.name,a))||this).tier=a,m.pool="",m.order=100+m.id/1e3,r.on("cursorFingerMult",(function(e){return m.bought?e*n:e})),Game.Tiers[a].special||isNaN(u)||s.Cursor.on("buy",(function(){p.amount>=(4===u?25:50*(u-4))&&Game.Unlock(m.name)})),"fortune"===a&&Game.Tiers[a].upgrades.push(m),Game.Objects.Cursor.buyFunction.apply(Game.Objects.Cursor),m}return e(o,t),o}(t);export{o as CursorUpgrade};
