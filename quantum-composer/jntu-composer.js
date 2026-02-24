// JNTU Quantum Composer - Beginner Edition JavaScript

let circuit = [];
let draggedGate = null;
let blochScene = null;
let blochCamera = null;
let blochRenderer = null;
let blochSphere = null;
let blochVector = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeBlochSphere();
    setupDragAndDrop();
});

// Drag and Drop
function setupDragAndDrop() {
    const gateBtns = document.querySelectorAll('.gate-btn');
    
    gateBtns.forEach(btn => {
        btn.addEventListener('dragstart', (e) => {
            draggedGate = {
                type: e.target.dataset.gate,
                qubits: parseInt(e.target.dataset.qubits)
            };
            e.dataTransfer.effectAllowed = 'copy';
        });
    });
}

function allowDrop(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    
    const qubitRow = event.currentTarget;
    if (!qubitRow.classList.contains('drag-over')) {
        qubitRow.classList.add('drag-over');
    }
}

function dropGate(event) {
    event.preventDefault();
    
    const qubitRow = event.currentTarget;
    qubitRow.classList.remove('drag-over');
    
    if (!draggedGate) return;
    
    const qubitIndex = parseInt(qubitRow.id.replace('qubit', ''));
    
    // Add gate to circuit
    addGateToCircuit(draggedGate.type, qubitIndex);
    
    draggedGate = null;
    updateCircuitDisplay();
}

function addGateToCircuit(gateType, qubitIndex) {
    circuit.push({
        type: gateType,
        qubit: qubitIndex,
        timestamp: circuit.length
    });
}

function updateCircuitDisplay() {
    // Update code
    updateCodeOutput();
    
    // Group gates by qubit
    const gatesByQubit = {
        0: [],
        1: [],
        2: []
    };
    
    circuit.forEach(gate => {
        gatesByQubit[gate.qubit].push(gate);
    });
    
    // Update visual representation in circuit area
    updateCircuitVisualization();
}

function updateCircuitVisualization() {
    const qubitRows = document.querySelectorAll('.qubit-row');
    
    qubitRows.forEach((row, index) => {
        // Clear existing gates
        const existingGates = row.querySelectorAll('.circuit-gate');
        existingGates.forEach(g => g.remove());
        
        // Add gates for this qubit
        const gatesForQubit = circuit.filter(g => g.qubit === index);
        
        gatesForQubit.forEach((gate, gateIndex) => {
            const gateElement = document.createElement('div');
            gateElement.className = 'circuit-gate';
            gateElement.textContent = gate.type;
            gateElement.style.cssText = `
                background: linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(26, 42, 152, 0.5));
                border: 1px solid #00d4ff;
                color: #00d4ff;
                padding: 5px 10px;
                border-radius: 3px;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
                white-space: nowrap;
                position: relative;
                margin-right: 5px;
                transition: all 0.3s ease;
            `;
            
            gateElement.addEventListener('mouseenter', () => {
                gateElement.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.6), rgba(26, 42, 152, 0.8))';
                gateElement.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.5)';
            });
            
            gateElement.addEventListener('mouseleave', () => {
                gateElement.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(26, 42, 152, 0.5))';
                gateElement.style.boxShadow = 'none';
            });
            
            gateElement.addEventListener('click', () => {
                removeGate(index, gateIndex);
            });
            
            row.appendChild(gateElement);
        });
    });
}

function removeGate(qubitIndex, gateIndex) {
    const gatesForQubit = circuit.filter(g => g.qubit === qubitIndex);
    if (gateIndex < gatesForQubit.length) {
        const gateToRemove = gatesForQubit[gateIndex];
        circuit = circuit.filter(g => g !== gateToRemove);
        updateCircuitDisplay();
    }
}

function resetCircuit() {
    circuit = [];
    updateCircuitDisplay();
    document.getElementById('stateVector').innerHTML = '<p>Run simulation to see state vector</p>';
    document.getElementById('measurements').innerHTML = '<p>Run simulation to see measurement results</p>';
}

