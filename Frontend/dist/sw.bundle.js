if(!self.define){let e,i={};const a=(a,t)=>(a=new URL(a+".js",t).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,d)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let f={};const s=e=>a(e,n),r={module:{uri:n},exports:f,require:s};i[n]=Promise.all(t.map((e=>r[e]||s(e)))).then((e=>(d(...e),f)))}}define(["./workbox-27b4add1"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"app.webmanifest",revision:"340d1740d9b924e06dd38ea02937d3b4"},{url:"app~09955542.bundle.js",revision:"12190e05f5f1813cac8fc354376badee"},{url:"app~09955542.css",revision:"f49b8c491598864fa845e77ba8eee4ac"},{url:"app~166a29e1.bundle.js",revision:"1889ff0c0cc3eb2242f5ff5379935605"},{url:"app~166a29e1.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~27545368.bundle.js",revision:"c80a6e7e7721feec8c3c13a70da97881"},{url:"app~371d9bbb.bundle.js",revision:"6356bc3362e8776ed672c30ffb966813"},{url:"app~71c0e426.bundle.js",revision:"fed851623dccc3fd4d9ff575877a132e"},{url:"app~71c0e426.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"b964ff93d9cb23e7f4c0.ttf",revision:null},{url:"font/OFL.txt",revision:"4f7e44e826a922a1da2dbf8db37d7017"},{url:"font/Quicksand-VariableFont_wght.ttf",revision:"191a406a7e852a6a06dd6346733938f8"},{url:"font/README.txt",revision:"152e629c999ae58f0cbbd8e69e185166"},{url:"font/static/Quicksand-Bold.ttf",revision:"e8dcee4bbf2288a2d264c76fa547f37a"},{url:"font/static/Quicksand-Light.ttf",revision:"e60d43df6abf50de0980883f4596e268"},{url:"font/static/Quicksand-Medium.ttf",revision:"fd7f304a26dd790aef9f1ae84403eab3"},{url:"font/static/Quicksand-Regular.ttf",revision:"7194c41ffab51721bd84ca104553c4e1"},{url:"font/static/Quicksand-SemiBold.ttf",revision:"025d26a905aa7e016827cdc2b429552f"},{url:"icons/icon.png",revision:"d2d694dadb869ed818767e857063e6d6"},{url:"index.html",revision:"aea6ef20c1e5eda2171fa6710e09c95e"}],{}),e.registerRoute(/https:\/\/restaurant-api.dicoding.dev/,new e.StaleWhileRevalidate({cacheName:"restaurant-api",plugins:[]}),"GET"),e.registerRoute(/https:\/\/restaurant-api.dicoding.dev\/images/,new e.StaleWhileRevalidate({cacheName:"images",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map