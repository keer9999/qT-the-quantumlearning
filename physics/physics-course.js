const courseData = {
    modules: [
        {
            id: 'module1',
            title: 'Module 1: The Nature of Reality',
            steps: [
                {
                    id: 'step1',
                    title: 'What is a Wave?',
                    subtitle: 'Understanding frequency, amplitude, and wavelength',
                    icon: '🌊',
                    visualizer: 'visualizeWave',
                    explanation: `
                        <h3>The Fundamental Motion</h3>
                        <p>Before we can understand quantum mechanics, we must understand waves. A wave is a disturbance that travels through space and time, transferring energy without transferring matter.</p>
                        <p>Key properties of waves include:</p>
                        <ul>
                            <li><strong>Wavelength (λ)</strong>: The distance between two consecutive peaks.</li>
                            <li><strong>Frequency (f)</strong>: How many waves pass a point per second.</li>
                            <li><strong>Amplitude (A)</strong>: The height of the wave from its center.</li>
                        </ul>
                        <p>Use the sliders above to change these properties and see how the wave reacts in real-time.</p>
                    `
                },
                {
                    id: 'step2',
                    title: 'Particles vs. Waves',
                    subtitle: 'Two different ways energy moves',
                    icon: '🎾',
                    visualizer: 'visualizeParticles',
                    explanation: `
                        <h3>Distinct Behaviors</h3>
                        <p>Classically, particles and waves are very different. A particle (like a tennis ball) exists at a specific point in space. A wave is spread out.</p>
                        <p>When particles hit a barrier with two slits, they pass through one or the other, creating two distinct bands on the wall behind.</p>
                        <p>When waves hit the same barrier, they diffract and interfere, creating a complex pattern of bright and dark bands.</p>
                        <p><strong>Click the toggle</strong> above to switch between Particle Source and Wave Source.</p>
                    `
                },
                {
                    id: 'step3',
                    title: 'The Double Slit Experiment',
                    subtitle: 'The experiment that broke physics',
                    icon: '🔬',
                    visualizer: 'visualizeDoubleSlit',
                    explanation: `
                        <h3>The Quantum Mystery</h3>
                        <p>When we fire electrons (quantum particles) at the double slit, something strange happens. Even though they are particles, they form an <strong>interference pattern</strong> like waves!</p>
                        <p>This suggests that matter has wave-like properties. The electron goes through "both" slits at once, interferes with itself, and then lands as a particle.</p>
                        <p>This phenomenon is known as <strong>Wave-Particle Duality</strong>.</p>
                    `
                }
            ]
        },
        {
            id: 'module2',
            title: 'Module 2: Quantum Basics',
            steps: [
                {
                    id: 'step4',
                    title: 'Superposition',
                    subtitle: 'Existing in all states at once',
                    icon: '⚛️',
                    visualizer: 'visualizeSuperposition',
                    explanation: `
                        <h3>The Qubit</h3>
                        <p>A classical bit is either 0 or 1. A quantum bit (qubit) can be in a state of <strong>superposition</strong>, representing a combination of both 0 and 1 simultaneously.</p>
                        <p>Mathematically, we write this state as |ψ⟩ = α|0⟩ + β|1⟩.</p>
                        <p>The visual above shows the Bloch Sphere representation of a qubit. The vector can point anywhere on the surface, representing different superpositions.</p>
                    `
                },
                {
                    id: 'step5',
                    title: 'Measurement',
                    subtitle: 'Collapsing the wavefunction',
                    icon: '👁️',
                    visualizer: 'visualizeMeasurement',
                    explanation: `
                        <h3>The Collapse</h3>
                        <p>Superposition only lasts until we look. When we measure a qubit, nature forces it to "choose" a state: either 0 or 1.</p>
                        <p>This process is called <strong>Wavefunction Collapse</strong>. The probability of collapsing to 0 or 1 depends on the superposition state.</p>
                        <p><strong>Click "Measure"</strong> above to observe this purely random quantum process.</p>
                    `
                }
            ]
        },
        {
            id: 'module3',
            title: 'Module 3: Uncertainty & Measurement',
            steps: [
                {
                    id: 'step6',
                    title: 'Heisenberg Uncertainty',
                    subtitle: 'You cannot know everything',
                    icon: '📏',
                    visualizer: 'visualizeUncertainty',
                    explanation: `
                        <h3>The Fatal Trade-off</h3>
                        <p>Classical physics says we can measure a particle's position and speed (momentum) with infinite precision. Quantum mechanics says: <strong>Impossible</strong>.</p>
                        <p>The more precisely you know the <strong>Position (x)</strong>, the less you can know the <strong>Momentum (p)</strong>, and vice versa.</p>
                        <p>Use the slider to squeeze the particle's position. Watch how its momentum (speed) becomes wildly uncertain!</p>
                    `
                },
                {
                    id: 'step7',
                    title: 'The Observer Effect',
                    subtitle: 'Disturbing what you measure',
                    icon: '🔦',
                    visualizer: 'visualizeObserver',
                    explanation: `
                        <h3>Seeing is Disturbing</h3>
                        <p>To "see" an electron, you must bounce a photon off it. But the photon carries energy!</p>
                        <p>The act of measurement transfers energy to the electron, changing its path. In the quantum world, there is no such thing as a passive observer.</p>
                        <p><strong>Click the particle</strong> to send a photon and measure its position.</p>
                    `
                }
            ]
        },
        {
            id: 'module4',
            title: 'Module 4: Quantum Entanglement',
            steps: [
                {
                    id: 'step8',
                    title: 'Entangled Pairs',
                    subtitle: 'Spooky action at a distance',
                    icon: '🔗',
                    visualizer: 'visualizeEntanglement',
                    explanation: `
                        <h3>Connected Across the Universe</h3>
                        <p>Entanglement occurs when two particles become inextricably linked. If one particle is Spin UP, the other <strong>must</strong> be Spin DOWN.</p>
                        <p>This connection is instant, regardless of distance. Einstein called it "spooky action at a distance".</p>
                        <p><strong>Measure one particle</strong> and watch the other instantly collapse to the opposite state.</p>
                    `
                }
            ]
        },
        {
            id: 'module5',
            title: 'Module 5: Quantum Tunneling',
            steps: [
                {
                    id: 'step9',
                    title: 'The Potential Barrier',
                    subtitle: 'Walking through walls',
                    icon: '🧱',
                    visualizer: 'visualizeTunneling',
                    explanation: `
                        <h3>Impossible Physics</h3>
                        <p>In the classical world, if a ball doesn't have enough energy to roll over a hill, it rolls back. In the quantum world, it has a chance to <strong>tunnel straight through</strong>.</p>
                        <p>This happens because the particle is a wave. The wave function extends <em>inside</em> and <em>behind</em> the barrier.</p>
                        <p><strong>Watch the particles</strong>. Most reflect, but some miraculously pass through the barrier!</p>
                    `
                }
            ]
        },
        {
            id: 'module6',
            title: 'Module 6: Atomic Physics',
            steps: [
                {
                    id: 'step10',
                    title: 'The Bohr Model',
                    subtitle: 'Quantized energy levels',
                    icon: '🪐',
                    visualizer: 'visualizeAtomic',
                    explanation: `
                        <h3>The Quantum Jump</h3>
                        <p>Electrons in an atom can only exist at specific, discrete energy levels (n=1, n=2, etc.). They cannot exist in between.</p>
                        <p>To jump up a level, an electron absorbs a photon. To drop down, it emits one.</p>
                        <p><strong>Click the buttons</strong> to change the energy level and see the photon interaction.</p>
                    `
                },
                {
                    id: 'step11',
                    title: 'Quantum Orbitals',
                    subtitle: 'The shape of atoms',
                    icon: '☁️',
                    visualizer: 'visualizeOrbitals',
                    explanation: `
                        <h3>Beyond Orbits</h3>
                        <p>The Bohr model is simplified. In reality, electrons don't orbit like planets. They exist as 3D probability clouds called <strong>Orbitals</strong>.</p>
                        <p>Different energy states have different shapes: Sphere (s), Dumbbell (p), Clover (d).</p>
                        <p><strong>Select an orbital</strong> to see its 3D probability cloud generated in real-time.</p>
                    `
                }
            ]
        },
        {
            id: 'module7',
            title: 'Module 7: The Mathematics of Qubits',
            steps: [
                {
                    id: 'step12',
                    title: 'Two-Level Systems',
                    subtitle: 'Spins, Pits, and Polarization',
                    icon: '⇅',
                    visualizer: 'visualizeTwoLevel',
                    explanation: `
                        <h3>Universal Quantum Language</h3>
                        <p>A qubit isn't just a special computer chip. <strong>Any physical system with two distinct states</strong> can be a qubit.</p>
                        <p>Whether it's an electron with Spin Up/Down, an atom in Ground/Excited state, or a photon with polarization, they all map to the same mathematical states: <strong>|0⟩ and |1⟩</strong>.</p>
                        <p><strong>Select a system</strong> above to see how physical reality maps to quantum math.</p>
                    `
                },
                {
                    id: 'step13',
                    title: 'Normalization (The Rule of 1)',
                    subtitle: 'Probability must equal 100%',
                    icon: '📐',
                    visualizer: 'visualizeNormalization',
                    explanation: `
                        <h3>The Euclidean Norm</h3>
                        <p>Since a qubit exists in a superposition |ψ⟩ = α|0⟩ + β|1⟩, the probabilities of measuring 0 or 1 are given by |α|² and |β|² respectively.</p>
                        <p>Because the qubit <strong>must</strong> be found in one of these states, the total probability must be 100%. This leads to the fundamental constraint:</p>
                        <div style="background:#eef; padding:10px; border-radius:8px; text-align:center; font-weight:bold; color:#0057b8">|α|² + |β|² = 1</div>
                        <p><strong>Drag the vector</strong> to see how α and β change while always satisfying this rule.</p>
                    `
                }
            ]
        },
        {
            id: 'module8',
            title: 'Module 8: The Rules of Quantum Information',
            steps: [
                {
                    id: 'step14',
                    title: 'No-Cloning Theorem',
                    subtitle: 'Why you cannot copy a qubit',
                    icon: '🚫',
                    visualizer: 'visualizeNoCloning',
                    explanation: `
                        <h3>The Copy Protection of the Universe</h3>
                        <p>In classical computing, copying data (Ctrl+C, Ctrl+V) is trivial. In quantum mechanics, it is <strong>impossible</strong> to create an identical copy of an arbitrary unknown quantum state.</p>
                        <p>This is the <strong>No-Cloning Theorem</strong>. It ensures quantum cryptography is secure—because an eavesdropper cannot copy the key without disturbing it.</p>
                        <p><strong>Try to clone the qubit</strong> above and see what happens.</p>
                    `
                },
                {
                    id: 'step15',
                    title: 'Quantum Decoherence',
                    subtitle: 'The enemy of quantum computing',
                    icon: '🌫️',
                    visualizer: 'visualizeDecoherence',
                    explanation: `
                        <h3>Fragile States</h3>
                        <p>Quantum superposition is incredibly delicate. If a qubit interacts with the environment (heat, stray atoms, radiation), it "leaks" information and collapses into a classical state.</p>
                        <p>This process is called <strong>Decoherence</strong>. It's the main reason building quantum computers is so difficult.</p>
                        <p><strong>Increase the noise</strong> to see how quickly the quantum state falls apart.</p>
                    `
                }
            ]
        },
        {
            id: 'module9',
            title: 'Module 9: Advanced Qubit Mechanics',
            steps: [
                {
                    id: 'step16',
                    title: 'The Bloch Sphere (3D)',
                    subtitle: 'The true face of a qubit',
                    icon: '🌐',
                    visualizer: 'visualizeBlochSphere',
                    explanation: `
                        <h3>3D Quantum Space</h3>
                        <p>So far, we've used 2D circles. But a real qubit lives in 3D space. The state vector |ψ⟩ points to a location on the <strong>Bloch Sphere</strong>.</p>
                        <p>The North Pole is |0⟩, the South Pole is |1⟩. The equator represents different superpositions.</p>
                        <p><strong>Rotate the sphere controls</strong> (Theta and Phi) to explore the full state space of a single qubit.</p>
                    `
                },
                {
                    id: 'step17',
                    title: 'Quantum Interference',
                    subtitle: 'Computational magic',
                    icon: '🌊',
                    visualizer: 'visualizeInterference',
                    explanation: `
                        <h3>Amplify the Right Answer</h3>
                        <p>Quantum algorithms (like Grover's) don't just try every possibility. They use <strong>Interference</strong>.</p>
                        <p>They manipulate probabilities so that incorrect answers exhibit <em>destructive interference</em> (cancel out) and the correct answer shows <em>constructive interference</em> (amplifies).</p>
                        <p><strong>Adjust the phase</strong> to see how waves can sum to zero or double in size.</p>
                    `
                }
            ]
        },
        {
            id: 'module10',
            title: 'Module 10: Multi-Qubit Systems (QSphere)',
            steps: [
                {
                    id: 'step18',
                    title: 'The QSphere',
                    subtitle: 'Visualizing Entanglement & Phase',
                    icon: '🌐',
                    visualizer: 'visualizeQSphere',
                    explanation: `
                        <h3>Why QSphere? (Bloch Sphere vs. QSphere)</h3>
                        <p>The <strong>Bloch Sphere</strong> is perfect for 1 qubit. But for 2 qubits, things get weird.</p>
                        
                        <div style="background:#f9f9f9; padding:10px; border-left:4px solid #0057b8; margin:10px 0; font-size:0.9em">
                            <strong>Prerequisites:</strong><br>
                            • To understand the notation |00⟩, learn about <a href="#" onclick="jumpToStepId('step4'); return false;">Ket Notation (|ψ⟩)</a>.<br>
                            • To understand why we can't use 2 spheres, learn about <a href="#" onclick="jumpToStepId('step8'); return false;">Bell States (Entanglement)</a>.
                        </div>

                        <ul style="margin:10px 0; padding-left:20px; color:#555">
                            <li><strong>Superposition:</strong> You <em>can</em> use two Bloch spheres.</li>
                            <li><strong>Entanglement:</strong> You <strong>CANNOT</strong> using Bloch spheres. An entangled state (like a Bell Pair) has no individual qubit state!</li>
                        </ul>
                        <p><strong>The QSphere Solution:</strong> Instead of drawing qubits, we draw the <strong>States</strong> (|00⟩, |01⟩, etc.). This lets us visualize <em>any</em> multi-qubit system, even highly entangled ones.</p>
                        <p><strong>Select a preset</strong> to see how Bell and GHZ states look.</p>
                    `
                }
            ]
        }
    ]
};

