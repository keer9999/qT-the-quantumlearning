// Advanced Quantum Composer - Professional Edition JavaScript

let circuit = [];
let numQubits = 4;
let draggedGate = null;
let blochScene = null;
let blochCamera = null;
let blochRenderer = null;
let blochSpheres = [];
let selectedQubit = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createCircuitRows();
    initializeBlochSpheres();
    setupDragAndDrop();
});

// Create circuit rows based on qubit count
function createCircuitRows() {
    const container = document.getElementById('qubitRows');
    container.innerHTML = '';
    
    for (let i = 0; i < numQubits; i++) {
        const row = document.createElement('div');
        row.className = 'qubit-row';
        row.id = `qubit-${i}`;
        row.ondrop = (e) => dropGate(e, i);
        row.ondragover = allowDrop;
        row.ondragleave = (e) => e.currentTarget.style.opacity = '1';
        
        row.innerHTML = `
            <span class="qubit-label">q[${i}]</span>
            <div class="circuit-line"></div>
        `;
        
        container.appendChild(row);
    }
}

function updateCircuitQubits() {
    numQubits = parseInt(document.getElementById('qubitCount').value);
    circuit = [];
    createCircuitRows();
    updateCircuitDisplay();
}

// Drag and Drop
function setupDragAndDrop() {
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('gate-btn')) {
            draggedGate = {
                type: e.target.dataset.gate,
                gateType: e.target.dataset.type
            };
            e.dataTransfer.effectAllowed = 'copy';
        }
    });
    
    document.addEventListener('dragend', () => {
        draggedGate = null;
    });
}

function allowDrop(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    event.currentTarget.style.opacity = '0.7';
}

function dropGate(event, qubitIndex) {
    event.preventDefault();
    event.currentTarget.style.opacity = '1';
    
    if (!draggedGate) return;
    
    // Handle two-qubit and three-qubit gates
    if (draggedGate.gateType === 'two' && qubitIndex < numQubits - 1) {
        circuit.push({
            type: draggedGate.type,
            qubit: qubitIndex,
            controlQubit: qubitIndex + 1,
            timestamp: circuit.length,
            gateType: 'two'
        });
    } else if (draggedGate.gateType === 'three' && qubitIndex < numQubits - 2) {
        circuit.push({
            type: draggedGate.type,
            qubit: qubitIndex,
            controlQubits: [qubitIndex + 1, qubitIndex + 2],
            timestamp: circuit.length,
            gateType: 'three'
        });
    } else if (draggedGate.gateType === 'single' || draggedGate.gateType === 'measure') {
        circuit.push({
            type: draggedGate.type,
            qubit: qubitIndex,
            timestamp: circuit.length,
            gateType: draggedGate.gateType
        });
    }
    
    updateCircuitDisplay();
}

function updateCircuitDisplay() {
    // Update visualization
    updateCircuitVisualization();
    
    // Update code
    updateCodeOutput();
    
    // Update status
    updateStatus();
}

function updateCircuitVisualization() {
    // Group gates by position
    const gatesByQubit = {};
    for (let i = 0; i < numQubits; i++) {
        gatesByQubit[i] = [];
    }
    
    circuit.forEach(gate => {
        gatesByQubit[gate.qubit].push(gate);
        if (gate.controlQubit !== undefined) {
            gatesByQubit[gate.controlQubit].push(null); // Placeholder for control
        }
    });
    
    // Render gates
    for (let i = 0; i < numQubits; i++) {
        const row = document.getElementById(`qubit-${i}`);
        const existingGates = row.querySelectorAll('.circuit-gate');
        existingGates.forEach(g => g.remove());
        
        const gatesForQubit = circuit.filter(g => g.qubit === i);
        
        gatesForQubit.forEach((gate, index) => {
            const gateElement = document.createElement('div');
            gateElement.className = 'circuit-gate';
            gateElement.textContent = gate.type;
            
            if (gate.gateType === 'two') {
                gateElement.style.borderColor = '#00d4ff';
                gateElement.style.color = '#00d4ff';
            } else if (gate.gateType === 'three') {
                gateElement.style.borderColor = '#64c896';
                gateElement.style.color = '#64c896';
            } else if (gate.gateType === 'measure') {
                gateElement.style.borderColor = '#ffc864';
                gateElement.style.color = '#ffc864';
            }
            
            gateElement.addEventListener('click', () => {
                removeGate(i, index);
            });
            
            row.appendChild(gateElement);
        });
    }
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
    document.getElementById('measurementsDisplay').innerHTML = '<p>Run simulation to see measurement results</p>';
}

