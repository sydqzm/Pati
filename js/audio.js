/**
 * AUDIO ENGINE PARA LA EXPERIENCIA ROMÁNTICA 💛🎵
 * Incluye sintetizador Web Audio API para música ambiental suave y campanas cósmicas.
 */
class RomanticAudioManager {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.isMuted = false;
        this.timer = null;
        this.currentNoteIndex = 0;
        this.ambientGain = null;
        this.customAudio = null;

        // Progresión romántica de notas cálidas (Frecuencias en Hz estilo caja de música / piano suave)
        // Escala pentatónica y acordes románticos (Cmaj7, Am7, Fmaj7, G)
        this.melody = [
            // Acorde 1 (Cmaj7)
            { note: 261.63, dur: 1.2, delay: 0 },   // C4
            { note: 329.63, dur: 1.2, delay: 0.3 }, // E4
            { note: 392.00, dur: 1.4, delay: 0.6 }, // G4
            { note: 493.88, dur: 2.0, delay: 0.9 }, // B4
            { note: 523.25, dur: 2.5, delay: 1.4 }, // C5

            // Acorde 2 (Am7)
            { note: 220.00, dur: 1.2, delay: 2.4 }, // A3
            { note: 329.63, dur: 1.2, delay: 2.7 }, // E4
            { note: 392.00, dur: 1.4, delay: 3.0 }, // G4
            { note: 440.00, dur: 1.8, delay: 3.3 }, // A4
            { note: 659.25, dur: 2.5, delay: 3.8 }, // E5

            // Acorde 3 (Fmaj7)
            { note: 174.61, dur: 1.2, delay: 4.8 }, // F3
            { note: 261.63, dur: 1.2, delay: 5.1 }, // C4
            { note: 329.63, dur: 1.4, delay: 5.4 }, // E4
            { note: 440.00, dur: 1.8, delay: 5.7 }, // A4
            { note: 523.25, dur: 2.5, delay: 6.2 }, // C5

            // Acorde 4 (G6/sus)
            { note: 196.00, dur: 1.2, delay: 7.2 }, // G3
            { note: 293.66, dur: 1.2, delay: 7.5 }, // D4
            { note: 392.00, dur: 1.4, delay: 7.8 }, // G4
            { note: 493.88, dur: 1.8, delay: 8.1 }, // B4
            { note: 587.33, dur: 3.0, delay: 8.6 }  // D5
        ];
        this.loopDuration = 9600; // ms
    }

    init() {
        if (this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.ambientGain.connect(this.ctx.destination);
    }

    toggle() {
        if (!this.ctx) {
            this.init();
        }

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        if (this.isPlaying) {
            this.stop();
        } else {
            this.play();
        }
        return this.isPlaying;
    }

    play() {
        if (this.isPlaying) return;
        this.init();
        this.isPlaying = true;
        this.playMelodyLoop();
    }

    stop() {
        this.isPlaying = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    playMelodyLoop() {
        if (!this.isPlaying) return;

        const now = this.ctx.currentTime;
        this.melody.forEach(item => {
            this.playChimeNote(item.note, now + item.delay, item.dur);
        });

        this.timer = setTimeout(() => {
            if (this.isPlaying) {
                this.playMelodyLoop();
            }
        }, this.loopDuration);
    }

    playChimeNote(freq, startTime, duration = 1.5) {
        if (!this.ctx) return;

        try {
            // Oscilador 1: Onda sinusoidal pura suave
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            // Oscilador 2: Armónico cálido con ligero detune para efecto celeste
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);

            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(freq * 2, startTime);
            osc2.detune.setValueAtTime(4, startTime);

            // Envolvente de volumen (Attack suave y decay largo de campana)
            gain.gain.setValueAtTime(0.0001, startTime);
            gain.gain.exponentialRampToValueAtTime(0.14, startTime + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

            gain2.gain.setValueAtTime(0.0001, startTime);
            gain2.gain.exponentialRampToValueAtTime(0.03, startTime + 0.05);
            gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.6);

            osc.connect(gain);
            osc2.connect(gain2);

            gain.connect(this.ambientGain);
            gain2.connect(this.ambientGain);

            osc.start(startTime);
            osc2.start(startTime);

            osc.stop(startTime + duration);
            osc2.stop(startTime + duration);
        } catch (e) {
            console.error(e);
        }
    }

    // Efecto de sonido al interactuar o pasar por una flor
    playHoverChime() {
        if (!this.ctx || !this.isPlaying) return;
        const now = this.ctx.currentTime;
        const notes = [659.25, 783.99, 880.00, 1046.50];
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        this.playChimeNote(randomNote, now, 0.8);
    }

    // Efecto estelar al abrir carta
    playCardOpenSound() {
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const now = this.ctx.currentTime;
        const arpeggio = [523.25, 659.25, 783.99, 1046.50];
        arpeggio.forEach((freq, idx) => {
            this.playChimeNote(freq, now + idx * 0.09, 1.2);
        });
    }
}

window.romanticAudio = new RomanticAudioManager();
