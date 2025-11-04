import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section id="top" className="relative w-full min-h-[70vh] sm:min-h-[80vh] bg-[#0A0A0E]">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/dRBdpY8aSqcdPO2y/scene.splinecode"
          aria-label="Interactive 3D desert adventure scene"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0E]/20 via-[#0A0A0E]/60 to-[#0A0A0E] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-24 sm:pt-32 sm:pb-32 flex items-end">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            EXPLORE. COMPETE. DRIVE THE ADVENTURE.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-gray-200 max-w-2xl">
            Join the ultimate community of road travelers and compete for the Grand Prize on the continent's most epic routes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              id="launch"
              href="#register"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-gray-900 font-semibold shadow-[0_0_28px_rgba(16,185,129,0.55)] hover:bg-emerald-400 transition-colors"
            >
              Launch App & Register
            </a>
            <a
              href="#community"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-500/70 px-6 py-3 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400 transition-colors"
            >
              View Community Leaderboard
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