// Code Generation
function updateCodeOutput() {
    let code = `from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit_aer import AerSimulator
from qiskit.visualization import plot_histogram

# Initialize quantum and classical registers
qr = QuantumRegister(${numQubits}, 'q')
cr = ClassicalRegister(${numQubits}, 'c')

# Create quantum circuit
qc = QuantumCircuit(qr, cr)

`;
    
    // Add gates to code
    circuit.forEach(gate => {
        const q = gate.qubit;
        
        switch(gate.type) {
            case 'X':
                code += `qc.x(qr[${q}])\n`;
                break;
            case 'Y':
                code += `qc.y(qr[${q}])\n`;
                break;
            case 'Z':
                code += `qc.z(qr[${q}])\n`;
                break;
            case 'H':
                code += `qc.h(qr[${q}])\n`;
                break;
            case 'S':
                code += `qc.s(qr[${q}])\n`;
                break;
            case 'T':
                code += `qc.t(qr[${q}])\n`;
                break;
            case 'RX':
                code += `qc.rx(pi/4, qr[${q}])  # π/4 rotation\n`;
                break;
            case 'RY':
                code += `qc.ry(pi/4, qr[${q}])  # π/4 rotation\n`;
                break;
            case 'RZ':
                code += `qc.rz(pi/4, qr[${q}])  # π/4 rotation\n`;
                break;
            case 'CNOT':
                if (gate.controlQubit !== undefined) {
                    code += `qc.cx(qr[${q}], qr[${gate.controlQubit}])\n`;
                }
                break;
            case 'SWAP':
                if (gate.controlQubit !== undefined) {
                    code += `qc.swap(qr[${q}], qr[${gate.controlQubit}])\n`;
                }
                break;
            case 'CZ':
                if (gate.controlQubit !== undefined) {
                    code += `qc.cz(qr[${q}], qr[${gate.controlQubit}])\n`;
                }
                break;
            case 'iSWAP':
                if (gate.controlQubit !== undefined) {
                    code += `qc.iswap(qr[${q}], qr[${gate.controlQubit}])\n`;
                }
                break;
            case 'XX':
                if (gate.controlQubit !== undefined) {
                    code += `qc.rxx(pi/4, qr[${q}], qr[${gate.controlQubit}])\n`;
                }
                break;
            case 'YY':
                if (gate.controlQubit !== undefined) {
                    code += `qc.ryy(pi/4, qr[${q}], qr[${gate.controlQubit}])\n`;
                }
                break;
            case 'ZZ':
                if (gate.controlQubit !== undefined) {
                    code += `qc.rzz(pi/4, qr[${q}], qr[${gate.controlQubit}])\n`;
                }
                break;
            case 'Toffoli':
                if (gate.controlQubits) {
                    code += `qc.ccx(qr[${gate.controlQubits[0]}], qr[${gate.controlQubits[1]}], qr[${q}])\n`;
                }
                break;
            case 'Fredkin':
                if (gate.controlQubits) {
                    code += `qc.cswap(qr[${gate.controlQubits[0]}], qr[${q}], qr[${gate.controlQubits[1]}])\n`;
                }
                break;
            case 'MEASURE':
                code += `qc.measure(qr[${q}], cr[${q}])\n`;
                break;
        }
    });
    
    code += `\n# Execute on simulator
simulator = AerSimulator()
job = simulator.run(qc, shots=1024)
result = job.result()
counts = result.get_counts(qc)

print(counts)
`;
    
    document.getElementById('codeOutput').textContent = code;
}

