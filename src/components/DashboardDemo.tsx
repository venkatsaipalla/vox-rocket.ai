"use client";
import { motion } from "framer-motion";

export default function DashboardDemo() {
  return (
    <section id="dashboard" aria-labelledby="dashboard-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div data-reveal>
          <h2 id="dashboard-title" className="text-3xl md:text-4xl font-bold">Control Hub & Dashboard</h2>
          <p className="mt-3 text-gray-300 max-w-prose">Simulated call player with waveform and transcript. Click timestamps to scrub and see CMS changes apply instantly.</p>

          <div className="mt-6 rounded-xl panel p-4 space-y-3">
            <div className="h-32 rounded-lg bg-black/30 border border-white/10" />
            <div className="grid grid-cols-3 gap-3">
              {[0,1,2].map((n) => (
                <motion.button key={`t-${n}`} whileHover={{ scale: 1.02 }} className="px-3 py-2 rounded-md border border-white/10 text-sm text-gray-300">00:{(n+1)*10}s</motion.button>
              ))}
            </div>
          </div>
        </div>
        <div data-reveal>
          <div className="rounded-xl panel p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">CMS Responses</h3>
              <span className="text-xs text-gray-400">Auto-saves</span>
            </div>
            <div className="mt-4 space-y-3">
              {["Greeting","Shipping policy","Refund policy"].map((row) => (
                <div key={row} className="rounded-lg bg-black/30 border border-white/10 p-3">
                  <div className="text-sm font-medium">{row}</div>
                  <div className="text-xs text-gray-400">Edit to update voice behavior</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
