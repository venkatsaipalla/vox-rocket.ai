"use client";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapHero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        // Split to chars and animate in
        const split = new SplitType(titleRef.current, { types: "chars" });
        gsap.fromTo(
          split.chars,
          { y: 40, opacity: 0, rotateX: 45 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "expo.out", stagger: 0.03 }
        );
      }
      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
      }
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.05, delay: 0.35 }
        );
      }
      if (particlesRef.current) {
        const dots = particlesRef.current.querySelectorAll('[data-particle]');
        gsap.to(dots, {
          y: "+=20",
          x: "+=10",
          repeat: -1,
          yoyo: true,
          duration: 3,
          ease: "sine.inOut",
          stagger: { each: 0.1, from: "random" }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return { titleRef, subRef, ctaRef, particlesRef } as const;
}
