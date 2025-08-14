"use client";
import { motion } from "framer-motion";

export default function Problem() {
  const cards = [
    { id: 'ivr', title: 'Frustrating IVRs', desc: 'Customers get lost in endless menus.' },
    { id: 'wait', title: 'Long wait times', desc: 'Hours on hold damages your brand.' },
    { id: 'human', title: 'Human error', desc: 'One human = one call. Not scalable.' },
  ];
  return (
    <section id="product" aria-labelledby="problem-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="problem-title" className="text-3xl md:text-4xl font-bold">Customer support is broken.</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, idx) => (
            <motion.article
              key={c.id}
              whileHover={{ y: -6 }}
              className="panel rounded-xl p-6 border border-white/10"
              data-reveal
            >
              <div className="flex items-center gap-3">
                <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[rgba(108,99,255,0.15)] ring-1 ring-[rgba(108,99,255,0.35)]">
                  <svg viewBox="0 0 24 24" width="16" height="16" className="text-[#6C63FF]">
                    <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.3"/>
                    <path d="M8 12h8" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <h3 className="font-semibold text-lg">{c.title}</h3>
              </div>
              <p className="mt-3 text-gray-300">{c.desc}</p>
              {/* Metric placeholder */}
              {idx === 1 && (
                <div className="mt-4 text-sm text-gray-400" aria-live="polite">
                  <span aria-label="Minutes saved counter">Minutes saved: <span data-counter>120</span>+</span>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
