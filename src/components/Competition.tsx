"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Competitor = { id: string; name: string; ours?: boolean };

const features = [
  { id: 'f1', label: 'Understands natural speech' },
  { id: 'f2', label: 'Instant resolutions' },
  { id: 'f3', label: 'CMS-driven answers' },
  { id: 'f4', label: 'Detailed transcripts' },
  { id: 'f5', label: 'Enterprise security' },
  { id: 'f6', label: 'Concurrency' },

] as const;

const competitors: Competitor[] = [
  { id: 'vox', name: 'VoxRocket', ours: true },
  { id: 'compA', name: 'Legacy IVR' },
  { id: 'compB', name: 'Call Center BPO' },
  { id: 'compC', name: 'Chatbot Vendor' },
];

export default function Competition() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const rows = ref.current!.querySelectorAll('[data-row]');
      gsap.fromTo(rows, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: ref.current!, start: 'top 85%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="comparison" aria-labelledby="comparison-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="comparison-title" className="text-3xl md:text-4xl font-bold">Why VoxRocket</h2>
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[720px] rounded-xl panel p-4 border border-white/10">
            <div className="grid grid-cols-[1.2fr_repeat(4,1fr)] gap-2 text-sm text-gray-300">
              <div></div>
              {competitors.map((c) => (
                <div key={c.id} className={`text-center ${c.ours ? 'text-white' : ''}`}>{c.name}</div>
              ))}
            </div>
            <div ref={ref} className="mt-3 space-y-2">
              {features.map((f) => (
                <div key={f.id} data-row className="grid grid-cols-[1.2fr_repeat(4,1fr)] gap-2 items-center">
                  <div className="py-2 text-white">{f.label}</div>
                  {competitors.map((c) => {
                    // Define which features each competitor has
                    const hasFeature = c.ours || (
                      (c.id === 'compA' && (f.id === 'f4' || f.id === 'f5' || f.id === 'f6')) || // Legacy IVR: f4, f5, f6
                      (c.id === 'compB' && (f.id === 'f1' || f.id === 'f4')) || // Call Center BPO: f1, f4
                      (c.id === 'compC' && (f.id === 'f1' || f.id === 'f4' || f.id === 'f6')) // Chatbot Vendor: f1, f4, f6
                    );
                    
                    return (
                      <div key={`${f.id}-${c.id}`} className="py-2 text-center">
                        {hasFeature ? (
                          <span aria-label="yes" className="inline-flex items-center gap-1 text-[#6C63FF]">
                            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 12l4 4L19 6" fill="none" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round"/></svg>
                            <span className="text-white">Yes</span>
                          </span>
                        ) : (
                          <span aria-label="no" className="inline-flex items-center gap-1 text-gray-400">
                            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M6 6l12 12M18 6l-12 12" fill="none" stroke="#FF5DA2" strokeWidth="2" strokeLinecap="round"/></svg>
                            <span className="text-gray-400">No</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
