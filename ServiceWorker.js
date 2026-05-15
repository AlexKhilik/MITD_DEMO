const cacheName = "Khylyk-Monsters-1.0.7";
const contentToCache = [
    "Build/617d708a3ac2fd98a4cb2de8af81fea9.loader.js",
    "Build/0c009a9bfe270f00b23805cb3d6af9b2.framework.js.unityweb",
    "Build/a57bb0539f19d25a28fb4f71022f9b90.data.unityweb",
    "Build/247fe144d81b1b650119c94a1f0f20af.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
