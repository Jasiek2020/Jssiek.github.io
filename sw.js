/* Service worker for Banners of the Vale
   LESSON: A service worker is a script the browser runs in the background,
   between the game and the network. Here it does one job: keep a copy of
   the game's files on the phone, so the game starts even with no internet.

   Strategy ("cache first"):
     - When installed, save all the game files.
     - For every request, answer from the saved copy if we have one;
       otherwise fetch it from the internet and save it for next time
       (that's how the Google font gets saved after the first online launch).

   To ship an update: change VERSION below. Phones then download the new
   files and throw the old copy away. */
const VERSION = 'bov-v14';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png',
               './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(FILES)));
  self.skipWaiting();                                   // start using the new version right away
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))));   // delete old versions
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(saved => saved || fetch(event.request).then(response => {
      if (response.ok || response.type === 'opaque'){
        const copy = response.clone();
        caches.open(VERSION).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match('./index.html')))      // offline and not saved: show the game
  );
});
