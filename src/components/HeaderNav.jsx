import React from 'react';
import { Menu, X } from 'lucide-react';

export default function HeaderNav() {
  const [open, setOpen] = React.useState(false);

  const navItems = [
    { href: '#features', label: 'Features' },
    { href: '#prizes', label: 'Prizes' },
    { href: '#applicants', label: 'Applicants' },
    { href: '#community', label: 'Community' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0E]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0E]/70 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-lg bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.6)]" />
            <span className="font-semibold text-white text-lg tracking-wide group-hover:text-emerald-400 transition-colors">
              Africa by Road
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#launch"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 font-medium text-gray-900 shadow-[0_0_22px_rgba(16,185,129,0.5)] hover:bg-emerald-400 transition-colors"
            >
              Launch App & Register
            </a>
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-200 hover:bg-white/5"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/5 py-3">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-gray-200 hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#launch"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 font-medium text-gray-900 shadow-[0_0_22px_rgba(16,185,129,0.5)] hover:bg-emerald-400"
              >
                Launch App & Register
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