// Status Update
function updateStatus() {
    const depth = Math.max(...Object.values(
        circuit.reduce((acc, gate) => {
            acc[gate.qubit] = (acc[gate.qubit] || 0) + 1;
            return acc;
        }, {})
    ), 0);
    
    document.getElementById('depth').textContent = depth;
    document.getElementById('gateCount').textContent = circuit.length;
    document.getElementById('execTime').textContent = (circuit.length * 100) + ' μs';
}

// Simulation
function runSimulation() {
    if (circuit.length === 0) {
        alert('Please add gates to the circuit first!');
        return;
    }
    
    // Simulate quantum state evolution
    let amplitudes = simulateCircuit();
    
    // Update visualizations
    updateStateVector(amplitudes);
    updateMeasurements(amplitudes);
    updateBlochDisplay(amplitudes);
}

function simulateCircuit() {
    // Initialize |0...0⟩ state
    const stateSize = Math.pow(2, numQubits);
    let amplitudes = new Array(stateSize).fill(0);
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
        const j = i ^ (1 << qubit);
        [newState[i], newState[j]] = [newState[j], newState[i]];
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
}

// Visualization Updates
function updateStateVector(amplitudes) {
    let html = '<h4 style="color: #e94560; margin-bottom: 10px;">State Vector</h4>';
    
    amplitudes.forEach((amp, index) => {
        const prob = Math.abs(amp) * Math.abs(amp);
        if (prob > 0.001) {
            const percentage = (prob * 100).toFixed(2);
            const binaryState = index.toString(2).padStart(numQubits, '0');
            html += `
                <div class="state-amplitude">
                    <span class="amplitude-label">|${binaryState}⟩</span>
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
    // Simulate 1024 measurements
    const measurements = {};
    
    for (let i = 0; i < 1024; i++) {
        let rand = Math.random();
        let prob = 0;
        for (let j = 0; j < amplitudes.length; j++) {
            prob += Math.abs(amplitudes[j]) * Math.abs(amplitudes[j]);
            if (rand < prob) {
                const state = j.toString(2).padStart(numQubits, '0');
                measurements[state] = (measurements[state] || 0) + 1;
                break;
            }
        }
    }
    
    let html = '<h4 style="color: #e94560; margin-bottom: 10px;">Measurement Results</h4>';
    
    Object.entries(measurements).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([state, count]) => {
        const percentage = (count / 10.24);
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
    
    document.getElementById('measurementsDisplay').innerHTML = html;
}

// Bloch Sphere
function initializeBlochSpheres() {
    const container = document.getElementById('blochContainer');
    
    blochScene = new THREE.Scene();
    blochScene.background = new THREE.Color(0x0a0e27);
    
    blochCamera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    blochCamera.position.z = 1.5;
    
    blochRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    blochRenderer.setSize(container.clientWidth, container.clientHeight);
    blochRenderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(blochRenderer.domElement);
    
    // Create Bloch sphere
    const geometry = new THREE.SphereGeometry(0.8, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x1a3a52,
        metalness: 0.4,
        roughness: 0.5,
        wireframe: true
    });
    const sphere = new THREE.Mesh(geometry, material);
    blochScene.add(sphere);
    
    // Add axes
    const axesHelper = new THREE.AxesHelper(1.2);
    blochScene.add(axesHelper);
    
    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 0.6);
    light.position.set(5, 5, 5);
    blochScene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    blochScene.add(ambientLight);
    
    animateBloch();
}

function updateBlochDisplay(amplitudes) {
    // Display first qubit's Bloch sphere
}

function animateBloch() {
    requestAnimationFrame(animateBloch);
    
    if (blochRenderer) {
        blochRenderer.render(blochScene, blochCamera);
    }
}

// Tab Switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Copy Code
function copyCode() {
    const code = document.getElementById('codeOutput').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    });
}

// Download Code
function downloadCode() {
    const code = document.getElementById('codeOutput').textContent;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quantum_circuit.py';
    a.click();
}

// Window resize
window.addEventListener('resize', () => {
    const container = document.getElementById('blochContainer');
    if (blochRenderer && container) {
        blochRenderer.setSize(container.clientWidth, container.clientHeight);
        blochCamera.aspect = container.clientWidth / container.clientHeight;
        blochCamera.updateProjectionMatrix();
    }
});
