var t=function(){function t(){this._events={}}return t.prototype.on=function(t,e){this._events[t]?this._events[t].push(e):this._events[t]=[e]},t.prototype.once=function(t,e){var n=this;this.on(t,(function(o){return n.off(t,e),e(o)}))},t.prototype.off=function(t,e){this._events[t].splice(this._events[t].indexOf(e),1)},t.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var o=e[0];this._events[t]||(this._events[t]=[]);for(var s=0,i=this._events[t];s<i.length;s++){var r=i[s];o=r(o)}return o},t.prototype.constEmit=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];this._events[t]||(this._events[t]=[]);for(var o=0,s=this._events[t];o<s.length;o++){var i=s[o];i(e[0])}},t}();export{t as ReturnableEventEmitter};