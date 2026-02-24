document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('landing-active');
    // Scene setup
    const container = document.getElementById('landing-canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    // Dark experiential fog - high end look
    scene.fog = new THREE.FogExp2(0x020205, 0.0015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 30); // Moved closer for better visibility (was 45)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    /* =========================================
       CRYOGENIC QUANTUM COMPUTER (CHANDELIER)
       ========================================= */
    const chandelierGroup = new THREE.Group();
    scene.add(chandelierGroup);
    // Position for Split Layout (Far Right Side) - Lowered as requested
    chandelierGroup.position.set(15, -8, 0);

    // Materials
    const goldPlateMat = new THREE.MeshStandardMaterial({
        color: 0xffd700, metalness: 1.0, roughness: 0.1, emissive: 0x442200, emissiveIntensity: 0.1
    });
    const copperTubeMat = new THREE.MeshStandardMaterial({
        color: 0xb87333, metalness: 0.9, roughness: 0.2
    });
    const darkMetalMat = new THREE.MeshStandardMaterial({
        color: 0x222222, metalness: 0.8, roughness: 0.5
    });
    const steelPillarMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc, metalness: 0.9, roughness: 0.1
    });
    const glassShellMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, metalness: 0, roughness: 0,
        transmission: 0.9, thickness: 0.5, transparent: true, opacity: 0.15
    });

    // 1. Central Infrastructure
    const mainPostGeo = new THREE.CylinderGeometry(0.4, 0.4, 40, 32);
    const mainPost = new THREE.Mesh(mainPostGeo, darkMetalMat);
    mainPost.position.y = 10;
    chandelierGroup.add(mainPost);

    // 2. Realistic Tiered Plates (Wedding Cake)
    const plateData = [
        { y: 25, r: 12, t: 0.5 }, // Top Ceiling
        { y: 18, r: 10, t: 0.4 }, // Stage 1
        { y: 11, r: 8, t: 0.4 },  // Stage 2
        { y: 4, r: 6, t: 0.4 },   // Stage 3
        { y: -3, r: 4, t: 0.4 },  // Cold Plate
        { y: -10, r: 2, t: 1.0 }  // CPU Mix Stage
    ];

    plateData.forEach((p, idx) => {
        const geo = new THREE.CylinderGeometry(p.r, p.r, p.t, 64);
        const plate = new THREE.Mesh(geo, goldPlateMat);
        plate.position.y = p.y;
        chandelierGroup.add(plate);

        // Add bolt ring
        const ringGeo = new THREE.TorusGeometry(p.r - 0.5, 0.15, 16, 100);
        const ring = new THREE.Mesh(ringGeo, copperTubeMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = p.y;
        chandelierGroup.add(ring);

        // Add Support Pillars between plates
        if (idx < plateData.length - 1) {
            const nextP = plateData[idx + 1];
            const pillarCount = 4;
            const pillarRadius = (p.r + nextP.r) / 2 - 1.5;
            const pillarH = p.y - nextP.y;

            for (let i = 0; i < pillarCount; i++) {
                const angle = (i / pillarCount) * Math.PI * 2;
                const x = Math.cos(angle) * pillarRadius;
                const z = Math.sin(angle) * pillarRadius;
                const pillarGeo = new THREE.CylinderGeometry(0.2, 0.2, pillarH, 16);
                const pillar = new THREE.Mesh(pillarGeo, steelPillarMat);
                pillar.position.set(x, (p.y + nextP.y) / 2, z);
                chandelierGroup.add(pillar);
            }
        }
    });

    // 3. Complex Wiring (Procedural Cables)
    const createCables = (yS, yE, r, count, mat) => {
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const h = Math.abs(yS - yE);
            const geo = new THREE.CylinderGeometry(0.04, 0.04, h, 8);
            const cable = new THREE.Mesh(geo, mat || copperTubeMat);
            cable.position.set(x, (yS + yE) / 2, z);
            chandelierGroup.add(cable);
        }
    };

    createCables(25, 18, 9.5, 24, goldPlateMat);
    createCables(18, 11, 7.5, 20, copperTubeMat);
    createCables(11, 4, 5.5, 16, goldPlateMat);
    createCables(4, -3, 3.5, 12, copperTubeMat);
    createCables(-3, -10, 1.5, 8, goldPlateMat);

    // 4. Cryostat Shell (Semi-Transparent)
    const shellGeo = new THREE.CylinderGeometry(13, 13, 50, 64, 1, true);
    const shell = new THREE.Mesh(shellGeo, glassShellMat);
    shell.position.y = 8;
    chandelierGroup.add(shell);

    // 5. Cryo-Cooling Coils (Visual detail)
    const coilGeo = new THREE.TorusGeometry(2, 0.1, 16, 100);
    for (let i = 0; i < 3; i++) {
        const coil = new THREE.Mesh(coilGeo, copperTubeMat);
        coil.rotation.x = Math.PI / 2;
        coil.position.y = 8 - (i * 6);
        chandelierGroup.add(coil);
    }


    /* =========================================
       PARTICLES & ENV
       ========================================= */
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800; // reduced for cleaner look
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 120;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    /* =========================================
       FLOWING QUBITS ANIMATION
       ========================================= */
    // Create qubit particles that flow down
    const qubitCount = 40;
    const qubits = [];
    const qubitGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const qubitMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });

    for (let i = 0; i < qubitCount; i++) {
        const mesh = new THREE.Mesh(qubitGeo, qubitMat);
        // Random starting position on a helix
        const angle = Math.random() * Math.PI * 2;
        const y = Math.random() * 30 - 15; // Spread vertically
        const radius = 5 + Math.random() * 2;

        mesh.position.set(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius
        );

        mesh.userData = {
            angle: angle,
            speed: 0.02 + Math.random() * 0.03,
            radius: radius,
            yOffset: Math.random() * 100
        };

        chandelierGroup.add(mesh);
        qubits.push(mesh);
    }


    // Lighting - INCREASED INTENSITY FOR VISIBILITY
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0); // Bright ambient
    scene.add(ambientLight);

    // Blue glow from bottom (Quantum effect)
    const blueLight = new THREE.PointLight(0x00d4ff, 5, 60);
    blueLight.position.set(0, -15, 5);
    scene.add(blueLight);

    // Warm top light (Gold reflection)
    const warmLight = new THREE.PointLight(0xffaa00, 3, 60);
    warmLight.position.set(10, 20, 10);
    scene.add(warmLight);

    // Front Light (Fill)
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
    frontLight.position.set(0, 0, 50);
    scene.add(frontLight);

    // Moving light for dynamic reflection
    const movingLight = new THREE.PointLight(0xffffff, 2, 40);
    scene.add(movingLight);


    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // --- 360 DEGREE ROTATION ---
        // Map mouseX (-0.5 to 0.5 roughly from previous event listener) to full rotation
        // Actually mouseX in current code is (event.clientX - innerWidth/2) * 0.001
        // Let's make it more sensitive for 360 feel.
        chandelierGroup.rotation.y = mouseX * 20 + elapsedTime * 0.05;

        // Slight sway based on mouse
        chandelierGroup.rotation.x = mouseY * 0.5;

        // Move the dynamic light
        movingLight.position.x = Math.cos(elapsedTime) * 20;
        movingLight.position.z = Math.sin(elapsedTime) * 20;
        movingLight.position.y = Math.sin(elapsedTime * 0.5) * 10;

        // Particles rotation
        particlesMesh.rotation.y = -elapsedTime * 0.05;

        // Animate Flowing Qubits
        qubits.forEach(q => {
            q.userData.angle += q.userData.speed;
            q.position.x = Math.cos(q.userData.angle) * q.userData.radius;
            q.position.z = Math.sin(q.userData.angle) * q.userData.radius;
            // Move down spirally
            q.position.y = 15 - ((elapsedTime * 2 + q.userData.yOffset) % 30);
        });

        renderer.render(scene, camera);
    }

    animate();

    /* =========================================
       LANDING PAGE OBSERVERS (Video & Anims)
       ========================================= */
    const observerOptions = {
        threshold: 0.1
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => console.log('Autoplay blocked', e));
            } else {
                video.pause();
            }
        });
    }, observerOptions);

    const videoElement = document.getElementById('landingVideo');
    if (videoElement) {
        videoObserver.observe(videoElement);
    }


    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

}); // End of DOMContentLoaded


