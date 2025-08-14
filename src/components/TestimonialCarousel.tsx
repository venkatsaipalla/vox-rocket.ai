"use client";
import { motion } from "framer-motion";

export default function TestimonialCarousel() {
  const items = [
    { id: 't1', quote: 'VoxRocket cut our handle time by 42% in two weeks.', author: 'COO, E‑commerce' },
    { id: 't2', quote: 'Customers no longer wait. CSAT is up and costs are down.', author: 'VP Support, Telecom' },
    { id: 't3', quote: 'The transcripts and summaries are shockingly good.', author: 'Head of Ops, FinServ' },
  ];
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="testimonials-title" className="text-3xl md:text-4xl font-bold">What teams say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <motion.figure key={it.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="panel rounded-xl p-6 border border-white/10">
              <blockquote className="text-gray-200">“{it.quote}”</blockquote>
              <figcaption className="mt-3 text-sm text-gray-400">{it.author}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
