/**
 * EXPERIENCIA DE INTRODUCCIÓN: CREACIÓN DE GIRASOLES Y PREGUNTA ROMÁNTICA 🌻✨
 * Muestra el florecimiento suave, orgánico y botánico de los girasoles desde abajo,
 * la pregunta interactiva y la transición cinematográfica a la galaxia.
 */
class IntroManager {
    constructor() {
        this.introScreen = document.getElementById('intro-screen');
        this.questionBox = document.getElementById('intro-question-box');
        this.btnYes = document.getElementById('btn-intro-yes');
        this.btnNo = document.getElementById('btn-intro-no');
        this.toastMessage = document.getElementById('intro-toast');
        this.sunflowerSvg = document.getElementById('sunflower-bouquet-svg');
        this.isTransitioning = false;

        this.init();
    }

    init() {
        if (!this.introScreen) return;

        this.createBackgroundStars();
        this.startGrowingAnimation();
        this.bindEvents();
    }

    createBackgroundStars() {
        const starsContainer = document.getElementById('intro-stars');
        if (!starsContainer) return;

        const count = 75;
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'intro-star';
            const size = Math.random() * 3 + 1.5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${2 + Math.random() * 3}s`;
            starsContainer.appendChild(star);
        }
    }

    startGrowingAnimation() {
        // Secuencia botánica suave y escalonada:
        // 1. Tallo central crece desde abajo (0.2s)
        setTimeout(() => {
            const stemCenter = document.getElementById('stem-center');
            if (stemCenter) stemCenter.classList.add('grown');
        }, 200);

        // 2. Hojas del tallo central se despliegan suavemente (0.65s)
        setTimeout(() => {
            const leaves1 = document.querySelectorAll('.leaves-group-1');
            if (leaves1) leaves1.forEach(l => l.classList.add('grown'));
        }, 650);

        // 3. Flor central de enmedio florece majestuosamente en su tallo (1.05s)
        setTimeout(() => {
            const flowerCenter = document.getElementById('flower-head-center');
            if (flowerCenter) flowerCenter.classList.add('bloomed');
        }, 1050);

        // 4. Tallos medios y bajos brotan hacia los lados (1.4s)
        setTimeout(() => {
            const stemsMid = document.querySelectorAll('.stem-mid');
            const stemsOuter = document.querySelectorAll('.stem-outer');
            stemsMid.forEach(s => s.classList.add('grown'));
            stemsOuter.forEach(s => s.classList.add('grown'));
        }, 1400);

        // 5. Hojas laterales se extienden (1.8s)
        setTimeout(() => {
            const leaves2 = document.querySelectorAll('.leaves-group-2');
            const leaves3 = document.querySelectorAll('.leaves-group-3');
            leaves2.forEach(l => l.classList.add('grown'));
            leaves3.forEach(l => l.classList.add('grown'));
        }, 1800);

        // 6. Flores medias y bajas florecen (2.1s)
        setTimeout(() => {
            const flowersMid = document.querySelectorAll('.flower-head-mid');
            const flowerOutLeft = document.getElementById('flower-head-outer-left');
            const flowerOutRight = document.getElementById('flower-head-outer-right');
            flowersMid.forEach(f => f.classList.add('bloomed'));
            if (flowerOutLeft) flowerOutLeft.classList.add('bloomed');
            if (flowerOutRight) flowerOutRight.classList.add('bloomed');
        }, 2100);

        // 7. Flores superiores florecen completando el ramo de 7 (2.6s)
        setTimeout(() => {
            const flowerTopLeft = document.getElementById('flower-head-top-left');
            const flowerTopRight = document.getElementById('flower-head-top-right');
            if (flowerTopLeft) flowerTopLeft.classList.add('bloomed');
            if (flowerTopRight) flowerTopRight.classList.add('bloomed');
        }, 2600);

        // 8. Pregunta interactiva aparece suavemente (3.4s)
        setTimeout(() => {
            if (this.questionBox) {
                this.questionBox.classList.add('visible');
            }
        }, 3400);
    }

    bindEvents() {
        // Botón "Sí" -> "Yo no estoy feliz así que presiona no"
        if (this.btnYes) {
            this.btnYes.addEventListener('click', () => {
                this.handleYesClick();
            });
        }

        // Botón "No" -> Transición inmediata a la Galaxia 3D
        if (this.btnNo) {
            this.btnNo.addEventListener('click', () => {
                this.handleNoClick();
            });
        }
    }

    handleYesClick() {
        if (!this.toastMessage) return;

        this.toastMessage.innerHTML = `
            <div class="toast-title">
                <span>Yo no estoy feliz, ¡así que presiona NO!</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffd700" style="vertical-align: -2px; margin-left: 4px;">
                    <circle cx="12" cy="12" r="10" fill="#ffd700"/>
                    <circle cx="8" cy="10" r="1.5" fill="#3a1c04"/>
                    <circle cx="16" cy="10" r="1.5" fill="#3a1c04"/>
                    <path d="M8 14.5c1.2 2 2.8 2.5 4 2.5s2.8-.5 4-2.5" stroke="#3a1c04" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                </svg>
            </div>
            <div class="toast-desc">¡Porque mereces algo infinitamente más grande y eterno que solo un ramo!</div>
        `;
        this.toastMessage.classList.add('active');

        // Efecto de rebote llamativo en el botón No
        if (this.btnNo) {
            this.btnNo.classList.add('pulse-highlight');
        }

        // Sonido suave
        if (window.romanticAudio) {
            window.romanticAudio.playHoverChime();
        }
    }

    handleNoClick() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        if (this.toastMessage) {
            this.toastMessage.innerHTML = `
                <div class="toast-title">
                    <span>¡Exacto mi amor!</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffd700" style="vertical-align: -2px; margin-left: 4px;">
                        <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 16.1 7.2 18.6l.9-5.3-3.8-3.7 5.3-.8L12 2z"/>
                    </svg>
                </div>
                <div class="toast-desc">¡Porque mereces un universo entero de flores que nunca se marchiten!</div>
            `;
            this.toastMessage.classList.add('active');
        }

        // Iniciar música romántica inmediatamente
        if (window.romanticAudio) {
            window.romanticAudio.play();
        }

        // Lluvia de destellos dorados
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 85,
                spread: 110,
                origin: { y: 0.6 },
                colors: ['#ffe600', '#ffd000', '#ffea75', '#ffffff']
            });
        }

        // Transición rápida: la galaxia inicia y el telón se desvanece
        setTimeout(() => {
            if (this.introScreen) {
                this.introScreen.classList.add('fade-out');
            }

            // Iniciar la animación cinematográfica de creación en 3D
            if (window.galaxyApp) {
                window.galaxyApp.startGalaxyCreationAnimation(() => {
                    setTimeout(() => {
                        if (this.introScreen) this.introScreen.style.display = 'none';
                    }, 500);
                });
            }
        }, 350);
    }
}

window.introManager = new IntroManager();
