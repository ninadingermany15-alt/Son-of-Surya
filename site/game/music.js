/*
 * Surya Games music: original background tracks generated live with Web Audio
 * (no audio files, nothing licensed). Each page picks a theme with
 * <body data-music="hub|mission|yoddha|quiz|gadget|build">. Music starts on the
 * first tap, click or key press (browsers block sound before that), loops
 * forever, pauses when the tab is hidden and fades back in when it returns.
 * window.SosMusic.duck(seconds) lowers it briefly (for voice lines).
 */
(function () {
  var THEMES = {
    // hub: heroic synthwave, D minor, i–VI–III–VII
    hub:     { bpm: 104, root: 50, mode: [0,2,3,5,7,8,10], prog: [0,5,2,6], kick: 'x...x...x...x...', snare: '....x.......x...', hat: '..x...x...x...x.', tom: '', arp: [0,2,4,7,4,2,0,4], arpOct: 2, lead: true,  padCut: 1400, vol: 0.20 },
    // Surya Mission: adventurous, E dorian, driving eighths
    mission: { bpm: 116, root: 52, mode: [0,2,3,5,7,9,10], prog: [0,3,6,4], kick: 'x.....x.x.......', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.', tom: '', arp: [0,4,2,4,7,4,2,4], arpOct: 2, lead: true,  padCut: 1700, vol: 0.18 },
    // Yoddha 3D: warrior drums, C minor, taiko-style toms
    yoddha:  { bpm: 128, root: 48, mode: [0,2,3,5,7,8,10], prog: [0,0,5,6], kick: 'x..x..x...x..x..', snare: '....x.......x..x', hat: '..x...x...x...x.', tom: 'x...x..x..x.x...', arp: [0,7,4,7,0,7,5,7], arpOct: 1, lead: true,  padCut: 1100, vol: 0.20 },
    // Solar Hero Quiz: suspense under the host's voice, A minor, ticking clock
    quiz:    { bpm: 92,  root: 45, mode: [0,2,3,5,7,8,11], prog: [0,5,3,4], kick: 'x.......x.......', snare: '', hat: 'x.x.x.x.x.x.x.x.', tom: '', arp: [0,7,0,7,0,7,0,7], arpOct: 1, lead: false, padCut: 900,  vol: 0.13 },
    // Gadget Guru: playful bounce, F major
    gadget:  { bpm: 120, root: 53, mode: [0,2,4,5,7,9,11], prog: [0,4,5,3], kick: 'x...x...x...x...', snare: '....x.......x...', hat: '.xx..xx..xx..xx.', tom: '', arp: [0,4,7,9,7,4,2,4], arpOct: 2, lead: true,  padCut: 2200, vol: 0.17 },
    // Abhi Thik Karke Deta Hu (build): calm workshop groove, G lydian
    build:   { bpm: 96,  root: 55, mode: [0,2,4,6,7,9,11], prog: [0,1,4,5], kick: 'x.......x..x....', snare: '....x.......x...', hat: '..x...x...x...x.', tom: '', arp: [0,2,4,6,4,2,0,2], arpOct: 2, lead: false, padCut: 1600, vol: 0.16 }
  };
  var name = (document.body && document.body.dataset.music) || 'hub';
  var T = THEMES[name] || THEMES.hub;
  var ctx = null, out = null, verb = null, timer = 0, step = 0, nextT = 0, started = false, target = T.vol;
  var mtof = function (m) { return 440 * Math.pow(2, (m - 69) / 12); };
  var deg = function (d, oct) { var n = T.mode.length, o = Math.floor(d / n); return T.root + 12 * ((oct || 0) + o) + T.mode[((d % n) + n) % n]; };
  // a seeded melody so each theme always plays the same tune
  var seed = 0; for (var i = 0; i < name.length; i++) seed = (seed * 31 + name.charCodeAt(i)) >>> 0;
  var rnd = function () { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  var melody = []; var pos = 4;
  for (var b = 0; b < 4; b++) for (var s = 0; s < 8; s++) {
    pos += [-2, -1, -1, 0, 1, 1, 2][Math.floor(rnd() * 7)]; pos = Math.max(0, Math.min(9, pos));
    melody.push(rnd() < 0.72 ? pos : null);
  }

  function setup() {
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
    ctx = new AC();
    var comp = ctx.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 3;
    out = ctx.createGain(); out.gain.value = 0.0001; out.connect(comp).connect(ctx.destination);
    var len = Math.floor(ctx.sampleRate * 2.4), ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var c = 0; c < 2; c++) { var d = ir.getChannelData(c); for (var k = 0; k < len; k++) d[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / len, 2.8); }
    var conv = ctx.createConvolver(); conv.buffer = ir; verb = ctx.createGain(); verb.gain.value = 0.32; verb.connect(conv).connect(out);
    return true;
  }
  function env(g, t, a, peak, d) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); }
  function voice(type, f, t, a, peak, d, cut, wet, detune) {
    var o = ctx.createOscillator(), g = ctx.createGain(), fl = ctx.createBiquadFilter();
    o.type = type; o.frequency.value = f; if (detune) o.detune.value = detune;
    fl.type = 'lowpass'; fl.frequency.value = cut; o.connect(fl).connect(g); g.connect(out);
    if (wet) { var w = ctx.createGain(); w.gain.value = wet; g.connect(w).connect(verb); }
    env(g, t, a, peak, d); o.start(t); o.stop(t + a + d + 0.05);
  }
  function noiseHit(t, peak, d, f, q, type) {
    var n = Math.floor(ctx.sampleRate * d), buf = ctx.createBuffer(1, n, ctx.sampleRate), x = buf.getChannelData(0);
    for (var k = 0; k < n; k++) x[k] = Math.random() * 2 - 1;
    var src = ctx.createBufferSource(); src.buffer = buf; var fl = ctx.createBiquadFilter(); fl.type = type || 'highpass'; fl.frequency.value = f; fl.Q.value = q || 0.7;
    var g = ctx.createGain(); src.connect(fl).connect(g); g.connect(out); env(g, t, 0.002, peak, d); src.start(t); src.stop(t + d + 0.02);
  }
  function kick(t) { var o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.18); o.connect(g).connect(out); env(g, t, 0.003, 0.9, 0.28); o.start(t); o.stop(t + 0.32); }
  function tom(t, f) { var o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 0.55, t + 0.3); o.connect(g).connect(out); var w = ctx.createGain(); w.gain.value = 0.4; g.connect(w).connect(verb); env(g, t, 0.004, 0.55, 0.38); o.start(t); o.stop(t + 0.42); }

  function schedule(i, t) {
    var s16 = 60 / T.bpm / 4, bar = Math.floor(i / 16) % T.prog.length, st = i % 16, chord = T.prog[bar];
    if (st === 0) {
      [0, 2, 4].forEach(function (x, j) { voice('sawtooth', mtof(deg(chord + x, 0)), t, 0.6, 0.035, s16 * 16 - 0.4, T.padCut, 0.5, j * 7 - 7); voice('sawtooth', mtof(deg(chord + x, 0)), t, 0.6, 0.03, s16 * 16 - 0.4, T.padCut, 0.5, 9); });
    }
    if (st % 4 === 0 || (name === 'mission' && st % 2 === 0)) voice('triangle', mtof(deg(chord, -1)), t, 0.01, 0.22, s16 * (name === 'quiz' ? 1.6 : 3), 700, 0, 0);
    if (T.kick[st] === 'x') kick(t);
    if (T.snare[st] === 'x') { noiseHit(t, 0.28, 0.16, 1800, 0.8); voice('triangle', 190, t, 0.002, 0.12, 0.09, 1200, 0.3); }
    if (T.hat[st] === 'x') noiseHit(t, name === 'quiz' ? 0.12 : 0.07, 0.04, 8000, 0.7);
    if (T.tom[st] === 'x') tom(t, st % 8 === 0 ? 110 : 82);
    if (st % 2 === 0) { var a = T.arp[(st / 2) % T.arp.length]; voice(name === 'gadget' ? 'square' : 'triangle', mtof(deg(chord + a, T.arpOct)), t, 0.005, name === 'quiz' ? 0.03 : 0.045, s16 * 1.6, 2600, 0.35, 0); }
    if (T.lead && st % 2 === 0) {
      var m = melody[(Math.floor(i / 2)) % melody.length];
      if (m !== null && (bar % 2 === 1 || rnd() < 0.5)) voice('sawtooth', mtof(deg(chord + m, 1)), t, 0.02, 0.035, s16 * 1.8, 2000, 0.55, 0);
    }
  }
  function tick() {
    var s16 = 60 / T.bpm / 4;
    while (nextT < ctx.currentTime + 0.15) { schedule(step, nextT); nextT += s16; step++; }
  }
  function fade(to, sec) { if (!ctx) return; var t = ctx.currentTime; out.gain.cancelScheduledValues(t); out.gain.setValueAtTime(Math.max(0.0001, out.gain.value), t); out.gain.exponentialRampToValueAtTime(Math.max(0.0001, to), t + sec); }
  function start() {
    if (started) { if (ctx.state === 'suspended') ctx.resume(); return; }
    if (!setup()) return;
    started = true; ctx.resume(); nextT = ctx.currentTime + 0.1; timer = setInterval(tick, 25); fade(target, 2.5);
  }
  ['pointerdown', 'keydown', 'touchend'].forEach(function (ev) { window.addEventListener(ev, start, { capture: true, passive: true }); });
  document.addEventListener('visibilitychange', function () {
    if (!ctx) return;
    if (document.hidden) { fade(0.0001, 0.4); setTimeout(function () { if (document.hidden) ctx.suspend(); }, 450); }
    else { ctx.resume(); fade(target, 1.2); }
  });
  window.SosMusic = {
    theme: name,
    duck: function (sec) { if (!ctx) return; fade(target * 0.35, 0.2); setTimeout(function () { fade(target, 0.8); }, (sec || 3) * 1000); }
  };
})();
