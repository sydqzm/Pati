/**
 * CONTROLADOR DE LA CARTA ROMÁNTICA DEL CORAZÓN CENTRAL 💛
 */
class RomanticModalManager {
    constructor() {
        this.letterModal = document.getElementById('letter-modal');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Cerrar modal al hacer clic en botones de cierre
        document.querySelectorAll('.close-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        // Cerrar al hacer clic en el backdrop
        if (this.letterModal) {
            this.letterModal.addEventListener('click', (e) => {
                if (e.target === this.letterModal) this.closeAllModals();
            });
        }

        // Botón de Pétalos
        const rainBtn = document.getElementById('petal-rain-btn');
        if (rainBtn) {
            rainBtn.addEventListener('click', () => {
                this.triggerPetalRain();
                if (window.romanticAudio) window.romanticAudio.playHoverChime();
            });
        }
    }

    triggerPetalRain() {
        if (typeof confetti === 'undefined') return;
        const duration = 3.5 * 1000;
        const animationEnd = Date.now() + duration;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            confetti({
                particleCount: 8,
                angle: 60,
                spread: 60,
                origin: { x: 0, y: 0.15 },
                colors: ['#ffe600', '#ffd700', '#ffea75', '#ffffff']
            });
            confetti({
                particleCount: 8,
                angle: 120,
                spread: 60,
                origin: { x: 1, y: 0.15 },
                colors: ['#ffe600', '#ffd700', '#ffea75', '#ffffff']
            });
        }, 120);
    }

    // Abrir la carta romántica del corazón central
    openLetter(letterData = null) {
        const config = window.appConfig || DEFAULT_CONFIG;
        const letter = letterData || config.centralHeartLetter;
        if (!letter) return;

        const modal = this.letterModal;
        const recipientElem = document.getElementById('modal-letter-recipient');
        const dateElem = document.getElementById('modal-letter-date');
        const titleElem = document.getElementById('modal-letter-title');
        const contentElem = document.getElementById('modal-letter-body');
        const senderElem = document.getElementById('modal-letter-sender');

        if (recipientElem) recipientElem.textContent = `Para: ${config.recipientName || 'Mi Amor'}`;
        if (dateElem) dateElem.textContent = letter.date || "21 de Septiembre";
        if (titleElem) titleElem.textContent = letter.title || "Para el amor de mi vida";
        if (senderElem) senderElem.textContent = config.senderName || "Para siempre tuyo";

        if (contentElem && letter.content) {
            const paragraphs = letter.content.split('\n\n').filter(p => p.trim().length > 0);
            contentElem.innerHTML = paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
        }

        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        }

        this.triggerSubtleConfetti();
    }

    closeAllModals() {
        if (this.letterModal) this.letterModal.classList.remove('active');
        document.body.classList.remove('modal-open');

        // Reset cámara suavemente a la vista panorámica
        if (window.galaxyApp) {
            window.galaxyApp.resetCamera();
        }
    }

    triggerSubtleConfetti() {
        if (typeof confetti === 'undefined') return;
        confetti({
            particleCount: 45,
            spread: 80,
            origin: { y: 0.4 },
            colors: ['#ffd700', '#ffea75', '#ff9800', '#ffffff']
        });
    }
}

window.romanticModal = new RomanticModalManager();