// Transition Function
function enterApp() {
    const overlay = document.getElementById('landing-overlay');
    const bgMusic = document.getElementById('bg-music');

    // Zoom in effect
    overlay.style.transform = "scale(1.2)"; // Less aggressive scale
    overlay.style.opacity = "0";

    setTimeout(() => {
        overlay.classList.add('hidden');
        document.body.classList.remove('landing-active');

        // trigger animations in main app if needed
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            welcomeSection.classList.add('active');
        }

        if (bgMusic) bgMusic.play().catch(e => console.log("Audio play failed:", e));

    }, 1200); // little longer for smoother fade
}


/* ================== QUANTUM GUN LOGIC (3D PROCEDURAL) ================== */
document.addEventListener('DOMContentLoaded', () => {
    const gunContainer = document.getElementById('quantum-gun-container');
    const hudCanvas = document.getElementById('gun-hud-canvas');
    const projectilesContainer = document.getElementById('quantum-projectiles-container');
    const muzzleFlash = document.querySelector('.gun-muzzle-flash');

    if (!gunContainer || !hudCanvas) return;

    // --- THREE.JS SETUP FOR GUN HUD ---
    const scene = new THREE.Scene();
    // No background, transparent

    // Camera
    // Camera
    const camera = new THREE.PerspectiveCamera(45, 600 / 400, 0.1, 100);
    camera.position.set(0, 0, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(600, 400); // Fixed size matches CSS roughly, or dynamic
    renderer.setPixelRatio(window.devicePixelRatio);
    hudCanvas.appendChild(renderer.domElement);

    // --- PROCEDURAL GUN MODEL ---
    const gunGroup = new THREE.Group();
    scene.add(gunGroup);

    // Materials
    const metalMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc, metalness: 0.8, roughness: 0.2
    });
    const darkMetalMat = new THREE.MeshStandardMaterial({
        color: 0x333333, metalness: 0.7, roughness: 0.5
    });
    const glowMat = new THREE.MeshStandardMaterial({
        color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 2.0
    });
    const goldMat = new THREE.MeshStandardMaterial({
        color: 0xffd700, metalness: 1.0, roughness: 0.2
    });

    // 1. Main Barrel (Split Rails)
    const barrelGeo = new THREE.BoxGeometry(1, 1, 8);
    const barrelTop = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 7), metalMat);
    barrelTop.position.set(0, 0.6, 1);
    gunGroup.add(barrelTop);

    const barrelBottom = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 7), metalMat);
    barrelBottom.position.set(0, -0.6, 1);
    gunGroup.add(barrelBottom);

    // 2. Core (Glowing Energy)
    const coreGeo = new THREE.CylinderGeometry(0.2, 0.2, 7, 16);
    const core = new THREE.Mesh(coreGeo, glowMat);
    core.rotation.x = Math.PI / 2;
    core.position.set(0, 0, 1);
    gunGroup.add(core);

    // 3. Receiver / Body
    const bodyGeo = new THREE.BoxGeometry(1.5, 2.5, 4);
    const gunBody = new THREE.Mesh(bodyGeo, darkMetalMat);
    gunBody.position.set(0, -0.5, -3);
    gunGroup.add(gunBody);

    // 4. Handle
    const handleGeo = new THREE.BoxGeometry(1, 2.5, 1);
    const handle = new THREE.Mesh(handleGeo, darkMetalMat);
    handle.position.set(0, -2.5, -3);
    handle.rotation.x = 0.2; // Angled grip
    gunGroup.add(handle);

    // 5. Scope
    const scopeGeo = new THREE.CylinderGeometry(0.4, 0.3, 3, 16);
    const scope = new THREE.Mesh(scopeGeo, darkMetalMat);
    scope.rotation.x = Math.PI / 2;
    scope.position.set(0, 1.5, -2);
    gunGroup.add(scope);

    // 6. Gold Accents
    const ringGeo = new THREE.TorusGeometry(0.3, 0.05, 8, 20);
    const ring1 = new THREE.Mesh(ringGeo, goldMat);
    ring1.position.set(0, 0, 4);
    gunGroup.add(ring1);

    // Initial Position (FPS Style - Right Side)
    // Pointing slightly left towards center
    gunGroup.rotation.y = Math.PI / 8;
    gunGroup.rotation.x = Math.PI / 32;

    // Lights for HUD
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const bluePoint = new THREE.PointLight(0x00d4ff, 2.0, 10);
    bluePoint.position.set(0, 0, 2);
    scene.add(bluePoint);


    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let recoilTime = 0;

    function animateGun() {
        requestAnimationFrame(animateGun);

        // Only render if visible
        if (!document.body.classList.contains('theme-freefire')) {
            return;
        }

        const time = clock.getElapsedTime();

        // Idle Sway (Breathing)
        gunGroup.position.y = Math.sin(time * 1.5) * 0.1;
        gunGroup.rotation.z = Math.sin(time * 0.5) * 0.02;

        // Recoil Recovery
        if (recoilTime > 0) {
            recoilTime -= 0.1;
            // Kick back and rotate up
            gunGroup.position.z = -3 + Math.sin(recoilTime) * 1.5;
            gunGroup.rotation.x = (Math.PI / 32) + Math.sin(recoilTime) * 0.2;
        } else {
            // Return to rest
            gunGroup.position.z = THREE.MathUtils.lerp(gunGroup.position.z, 0, 0.1);
            gunGroup.rotation.x = THREE.MathUtils.lerp(gunGroup.rotation.x, Math.PI / 32, 0.1);
        }

        renderer.render(scene, camera);
    }
    animateGun();

    // --- INTERACTION ---

    // 1. Mouse Follow (Parallax) - Gun & Character
    document.addEventListener('mousemove', (e) => {
        if (!document.body.classList.contains('theme-freefire')) return;

        const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

        // --- GUN PARALLAX (Right Side) ---
        // Rotate towards center (leftward)
        gunGroup.rotation.y = (Math.PI / 8) + (x * 0.3);
        gunGroup.rotation.x = (Math.PI / 32) - (y * 0.2);

        // --- CHARACTER PARALLAX ---
        const charContainer = document.querySelector('.freefire-char-container');
        if (charContainer) {
            // Opposite move for depth
            const moveX = x * -20;
            const moveY = y * -20;
            const rotateY = x * 10;

            charContainer.style.transform = `translateY(-50%) translate(${moveX}px, ${moveY}px) perspective(1000px) rotateY(${rotateY}deg)`;
        }
    });

    // 2. Firing
    document.addEventListener('mousedown', (e) => {
        if (!document.body.classList.contains('theme-freefire')) return;

        // Trigger Recoil
        recoilTime = Math.PI; // Start recoil cycle

        // Muzzle Flash (HTML Overlay)
        if (muzzleFlash) {
            gunContainer.classList.add('gun-fire');
            setTimeout(() => gunContainer.classList.remove('gun-fire'), 100);
        }

        // Fire Projectile
        fireProjectile(e.clientX, e.clientY);
    });

    function fireProjectile(targetX, targetY) {
        const projectile = document.createElement('div');
        projectile.classList.add('quantum-projectile');

        // Origin: Bottom Left area (Original position)
        const startX = 200;
        const startY = window.innerHeight - 150;

        projectile.style.left = startX + 'px';
        projectile.style.top = startY + 'px';

        projectilesContainer.appendChild(projectile);

        const deltaX = targetX - startX;
        const deltaY = targetY - startY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        projectile.style.transform = `rotate(${angle}deg)`;

        const animation = projectile.animate([
            { transform: `rotate(${angle}deg) translate(0, 0)` },
            { transform: `rotate(${angle}deg) translate(${distance}px, 0)` }
        ], {
            duration: 200, easing: 'linear'
        });

        animation.onfinish = () => {
            projectile.remove();
            createImpact(targetX, targetY);
        };
    }

    function createImpact(x, y) {
        const impact = document.createElement('div');
        impact.classList.add('projectile-impact');
        impact.style.left = x + 'px';
        impact.style.top = y + 'px';
        projectilesContainer.appendChild(impact);
        setTimeout(() => impact.remove(), 500);
    }

    // ================== THEME ENGINE ==================
    const themes = [
        { id: 'default', name: 'Void (Default)', class: '' },
        { id: 'light', name: 'Daylight Mode', class: 'light-mode' },
        { id: 'naruto', name: 'Will of Fire (Naruto)', class: 'theme-naruto' },
        { id: 'freefire', name: 'Survivor (Free Fire)', class: 'theme-freefire' }
    ];

    let currentThemeIndex = 0;
    const docBody = document.body;
    const themeDisplay = document.getElementById('themeNameDisplay');

    // Load saved theme
    const savedThemeId = localStorage.getItem('themeId');
    if (savedThemeId) {
        const foundIndex = themes.findIndex(t => t.id === savedThemeId);
        if (foundIndex >= 0) {
            currentThemeIndex = foundIndex;
            applyTheme(currentThemeIndex);
        }
    }

    window.changeTheme = function (direction) {
        currentThemeIndex += direction;
        if (currentThemeIndex >= themes.length) currentThemeIndex = 0;
        if (currentThemeIndex < 0) currentThemeIndex = themes.length - 1;
        applyTheme(currentThemeIndex);
    };

    function applyTheme(index) {
        const theme = themes[index];
        themes.forEach(t => { if (t.class) docBody.classList.remove(t.class); });
        if (theme.class) docBody.classList.add(theme.class);
        if (themeDisplay) {
            themeDisplay.textContent = theme.name;
            themeDisplay.style.animation = 'none';
            themeDisplay.offsetHeight;
            themeDisplay.style.animation = 'fadeDisp 3s ease-in-out forwards';
        }
        const canvasContainer = document.getElementById('landing-canvas-container');
        if (canvasContainer) {
            if (theme.id === 'naruto' || theme.id === 'freefire') {
                canvasContainer.style.display = 'none';
                canvasContainer.style.opacity = '0';
            } else {
                canvasContainer.style.display = 'block';
                setTimeout(() => { canvasContainer.style.opacity = '1'; }, 50);
            }
        }
        localStorage.setItem('themeId', theme.id);

        // Initialize or destroy 3D character based on theme
        if (theme.id === 'freefire') {
            init3DCharacter();
        }
    }
});

