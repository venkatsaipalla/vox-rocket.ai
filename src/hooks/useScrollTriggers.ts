"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollTriggers() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function handleEnter(self: ScrollTrigger) {
      const el = self.trigger as HTMLElement;
      const index = Number(el.getAttribute('data-reveal-index') || 0);
      const delay = 0.05 * (index % 3);
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay });
    }

    const contextCallback = () => {
      const revealEls = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      let i = 0;
      for (const el of revealEls) {
        el.setAttribute('data-reveal-index', String(i++));
        gsap.set(el, { opacity: 0, y: 24 });
        ScrollTrigger.create({ trigger: el, start: 'top 85%', onEnter: handleEnter });
      }

      const pinSection = document.querySelector('[data-pin-walkthrough]') as HTMLElement | null;
      if (pinSection) {
        ScrollTrigger.create({ trigger: pinSection, start: 'top top', end: '+=1200', pin: true, pinSpacing: true });
      }
    };

    const ctx = gsap.context(contextCallback);
    return () => ctx.revert();
  }, []);
}
