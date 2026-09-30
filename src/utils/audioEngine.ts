/**
 * Audio Engine using Web Audio API for atmospheric cinema sounds (drones, heartbeat, rain, suspense chords)
 * and SpeechSynthesis for real Hindi/English dialogue vocalization.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private currentAmbianceNode: { stop: () => void } | null = null;
  private isSpeaking = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play procedural ambiance based on genre
  playAmbiance(type: 'thriller' | 'romance' | 'horror' | 'drama' = 'drama') {
    try {
      this.initCtx();
      this.stopAmbiance();
      if (!this.ctx) return;

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      masterGain.connect(this.ctx.destination);

      const oscillators: OscillatorNode[] = [];

      if (type === 'horror') {
        // Deep eerie drone + pulsing low freq
        const osc1 = this.ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, this.ctx.currentTime);

        osc1.connect(filter);
        filter.connect(masterGain);
        osc1.start();
        oscillators.push(osc1);
      } else if (type === 'thriller') {
        // Tense minor interval drone
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2
        osc2.frequency.setValueAtTime(77.78, this.ctx.currentTime); // Eb2 (minor 3rd)

        osc1.connect(masterGain);
        osc2.connect(masterGain);
        osc1.start();
        osc2.start();
        oscillators.push(osc1, osc2);
      } else if (type === 'romance') {
        // Soft warm lush sine chords
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3
        osc2.frequency.setValueAtTime(164.81, this.ctx.currentTime); // E3

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, this.ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);
        osc1.start();
        osc2.start();
        oscillators.push(osc1, osc2);
      } else {
        // Drama general
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, this.ctx.currentTime);
        osc.connect(masterGain);
        osc.start();
        oscillators.push(osc);
      }

      this.currentAmbianceNode = {
        stop: () => {
          oscillators.forEach(o => {
            try {
              o.stop();
              o.disconnect();
            } catch {
              // ignore
            }
          });
          masterGain.disconnect();
        }
      };
    } catch (err) {
      console.warn('Audio ambiance init err:', err);
    }
  }

  stopAmbiance() {
    if (this.currentAmbianceNode) {
      this.currentAmbianceNode.stop();
      this.currentAmbianceNode = null;
    }
  }

  // Play dialogue line with SpeechSynthesis
  speakDialogue(
    text: string,
    speed = 1.0,
    onEnd?: () => void
  ) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Math.max(0.7, Math.min(2.0, speed));
    utterance.pitch = 0.95; // slightly deeper cinema tone

    // Try finding Hindi or Indian English voice
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.includes('IN'));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.isSpeaking = true;
    window.speechSynthesis.speak(utterance);
  }

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  stopAll() {
    this.stopAmbiance();
    this.stopSpeech();
  }
}

export const audioEngine = new AudioEngine();
