const sim = document.getElementById("simContainer");

function openFullscreen() {
  if (sim.requestFullscreen) {
    sim.requestFullscreen();
  } else if (sim.webkitRequestFullscreen) {
    sim.webkitRequestFullscreen();
  } else if (sim.msRequestFullscreen) {
    sim.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
const sideBrand = document.getElementById("sideBrand");

/* Hide logo in fullscreen */
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    sideBrand.style.display = "none";
  } else {
    sideBrand.style.display = "flex";
  }
});

/* Safari support */
document.addEventListener("webkitfullscreenchange", () => {
  if (document.webkitFullscreenElement) {
    sideBrand.style.display = "none";
  } else {
    sideBrand.style.display = "flex";
  }
});
