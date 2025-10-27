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
        <div>
          <div className="font-semibold text-white">Contact</div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <a href="mailto:venkatasaipalla0@gmail.com" className="hover:text-white text-gray-300">
                venkatasaipalla0@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <a href="mailto:Sathwikgottipati@gmail.com" className="hover:text-white text-gray-300">
                Sathwikgottipati@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-gray-500">© {new Date().getFullYear()} VoxRocket.ai. All rights reserved.</div>
    </footer>
  );
}
