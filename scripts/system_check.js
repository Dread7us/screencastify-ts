var accounts_google = document.getElementById("accounts.google");
var apis_google = document.getElementById("apis.google");
var app_castify = document.getElementById("app.castify");
var askcastify_zendesk = document.getElementById("askcastify.zendesk");
var google_analytics = document.getElementById("google-analytics");
var googleapis = document.getElementById("googleapis");
var googleusercontent = document.getElementById("googleusercontent");
var fonts_gstatic = document.getElementById("fonts.gstatic");
var pendo = document.getElementById("pendo");
var static_zdassets = document.getElementById("static.zdassets");
var browser_label = document.getElementById("browser");
var ip_label = document.getElementById("ip_address");
var canvas_label = document.getElementById("canvas_supported");
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
var upload = document.getElementById("upload_speed");
var download = document.getElementById("download_speed");
var jitter = document.getElementById("jitter_speed");
var ping = document.getElementById("ping_speed");
var upload_label = document.getElementById("upload");
var download_label = document.getElementById("download");
var jitter_label = document.getElementById("jitter");
var ping_label = document.getElementById("ping");
var failed_label = document.getElementById("failed_label");
var failed_title = document.getElementById("failed_title");
// This will tell us if the user has zoomed in or out (100% means no zoom)
var zoom = Math.round(
  (window.outerWidth / window.document.documentElement.clientWidth) * 100
);
var downloaded = false;
var help_url = "https://askcastify.zendesk.com/hc/en-us/articles/6019857370647-Diagnostic-Tool";

console.log("Screencastify TS: Testing in progress, ignore any console errors");

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

function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

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
    cookies_label.innerHTML = "False";
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

var failed_webpages = new Array ();
var web_pages = new Array ();
web_pages[0] = new Array ("https://accounts.google.com",
                          "https://clients2.google.com/service/update2/crx");
web_pages[1] = new Array ("https://apis.google.com/js/api.js");
web_pages[2] = new Array ("https://app.castify.com",
                          "https://screencastify.com",
                          "https://studio-backend.castify.com",
                          "https://studio-graphql.castify.com",
                          "https://app.screencastify.com", 
                          "https://captions.screencastify.com",
                          "https://edit.screencastify.com",
                          "https://questions.screencastify.com",
                          "https://watch.screencastify.com",
                          "https://account.screencastify.com",);
web_pages[3] = new Array ("https://askcastify.zendesk.com");
web_pages[4] = new Array ("https://google-analytics.com");
web_pages[5] = new Array ("https://firestore.googleapis.com", 
                          "https://firebasestorage.googleapis.com", 
                          "https://firebase.googleapis.com/v1beta1/availableProjects", 
                          "https://storage.googleapis.com",
                          "https://pendo-static-5576174479474688.storage.googleapis.com",
                          "https://pendo-io-static.storage.googleapis.com",
                          "https://googleapis.com/drive/v2/files");
web_pages[6] = new Array ("https://lh3.googleusercontent.com/favicon.ico");
web_pages[7] = new Array ("https://fonts.gstatic.com/s/sourcesanspro/v19/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdu3cOWxw.woff2", 
                          "https://fonts.gstatic.com");
web_pages[8] = new Array ("https://pendo.io",
                          "https://data.pendo.io",
                          "https://app.pendo.io",
                          "https://cdn.pendo.io",
                          "");
web_pages[9] = new Array ("https://static.zdassets.com");

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
      switch (which) {
        case 0:
          accounts_google.innerHTML = failed;
          applyRandEffects(accounts_google, "shake");
          failed_webpages.push(url);
          break;
        case 1:
          apis_google.innerHTML = failed;
          applyRandEffects(apis_google, "shake");
          failed_webpages.push(url);
          break;
        case 2:
          app_castify.innerHTML = failed;
          applyRandEffects(app_castify, "shake");
          failed_webpages.push(url);
          break;
        case 3:
          askcastify_zendesk.innerHTML = failed;
          applyRandEffects(askcastify_zendesk, "shake");
          failed_webpages.push(url);
          break;
        case 4:
          google_analytics.innerHTML = failed;
          applyRandEffects(google_analytics, "shake");
          failed_webpages.push(url);
          break;
        case 5:
          googleapis.innerHTML = failed;
          applyRandEffects(googleapis, "shake");
          failed_webpages.push(url);
          break;
        case 6:
          googleusercontent.innerHTML = failed;
          applyRandEffects(googleusercontent, "shake");
          failed_webpages.push(url);
          break;
        case 7:
          fonts_gstatic.innerHTML = failed;
          applyRandEffects(fonts_gstatic, "shake");
          failed_webpages.push(url);
          break;
        case 8:
          pendo.innerHTML = failed;
          applyRandEffects(pendo, "shake");
          failed_webpages.push(url);
          break;
        case 9:
          static_zdassets.innerHTML = failed;
          applyRandEffects(static_zdassets, "shake");
          failed_webpages.push(url);
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
  if (accounts_google.innerHTML = checking) { accounts_google.innerHTML = passed; applyRandEffects(accounts_google, "bounce"); }
  if (apis_google.innerHTML = checking) { apis_google.innerHTML = passed; applyRandEffects(apis_google, "bounce"); }
  if (app_castify.innerHTML = checking) { app_castify.innerHTML = passed; applyRandEffects(app_castify, "bounce"); }
  if (askcastify_zendesk.innerHTML = checking) { askcastify_zendesk.innerHTML = passed; applyRandEffects(askcastify_zendesk, "bounce"); }
  if (google_analytics.innerHTML = checking) { google_analytics.innerHTML = passed; applyRandEffects(google_analytics, "bounce"); }
  if (googleapis.innerHTML = checking) { googleapis.innerHTML = passed; applyRandEffects(googleapis, "bounce"); }
  if (googleusercontent.innerHTML = checking) { googleusercontent.innerHTML = passed; applyRandEffects(googleusercontent, "bounce"); }
  if (fonts_gstatic.innerHTML = checking) { fonts_gstatic.innerHTML = passed; applyRandEffects(fonts_gstatic, "bounce"); }
  if (pendo.innerHTML = checking) { pendo.innerHTML = passed; applyRandEffects(pendo, "bounce"); }
  if (static_zdassets.innerHTML = checking) { static_zdassets.innerHTML = passed; applyRandEffects(static_zdassets, "bounce"); }
}

