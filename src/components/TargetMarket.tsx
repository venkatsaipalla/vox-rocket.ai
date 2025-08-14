"use client";

export default function TargetMarket() {
  const markets = [
    { id: 'ecom', title: 'E‑commerce', blurb: 'Order status, returns, refunds.', icon: '🛒' },
    { id: 'telecom', title: 'Telecom', blurb: 'Plan changes, outages, billing.', icon: '📶' },
    { id: 'finserv', title: 'Financial Services', blurb: 'Card issues, KYC, balances.', icon: '💳' },
    { id: 'enterprise', title: 'Enterprise Support', blurb: 'IT helpdesk, HR hotline.', icon: '🏢' },
  ];
  return (
    <section id="use-cases" aria-labelledby="market-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="market-title" className="text-3xl md:text-4xl font-bold">Built for your industry</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {markets.map((m) => (
            <article key={m.id} data-reveal className="panel rounded-xl p-5 border border-white/10">
              <div className="text-2xl" aria-hidden>{m.icon}</div>
              <h3 className="mt-3 font-semibold">{m.title}</h3>
              <p className="mt-1 text-sm text-gray-300">{m.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
