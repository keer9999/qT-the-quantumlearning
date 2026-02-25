# qT — Quantum Technology Learning Platform

**Department of Electronics and Communication Engineering**  
**JNTU Anantapur College of Engineering, Anantapur**

---

## Overview

qT (Quantum Technology) is a comprehensive, browser-based quantum computing education platform built entirely with HTML, CSS, and JavaScript. It requires no installation, no backend server, and no external dependencies beyond a modern web browser. The platform targets undergraduate ECE students encountering quantum mechanics and quantum information science for the first time, providing interactive simulations, mathematical derivations, visualizations, algorithm walkthroughs, and self-assessment quizzes throughout every module.

The platform covers the full curriculum arc from foundational quantum mechanics principles through to production-relevant quantum algorithms, with each topic structured as a self-contained learning module.

---

## Project Structure

```
jntu-crypto/
|
|-- index.html                    Main landing page (theme system, navigation)
|-- qt-learning-platform.html     Learning platform hub (all courses)
|-- about.html                    Department info, team, mission, donations
|-- team.html                     Team member profiles with social links
|
|-- Quantum Basics Modules
|   |-- superposition.html        Superposition, state vectors, simulators
|   |-- measurement.html          Measurement collapse, Born rule
|   |-- probability.html          Quantum probability and shot statistics
|   |-- bloch3d.html              Bloch sphere — full 3D guide with MathJax LaTeX
|   |-- classical-vs-quantum.html Classical bit vs qubit comparison
|   |-- quantum-phase.html        Quantum phase, phase estimation, Hamiltonians
|   |-- noise-imperfections/
|       |-- noise.html            Decoherence, T1/T2, error types
|
|-- Quantum Gates
|   |-- quantum-gates.html        Gate reference — Pauli, Hadamard, rotation, multi-qubit
|
|-- Quantum Algorithms
|   |-- quantum-algorithms.html   Algorithm overview hub
|   |-- quantum-algorithms/
|       |-- index.html            Algorithms landing page
|       |-- bb84.html             BB84 Quantum Key Distribution
|       |-- bb84-enhanced.html    BB84 hardware simulator variant
|       |-- deutsch-jozsa.html    Deutsch-Jozsa Algorithm
|       |-- grover.html           Grover's Search Algorithm
|       |-- shor.html             Shor's Factoring Algorithm
|       |-- simon.html            Simon's Algorithm
|       |-- vqe.html              Variational Quantum Eigensolver (VQE)
|
|-- Topics
|   |-- variational.html          Variational method overview
|   |-- variationalMethod.html    Full variational method simulator
|   |-- uncertainty.html          Quantum uncertainty principles
|   |-- uncertainty/              Uncertainty deep-dive module
|
|-- Supporting Disciplines
|   |-- physics/
|       |-- physics-foundations.html  Physics foundations course
|       |-- physics-module.html       Physics module viewer
|   |-- math/
|       |-- math-foundations.html     Qubit and math foundations
|
|-- Interactive Composers
|   |-- quantum-composer/         Circuit composer (jntu-composer.html)
|
|-- Shared Assets
|   |-- global-ui.css             Global navigation bar, back button, shared UI
|   |-- global-ui.js              Global navigation JavaScript (goBackGlobal)
|   |-- landing.css               Landing page theme system (8 themes)
|   |-- landing.js                Landing page logic, animations, theme switcher
|   |-- css/                      Supplementary stylesheets
|   |-- js/                       Supplementary scripts (jQuery, variational)
|   |-- images/                   Shared image assets
|   |-- team/                     Team member photos
```

---

## Module Reference

### Quantum Basics

| Module | File | Key Features |
|--------|------|--------------|
| Superposition | `superposition.html` | State vector visualiser, probability sliders, interactive quiz |
| Measurement Collapse | `measurement.html` | Born rule demonstration, collapse simulator, quantum notebook |
| Probability and Shots | `probability.html` | Shot-based histogram, Law of Large Numbers for qubits |
| Bloch Sphere | `bloch3d.html` | Three.js 3D sphere, orbit drag, gate buttons (X/Y/Z/H/S/T), MathJax LaTeX formulas, density matrix section |
| Qubit vs Classical Bit | `classical-vs-quantum.html` | Side-by-side comparison, state space geometry |
| Quantum Phase | `quantum-phase.html` | Phase estimation, Hamiltonian evolution, interactive notebook |
| Noise and Imperfections | `noise-imperfections/noise.html` | T1/T2 decay, bit-flip/phase-flip/depolarising errors |

All seven basics modules include:
- Key Concepts summary grid (4 colour-coded cards)
- Formula Reference card (dark-theme, LaTeX or monospace notation)
- "Did You Know?" callout with real-world context
- Interactive Quantum Notebook (3 runnable JavaScript examples each)
- Quiz with progress bar, A/B/C/D options, explanations, and score screen

### Quantum Gates

`quantum-gates.html` provides a complete reference of gates with matrix representations rendered in LaTeX (MathJax), gate action descriptions, Bloch sphere rotation equivalents, truth tables for multi-qubit gates, and visual circuit diagrams.

Gates covered: Pauli X/Y/Z, Hadamard, S, T, Phase (P), Identity, Rx/Ry/Rz rotation gates, U3, SWAP, CNOT, CZ, CY, CP, Toffoli (CCX), Fredkin (CSWAP).

