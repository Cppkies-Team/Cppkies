/* eslint-disable */
// @ts-nocheck

let t=String.fromCharCode;const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";let r={};function e(t,n){if(!r[t]){r[t]={};for(var o=0;o<t.length;o++)r[t][t.charAt(o)]=o}return r[t][n]}const i=function(t){if(null==t)return"";var o=d(t,6,function(t){return n.charAt(t)});switch(o.length%4){default:case 0:return o;case 1:return o+"===";case 2:return o+"==";case 3:return o+"="}},u=function(t){return null==t?"":""==t?null:w(t.length,32,function(o){return e(n,t.charAt(o))})},a=function(n){return null==n?"":d(n,15,function(n){return t(n+32)})+" "},l=function(t){return null==t?"":""==t?null:w(t.length,16384,function(n){return t.charCodeAt(n)-32})},p=function(t){for(var n=f(t),o=new Uint8Array(2*n.length),r=0,e=n.length;r<e;r++){var i=n.charCodeAt(r);o[2*r]=i>>>8,o[2*r+1]=i%256}return o},s=function(n){if(null==n)return v(n);for(var o=new Array(n.length/2),r=0,e=o.length;r<e;r++)o[r]=256*n[2*r]+n[2*r+1];var i=[];return o.forEach(function(n){i.push(t(n))}),v(i.join(""))},c=function(t){return null==t?"":d(t,6,function(t){return o.charAt(t)})},h=function(t){return null==t?"":""==t?null:(t=t.replace(/ /g,"+"),w(t.length,32,function(n){return e(o,t.charAt(n))}))},f=function(n){return d(n,16,function(n){return t(n)})},d=function(t,n,o){if(null==t)return"";var r,e,i,u={},a={},l="",p="",s="",c=2,h=3,f=2,d=[],v=0,w=0;for(i=0;i<t.length;i+=1)if(l=t.charAt(i),Object.prototype.hasOwnProperty.call(u,l)||(u[l]=h++,a[l]=!0),p=s+l,Object.prototype.hasOwnProperty.call(u,p))s=p;else{if(Object.prototype.hasOwnProperty.call(a,s)){if(s.charCodeAt(0)<256){for(r=0;r<f;r++)v<<=1,w==n-1?(w=0,d.push(o(v)),v=0):w++;for(e=s.charCodeAt(0),r=0;r<8;r++)v=v<<1|1&e,w==n-1?(w=0,d.push(o(v)),v=0):w++,e>>=1}else{for(e=1,r=0;r<f;r++)v=v<<1|e,w==n-1?(w=0,d.push(o(v)),v=0):w++,e=0;for(e=s.charCodeAt(0),r=0;r<16;r++)v=v<<1|1&e,w==n-1?(w=0,d.push(o(v)),v=0):w++,e>>=1}0==--c&&(c=Math.pow(2,f),f++),delete a[s]}else for(e=u[s],r=0;r<f;r++)v=v<<1|1&e,w==n-1?(w=0,d.push(o(v)),v=0):w++,e>>=1;0==--c&&(c=Math.pow(2,f),f++),u[p]=h++,s=String(l)}if(""!==s){if(Object.prototype.hasOwnProperty.call(a,s)){if(s.charCodeAt(0)<256){for(r=0;r<f;r++)v<<=1,w==n-1?(w=0,d.push(o(v)),v=0):w++;for(e=s.charCodeAt(0),r=0;r<8;r++)v=v<<1|1&e,w==n-1?(w=0,d.push(o(v)),v=0):w++,e>>=1}else{for(e=1,r=0;r<f;r++)v=v<<1|e,w==n-1?(w=0,d.push(o(v)),v=0):w++,e=0;for(e=s.charCodeAt(0),r=0;r<16;r++)v=v<<1|1&e,w==n-1?(w=0,d.push(o(v)),v=0):w++,e>>=1}0==--c&&(c=Math.pow(2,f),f++),delete a[s]}else for(e=u[s],r=0;r<f;r++)v=v<<1|1&e,w==n-1?(w=0,d.push(o(v)),v=0):w++,e>>=1;0==--c&&(c=Math.pow(2,f),f++)}for(e=2,r=0;r<f;r++)v=v<<1|1&e,w==n-1?(w=0,d.push(o(v)),v=0):w++,e>>=1;for(;;){if(v<<=1,w==n-1){d.push(o(v));break}w++}return d.join("")},v=function(t){return null==t?"":""==t?null:w(t.length,32768,function(n){return t.charCodeAt(n)})},w=function(n,o,r){var e,i,u,a,l,p,s,c=[],h=4,f=4,d=3,v="",w=[],A={val:r(0),position:o,index:1};for(e=0;e<3;e+=1)c[e]=e;for(u=0,l=Math.pow(2,2),p=1;p!=l;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=r(A.index++)),u|=(a>0?1:0)*p,p<<=1;switch(u){case 0:for(u=0,l=Math.pow(2,8),p=1;p!=l;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=r(A.index++)),u|=(a>0?1:0)*p,p<<=1;s=t(u);break;case 1:for(u=0,l=Math.pow(2,16),p=1;p!=l;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=r(A.index++)),u|=(a>0?1:0)*p,p<<=1;s=t(u);break;case 2:return""}for(c[3]=s,i=s,w.push(s);;){if(A.index>n)return"";for(u=0,l=Math.pow(2,d),p=1;p!=l;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=r(A.index++)),u|=(a>0?1:0)*p,p<<=1;switch(s=u){case 0:for(u=0,l=Math.pow(2,8),p=1;p!=l;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=r(A.index++)),u|=(a>0?1:0)*p,p<<=1;c[f++]=t(u),s=f-1,h--;break;case 1:for(u=0,l=Math.pow(2,16),p=1;p!=l;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=r(A.index++)),u|=(a>0?1:0)*p,p<<=1;c[f++]=t(u),s=f-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,d),d++),c[s])v=c[s];else{if(s!==f)return null;v=i+i.charAt(0)}w.push(v),c[f++]=i+v.charAt(0),i=v,0==--h&&(h=Math.pow(2,d),d++)}};export{f as compress,i as compressToBase64,c as compressToEncodedURIComponent,a as compressToUTF16,p as compressToUint8Array,v as decompress,u as decompressFromBase64,h as decompressFromEncodedURIComponent,l as decompressFromUTF16,s as decompressFromUint8Array};
