self.addEventListener("install", (event) => {
  console.log("Service Worker wird installiert");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker ist aktiviert");
});

// //offline Fallback

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     fetch(event.request).catch(function () {
//       // offline fallback page if network is unavailable
//       return caches.match("/RequestURL");
//     })
//   );
// });

// //runtime caching
// self.addEventListener("fetch", (event) => {
//   console.log(
//     "Service Worker hat folgende Anfrage abgefangen:",
//     event.request.url
//   );
//   event.respondWith(
//     fetch(event.request)
//       .then((response) => {
//         // duplicate response
//         const clonedResponse = response.clone();

//         // Store response in cache
//         caches.open("testCache").then((cache) => {
//           cache.put(event.request, clonedResponse);
//         });

//         // Return the original response
//         return response;
//       })
//       .catch((error) => {
//         //serve response in offline scenario
//         return caches.match(event.request);
//       })
//   );
// });

//precaching
//sw.js
const CACHE_NAME = "precaching-v1";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-256x256.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If cache is available, respond with cached response
      if (response) {
        return response;
      }
      // If not, try fetching from network
      return fetch(event.request).catch(() => {
        // If fetching from network fails, respond with custom offline page
        return caches.match("/");
      });
    })
  );
});
