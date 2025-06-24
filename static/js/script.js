// === GLOBAL ===
const lowpolyThemes = ["glassmorphism"];
let lowpolyScript = null;
const textureFolder = "static/images/textures/";
const overlayId = "texture-overlay";

// === GRAFFITI FX ===
const graffitiDripId = "graffiti-drip-img";
const graffitiAnimId = "graffiti-anim-canvas";

// Inject graffiti drip image below header
function injectGraffitiDrip() {
  if (!document.getElementById(graffitiDripId)) {
    const dripImg = document.createElement("img");
    dripImg.id = graffitiDripId;
    dripImg.src = "/static/images/drip.png"; // <-- your PNG drip location
    dripImg.alt = "";
    dripImg.style = "display:block; width:100%; max-width:900px; margin:0 auto; pointer-events:none; z-index:20; position:relative;";
    // Place after header
    const header = document.querySelector("header");
    if (header) header.insertAdjacentElement("afterend", dripImg);
  }
}
function removeGraffitiDrip() {
  document.getElementById(graffitiDripId)?.remove();
}

// Inject animated graffiti spray canvas
function injectGraffitiAnim() {
  if (!document.getElementById(graffitiAnimId)) {
    const canvas = document.createElement("canvas");
    canvas.id = graffitiAnimId;
    canvas.style = "position:fixed; pointer-events:none; z-index:9; top:0; left:0; width:100vw; height:100vh;";
    document.body.appendChild(canvas);
    startGraffitiSpray(canvas);
  }
}
function removeGraffitiAnim() {
  document.getElementById(graffitiAnimId)?.remove();
}

// Minimal animated spray mist (pure JS, no deps)
function startGraffitiSpray(canvas) {
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  let mist = [];
  for (let i = 0; i < 28; i++) {
    mist.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 220 + 10,
      r: Math.random() * 32 + 18,
      color: Math.random() > 0.6 ? 'rgba(249,77,124,0.13)' : 'rgba(34,244,199,0.10)',
      dx: (Math.random() - 0.5) * 1.2,
      dy: Math.random() * 0.4 + 0.1,
      dr: Math.random() * 0.07 - 0.03
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let m of mist) {
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fillStyle = m.color;
      ctx.filter = 'blur(1.2px)';
      ctx.fill();
      ctx.filter = 'none';
      m.x += m.dx;
      m.y += m.dy;
      m.r += m.dr;
      if (m.y > window.innerHeight || m.x < -40 || m.x > window.innerWidth + 40) {
        m.x = Math.random() * window.innerWidth;
        m.y = Math.random() * 140 + 10;
        m.r = Math.random() * 22 + 12;
      }
    }
    if (document.getElementById(graffitiAnimId)) {
      requestAnimationFrame(draw);
    }
  }
  draw();
}

