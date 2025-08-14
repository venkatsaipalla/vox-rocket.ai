"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { id: 'listen', title: 'Listen', desc: 'Capture audio, detect intent, and map entities.' },
  { id: 'understand', title: 'Understand', desc: 'LLM + rules ensure compliant, accurate responses.' },
  { id: 'resolve', title: 'Resolve', desc: 'Execute actions, update systems, and provide solutions.' },
  { id: 'report', title: 'Report', desc: 'Log transcripts, summarize, and surface insights.' },
] as const;

export default function FeaturesStepper() {
  const [active, setActive] = useState<typeof steps[number]['id']>('listen');
  return (
    <section id="how-it-works" data-pin-walkthrough className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-3">
            {steps.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)} className={`w-full text-left px-4 py-3 rounded-md border ${active===s.id? 'border-[#6C63FF] bg-[rgba(108,99,255,0.07)]' : 'border-white/10 hover:border-white/20'} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]`}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{s.title}</span>
                  {active === s.id && <span className="inline-flex size-2 rounded-full bg-[#6C63FF] glow-purple" />}
                </div>
              </button>
            ))}
          </div>
          <div className="rounded-xl panel p-6 min-h-64">
            <AnimatePresence mode="wait">
              {steps.map((s) => (
                s.id === active && (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-2">
                    <h3 className="font-semibold text-xl">{s.title}</h3>
                    <p className="text-gray-300">{s.desc}</p>
                    <div className="mt-4 h-40 rounded-lg bg-black/30 border border-white/10" />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
