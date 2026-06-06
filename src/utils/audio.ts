/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class CinematicSoundEngine {
  private ctx: AudioContext | null = null;
  private primaryGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private noiseGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private droneOscLeft: OscillatorNode | null = null;
  private droneOscRight: OscillatorNode | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;

  constructor() {
    // Lazy loaded context to bypass strict autoplay guidelines
  }

  public init() {
    if (this.isInitialized) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      
      // Main Master Gain Node
      this.primaryGain = this.ctx.createGain();
      this.primaryGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      this.primaryGain.connect(this.ctx.destination);

      // Low Pass filter for deep warm heavy response
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(90, this.ctx.currentTime); // Deep hum
      this.filter.Q.setValueAtTime(2.5, this.ctx.currentTime); // Warm resonance
      this.filter.connect(this.primaryGain);

      // Left Channel Drone (55Hz - Ground A)
      this.droneOscLeft = this.ctx.createOscillator();
      this.droneOscLeft.type = 'triangle'; // Richer in harmonics than pure sine
      this.droneOscLeft.frequency.setValueAtTime(55, this.ctx.currentTime);
      
      // Right Channel Drone (55.4Hz - slightly detuned for deep luxury stereo width)
      this.droneOscRight = this.ctx.createOscillator();
      this.droneOscRight.type = 'sine';
      this.droneOscRight.frequency.setValueAtTime(55.4, this.ctx.currentTime);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      // Connect drone source to filtering
      this.droneOscLeft.connect(this.droneGain);
      this.droneOscRight.connect(this.droneGain);
      this.droneGain.connect(this.filter);

      // White/Pink noise emulation swell to sound like physical wind/depth velocity changes
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

      // Soft high pass on noise for cold wind visual atmosphere
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1.0, this.ctx.currentTime);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(this.primaryGain); // Direct to master to avoid lowpass cutting it

      // Start all sound loops
      this.droneOscLeft.start(0);
      this.droneOscRight.start(0);
      noiseSource.start(0);

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio compilation failed or window permission blocked:', e);
    }
  }

  public toggleMute(): boolean {
    if (!this.isInitialized) {
      this.init();
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.primaryGain && this.ctx) {
      this.isMuted = !this.isMuted;
      // Smooth fade in or out to prevent pops
      const targetGain = this.isMuted ? 0.0 : 0.65;
      this.primaryGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.45);
    }
    return this.isMuted;
  }

  public updateVelocity(velocity: number) {
    if (this.isMuted || !this.isInitialized || !this.ctx || !this.filter || !this.noiseGain || !this.droneGain) {
      return;
    }

    const t = this.ctx.currentTime;
    // Map velocity to high swells (absolute values)
    const normalizedVel = Math.min(Math.abs(velocity) / 60, 1.0);

    // Dynamic Filter sweep with exponential ramps for modern high-budget film look (90Hz to 280Hz)
    const targetFreq = 90 + normalizedVel * 190;
    this.filter.frequency.setTargetAtTime(targetFreq, t, 0.15);

    // Wind swell based on speed level
    const targetNoiseGain = 0.015 + normalizedVel * 0.075;
    this.noiseGain.gain.setTargetAtTime(targetNoiseGain, t, 0.2);

    // Deep heavy drone swell
    const targetDroneGain = 0.18 + normalizedVel * 0.12;
    this.droneGain.gain.setTargetAtTime(targetDroneGain, t, 0.25);
  }

  public getMutedStatus(): boolean {
    return this.isMuted;
  }
}

export const cinematicAudio = new CinematicSoundEngine();
