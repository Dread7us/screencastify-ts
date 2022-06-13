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
var upload = document.getElementById("upload_speed");
var download = document.getElementById("download_speed");
var jitter = document.getElementById("jitter_speed");
var ping = document.getElementById("ping_speed");
var upload_label = document.getElementById("upload");
var download_label = document.getElementById("download");
var jitter_label = document.getElementById("jitter");
var ping_label = document.getElementById("ping");
// This will tell us if the user has zoomed in or out (100% means no zoom)
var zoom = Math.round(
  (window.outerWidth / window.document.documentElement.clientWidth) * 100
);
var downloaded = false;
var help_url = "https://learn.screencastify.com/hc/en-us/articles/6000436901143-Diagnostic-Tool";

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

var web_pages = new Array ();
web_pages[0] = new Array ("https://screencastify.com", 
                          "https://api.screencastify.com/images/cleardot.gif", 
                          "https://umbrella.svc.screencastify.com");
web_pages[1] = new Array ("https://dental2-test.firebaseapp.com", 
                          "https://castify-storage.firebaseapp.com");
web_pages[2] = new Array ("https://webconf.firebaseio.com/favicon.ico");
web_pages[3] = new Array ("https://sentry.io");
web_pages[4] = new Array ("https://firestore.googleapis.com", 
                          "https://firebasestorage.googleapis.com", 
                          "https://firebase.googleapis.com/v1beta1/availableProjects", 
                          "https://www.googleapis.com/drive/v2/files/");
web_pages[5] = new Array ("https://lh3.googleusercontent.com/favicon.ico");
web_pages[6] = new Array ("https://pendo.io");
web_pages[7] = new Array ("https://google-analytics.com");
web_pages[8] = new Array ("https://fonts.gstatic.com/s/sourcesanspro/v19/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdu3cOWxw.woff2", 
                          "https://fonts.gstatic.com");
web_pages[9] = new Array ("https://apis.google.com/js/api.js", 
                          "https://apis.google.com");

function checkURL(url, which) {
  fetch(url, { mode: "no-cors" })
    .then((r) => {
      // Nothing to do
    })
    .catch((e) => {
      //console.log(e);
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

function network_checks() {
  for (var i = 0; i < web_pages.length; i++) {
    for (var j = 0; j < web_pages[i].length; j++) {
      checkURL(web_pages[i][j], i);
    }
  }
  if (screencastify_check.innerHTML = "Checking...") { screencastify_check.innerHTML = "Passed" }
  if (firebaseapp_check.innerHTML = "Checking...") { firebaseapp_check.innerHTML = "Passed" }
  if (firebaseio_check.innerHTML = "Checking...") { firebaseio_check.innerHTML = "Passed" }
  if (sentry_check.innerHTML = "Checking...") { sentry_check.innerHTML = "Passed" }
  if (googleapis_check.innerHTML = "Checking...") { googleapis_check.innerHTML = "Passed" }
  if (googleusercontent_check.innerHTML = "Checking...") { googleusercontent_check.innerHTML = "Passed" }
  if (pendo_check.innerHTML = "Checking...") { pendo_check.innerHTML = "Passed" }
  if (analytics_check.innerHTML = "Checking...") { analytics_check.innerHTML = "Passed" }
  if (gstatic_check.innerHTML = "Checking...") { gstatic_check.innerHTML = "Passed" }
  if (apis_check.innerHTML = "Checking...") { apis_check.innerHTML = "Passed" }
}

function changeBorderColor(id) {
  var load = setTimeout(function() {
    //document.getElementById(id).style.border = "1px solid #ddd";
    document.getElementById(id).className = "input";
  }, 5000);
  //document.getElementById(id).style.border = "1px solid Red";
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
        // Temporarily remove the buttons as we don't need on resulting HTML download
        document.getElementById("click_test").style.display="none";
        document.getElementById("help").style.display="none";
        document.getElementById("restart").style.display="none";

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
cpu_label.innerHTML = navigator.hardwareConcurrency + " logical cores";
ram_label.innerHTML = navigator.deviceMemory + " GBs";
screen_label.innerHTML = screen.height + " x " + screen.width + " pixels";
res_label.innerHTML = window.screen.availHeight + " x " + window.screen.availWidth + " pixels";
cookies_enabled();
zoom_label.innerHTML = zoom + "%";
downlink_label.innerHTML = navigator.connection.downlink + " (et: " + navigator.connection.effectiveType + ")";
user_label.innerHTML = navigator.userAgent;
network_checks();
