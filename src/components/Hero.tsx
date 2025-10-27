"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useGsapHero } from "@/hooks/useGsapHero";

export default function Hero() {
  const { titleRef, subRef, ctaRef, particlesRef } = useGsapHero();

  // Deterministic seeded PRNG (mulberry32) to avoid SSR/client mismatch
  function mulberry32(a: number) {
    return function () {
      let t = (a += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const particles = useMemo(() => {
    const seed = 123456;
    return Array.from({ length: 12 }).map((_, i) => {
      const rand = mulberry32(seed + i * 101);
      const left = `${(rand() * 100).toFixed(6)}%`;
      const top = `${(rand() * 100).toFixed(6)}%`;
      const bg = i % 2 ? 'rgba(108,99,255,0.4)' : 'rgba(56,189,248,0.4)';
      return { id: `p-${i}`, left, top, bg };
    });
  }, []);

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate pt-24 md:pt-32">
      {/* Background particles for subtle parallax/looping GSAP motion */}
      <div ref={particlesRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span key={p.id} data-particle className="absolute size-2 rounded-full" style={{ left: p.left, top: p.top, background: p.bg, filter: 'blur(1px)' }} />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left copy */}
        <div>
          <h1 ref={titleRef} id="hero-heading" className="font-extrabold leading-tight tracking-[-0.02em] text-balance text-4xl sm:text-5xl md:text-6xl [font-family:var(--font-poppins)]">
            Smarter&nbsp;customer&nbsp;conversations.
          </h1>
          <p ref={subRef} className="mt-4 text-lg md:text-xl text-gray-300 max-w-prose">
            A human-like voice agent that solves problems instantly — no waiting, no rigid menus, just answers.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="#get-started" className="px-5 py-3 rounded-md bg-[#6C63FF] hover:bg-[#5a53ff] text-white glow-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]">Get Started — Free Trial</motion.a>
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="#demo" className="px-5 py-3 rounded-md border border-white/20 text-white/90 hover:text-white hover:border-white/40">Watch Demo</motion.a>
          </div>

          {/* Benefit bullets */}
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-300">
            {[
              { id: 'benefit-wait', t: 'Eliminate wait times' },
              { id: 'benefit-human', t: 'Human-like interactions' },
              { id: 'benefit-transcripts', t: 'Full call transcripts' },
            ].map((b) => (
              <li key={b.id} data-reveal className="flex items-center gap-2">
                <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(56,189,248,0.15)] ring-1 ring-[rgba(56,189,248,0.35)]">
                  <svg viewBox="0 0 24 24" width="14" height="14" className="text-[#38BDF8]">
                    <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                {b.t}
              </li>
            ))}
          </ul>
        </div>

        {/* Right visual: audio-reactive waveform */}
        {/* <div className="relative">
          <WaveformReactive />
        </div> */}
      </div>
    </section>
  );
}
