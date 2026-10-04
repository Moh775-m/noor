const CACHE = "noor-v7";
const AUDIO_CACHE = "noor-audio-v2";

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(["./", "./index.html", "./manifest.json"]))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => 
      Promise.all(
        keys.map(k => {
          if (k !== CACHE && k !== AUDIO_CACHE) {
            return caches.delete(k);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // نتجاهل أي طلب مش GET
  if (e.request.method !== 'GET') return;

  const url = e.request.url;

  // 1. لو الملف صوت (mp3) -> احفظه في كاش الصوت الخاص
  if (url.endsWith(".mp3") || url.includes("mp3quran.net")) {
    e.respondWith(
      caches.open(AUDIO_CACHE).then(async (cache) => {
        const cached = await cache.match(e.request);
        if (cached) return cached;

        try {
          const res = await fetch(e.request);
          if (res.ok) {
            cache.put(e.request, res.clone());
          }
          return res;
        } catch (err) {
          // بدون نت
          return cached;
        }
      })
    );
    return;
  }

  // 2. باقي الموقع (html, css, js, صور)
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match("./index.html"));
    })
  );
});