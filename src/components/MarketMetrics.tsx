"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MarketMetrics() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function handleEnter(self: ScrollTrigger) {
      const el = self.trigger as HTMLElement;
      const to = Number(el.dataset.countTo || 0);
      const index = Number(el.dataset.index || 0);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: to,
        duration: 1.2,
        ease: 'power3.out',
        onUpdate: () => { el.textContent = Intl.NumberFormat().format(Math.floor(obj.val)); },
        delay: 0.05 * (index % 3)
      });
    }

    const ctx = gsap.context(() => {
      const counters = Array.from(ref.current!.querySelectorAll<HTMLElement>('[data-count-to]'));
      counters.forEach((el, i) => {
        el.dataset.index = String(i);
        ScrollTrigger.create({ trigger: el, start: 'top 85%', onEnter: handleEnter });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="metrics" aria-labelledby="metrics-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="metrics-title" className="text-3xl md:text-4xl font-bold">Market size & metrics</h2>
        <div ref={ref} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="panel rounded-xl p-6 border border-white/10">
            <div className="text-sm text-gray-400">TAM</div>
            <div className="mt-1 text-3xl font-bold"><span data-count-to={500000000}>$149 M</span></div>
          </div>
          <div className="panel rounded-xl p-6 border border-white/10">
            <div className="text-sm text-gray-400">SAM</div>
            <div className="mt-1 text-3xl font-bold"><span data-count-to={160000000}>$48 M</span></div>
          </div>
          <div className="panel rounded-xl p-6 border border-white/10">
            <div className="text-sm text-gray-400">SOM</div>
            <div className="mt-1 text-3xl font-bold"><span data-count-to={42000000}>$12 M</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
