var screencastify_check = document.getElementById("screencastify.com");
var firebaseapp_check = document.getElementById("firebaseapp.com");
var firebaseio_check = document.getElementById("firebaseio.com");
var sentry_check = document.getElementById("sentry.io");
var googleapis_check = document.getElementById("googleapis.com");
var googleusercontent_check = document.getElementById("googleusercontent.com");
var pendo_check = document.getElementById("pendo.io");
var analytics_check = document.getElementById("google-analytics.com");
var gstatic_check = document.getElementById("fonts.gstatic.com");
var apis_check = document.getElementById("apis.google.com");
var app_castify = document.getElementById("app.castify");
var failed_label = document.getElementById("failed_label");
var failed_title = document.getElementById("failed_title");

console.log("Screencastify TS: Testing in progress, ignore any console errors");

var failed_webpages = new Array ();
var web_pages = new Array ();
web_pages[0] = new Array ("https://screencastify.com", 
                          "https://app.screencastify.com",
                          "https://app.castify.com/api/studioService/legacy-proxy/account/survey",
                          "https://app.castify.com/api/studioService/legacy-proxy/license_service",
                          "https://ww2.screencastify.com",
                          "https://captions.screencastify.com",
                          "https://edit.screencastify.com",
                          "https://questions.screencastify.com",
                          "https://watch.screencastify.com",
                          "https://account.screencastify.com",
                          "https://cdn.castify.com/images/cleardot.gif", 
                          "https://umbrella.svc.screencastify.com", 
                          "https://dash-assets.watch.screencastify.com");
web_pages[1] = new Array ("https://dental2-test.firebaseapp.com", 
                          "https://castify-storage.firebaseapp.com");
web_pages[2] = new Array ("https://webconf.firebaseio.com/favicon.ico");
web_pages[3] = new Array ("https://sentry.io");
web_pages[4] = new Array ("https://firestore.googleapis.com",
                          "https://pendo-static-5576174479474688.storage.googleapis.com",
                          "https://clients2.google.com/service/update2/crx",
                          "https://pendo-io-static.storage.googleapis.com",
                          "https://firebasestorage.googleapis.com", 
                          "https://firebase.googleapis.com/v1beta1/availableProjects",
                          "https://storage.googleapis.com",
                          "https://googleapis.com/drive/v2/files");
web_pages[5] = new Array ("https://lh3.googleusercontent.com/favicon.ico");
web_pages[6] = new Array ("https://pendo.io",
                          "https://app.pendo.io",
                          "https://cdn.pendo.io",                          
                          "https://data.pendo.io");
web_pages[7] = new Array ("https://google-analytics.com",
                          "https://www.googletagmanager.com");
web_pages[8] = new Array ("https://fonts.gstatic.com/s/sourcesanspro/v19/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdu3cOWxw.woff2", 
                          "https://fonts.gstatic.com");
web_pages[9] = new Array ("https://apis.google.com/js/api.js", 
                          "https://pagead2.googlesyndication.com");
web_pages[10] = new Array ("https://app.castify.com",
                          "https://cdn.castify.com",
                          "https://studio-backend.castify.com/api/studioService/legacy-proxy/account/survey",
                          "https://studio-backend.castify.com",
                          "https://logs.browser-intake-datadoghq.com",
                          "https://studio-graphql.castify.com");

passed = "✅Passed⭐";
failed = "❌ Failed ⛔";
checking = "🧪Checking🌐";

function applyRandEffects(which, type) {
  setTimeout(() => {
    which.classList.add(type);
  }, Math.floor(Math.random() * 100));
}

function checkURL(url, which) {
  fetch(url, { mode: "no-cors" })
    .then((r) => {
      // Nothing to do
    })
    .catch((e) => {
      failed_title.innerHTML = "Failed URLs";
      switch (which) {
        case 0:
          screencastify_check.innerHTML = failed;
          applyRandEffects(screencastify_check, "shake");
          failed_label.innerHTML += url + "";
          break;
        case 1:
          firebaseapp_check.innerHTML = failed;
          applyRandEffects(firebaseapp_check, "shake");
          failed_label.innerHTML += url;
          break;
        case 2:
          firebaseio_check.innerHTML = failed;
          applyRandEffects(firebaseio_check, "shake");
          failed_label.innerHTML += url;
          break;
        case 3:
          sentry_check.innerHTML = failed;
          applyRandEffects(sentry_check, "shake");
          failed_label.innerHTML += url;
          break;
        case 4:
          googleapis_check.innerHTML = failed;
          applyRandEffects(googleapis_check, "shake");
          failed_label.innerHTML += url + "\n";
          break;
        case 5:
          googleusercontent_check.innerHTML = failed;
          applyRandEffects(googleusercontent_check, "shake");
          failed_label.innerHTML += url + "\n";
          break;
        case 6:
          pendo_check.innerHTML = failed;
          applyRandEffects(pendo_check, "shake");
          failed_label.innerHTML += url + "\n";
          break;
        case 7:
          analytics_check.innerHTML = failed;
          applyRandEffects(analytics_check, "shake");
          failed_label.innerHTML += url + "\n";
          break;
        case 8:
          gstatic_check.innerHTML = failed;
          applyRandEffects(gstatic_check, "shake");
          failed_label.innerHTML += url + "\n";
          break;
        case 9:
          apis_check.innerHTML = failed;
          applyRandEffects(apis_check, "shake");
          failed_label.innerHTML += url + "\n";
          break;
        case 10:
          app_castify.innerHTML = failed;
          applyRandEffects(app_castify, "shake");
          failed_label.innerHTML += url + "\n";
          break;
        }
    });
}

function network_checks() {
  for (var i = 0; i < web_pages.length; i++) {
    for (var j = 0; j < web_pages[i].length; j++) {
      checkURL(web_pages[i][j], i);
    }
  }
  if (screencastify_check.innerHTML = checking) { screencastify_check.innerHTML = passed; applyRandEffects(screencastify_check, "bounce"); }
  if (firebaseapp_check.innerHTML = checking) { firebaseapp_check.innerHTML = passed; applyRandEffects(firebaseapp_check, "bounce"); }
  if (firebaseio_check.innerHTML = checking) { firebaseio_check.innerHTML = passed; applyRandEffects(firebaseio_check, "bounce"); }
  if (sentry_check.innerHTML = checking) { sentry_check.innerHTML = passed; applyRandEffects(sentry_check, "bounce"); }
  if (googleapis_check.innerHTML = checking) { googleapis_check.innerHTML = passed; applyRandEffects(googleapis_check, "bounce"); }
  if (googleusercontent_check.innerHTML = checking) { googleusercontent_check.innerHTML = passed; applyRandEffects(googleusercontent_check, "bounce"); }
  if (pendo_check.innerHTML = checking) { pendo_check.innerHTML = passed; applyRandEffects(pendo_check, "bounce"); }
  if (analytics_check.innerHTML = checking) { analytics_check.innerHTML = passed; applyRandEffects(analytics_check, "bounce"); }
  if (gstatic_check.innerHTML = checking) { gstatic_check.innerHTML = passed; applyRandEffects(gstatic_check, "bounce"); }
  if (apis_check.innerHTML = checking) { apis_check.innerHTML = passed; applyRandEffects(apis_check, "bounce"); }
  if (app_castify.innerHTML = checking) { app_castify.innerHTML = passed; applyRandEffects(app_castify, "bounce"); }  
}

network_checks();
