/* Surya Games copy of src/lib/sfx.ts (plain JS): site-wide sci-fi sounds. */
(function(){
/**
 * Sci-fi sound effects, synthesised with the Web Audio API (no audio files).
 *
 * Sounds start only after the visitor's first tap, click or key press
 * (browsers block audio before that). Sound stays on; visitors set the volume
 * on their device. `setSfx` remains for code that needs to silence it.
 *
 * public/game/sfx.js is the same engine for the static game pages; keep the
 * two in step when changing a sound.
 */

const KEY = 'sos_sfx';
let ctx = null;
let master = null;
let verb = null;
let enabled = true;
const listeners = new Set();

/** Sound is always on; visitors use their device volume. */
function readPref() { enabled = true; }

function sfxOn() { return enabled; }
function onSfxChange(fn) { listeners.add(fn); return () => { listeners.delete(fn); }; }
function setSfx(on) {
  enabled = on;
  try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch { /* storage blocked: keep for this visit */ }
  listeners.forEach((l) => l(on));
  if (on) { unlock(); setTimeout(() => play.toggle(true), 30); }
}

function unlock() {
  if (typeof window === 'undefined') return;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 4;
    master = ctx.createGain(); master.gain.value = 0.55;
    master.connect(comp).connect(ctx.destination);
    // a short generated hall: noise with an exponential tail
    const len = Math.floor(ctx.sampleRate * 1.8), ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
    const conv = ctx.createConvolver(); conv.buffer = ir;
    verb = ctx.createGain(); verb.gain.value = 0.35;
    verb.connect(conv).connect(master);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
}

const ready = () => enabled && ctx && master && ctx.state === 'running';

/** one oscillator voice with an attack/decay envelope and an optional pitch glide */
function tone(type, f0, f1, dur, vol, opts = {}) {
  if (!ready()) return;
  const c = ctx, t = c.currentTime + (opts.delay ?? 0);
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (opts.attack ?? 0.008)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  let out = o;
  if (opts.filter) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = 6; f.frequency.setValueAtTime(opts.filter[0], t); f.frequency.exponentialRampToValueAtTime(opts.filter[1], t + dur); o.connect(f); out = f; }
  out.connect(g); g.connect(master);
  if (opts.wet && verb) { const s = c.createGain(); s.gain.value = opts.wet; g.connect(s).connect(verb); }
  o.start(t); o.stop(t + dur + 0.05);
}

/** filtered noise burst, swept: whooshes and energy hiss */
function noise(dur, vol, f0, f1, opts = {}) {
  if (!ready()) return;
  const c = ctx, t = c.currentTime + (opts.delay ?? 0);
  const len = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const s = c.createBufferSource(); s.buffer = buf;
  const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = opts.q ?? 1.4;
  f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
  const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.35); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f).connect(g).connect(master);
  if (opts.wet && verb) { const w = c.createGain(); w.gain.value = opts.wet; g.connect(w).connect(verb); }
  s.start(t); s.stop(t + dur + 0.05);
}

