/**
 * MOTOR 3D DE LA GALAXIA Y CORAZÓN DE FLORES AMARILLAS 🌻✨
 * Three.js: Galaxia espiral, Corazón 3D de partículas doradas, polvo estelar.
 */
class YellowGalaxy {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.clock = new THREE.Clock();

        // Grupos y sistemas de partículas
        this.galaxyGroup = null;
        this.spiralParticles = null;
        this.heartGroup = null;
        this.heartParticles = null;
        this.heartTextMesh = null;
        this.stardustParticles = null;
        this.flowersManager = null;

        // Parámetros de animación
        this.heartPulseSpeed = 2.2;
        this.isInteracting = false;
        this.isCameraLocked = false;

        this.init();
    }

    init() {
        // 1. Escena
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x060502, 0.008);

        // 2. Cámara
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        // Vista inicial ligeramente inclinada para apreciar la espiral y el corazón
        this.camera.position.set(0, 18, 30);

        // 3. Renderer de alto rendimiento (sin MSAA innecesario para partículas)
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: false, 
            alpha: true, 
            powerPreference: 'high-performance',
            precision: 'mediump'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(1); // 1.0 evita renderizar a 4K en pantallas escaladas
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.3;
        this.container.appendChild(this.renderer.domElement);

        // 4. Controles orbitales ultra-reactivos
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.maxDistance = 85;
        this.controls.minDistance = 6;
        this.controls.maxPolarAngle = Math.PI * 0.85;
        this.controls.minPolarAngle = Math.PI * 0.15;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.6;

        // Detener auto-rotación cuando el usuario interactúa
        this.controls.addEventListener('start', () => {
            this.controls.autoRotate = false;
        });

        // 5. Luces cálidas doradas optimizadas
        const ambientLight = new THREE.AmbientLight(0xfffae0, 1.4);
        this.scene.add(ambientLight);

        // 6. Construir componentes del universo
        this.createGalaxyGroup();
        this.createSpiralGalaxy();
        this.createGlowingParticleHeart();
        this.createHeartCentralText();
        this.createStardustField();

        // 7. Eventos
        window.addEventListener('resize', () => this.onWindowResize());

        // 8. Loop de animación
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    createGalaxyGroup() {
        this.galaxyGroup = new THREE.Group();
        this.scene.add(this.galaxyGroup);
    }

    // Generador de textura suave de partícula brillante
    createSparkleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.18, 'rgba(255, 240, 140, 0.95)');
        grad.addColorStop(0.45, 'rgba(255, 195, 0, 0.45)');
        grad.addColorStop(0.8, 'rgba(255, 160, 0, 0.12)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);

        // Rayos de destello cruzados (estrella de brillo)
        ctx.strokeStyle = 'rgba(255, 255, 230, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(64, 10);
        ctx.lineTo(64, 118);
        ctx.moveTo(10, 64);
        ctx.lineTo(118, 64);
        ctx.stroke();

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    // 1. Galaxia Espiral Dorada
    createSpiralGalaxy() {
        const particleCount = 1800;
        const arms = 3;
        const radius = 36;
        const spin = 1.3;

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);

        const innerColor = new THREE.Color(0xfff7b2); // Amarillo luminoso central
        const midColor = new THREE.Color(0xffd000);   // Oro vibrante
        const outerColor = new THREE.Color(0xf59e0b); // Ámbar dorado

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            // Distribución exponencial hacia el centro
            const r = Math.pow(Math.random(), 1.8) * radius;
            const armAngle = ((i % arms) * 2 * Math.PI) / arms;
            const spinAngle = r * spin * 0.1;

            // Dispersión aleatoria
            const randomX = Math.pow(Math.random(), 2.5) * (Math.random() < 0.5 ? 1 : -1) * (1.2 + r * 0.12);
            const randomY = Math.pow(Math.random(), 2.5) * (Math.random() < 0.5 ? 1 : -1) * (1.0 + r * 0.08);
            const randomZ = Math.pow(Math.random(), 2.5) * (Math.random() < 0.5 ? 1 : -1) * (1.2 + r * 0.12);

            positions[i3] = Math.cos(armAngle + spinAngle) * r + randomX;
            positions[i3 + 1] = randomY * 0.7; // Plano galáctico
            positions[i3 + 2] = Math.sin(armAngle + spinAngle) * r + randomZ;

            // Color degradado
            const mixedColor = innerColor.clone();
            if (r < radius * 0.4) {
                mixedColor.lerp(midColor, r / (radius * 0.4));
            } else {
                mixedColor.lerp(outerColor, (r - radius * 0.4) / (radius * 0.6));
            }

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            scales[i] = Math.random() * 0.8 + 0.4;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        const material = new THREE.PointsMaterial({
            size: 1.25,
            map: this.createSparkleTexture(),
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 0.90
        });

        this.spiralParticles = new THREE.Points(geometry, material);
        this.spiralParticles.position.y = -2.5; // Debajo del corazón
        this.galaxyGroup.add(this.spiralParticles);
    }

    // 2. Corazón 3D de Partículas Doradas
    createGlowingParticleHeart() {
        this.heartGroup = new THREE.Group();
        this.heartGroup.position.set(0, 6.2, 0); // Posición estelar prominente

        const particleCount = 1400;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const originalPositions = new Float32Array(particleCount * 3);

        const heartGold = new THREE.Color(0xffea00);
        const heartWarm = new THREE.Color(0xfffa8b);
        const heartDeep = new THREE.Color(0xffaa00);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Curva paramétrica matemática del corazón
            const t = Math.random() * Math.PI * 2;
            // Densidad y dispersión de volumen 3D
            const spread = Math.random();
            const scale = (0.28 + spread * 0.16);

            // Fórmula clásica: x = 16 sin^3(t), y = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
            let x = 16 * Math.pow(Math.sin(t), 3);
            let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            let z = (Math.random() - 0.5) * 8 * (1 - Math.abs(x) / 18);

            // Añadir puntos al contorno más definidos
            if (i < particleCount * 0.45) {
                const outlineT = (i / (particleCount * 0.45)) * Math.PI * 2;
                x = 16 * Math.pow(Math.sin(outlineT), 3);
                y = 13 * Math.cos(outlineT) - 5 * Math.cos(2 * outlineT) - 2 * Math.cos(3 * outlineT) - Math.cos(4 * outlineT);
                z = (Math.random() - 0.5) * 1.8;
            }

            positions[i3] = x * scale;
            positions[i3 + 1] = y * scale;
            positions[i3 + 2] = z * scale;

            originalPositions[i3] = positions[i3];
            originalPositions[i3 + 1] = positions[i3 + 1];
            originalPositions[i3 + 2] = positions[i3 + 2];

            // Color dorado brillante con variaciones
            const randColor = Math.random();
            const col = randColor > 0.6 ? heartWarm : (randColor > 0.3 ? heartGold : heartDeep);
            colors[i3] = col.r;
            colors[i3 + 1] = col.g;
            colors[i3 + 2] = col.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        this.heartOriginalPositions = originalPositions;

        const material = new THREE.PointsMaterial({
            size: 1.35,
            map: this.createSparkleTexture(),
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 0.96
        });

        this.heartParticles = new THREE.Points(geometry, material);
        this.heartGroup.add(this.heartParticles);

        // Aura de luz del corazón
        const heartGlow = new THREE.PointLight(0xffea00, 3.8, 25);
        heartGlow.position.set(0, 0, 1);
        this.heartGroup.add(heartGlow);
        this.heartLight = heartGlow;

        // Hacer que el corazón sea interactivo al hacer clic
        const hitGeometry = new THREE.SphereGeometry(4.5, 16, 16);
        const hitMaterial = new THREE.MeshBasicMaterial({ visible: false });
        this.heartHitMesh = new THREE.Mesh(hitGeometry, hitMaterial);
        this.heartHitMesh.userData = { isHeart: true };
        this.heartGroup.add(this.heartHitMesh);

        this.galaxyGroup.add(this.heartGroup);
    }

    // Texto flotante en el centro del corazón "Te amo 💛"
    createHeartCentralText() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        this.heartCanvas = canvas;
        this.heartCtx = ctx;
        this.updateHeartText(window.appConfig.heartText || "Te Amo 💛");

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const sprite = new THREE.Sprite(material);
        sprite.scale.set(7.5, 3.8, 1);
        sprite.position.set(0, 0.4, 1.2);
        this.heartTextMesh = sprite;
        this.heartGroup.add(sprite);
    }

    updateHeartText(text) {
        if (!this.heartCtx) return;
        const ctx = this.heartCtx;
        ctx.clearRect(0, 0, 512, 256);

        // Brillo de fondo
        const grad = ctx.createRadialGradient(256, 128, 10, 256, 128, 180);
        grad.addColorStop(0, 'rgba(255, 230, 100, 0.35)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 256);

        // Tipografía elegante
        ctx.font = 'bold 50px "Dancing Script", "Playfair Display", cursive, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Sombra de resplandor
        ctx.shadowColor = '#ffe600';
        ctx.shadowBlur = 24;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(text, 256, 128);

        ctx.shadowBlur = 12;
        ctx.fillStyle = '#fff4a3';
        ctx.fillText(text, 256, 128);

        if (this.heartTextMesh && this.heartTextMesh.material.map) {
            this.heartTextMesh.material.map.needsUpdate = true;
        }
    }

    // 3. Polvo estelar cósmico de fondo
    createStardustField() {
        const starCount = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);

        const goldTone = new THREE.Color(0xffea75);
        const whiteTone = new THREE.Color(0xffffff);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            // Distribución esférica distante
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = 50 + Math.random() * 90;

            positions[i3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.7;
            positions[i3 + 2] = r * Math.cos(phi);

            const col = Math.random() > 0.4 ? goldTone : whiteTone;
            colors[i3] = col.r;
            colors[i3 + 1] = col.g;
            colors[i3 + 2] = col.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.95,
            map: this.createSparkleTexture(),
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 0.75
        });

        this.stardustParticles = new THREE.Points(geometry, material);
        this.scene.add(this.stardustParticles);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Animación continua
    animate() {
        requestAnimationFrame(this.animate);

        const elapsedTime = this.clock.getElapsedTime();

        // 1. Rotación suave de la galaxia espiral
        if (this.spiralParticles) {
            this.spiralParticles.rotation.y = elapsedTime * 0.05;
        }

        // 2. Polvo estelar flotando
        if (this.stardustParticles) {
            this.stardustParticles.rotation.y = elapsedTime * 0.015;
        }

        // 3. Latido del corazón dorado 💛 (Pulsación rítmica)
        if (!this.isCreatingGalaxy && this.heartGroup && this.heartParticles) {
            const beat = Math.sin(elapsedTime * this.heartPulseSpeed);
            const pulseScale = 1.0 + Math.pow(Math.max(0, beat), 3) * 0.08;
            this.heartGroup.scale.set(pulseScale, pulseScale, pulseScale);

            // Leve oscilación espacial
            this.heartGroup.position.y = 6.2 + Math.sin(elapsedTime * 1.5) * 0.25;

            // Luz pulsante
            if (this.heartLight) {
                this.heartLight.intensity = 3.2 + beat * 1.2;
            }

            // Destello suave del texto
            if (this.heartTextMesh) {
                const textScale = 7.5 * (1.0 + Math.sin(elapsedTime * 1.8) * 0.04);
                this.heartTextMesh.scale.set(textScale, textScale * 0.5, 1);
            }
        }

        // 4. Actualizar flores flotantes si el manager existe
        if (this.flowersManager) {
            this.flowersManager.update(elapsedTime);
        }

        // 5. Controles
        if (this.controls.enabled) {
            this.controls.update();
        }

        // 6. Render
        this.renderer.render(this.scene, this.camera);
    }

    // Resetear cámara al centro con animación GSAP
    resetCamera() {
        if (typeof gsap !== 'undefined') {
            gsap.to(this.camera.position, {
                x: 0,
                y: 18,
                z: 30,
                duration: 1.8,
                ease: "power2.inOut",
                onUpdate: () => {
                    this.controls.target.set(0, 3, 0);
                }
            });
            gsap.to(this.controls.target, {
                x: 0,
                y: 3,
                z: 0,
                duration: 1.8,
                ease: "power2.inOut"
            });
        } else {
            this.camera.position.set(0, 18, 30);
            this.controls.target.set(0, 3, 0);
        }
    }

    // Animación cinematográfica de nacimiento: la cámara gira en espiral mientras la galaxia se crea
    startGalaxyCreationAnimation(onComplete) {
        if (typeof gsap === 'undefined') {
            if (onComplete) onComplete();
            return;
        }

        this.isCreatingGalaxy = true;
        this.controls.enabled = false;

        // 1. Galaxia espiral nace desde el centro
        if (this.spiralParticles) {
            this.spiralParticles.scale.set(0.001, 0.001, 0.001);
            gsap.to(this.spiralParticles.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 3.0,
                ease: "power2.out"
            });
        }

        // 2. Corazón nace con rebote elástico
        if (this.heartGroup) {
            this.heartGroup.scale.set(0.001, 0.001, 0.001);
            gsap.to(this.heartGroup.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 2.2,
                delay: 0.9,
                ease: "back.out(1.8)"
            });
        }

        // 3. Cámara orbitando en espiral (720°) descendiendo hacia la vista ideal
        const animParams = { angle: 0, radius: 46, height: 34 };
        this.camera.position.set(0, 34, 46);
        this.camera.lookAt(0, 3, 0);

        gsap.to(animParams, {
            angle: Math.PI * 3.5, // 720° de rotación circular
            radius: 30,
            height: 18,
            duration: 3.6,
            ease: "power2.inOut",
            onUpdate: () => {
                this.camera.position.x = Math.sin(animParams.angle) * animParams.radius;
                this.camera.position.z = Math.cos(animParams.angle) * animParams.radius;
                this.camera.position.y = animParams.height;
                this.camera.lookAt(0, 3, 0);
            },
            onComplete: () => {
                this.controls.target.set(0, 3, 0);
                this.controls.enabled = true;
                this.controls.update();
                this.isCreatingGalaxy = false;
                if (onComplete) onComplete();
            }
        });

        // 4. Flores brotando una tras otra
        if (this.flowersManager) {
            this.flowersManager.animateCreation();
        }
    }
}
