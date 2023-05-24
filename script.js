var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");

// Add this before creating Unity instance.
function resizeCanvas() {
    // Aspect ratio of the game. Change it according to your needs.
    var gameAspectRatio = 960 / 600;

    // Get the container width and height.
    var containerWidth = container.offsetWidth;
    var containerHeight = container.offsetHeight;

    // Calculate the new game width and height to fit the container while maintaining the aspect ratio.
    var newGameWidth = containerWidth;
    var newGameHeight = containerWidth / gameAspectRatio;

    if (newGameHeight > containerHeight) {
        newGameWidth = containerHeight * gameAspectRatio;
        newGameHeight = containerHeight;
    }

    // Set the canvas width and height.
    canvas.style.width = newGameWidth + 'px';
    canvas.style.height = newGameHeight + 'px';
}

// Listen to the resize event.
window.addEventListener('resize', resizeCanvas);

// Call the function to initially set the canvas size.
resizeCanvas();

// The rest of your code...

var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var fullscreenButton = document.querySelector("#unity-fullscreen-button");
var warningBanner = document.querySelector("#unity-warning");

function unityShowBanner(msg, type) {
  function updateBannerVisibility() {
    warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
  }
  var div = document.createElement('div');
  div.innerHTML = msg;
  warningBanner.appendChild(div);
  if (type == 'error') div.style = 'background: red; padding: 10px;';
  else {
    if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
    setTimeout(function() {
      warningBanner.removeChild(div);
      updateBannerVisibility();
    }, 5000);
  }
  updateBannerVisibility();
}

var buildUrl = "Build";
var loaderUrl = buildUrl + "/Flap Flap Birdy build 1 uncmprsd 7.5g 21Flap 4Thresh.loader.js";
var config = {
  dataUrl: buildUrl + "/Flap Flap Birdy build 1 uncmprsd 7.5g 21Flap 4Thresh.data",
  frameworkUrl: buildUrl + "/Flap Flap Birdy build 1 uncmprsd 7.5g 21Flap 4Thresh.framework.js",
  codeUrl: buildUrl + "/Flap Flap Birdy build 1 uncmprsd 7.5g 21Flap 4Thresh.wasm",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "ScienceHutch",
  productName: "Flap Flap Birdy Flap",
  productVersion: "1.0",
  showBanner: unityShowBanner,
};

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  var meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
  document.getElementsByTagName('head')[0].appendChild(meta);
  container.className = "unity-mobile";
  canvas.className = "unity-mobile";

  unityShowBanner('WebGL builds are not supported on mobile devices.');
} else {
  canvas.style.width = "960px";
  canvas.style.height = "600px";
}

loadingBar.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFull.style.width = 100 * progress + "%";
  }).then((unityInstance) => {
    loadingBar.style.display = "none";
    fullscreenButton.onclick = () => {
      unityInstance.SetFullscreen(1);
    };
  }).catch((message) => {
    alert(message);
  });
};
document.body.appendChild(script);
