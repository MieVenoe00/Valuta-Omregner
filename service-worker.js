/* ─────────────────────────────────────────
   CozyFX — Service Worker
   Offline caching & PWA support
   ───────────────────────────────────────── */

const CACHE_NAME  = 'cozyfx-v2';
const RATE_CACHE  = 'cozyfx-rates-v2';

// App shell files to cache on install
const SHELL_FILES = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './assets/icons/icon.svg',
  'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@400;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js',
];

/* ── Install: cache app shell ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        SHELL_FILES.map(url => cache.add(url).catch(err => {
          console.warn('CozyFX SW: failed to cache', url, err);
        }))
      );
    }).then(() => self.skipWaiting())
  );
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== RATE_CACHE)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

/* ── Fetch strategy ── */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API calls: network-first, cache fallback
  if (url.hostname.includes('er-api.com') || url.hostname.includes('frankfurter.app')) {
    event.respondWith(networkFirstWithCache(event.request, RATE_CACHE));
    return;
  }

  // Font requests: cache-first
  if (url.hostname.includes('fonts.')) {
    event.respondWith(cacheFirst(event.request, CACHE_NAME));
    return;
  }

  // Everything else: cache-first, fallback to network
  event.respondWith(cacheFirst(event.request, CACHE_NAME));
});

/* ── Cache strategies ── */
async function cacheFirst(request, cacheName) {
  const cache    = await caches.open(cacheName);
  const cached   = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (e) {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirstWithCache(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request, { signal: AbortSignal.timeout(8000) });
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = await cache.match(request);
    if (cached) return cached;
    return new Response(
      JSON.stringify({ error: 'offline', rates: null }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