### Quantum Algorithms
| Algorithm | File | Complexity | Type |
|-----------|------|-----------|------|
| BB84 Protocol | `bb84.html` / `bb84-enhanced.html` | O(n) | Cryptography / QKD |
| Deutsch-Jozsa | `deutsch-jozsa.html` | O(1) | Oracle query |
| Grover's Search | `grover.html` | O(sqrt(N)) | Search |
| Shor's Factoring | `shor.html` | O((log N)^3) | Number theory |
| Simon's Algorithm | `simon.html` | O(n) | Hidden subgroup |
| VQE | `vqe.html` | Variational | Quantum chemistry |

Each algorithm module includes: circuit diagram, step-by-step walkthrough, complexity analysis, classical comparison, interactive demonstration, and a multi-question quiz.

---

## Design System

### Typography
- Primary: **Inter** (Google Fonts) — body, headings, UI
- Monospace: **JetBrains Mono** — code, formulas displayed in code style

### Colour Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--navy` | `#03122e` | Primary headings, hero backgrounds |
| `--blue` | `#0057b8` | Accent, buttons, links |
| `--sky` | `#00b4d8` | Gradients, highlights |
| `--light` | `#f0f6ff` | Card backgrounds, chip backgrounds |

### Shared Components
- **Global navigation bar** (`global-ui.css` / `global-ui.js`): back arrow floating button, consistent across all pages
- **Quiz engine**: progress bar, lettered option cards, explanation reveal, score screen with percentage and feedback
- **Interactive Quantum Notebook**: macOS-style dark editor, tab switcher for 3 examples per module, Run Code / Clear buttons, coloured output (green success, red error)
- **Formula Reference cards**: dark `#0f172a` background, cyan-tagged category labels, JetBrains Mono math display
- **Key Concepts grid**: 4-card responsive grid with colour-coded themes (blue/green/purple/orange)

### Theme System (Landing Page)
The landing page (`index.html`) supports 8 visual themes controlled by `landing.js`. Themes include: Default (3D quantum animation), Naruto, Free Fire, and others, each with unique CSS animations and background effects.

---

## Mathematical Notation

The Bloch Sphere page (`bloch3d.html`) and Quantum Gates page (`quantum-gates.html`) use **MathJax 3** for LaTeX rendering. Key formulas rendered:

```
General qubit state:    |psi> = alpha|0> + beta|1>
Bloch parameterisation: |psi> = cos(theta/2)|0> + e^(i*phi)*sin(theta/2)|1>
Bloch vector:           r⃗ = (sin(theta)cos(phi), sin(theta)sin(phi), cos(theta))
Density matrix:         rho = (I + r⃗·sigma⃗) / 2
T1 relaxation:          P(|1>, t) = e^(-t/T1)
T2 dephasing:           <sigma_x>(t) = e^(-t/T2)
Z-rotation gate:        Rz(theta) = e^(-i*theta*sigma_z/2)
General rotation:       R_n(theta) = cos(theta/2)*I - i*sin(theta/2)*(n⃗·sigma⃗)
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Structure | HTML5 | Semantic page structure |
| Styling | Vanilla CSS | All styling, design system, animations |
| Logic | Vanilla JavaScript | Simulators, quiz engine, notebook, Three.js integration |
| 3D Graphics | Three.js (r158) | Bloch sphere 3D renderer |
| Math Rendering | MathJax 3 | LaTeX formula typesetting |
| Fonts | Google Fonts (Inter, JetBrains Mono) | Typography |

No build tools, bundlers, or backend are required. All files are served statically.

---

## Running Locally

```bash
# Clone or download the project
git clone <repository-url>
cd jntu-crypto

# Serve with any static file server, for example:
python3 -m http.server 8000

# Then open in browser:
# http://localhost:8000/index.html
```

Alternatively, open `index.html` directly in a browser via `File > Open File`. All inter-page links use relative paths and work from the filesystem without a server, except pages that load external CDN resources (Three.js, MathJax, Google Fonts) which require internet access.

---

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Google Chrome 90+ | Full |
| Firefox 88+ | Full |
| Microsoft Edge 90+ | Full |
| Safari 14+ | Full |
| Mobile Chrome / Safari | Responsive layout supported |

WebGL is required for the Bloch Sphere 3D renderer (`bloch3d.html`). All other modules function without WebGL.

---

## Repository Layout Conventions

- All root-level `.html` files are primary learning modules or platform pages.
- Sub-directories group related modules (`quantum-algorithms/`, `physics/`, `math/`).
- Shared CSS lives in `global-ui.css` (navigation/UI) and `landing.css` (landing page).
- Module-specific CSS/JS files are co-located with their HTML (e.g. `quantum-phase.css`, `quantum-phase.js`).
- The `images/` directory holds shared graphical assets; module-specific images are kept in the root or their module folder.

---

## Development Team

**Institution:** JNTU Anantapur College of Engineering  
**Department:** Electronics and Communication Engineering  
**Project:** Quantum Technology (qT) Learning Platform  

Faculty Advisor: Dr. V. Sumalatha  
Student Developers: Listed in `team.html` and `about.html`

---

## License

This project is developed for academic and educational purposes under JNTU Anantapur. All quantum computing content references standard academic literature and open educational resources. Third-party libraries (Three.js, MathJax) are used under their respective open-source licenses.
