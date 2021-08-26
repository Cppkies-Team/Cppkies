import"./tslib.es6-ac47674d.js";import{toSentenseCase as e}from"./helpers.js";var t=function(t,d,i,o,s,a){var n=this;if(this.icon=i,this.quote=s,this.slot=-1,!Game.Objects.Temple.minigameLoaded)throw new Error("The pantheon minigame has not loaded yet!");var r=Game.Objects.Temple.minigame;this.name=a||e(t)+", Spirit of "+e(d),o&&(o[1]&&(this.desc1=o[1]),o[2]&&(this.desc2=o[2]),o[3]&&(this.desc3=o[3]),o.before&&(this.descBefore=o.before),o.after&&(this.descAfter=o.after),o.active&&(this.activeDescFunc=o.active)),this.id=r.godsById.length,r.godsById.push(this),r.gods[d]=this;var l,m,c,p=document.createElement("div");p.classList.add("ready","templeGod","templeGod"+this.id%4,"titleFont"),p.id="templeGod"+this.id,l=p,m=r.godTooltip(this.id),c="this",l.addEventListener("mouseover",(function(){Game.tooltip.dynamic="function"==typeof m?1:0,Game.tooltip.draw(l,m,c),Game.tooltip.wobble()})),l.addEventListener("mouseout",(function(){return Game.tooltip.shouldHide=1}));var h=document.createElement("div");h.classList.add("usesIcon","shadowFilter","templeIcon"),h.style.backgroundPosition=48*-i[0]+"px "+48*-i[1]+"px",i[2]&&(h.style.backgroundImage="url("+i[2]+")"),p.appendChild(h);var u=document.createElement("div");u.classList.add("templeSlotDrag"),u.id="templeGodDrag"+this.id,u.addEventListener("mousedown",(function(e){0===e.button&&r.dragGod(n)})),u.addEventListener("mouseup",(function(e){0===e.button&&r.dropGod()})),p.appendChild(u);var v=document.createElement("div");v.classList.add("templeGodPlaceholder"),v.id="templeGodPlaceholder"+this.id;var f=document.querySelector("#templeGods");f&&(f.appendChild(p),f.appendChild(v))};export{t as Spirit};
