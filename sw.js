// Sales Tracker service worker — offline-first PWA.
// App files (same origin): network-first with a 4s timeout, fall back to cache.
// CDN scripts (jsdelivr etc.): cache-first.
const APP_CACHE = 'sales-tracker-app-v1';
const CDN_CACHE = 'sales-tracker-cdn-v1';
const APP_FILES = ['./', './index.html', './manifest.json', './sw.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) => cache.addAll(APP_FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== APP_CACHE && k !== CDN_CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function networkFirstWithTimeout(request) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('network-timeout')), 4000);
    fetch(request).then(
      (resp) => {
        clearTimeout(timer);
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(APP_CACHE).then((cache) => cache.put(request, copy));
        }
        resolve(resp);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  }).catch(() => caches.match(request));
}

function cacheFirst(request) {
  return caches.match(request).then(
    (hit) =>
      hit ||
      fetch(request).then((resp) => {
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(CDN_CACHE).then((cache) => cache.put(request, copy));
        }
        return resp;
      })
  );
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirstWithTimeout(req));
  } else {
    event.respondWith(cacheFirst(req));
  }
});
