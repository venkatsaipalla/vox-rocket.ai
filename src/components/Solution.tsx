"use client";

export default function Solution() {
  const benefits = [
    'Natural-language understanding',
    'Instant resolutions',
    'CMS-driven responses',
    'Recording + transcriptions',
    'Enterprise security',
  ];
  return (
    <section id="features" aria-labelledby="solution-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1" data-reveal>
          <h2 id="solution-title" className="text-3xl md:text-4xl font-bold">Real conversations. Real resolutions.</h2>
          <ul className="mt-6 space-y-3 text-gray-300">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2" data-reveal>
                <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(255,93,162,0.15)] ring-1 ring-[rgba(255,93,162,0.35)]">
                  <svg viewBox="0 0 24 24" width="14" height="14" className="text-[#FF5DA2]">
                    <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        {/* Placeholder visual */}
        <div className="order-1 lg:order-2" data-reveal>
            <div className="aspect-[20/10] rounded-xl panel grid grid-cols-2 gap-4 p-4">
            {/* <img src="/real_conversation_1.jpeg" alt="Solution" className="rounded-lg bg-black/30 border border-white/10" /> */}
            {/* <img src="/real_conversation_1.jpeg" alt="Solution" className="rounded-lg bg-black/30 border border-white/10" /> */}
            <img src="/real_conversation_3.png" alt="Solution" className="col-span-2 rounded-lg bg-black/30 border border-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
