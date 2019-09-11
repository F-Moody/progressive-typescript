if ('function' === typeof importScripts) {
    importScripts(
        'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
    );
    /* global workbox */
    // @ts-ignore
    if (workbox) {
        console.log('Workbox is loaded');

        /* injection point for manifest files.  */
        // @ts-ignore
        workbox.precaching.precacheAndRoute([]);

        /* custom cache rules*/
        // @ts-ignore
        workbox.routing.registerNavigationRoute('/index.html', {
            blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
        });
        // @ts-ignore
        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg)$/,
            // @ts-ignore
            workbox.strategies.cacheFirst({
                cacheName: 'images',
                plugins: [
                    // @ts-ignore
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    }),
                ],
            })
        );

    } else {
        console.log('Workbox could not be loaded. No Offline support');
    }
}