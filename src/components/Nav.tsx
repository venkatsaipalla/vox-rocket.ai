"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/20 border-b border-white/10">
      <nav aria-label="Primary" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" aria-current="page" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] rounded-md">
          {/* SVG Logo: mic rocket */}
          <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(108,99,255,0.2)] ring-1 ring-[rgba(108,99,255,0.4)] glow-purple">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#6C63FF]">
              <path d="M12 2v10a3 3 0 1 1-6 0V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 10v2a8 8 0 1 1-16 0v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 2l3 3M12 2l-3 3" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="font-extrabold tracking-tight text-white">VoxRocket.ai</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {['Product','Features','Pricing','Use Cases','Resources','Contact'].map((label) => (
            <a key={label} href={`#${label.toLowerCase().replace(/ /g,'-')}`} className="hover:text-white focus-visible:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] rounded-md px-1 py-1">
              {label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#demo" className="px-4 py-2 rounded-md border border-white/20 text-white/90 hover:text-white hover:border-white/40 transition-colors">Request Demo</a>
          <a href="#get-started" className="px-4 py-2 rounded-md bg-[#6C63FF] hover:bg-[#5a53ff] text-white glow-purple transition-colors">Get Started</a>
        </div>

        {/* Mobile menu button */}
        <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/10 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]">
          <motion.span
            initial={false}
            animate={{ rotate: open ? 45 : 0 }}
            className="block w-5 h-0.5 bg-white"
          />
          <motion.span
            initial={false}
            animate={{ opacity: open ? 0 : 1 }}
            className="block w-5 h-0.5 bg-white ml-1"
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden bg-black/60 backdrop-blur border-t border-white/10"
          >
            <div className="px-6 py-6 space-y-4">
              {['Product','Features','Pricing','Use Cases','Resources','Contact'].map((label) => (
                <a key={label} href={`#${label.toLowerCase().replace(/ /g,'-')}`} className="block text-white/90 hover:text-white text-base">
                  {label}
                </a>
              ))}
              <div className="pt-4 flex gap-3">
                <a href="#demo" className="flex-1 px-4 py-2 rounded-md border border-white/20 text-white/90 hover:text-white text-center">Request Demo</a>
                <a href="#get-started" className="flex-1 px-4 py-2 rounded-md bg-[#6C63FF] hover:bg-[#5a53ff] text-white text-center">Get Started</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
