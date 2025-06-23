const lowpolyThemes = ["glassmorphism"];
let lowpolyScript = null;

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
  lowpolyScript.src = "Generic/static/js/lowpoly-bg.js";
  lowpolyScript.id = "lowpoly-script";

  lowpolyScript.onload = () => {
    if (window.runLowpoly) {
      console.log("[background.js] Running lowpoly...");
      window.runLowpoly();
    } else {
      console.warn("[background.js] runLowpoly() not found after script load.");
    }
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
  let removedCount = 0;
  canvases.forEach(c => {
    const style = getComputedStyle(c);
    if (style.position === "fixed" && style.zIndex === "-1") {
      c.remove();
      removedCount++;
    }
  });
  if (removedCount > 0) {
    console.log(`[background.js] Removed ${removedCount} background canvas${removedCount > 1 ? "es" : ""}.`);
  }

  if (window.p5 && window.p5.instance) {
    try {
      window.p5.instance.remove();
      console.log("[background.js] Removed p5 instance.");
    } catch (e) {
      console.warn("[background.js] Failed to remove p5 instance:", e);
    }
  }
}

function handleThemeChange() {
  const theme = getThemeName();
  if (!theme) {
    console.warn("[background.js] No valid theme detected.");
    return;
  }

  if (lowpolyThemes.includes(theme)) {
    console.log(`[background.js] Theme "${theme}" supports lowpoly — enabling.`);
    loadLowpoly();
  } else {
    console.log(`[background.js] Theme "${theme}" does not use lowpoly — disabling.`);
    removeLowpoly();
  }
}

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

window.addEventListener("DOMContentLoaded", monitorTheme);
