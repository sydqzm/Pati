/**
 * GESTOR DE FLORES FLOTANTES EN LA GALAXIA 3D 🌻✨
 * - Bouquets orbitando en sincronía con la galaxia
 * - Hover interactivo que agranda el ramo y hace brillar el aura
 * - Clic que enfoca la cámara en la flor y muestra su dedicatoria en 3D
 * - Clic en el corazón central para abrir la carta romántica de Andrea
 */
class FlowersManager {
    constructor(galaxyApp) {
        this.galaxy = galaxyApp;
        this.scene = galaxyApp.scene;
        this.camera = galaxyApp.camera;

        this.flowerGroups = [];
        this.flowerObjects = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.hoveredFlower = null;
        this.isPointerDown = false;
        this.pointerDownPos = { x: 0, y: 0 };
        this.hoverThrottle = false;

        this.init();
    }

    init() {
        this.loadFlowers();
        this.setupRaycasting();
    }

    createFeatheredFlowerTexture(imagePath, callback) {
        const loader = new THREE.TextureLoader();
        loader.load(
            imagePath,
            (texture) => {
                texture.generateMipmaps = false;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                callback(texture);
            },
            undefined,
            (err) => {
                console.warn("No se pudo cargar la imagen:", imagePath, err);
            }
        );
    }

