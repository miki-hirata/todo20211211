if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const l=e=>n(e,r),c={module:{uri:r},exports:o,require:l};s[r]=Promise.all(i.map((e=>c[e]||l(e)))).then((e=>(t(...e),o)))}}define(["./workbox-3e4da89b"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.2bc107c6.css",revision:null},{url:"assets/index.2f043399.js",revision:null},{url:"assets/vendor.c7fd77f3.js",revision:null},{url:"index.html",revision:"2f10c1e196633ca2732c6ed23f149200"},{url:"manifest.webmanifest",revision:"8759b85a8b254c80869e992a31c19546"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
