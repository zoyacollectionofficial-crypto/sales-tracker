// Sales Tracker service worker — offline-first PWA.
// App files (same origin): network-first with a 4s timeout, fall back to cache.
// CDN static assets (jsdelivr etc.): cache-first.
// API calls (Supabase, auth, anything else): NEVER cached, always network.
const APP_CACHE = 'sales-tracker-app-v2';
const CDN_CACHE = 'sales-tracker-cdn-v2';
const APP_FILES = ['./', './index.html', './manifest.json', './sw.js'];

// Static-asset CDNs only. Never add API hosts here: caching API responses
// serves stale data (e.g. an old Supabase row) and the app would then
// overwrite fresh saves with that stale data.
const CDN_HOSTS = new Set([
  'cdn.jsdelivr.net',
  'unpkg.com',
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
]);

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
  if (req.method !== 'GET') return; // POST/PUT/DELETE (Supabase writes, auth) always hit the network
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirstWithTimeout(req));
  } else if (CDN_HOSTS.has(url.hostname)) {
    event.respondWith(cacheFirst(req));
  }
  // Anything else (Supabase REST, auth endpoints): not intercepted,
  // the browser fetches from the network and nothing is cached.
});
