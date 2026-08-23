const CACHE_NAME = 'house-rental-v1';
const ASSETS = ['/', '/index.html', '/css/style.css', '/js/app.js', '/js/properties.js', '/manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(names => Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => e.request.mode === 'navigate' ? caches.match('/index.html') : null))); });
