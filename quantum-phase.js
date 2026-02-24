/* =====================
   3D BLOCH SPHERE VISUAL
===================== */

const container = document.getElementById("bloch3dContainer");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(400, 400);
container.appendChild(renderer.domElement);

camera.position.z = 3;

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x4f46e5,
  wireframe: true,
  transparent: true,
  opacity: 0.8
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Axes
const axesHelper = new THREE.AxesHelper(1.5);
scene.add(axesHelper);

// State vector with glow
const arrowGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xef4444 });
const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
arrow.position.set(0, 1, 0);
scene.add(arrow);

// Add particles for unique effect
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 100;
const positions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 4;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial({ color: 0x10b981, size: 0.02 });
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

let theta = Math.PI / 2;
let phi = 0;
let noise = 0;
let energy = 1;

const phaseSlider = document.getElementById("phaseSlider");
const phaseValue = document.getElementById("phaseValue");
const thetaSlider = document.getElementById("thetaSlider");
const thetaValue = document.getElementById("thetaValue");
const energySlider = document.getElementById("energySlider");
const noiseSlider = document.getElementById("noiseSlider");
const noiseCanvas = document.getElementById("noiseCanvas");
const nctx = noiseCanvas.getContext("2d");

function updateBloch() {
  const noisyPhi = phi + (Math.random() - 0.5) * noise * 0.1;
  const x = Math.sin(theta) * Math.cos(noisyPhi);
  const y = Math.cos(theta);
  const z = Math.sin(theta) * Math.sin(noisyPhi);

  arrow.position.set(x, y, z);
  arrow.lookAt(0, 0, 0);
  arrow.rotateX(Math.PI / 2);

  // Animate particles
  const positions = particlesGeometry.attributes.position.array;
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 1] += 0.01 * Math.sin(Date.now() * 0.001 + i);
  }
  particlesGeometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}

thetaSlider.oninput = () => {
  theta = thetaSlider.value * Math.PI / 180;
  thetaValue.textContent = thetaSlider.value + "°";
  updateBloch();
};

phaseSlider.oninput = () => {
  phi = phaseSlider.value * Math.PI / 180;
  phaseValue.textContent = phaseSlider.value + "°";
  updateBloch();
};

energySlider.oninput = () => {
  energy = parseFloat(energySlider.value);
};

noiseSlider.oninput = () => {
  noise = parseFloat(noiseSlider.value);
  nctx.clearRect(0, 0, 320, 120);
  for (let i = 0; i < 100; i++) {
    const n = (Math.random() - 0.5) * noise * 100;
    nctx.fillRect(i * 3, 60 + n, 2, 2);
  }
  updateBloch();
};

function animate() {
  requestAnimationFrame(animate);
  // Phase evolution based on energy
  phi += energy * 0.01;
  phaseSlider.value = (phi * 180 / Math.PI) % 360;
  phaseValue.textContent = Math.round((phi * 180 / Math.PI) % 360) + "°";
  updateBloch();
}
animate();

// Initial update
updateBloch();

/* =====================
   QUIZ
===================== */

const questions = [
  {
    question: "Does changing the phase (φ) directly change the measurement probability of |0⟩ or |1⟩?",
    answer: false, // No
    explanation: "Phase affects interference and evolution, not direct probabilities. Probabilities depend on |α|² and |β|²."
  },
  {
    question: "In the Bloch sphere, does θ control the superposition angle?",
    answer: true, // Yes
    explanation: "θ determines how much the state is a mix of |0⟩ and |1⟩. φ controls the phase rotation."
  },
  {
    question: "Does increasing noise in the simulator cause more decoherence?",
    answer: true, // Yes
    explanation: "Noise adds random perturbations, simulating real quantum decoherence that destroys phase information."
  },
  {
    question: "Does the Hamiltonian energy slider affect how fast the phase evolves over time?",
    answer: true, // Yes
    explanation: "Higher energy speeds up phase accumulation, as per |ψ(t)⟩ = e^{-iHt/ℏ}|ψ(0)⟩."
  },
  {
    question: "Can phase be measured directly in quantum systems?",
    answer: false, // No
    explanation: "Phase is relative and requires interference (like in QPE) to measure. Direct measurement collapses to |0⟩ or |1⟩."
  }
];

let currentQuestion = 0;

const questionText = document.getElementById("questionText");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");

