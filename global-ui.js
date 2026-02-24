const backBtn = document.querySelector(".global-back-btn");

function goBackGlobal() {
  const path = window.location.pathname;
  if (path.includes('quantum-phase-advanced')) {
    window.location.href = '../index.html';
  } else {
    window.location.href = 'index.html';
  }
}

// Disable on first page
window.addEventListener("load", () => {
  if (backBtn && window.history.length <= 1) {
    backBtn.classList.add("hidden");
  }
});

// Auto-hide in fullscreen
function handleFullscreen() {
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  ) {
    backBtn.classList.add("hidden");
  } else {
    if (window.history.length > 1) {
      backBtn.classList.remove("hidden");
    }
  }
}

document.addEventListener("fullscreenchange", handleFullscreen);
document.addEventListener("webkitfullscreenchange", handleFullscreen);
document.addEventListener("msfullscreenchange", handleFullscreen);

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (
    e.target.tagName === "INPUT" ||
    e.target.tagName === "TEXTAREA"
  ) return;

  if (e.key === "Backspace" || e.key === "Escape") {
    e.preventDefault();
    goBackGlobal();
  }
});