// Code Generation
function updateCodeOutput() {
    let code = `from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit_aer import AerSimulator

# Initialize circuit
qr = QuantumRegister(3, 'q')
cr = ClassicalRegister(3, 'c')
qc = QuantumCircuit(qr, cr)

`;
    
    // Add gates to code
    circuit.forEach(gate => {
        const qubit = gate.qubit;
        
        switch(gate.type) {
            case 'X':
                code += `qc.x(qr[${qubit}])  # Pauli-X (NOT gate)\n`;
                break;
            case 'Y':
                code += `qc.y(qr[${qubit}])  # Pauli-Y gate\n`;
                break;
            case 'Z':
                code += `qc.z(qr[${qubit}])  # Pauli-Z gate\n`;
                break;
            case 'H':
                code += `qc.h(qr[${qubit}])  # Hadamard gate\n`;
                break;
            case 'S':
                code += `qc.s(qr[${qubit}])  # S gate (Phase gate)\n`;
                break;
            case 'T':
                code += `qc.t(qr[${qubit}])  # T gate\n`;
                break;
            case 'CNOT':
                code += `qc.cx(qr[${qubit}], qr[${qubit + 1}])  # CNOT gate\n`;
                break;
            case 'SWAP':
                code += `qc.swap(qr[${qubit}], qr[${qubit + 1}])  # SWAP gate\n`;
                break;
            case 'CZ':
                code += `qc.cz(qr[${qubit}], qr[${qubit + 1}])  # Controlled-Z gate\n`;
                break;
            case 'MEASURE':
                code += `qc.measure(qr[${qubit}], cr[${qubit}])  # Measurement\n`;
                break;
        }
    });
    
    code += `\n# Execute circuit
simulator = AerSimulator()
job = simulator.run(qc, shots=1000)
result = job.result()
counts = result.get_counts(qc)
`;
    
    document.getElementById('codeOutput').textContent = code;
}

// Simulation
function runSimulation() {
    if (circuit.length === 0) {
        alert('Please add gates to the circuit first!');
        return;
    }
    
    // Simulate quantum state evolution
    let state = simulateCircuit();
    
    // Update visualizations
    updateStateVector(state);
    updateMeasurements(state);
    updateBlochSphere(state);
}

function simulateCircuit() {
    // Initialize |000⟩ state
    let amplitudes = new Array(8).fill(0);
    amplitudes[0] = 1;
    
    // Apply each gate
    circuit.forEach(gate => {
        switch(gate.type) {
            case 'X':
                amplitudes = applyPauliX(amplitudes, gate.qubit);
                break;
            case 'Y':
                amplitudes = applyPauliY(amplitudes, gate.qubit);
                break;
            case 'Z':
                amplitudes = applyPauliZ(amplitudes, gate.qubit);
                break;
            case 'H':
                amplitudes = applyHadamard(amplitudes, gate.qubit);
                break;
            case 'S':
                amplitudes = applyS(amplitudes, gate.qubit);
                break;
            case 'T':
                amplitudes = applyT(amplitudes, gate.qubit);
                break;
        }
    });
    
    return amplitudes;
}

// Quantum Gate Simulations
function applyPauliX(state, qubit) {
    const newState = state.slice();
    for (let i = 0; i < state.length; i++) {
        if ((i >> qubit) & 1 === 0) {
            const j = i ^ (1 << qubit);
            [newState[i], newState[j]] = [newState[j], newState[i]];
        }
    }
    return newState;
}

function applyPauliY(state, qubit) {
    const newState = new Array(state.length).fill(0);
    for (let i = 0; i < state.length; i++) {
        const j = i ^ (1 << qubit);
        const bitValue = (i >> qubit) & 1;
        newState[j] += state[i] * (bitValue === 0 ? new Complex(0, 1) : new Complex(0, -1));
    }
    return newState;
}

function applyPauliZ(state, qubit) {
    const newState = state.slice();
    for (let i = 0; i < state.length; i++) {
        if ((i >> qubit) & 1) {
            newState[i] = -newState[i];
        }
    }
    return newState;
}

function applyHadamard(state, qubit) {
    const newState = new Array(state.length).fill(0);
    const factor = 1 / Math.sqrt(2);
    for (let i = 0; i < state.length; i++) {
        const j = i ^ (1 << qubit);
        const bitValue = (i >> qubit) & 1;
        const sign = bitValue === 0 ? 1 : -1;
        newState[i] += factor * state[i] + factor * sign * state[j];
    }
    return newState;
}

function applyS(state, qubit) {
    const newState = state.slice();
    for (let i = 0; i < state.length; i++) {
        if ((i >> qubit) & 1) {
            newState[i] = newState[i] * new Complex(0, 1);
        }
    }
    return newState;
}

function applyT(state, qubit) {
    const newState = state.slice();
    for (let i = 0; i < state.length; i++) {
        if ((i >> qubit) & 1) {
            const phase = Math.PI / 4;
            newState[i] = newState[i] * new Complex(Math.cos(phase), Math.sin(phase));
        }
    }
    return newState;
}

class Complex {
    constructor(real, imag) {
        this.real = real || 0;
        this.imag = imag || 0;
    }
    
    multiply(other) {
        return new Complex(
            this.real * other.real - this.imag * other.imag,
            this.real * other.imag + this.imag * other.real
        );
    }
    
    add(other) {
        return new Complex(
            this.real + other.real,
            this.imag + other.imag
        );
    }
    
    magnitude() {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }
    
    toString() {
        const realStr = this.real.toFixed(3);
        const imagStr = Math.abs(this.imag).toFixed(3);
        const sign = this.imag >= 0 ? '+' : '-';
        return `${realStr}${sign}${imagStr}i`;
    }
}

