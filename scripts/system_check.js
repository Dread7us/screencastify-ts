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
var browser_label = document.getElementById("browser");
var ip_label = document.getElementById("ip_address");
var os_label = document.getElementById("operating");
var version_label = document.getElementById("browser_version");
var cpu_label = document.getElementById("cpu_cores");
var ram_label = document.getElementById("ram");
var res_label = document.getElementById("browser_resolution");
var screen_label = document.getElementById("screen_resolution");
var cookies_label = document.getElementById("cookies");
var storage_label = document.getElementById("temp_storage");
var zoom_label = document.getElementById("zoom");
var downlink_label = document.getElementById("downlink");
var user_label = document.getElementById("user_agent");
// This will tell us if the user has zoomed in or out (100% means no zoom)
var zoom = Math.round(
  (window.outerWidth / window.document.documentElement.clientWidth) * 100
);

var browser = (function () {
  // Function to determine browser (stackoverflow)
  var test = function (regexp) {
    return regexp.test(window.navigator.userAgent);
  };
  switch (true) {
    case test(/edg/i):
      return "Microsoft Edge";
    case test(/trident/i):
      return "Microsoft Internet Explorer";
    case test(/firefox|fxios/i):
      return "Mozilla Firefox";
    case test(/opr\//i):
      return "Opera";
    case test(/ucbrowser/i):
      return "UC Browser";
    case test(/samsungbrowser/i):
      return "Samsung Browser";
    case test(/chrome|chromium|crios/i):
      return "Google Chrome";
    case test(/safari/i):
      return "Apple Safari";
    default:
      return "Other";
  }
})();

function get_browser_version() {
  // Function to get browser version (stackoverflow)
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([0-9|\.]+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    version_label.innerHTML = tem[1] || "";
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      version_label.innerHTML = tem[1];
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  version_label.innerHTML = M[1];
}

function cookies_enabled() {
  // Check to see if cookies are enabled
  var cookies = navigator.cookieEnabled;
  if ((cookies = true)) {
    cookies_label.innerHTML = "True";
  } else {
    rcookies_label.innerHTML = "False";
  }
}

function get_IP() {
  // Make the request
  fetch("https://api.ipify.org?format=jsonp&callback=getIP")
    // Extract the content from the response
    .then((response) => response.text())
    // Display the IP address on page
    .then((data) => {
      ip_label.innerHTML = data.slice(13, -4);
    });
}

function formatBytes(bytes, decimals = 2) {
  // Function to convert bytes to human readable KB, MG, GB, TB, etc.
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

navigator.webkitTemporaryStorage.queryUsageAndQuota(
  function (usedBytes, grantedBytes) {
    storage_label.innerHTML = formatBytes(grantedBytes);
    console.log(
      "Using ",
      formatBytes(usedBytes),
      " of ",
      formatBytes(grantedBytes)
    );
  },
  function (e) {
    console.log("Error", e);
  }
);

function formateffectiveType(name) {
  switch (name) {
    case '4g': 
      return "best";
    break;
    case '3g': 
      return "okay";
    break;
    case '2g': 
      return "slow";
    break;
    case 'slow-2g': 
      return "bad";
    break;
  }
}

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
  fetch(url, {mode: 'no-cors'}).then(r=>{
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
     })
     .catch(e=>{
       console.log(e);
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

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

// Listen for click in <body> then download the file
document.getElementById("click_test").addEventListener("click", function() {
    var timestamp = new Date().toISOString();
    var scrape = document.documentElement.innerHTML;
    download(scrape, "screencastify-ts-" + timestamp + ".html", "text/plain");
}, false);

get_IP();
os_label.innerHTML = window.navigator.platform;
browser_label.innerHTML = browser;
get_browser_version(); 
cpu_label.innerHTML = navigator.hardwareConcurrency + " logical cores";
ram_label.innerHTML = navigator.deviceMemory + " GBs";
screen_label.innerHTML = screen.height + " x " + screen.width + " pixels";
res_label.innerHTML = window.screen.availHeight + " x " + window.screen.availWidth + " pixels";
cookies_enabled();
zoom_label.innerHTML = zoom + "%";
downlink_label.innerHTML = navigator.connection.downlink + " (et: " +  navigator.connection.effectiveType + ")";
user_label.innerHTML = navigator.userAgent;

for (var i = 0; i < web_pages.length; i++) {
   checkURL(web_pages[i], i);
}