/* ================== 3D FREE FIRE CHARACTER ================== */
let characterScene, characterCamera, characterRenderer, characterAnimationId;

function init3DCharacter() {
    const canvas = document.getElementById('freefire-char-canvas');
    if (!canvas) return;

    // Clean up existing scene
    if (characterRenderer) {
        cancelAnimationFrame(characterAnimationId);
        characterRenderer.dispose();
    }

    // Scene setup
    characterScene = new THREE.Scene();
    characterScene.fog = new THREE.Fog(0x0f172a, 3, 15);

    // Camera
    characterCamera = new THREE.PerspectiveCamera(50, canvas.parentElement.clientWidth / canvas.parentElement.clientHeight, 0.1, 100);
    characterCamera.position.set(0, 1.6, 4);
    characterCamera.lookAt(0, 1, 0);

    // Renderer
    characterRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    characterRenderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    characterRenderer.setPixelRatio(window.devicePixelRatio);
    characterRenderer.shadowMap.enabled = true;
    characterRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    characterRenderer.setClearColor(0x0f172a, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    characterScene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(3, 5, 4);
    mainLight.castShadow = true;
    characterScene.add(mainLight);

    const fillLight = new THREE.PointLight(0xffd700, 0.5, 10);
    fillLight.position.set(-3, 2, 2);
    characterScene.add(fillLight);

    const accentLight = new THREE.PointLight(0xff6432, 0.6, 10);
    accentLight.position.set(3, 1, -2);
    characterScene.add(accentLight);

    // ========== CREATE CHARACTER ==========
    const character = new THREE.Group();

    // === LEGS ===
    const legGeometry = new THREE.CapsuleGeometry(0.12, 0.65, 12, 24);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a, shininess: 30 });

    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.15, 0.4, 0);
    leftLeg.castShadow = true;
    character.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.15, 0.4, 0);
    rightLeg.castShadow = true;
    character.add(rightLeg);

    // Knee guards
    const kneeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const kneeMaterial = new THREE.MeshPhongMaterial({ color: 0x444444, shininess: 50 });

    const leftKnee = new THREE.Mesh(kneeGeometry, kneeMaterial);
    leftKnee.position.set(-0.15, 0.55, 0.05);
    leftKnee.scale.set(1, 0.6, 0.8);
    character.add(leftKnee);

    const rightKnee = new THREE.Mesh(kneeGeometry, kneeMaterial);
    rightKnee.position.set(0.15, 0.55, 0.05);
    rightKnee.scale.set(1, 0.6, 0.8);
    character.add(rightKnee);

    // === BOOTS ===
    const bootGeometry = new THREE.BoxGeometry(0.18, 0.15, 0.28);
    const bootMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a, shininess: 60 });

    const leftBoot = new THREE.Mesh(bootGeometry, bootMaterial);
    leftBoot.position.set(-0.15, 0.08, 0.02);
    character.add(leftBoot);

    const rightBoot = new THREE.Mesh(bootGeometry, bootMaterial);
    rightBoot.position.set(0.15, 0.08, 0.02);
    character.add(rightBoot);

    // === TORSO ===
    const torsoGeometry = new THREE.CapsuleGeometry(0.25, 0.6, 16, 32);
    const torsoMaterial = new THREE.MeshPhongMaterial({ color: 0xff6432, shininess: 40 });

    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.set(0, 1.1, 0);
    torso.castShadow = true;
    character.add(torso);

    // Tactical Vest
    const vestGeometry = new THREE.BoxGeometry(0.48, 0.5, 0.22);
    const vestMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a, shininess: 20 });

    const vest = new THREE.Mesh(vestGeometry, vestMaterial);
    vest.position.set(0, 1.1, 0.14);
    vest.scale.set(1, 1, 0.8);
    character.add(vest);

    // Vest pouches
    for (let i = 0; i < 3; i++) {
        const pouch = new THREE.Mesh(
            new THREE.BoxGeometry(0.12, 0.12, 0.08),
            new THREE.MeshPhongMaterial({ color: 0x1a1a1a })
        );
        pouch.position.set((i - 1) * 0.15, 0.95, 0.28);
        character.add(pouch);
    }

    // === ARMS ===
    const armGeometry = new THREE.CapsuleGeometry(0.08, 0.5, 10, 20);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xff8844, shininess: 35 });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.35, 1.2, 0);
    leftArm.rotation.z = 0.3;
    leftArm.castShadow = true;
    character.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.35, 1.2, 0);
    rightArm.rotation.z = -0.3;
    rightArm.castShadow = true;
    character.add(rightArm);

    // Shoulder Pads
    const shoulderGeometry = new THREE.SphereGeometry(0.13, 16, 16);
    const shoulderMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 50 });

    const leftShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
    leftShoulder.position.set(-0.35, 1.4, 0);
    leftShoulder.scale.set(1.2, 0.8, 1);
    character.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
    rightShoulder.position.set(0.35, 1.4, 0);
    rightShoulder.scale.set(1.2, 0.8, 1);
    character.add(rightShoulder);

    // === HANDS ===
    const handGeometry = new THREE.SphereGeometry(0.09, 12, 12);
    const handMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac, shininess: 15 });

    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-0.45, 0.85, 0.1);
    character.add(leftHand);

    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(0.55, 0.85, 0.1);
    character.add(rightHand);

    // === NECK ===
    const neckGeometry = new THREE.CylinderGeometry(0.08, 0.09, 0.15, 16);
    const neckMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac, shininess: 20 });

    const neck = new THREE.Mesh(neckGeometry, neckMaterial);
    neck.position.set(0, 1.5, 0);
    character.add(neck);

    // === HEAD ===
    const headGeometry = new THREE.SphereGeometry(0.22, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac, shininess: 25 });

    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1.75, 0);
    head.castShadow = true;
    character.add(head);

    // === HELMET (Free Fire Style) ===
    const helmetGeometry = new THREE.SphereGeometry(0.24, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.7);
    const helmetMaterial = new THREE.MeshPhongMaterial({
        color: 0xff3333,
        shininess: 80,
        emissive: 0xff0000,
        emissiveIntensity: 0.1
    });

    const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
    helmet.position.set(0, 1.78, 0);
    helmet.castShadow = true;
    character.add(helmet);

    // Helmet visor
    const visorGeometry = new THREE.SphereGeometry(0.23, 24, 24, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.25);
    const visorMaterial = new THREE.MeshPhongMaterial({
        color: 0x111111,
        transparent: true,
        opacity: 0.7,
        shininess: 100
    });

    const visor = new THREE.Mesh(visorGeometry, visorMaterial);
    visor.position.set(0, 1.75, 0.05);
    character.add(visor);

    // Helmet stripes
    const stripeGeometry = new THREE.BoxGeometry(0.48, 0.03, 0.25);
    const stripeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffaa00,
        emissive: 0xffaa00,
        emissiveIntensity: 0.3
    });

    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.set(0, 1.85, 0.08);
    stripe.rotation.x = -0.3;
    character.add(stripe);

    // === WEAPON ===
    const weaponGroup = new THREE.Group();

    const weaponBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.7),
        new THREE.MeshPhongMaterial({ color: 0x222222, shininess: 90 })
    );
    weaponGroup.add(weaponBody);

    const handle = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.2, 0.1),
        new THREE.MeshPhongMaterial({ color: 0x333333 })
    );
    handle.position.set(0, -0.1, -0.1);
    handle.rotation.x = 0.3;
    weaponGroup.add(handle);

    const weaponCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 16, 16),
        new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.9
        })
    );
    weaponCore.position.set(0, 0, 0.25);
    weaponGroup.add(weaponCore);

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.3, 12),
        new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 100 })
    );
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.05, 0.5);
    weaponGroup.add(barrel);

    weaponGroup.position.set(0.5, 1.0, 0.2);
    weaponGroup.rotation.set(0, 0, -0.3);
    character.add(weaponGroup);

    // === BACKPACK ===
    const backpack = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.4, 0.18),
        new THREE.MeshPhongMaterial({ color: 0x1a4d2e, shininess: 20 })
    );
    backpack.position.set(0, 1.2, -0.2);
    character.add(backpack);

    // ========== BACKGROUND GUNS & FREE FIRE ELEMENTS ==========

    // Create weapon creation helper function
    function createGun(type, position, rotation, scale) {
        const gunGroup = new THREE.Group();

        const gunMetal = new THREE.MeshPhongMaterial({
            color: 0x333333,
            shininess: 90,
            metalness: 0.8
        });
        const gunDark = new THREE.MeshPhongMaterial({ color: 0x1a1a1a, shininess: 50 });
        const gunGold = new THREE.MeshPhongMaterial({
            color: 0xffd700,
            shininess: 100,
            emissive: 0xffaa00,
            emissiveIntensity: 0.1
        });

        if (type === 'rifle') {
            // Assault Rifle
            const body = new THREE.Mesh(
                new THREE.BoxGeometry(0.06, 0.06, 0.5),
                gunMetal
            );
            gunGroup.add(body);

            const stock = new THREE.Mesh(
                new THREE.BoxGeometry(0.05, 0.08, 0.15),
                gunDark
            );
            stock.position.set(0, -0.02, -0.3);
            gunGroup.add(stock);

            const barrel = new THREE.Mesh(
                new THREE.CylinderGeometry(0.015, 0.015, 0.25, 8),
                gunDark
            );
            barrel.rotation.x = Math.PI / 2;
            barrel.position.set(0, 0.02, 0.35);
            gunGroup.add(barrel);

            const mag = new THREE.Mesh(
                new THREE.BoxGeometry(0.04, 0.12, 0.08),
                gunMetal
            );
            mag.position.set(0, -0.08, 0.05);
            gunGroup.add(mag);

            const scope = new THREE.Mesh(
                new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8),
                gunGold
            );
            scope.rotation.x = Math.PI / 2;
            scope.position.set(0, 0.06, 0.05);
            gunGroup.add(scope);

        } else if (type === 'smg') {
            // SMG
            const body = new THREE.Mesh(
                new THREE.BoxGeometry(0.05, 0.05, 0.35),
                gunMetal
            );
            gunGroup.add(body);

            const barrel = new THREE.Mesh(
                new THREE.CylinderGeometry(0.012, 0.012, 0.15, 8),
                gunDark
            );
            barrel.rotation.x = Math.PI / 2;
            barrel.position.set(0, 0.01, 0.25);
            gunGroup.add(barrel);

            const mag = new THREE.Mesh(
                new THREE.BoxGeometry(0.035, 0.15, 0.06),
                gunMetal
            );
            mag.position.set(0, -0.09, 0.05);
            gunGroup.add(mag);

        } else if (type === 'sniper') {
            // Sniper Rifle
            const body = new THREE.Mesh(
                new THREE.BoxGeometry(0.05, 0.05, 0.6),
                gunMetal
            );
            gunGroup.add(body);

            const longBarrel = new THREE.Mesh(
                new THREE.CylinderGeometry(0.018, 0.018, 0.4, 8),
                gunDark
            );
            longBarrel.rotation.x = Math.PI / 2;
            longBarrel.position.set(0, 0.02, 0.5);
            gunGroup.add(longBarrel);

            const stock = new THREE.Mesh(
                new THREE.BoxGeometry(0.06, 0.1, 0.2),
                gunDark
            );
            stock.position.set(0, -0.02, -0.35);
            gunGroup.add(stock);

            const bigScope = new THREE.Mesh(
                new THREE.CylinderGeometry(0.03, 0.03, 0.15, 8),
                gunGold
            );
            bigScope.rotation.x = Math.PI / 2;
            bigScope.position.set(0, 0.08, 0.1);
            gunGroup.add(bigScope);
        }

        gunGroup.position.copy(position);
        gunGroup.rotation.set(rotation.x, rotation.y, rotation.z);
        gunGroup.scale.setScalar(scale);

        return gunGroup;
    }

    // Create multiple floating guns in background
    const backgroundGuns = [];

    // Left side guns
    backgroundGuns.push({
        gun: createGun('rifle',
            new THREE.Vector3(-2.5, 2, -2),
            { x: 0.3, y: 0.5, z: 0.2 },
            0.8
        ),
        rotSpeed: { x: 0.002, y: 0.005, z: 0.001 },
        floatSpeed: 0.5,
        floatOffset: 0
    });

    backgroundGuns.push({
        gun: createGun('smg',
            new THREE.Vector3(-3, 0.5, -3),
            { x: -0.2, y: -0.8, z: 0.4 },
            0.7
        ),
        rotSpeed: { x: 0.003, y: -0.004, z: 0.002 },
        floatSpeed: 0.6,
        floatOffset: 1
    });

    // Right side guns
    backgroundGuns.push({
        gun: createGun('sniper',
            new THREE.Vector3(2.8, 1.5, -2.5),
            { x: -0.4, y: 0.6, z: -0.3 },
            0.9
        ),
        rotSpeed: { x: -0.002, y: 0.003, z: -0.001 },
        floatSpeed: 0.4,
        floatOffset: 2
    });

    backgroundGuns.push({
        gun: createGun('rifle',
            new THREE.Vector3(3.2, 0.8, -3.5),
            { x: 0.5, y: -0.4, z: 0.1 },
            0.75
        ),
        rotSpeed: { x: 0.001, y: -0.006, z: 0.003 },
        floatSpeed: 0.55,
        floatOffset: 3
    });

    // Far background guns
    backgroundGuns.push({
        gun: createGun('smg',
            new THREE.Vector3(-1.5, 2.5, -4),
            { x: 0.2, y: 1.2, z: -0.2 },
            0.6
        ),
        rotSpeed: { x: -0.003, y: 0.004, z: -0.002 },
        floatSpeed: 0.7,
        floatOffset: 4
    });

    backgroundGuns.push({
        gun: createGun('rifle',
            new THREE.Vector3(1.8, 0.2, -4.5),
            { x: -0.3, y: -1.1, z: 0.5 },
            0.65
        ),
        rotSpeed: { x: 0.002, y: 0.005, z: 0.001 },
        floatSpeed: 0.45,
        floatOffset: 5
    });

    // Add all guns to scene
    backgroundGuns.forEach(gunData => {
        gunData.gun.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.material.transparent = true;
                child.material.opacity = 0.6;
            }
        });
        characterScene.add(gunData.gun);
    });

    // Add "FREE FIRE" text elements in background
    const textGeo = new THREE.BoxGeometry(0.1, 0.4, 0.05);
    const textMat = new THREE.MeshPhongMaterial({
        color: 0xff3333,
        emissive: 0xff0000,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.3
    });

    const freeFireLetters = [];
    for (let i = 0; i < 8; i++) {
        const letter = new THREE.Mesh(textGeo, textMat);
        const angle = (i / 8) * Math.PI * 2;
        letter.position.set(
            Math.cos(angle) * 4,
            0.5 + Math.sin(i) * 1.5,
            -5 + Math.sin(angle) * 1
        );
        letter.rotation.set(
            Math.random() * 0.5,
            angle,
            Math.random() * 0.5
        );
        characterScene.add(letter);
        freeFireLetters.push({
            mesh: letter,
            baseY: letter.position.y,
            offset: i
        });
    }

    // Add ammo crates in background
    const crateGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const crateMat = new THREE.MeshPhongMaterial({
        color: 0x4a3020,
        transparent: true,
        opacity: 0.4
    });

    const crates = [];
    for (let i = 0; i < 4; i++) {
        const crate = new THREE.Mesh(crateGeo, crateMat);
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        crate.position.set(
            Math.cos(angle) * 3.5,
            -0.5,
            Math.sin(angle) * 3.5 - 3
        );
        crate.rotation.y = -angle;
        characterScene.add(crate);
        crates.push(crate);
    }

    // Store references for animation
    window.freefireBackgroundElements = {
        guns: backgroundGuns,
        letters: freeFireLetters,
        crates: crates
    };

    // === ENERGY AURA ===
    const auraGeometry = new THREE.SphereGeometry(0.9, 32, 32);
    const auraMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.05,
        wireframe: true
    });

    const aura = new THREE.Mesh(auraGeometry, auraMaterial);
    aura.position.set(0, 1.2, 0);
    character.add(aura);

    character.position.set(0, 0, 0);
    characterScene.add(character);

    // ========== QUANTUM SPHERES ==========
    const sphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const sphereMaterials = [
        new THREE.MeshPhongMaterial({
            color: 0xffd700,
            emissive: 0xffd700,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.9
        }),
        new THREE.MeshPhongMaterial({
            color: 0xff6432,
            emissive: 0xff6432,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.9
        }),
        new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.9
        })
    ];

    const spheres = [];
    for (let i = 0; i < 3; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterials[i]);
        sphere.castShadow = true;
        characterScene.add(sphere);
        spheres.push({
            mesh: sphere,
            angle: (Math.PI * 2 / 3) * i,
            radius: 1.5,
            height: 1.5 + (i * 0.3),
            speed: 0.015 + (i * 0.005)
        });
    }

    // ========== ANIMATION ==========
    let time = 0;

    function animateCharacter() {
        if (!document.body.classList.contains('theme-freefire')) {
            return;
        }

        characterAnimationId = requestAnimationFrame(animateCharacter);
        time += 0.01;

        // Rotate character
        character.rotation.y = Math.sin(time * 0.3) * 0.15;

        // Animate aura
        aura.rotation.y += 0.01;
        aura.scale.setScalar(1 + Math.sin(time * 2) * 0.05);

        // Pulse weapon core
        weaponCore.material.emissiveIntensity = 0.6 + Math.sin(time * 5) * 0.2;
        weaponCore.scale.setScalar(1 + Math.sin(time * 5) * 0.1);

        // Orbit spheres
        spheres.forEach((obj, i) => {
            obj.angle += obj.speed;
            obj.mesh.position.x = Math.cos(obj.angle) * obj.radius;
            obj.mesh.position.z = Math.sin(obj.angle) * obj.radius;
            obj.mesh.position.y = obj.height + Math.sin(time * 2 + i) * 0.3;
            obj.mesh.rotation.x += 0.02;
            obj.mesh.rotation.y += 0.03;

            const scale = 1 + Math.sin(time * 3 + i) * 0.1;
            obj.mesh.scale.setScalar(scale);
        });

        // Animate lights
        fillLight.intensity = 0.4 + Math.sin(time * 2) * 0.1;
        accentLight.intensity = 0.5 + Math.cos(time * 2.5) * 0.1;

        // Animate background guns
        if (window.freefireBackgroundElements) {
            const elements = window.freefireBackgroundElements;

            // Floating gun animations
            elements.guns.forEach((gunData) => {
                // Rotate guns
                gunData.gun.rotation.x += gunData.rotSpeed.x;
                gunData.gun.rotation.y += gunData.rotSpeed.y;
                gunData.gun.rotation.z += gunData.rotSpeed.z;

                // Float up and down
                const baseY = gunData.gun.position.y;
                gunData.gun.position.y = baseY + Math.sin(time * gunData.floatSpeed + gunData.floatOffset) * 0.2;
            });

            // Animate FREE FIRE letters
            elements.letters.forEach((letterData) => {
                letterData.mesh.position.y = letterData.baseY + Math.sin(time * 0.8 + letterData.offset) * 0.3;
                letterData.mesh.rotation.y += 0.01;
                // Pulse opacity
                letterData.mesh.material.opacity = 0.2 + Math.sin(time * 2 + letterData.offset) * 0.15;
            });

            // Rotate crates slowly
            elements.crates.forEach((crate, i) => {
                crate.rotation.y += 0.002 * (i % 2 === 0 ? 1 : -1);
            });
        }

        // Slight camera movement
        characterCamera.position.y = 1.6 + Math.sin(time * 0.5) * 0.05;

        characterRenderer.render(characterScene, characterCamera);
    }

    animateCharacter();

    // Handle resize
    window.addEventListener('resize', () => {
        if (!characterCamera || !characterRenderer) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        characterCamera.aspect = parent.clientWidth / parent.clientHeight;
        characterCamera.updateProjectionMatrix();
        characterRenderer.setSize(parent.clientWidth, parent.clientHeight);
    });
}