// Visualization Updates
function updateStateVector(amplitudes) {
    const labels = [
        '|000⟩', '|001⟩', '|010⟩', '|011⟩',
        '|100⟩', '|101⟩', '|110⟩', '|111⟩'
    ];
    
    let html = '<h4 style="color: #00d4ff; margin-bottom: 10px;">State Vector</h4>';
    
    amplitudes.forEach((amp, index) => {
        const prob = Math.abs(amp) * Math.abs(amp);
        if (prob > 0.001) {
            const percentage = (prob * 100).toFixed(2);
            html += `
                <div class="state-amplitude">
                    <span class="amplitude-label">${labels[index]}</span>
                    <div class="amplitude-bar">
                        <div class="amplitude-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="amplitude-value">${percentage}%</span>
                </div>
            `;
        }
    });
    
    document.getElementById('stateVector').innerHTML = html;
}

function updateMeasurements(amplitudes) {
    // Simulate 1000 measurements
    const measurements = {};
    const labels = [
        '000', '001', '010', '011',
        '100', '101', '110', '111'
    ];
    
    for (let i = 0; i < 1000; i++) {
        let rand = Math.random();
        let prob = 0;
        for (let j = 0; j < amplitudes.length; j++) {
            prob += Math.abs(amplitudes[j]) * Math.abs(amplitudes[j]);
            if (rand < prob) {
                measurements[labels[j]] = (measurements[labels[j]] || 0) + 1;
                break;
            }
        }
    }
    
    let html = '<h4 style="color: #00d4ff; margin-bottom: 10px;">Measurement Results (1000 shots)</h4>';
    
    Object.entries(measurements).sort((a, b) => b[1] - a[1]).forEach(([state, count]) => {
        const percentage = (count / 10);
        html += `
            <div class="measurement-result">
                <span class="measurement-state">${state}</span>
                <div class="measurement-bar">
                    <div class="measurement-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="measurement-count">${count}</span>
            </div>
        `;
    });
    
    document.getElementById('measurements').innerHTML = html;
}

// Bloch Sphere Visualization
function initializeBlochSphere() {
    const container = document.getElementById('blochContainer');
    
    // Three.js setup
    blochScene = new THREE.Scene();
    blochScene.background = new THREE.Color(0x0f0f1e);
    
    blochCamera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    blochCamera.position.z = 1.5;
    
    blochRenderer = new THREE.WebGLRenderer({ antialias: true });
    blochRenderer.setSize(container.clientWidth, container.clientHeight);
    blochRenderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(blochRenderer.domElement);
    
    // Create Bloch sphere
    const geometry = new THREE.SphereGeometry(0.8, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x1e3c72,
        metalness: 0.3,
        roughness: 0.4,
        wireframe: true
    });
    blochSphere = new THREE.Mesh(geometry, material);
    blochScene.add(blochSphere);
    
    // Add coordinate axes
    const axesHelper = new THREE.AxesHelper(1.2);
    blochScene.add(axesHelper);
    
    // Add state vector
    const vectorGeometry = new THREE.BufferGeometry();
    vectorGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
        0, 0, 0,
        0, 0, 1
    ]), 3));
    
    const vectorMaterial = new THREE.LineBasicMaterial({ color: 0x00d4ff, linewidth: 3 });
    blochVector = new THREE.Line(vectorGeometry, vectorMaterial);
    blochScene.add(blochVector);
    
    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(5, 5, 5);
    blochScene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    blochScene.add(ambientLight);
    
    animateBloch();
}

function updateBlochSphere(amplitudes) {
    // For beginner version, show only first qubit state
    const alpha = amplitudes[0];
    const beta = amplitudes[1];
    
    // Calculate Bloch coordinates
    const prob0 = Math.abs(alpha) * Math.abs(alpha);
    const prob1 = Math.abs(beta) * Math.abs(beta);
    
    const theta = 2 * Math.acos(Math.sqrt(prob0));
    const phi = Math.atan2(beta.imag || 0, beta.real || 0);
    
    const x = Math.sin(theta) * Math.cos(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(theta);
    
    // Update vector
    const positions = blochVector.geometry.attributes.position.array;
    positions[3] = x * 0.8;
    positions[4] = y * 0.8;
    positions[5] = z * 0.8;
    blochVector.geometry.attributes.position.needsUpdate = true;
}

function animateBloch() {
    requestAnimationFrame(animateBloch);
    
    // Rotate sphere
    blochSphere.rotation.x += 0.001;
    blochSphere.rotation.y += 0.002;
    
    blochRenderer.render(blochScene, blochCamera);
}

// Tab Switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Copy Code
function copyCode() {
    const code = document.getElementById('codeOutput').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    const container = document.getElementById('blochContainer');
    if (blochRenderer) {
        blochRenderer.setSize(container.clientWidth, container.clientHeight);
        blochCamera.aspect = container.clientWidth / container.clientHeight;
        blochCamera.updateProjectionMatrix();
    }
});
