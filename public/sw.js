// Offline support for hemsbansal.in. Bump VERSION when you want every visitor to refresh their cache.
const VERSION = 'v1';
const CACHE = 'hemsbansal-' + VERSION;
const PAGES = [
  '/', '/index.html', '/style.css', '/site.js', '/manifest.webmanifest',
  '/notes/voice-latency.html', '/notes/bluetooth-null-checks.html', '/notes/do-not-disturb.html',
  '/resume/', '/uses/', '/bugs/', '/status/', '/404.html',
  '/icons/icon-192.png', '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PAGES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Pages: try the network first so updates show up, fall back to the cache when offline.
// Everything else: serve from cache, update in the background.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('/404.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; }).catch(() => hit);
      return hit || net;
    })
  );
});
