var n=!1;function r(){n=!0}var t,e=new Proxy([],{set:function(r,t,e){return"function"==typeof e&&n?e():r[t]=e,!0}}),o=new Promise((function(n){return t=n}));export{o as deffer,t as defferResolve,e as onLoad,r as setLoaded};
