"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export default function WaveformReactive() {
  // Refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const mirrorPathRef = useRef<SVGPathElement | null>(null);
  const barsGroupRef = useRef<SVGGElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<OscillatorNode | MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const freqArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<"wave" | "bars">("wave");

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Seeded sparkles to avoid SSR mismatch
  const sparkles = useMemo(() => {
    function mulberry32(a: number) { return function () { let t = (a += 0x6D2B79F5); t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
    const rand = mulberry32(1337);
    return Array.from({ length: 16 }).map((_, i) => ({ id: `s-${i}`, left: `${(rand()*100).toFixed(4)}%`, top: `${(rand()*100).toFixed(4)}%`, c: i % 2 ? 'rgba(108,99,255,0.45)' : 'rgba(56,189,248,0.45)' }));
  }, []);

  const stopAudio = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (srcRef.current && 'stop' in srcRef.current) { try { (srcRef.current as OscillatorNode).stop(); } catch {} }
    srcRef.current = null;
    if (ctxRef.current) { try { ctxRef.current.suspend(); } catch {} }
  }, []);

  useEffect(() => () => stopAudio(), [stopAudio]);

  // Parallax tilt
  useEffect(() => {
    if (!containerRef.current || prefersReduced) return;
    const el = containerRef.current;
    const setRX = gsap.quickTo(el, 'rotateX', { duration: 0.4, ease: 'power3.out' });
    const setRY = gsap.quickTo(el, 'rotateY', { duration: 0.4, ease: 'power3.out' });
    const setTZ = gsap.quickTo(el, 'translateZ', { duration: 0.6, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setRX(py * -10);
      setRY(px * 12);
      setTZ(20);
    };
    const onLeave = () => { setRX(0); setRY(0); setTZ(0); };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); };
  }, [prefersReduced]);

  // Drawing
  const draw = useCallback(() => {
    const analyser = analyserRef.current;
    const path = pathRef.current;
    const mirror = mirrorPathRef.current;
    const svg = svgRef.current;
    const barsG = barsGroupRef.current;
    const orb = orbRef.current;
    const freq = freqArrayRef.current;
    if (!analyser || !path || !svg || !orb) return;

    const width = svg.viewBox.baseVal.width || svg.clientWidth || 300;
    const height = svg.viewBox.baseVal.height || svg.clientHeight || 150;

    const bufferLength = 256;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      analyser.getByteTimeDomainData(dataArray);
      let d = "";
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const x = (i / (bufferLength - 1)) * width;
        const v = dataArray[i] / 128.0 - 1.0;
        sum += v * v;
        const y = height / 2 + v * (height * 0.35);
        d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
      }
      path.setAttribute("d", d);
      if (mirror) mirror.setAttribute("d", d);

      const rms = Math.sqrt(sum / bufferLength); // 0..~1
      const amp = Math.min(1, rms * 2.2);

      // Orb pulse and glow based on amplitude
      gsap.to(orb, { scale: 1 + amp * 0.25, boxShadow: `0 0 ${20 + amp * 40}px rgba(108,99,255,0.55), 0 0 ${10 + amp * 30}px rgba(56,189,248,0.35)`, duration: 0.15, ease: 'linear' });
      gsap.to(path, { strokeWidth: 3 + amp * 2, duration: 0.15, ease: 'linear' });
      if (mirror) gsap.to(mirror, { opacity: 0.35 + amp * 0.35, duration: 0.15, ease: 'linear' });

      // Bars visualization
      if (barsG && freq) {
        analyser.getByteFrequencyData(freq);
        const childCount = barsG.children.length;
        for (let i = 0; i < childCount; i++) {
          const rect = barsG.children[i] as SVGRectElement;
          const idx = Math.floor((i / childCount) * freq.length);
          const val = freq[idx] / 255; // 0..1
          const h = Math.max(4, val * height * 0.8);
          const y = height - h - 6;
          rect.setAttribute('y', String(y));
          rect.setAttribute('height', String(h));
          rect.setAttribute('opacity', String(0.25 + val * 0.75));
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
  }, []);

  function getAudioContextCtor(): (new (contextOptions?: AudioContextOptions) => AudioContext) | null {
    const g = globalThis as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
    return g.AudioContext ?? g.webkitAudioContext ?? null;
  }

  const play = useCallback(async () => {
    if (prefersReduced) {
      if (pathRef.current && mirrorPathRef.current) {
        const len = pathRef.current.getTotalLength?.() || 600;
        gsap.set([pathRef.current, mirrorPathRef.current], { strokeDasharray: len, strokeDashoffset: len });
        gsap.to([pathRef.current, mirrorPathRef.current], { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", repeat: -1, yoyo: true });
      }
      setPlaying(true);
      return;
    }

    if (!ctxRef.current) {
      const Ctor = getAudioContextCtor();
      if (!Ctor) return;
      ctxRef.current = new Ctor();
    }
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') await ctx.resume();

    // Demo oscillator (replace with real audio source when available)
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 220;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;

    oscillator.connect(gain).connect(analyser).connect(ctx.destination);
    oscillator.start();

    srcRef.current = oscillator;
    analyserRef.current = analyser;
    const freqBuf: ArrayBuffer = new ArrayBuffer(analyser.frequencyBinCount);
    freqArrayRef.current = new Uint8Array<ArrayBuffer>(freqBuf);

    draw();
    setPlaying(true);
  }, [draw, prefersReduced]);

  const pause = useCallback(() => {
    gsap.killTweensOf(pathRef.current);
    gsap.killTweensOf(mirrorPathRef.current);
    stopAudio();
    setPlaying(false);
  }, [stopAudio]);

  // Build bars once in SVG width space
  const bars = useMemo(() => {
    const count = 36;
    const pad = 8;
    const w = (300 - pad * 2) / count; // viewBox width is 300
    function mulberry32(a: number) { return function () { let t = (a += 0x6D2B79F5); t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
    const rand = mulberry32(2026);
    return Array.from({ length: count }).map((_, i) => {
      const id = `b-${Math.floor(rand()*1e9).toString(36)}`;
      const x = pad + i * w;
      const width = Math.max(2, w * 0.6);
      return <rect key={id} x={x} y={120} width={width} height={24} rx={2} ry={2} fill="url(#wf)" opacity={0.3} />
    });
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-[1/1] max-w-md mx-auto rounded-2xl panel p-6 flex items-center justify-center will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
      {/* Subtle neon grid background */}
      <div aria-hidden className="absolute inset-0 rounded-2xl" style={{ backgroundImage: 'radial-gradient(1200px 600px at 20% 10%, rgba(108,99,255,0.12), transparent), radial-gradient(900px 500px at 80% 90%, rgba(56,189,248,0.10), transparent), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 22px), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 22px)' }} />

      {/* Seeded sparkles */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {sparkles.map(s => (
          <span key={s.id} className="absolute size-1.5 rounded-full" style={{ left: s.left, top: s.top, background: s.c, filter: 'blur(0.5px)' }} />
        ))}
      </div>

      {/* Pulsing orb */}
      <div ref={orbRef} aria-hidden className="absolute size-20 rounded-full" style={{ background: 'radial-gradient(circle at 50% 45%, rgba(108,99,255,0.9), rgba(56,189,248,0.6))', filter: 'blur(10px)', opacity: 0.9, transform: 'translateZ(40px)' }} />

      <svg ref={svgRef} viewBox="0 0 300 150" className="w-full h-full relative" style={{ transform: 'translateZ(10px)' }}>
        <defs>
          <linearGradient id="wf" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6C63FF"/>
            <stop offset="100%" stopColor="#38BDF8"/>
          </linearGradient>
          <linearGradient id="wfSoft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(108,99,255,0.55)"/>
            <stop offset="100%" stopColor="rgba(56,189,248,0.55)"/>
          </linearGradient>
        </defs>
        {/* Bars layer */}
        <g ref={barsGroupRef} style={{ display: mode === 'bars' ? 'block' : 'none' }}>
          {bars}
        </g>
        {/* Wave + mirror glow */}
        <path ref={mirrorPathRef} d="M 0 75 L 300 75" stroke="url(#wfSoft)" strokeWidth="9" opacity="0.35" fill="none" style={{ filter: 'blur(8px)' }} />
        <path ref={pathRef} d="M 0 75 L 300 75" stroke="url(#wf)" strokeWidth="3" fill="none" />
      </svg>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2" style={{ transform: 'translateZ(50px)' }}>
        <div className="inline-flex items-center rounded-full bg-black/30 border border-white/10 overflow-hidden">
          <button aria-label="Wave mode" onClick={() => setMode('wave')} className={`px-3 py-1 text-xs ${mode==='wave' ? 'text-white bg-white/10' : 'text-gray-300'}`}>Wave</button>
          <button aria-label="Bars mode" onClick={() => setMode('bars')} className={`px-3 py-1 text-xs ${mode==='bars' ? 'text-white bg-white/10' : 'text-gray-300'}`}>Bars</button>
        </div>
      </div>

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={playing ? pause : play} aria-pressed={playing} className="absolute bottom-4 right-4 px-4 py-2 rounded-md bg-[#FF5DA2] hover:bg-[#ff4796] text-white glow-neon" style={{ transform: 'translateZ(60px)' }}>
        {playing ? 'Pause' : 'Play'}
      </motion.button>
    </div>
  );
}