function changeBorderColor(id) {
  var load = setTimeout(function() {
    document.getElementById(id).className = "input";
  }, 5000);
  document.getElementById(id).className = "inputred";
}

document.getElementById("help").addEventListener(
  "click",
  function () {
    window.open(help_url, '_blank');
  },
  false
);

document.getElementById("restart").addEventListener(
  "click",
  function () {
    window.location.reload();
  },
  false
);

// Listen for click on the title of the page then download the file
document.getElementById("click_test").addEventListener(
  "click",
  function () {
    if (downloaded == true) {
      window.location.reload();
    } else {
      var missing_details_alert = "Please input the download, jitter, ping and upload values into the boxes below, once the internet speed test has completed.";
      if ((upload.value == "") || (download.value == "") || (jitter.value == "") || (ping.value == "")) {
        if (!alert(missing_details_alert)) {
          if (upload.value == "") changeBorderColor("upload_speed");
          if (download.value == "") changeBorderColor("download_speed");
          if (jitter.value == "") changeBorderColor("jitter_speed");
          if (ping.value == "") changeBorderColor("ping_speed");
        }                
      } else {
        // Remove the iframe before downloading since we can't get the data anyhow (CORS)
        var frame = document.getElementById("speedtest");
        frame.parentNode.removeChild(frame);

        upload_label.innerHTML = upload.value + " Mbps";
        download_label.innerHTML = download.value + " Mbps";
        jitter_label.innerHTML = jitter.value + " ms";
        ping_label.innerHTML = ping.value + " ms";
        // Temporarily remove the buttons and HR elements as we don't need on resulting HTML download
        document.getElementById("click_test").style.display="none";
        document.getElementById("help").style.display="none";
        document.getElementById("restart").style.display="none";
        document.getElementById("hr-system-info").style.display="none";
        document.getElementById("hr-at-the-bottom").style.display="none";
        document.getElementById("hr-title-nav").style.display="none";
        
        if (failed_webpages.length > 0) {
          var failed_list = "";
          failed_title.innerHTML = "Failed URLs";
          for (var i = 0; i < failed_webpages.length; i++) {
            failed_list += failed_webpages[i] + "\n"
          }
          failed_label.innerHTML = failed_list;
        }
        
        var timestamp = new Date().toISOString();
        var scrape = document.body.innerHTML;

        var fileName = "screencastify-ts-" + timestamp + ".html";
        const a = document.createElement("a");
        const file = new Blob([scrape], { type: "text/plain" });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        downloaded = true;
        document.getElementById("restart").style.display="block";
        document.getElementById("help").style.display="block";
      }
    }
  },
  false
);

get_IP();
os_label.innerHTML = window.navigator.platform;
browser_label.innerHTML = browser;
get_browser_version();
if (!isCanvasSupported()) { 
  canvas_label.style.color = 'red';
  canvas_label.innerHTML = "Not Supported"; 
} else { 
  canvas_label.style.color = 'black';
  canvas_label.innerHTML = "Supported";
}
cpu_label.innerHTML = navigator.hardwareConcurrency + " logical cores";
ram_label.innerHTML = navigator.deviceMemory + " GBs";
screen_label.innerHTML = screen.height + " x " + screen.width + " pixels";
res_label.innerHTML = window.screen.availHeight + " x " + window.screen.availWidth + " pixels";
cookies_enabled();
zoom_label.innerHTML = zoom + "%";
downlink_label.innerHTML = navigator.connection.downlink + " (et: " + navigator.connection.effectiveType + ")";
user_label.innerHTML = navigator.userAgent;
network_checks();
