import React from 'react';
import HeaderNav from './components/HeaderNav';
import HeroSection from './components/HeroSection';
import PrizeAndCommunity from './components/PrizeAndCommunity';
import RequirementsAndFooter from './components/RequirementsAndFooter';

export default function App() {
  React.useEffect(() => {
    const handleSmoothScroll = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#' && targetId.startsWith('#')) {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0E] text-white">
      <HeaderNav />
      <main>
        <HeroSection />
        <PrizeAndCommunity />
        <RequirementsAndFooter />
      </main>
    </div>
  );
}
