var o=String.fromCharCode,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={};function e(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var i=function(o){if(null==o)return"";var n=d(o,6,(function(o){return r.charAt(o)}));switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},a=function(o){return null==o?"":""==o?null:w(o.length,32,(function(n){return e(r,o.charAt(n))}))},s=function(r){return null==r?"":d(r,15,(function(r){return o(r+32)}))+" "},u=function(o){return null==o?"":""==o?null:w(o.length,16384,(function(r){return o.charCodeAt(r)-32}))},p=function(o){for(var r=f(o),n=new Uint8Array(2*r.length),t=0,e=r.length;t<e;t++){var i=r.charCodeAt(t);n[2*t]=i>>>8,n[2*t+1]=i%256}return n},c=function(r){if(null==r)return v(r);for(var n=new Array(r.length/2),t=0,e=n.length;t<e;t++)n[t]=256*r[2*t]+r[2*t+1];var i=[];return n.forEach((function(r){i.push(o(r))})),v(i.join(""))},l=function(o){return null==o?"":d(o,6,(function(o){return n.charAt(o)}))},h=function(o){return null==o?"":""==o?null:(o=o.replace(/ /g,"+"),w(o.length,32,(function(r){return e(n,o.charAt(r))})))},f=function(r){return d(r,16,(function(r){return o(r)}))},d=function(o,r,n){if(null==o)return"";var t,e,i,a={},s={},u="",p="",c="",l=2,h=3,f=2,d=[],v=0,w=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(a,u)||(a[u]=h++,s[u]=!0),p=c+u,Object.prototype.hasOwnProperty.call(a,p))c=p;else{if(Object.prototype.hasOwnProperty.call(s,c)){if(c.charCodeAt(0)<256){for(t=0;t<f;t++)v<<=1,w==r-1?(w=0,d.push(n(v)),v=0):w++;for(e=c.charCodeAt(0),t=0;t<8;t++)v=v<<1|1&e,w==r-1?(w=0,d.push(n(v)),v=0):w++,e>>=1}else{for(e=1,t=0;t<f;t++)v=v<<1|e,w==r-1?(w=0,d.push(n(v)),v=0):w++,e=0;for(e=c.charCodeAt(0),t=0;t<16;t++)v=v<<1|1&e,w==r-1?(w=0,d.push(n(v)),v=0):w++,e>>=1}0==--l&&(l=Math.pow(2,f),f++),delete s[c]}else for(e=a[c],t=0;t<f;t++)v=v<<1|1&e,w==r-1?(w=0,d.push(n(v)),v=0):w++,e>>=1;0==--l&&(l=Math.pow(2,f),f++),a[p]=h++,c=String(u)}if(""!==c){if(Object.prototype.hasOwnProperty.call(s,c)){if(c.charCodeAt(0)<256){for(t=0;t<f;t++)v<<=1,w==r-1?(w=0,d.push(n(v)),v=0):w++;for(e=c.charCodeAt(0),t=0;t<8;t++)v=v<<1|1&e,w==r-1?(w=0,d.push(n(v)),v=0):w++,e>>=1}else{for(e=1,t=0;t<f;t++)v=v<<1|e,w==r-1?(w=0,d.push(n(v)),v=0):w++,e=0;for(e=c.charCodeAt(0),t=0;t<16;t++)v=v<<1|1&e,w==r-1?(w=0,d.push(n(v)),v=0):w++,e>>=1}0==--l&&(l=Math.pow(2,f),f++),delete s[c]}else for(e=a[c],t=0;t<f;t++)v=v<<1|1&e,w==r-1?(w=0,d.push(n(v)),v=0):w++,e>>=1;0==--l&&(l=Math.pow(2,f),f++)}for(e=2,t=0;t<f;t++)v=v<<1|1&e,w==r-1?(w=0,d.push(n(v)),v=0):w++,e>>=1;for(;;){if(v<<=1,w==r-1){d.push(n(v));break}w++}return d.join("")},v=function(o){return null==o?"":""==o?null:w(o.length,32768,(function(r){return o.charCodeAt(r)}))},w=function(r,n,t){var e,i,a,s,u,p,c,l=[],h=4,f=4,d=3,v="",w=[],A={val:t(0),position:n,index:1};for(e=0;e<3;e+=1)l[e]=e;for(a=0,u=Math.pow(2,2),p=1;p!=u;)s=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=t(A.index++)),a|=(s>0?1:0)*p,p<<=1;switch(a){case 0:for(a=0,u=Math.pow(2,8),p=1;p!=u;)s=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=t(A.index++)),a|=(s>0?1:0)*p,p<<=1;c=o(a);break;case 1:for(a=0,u=Math.pow(2,16),p=1;p!=u;)s=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=t(A.index++)),a|=(s>0?1:0)*p,p<<=1;c=o(a);break;case 2:return""}for(l[3]=c,i=c,w.push(c);;){if(A.index>r)return"";for(a=0,u=Math.pow(2,d),p=1;p!=u;)s=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=t(A.index++)),a|=(s>0?1:0)*p,p<<=1;switch(c=a){case 0:for(a=0,u=Math.pow(2,8),p=1;p!=u;)s=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=t(A.index++)),a|=(s>0?1:0)*p,p<<=1;l[f++]=o(a),c=f-1,h--;break;case 1:for(a=0,u=Math.pow(2,16),p=1;p!=u;)s=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=t(A.index++)),a|=(s>0?1:0)*p,p<<=1;l[f++]=o(a),c=f-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,d),d++),l[c])v=l[c];else{if(c!==f)return null;v=i+i.charAt(0)}w.push(v),l[f++]=i+v.charAt(0),i=v,0==--h&&(h=Math.pow(2,d),d++)}};export{f as compress,i as compressToBase64,l as compressToEncodedURIComponent,s as compressToUTF16,p as compressToUint8Array,v as decompress,a as decompressFromBase64,h as decompressFromEncodedURIComponent,u as decompressFromUTF16,c as decompressFromUint8Array};