let lastHover = 0;
const play = {
  /** soft HUD tick when the pointer reaches something clickable */
  hover() { const n = performance.now(); if (n - lastHover < 70) return; lastHover = n; tone('triangle', 2200, 3100, 0.045, 0.025); },
  /** energy blip on click */
  click() { tone('sine', 520, 1560, 0.09, 0.11, { wet: 0.25 }); tone('square', 140, 90, 0.06, 0.03); },
  /** page change: a hero-landing whoosh with a low thud */
  whoosh() { noise(0.42, 0.12, 260, 3200, { wet: 0.4 }); tone('sine', 95, 42, 0.38, 0.14, { delay: 0.05 }); },
  /** charging power-up, ends on a bright chime */
  powerUp() {
    tone('sawtooth', 110, 440, 0.62, 0.05, { filter: [300, 4200], attack: 0.2 });
    tone('sine', 220, 880, 0.62, 0.05, { attack: 0.25 });
    tone('sine', 1318, 1318, 1.3, 0.06, { delay: 0.58, wet: 0.7 });
    tone('sine', 1976, 1976, 1.1, 0.035, { delay: 0.62, wet: 0.7 });
    noise(0.5, 0.05, 2000, 9000, { delay: 0.55, wet: 0.5, q: 0.8 });
  },
  /** a short charge for each step of a sequence (pitch rises with the step) */
  step(i) { const f = 330 * Math.pow(1.26, i); tone('sine', f, f * 1.5, 0.22, 0.07, { wet: 0.45 }); tone('triangle', f * 2, f * 3, 0.12, 0.02, { delay: 0.03 }); },
  /** success: rising triad with shimmer */
  success() { [523, 659, 784, 1046].forEach((f, i) => tone('sine', f, f, 0.5, 0.06, { delay: i * 0.07, wet: 0.6 })); },
  /** error: short low buzz */
  error() { tone('square', 150, 110, 0.18, 0.05, { filter: [900, 300] }); },
  toggle(on) { tone('sine', on ? 600 : 900, on ? 1200 : 450, 0.12, 0.08, { wet: 0.3 }); },
  /** ignition when the home story starts moving: low rumble rising into a bright shimmer */
  ignite() {
    tone('sawtooth', 55, 220, 1.1, 0.06, { filter: [180, 2400], attack: 0.35 });
    tone('sine', 82, 330, 1.1, 0.08, { attack: 0.3, wet: 0.4 });
    noise(1.0, 0.06, 300, 6000, { wet: 0.6, q: 0.7 });
    tone('sine', 1760, 1760, 1.4, 0.03, { delay: 0.9, wet: 0.8 });
  },
  /** a scroll gesture begins: an airy swoosh, higher going down the page, lower going up */
  swoosh(down) { noise(0.28, 0.045, down ? 600 : 2600, down ? 2600 : 600, { wet: 0.3, q: 1.8 }); },
  /** soft HUD tick while scrolling keeps going */
  scrollTick(speed) { const f = 900 + Math.min(1, speed) * 900; tone('triangle', f, f * 1.15, 0.03, 0.012 + Math.min(1, speed) * 0.012); },
  /** tap on an empty part of the page */
  tap() { tone('sine', 1300, 900, 0.05, 0.03, { wet: 0.2 }); },
};

const CLICKABLE = 'a[href], button, [role="button"], [role="tab"], [role="radio"], summary, input[type="checkbox"], input[type="radio"], select, label[for]';
let installed = false;

/** Hook sounds onto every link and button on the page, once. */
function installSfx() {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  readPref();
  const wake = () => unlock();
  window.addEventListener('pointerdown', wake, { capture: true, passive: true });
  window.addEventListener('keydown', wake, { capture: true });
  const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
  if (fine) {
    document.addEventListener('pointerover', (e) => {
      const el = e.target?.closest?.(CLICKABLE);
      if (!el || el.contains(e.relatedTarget)) return;
      if (el.dataset.sfx === 'off') return;
      play.hover();
    }, { passive: true });
  }
  // taps on empty space get a soft blip (links and buttons get the click sound below)
  document.addEventListener('pointerdown', (e) => {
    const t = e.target;
    if (t?.closest?.(CLICKABLE) || t?.closest?.('input, textarea, canvas, [data-sfx="off"]')) return;
    if (ctx?.state !== 'running') setTimeout(() => play.tap(), 40); else play.tap();
  }, { capture: true, passive: true });
  // scrolling: a swoosh when a scroll starts, then light ticks while it continues
  let lastY = window.scrollY, lastT = 0, idleTimer = 0, moving = false, lastTick = 0;
  window.addEventListener('scroll', () => {
    const now = performance.now(), y = window.scrollY, dy = y - lastY, dt = Math.max(16, now - lastT);
    lastY = y; lastT = now;
    if (!moving) { moving = true; play.swoosh(dy >= 0); }
    else if (now - lastTick > 160) { lastTick = now; play.scrollTick(Math.abs(dy) / dt / 3); }
    clearTimeout(idleTimer); idleTimer = window.setTimeout(() => { moving = false; }, 380);
  }, { passive: true });
  document.addEventListener('click', (e) => {
    const el = e.target?.closest?.(CLICKABLE);
    if (!el || el.dataset.sfx === 'off') return;
    // the first click also wakes the audio; give it a moment to start
    if (ctx?.state !== 'running') setTimeout(() => play.click(), 40); else play.click();
  }, { capture: true, passive: true });
}

window.SosSfx = { play, setSfx, sfxOn, onSfxChange };
installSfx();
})();
