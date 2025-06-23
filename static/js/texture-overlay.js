const textureFolder = "Generic/static/images/textures/";
const overlayId = "texture-overlay";

function setTexture(filename) {
  removeTexture(); // clear any existing

  if (!filename) return;

  const overlay = document.createElement("div");
  overlay.id = overlayId;
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.zIndex = "-1";
  overlay.style.pointerEvents = "none";
  overlay.style.backgroundImage = `url('${textureFolder}${filename}')`;
  overlay.style.backgroundRepeat = "repeat";
  overlay.style.opacity = "1.2"; // You can tweak this
  overlay.style.mixBlendMode = "darken"; // Try "multiply", "darken", etc.
  document.body.appendChild(overlay);
}

function removeTexture() {
  document.getElementById(overlayId)?.remove();
}

function initTextureSelector() {
  const selector = document.getElementById("texture-switcher");
  if (!selector) return;

  selector.addEventListener("change", () => {
    setTexture(selector.value);
  });
}

window.addEventListener("DOMContentLoaded", initTextureSelector);
