if(!self.define){let e,i={};const c=(c,s)=>(c=new URL(c+".js",s).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(s,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const d=e=>c(e,r),a={module:{uri:r},exports:o,require:d};i[r]=Promise.all(s.map((e=>a[e]||d(e)))).then((e=>(n(...e),o)))}}define(["./workbox-c0a0b783"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"dropdown.js",revision:"2339fe002a3a97f858cbe5eb58dba46e"},{url:"icon-192x192.png",revision:"6ccb9a5f2e3a80b4ea4fc4debb57d5a8"},{url:"icon-256x256.png",revision:"e0d8b61bdd69e7ae5832235cdfd33113"},{url:"icon-384x384.png",revision:"ce2dd6d7858939be3faed245cfb62a4f"},{url:"icon-512x512.png",revision:"35caee3476d60c4007ef32364ac2f99a"},{url:"index.html",revision:"9d7191d15e5f037b1b86909690971536"},{url:"manifest.json",revision:"7e6a5ad47705cdcf83987e0eb474a5c6"},{url:"pokemon-details.css",revision:"ac0ed54fc725ec90de95ace043725902"},{url:"pokemon-details.html",revision:"10c1e5f638ee75fde8bd44af191f48b9"},{url:"pokemon-details.js",revision:"c571fab53abaaefc5a8c8cb9723bae26"},{url:"script.js",revision:"6c65f717787cd69c20ed6310cac93a96"},{url:"styles.css",revision:"ae07aae2e1ffb50aeb9b44123b30b30d"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map