var APP_PREFIX = "DSC RNSIT"; // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = "version_02"; // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION;
var URLS = [
  // Add URL you want to cache in this list.
  "/", // If you have separate JS/CSS files,
  "/index.html", // add path to those files here
  "/index.html?homescreen=1",
  "/?homescreen=1",
  "/css/bootstrap.min.css",
  "/css/ionicons.min.css",
  "/css/magnific-popup.css",
  "/css/owl.carousel.min.css",
  "/css/responsive.css",
  "/css/styles.css",
  "/css/swiper.min.css",
  "/images/assets/events/fba.png",
  "/images/assets/events/fbw.png",
  "/images/assets/events/rpj.png",
  "/images/assets/diversity.png",
  "/images/assets/logo2.png",
  "/images/assets/team/",
  "/images/assets/technologies/android.png",
  "/images/assets/technologies/cloud.png",
  "/images/assets/technologies/mi.png",
  "/images/assets/technologies/web.png",
  "/images/icon.png",
  "/js/custom.js",
  "/js/vendors/bootstrap.bundle.min.js",
  "/js/vendors/jquery.easing.min.js",
  "/js/vendors/jquery.magnific-popup.min.js",
  "/js/vendors/jquery.min.js",
  "/js/vendors/owl.carousel.min.js",
  "/js/vendors/swiper.min.js",
  "/service-worker.js",
  "/manifest.json",
];

// Respond with cached resources
self.addEventListener("fetch", function (e) {
  console.log("fetch request : " + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        // if cache is available, respond with cache
        console.log("responding with cache : " + e.request.url);
        return request;
      } else {
        // if there are no cache, try fetching request
        console.log("file is not cached, fetching : " + e.request.url);
        return fetch(e.request);
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  );
});

// Cache resources
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache : " + CACHE_NAME);
      return cache.addAll(URLS);
    })
  );
});

// Delete outdated caches
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheWhitelist.indexOf(key) === -1) {
            console.log("deleting cache : " + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

/*
self.addEventListener("fetch", function (s) {
  s.respondWith(
    caches.open("cache").then(function (e) {
      return e.match(s.request).then(function (n) {
        console.log("cache request: " + s.request.url);
        var t = fetch(s.request).then(
          function (n) {
            return (
              console.log("fetch completed: " + s.request.url, n),
              n &&
                (console.debug("updated cached page: " + s.request.url, n),
                "GET" === s.request.method &&
                  "basic" === n.type &&
                  e.put(s.request, n.clone())),
              n
            );
          },
          function (s) {
            console.log("Error in fetch()", s),
              s.waitUntil(
                caches.open("cache").then(function (s) {
                  return s.addAll([
                    "/",
                    "/index.html",
                    "/index.html?homescreen=1",
                    "/?homescreen=1",
                    "/css/bootstrap.min.css",
                    "/css/ionicons.min.css",
                    "/css/magnific-popup.css",
                    "/css/owl.carousel.min.css",
                    "/css/responsive.css",
                    "/css/styles.css",
                    "/css/swiper.min.css",
                    "/images/assets/events/fba.png",
                    "/images/assets/events/fbw.png",
                    "/images/assets/events/rpj.png",
                    "/images/assets/diversity.png",
                    "/images/assets/logo2.png",
                    "/images/assets/team/avatar.png",
                    "/images/assets/technologies/android.png",
                    "/images/assets/technologies/cloud.png",
                    "/images/assets/technologies/mi.png",
                    "/images/assets/technologies/web.png",
                    "/images/icon.png",
                    "/js/custom.js",
                    "/js/vendors/bootstrap.bundle.min.js",
                    "/js/vendors/jquery.easing.min.js",
                    "/js/vendors/jquery.magnific-popup.min.js",
                    "/js/vendors/jquery.min.js",
                    "/js/vendors/owl.carousel.min.js",
                    "/js/vendors/swiper.min.js",
                    "/service-worker.js",
                    "/manifest.json",
                  ]);
                })
              );
          }
        );
        return n || t;
      });
    })
  );
}),
  self.addEventListener("install", function (s) {
    self.skipWaiting(), console.log("Latest version installed!");
  });

*/
