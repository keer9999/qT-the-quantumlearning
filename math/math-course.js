const courseData = {
    modules: [
        {
            id: 'module1',
            title: 'Module 1: The Qubit',
            steps: [
                {
                    id: 'step1',
                    title: 'What is a Qubit?',
                    subtitle: 'Beyond 0 and 1',
                    visualizer: 'visualizeQubitBasics',
                    explanation: `
                        <h3>The Fundamental Unit</h3>
                        <p>A classical bit is like a switch: either <strong>OFF (0)</strong> or <strong>ON (1)</strong>.</p>
                        <p>A <strong>Qubit</strong> (Quantum Bit) is like a spinning arrow in a 3D sphere (Bloch Sphere). It can be pointing up (0), down (1), or <strong>anywhere in between</strong>.</p>
                        <p>This "in-between" state is called <strong>Superposition</strong>.</p>
                        <p><strong>Interact:</strong> Toggle between Classical and Quantum modes above to see the difference.</p>
                    `
                },
                {
                    id: 'step2',
                    title: 'Physical Qubits',
                    subtitle: 'How do we build them?',
                    visualizer: 'visualizePhysicalQubits',
                    explanation: `
                        <h3>Real World Hardware</h3>
                        <p>Qubits are built using diverse physical systems. Here is a detailed look at the leading technologies:</p>
                        <div style="height: 300px; overflow-y: auto; padding-right: 10px; border: 1px solid #eee; padding: 10px; border-radius: 8px;">
                        <ul style="line-height: 1.8;">
                            <li><strong>Superconducting Circuits (IBM, Google):</strong> 
                                <br><em>Mechanism:</em> LC circuits made of superconducting material (aluminum/niobium) with a Josephson Junction.
                                <br><em>Pros:</em> Fast gate speeds (nanoseconds), manufacturable using existing semiconductor techniques.
                                <br><em>Cons:</em> Needs dilution refrigerators (15mK), short coherence times.
                            </li>
                            <hr style="border:0; border-top:1px dashed #ccc; margin:10px 0;">
                            <li><strong>Trapped Ions (IonQ, Honeywell):</strong> 
                                <br><em>Mechanism:</em> Individual charged atoms (Ytterbium, Calcium) suspended in a vacuum by electromagnetic fields.
                                <br><em>Pros:</em> Incredible coherence times (seconds to minutes), perfect identical qubits (nature makes them).
                                <br><em>Cons:</em> Slow gate speeds (microseconds), hard to scale to millions of ions.
                            </li>
                            <hr style="border:0; border-top:1px dashed #ccc; margin:10px 0;">
                            <li><strong>Photonic Qubits (PsiQuantum, Xanadu):</strong> 
                                <br><em>Mechanism:</em> Photons (particles of light) traveling through waveguides.
                                <br><em>Pros:</em> Can operate at room temperature, easy to integrate with fiber optics communication.
                                <br><em>Cons:</em> Photons don't like to interact (hard to do 2-qubit gates), loss of photons is a major issue.
                            </li>
                            <hr style="border:0; border-top:1px dashed #ccc; margin:10px 0;">
                            <li><strong>Silicon Spin Qubits (Intel):</strong> 
                                <br><em>Mechanism:</em> Electron spin trapped in a quantum dot within silicon.
                                <br><em>Pros:</em> extremely small (can pack billions on a chip), leverages massive global silicon industry.
                                <br><em>Cons:</em> Wiring complexity is high, material purity must be extreme.
                            </li>
                            <hr style="border:0; border-top:1px dashed #ccc; margin:10px 0;">
                            <li><strong>Neutral Atoms (QuEra, Pascal):</strong> 
                                <br><em>Mechanism:</em> Uncharged atoms held in place by "optical tweezers" (highly focused laser beams).
                                <br><em>Pros:</em> Can create large 2D/3D arrays easily, strong interaction when excited to Rydberg states.
                                <br><em>Cons:</em> Atoms can fly away if lasers flicker, slower than superconductors.
                            </li>
                            <hr style="border:0; border-top:1px dashed #ccc; margin:10px 0;">
                            <li><strong>NV Centers (Diamond):</strong> 
                                <br><em>Mechanism:</em> Nitrogen-Vacancy defects in a diamond crystal lattice.
                                <br><em>Pros:</em> Works at room temperature! Great for quantum sensing.
                                <br><em>Cons:</em> Hard to scale for computing, difficult to initialize.
                            </li>
                            <hr style="border:0; border-top:1px dashed #ccc; margin:10px 0;">
                            <li><strong>Topological Qubits (Microsoft):</strong> 
                                <br><em>Mechanism:</em> Quasiparticles called Majorana Fermions "braided" in time.
                                <br><em>Pros:</em> <strong>Topologically protected</strong> from noise (hardware-level error correction).
                                <br><em>Cons:</em> Extremely difficult to create; experimental evidence is still maturing.
                            </li>
                        </ul>
                        </div>
                    `
                },
                {
                    id: 'step3',
                    title: 'The State Vector',
                    subtitle: 'Amplitudes & Probabilities',
                    visualizer: 'visualizeStateVector',
                    explanation: `
                        <h3>Math of the Arrow</h3>
                        <p>A qubit is described by a <strong>State Vector</strong> $|\\psi\\rangle$. unlike classical bits, it has <strong>Amplitudes</strong> ($ \\alpha, \\beta $) instead of just values.</p>
                        
                        <div style="background:#f0f8ff; padding:15px; border-radius:8px; text-align:center; font-family:monospace; font-size:1.2em; border: 1px solid #b3d7ff;">
                            |ψ⟩ = α|0⟩ + β|1⟩
                        </div>

                        <h4>1. Amplitudes vs Probabilities</h4>
                        <p>$\\alpha$ and $\beta$ are <strong>Probability Amplitudes</strong>. They are complex numbers, meaning they can be negative or imaginary (which allows for interference!).</p>
                        <ul>
                            <li><strong>Probability of 0:</strong> $P(0) = |\\alpha|^2$</li>
                            <li><strong>Probability of 1:</strong> $P(1) = |\\beta|^2$</li>
                        </ul>

                        <h4>2. Geometric Representation (Sine & Cosine)</h4>
                        <p>Since the total probability must be 1 ($|\alpha|^2 + |\beta|^2 = 1$), we can parameterize the state using trigonometry, mapping it to a sphere:</p>
                        <div style="background:#fff0f6; padding:15px; border-radius:8px; border:1px solid #ffadd2; text-align:center;">
                            $\\alpha = \\cos(\\frac{\\theta}{2})$ <br>
                            $\\beta = e^{i\\phi} \\sin(\\frac{\\theta}{2})$
                        </div>
                        <p>This ensures that $\\cos^2(\\frac{\\theta}{2}) + \\sin^2(\\frac{\\theta}{2}) = 1$ is always true.</p>
                        <p><strong>$\\theta$ (Theta):</strong> Controls the probability balance (Latitude on the sphere).</p>
                        <p><strong>$\\phi$ (Phi):</strong> Controls the quantum phase (Longitude), crucial for algorithms.</p>
                    `
                }
            ]
        },
        {
            id: 'module2',
            title: 'Module 2: Dirac Notation & Products',
            steps: [
                {
                    id: 'step4',
                    title: 'The Ket |ψ⟩ (Vector)',
                    subtitle: 'Column Vector',
                    visualizer: 'visualizeKet',
                    explanation: `
                        <h3>The Ket Notation</h3>
                        <p>Physicists use a shorthand called <strong>Dirac Notation</strong>.</p>
                        <p>A column vector is written as a "Ket": <strong>|ψ⟩</strong>.</p>
                        <div style="display:flex; justify-content:space-around; margin:20px 0;">
                            <div style="background:#fff; padding:10px; border:1px solid #ddd; border-radius:5px;">
                                <strong>The Zero State</strong><br><br>
                                |0⟩ = <span style="font-size:1.5em; vertical-align:middle">[</span><div style="display:inline-block; vertical-align:middle; text-align:center">1<br>0</div><span style="font-size:1.5em; vertical-align:middle">]</span>
                            </div>
                            <div style="background:#fff; padding:10px; border:1px solid #ddd; border-radius:5px;">
                                <strong>The One State</strong><br><br>
                                |1⟩ = <span style="font-size:1.5em; vertical-align:middle">[</span><div style="display:inline-block; vertical-align:middle; text-align:center">0<br>1</div><span style="font-size:1.5em; vertical-align:middle">]</span>
                            </div>
                        </div>
                    `
                },
                {
                    id: 'step5',
                    title: 'The Bra ⟨ψ| (Dual)',
                    subtitle: 'Row Vector',
                    visualizer: 'visualizeBra',
                    explanation: `
                        <h3>The Bra Notation</h3>
                        <p>The partner to a Ket is a "Bra": <strong>⟨ψ|</strong>.</p>
                        <p>A Bra is the <strong>Conjugate Transpose</strong> (Dagger †) of a Ket.</p>
                        <div style="background:#fff4e6; padding:15px; border-radius:8px; border:1px solid #ffe8cc; font-family:monospace;">
                            On Complex Numbers:<br>
                            If z = a + bi, then z* = a - bi (Conjugate).<br><br>
                            |ψ⟩ = [α, β]ᵀ <br>
                            ⟨ψ| = (|ψ⟩)† = [α*, β*]
                        </div>
                    `
                },
                {
                    id: 'step6',
                    title: 'The Inner Product',
                    subtitle: 'Scalar Overlap',
                    visualizer: 'visualizeInnerProduct',
                    explanation: `
                        <h3>⟨Bra|Ket⟩ = Scalar</h3>
                        <p>The <strong>Inner Product</strong> represents the <strong>overlap</strong> or similarity between two quantum states. It results in a single complex number (scalar).</p>
                        <div style="background:#f0fff4; padding:15px; border-radius:8px; border:1px solid #b7eb8f; margin:10px 0;">
                            <strong>General Formula:</strong><br>
                            ⟨φ|ψ⟩ = [c₀*, c₁*] · <span style="font-size:1.2em; vertical-align:middle">[</span><div style="display:inline-block; vertical-align:middle; text-align:center">d₀<br>d₁</div><span style="font-size:1.2em; vertical-align:middle">]</span> = c₀*d₀ + c₁*d₁
                        </div>
                        <h3>Orthonormality of Basis States</h3>
                        <p>Let's derive the inner products for our basis states <strong>|0⟩</strong> and <strong>|1⟩</strong>.</p>
                        <div style="font-family:monospace; background:#fff; padding:10px; border:1px solid #ddd; border-radius:5px;">
                            <strong>1. ⟨0|0⟩ (Overlap of 0 with itself):</strong><br>
                            = [1, 0] · [1, 0]ᵀ = (1)(1) + (0)(0) = <strong>1</strong> (Normalized)<br><br>
                            
                            <strong>2. ⟨1|1⟩ (Overlap of 1 with itself):</strong><br>
                            = [0, 1] · [0, 1]ᵀ = (0)(0) + (1)(1) = <strong>1</strong> (Normalized)<br><br>
                            
                            <strong>3. ⟨0|1⟩ (Overlap of 0 with 1):</strong><br>
                            = [1, 0] · [0, 1]ᵀ = (1)(0) + (0)(1) = <strong>0</strong> (Orthogonal)<br><br>
                            
                            <strong>4. ⟨1|0⟩ (Overlap of 1 with 0):</strong><br>
                            = [0, 1] · [1, 0]ᵀ = (0)(1) + (1)(0) = <strong>0</strong> (Orthogonal)
                        </div>
                        <p>This proves that |0⟩ and |1⟩ form an <strong>Orthonormal Basis</strong>.</p>
                    `
                },
                {
                    id: 'step7',
                    title: 'The Outer Product',
                    subtitle: 'Projectors & Matrices',
                    visualizer: 'visualizeOuterProduct',
                    explanation: `
                        <h3>|Ket⟩⟨Bra| = Matrix</h3>
                        <p>The <strong>Outer Product</strong> creates an operator (matrix) from two vectors.</p>
                        <div style="text-align: center; margin: 20px 0;">
                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/SVKQu_H9WM4?si=MA-BiMBQvX3gWTSj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>
                            <p style="font-size: 0.9em; color: #666; margin-top: 5px;">Visualizing Outer Product Concepts</p>
                        </div>
                        <div style="background:#f0f8ff; padding:15px; border-radius:8px; border:1px solid #b3d7ff; margin:10px 0;">
                            <strong>Formula:</strong><br><br>
                            |ψ⟩⟨φ| = <span style="font-size:1.2em; vertical-align:middle">[</span><div style="display:inline-block; vertical-align:middle; text-align:center">c₀<br>c₁</div><span style="font-size:1.2em; vertical-align:middle">]</span> · [d₀*, d₁*] = 
                            <span style="font-size:1.5em; vertical-align:middle">[</span><div style="display:inline-block; vertical-align:middle; text-align:center">c₀d₀* &nbsp; c₀d₁*<br>c₁d₀* &nbsp; c₁d₁*</div><span style="font-size:1.5em; vertical-align:middle">]</span>
                        </div>
                        <p><strong>Applications:</strong></p>
                        <ul>
                            <li><strong>Projection Operators:</strong> P = |ψ⟩⟨ψ|. Used to describe measurement. P|state⟩ projects the state onto |ψ⟩.</li>
                            <li><strong>Density Matrices:</strong> ρ = |ψ⟩⟨ψ|. Used to describe mixed states (statistical ensembles).</li>
                        </ul>
                    `
                },
            ]
        },
        {
            id: 'module3',
            title: 'Module 3: Operators & Math',
            steps: [
                {
                    id: 'step8',
                    title: 'Linear Operators',
                    subtitle: 'Matrices acting on Vectors',
                    visualizer: 'visualizeOperators',
                    explanation: `
                        <h3>Transformation of States</h3>
                        <p>In Quantum Mechanics, any change to a qubit is represented by a <strong>Matrix</strong> (Operator) acting on the State Vector.</p>
                        <div style="text-align:center; font-family:monospace; font-size:1.2em; margin:15px 0;">
                            |ψ'⟩ = U |ψ⟩
                        </div>
                        <p>If we apply a gate (like transformation U) to state |ψ⟩, we get a new state |ψ'⟩. This is done via simple matrix-vector multiplication.</p>
                    `
                },
                {
                    id: 'step9',
                    title: 'Unitary Operators',
                    subtitle: 'Reversible Evolution',
                    visualizer: 'visualizeUnitary',
                    explanation: `
                        <h3>Preserving Probability</h3>
                        <p>Quantum gates MUST be <strong>Unitary Matrices</strong>. Why?</p>
                        <p>Because the total probability of the qubit must always sum to 1. If the probabilities changed (e.g., summed to 1.5), physics would break.</p>
                        <div style="background:#e6fffa; padding:15px; border-radius:8px; border:1px solid #38bec9; margin:10px 0;">
                            <strong>Mathematical Condition:</strong><br>
                            <h3 style="text-align:center; margin:10px 0;">U† U = I</h3>
                        </div>
                        <p>This means the conjugate transpose of U is its own inverse (U† = U⁻¹). This property ensures <strong>Reversibility</strong>—information is never lost in quantum mechanics.</p>
                    `
                },
                {
                    id: 'step10',
                    title: 'Hermitian Operators',
                    subtitle: 'Observables',
                    visualizer: 'visualizeHermitian',
                    explanation: `
                        <h3>Measurements & Observables</h3>
                        <p>While Unitary operators describe <em>motion</em> (changes), <strong>Hermitian Operators</strong> describe <em>measurement</em>.</p>
                        <p>Energy, Position, Momentum, Spin—these are all observables corresponding to Hermitian matrices.</p>
                        <div style="background:#fff0f6; padding:15px; border-radius:8px; border:1px solid #ffadd2; margin:10px 0;">
                            <strong>Mathematical Condition:</strong><br>
                            <h3 style="text-align:center; margin:10px 0;">H = H†</h3>
                        </div>
                        <p><strong>Eigenvalues:</strong> The "benefits" or special graphical properties of Hermitian matrices are that their <strong>Eigenvalues are always REAL numbers</strong>. Since we can only measure real quantities (e.g., Energy = 5 Joules, not 5+2i Joules), observables MUST be Hermitian.</p>
                    `
                }
            ]
        },
        {
            id: 'module4',
            title: 'Module 4: Multi-Qubit Math',
            steps: [
                {
                    id: 'step11',
                    title: 'Tensor Products',
                    subtitle: 'Combining Spaces (⊗)',
                    visualizer: 'visualizeTensor',
                    explanation: `
                        <h3>The Tensor Product (⊗)</h3>
                        <p>How do we describe TWO qubits? We don't just add them. We <strong>Tensor</strong> them.</p>
                        <p>The state space grows exponentially. For two vectors of size 2, the result is size 4 (2×2).</p>
                        <div style="background:#f9f0ff; padding:15px; border-radius:8px; border:1px solid #d3adf7; font-size: 0.9em;">
                            <strong>The Math:</strong><br>
                            <br>
                            A ⊗ B = 
                            <span style="font-size:1.5em; vertical-align:middle">[</span><div style="display:inline-block; vertical-align:middle; text-align:center">a₀<br>a₁</div><span style="font-size:1.5em; vertical-align:middle">]</span> ⊗ 
                            <span style="font-size:1.5em; vertical-align:middle">[</span><div style="display:inline-block; vertical-align:middle; text-align:center">b₀<br>b₁</div><span style="font-size:1.5em; vertical-align:middle">]</span> = 
                            <span style="font-size:2em; vertical-align:middle">[</span><div style="display:inline-block; vertical-align:middle; text-align:center">a₀ b₀<br>a₀ b₁<br>a₁ b₀<br>a₁ b₁</div><span style="font-size:2em; vertical-align:middle">]</span>
                        </div>
                    `
                }
            ]
        },
        {
            id: 'module5',
            title: 'Module 5: Advanced Tools',
            steps: [
                {
                    id: 'step12',
                    title: 'Eigenvalues & Vectors',
                    subtitle: 'The Spectral Theorem',
                    visualizer: 'visualizeEigen',
                    explanation: `
                        <h3>The "Own" Vectors</h3>
                        <p>When an operator $A$ acts on a vector $|v\\rangle$, usually the vector rotates and stretches.</p>
                        <p>Sometimes, it just <strong>stretches</strong> (scales). These are special:</p>
                        <div style="background:#f9f0ff; padding:15px; border-radius:8px; border:1px solid #d3adf7; text-align:center; font-size:1.2em;">
                            $A|v\\rangle = \\lambda|v\\rangle$
                        </div>
                        <ul>
                            <li>$|v\\rangle$ is the <strong>Eigenvector</strong> (Eigenstate).</li>
                            <li>$\\lambda$ is the <strong>Eigenvalue</strong> (Measurement Result).</li>
                        </ul>
                        <p><strong>Spectral Decomposition:</strong> Any normal operator can be written as a sum of its projectors weighted by eigenvalues: $A = \\sum \\lambda_i |v_i\\rangle\\langle v_i|$.</p>
                    `
                },
                {
                    id: 'step13',
                    title: 'Expectation Values',
                    subtitle: 'Average Measurement',
                    visualizer: 'visualizeExpectation',
                    explanation: `
                        <h3>$\\langle A \\rangle$: The Average</h3>
                        <p>In quantum mechanics, measurement is probabilistic. The <strong>Expectation Value</strong> is the statistical average (mean) of many measurements.</p>
                        <div style="background:#e6fffb; padding:15px; border-radius:8px; border:1px solid #87e8de; text-align:center; font-size:1.2em;">
                            $\\langle A \\rangle = \\langle \\psi | A | \\psi \\rangle$
                        </div>
                        <p>This "sandwich" operation calculates the average value of observable $A$ for state $|\\psi\\rangle$.</p>
                        <p><strong>Example:</strong> For Z-operator on state $|+\\rangle$: $\\langle + | Z | + \\rangle = 0$. (Average of +1 and -1 is 0).</p>
                    `
                },
                {
                    id: 'step14',
                    title: 'The Trace',
                    subtitle: 'Sum of Diagonals',
                    visualizer: 'visualizeTrace',
                    explanation: `
                        <h3>Tr(A)</h3>
                        <p>The <strong>Trace</strong> is the sum of the diagonal elements of a matrix.</p>
                        <div style="font-family:monospace; background:#fff; padding:10px; border:1px solid #ddd; border-radius:5px;">
                            If Matrix M = <br>
                            [a &nbsp; b]<br>
                            [c &nbsp; d]<br><br>
                            Then Tr(M) = a + d
                        </div>
                        <p><strong>Why it matters:</strong></p>
                        <ul>
                            <li>Check for Pure States: $Tr(\\rho^2) = 1$.</li>
                            <li>Probability Sum: $Tr(\\rho) = 1$ (Always).</li>
                            <li>Partial Trace: Used to describe <strong>Subsystems</strong> (ignoring part of the universe).</li>
                        </ul>
                    `
                }
            ]

        },
        {
            id: 'module6',
            title: 'Module 6: Final Assessment',
            steps: [
                {
                    id: 'step15',
                    title: 'Course Quiz',
                    subtitle: '20 Questions (Easy to Hard)',
                    visualizer: 'visualizeQuiz',
                    explanation: `
                        <div class="quiz-container">
                            <!-- Intro Section -->
                            <div id="quiz-intro" style="text-align:center;">
                                <div class="quiz-card">
                                    <h2 class="quiz-title" style="margin-bottom:20px; color:#0057b8">Mastery Check</h2>
                                    <p style="font-size:18px; color:#555; margin-bottom:30px">Test your knowledge with 20 questions ranging from basic Qubit concepts to advanced Linear Algebra.</p>
                                    
                                    <div style="display:flex; justify-content:center; gap:40px; margin-bottom:40px">
                                        <div style="text-align:center">
                                            <div style="font-size:32px; font-weight:bold; color:#0057b8">20</div>
                                            <div style="color:#666">Questions</div>
                                        </div>
                                        <div style="text-align:center">
                                            <div style="font-size:32px; font-weight:bold; color:#00d4aa">80%</div>
                                            <div style="color:#666">Passing Score</div>
                                        </div>
                                    </div>

                                    <button class="quiz-btn quiz-btn-primary" onclick="startMathQuiz()">
                                        Start Quiz 🚀
                                    </button>
                                </div>
                            </div>

                            <!-- Quiz Content -->
                            <div id="quiz-content" style="display:none;">
                                <div class="quiz-header">
                                    <span class="quiz-title">Final Assessment</span>
                                    <span class="quiz-progress-indicator" id="quiz-progress">Question 1/20</span>
                                </div>
                                
                                <div class="quiz-progress-bar">
                                    <div class="quiz-progress-fill" id="progress-fill" style="width: 5%"></div>
                                </div>

                                <div class="quiz-card">
                                    <div class="quiz-question" id="question-text"></div>
                                    
                                    <div class="quiz-options" id="options-container">
                                        <!-- Options injected here -->
                                    </div>

                                    <div class="quiz-explanation" id="quiz-feedback">
                                        <div class="quiz-explanation-title">Explanation</div>
                                        <div class="quiz-explanation-text" id="feedback-text"></div>
                                    </div>
                                </div>

                                <div class="quiz-controls" style="text-align: center; margin-top: 20px;">
                                    <button id="submit-answer-btn" class="quiz-btn quiz-btn-primary" onclick="submitAnswer()" disabled>Submit Answer</button>
                                    <button id="next-question-btn" class="quiz-btn quiz-btn-secondary" style="display:none;" onclick="nextQuestion()">Next Question →</button>
                                </div>
                            </div>

                            <!-- Results Section -->
                            <div id="quiz-results" class="quiz-results">
                                <h3 style="margin-bottom:20px; color:#0057b8">Assessment Complete!</h3>
                                <div class="quiz-score" id="final-score">0%</div>
                                <div class="quiz-score-text" id="final-stats">You scored 0/20</div>
                                <p id="final-message" style="font-size:18px; color:#555; margin:30px 0;"></p>
                                
                                <div class="quiz-controls">
                                    <button class="quiz-btn quiz-btn-secondary" onclick="startMathQuiz()">Try Again ↺</button>
                                    <button class="quiz-btn quiz-btn-primary" onclick="location.href='../qt-learning-platform.html'">Finish Course 🏆</button>
                                </div>
                            </div>
                        </div>
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
    // Flatten steps
    courseData.modules.forEach(module => {
        module.steps.forEach(step => {
            allSteps.push({ ...step, moduleId: module.id });
        });
    });

    renderSidebar();
    loadStep(0);

    document.getElementById('prevBtn').addEventListener('click', () => navigateStep(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigateStep(1));
}

function renderSidebar() {
    const sidebar = document.getElementById('courseSidebar');
    sidebar.innerHTML = '';
    courseData.modules.forEach(module => {
        const h = document.createElement('div');
        h.className = 'module-header';
        h.textContent = module.title;
        sidebar.appendChild(h);
        module.steps.forEach(step => {
            const d = document.createElement('div');
            d.className = 'step-item';
            const gIdx = allSteps.findIndex(s => s.id === step.id);
            d.textContent = step.title;
            d.onclick = () => loadStep(gIdx);
            if (gIdx === currentStepIndex) d.classList.add('active');
            sidebar.appendChild(d);
        });
    });
}

function loadStep(index) {
    if (index < 0 || index >= allSteps.length) return;
    currentStepIndex = index;
    const step = allSteps[index];

    // Update Course Progress
    const progress = Math.round(((index + 1) / allSteps.length) * 100);
    const progFill = document.getElementById('courseProgress'); // Defined in math-foundations.html
    const progText = document.getElementById('progressText'); // Defined in math-foundations.html

    if (progFill) progFill.style.width = `${progress}%`;
    if (progText) progText.textContent = `${progress}% Complete`;

    document.getElementById('stepTitle').textContent = step.title;
    document.getElementById('stepSubtitle').textContent = step.subtitle;
    document.getElementById('stepExplanation').innerHTML = step.explanation;

    // Update nav buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.disabled = index === 0;

    // Check if last step
    if (index === allSteps.length - 1) {
        nextBtn.innerHTML = 'Finish Course 🏆';
        nextBtn.onclick = () => window.location.href = '../qt-learning-platform.html';
    } else {
        nextBtn.innerHTML = 'Next Step →';
        nextBtn.onclick = () => navigateStep(1);
        nextBtn.disabled = false;
    }

    renderSidebar();

    // Visualizer
    if (animationId) cancelAnimationFrame(animationId);
    const canvas = document.getElementById('visualCanvas');

    // Clear controls from previous step
    const controls = document.getElementById('visualControls');
    if (controls) controls.innerHTML = '';

    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 350;

    const fnName = step.visualizer;
    if (typeof window[fnName] === 'function') {
        window[fnName](ctx, canvas);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.font = '20px Arial';
        ctx.fillText('Visualizer coming soon', canvas.width / 2, canvas.height / 2);
    }

    // Trigger MathJax re-render
    if (window.MathJax) {
        window.MathJax.typesetPromise && window.MathJax.typesetPromise();
    }
}

function navigateStep(dir) {
    loadStep(currentStepIndex + dir);
}

// --- VISUALIZERS ---

// 1. Qubit Basics (Switch vs Sphere)
window.visualizeQubitBasics = (ctx, canvas) => {
    let mode = 'classical';
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `
        <div style="display:flex; justify-content:center; gap:10px">
            <button class="study-button" onclick="setQubitMode('classical')">Classical Bit</button>
            <button class="study-button" onclick="setQubitMode('quantum')">Quantum Qubit</button>
        </div>
    `;
    window.setQubitMode = (m) => mode = m;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        if (mode === 'classical') {
            ctx.fillStyle = '#333'; ctx.font = '20px Arial'; ctx.textAlign = 'center';
            ctx.fillText("Classical Bit: 0 OR 1", cx, cy - 60);

            ctx.beginPath(); ctx.arc(cx - 50, cy, 30, 0, Math.PI * 2);
            ctx.fillStyle = '#ddd'; ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#000'; ctx.fillText("0", cx - 50, cy + 7);

            ctx.beginPath(); ctx.arc(cx + 50, cy, 30, 0, Math.PI * 2);
            ctx.fillStyle = '#008060'; ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#fff'; ctx.fillText("1", cx + 50, cy + 7);
        } else {
            // Sphere
            ctx.strokeStyle = '#ccc';
            ctx.beginPath(); ctx.arc(cx, cy, 80, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(cx, cy, 80, 20, 0, 0, Math.PI * 2); ctx.stroke();

            // Vector
            const time = Date.now() * 0.001;
            const x = Math.cos(time) * 80;
            const y = Math.sin(time) * 20;

            ctx.strokeStyle = '#008060'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + x, cy - 60 + y); ctx.stroke();

            ctx.fillStyle = '#008060';
            ctx.beginPath(); ctx.arc(cx + x, cy - 60 + y, 6, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#333'; ctx.font = '20px Arial'; ctx.textAlign = 'center';
            ctx.fillText("Qubit: Superposition", cx, cy + 120);
        }
        animationId = requestAnimationFrame(animate);
    }
    animate();
};

// 2. Physical Qubits (Orbit with Images)
window.visualizePhysicalQubits = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Asset Paths (Using Absolute Paths for verification, realistically would be relative)
    const basePath = '/home/keerthan/.gemini/antigravity/brain/0b511ae0-4afb-4345-a636-d3ed2effca5b/';
    const types = [
        { name: "Superconducting", color: "#FFD700", img: "qubit_superconducting_1771086680586.png" },
        { name: "Trapped Ions", color: "#00BFFF", img: "qubit_ion_1771086771418.png" },
        { name: "Photonic", color: "#FF4500", img: "qubit_photonic_1771086795588.png" },
        { name: "Silicon Spin", color: "#32CD32", img: "qubit_silicon_1771086703009.png" },
        { name: "Neutral Atoms", color: "#9370DB", img: "qubit_neutral_atom_1771086720622.png" },
        { name: "NV Centers", color: "#FF69B4", img: "qubit_nv_center_1771086739866.png" },
        { name: "Topological", color: "#808080", img: "qubit_topological_1771086910626.png" }
    ];
    // Note: Topological image might need update if generation failed/succeeded with diff name. 
    // Using a placeholder Logic if image fails to load would be good practice, but for now we hardcode.

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 130;

    // Preload images
    const images = {};
    let loadedCount = 0;
    types.forEach(t => {
        const img = new Image();
        img.src = basePath + t.img;
        img.onload = () => { loadedCount++; };
        images[t.name] = img;
    });

    let rotation = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rotation += 0.003; // Slow rotation

        // Hub using a gradient or better style
        const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 40);
        grad.addColorStop(0, '#005580');
        grad.addColorStop(1, '#002244');
        ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = '#00aaff'; ctx.stroke();

        ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.font = 'bold 18px Arial';
        ctx.fillText("Qubit", cx, cy + 6);

        // Draw orbits
        ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)'; ctx.lineWidth = 1; ctx.stroke();

        types.forEach((type, i) => {
            const angle = (i / types.length) * Math.PI * 2 + rotation;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            // Connection line (faint)
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(200, 200, 200, 0.1)'; ctx.lineWidth = 1; ctx.stroke();

            // Draw Image Icon
            ctx.save();
            ctx.beginPath(); ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.clip(); // Clip to circle

            if (images[type.name] && images[type.name].complete) {
                ctx.drawImage(images[type.name], x - 30, y - 30, 60, 60);
            } else {
                // Fallback
                ctx.fillStyle = type.color; ctx.fill();
            }
            ctx.restore();

            // Border
            ctx.beginPath(); ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.strokeStyle = type.color; ctx.lineWidth = 3; ctx.stroke();

            // Label background
            const labelW = ctx.measureText(type.name).width + 10;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(x - labelW / 2, y + 35, labelW, 16);

            ctx.fillStyle = '#333'; ctx.font = 'bold 11px Arial';
            ctx.fillText(type.name, x, y + 47);
        });
        requestAnimationFrame(animate);
    }
    animate();
};

// 3. State Vector (Slider)
window.visualizeStateVector = (ctx, canvas) => {
    let alpha = 0.707;
    const controls = document.getElementById('visualControls');
    controls.innerHTML = `<input type="range" min="0" max="100" value="50" style="width:200px" oninput="updateAlpha(this.value)">`;

    window.updateAlpha = (val) => { alpha = val / 100; };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const beta = Math.sqrt(Math.max(0, 1 - alpha * alpha));
        const cx = canvas.width / 2;

        ctx.font = '24px monospace'; ctx.fillStyle = '#333'; ctx.textAlign = 'center';
        ctx.fillText(`|ψ⟩ = ${alpha.toFixed(3)}|0⟩ + ${beta.toFixed(3)}|1⟩`, cx, 100);

        const cy = 250;
        const maxBar = 150;
        // P0
        ctx.fillStyle = '#008060'; ctx.fillRect(cx - 60, cy - (alpha * alpha * maxBar), 40, alpha * alpha * maxBar);
        ctx.fillStyle = '#333'; ctx.font = '14px Arial'; ctx.fillText(`P(0) = ${(alpha * alpha).toFixed(2)}`, cx - 40, cy + 20);
        // P1
        ctx.fillStyle = '#008060'; ctx.fillRect(cx + 20, cy - (beta * beta * maxBar), 40, beta * beta * maxBar);
        ctx.fillStyle = '#333'; ctx.fillText(`P(1) = ${(beta * beta).toFixed(2)}`, cx + 40, cy + 20);

        animationId = requestAnimationFrame(animate);
    }
    animate();
};

// Placeholder for new math visualizers
window.visualizeKet = (ctx, canvas) => { drawText(ctx, canvas, "Standard Representation: Column Vector"); };
window.visualizeBra = (ctx, canvas) => { drawText(ctx, canvas, "Dual Representation: Row Vector (Conjugate Transpose)"); };
window.visualizeInnerProduct = (ctx, canvas) => { drawText(ctx, canvas, "Row × Column = Scalar (Number)"); };
window.visualizeOuterProduct = (ctx, canvas) => { drawText(ctx, canvas, "Column × Row = Matrix (Operator)"); };
window.visualizeOperators = (ctx, canvas) => { drawText(ctx, canvas, "Matrix × Vector = Transformed Vector"); };
window.visualizeUnitary = (ctx, canvas) => { drawText(ctx, canvas, "Rotation (Length Preserved)"); };
window.visualizeHermitian = (ctx, canvas) => { drawText(ctx, canvas, "Measurement (Real Eigenvalues)"); };
window.visualizeTensor = (ctx, canvas) => { drawText(ctx, canvas, "State Space Explosion: 2ⁿ"); };
window.visualizeEigen = (ctx, canvas) => { drawText(ctx, canvas, "Input Vector -> operator -> Scaled Vector"); };
window.visualizeExpectation = (ctx, canvas) => { drawText(ctx, canvas, "<ψ|H|ψ> = Energy"); };
window.visualizeTrace = (ctx, canvas) => { drawText(ctx, canvas, "Sum of Diagonal Elements"); };

// --- QUIZ DATA ---
const quizQuestions = [
    // EASY (1-7)
    { q: "What is the fundamental unit of quantum information?", options: ["The Bit", "The Qubit", "The Atom", "The Electron"], correct: 1, explanation: "Classical computers use bits (0 or 1), while Quantum computers use Qubits, which can exist in superposition." },
    { q: "What does the notation |ψ⟩ represent?", options: ["A Bra (Row Vector)", "A Ket (Column Vector)", "A Matrix", "A Scalar"], correct: 1, explanation: "In Dirac notation, |ψ⟩ (Ket) represents a Column Vector, while ⟨ψ| (Bra) represents a Row Vector." },
    { q: "In the state |ψ⟩ = α|0⟩ + β|1⟩, what are α and β?", options: ["Probabilities", "Integers", "Amplitudes", "Energy Levels"], correct: 2, explanation: "α and β are probability amplitudes. The actual probabilities are given by squaring their magnitudes (|α|² and |β|²)." },
    { q: "If a qubit is in state |1⟩, what is the probability of measuring 0?", options: ["0%", "50%", "100%", "25%"], correct: 0, explanation: "A qubit in the basis state |1⟩ is definitively 1. The probability of measuring 0 is therefore 0%." },
    { q: "What is the result of the inner product ⟨0|0⟩?", options: ["0", "1", "Undefined", "Vector"], correct: 1, explanation: "This is the inner product of a normalized vector with itself, which always equals 1." },
    { q: "Which property distinguishes a Qubit from a Classical Bit?", options: ["It has values 0 and 1", "It can be in Superposition", "It uses electricity", "It stores less data"], correct: 1, explanation: "Superposition allows a qubit to be in a linear combination of states |0⟩ and |1⟩ simultaneously, unlike a classical bit." },
    { q: "What implies that two states are Orthogonal?", options: ["Inner Product is 1", "Inner Product is 0", "They are identical", "They are expanding"], correct: 1, explanation: "Zero inner product (⟨ψ|φ⟩ = 0) is the definition of orthogonality in vector spaces." },
    // MEDIUM (8-14)
    { q: "If Amplitude α = 0.6, what must |β| be for the state to be valid? (Given |α|² + |β|² = 1)", options: ["0.4", "0.6", "0.8", "1.0"], correct: 2, explanation: "We need 0.6² + β² = 1. So 0.36 + β² = 1, meaning β² = 0.64, so β = 0.8." },
    { q: "What is the dimension of the state space for 3 qubits?", options: ["3", "6", "8 (2³)", "9 (3²)"], correct: 2, explanation: "The dimension of the Hilbert space grows exponentially: 2ⁿ. For n=3, 2³ = 8." },
    { q: "Which operation converts |ψ⟩ (Ket) to ⟨ψ| (Bra)?", options: ["Transpose only", "Conjugate only", "Conjugate Transpose (Dagger)", "Inverse"], correct: 2, explanation: "Taking the Hermitian conjugate (denoted by †) involves both transposing the vector and taking the complex conjugate of each entry." },
    { q: "What does the Outer Product |0⟩⟨0| represent?", options: ["A Scalar (1)", "A Projection Operator (Matrix)", "Expectation Value", "Trace"], correct: 1, explanation: "An outer product creates a matrix (operator). specifically, |0⟩⟨0| is the projector onto the state |0⟩." },
    { q: "What is the condition for a matrix U to be Unitary?", options: ["U = I", "U² = U", "U†U = I", "Tr(U) = 1"], correct: 2, explanation: "A matrix is Unitary if its conjugate transpose is its inverse, i.e., U†U = I. This ensures probabilities are conserved." },
    { q: "Hermitian Operators are associated with which physical concept?", options: ["Rotation", "Observables (Measurement)", "Noise", "Initialization"], correct: 1, explanation: "In quantum mechanics, measurable quantities (observables) like energy or position are represented by Hermitian operators." },
    { q: "In the Bloch Sphere, what does the angle θ (theta) control?", options: ["Phase", "Probability Balance (0 vs 1)", "Spin Direction", "Time"], correct: 1, explanation: "Theta θ controls the latitude (north/south), determining the balance between |0⟩ and |1⟩. Phi φ controls the phase." },
    // ADVANCED (15-20)
    { q: "If A|v⟩ = λ|v⟩, then |v⟩ is an Eigenvector and λ is...?", options: ["The Operator", "The Eigenvalue", "The Trace", "The Norm"], correct: 1, explanation: "This is the definition of the Eigenvalue equation. λ (lambda) is the scaling factor known as the Eigenvalue." },
    { q: "What is the Expectation Value ⟨ψ|A|ψ⟩?", options: ["The exact next measurement", "The average of many measurements", "The standard deviation", "The maximum value"], correct: 1, explanation: "The expectation value predicts the statistical mean (average) result if you repeated the experiment many times." },
    { q: "What is the Trace of the Density Matrix ρ?", options: ["0", "1", "Infinite", "Variable"], correct: 1, explanation: "The trace of a density matrix represents the sum of probabilities of being in all basis states, which must always sum to 1." },
    { q: "Tensor Product: What is the size of the matrix resulting from H ⊗ H (where H is 2x2)?", options: ["2x2", "4x4", "8x8", "16x16"], correct: 1, explanation: "The tensor product of an M×N matrix and a P×Q matrix is (MP)×(NQ). Here, (2×2) ⊗ (2×2) = 4×4." },
    { q: "Why must the eigenvalues of an observable be Real numbers?", options: ["Complex numbers use too much memory", "Physical quantities (Energy, Position) are real", "It's a convention only", "They don't have to be"], correct: 1, explanation: "We measure real physical quantities in the lab (like energy in Joules), so the mathematical results (eigenvalues) must be real numbers." },
    { q: "If ⟨ψ|φ⟩ = 0, what is the probability of measuring state |φ⟩ if we are in state |ψ⟩?", options: ["100%", "50%", "0%", "Depends on Phase"], correct: 2, explanation: "Orthogonal states are mutually exclusive. If you are perfectly in state |ψ⟩, you have 0% overlap with orthogonal state |φ⟩." }
];


let quizIndex = 0;
let quizScore = 0;
let selectedOptionIndex = null;

window.startMathQuiz = () => {
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('quiz-results').classList.remove('show');
    document.getElementById('quiz-results').style.display = 'none';
    quizIndex = 0;
    quizScore = 0;
    loadQuestion();
};

window.loadQuestion = () => {
    const q = quizQuestions[quizIndex];
    selectedOptionIndex = null;

    // Update Progress
    const progEl = document.getElementById('quiz-progress');
    const fillEl = document.getElementById('progress-fill');

    if (progEl && fillEl) {
        progEl.textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
        const pct = ((quizIndex + 1) / quizQuestions.length) * 100;
        fillEl.style.width = `${pct}%`;
    }

    // Render Question
    const qTextEl = document.getElementById('question-text');
    if (qTextEl) qTextEl.innerHTML = q.q;

    // Reset UI
    const quizFeedbackEl = document.getElementById('quiz-feedback');
    if (quizFeedbackEl) {
        quizFeedbackEl.classList.remove('show');
        quizFeedbackEl.style.display = 'none';
    }

    const submitBtn = document.getElementById('submit-answer-btn');
    const nextBtn = document.getElementById('next-question-btn');
    if (submitBtn) {
        submitBtn.style.display = 'inline-flex';
        submitBtn.disabled = true;
    }
    if (nextBtn) {
        nextBtn.style.display = 'none';
    }

    // If last question, change text
    if (quizIndex === quizQuestions.length - 1) {
        if (nextBtn) nextBtn.textContent = "Finish Course 🏆";
    } else {
        if (nextBtn) nextBtn.textContent = "Next Question →";
    }

    const container = document.getElementById('options-container');
    if (container) {
        container.innerHTML = '';

        const letters = ['A', 'B', 'C', 'D'];

        q.options.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'quiz-option';
            div.onclick = () => selectOption(i, div);

            div.innerHTML = `
                <div class="option-letter">${letters[i]}</div>
                <div class="option-text">${opt}</div>
            `;

            container.appendChild(div);
        });
    }

    if (window.MathJax) window.MathJax.typesetPromise();
};

window.selectOption = (idx, element) => {
    // Deselect others
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));

    // Select this
    element.classList.add('selected');
    selectedOptionIndex = idx;

    // Enable submit
    const btn = document.getElementById('submit-answer-btn');
    if (btn) btn.disabled = false;
};

window.submitAnswer = () => {
    if (selectedOptionIndex === null) return;

    const q = quizQuestions[quizIndex];
    const correct = selectedOptionIndex === q.correct;

    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
        opt.style.pointerEvents = 'none'; // Disable clicks
        if (i === q.correct) {
            opt.classList.add('correct');
        } else if (i === selectedOptionIndex && !correct) {
            opt.classList.add('incorrect');
        }
    });

    if (correct) quizScore++;

    // Show Feedback with Explanation
    const fb = document.getElementById('quiz-feedback');
    const fbText = document.getElementById('feedback-text');

    if (fb && fbText) {
        fb.style.display = 'block';
        setTimeout(() => fb.classList.add('show'), 10);

        if (correct) {
            fb.style.borderLeftColor = '#10b981';
            fb.style.background = '#d1fae5';
            fbText.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
        } else {
            fb.style.borderLeftColor = '#ef4444';
            fb.style.background = '#fee2e2';
            fbText.innerHTML = `<strong>Incorrect.</strong> The correct answer was: ${q.options[q.correct]}.<br><br>${q.explanation}`;
        }
    }

    // Toggle Buttons
    const submitBtn = document.getElementById('submit-answer-btn');
    const nextBtn = document.getElementById('next-question-btn');
    if (submitBtn) submitBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'inline-flex';
};

window.nextQuestion = () => {
    quizIndex++;
    if (quizIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
};

window.showResults = () => {
    document.getElementById('quiz-intro').style.display = 'none'; // Ensure intro is hidden
    document.getElementById('quiz-content').style.display = 'none';

    const results = document.getElementById('quiz-results');
    results.style.display = 'block';
    setTimeout(() => results.classList.add('show'), 10);

    const pct = Math.round((quizScore / quizQuestions.length) * 100);
    document.getElementById('final-score').textContent = `${pct}%`;
    document.getElementById('final-stats').textContent = `You scored ${quizScore} out of ${quizQuestions.length}`;

    let msg = "";
    if (pct >= 90) msg = "🏆 Absolute mastery! You're ready for quantum computing research.";
    else if (pct >= 80) msg = "🎓 Excellent work! You have a solid grasp of the foundations.";
    else if (pct >= 50) msg = "👍 Good effort. Review the linear algebra sections and try again.";
    else msg = "📚 Keep studying. Focus on the basics of vectors and matrices.";

    document.getElementById('final-message').textContent = msg;
};

// --- VISUALIZERS ---
// ... existing visualizers ...

// Helper for quiz visualizer (just clears it)
window.visualizeQuiz = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#e6fffa');
    grad.addColorStop(1, '#ffffff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#008060';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Final Assessment", canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = '20px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText("Good Luck!", canvas.width / 2, canvas.height / 2 + 20);
};

window.visualizeEigen = (ctx, canvas) => { drawText(ctx, canvas, "Input Vector -> operator -> Scaled Vector"); };

function drawText(ctx, canvas, text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#008060';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

// Start
window.onload = initCourse;