    // Etiqueta flotante 3D con frase romántica debajo de cada ramo
    createLabelTexture(text) {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        // Fondo cápsula dorado elegante
        ctx.fillStyle = 'rgba(20, 14, 5, 0.88)';
        this.roundRect(ctx, 20, 20, 472, 88, 44);
        ctx.fill();

        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 4;
        this.roundRect(ctx, 20, 20, 472, 88, 44);
        ctx.stroke();

        // Texto romántico
        ctx.font = 'bold 34px "Montserrat", "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#ffd000';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(text, 256, 64);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    // Aura dorada pulsante detrás de cada ramo
    createAuraTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
        grad.addColorStop(0, 'rgba(255, 235, 120, 0.75)');
        grad.addColorStop(0.4, 'rgba(255, 190, 0, 0.35)');
        grad.addColorStop(1, 'rgba(255, 150, 0, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);

        return new THREE.CanvasTexture(canvas);
    }

    loadFlowers() {
        const flowersData = window.appConfig.flowers || [];
        const auraTexture = this.createAuraTexture();

        flowersData.forEach((flower, index) => {
            const group = new THREE.Group();

            // Posición 3D inicial en órbita
            const { radius, angle, height } = flower.position;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = height;

            group.position.set(x, y, z);

            // 1. Sprite de Aura dorada
            const auraMat = new THREE.SpriteMaterial({
                map: auraTexture,
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: 0.55
            });
            const auraSprite = new THREE.Sprite(auraMat);
            const auraScale = flower.scale * 1.5;
            auraSprite.scale.set(auraScale, auraScale, 1);
            auraSprite.position.set(0, 0, -0.2);
            group.add(auraSprite);

            // 2. Etiqueta flotante con mensaje romántico debajo
            const labelTex = this.createLabelTexture(flower.tag);
            const labelMat = new THREE.SpriteMaterial({
                map: labelTex,
                transparent: true,
                depthWrite: false
            });
            const labelSprite = new THREE.Sprite(labelMat);
            labelSprite.scale.set(5.8, 1.45, 1);
            labelSprite.position.set(0, -flower.scale * 0.58, 0.1);
            group.add(labelSprite);

            // 3. Esfera de colisión para clics y hover
            const hitGeo = new THREE.SphereGeometry(flower.scale * 0.9, 8, 8);
            const hitMat = new THREE.MeshBasicMaterial({ visible: false });
            const hitMesh = new THREE.Mesh(hitGeo, hitMat);
            hitMesh.userData = {
                flowerData: flower,
                isFlower: true,
                group: group,
                aura: auraSprite,
                flowerSprite: null,
                labelSprite: labelSprite
            };
            group.add(hitMesh);
            this.flowerObjects.push(hitMesh);

            // 4. Sprite del Ramo de Flores Amarillas
            this.createFeatheredFlowerTexture(flower.image, (texture) => {
                const mat = new THREE.SpriteMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.98
                });
                const flowerSprite = new THREE.Sprite(mat);
                flowerSprite.scale.set(flower.scale, flower.scale, 1);
                flowerSprite.userData = {
                    flowerData: flower,
                    isFlower: true,
                    originalScale: flower.scale,
                    group: group,
                    aura: auraSprite
                };
                group.add(flowerSprite);
                hitMesh.userData.flowerSprite = flowerSprite;
                group.userData.flowerSprite = flowerSprite;
            });

            // Datos orbitales para rotar en sincronía con la galaxia
            group.userData = {
                baseY: y,
                phase: index * 0.9,
                speed: 1.2 + Math.random() * 0.5,
                radius: radius,
                baseAngle: angle,
                flowerSprite: null,
                aura: auraSprite,
                labelSprite: labelSprite
            };

            this.scene.add(group);
            this.flowerGroups.push(group);
        });
    }

    setupRaycasting() {
        const dom = this.galaxy.renderer.domElement;

        dom.addEventListener('pointerdown', (e) => {
            this.isPointerDown = true;
            this.pointerDownPos.x = e.clientX;
            this.pointerDownPos.y = e.clientY;
        });

        dom.addEventListener('pointermove', (e) => {
            if (this.isPointerDown) return;

            const rect = dom.getBoundingClientRect();
            this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            if (!this.hoverThrottle) {
                this.hoverThrottle = true;
                requestAnimationFrame(() => {
                    this.checkHover();
                    this.hoverThrottle = false;
                });
            }
        });

        dom.addEventListener('pointerup', (e) => {
            if (!this.isPointerDown) return;
            this.isPointerDown = false;

            const dx = Math.abs(e.clientX - this.pointerDownPos.x);
            const dy = Math.abs(e.clientY - this.pointerDownPos.y);

            if (dx > 7 || dy > 7) return;

            this.handleClick();
        });
    }

    checkHover() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const interactables = [...this.flowerObjects];
        if (this.galaxy.heartHitMesh) {
            interactables.push(this.galaxy.heartHitMesh);
        }

        const intersects = this.raycaster.intersectObjects(interactables, false);

        if (intersects.length > 0) {
            const hit = intersects[0].object;
            document.body.style.cursor = 'pointer';

            if (this.hoveredFlower !== hit) {
                this.resetHovered();

                this.hoveredFlower = hit;

                // Al pasar el cursor por las flores, se agrandan suavemente
                if (hit.userData && hit.userData.isFlower) {
                    const spr = hit.userData.flowerSprite;
                    if (spr && spr.userData && spr.userData.originalScale && typeof gsap !== 'undefined') {
                        const orig = spr.userData.originalScale;
                        gsap.to(spr.scale, { x: orig * 1.25, y: orig * 1.25, duration: 0.35, ease: "back.out(1.7)" });
                    }
                    if (hit.userData.aura && typeof gsap !== 'undefined') {
                        gsap.to(hit.userData.aura.material, { opacity: 0.95, duration: 0.35 });
                    }
                    if (window.romanticAudio) {
                        window.romanticAudio.playHoverChime();
                    }
                }
            }
        } else {
            document.body.style.cursor = 'default';
            this.resetHovered();
        }
    }

    resetHovered() {
        if (this.hoveredFlower && this.hoveredFlower.userData && this.hoveredFlower.userData.isFlower) {
            const spr = this.hoveredFlower.userData.flowerSprite;
            if (spr && spr.userData && spr.userData.originalScale && typeof gsap !== 'undefined') {
                const orig = spr.userData.originalScale;
                gsap.to(spr.scale, { x: orig, y: orig, duration: 0.35, ease: "power2.out" });
            }
            if (this.hoveredFlower.userData.aura && typeof gsap !== 'undefined') {
                gsap.to(this.hoveredFlower.userData.aura.material, { opacity: 0.55, duration: 0.35 });
            }
        }
        this.hoveredFlower = null;
    }

    handleClick() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const interactables = [...this.flowerObjects];
        if (this.galaxy.heartHitMesh) {
            interactables.push(this.galaxy.heartHitMesh);
        }

        const intersects = this.raycaster.intersectObjects(interactables, false);

        if (intersects.length > 0) {
            const hit = intersects[0].object;

            if (hit.userData && hit.userData.isHeart) {
                // Clic en el corazón central: abre la carta de amor para Andrea
                this.focusOnHeart();
            } else if (hit.userData && hit.userData.isFlower) {
                // Clic en una flor: la cámara vuela suavemente hacia esa flor para admirarla de cerca en 3D
                this.focusOnFlower(hit);
            }
        }
    }

    focusOnHeart() {
        if (window.romanticAudio) {
            window.romanticAudio.playCardOpenSound();
        }

        if (typeof gsap !== 'undefined') {
            gsap.to(this.camera.position, {
                x: 0,
                y: 8,
                z: 16,
                duration: 1.6,
                ease: "power2.inOut"
            });
            gsap.to(this.galaxy.controls.target, {
                x: 0,
                y: 6.2,
                z: 0,
                duration: 1.6,
                ease: "power2.inOut",
                onComplete: () => {
                    if (window.romanticModal) {
                        window.romanticModal.openLetter(window.appConfig.centralHeartLetter);
                    }
                }
            });
        } else {
            if (window.romanticModal) {
                window.romanticModal.openLetter(window.appConfig.centralHeartLetter);
            }
        }
    }

    focusOnFlower(flowerMesh) {
        const group = flowerMesh.userData.group;
        if (!group) return;

        if (window.romanticAudio) {
            window.romanticAudio.playHoverChime();
        }

        // Posicionar la cámara frente a la flor con suave ángulo para contemplarla
        const targetPos = group.position.clone();
        const dir = targetPos.clone().normalize();
        const camPos = targetPos.clone().add(dir.clone().multiplyScalar(9.5)).add(new THREE.Vector3(0, 1.2, 0));

        if (typeof gsap !== 'undefined') {
            gsap.to(this.camera.position, {
                x: camPos.x,
                y: camPos.y,
                z: camPos.z,
                duration: 1.7,
                ease: "power2.inOut"
            });
            gsap.to(this.galaxy.controls.target, {
                x: targetPos.x,
                y: targetPos.y,
                z: targetPos.z,
                duration: 1.7,
                ease: "power2.inOut"
            });
        } else {
            this.camera.position.copy(camPos);
            this.galaxy.controls.target.copy(targetPos);
        }
    }

    // Órbita sincronizada con la rotación de la galaxia
    update(time) {
        const galaxySpin = 0.05; // Misma velocidad angular que la galaxia espiral
        for (let i = 0; i < this.flowerGroups.length; i++) {
            const group = this.flowerGroups[i];
            const { baseY, phase, speed, radius, baseAngle } = group.userData;

            // 1. Órbita a la par con la galaxia
            const currentAngle = baseAngle + time * galaxySpin;
            group.position.x = Math.cos(currentAngle) * radius;
            group.position.z = Math.sin(currentAngle) * radius;

            // 2. Leve flotación en ingravidez
            group.position.y = baseY + Math.sin(time * speed + phase) * 0.45;
        }
    }

    // Animación de brote inicial durante la creación de la galaxia
    animateCreation() {
        this.flowerGroups.forEach((group, idx) => {
            group.scale.set(0.001, 0.001, 0.001);
            if (typeof gsap !== 'undefined') {
                gsap.to(group.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1.3,
                    delay: 0.8 + idx * 0.18,
                    ease: "back.out(1.6)"
                });
            } else {
                group.scale.set(1, 1, 1);
            }
        });
    }
}
