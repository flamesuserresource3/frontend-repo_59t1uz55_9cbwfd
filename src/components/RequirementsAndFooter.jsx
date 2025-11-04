import React from 'react';
import { CheckCircle2, Twitter, Instagram, Youtube } from 'lucide-react';

const requirements = [
  'Valid international driver\'s license (Manual transmission endorsement required).',
  'Full commitment to a 90-day travel window.',
  'High-quality video and photo documentation skills.',
  'Proof of comprehensive international travel insurance.',
  'Reliable 4x4 or overland vehicle (or acceptance of provided vehicle).',
];

export default function RequirementsAndFooter() {
  return (
    <section id="applicants" className="bg-[#0A0A0E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            THE CRITERIA: What Applicants Need to Compete
          </h3>
          <p className="mt-3 text-gray-300">
            A focused challenge demands capable travelers. Make sure you\'re ready for the journey.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {requirements.map((req) => (
            <div key={req} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
              <p className="text-gray-200">{req}</p>
            </div>
          ))}
        </div>

        <div id="register" className="mt-12">
          <a
            href="#launch"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-gray-900 font-semibold shadow-[0_0_28px_rgba(16,185,129,0.55)] hover:bg-emerald-400 transition-colors"
          >
            Ready to Drive the Adventure? Register Today
          </a>
        </div>
      </div>

      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Africa by Road. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter" className="rounded-lg p-2 text-gray-300 hover:text-emerald-400 hover:bg-white/5 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-lg p-2 text-gray-300 hover:text-emerald-400 hover:bg-white/5 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-lg p-2 text-gray-300 hover:text-emerald-400 hover:bg-white/5 transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
