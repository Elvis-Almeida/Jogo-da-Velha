const CACHE_NAME = 'v1'
const urlsToCache = [
    '../',
    '../index.html',
    '../Scripts/Menu.js',
    '../Scripts/JogoDaVelha.js',
    '../Styles/style_game.css',
    '../Styles/style_menu.css',
    '../Audio/movendo_peça_xadrez.mp3',
    '../Audio/som_vitoria.mp3',
    '../Scripts/sw.js',
    '../Images/favicon.png',
    '../manifest.json',
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

