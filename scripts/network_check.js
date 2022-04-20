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

const web_pages = [
  "https://screencastify.com",
  "https://firebaseapp.com",
  "https://webconf.firebaseio.com/favicon.ico",
  "https://sentry.io",
  "https://fonts.googleapis.com/css?family=Muli:400",
  "https://lh3.googleusercontent.com/favicon.ico",
  "https://pendo.io",
  "https://google-analytics.com",
  "https://fonts.gstatic.com/s/sourcesanspro/v19/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdu3cOWxw.woff2",
  "https://apis.google.com/js/api.js",
];

function checkURL(url, which) {
  fetch(url, {mode: 'no-cors'})
    .then(function (response) {
      if (!response.ok) {
        console.log(response);
        // make the promise be rejected if we didn't get a 2xx response
        const err = new Error("Not 2xx response");
        err.response = response;
        throw err;
      } else {
        switch (which) {
          case 0:
            screencastify_check.innerHTML = "Passed";
            break;
          case 1:
            firebaseapp_check.innerHTML = "Passed";
            break;
          case 2:
            firebaseio_check.innerHTML = "Passed";
            break;
          case 3:
            sentry_check.innerHTML = "Passed";
            break;
          case 4:
            googleapis_check.innerHTML = "Passed";
            break;
          case 5:
            googleusercontent_check.innerHTML = "Passed";
            break;
          case 6:
            pendo_check.innerHTML = "Passed";
            break;
          case 7:
            analytics_check.innerHTML = "Passed";
            break;
          case 8:
            gstatic_check.innerHTML = "Passed";
            break;
          case 9:
            apis_check.innerHTML = "Passed";
            break;
        }
      }
    })
    .catch(function (err) {
      //console.log(err);
      switch (which) {
        case 0:
          screencastify_check.innerHTML = "Failed";
          break;
        case 1:
          firebaseapp_check.innerHTML = "Failed";
          break;
        case 2:
          firebaseio_check.innerHTML = "Failed";
          break;
        case 3:
          sentry_check.innerHTML = "Failed";
          break;
        case 4:
          googleapis_check.innerHTML = "Failed";
          break;
        case 5:
          googleusercontent_check.innerHTML = "Failed";
          break;
        case 6:
          pendo_check.innerHTML = "Failed";
          break;
        case 7:
          analytics_check.innerHTML = "Failed";
          break;
        case 8:
          gstatic_check.innerHTML = "Failed";
          break;
        case 9:
          apis_check.innerHTML = "Failed";
          break;
      }
    });
}

for (var i = 0; i < web_pages.length; i++) {
  checkURL(web_pages[i], i);
}
