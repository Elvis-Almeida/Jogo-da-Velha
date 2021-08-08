const CACHE_NAME = 'v1'
const urlsToCache = [
    '/',
    '/index.html',
    '/Menu.js',
    '/JogoDaVelha.js',
    '/style_game.css',
    '/style_menu.css',
    '/movendo_peça_xadrez.mp3',
    '/som_vitoria.mp3',
    '/sw.js',
    '/favicon.png',
    '/manifest.json',
]

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('cache aberto');
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch',  event => {
     event.respondWith(caches.match(event.request).then(response => {
            return response || fetch(event.request)
        })
	    // .catch(() => {
        //     return caches.match('/index.html');
        //   })
    )
})

