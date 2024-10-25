const staticCacheName = 'site-static-v1'
const assets =[
    `.`,
    'index.html',
    'app.js',
    'images/icon.png',
    'CsS/style.css',
    'images/icons/icon-128x128.png',
    'images/icons/icon-192x192.png'
]


self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) =>{
            console.log('Кеширование ресурсов')
            cache.addAll(assets)
        })
    )
})


self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    )
})


self.addEventListener('fetch', evt => {
    
    evt.respondWith(
        caches.match(evt.request).then(cacheRes =>{
            return cacheRes || fetch(evt.request)
        })
    )
})