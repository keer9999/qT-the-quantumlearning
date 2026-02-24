/* ================= VIDEO FULLSCREEN ================= */
function toggleVideoFullscreen() {
  const video = document.querySelector(".video-container");
  if (!document.fullscreenElement) video.requestFullscreen();
  else document.exitFullscreen();
}

/* ================= BLOCH SETUP FUNCTION ================= */
function createBloch(containerId, noisy = false) {

  const container = document.getElementById(containerId);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(320, 320);
  container.appendChild(renderer.domElement);
  camera.position.z = 3;

  scene.add(new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({ wireframe: true })
  ));

  scene.add(new THREE.AxesHelper(1.5));

  const arrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, 0),
    1.2,
    noisy ? 0xff0000 : 0x22c55e,
    0.2,
    0.12
  );
  scene.add(arrow);

  let theta = Math.PI / 4;
  let phi = 0;

  return {
    update(noiseLevel) {
      if (noisy) {
        theta += (Math.random() - 0.5) * noiseLevel * 0.01;
        phi += (Math.random() - 0.5) * noiseLevel * 0.02;
      }

      const shrink = noisy ? Math.max(0.3, 1 - noiseLevel * 0.01) : 1;

      arrow.setLength(1.2 * shrink);

      arrow.setDirection(new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
        Math.cos(theta)
      ));

      renderer.render(scene, camera);
    }
  };
}

/* ================= CREATE BOTH ================= */
const ideal = createBloch("idealBloch", false);
const noisy = createBloch("noisyBloch", true);

const slider = document.getElementById("noiseSlider");

function animate() {
  requestAnimationFrame(animate);
  const noise = parseInt(slider.value);
  ideal.update(0);
  noisy.update(noise);
}
animate();