let currentStepIndex = 0;
let allSteps = [];
let animationId = null;

// Initialize Course
function initCourse() {
    // Flatten steps for easy navigation
    courseData.modules.forEach(module => {
        module.steps.forEach(step => {
            allSteps.push({ ...step, moduleId: module.id });
        });
    });

    renderSidebar();
    loadStep(0);

    // Global Event Listeners
    document.getElementById('prevBtn').addEventListener('click', () => navigateStep(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigateStep(1));
}

// Render Sidebar
function renderSidebar() {
    const sidebar = document.getElementById('courseSidebar');
    sidebar.innerHTML = '';

    courseData.modules.forEach(module => {
        const moduleHeader = document.createElement('div');
        moduleHeader.className = 'module-header';
        moduleHeader.textContent = module.title;
        sidebar.appendChild(moduleHeader);

        module.steps.forEach((step, index) => {
            const stepEl = document.createElement('div');
            stepEl.className = 'step-item';
            stepEl.dataset.index = allSteps.findIndex(s => s.id === step.id);
            stepEl.onclick = () => loadStep(parseInt(stepEl.dataset.index));

            stepEl.innerHTML = `
                <div class="step-icon">${step.icon}</div>
                <div class="step-details">
                    <div style="font-weight:600">${step.title}</div>
                </div>
            `;
            sidebar.appendChild(stepEl);
        });
    });
}

// Load Step
function loadStep(index) {
    if (index < 0 || index >= allSteps.length) return;

    currentStepIndex = index;
    const step = allSteps[index];

    // Update UI Content
    document.getElementById('stepTitle').textContent = step.title;
    document.getElementById('stepSubtitle').textContent = step.subtitle;
    document.getElementById('stepExplanation').innerHTML = step.explanation;

    // Update Visualizer
    const visualContainer = document.getElementById('visualContainer');
    visualContainer.innerHTML = '<canvas id="visualCanvas"></canvas><div id="visualControls" class="controls-panel"></div>';

    cancelAnimationFrame(animationId); // Stop previous animation

    if (window[step.visualizer]) {
        window[step.visualizer]();
    }

    // Update Sidebar Active State
    document.querySelectorAll('.step-item').forEach((el, idx) => {
        el.classList.toggle('active', idx === index);
        if (idx < index) el.classList.add('completed');
    });

    // Update Navigation Buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = index === 0;

    // Handle Next / Finish
    if (index === allSteps.length - 1) {
        nextBtn.innerHTML = 'Finish Course 🏆';
        nextBtn.onclick = () => window.location.href = '../qt-learning-platform.html';
    } else {
        nextBtn.innerHTML = 'Next Step →';
        nextBtn.disabled = false;
        nextBtn.onclick = () => navigateStep(1);
    }

    // Update Progress Bar
    const progress = ((index + 1) / allSteps.length) * 100;
    document.getElementById('courseProgress').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${Math.round(progress)}% Complete`;
}

function navigateStep(direction) {
    loadStep(currentStepIndex + direction);
}

// --- VISUALIZERS ---

// 1. What is a Wave?
function visualizeWave() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = 300;

    let frequency = 0.02;
    let amplitude = 50;
    let phase = 0;

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div class="control-group">
            <label class="control-label">Frequency</label>
            <input type="range" min="1" max="10" value="2" oninput="updateWaveParam('freq', this.value)">
        </div>
        <div class="control-group">
            <label class="control-label">Amplitude</label>
            <input type="range" min="10" max="100" value="50" oninput="updateWaveParam('amp', this.value)">
        </div>
    `;

    window.updateWaveParam = (param, value) => {
        if (param === 'freq') frequency = value * 0.01;
        if (param === 'amp') amplitude = parseInt(value);
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = '#0057b8';
        ctx.lineWidth = 3;

        for (let x = 0; x < canvas.width; x++) {
            const y = canvas.height / 2 + Math.sin(x * frequency + phase) * amplitude;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        phase -= 0.05;
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 2. Particles vs Waves
function visualizeParticles() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let mode = 'particles'; // 'particles' or 'waves'
    let particles = [];
    let wavePhase = 0;

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <button class="study-button" style="width:auto" onclick="toggleMode()">
            Switch to ${mode === 'particles' ? 'Waves' : 'Particles'} Mode
        </button>
    `;

    window.toggleMode = () => {
        mode = mode === 'particles' ? 'waves' : 'particles';
        controls.querySelector('button').textContent = `Switch to ${mode === 'particles' ? 'Waves' : 'Particles'} Mode`;
        particles = [];
    };

    function spawnParticle() {
        particles.push({ x: 0, y: canvas.height / 2 + (Math.random() - 0.5) * 20, vx: 3 });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Barrier
        ctx.fillStyle = '#333';
        ctx.fillRect(canvas.width / 2, 0, 10, canvas.height);
        // Slit
        ctx.clearRect(canvas.width / 2, canvas.height / 2 - 20, 10, 40);

        if (mode === 'particles') {
            if (Math.random() < 0.1) spawnParticle();

            ctx.fillStyle = '#ff6b6b';
            particles.forEach((p, i) => {
                p.x += p.vx;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                ctx.fill();

                // Check collision
                if (p.x > canvas.width / 2 && p.x < canvas.width / 2 + 10) {
                    if (p.y < canvas.height / 2 - 20 || p.y > canvas.height / 2 + 20) {
                        p.vx = -p.vx; // Bounce
                    }
                }

                if (p.x > canvas.width || p.x < 0) particles.splice(i, 1);
            });
        } else {
            // Wave Mode (Simplified Visual)
            ctx.strokeStyle = '#00d4aa';
            ctx.lineWidth = 2;

            // Incoming Waves
            for (let i = 0; i < 10; i++) {
                let x = (wavePhase + i * 30) % (canvas.width / 2);
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Diffracted Waves
            for (let i = 0; i < 10; i++) {
                let r = (wavePhase + i * 30) % (canvas.width / 2);
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, r, -Math.PI / 2, Math.PI / 2);
                ctx.stroke();
            }

            wavePhase += 1;
        }

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 3. Double Slit Visualization
function visualizeDoubleSlit() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let time = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;

        // Create Interference Pattern
        const imgData = ctx.createImageData(w, h);
        const data = imgData.data;

        for (let x = cx; x < w; x += 2) { // Optimize: skip pixels
            for (let y = 0; y < h; y += 2) {
                // Distance from two slits
                const d1 = Math.sqrt((x - cx) * (x - cx) + (y - (cy - 20)) * (y - (cy - 20)));
                const d2 = Math.sqrt((x - cx) * (x - cx) + (y - (cy + 20)) * (y - (cy + 20)));

                // Interference math
                const val = 128 + 127 * Math.cos(d1 * 0.1 - time) * Math.cos(d2 * 0.1 - time); // Constructive/Destructive

                const idx = (y * w + x) * 4;
                // Draw only right side (screen area)
                if (val > 200) {
                    // Bright fringe
                    ctx.fillStyle = `rgba(0, 87, 184, ${val / 255})`;
                    ctx.fillRect(x, y, 2, 2);
                }
            }
        }

        // Draw Slits
        ctx.fillStyle = '#222';
        ctx.fillRect(cx - 5, 0, 10, h);
        ctx.clearRect(cx - 5, cy - 25, 10, 10); // Slit 1
        ctx.clearRect(cx - 5, cy + 15, 10, 10); // Slit 2

        time += 0.2;
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 4. Superposition (Bloch Sphere Placeholder - simplified 2D circle for now)
function visualizeSuperposition() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let angle = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const r = 100;

        // Draw Circle (Bloch Sphere 2D projection)
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Axes
        ctx.beginPath();
        ctx.moveTo(cx, cy - r);
        ctx.lineTo(cx, cy + r);
        ctx.moveTo(cx - r, cy);
        ctx.lineTo(cx + r, cy);
        ctx.strokeStyle = '#eee';
        ctx.stroke();

        // State Vector
        const vx = cx + Math.sin(angle) * r;
        const vy = cy - Math.cos(angle) * r;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(vx, vy);
        ctx.strokeStyle = '#0057b8';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Vector Head
        ctx.beginPath();
        ctx.arc(vx, vy, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#0057b8';
        ctx.fill();

        // Probabilities
        const prob0 = Math.pow(Math.cos(angle / 2), 2);

        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.fillText('|0⟩', cx - 10, cy - r - 10);
        ctx.fillText('|1⟩', cx - 10, cy + r + 20);

        ctx.fillStyle = '#666';
        ctx.fillText(`P(0) = ${(prob0 * 100).toFixed(0)}%`, cx + r + 20, cy);

        angle += 0.01;
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// Init on Load
document.addEventListener('DOMContentLoaded', initCourse);

// 5. Measurement (Wavefunction Collapse)
function visualizeMeasurement() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let state = 'superposition'; // 'superposition', '0', '1'
    let angle = 0;

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <button class="study-button" style="width:auto" onclick="measure()">MEASURE QUBIT 👁️</button>
        <button class="study-button" style="width:auto; background:#777" onclick="resetMeasurement()">RESET ↺</button>
    `;

    window.measure = () => {
        if (state !== 'superposition') return;
        state = Math.random() > 0.5 ? '0' : '1';
    };

    window.resetMeasurement = () => {
        state = 'superposition';
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#555';
        ctx.fillText('Quantum State |ψ⟩', cx, 40);

        if (state === 'superposition') {
            // Spinning Coin / Bloch Vector
            angle += 0.1;
            const r = 60;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;

            // Draw blurry circle representing probability cloud
            const gradient = ctx.createRadialGradient(cx, cy, 30, cx, cy, 80);
            gradient.addColorStop(0, 'rgba(0, 87, 184, 0.8)');
            gradient.addColorStop(1, 'rgba(0, 87, 184, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(cx, cy, 80, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#fff';
            ctx.font = '16px Arial';
            ctx.fillText('SUPERPOSITION', cx, cy + 5);
        } else {
            // Collapsed State
            ctx.fillStyle = state === '0' ? '#ff006e' : '#00d4aa';
            ctx.beginPath();
            ctx.arc(cx, cy, 60, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#fff';
            ctx.font = '40px Arial';
            ctx.fillText(state === '0' ? '|0⟩' : '|1⟩', cx, cy + 15);

            ctx.fillStyle = '#333';
            ctx.font = '16px Arial';
            ctx.fillText('Wavefunction Collapsed!', cx, cy + 100);
        }

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 6. Heisenberg Uncertainty
function visualizeUncertainty() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let positionUncertainty = 50; // 10 to 100

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div class="control-group" style="width:100%">
            <label class="control-label">Position Certainty (Squeeze Particle)</label>
            <input type="range" min="10" max="150" value="50" oninput="updateUncertainty(this.value)">
            <div style="display:flex;justify-content:space-between;font-size:12px;color:#666">
                <span>Spread Out</span>
                <span>Highly Localized</span>
            </div>
        </div>
    `;

    window.updateUncertainty = (val) => {
        positionUncertainty = 160 - parseInt(val); // Invert: Slider Right = High Certainty = Low spread
    };

    function drawGaussian(ctx, cy, sigma, color, label) {
        ctx.beginPath();
        const height = 80;
        ctx.moveTo(0, cy);
        for (let x = 0; x < canvas.width; x++) {
            const dx = x - canvas.width / 2;
            const y = cy - height * Math.exp(-(dx * dx) / (2 * sigma * sigma));
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.1;
        ctx.lineTo(canvas.width, cy);
        ctx.lineTo(0, cy);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        ctx.fillStyle = '#333';
        ctx.fillText(label, 20, cy - 60);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Position Graph (Top)
        drawGaussian(ctx, 120, positionUncertainty, '#0057b8', 'Position (Where is it?)');

        // Momentum Graph (Bottom) - Inverse relationship
        // sigma_p proportional to 1/sigma_x
        const momentumUncertainty = 2000 / positionUncertainty;
        drawGaussian(ctx, 280, momentumUncertainty, '#ff006e', 'Momentum (How fast?)');

        ctx.font = '14px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText('Δx', canvas.width / 2 + positionUncertainty, 120);
        ctx.fillText('Δp', canvas.width / 2 + momentumUncertainty, 280);

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 7. Observer Effect
function visualizeObserver() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let particle = { x: 50, y: 150, vx: 2, measured: false };
    let photon = { active: false, x: 0, y: 0, vx: 0, vy: 0 };

    canvas.addEventListener('mousedown', (e) => {
        if (!photon.active && !particle.measured) {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Fire photon from top
            photon.active = true;
            photon.x = particle.x + 100; // Lead the target slightly
            photon.y = 0;
            photon.vx = -2;
            photon.vy = 5;
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Particle (Electron)
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = particle.measured ? '#ff006e' : '#0057b8';
        ctx.fill();

        // Particle Movement
        if (!particle.measured) {
            particle.x += particle.vx;
            // Draw Ghost Path (Uncertainty)
            ctx.fillStyle = 'rgba(0, 87, 184, 0.2)';
            ctx.beginPath();
            ctx.arc(particle.x + 20, particle.y, 12, 0, Math.PI * 2);
            ctx.fill();
        } else {
            particle.x += particle.vx;
            particle.y += particle.vy || 0;

            ctx.font = '14px Arial';
            ctx.fillStyle = '#333';
            ctx.fillText('PATH CHANGED!', particle.x, particle.y - 20);
        }

        // Reset if off screen
        if (particle.x > canvas.width + 50) {
            particle = { x: 0, y: 150, vx: 2, measured: false };
            photon.active = false;
        }

        // Photon Logic
        if (photon.active) {
            ctx.beginPath();
            ctx.arc(photon.x, photon.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffd700'; // Light
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffd700';
            ctx.fill();
            ctx.shadowBlur = 0;

            photon.x += photon.vx;
            photon.y += photon.vy;

            // Collision Detection
            const dx = photon.x - particle.x;
            const dy = photon.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 15 && !particle.measured) {
                particle.measured = true;
                particle.vx = 4; // Speed up
                particle.vy = 2; // Deflect down
                photon.active = false; // Absorbed/Scattered

                // Flash
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        } else if (!particle.measured) {
            ctx.fillStyle = '#888';
            ctx.fillText('Click to Observe (Fire Photon)', canvas.width / 2 - 80, 50);
        }

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 8. Entanglemnet
function visualizeEntanglement() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let state = 'entangled'; // 'entangled', 'collapsed'
    let colorA, colorB;
    let timer = 0;

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <button class="study-button" style="width:auto" onclick="measureEntanglement()">MEASURE ONE PARTICLE</button>
        <button class="study-button" style="width:auto;background:#777" onclick="resetEntanglement()">ENTANGLE AGAIN</button>
    `;

    window.measureEntanglement = () => {
        if (state !== 'entangled') return;
        state = 'collapsed';
        const rand = Math.random();
        colorA = rand > 0.5 ? '#0057b8' : '#ff006e'; // Blue or Pink
        colorB = rand > 0.5 ? '#ff006e' : '#0057b8'; // Opposite
    };

    window.resetEntanglement = () => {
        state = 'entangled';
    };

    function drawParticle(x, y, color, label) {
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y + 7);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        timer++;
        const cx = canvas.width / 2;

        // Draw Connection
        if (state === 'entangled') {
            ctx.beginPath();
            ctx.moveTo(cx - 100, 150);
            ctx.lineTo(cx + 100, 150);
            ctx.strokeStyle = `rgba(0, 212, 170, ${Math.abs(Math.sin(timer * 0.1))})`;
            ctx.lineWidth = 4;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Flashing colors
            const c1 = Math.sin(timer * 0.2) > 0 ? '#0057b8' : '#ff006e';
            const c2 = Math.sin(timer * 0.2) > 0 ? '#ff006e' : '#0057b8';

            drawParticle(cx - 100, 150, c1, '?');
            drawParticle(cx + 100, 150, c2, '?');
        } else {
            // Broken Connection
            drawParticle(cx - 100, 150, colorA, colorA === '#0057b8' ? 'UP' : 'DOWN');
            drawParticle(cx + 100, 150, colorB, colorB === '#0057b8' ? 'UP' : 'DOWN');

            ctx.fillStyle = '#333';
            ctx.fillText('INSTANT CORRELATION!', cx, 250);
        }

        ctx.fillStyle = '#555';
        ctx.fillText('Alice', cx - 100, 220);
        ctx.fillText('Bob', cx + 100, 220);

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 9. Quantum Tunneling
function visualizeTunneling() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let particles = [];
    let barrierHeight = 100;

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div class="control-group" style="width:100%">
            <label class="control-label">Barrier Height (Energy)</label>
            <input type="range" min="50" max="150" value="100" oninput="updateBarrier(this.value)">
            <div style="display:flex;justify-content:space-between;font-size:12px;color:#666">
                <span>Low Barrier</span>
                <span>High Barrier</span>
            </div>
        </div>
    `;

    window.updateBarrier = (val) => {
        barrierHeight = parseInt(val);
    };

    function spawnParticle() {
        particles.push({
            x: 0,
            y: 200 + (Math.random() - 0.5) * 20,
            vx: 3,
            energy: 80 + Math.random() * 10 // Particle energy
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Barrier
        ctx.fillStyle = '#333';
        const bx = canvas.width / 2;
        const by = 300 - barrierHeight;
        ctx.fillRect(bx, by, 40, barrierHeight);

        ctx.fillStyle = '#666';
        ctx.fillText('Potential Barrier', bx - 20, by - 10);

        // Spawn particles
        if (Math.random() < 0.05) spawnParticle();

        particles.forEach((p, i) => {
            p.x += p.vx;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#00d4aa';

            // Interaction with Barrier
            if (p.x > bx && p.x < bx + 40) {
                // Inside barrier
                if (p.energy < barrierHeight) {
                    // Tunneling probability = exp(-width * sqrt(V-E))
                    // Simplified: Small chance to pass, mostly reflect
                    if (Math.random() < 0.05 * (150 / barrierHeight)) {
                        // Tunnel!
                        ctx.fillStyle = '#fff'; // Flash white
                    } else {
                        p.vx = -p.vx; // Reflect
                        p.x = bx - 5;
                    }
                }
            }

            ctx.fill();

            // Fade out if off screen
            if (p.x > canvas.width || p.x < 0) particles.splice(i, 1);
        });

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 10. Atomic Physics (Bohr Model)
function visualizeAtomic() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let level = 1;
    let electronAngle = 0;
    let photon = null; // {x, y, targetLevel}

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div style="display:flex; gap:10px">
            <button class="study-button" style="width:auto" onclick="changeLevel(1)">n=1</button>
            <button class="study-button" style="width:auto" onclick="changeLevel(2)">n=2</button>
            <button class="study-button" style="width:auto" onclick="changeLevel(3)">n=3</button>
        </div>
    `;

    window.changeLevel = (n) => {
        if (n === level) return;

        // Create photon
        photon = {
            x: 0,
            y: 0,
            targetLevel: n,
            active: true
        };

        if (n > level) {
            // Absorb photon (come from outside)
            photon.x = 0;
            photon.y = 0;
        } else {
            // Emit photon (leave from electron)
            // Handled in animation loop
        }
        level = n;
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Draw Nucleus
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#d00';
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '10px Arial';
        ctx.fillText('+', cx - 3, cy + 3);

        // Draw Orbits
        [1, 2, 3].forEach(n => {
            ctx.beginPath();
            ctx.arc(cx, cy, n * 40, 0, Math.PI * 2);
            ctx.strokeStyle = '#ddd';
            ctx.stroke();
        });

        // Draw Electron
        const r = level * 40;
        const ex = cx + Math.cos(electronAngle) * r;
        const ey = cy + Math.sin(electronAngle) * r;

        ctx.beginPath();
        ctx.arc(ex, ey, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#0057b8';
        ctx.fill();

        electronAngle += 0.05 / level; // Slower at higher levels

        // Photon Animation
        if (photon && photon.active) {
            // Simplified: Just flash for now to show transition
            ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
            ctx.beginPath();
            ctx.arc(cx, cy, r + 20, 0, Math.PI * 2);
            ctx.fill();
            photon.active = false;
        }

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 11. 3D Orbitals (Pseudo-3D Cloud)
function visualizeOrbitals() {
    const canvas = document.getElementById('visualCanvas'); // Note: Reusing canvas
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let orbitalType = 's'; // s, p, d
    let time = 0;

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div style="display:flex; gap:10px">
            <button class="study-button" style="width:auto" onclick="setOrbital('s')">s-orbital (Sphere)</button>
            <button class="study-button" style="width:auto" onclick="setOrbital('p')">p-orbital (Dumbbell)</button>
            <button class="study-button" style="width:auto" onclick="setOrbital('d')">d-orbital (Clover)</button>
        </div>
    `;

    window.setOrbital = (type) => {
        orbitalType = type;
    }

    function animate() {
        // Create a cloud effect
        // We can't do real 3D volume rendering easily in 2D canvas without heavy math, 
        // so we simulate it with thousands of dots moving in probabilistic paths.

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Fade effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Draw 100 dots per frame
        for (let i = 0; i < 100; i++) {
            // Random point in spherical coordinates
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            let r = Math.random() * 80;

            // Shaping functions based on orbital type
            let prob = 0;
            if (orbitalType === 's') {
                prob = Math.exp(-r / 40); // Simple decay
            } else if (orbitalType === 'p') {
                // Dumbbell shape aligned with Y
                prob = Math.pow(Math.cos(phi), 2) * Math.exp(-r / 40);
            } else if (orbitalType === 'd') {
                // Clover shape
                prob = Math.pow(Math.sin(theta) * Math.cos(phi), 2) * Math.exp(-r / 40);
            }

            if (Math.random() < prob) {
                // Project 3D to 2D
                // Rotate the whole cloud slowly
                const rotSpeed = 0.01;
                const x3 = r * Math.sin(phi) * Math.cos(theta + time);
                const y3 = r * Math.cos(phi);
                const z3 = r * Math.sin(phi) * Math.sin(theta + time);

                // Simple perspective projection
                const scale = 200 / (200 + z3);
                const x2 = cx + x3 * scale;
                const y2 = cy + y3 * scale;

                ctx.fillStyle = `rgba(0, 87, 184, 0.5)`;
                ctx.fillRect(x2, y2, 2, 2);
            }
        }

        time += 0.02;
        animationId = requestAnimationFrame(animate);
    }
    animate();
}


// 12. Normalization Visualization
function visualizeNormalization() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let angle = -Math.PI / 4; // Default state

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div class="control-group" style="width:100%">
            <label class="control-label">Adjust State Vector (Angle θ)</label>
            <input type="range" min="0" max="360" value="45" oninput="updateAngle(this.value)">
            <div style="font-family:monospace; margin-top:5px; color:#0057b8" id="normEquation">
                |α|² + |β|² = 0.50 + 0.50 = 1.00
            </div>
        </div>
    `;

    window.updateAngle = (deg) => {
        angle = -deg * (Math.PI / 180);
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const r = 100;

        // Draw Unit Circle
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Axes
        ctx.beginPath();
        ctx.moveTo(cx, cy - r - 20);
        ctx.lineTo(cx, cy + r + 20);
        ctx.moveTo(cx - r - 20, cy);
        ctx.lineTo(cx + r + 20, cy);
        ctx.strokeStyle = '#eee';
        ctx.stroke();

        // Label Axes
        ctx.fillStyle = '#666';
        ctx.font = '14px Arial';
        ctx.fillText('|0⟩ (α)', cx + r + 25, cy + 5);
        ctx.fillText('|1⟩ (β)', cx, cy - r - 25);

        // Vector
        const vx = cx + Math.cos(angle) * r;
        const vy = cy + Math.sin(angle) * r;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(vx, vy);
        ctx.strokeStyle = '#0057b8';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Vector Head
        ctx.beginPath();
        ctx.arc(vx, vy, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#0057b8';
        ctx.fill();

        // Calculate Projections (Alpha & Beta)
        // Note: In this visual 2D mapping:
        // x-projection corresponds to alpha magnitude
        // y-projection corresponds to beta magnitude (inverted for screen coords)

        let alpha = Math.cos(angle);
        let beta = Math.sin(angle); // negative sign removed for magnitude display

        // Update Equation Text
        const alphaSq = (alpha * alpha).toFixed(2);
        const betaSq = (beta * beta).toFixed(2);
        const sum = (parseFloat(alphaSq) + parseFloat(betaSq)).toFixed(2); // Should always be 1.00

        const eqEl = document.getElementById('normEquation');
        if (eqEl) {
            eqEl.innerHTML = `|α|² + |β|² = ${alphaSq} + ${betaSq} = ${sum} ✅`;
        }

        // Visual Projections
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        // Alpha Projection (X-axis)
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(vx, cy);
        ctx.strokeStyle = '#ff006e';
        ctx.stroke();
        ctx.fillStyle = '#ff006e';
        ctx.fillText(`α = ${Math.abs(alpha).toFixed(2)}`, vx, cy + 15);

        // Beta Projection (Y-axis) -> Actually referencing Y axis for visual simplicity in this 2D plane
        // Strictly speaking, on Bloch sphere it's different, but for "Circle" visualization of normalization:
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(cx, vy);
        ctx.strokeStyle = '#00d4aa';
        ctx.stroke();
        ctx.fillStyle = '#00d4aa';
        ctx.fillText(`β = ${Math.abs(beta).toFixed(2)}`, cx - 40, vy);

        ctx.setLineDash([]);

        // "Euclidean Norm" annotation
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText('radius = 1', cx + r / 2 * Math.cos(angle + 0.2), cy + r / 2 * Math.sin(angle + 0.2));

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 13. Two-Level Systems (Universal Mapping)
function visualizeTwoLevel() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let systemType = 'spin'; // spin, energy, polarization

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div style="display:flex; gap:10px; justify-content:center">
            <button class="study-button" style="width:auto" onclick="setSystem('spin')">Electron Spin</button>
            <button class="study-button" style="width:auto" onclick="setSystem('energy')">Energy Levels</button>
            <button class="study-button" style="width:auto" onclick="setSystem('pola')">Photon Polarization</button>
        </div>
    `;

    window.setSystem = (type) => {
        systemType = type;
    };

    function drawMappingArrow(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 30, y);
        ctx.lineTo(x + 25, y - 5);
        ctx.moveTo(x + 30, y);
        ctx.lineTo(x + 25, y + 5);
        ctx.strokeStyle = '#888';
        ctx.stroke();
        ctx.fillStyle = '#888';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Maps to', x + 15, y - 8);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;

        ctx.textAlign = 'center';
        ctx.font = '16px Arial';

        // Left Side: Physical System
        let label0, label1;
        const lx = cx - 100;
        const rx = cx + 100;
        const cy = canvas.height / 2;

        if (systemType === 'spin') {
            ctx.fillStyle = '#333';
            ctx.fillText('Physical System: Electron Spin', lx, 50);

            // Spin Down
            ctx.beginPath(); ctx.arc(lx, cy + 40, 15, 0, Math.PI * 2); ctx.fillStyle = '#0057b8'; ctx.fill();
            ctx.strokeStyle = 'white'; ctx.beginPath(); ctx.moveTo(lx, cy + 45); ctx.lineTo(lx, cy + 35); ctx.lineTo(lx - 3, cy + 38); ctx.stroke();
            label0 = 'Spin Down (↓)';

            // Spin Up
            ctx.beginPath(); ctx.arc(lx, cy - 40, 15, 0, Math.PI * 2); ctx.fillStyle = '#ff006e'; ctx.fill();
            ctx.strokeStyle = 'white'; ctx.beginPath(); ctx.moveTo(lx, cy - 35); ctx.lineTo(lx, cy - 45); ctx.lineTo(lx - 3, cy - 42); ctx.stroke();
            label1 = 'Spin Up (↑)';

        } else if (systemType === 'energy') {
            ctx.fillStyle = '#333';
            ctx.fillText('Physical System: Energy Atom', lx, 50);

            // Ground
            ctx.fillStyle = '#0057b8'; ctx.fillRect(lx - 15, cy + 35, 30, 4);
            label0 = 'Ground State';

            // Excited
            ctx.fillStyle = '#ff006e'; ctx.fillRect(lx - 15, cy - 45, 30, 4);
            label1 = 'Excited State';

        } else {
            ctx.fillStyle = '#333';
            ctx.fillText('Physical System: Photon', lx, 50);

            // Horizontal
            ctx.strokeStyle = '#0057b8'; ctx.beginPath(); ctx.moveTo(lx - 10, cy + 40); ctx.lineTo(lx + 10, cy + 40); ctx.stroke();
            label0 = 'Horizontal (↔)';

            // Vertical
            ctx.strokeStyle = '#ff006e'; ctx.beginPath(); ctx.moveTo(lx, cy - 30); ctx.lineTo(lx, cy - 50); ctx.stroke();
            label1 = 'Vertical (↕)';
        }

        ctx.fillStyle = '#666';
        ctx.fillText(label1, lx, cy - 60);
        ctx.fillText(label0, lx, cy + 70);


        // Right Side: Qubit
        ctx.fillStyle = '#333';
        ctx.fillText('Quantum Bit (Qubit)', rx, 50);

        // |0>
        ctx.fillStyle = '#0057b8';
        ctx.font = '30px Arial';
        ctx.fillText('|0⟩', rx, cy + 40);

        // |1>
        ctx.fillStyle = '#ff006e';
        ctx.fillText('|1⟩', rx, cy - 40);

        // Mapping Arrows
        drawMappingArrow(ctx, cx - 40, cy - 40);
        drawMappingArrow(ctx, cx - 40, cy + 40);

        ctx.fillStyle = '#555';
        ctx.font = '14px Arial';
        ctx.fillText('Any 2-level system can be a Qubit!', cx, canvas.height - 30);

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 14. No-Cloning Theorem
function visualizeNoCloning() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let originalState = { color: '#0057b8', label: '|ψ⟩' };
    let copyState = { color: '#888', label: '|?⟩' };
    let cloneAttempted = false;
    let message = "Waiting to clone...";

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <button class="study-button" style="width:auto" onclick="attemptClone()">ATTEMPT CLONE 🖨️</button>
        <button class="study-button" style="width:auto; background:#777" onclick="resetClone()">RESET ↺</button>
    `;

    window.attemptClone = () => {
        cloneAttempted = true;
        // The "Clone" fails - it produces a random state or destroys the original
        if (Math.random() > 0.5) {
            copyState = { color: '#ff006e', label: '|Random⟩' }; // Failed copy
            message = "COPY FAILED: Fidelity Loss!";
        } else {
            originalState.color = '#888'; // Original destroyed
            copyState.color = '#0057b8';
            message = "ORIGINAL DESTROYED: Teleportation, not Cloning!";
        }
    };

    window.resetClone = () => {
        originalState = { color: '#0057b8', label: '|ψ⟩' };
        copyState = { color: '#888', label: '|?⟩' };
        cloneAttempted = false;
        message = "Waiting to clone...";
    };

    function drawQubit(x, y, state) {
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fillStyle = state.color;
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(state.label, x, y + 7);

        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.fillText(state === originalState ? "Original" : "Copy Target", x, y + 60);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        drawQubit(cx - 100, cy, originalState);
        drawQubit(cx + 100, cy, copyState);

        // Arrow
        ctx.beginPath();
        ctx.moveTo(cx - 40, cy);
        ctx.lineTo(cx + 40, cy);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.moveTo(cx + 35, cy - 5);
        ctx.lineTo(cx + 40, cy);
        ctx.lineTo(cx + 35, cy + 5);
        ctx.stroke();

        if (cloneAttempted) {
            ctx.fillStyle = '#d00';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('❌ IMPOSSIBLE', cx, cy - 30);
        }

        ctx.fillStyle = '#555';
        ctx.font = '16px Arial';
        ctx.fillText(message, cx, cy + 100);

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 15. Quantum Decoherence
function visualizeDecoherence() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let coherence = 1.0;
    let particles = [];

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div class="control-group">
            <label>Environmental Noise Level</label>
            <input type="range" min="0" max="100" value="50" id="noiseSlider">
        </div>
        <div style="text-align:center; color:#555; font-size:12px">Higher Noise = Faster Decoherence</div>
    `;

    function spawnNoise() {
        if (Math.random() < 0.2) {
            particles.push({
                x: Math.random() < 0.5 ? 0 : canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Qubit State Vector
        // As coherence drops, the vector length shrinks (mixed state) and jitters
        const noiseLevel = document.getElementById('noiseSlider').value / 100;

        if (coherence > 0) {
            coherence -= 0.001 * noiseLevel * 5;
        } else {
            coherence = 0; // Checkpoint: Fully decohered
        }

        // Re-inject coherence if user lowers noise significantly (for demo purposes)
        if (noiseLevel < 0.1 && coherence < 1.0) coherence += 0.01;

        const jitter = (1 - coherence) * 0.5;
        const angle = -Math.PI / 4 + (Math.random() - 0.5) * jitter;
        const r = 100 * coherence;

        // Draw Bloch Circle
        ctx.beginPath();
        ctx.arc(cx, cy, 100, 0, Math.PI * 2);
        ctx.strokeStyle = '#ddd';
        ctx.stroke();

        // Draw Vector
        const vx = cx + Math.cos(angle) * r;
        const vy = cy + Math.sin(angle) * r;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(vx, vy);
        ctx.strokeStyle = coherence > 0.5 ? '#0057b8' : '#888';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw Noise Particles
        spawnNoise();
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            ctx.fillStyle = '#aaa';
            ctx.fillRect(p.x, p.y, 2, 2);

            // Interaction
            const d = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
            if (d < 100) {
                // Hitting the qubit system
                if (Math.random() < noiseLevel) coherence -= 0.01;
            }

            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) particles.splice(i, 1);
        });

        // Status
        ctx.fillStyle = '#333';
        ctx.font = '16px Arial';
        const percent = Math.round(coherence * 100);
        ctx.fillText(`Coherence: ${percent}%`, cx, cy + 130);

        let status = "Pure State";
        if (percent < 90) status = "Decohering...";
        if (percent < 10) status = "Mixed State (Classical Signal)";

        ctx.fillStyle = percent > 50 ? '#0057b8' : '#d00';
        ctx.fillText(status, cx, cy + 150);

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 16. Bloch Sphere (3D Visualization)
function visualizeBlochSphere() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let theta = Math.PI / 2; // Polar angle (0 to PI)
    let phi = 0;   // Azimuthal angle (0 to 2PI)
    let autoRotate = true;
    let viewAngle = 0;

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div class="control-group">
            <label>Theta (θ) - 0/1 Mix</label>
            <input type="range" min="0" max="180" value="90" oninput="updateBloch('theta', this.value)">
        </div>
        <div class="control-group">
            <label>Phi (φ) - Phase</label>
            <input type="range" min="0" max="360" value="0" oninput="updateBloch('phi', this.value)">
        </div>
    `;

    window.updateBloch = (param, val) => {
        autoRotate = false;
        if (param === 'theta') theta = val * (Math.PI / 180);
        if (param === 'phi') phi = val * (Math.PI / 180);
    };

    function project3D(x, y, z, cx, cy, scale) {
        // Simple rotation around Y axis (view angle)
        const rotX = x * Math.cos(viewAngle) - z * Math.sin(viewAngle);
        const rotZ = x * Math.sin(viewAngle) + z * Math.cos(viewAngle);

        // Perspective
        const depth = 400;
        const factor = depth / (depth + rotZ);

        return {
            x: cx + rotX * scale * factor,
            y: cy - y * scale * factor, // Y is up in 3D, down in Canvas
            z: rotZ,
            scale: factor
        };
    }

    function drawSphere(cx, cy, r) {
        // Draw wireframe latitudes/longitudes
        ctx.strokeStyle = '#999'; // Darker for visibility
        ctx.lineWidth = 1;

        // Equator
        ctx.beginPath();
        for (let i = 0; i <= 64; i++) {
            const a = (i / 64) * Math.PI * 2;
            const p = project3D(Math.cos(a), 0, Math.sin(a), cx, cy, r);
            if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Meridian (0/180)
        ctx.beginPath();
        for (let i = 0; i <= 64; i++) {
            const a = (i / 64) * Math.PI * 2;
            const p = project3D(Math.sin(a), Math.cos(a), 0, cx, cy, r);
            if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const r = 100;

        if (autoRotate) viewAngle += 0.01;

        drawSphere(cx, cy, r);

        // State Vector
        // x = sin(theta)cos(phi)
        // y = cos(theta)
        // z = sin(theta)sin(phi)
        const sx = Math.sin(theta) * Math.cos(phi);
        const sy = Math.cos(theta); // Up is |0>
        const sz = Math.sin(theta) * Math.sin(phi);

        const origin = project3D(0, 0, 0, cx, cy, r);
        const tip = project3D(sx, sy, sz, cx, cy, r);

        // Draw Axis Labels
        const top = project3D(0, 1.2, 0, cx, cy, r);
        const bottom = project3D(0, -1.2, 0, cx, cy, r);
        ctx.fillStyle = '#333';
        ctx.fillText('|0⟩', top.x, top.y);
        ctx.fillText('|1⟩', bottom.x, bottom.y);

        // Draw Vector
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(tip.x, tip.y);
        ctx.strokeStyle = '#0057b8';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Tip
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 5 * tip.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#0057b8';
        ctx.fill();

        // State Text
        ctx.fillStyle = '#666';
        ctx.fillText(`θ: ${Math.round(theta * 180 / Math.PI)}°, φ: ${Math.round(phi * 180 / Math.PI)}°`, 20, canvas.height - 20);

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 17. Quantum Interference
function visualizeInterference() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let phaseShift = 0; // 0 = Constructive, 180 = Destructive

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div class="control-group">
            <label>Phase Difference (Result)</label>
            <input type="range" min="0" max="360" value="0" oninput="updatePhase(this.value)">
             <div style="display:flex;justify-content:space-between;font-size:12px;color:#666">
                <span>Amplified</span>
                <span>Cancelled</span>
                <span>Amplified</span>
            </div>
        </div>
    `;

    window.updatePhase = (val) => {
        phaseShift = val * (Math.PI / 180);
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cy = canvas.height / 2;

        ctx.lineWidth = 2;

        // Wave 1 (Fixed)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 87, 184, 0.5)';
        for (let x = 0; x < canvas.width; x++) {
            const y = cy - 50 + Math.sin(x * 0.05 + Date.now() * 0.005) * 30;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = '#0057b8'; ctx.fillText('Wave A', 10, cy - 60);

        // Wave 2 (Phase Shifted)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 0, 110, 0.5)';
        for (let x = 0; x < canvas.width; x++) {
            const y = cy + 50 + Math.sin(x * 0.05 + phaseShift + Date.now() * 0.005) * 30;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = '#ff006e'; ctx.fillText('Wave B', 10, cy + 90);

        // Resultant Wave (Sum)
        ctx.beginPath();
        ctx.strokeStyle = '#00d4aa';
        ctx.lineWidth = 4;
        let maxAmp = 0;

        for (let x = 0; x < canvas.width; x++) {
            // Sum of sines: sin(A) + sin(A + phi)
            // Identity: 2 * sin(A + phi/2) * cos(phi/2)
            // Amplitude factor is cos(phi/2)

            const w1 = Math.sin(x * 0.05 + Date.now() * 0.005);
            const w2 = Math.sin(x * 0.05 + phaseShift + Date.now() * 0.005);
            const sum = (w1 + w2) * 30; // Scale

            const y = cy + sum;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);

            if (Math.abs(sum) > maxAmp) maxAmp = Math.abs(sum);
        }
        ctx.stroke();

        ctx.fillStyle = '#00d4aa';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('RESULT (A + B)', 10, cy - 10);

        // Status Check
        if (maxAmp < 5) {
            ctx.fillStyle = '#333';
            ctx.fillText('DESTRUCTIVE INTERFERENCE', canvas.width / 2 - 100, cy + 130);
        } else if (maxAmp > 50) {
            ctx.fillStyle = '#333';
            ctx.fillText('CONSTRUCTIVE INTERFERENCE', canvas.width / 2 - 100, cy + 130);
        }

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// 18. QSphere (Multi-Qubit Visualization)
function visualizeQSphere() {
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 400; // Increased height for legend

    let currentState = 'bell_phi'; // presets: bell_phi, bell_psi, ghz, random
    let numQubits = 2;

    // Controls
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div style="display:flex; gap:5px; flex-wrap:wrap; justify-content:center; margin-bottom:10px">
            <button class="study-button" style="width:auto; font-size:12px" onclick="setQSphere('bell_phi')">Bell Φ+ (|00⟩+|11⟩)</button>
            <button class="study-button" style="width:auto; font-size:12px" onclick="setQSphere('bell_psi')">Bell Ψ- (|01⟩-|10⟩)</button>
            <button class="study-button" style="width:auto; font-size:12px" onclick="setQSphere('ghz')">GHZ (3-Qubit)</button>
            <button class="study-button" style="width:auto; font-size:12px" onclick="setQSphere('random')">Random State</button>
        </div>
        
        <!-- Phase Legend -->
        <div style="display:flex; justify-content:center; gap:15px; font-size:11px; color:#555; background:#f5f5f5; padding:5px; border-radius:4px">
            <div style="display:flex; align-items:center"><span style="width:10px; height:10px; background:red; border-radius:50%; margin-right:4px"></span>0° (Red)</div>
            <div style="display:flex; align-items:center"><span style="width:10px; height:10px; background:#ccff00; border-radius:50%; margin-right:4px"></span>90° (Yel)</div>
            <div style="display:flex; align-items:center"><span style="width:10px; height:10px; background:cyan; border-radius:50%; margin-right:4px"></span>180° (Cyan)</div>
            <div style="display:flex; align-items:center"><span style="width:10px; height:10px; background:blue; border-radius:50%; margin-right:4px"></span>270° (Blue)</div>
        </div>
        <div style="text-align:center; margin-top:5px; font-size:12px; color:#666">
            Vertical Position = Number of |1⟩s (Hamming Weight)
        </div>
    `;

    window.setQSphere = (type) => {
        currentState = type;
        if (type === 'ghz') numQubits = 3; else numQubits = 2;
    };

    function getStateData() {
        if (currentState === 'bell_phi') {
            return [{ bin: '00', mag: 0.707, phase: 0 }, { bin: '11', mag: 0.707, phase: 0 }];
        } else if (currentState === 'bell_psi') {
            return [{ bin: '01', mag: 0.707, phase: 0 }, { bin: '10', mag: 0.707, phase: Math.PI }];
        } else if (currentState === 'ghz') {
            return [{ bin: '000', mag: 0.707, phase: 0 }, { bin: '111', mag: 0.707, phase: 0 }];
        } else {
            let data = [];
            const count = Math.pow(2, numQubits);
            for (let i = 0; i < count; i++) {
                // Only show some states to avoid clutter
                if (Math.random() > 0.4) {
                    const bin = i.toString(2).padStart(numQubits, '0');
                    data.push({ bin: bin, mag: 0.4 + Math.random() * 0.4, phase: Math.random() * Math.PI * 2 });
                }
            }
            if (data.length === 0) data.push({ bin: '0'.repeat(numQubits), mag: 1, phase: 0 });
            return data;
        }
    }

    function getHammingWeight(str) {
        return str.split('').filter(c => c === '1').length;
    }

    function hslToRgb(h, s, l) {
        let r, g, b;
        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const r = 130;

        // Draw Sphere Outline
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

        // Draw Axis Line
        ctx.strokeStyle = '#f0f0f0';
        ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke();

        // Draw Hamming Weight Rings (Latitudes)
        const levels = numQubits + 1; // 0 to N
        for (let w = 0; w < levels; w++) {
            // Map weight 0 -> -90 (Top), N -> 90 (Bottom). In 2D canvas Y: Top is 0.
            // Let's Put Weight 0 at TOP (North Pole) and Weight N at BOTTOM (South Pole)

            const normalizedPos = w / numQubits; // 0 to 1
            const angle = -Math.PI / 2 + normalizedPos * Math.PI; // -PI/2 to +PI/2

            const ringY = cy + Math.sin(angle) * r;
            const ringRadius = Math.cos(angle) * r;

            // Draw ring ellipse
            if (ringRadius > 1) {
                ctx.beginPath();
                ctx.ellipse(cx, ringY, ringRadius, ringRadius * 0.3, 0, 0, Math.PI * 2);
                ctx.strokeStyle = '#ddd';
                ctx.setLineDash([2, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Label the Ring
            ctx.fillStyle = '#999';
            ctx.font = '10px Arial';
            ctx.textAlign = 'right';
            if (w === 0) ctx.fillText('No |1⟩s', cx - 140, ringY + 3);
            else if (w === numQubits) ctx.fillText('All |1⟩s', cx - 140, ringY + 3);
            else ctx.fillText(w + ' |1⟩', cx - 140, ringY + 3);
        }

        const data = getStateData();

        // Group data by Hamming weight to distribute evenly on rings
        const nodesByWeight = {};
        data.forEach(item => {
            const w = getHammingWeight(item.bin);
            if (!nodesByWeight[w]) nodesByWeight[w] = [];
            nodesByWeight[w].push(item);
        });

        // Render Nodes
        Object.keys(nodesByWeight).forEach(weight => {
            const items = nodesByWeight[weight];
            const w = parseInt(weight);

            const normalizedPos = w / numQubits;
            const angleLat = -Math.PI / 2 + normalizedPos * Math.PI;
            const ringY = cy + Math.sin(angleLat) * r;
            const ringRadius = Math.cos(angleLat) * r;

            items.forEach((item, index) => {
                // Distribute evenly around the ring
                const angleSeparation = (Math.PI * 2) / items.length;
                const angleLong = index * angleSeparation + Date.now() * 0.0005; // rotate slowly

                // 3D-ish position
                const nodeX = cx + Math.cos(angleLong) * ringRadius;
                // Add slight depth effect to Y based on position on ellipse
                const nodeZ = Math.sin(angleLong) * ringRadius;
                const nodeYAdjusted = ringY + nodeZ * 0.3;

                // Size = Magnitude
                const radius = 10 + item.mag * 15;

                // Color = Phase (HSV)
                const hue = item.phase / (Math.PI * 2);
                const color = hslToRgb(hue, 1, 0.5);

                const isFront = Math.sin(angleLong) > 0;

                // Draw connection to center (stick)
                ctx.beginPath();
                ctx.moveTo(cx, ringY); // Center of that ring slice
                ctx.lineTo(nodeX, nodeYAdjusted);
                ctx.strokeStyle = '#999';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw Node
                ctx.beginPath();
                ctx.arc(nodeX, nodeYAdjusted, radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.strokeStyle = '#333';
                ctx.stroke();

                // Label
                ctx.fillStyle = '#333';
                ctx.font = 'bold 12px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('|' + item.bin + '⟩', nodeX, nodeYAdjusted - radius - 5);
            });
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// Global Helper to jump to step by string ID
window.jumpToStepId = (id) => {
    const index = allSteps.findIndex(s => s.id === id);
    if (index !== -1) {
        loadStep(index);
        console.log('Jumped to ' + id);
    } else {
        console.warn('Step ID not found:', id);
    }
};
