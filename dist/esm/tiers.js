import"./_tslib-e6397ef4.js";import{customTiers as i,miscValues as e}from"./vars.js";import{resolveAlias as t}from"./spritesheets.js";import"./helpers.js";import"./eventemitter.js";import"./generic.js";import{h as n}from"./buildings-304ebdb3.js";var o=function(n,o,r,s,a,c,l,u,h){var m;void 0===s&&(s=!1),void 0===a&&(a="auto"),void 0===c&&(c=null),void 0===l&&(l=null),void 0===u&&(u=null),void 0===h&&(h="auto"),this.name=n,this.color=r,this.special=s,this.keyName="auto"===h?s?n:(Object.keys(Game.Tiers).filter((function(i){return!isNaN(parseInt(i))})).length+1).toString():h,null===c&&(this.unlock=-1),"number"==typeof c&&(this.unlock=c),(!1===s&&null===c||"auto"===c)&&(this.unlock=Game.Tiers[parseInt(this.keyName)-1].unlock+50),"number"==typeof l&&(this.achievUnlock=l),(!1===s&&null===l||"auto"===l)&&(this.achievUnlock=Game.Tiers[parseInt(this.keyName)-1].achievUnlock+50),u&&(this.req=u),this.price="auto"===a?1e8*Game.Tiers[Object.keys(Game.Tiers).filter((function(i){return!isNaN(parseInt(i))})).length.toString()].price:a,this.iconRow=o[1],this.iconLink=t(null!==(m=o[2])&&void 0!==m?m:e.iconLink),Game.Tiers[this.keyName]=this,i.push(this)};n.on("getIcon",(function(e){var t=e.icon,n=e.type,o=e.tier;return i.forEach((function(i){i.keyName===o.toString()&&i.iconLink&&(t[2]=i.iconLink)})),{icon:t,type:n,tier:o}})),n.on("getIcon",(function(i){var e=i.icon,t=i.type,n=i.tier;return(void 0===e[2]||null===e[2])&&Game.Tiers[n.toString()]instanceof o&&(e[2]=""),{icon:e,tier:n,type:t}}));export default o;