// === INIT EVERYTHING ON DOMContentLoaded ===
document.addEventListener("DOMContentLoaded", () => {
  // === Background Color Picker ===
  const bgPickr = Pickr.create({
    el: "#color-picker-container",
    theme: "classic",
    default: "rgba(255, 255, 255, 1)",
    swatches: ["#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff"],
    components: {
      preview: true,
      opacity: true,
      hue: true,
      interaction: {
        input: true,
        save: true
      }
    }
  });

  bgPickr.on("save", (color) => {
    const rgba = color.toRGBA().toString();
    document.body.style.backgroundColor = rgba;
  });

  // === Font Color Picker ===
  const fontPickr = Pickr.create({
    el: "#font-color-picker-container",
    theme: "classic",
    default: "#1a1a1a",
    swatches: ["#000000", "#ffffff", "#1a1a1a", "#ff0000", "#00ff00", "#0000ff"],
    components: {
      preview: true,
      opacity: true,
      hue: true,
      interaction: {
        input: true,
        save: true
      }
    }
  });

  fontPickr.on("save", (color) => {
    const hex = color.toHEXA().toString();
    document.body.style.color = hex;
    document.querySelectorAll("h1, h2, nav a, .card h2").forEach(el => el.style.color = hex);
  });

  // === Image BG Dropdown ===
  const imageBackgrounds = [
    { file: "neo.png", label: "Neo" },
    { file: "cyber.png", label: "Cyberpunk" },
    { file: "70s.png", label: "70s Retro" },
    { file: "chalk.png", label: "Chalkboard" },
    { file: "landscape01.png", label: "Landscape 01" },
    { file: "landscape02.png", label: "Landscape 02" },
    { file: "landscape03.png", label: "Landscape 03" },
    { file: "landscape05.png", label: "Landscape 05" },
    { file: "landscape06.png", label: "Landscape 06" },
    { file: "landscape07.png", label: "Landscape 07" },
    { file: "landscape08.png", label: "Landscape 08" },
    { file: "landscape09.png", label: "Landscape 09" },
    { file: "landscape10.png", label: "Landscape 10" },
    { file: "landscape11.png", label: "Landscape 11" },
    { file: "landscape12.png", label: "Landscape 12" },
    { file: "landscape13.png", label: "Landscape 13" },
    { file: "landscape14.png", label: "Landscape 14" }
  ];

  const imageSelect = document.getElementById("image-bg-dropdown");
  if (imageSelect) {
    imageBackgrounds.forEach(img => {
      const option = document.createElement("option");
      option.value = img.file;
      option.textContent = img.label;
      imageSelect.appendChild(option);
    });

    imageSelect.addEventListener("change", () => {
      const selected = imageSelect.value;
      if (!selected) {
        document.body.style.backgroundImage = "";
      } else {
        document.body.style.backgroundImage = `url('static/images/${selected}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
      }
    });
  }

  // === Texture Selector ===
  const textureSelect = document.getElementById("texture-switcher");
  if (textureSelect) {
    textureSelect.addEventListener("change", () => {
      setTexture(textureSelect.value);
    });
  }

  // === Theme Monitor ===
  monitorTheme();
});

// === LOWPOLY SCRIPT HANDLER ===
function getThemeName() {
  const href = document.getElementById("theme-style")?.href || "";
  const match = href.match(/\/([^\/]+)\.css$/);
  const theme = match ? match[1] : null;
  console.log("[background.js] Detected theme:", theme || "None");
  return theme;
}

function loadLowpoly() {
  if (lowpolyScript) {
    console.log("[background.js] Lowpoly script already loaded.");
    return;
  }

  console.log("[background.js] Loading lowpoly-bg.js...");

  lowpolyScript = document.createElement("script");
  lowpolyScript.type = "module";
  lowpolyScript.src = "static/js/lowpoly-bg.js";
  lowpolyScript.id = "lowpoly-script";

  lowpolyScript.onload = () => {
    if (window.runLowpoly) {
      console.log("[background.js] Running lowpoly...");
      window.runLowpoly();
    } else {
      console.warn("[background.js] runLowpoly() not found after script load.");
    }
  };

  lowpolyScript.onerror = (e) => {
    console.error("Failed to load lowpoly-bg.js", e);
  };

  document.body.appendChild(lowpolyScript);
}

function removeLowpoly() {
  const script = document.getElementById("lowpoly-script");
  if (script) {
    console.log("[background.js] Removing lowpoly script.");
    script.remove();
    lowpolyScript = null;
  }

  const canvases = document.querySelectorAll("canvas");
  canvases.forEach(c => {
    const style = getComputedStyle(c);
    if (style.position === "fixed" && style.zIndex === "-1") {
      c.remove();
    }
  });

  if (window.p5 && window.p5.instance) {
    try {
      window.p5.instance.remove();
      console.log("[background.js] Removed p5 instance.");
    } catch (e) {
      console.warn("[background.js] Failed to remove p5 instance:", e);
    }
  }
}

// === THEME HANDLER (LOWPOLY & GRAFFITI) ===
function handleThemeChange() {
  const theme = getThemeName();
  if (!theme) {
    console.warn("[background.js] No valid theme detected.");
    return;
  }

  if (lowpolyThemes.includes(theme)) {
    console.log(`[background.js] Theme "${theme}" supports lowpoly — enabling.`);
    loadLowpoly();
    removeGraffitiDrip();
    removeGraffitiAnim();
  } else if (theme === "graffiti") {
    console.log(`[background.js] Theme "${theme}" enables graffiti effects.`);
    removeLowpoly();
    injectGraffitiDrip();
    injectGraffitiAnim();
  } else {
    console.log(`[background.js] Theme "${theme}" disables lowpoly and graffiti effects.`);
    removeLowpoly();
    removeGraffitiDrip();
    removeGraffitiAnim();
  }
}

// === THEME MONITOR ===
function monitorTheme() {
  const link = document.getElementById("theme-style");
  if (!link) {
    console.error("[background.js] theme-style link not found.");
    return;
  }

  console.log("[background.js] Monitoring theme changes...");
  handleThemeChange();

  const observer = new MutationObserver(() => {
    console.log("[background.js] Theme href changed.");
    handleThemeChange();
  });

  observer.observe(link, { attributes: true, attributeFilter: ["href"] });
}

// === TEXTURE HELPER ===
function setTexture(filename) {
  removeTexture();
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
  overlay.style.opacity = "1.2";
  overlay.style.mixBlendMode = "darken";

  document.body.appendChild(overlay);
}

function removeTexture() {
  document.getElementById(overlayId)?.remove();
}
