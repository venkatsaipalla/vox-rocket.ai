"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  { id: 'individual', name: 'Individual', priceM: 0, priceY: 0, features: ['500 minutes', 'Basic analytics', 'Email support'] },
  { id: 'corporate', name: 'Corporate', priceM: 0, priceY: 0, features: ['5,000 minutes', 'Advanced analytics', 'Priority support'] },
  { id: 'enterprise', name: 'Enterprise', priceM: 0, priceY: 0, features: ['Unlimited minutes', 'Custom integrations', 'SLA + SSO'] },
] as const;

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold">Pricing</h2>
          <button
            role="switch"
            aria-checked={yearly}
            onClick={() => setYearly((v) => !v)}
            className="relative inline-flex items-center gap-2 px-2 py-1 rounded-full bg-black/30 border border-white/10"
          >
            <span className={`text-xs ${!yearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <span className="relative inline-flex w-12 h-6 rounded-full bg-white/10">
              <motion.span
                layout
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[#6C63FF]"
                animate={{ x: yearly ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </span>
            <span className={`text-xs ${yearly ? 'text-white' : 'text-gray-400'}`}>Yearly</span>
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => {
            // const price = p.id === 'enterprise'  ? 'Contact us' : `$${yearly ? p.priceY : p.priceM}`;
            const price ='Contact us'
            // const suffix = p.id === 'enterprise' ? '' : `/${yearly ? 'mo (billed yearly)' : 'mo'}`;
            const suffix = ''
            return (
              <motion.article key={p.id} whileHover={{ y: -6 }} className={`panel rounded-xl p-6 border ${p.id==='corporate' ? 'border-[#6C63FF]' : 'border-white/10'}`} data-reveal>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  {p.id==='corporate' && <span className="text-xs text-[#6C63FF]">Popular</span>}
                </div>
                <div className="mt-4 text-3xl font-bold">{price}<span className="ml-1 text-sm text-gray-400">{suffix}</span></div>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span aria-hidden className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[rgba(56,189,248,0.15)] ring-1 ring-[rgba(56,189,248,0.35)]">
                        <svg viewBox="0 0 24 24" width="10" height="10" className="text-[#38BDF8]"><path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a href="#get-started" className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-md ${p.id==='corporate' ? 'bg-[#6C63FF] text-white glow-purple' : 'border border-white/20 text-white/90 hover:text-white hover:border-white/40'}`}>{p.id==='enterprise' ? 'Talk to Sales' : 'Start Free Trial'}</a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
