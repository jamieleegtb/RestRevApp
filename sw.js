/**
 * Cache an array of file names for later use
 */
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

/**
 * When service worker is registered, an installation event is fired
 */
self.addEventListener('install', funtion(e){
  // Wait until the installation event is complete
  e.waitUntil(
    caches.open('v1').then(function(cache){
      return cache.addAll(cacheFiles);
    });
  );
});

/**
 * Listen for and do things with is the “fetch” event
 */
 self.addEventListener('fetch', funtion(e){
   e.respondWith(
     // Determine if the event request url already exists within the cache we loaded back in the installation
     caches.march(e.request).then(function(response){
       //The response will be the result of whether or not the cache match was successful
       if (response){
         console.log('Found ', e.request, ' in cache');
         return response;
       } else {
         console.log('Could not find ', e.request, ' in cache, fetching!');
         return fetch(e.request);
         //Not only fetch the request, but also add it to the cache for later
         .then(function(response){
           const clonedResponse = response.clone();
           caches.open('v1').then(function(cache){
             cache.put(e.request, clonedResponse);
           });
           return response;
         });
         .catch(function(err){
           console.error(err);
         });
       }
     });
   );
 });