function loadQuestion() {
  if (currentQuestion < questions.length) {
    questionText.textContent = questions[currentQuestion].question;
    optionA.textContent = "Yes";
    optionB.textContent = "No";
    feedback.textContent = "";
    feedback.className = "feedback";
    progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  } else {
    questionText.textContent = "Quiz Complete! Great job exploring quantum phase.";
    optionA.style.display = "none";
    optionB.style.display = "none";
    feedback.textContent = "You've learned about phase, Bloch sphere, and evolution!";
    feedback.className = "feedback correct";
    progress.textContent = "";
  }
}

optionA.onclick = () => checkAnswer(true);
optionB.onclick = () => checkAnswer(false);

function checkAnswer(userAnswer) {
  const correct = questions[currentQuestion].answer === userAnswer;
  feedback.textContent = correct ? "✅ Correct! " + questions[currentQuestion].explanation : "❌ Incorrect. " + questions[currentQuestion].explanation;
  feedback.className = correct ? "feedback correct" : "feedback wrong";
  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 3000); // Show feedback for 3 seconds, then next
}

loadQuestion();

/* =====================
   NOTEBOOK
===================== */
function runNotebook() {
  const code = document.getElementById("notebookCell").value;
  const output = document.getElementById("notebookOutput");
  try {
    const result = eval(code);
    output.textContent = "Output: " + JSON.stringify(result, null, 2);
  } catch (e) {
    output.textContent = "Error: " + e.message;
  }
}

function toggleBlochSize() {
  const container = document.getElementById("bloch3dContainer");
  const currentWidth = container.clientWidth;
  if (currentWidth === 400) {
    container.style.width = "600px";
    container.style.height = "600px";
    renderer.setSize(600, 600);
    camera.aspect = 1;
  } else {
    container.style.width = "400px";
    container.style.height = "400px";
    renderer.setSize(400, 400);
    camera.aspect = 1;
  }
  camera.updateProjectionMatrix();
}

// VS hover
const vs = document.getElementById('vs');
const profilePhoto = document.getElementById('profilePhoto');
if (vs && profilePhoto) {
  vs.addEventListener('mouseenter', () => {
    profilePhoto.style.display = 'block';
  });
  vs.addEventListener('mouseleave', () => {
    profilePhoto.style.display = 'none';
  });
}

// Fullscreen toggle
let isFullscreenMode = false;
function toggleFullscreenMode() {
  const body = document.body;
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const backBtn = document.querySelector('.global-back-btn');
  const blochSection = document.querySelector('section:nth-of-type(2)'); // Bloch sphere section
  const controls = document.querySelectorAll('.controls')[0]; // Bloch controls
  const hamiltonianSection = document.querySelector('section:nth-of-type(3)'); // Hamiltonian section

  if (!isFullscreenMode) {
    // Enter fullscreen: hide header, back button, main except Bloch, controls, Hamiltonian
    if (header) header.style.display = 'none';
    if (backBtn) backBtn.style.display = 'none';
    if (main) {
      Array.from(main.children).forEach(child => {
        if (child !== blochSection && child !== hamiltonianSection) child.style.display = 'none';
      });
    }
    body.style.display = 'flex';
    body.style.flexDirection = 'row';
    body.style.alignItems = 'center';
    body.style.justifyContent = 'center';
    body.style.padding = '10px'; // Reduced padding
    // Left: Bloch and Hamiltonian stacked
    const leftContainer = document.createElement('div');
    leftContainer.style.display = 'flex';
    leftContainer.style.flexDirection = 'column';
    leftContainer.appendChild(blochSection);
    leftContainer.appendChild(hamiltonianSection);
    body.appendChild(leftContainer);
    // Right: controls
    body.appendChild(controls);
    controls.style.flex = '1';
    controls.style.marginLeft = '20px';

    // Add exit button
    // Add exit button
    const exitBtn = document.createElement('button');
    exitBtn.textContent = 'Exit Fullscreen';
    exitBtn.onclick = toggleFullscreenMode;
    exitBtn.className = 'fullscreen-exit-btn'; // Use class instead of inline styles
    body.appendChild(exitBtn);

    isFullscreenMode = true;
  } else {
    // Exit
    if (header) header.style.display = 'flex';
    if (backBtn) backBtn.style.display = 'block';
    if (main) {
      Array.from(main.children).forEach(child => {
        child.style.display = 'block';
      });
    }
    // Remove added containers and exit button
    const added = body.querySelectorAll('div:not(.global-back-btn):not(header):not(main), button[onclick="toggleFullscreenMode()"]');
    added.forEach(el => el.remove());
    // Reset body styles
    body.style.cssText = '';
    controls.style.cssText = '';
    blochSection.style.cssText = '';
    hamiltonianSection.style.cssText = '';
    isFullscreenMode = false;
  }
}

// ESC to exit
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isFullscreenMode) {
    toggleFullscreenMode();
  }
});
