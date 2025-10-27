export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-300">
        <div>
          <div className="flex items-center gap-2">
            <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(108,99,255,0.2)] ring-1 ring-[rgba(108,99,255,0.4)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#6C63FF]"><circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.3"/></svg>
            </span>
            <span className="font-bold text-white">VoxRocket.ai</span>
          </div>
          <p className="mt-3 text-gray-400">Smarter customer conversations.</p>
        </div>
        <div>
          <div className="font-semibold text-white">Product</div>
          <ul className="mt-3 space-y-2">
            {['Features','Pricing','Security'].map((l) => (<li key={l}><a href={`#${l.toLowerCase().replace(/ /g,'-')}`} className="hover:text-white">{l}</a></li>))}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Resources</div>
          <ul className="mt-3 space-y-2">
            {['Support','Status'].map((l) => (<li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-white">{l}</a></li>))}
          </ul>
        </div>
        {/* <div>
          <div className="font-semibold text-white">Newsletter</div>
          <form className="mt-3 flex gap-2">
            <input aria-label="Email" type="email" placeholder="you@company.com" className="flex-1 rounded-md bg-black/30 border border-white/10 px-3 py-2 text-white placeholder:text-gray-500" />
            <button className="px-3 py-2 rounded-md bg-[#6C63FF] text-white">Subscribe</button>
          </form>
          <p className="mt-2 text-xs text-gray-500">SOC2 • GDPR-ready • PCI note</p>
        </div> */}
      </div>
      <div className="mt-10 text-center text-xs text-gray-500">© {new Date().getFullYear()} VoxRocket.ai. All rights reserved.</div>
    </footer>
  );
}
