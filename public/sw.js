const CACHE_NAME = 'ayesha-valentine-v2';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/smile.png',
    '/funny-valentine.gif',
    'https://www.transparenttextures.com/patterns/creme-paper.png',
    'https://www.transparenttextures.com/patterns/cream-paper.png',
    'https://www.transparenttextures.com/patterns/aged-paper.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
