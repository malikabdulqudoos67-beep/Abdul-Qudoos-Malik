import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';

export const Footer: React.FC = () => {
  const { setActiveView, setIsAuthModalOpen, showToast } = useRealEstate();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('Thank you for subscribing to Abdul’s Private Wealth Gazette!', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#1E232A] text-white border-t border-[#303844] mt-20">
      
      {/* Newsletter VIP Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-[#303844]">
        <div className="bg-gradient-to-r from-[#28303C] to-[#222934] rounded-3xl p-8 sm:p-10 border border-[#3C4656] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase font-extrabold text-[#F2C98A] tracking-wider">
              Private Intelligence & Off-Market Access
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Subscribe to The Private Wealth Journal
            </h3>
            <p className="text-xs sm:text-sm text-[#A0AAB8]">
              Receive confidential quarterly reports on prime property valuations, architectural commissions, and off-market estate releases.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your confidential email"
              className="bg-[#161B22] border border-[#444E5E] rounded-full px-5 py-3.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C6852C] min-w-[280px]"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-[#E5A853] hover:bg-[#D99A40] text-white text-xs font-extrabold rounded-full transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Request Access
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6852C] text-white flex items-center justify-center font-serif-luxury font-bold text-xl shadow-md">
              A
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg tracking-tight block text-white">
                ABDUL'S REAL ESTATE
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#F2C98A] block">
                Signature Living
              </span>
            </div>
          </div>
          <p className="text-xs text-[#A0AAB8] leading-relaxed max-w-sm">
            Setting the global standard in high-value luxury real estate transactions, discreet advisory, and bespoke architectural design.
          </p>
          <div className="text-xs text-[#8A92A0] space-y-1">
            <p>Direct Inquiries: <strong className="text-white">+1 (310) 880-4921</strong></p>
            <p>VIP Advisory: <strong className="text-white">advisory@abdulsrealestate.com</strong></p>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase text-[#F2C98A] tracking-wider">
            Explore Portfolio
          </h4>
          <ul className="space-y-2 text-xs text-[#A0AAB8]">
            <li>
              <button onClick={() => setActiveView('listings')} className="hover:text-white transition-colors cursor-pointer">
                Signature Mansions
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('listings')} className="hover:text-white transition-colors cursor-pointer">
                Sky Penthouses
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('listings')} className="hover:text-white transition-colors cursor-pointer">
                Waterfront Villas
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('ai_studio')} className="hover:text-white transition-colors cursor-pointer text-[#F2C98A] font-semibold">
                AI Architect Studio ✦
              </button>
            </li>
          </ul>
        </div>

        {/* Global Cities */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase text-[#F2C98A] tracking-wider">
            Key Metropolises
          </h4>
          <ul className="space-y-2 text-xs text-[#A0AAB8]">
            <li>Beverly Hills, California</li>
            <li>Mayfair, London</li>
            <li>Palm Jumeirah, Dubai</li>
            <li>Star Island, Miami</li>
            <li>Cap d'Antibes, France</li>
          </ul>
        </div>

        {/* Portal Access */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase text-[#F2C98A] tracking-wider">
            Client Portal
          </h4>
          <ul className="space-y-2 text-xs text-[#A0AAB8]">
            <li>
              <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                Sign In / Register
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('appointments')} className="hover:text-white transition-colors cursor-pointer">
                My Viewings Itinerary
              </button>
            </li>
            <li>
              <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-white transition-colors cursor-pointer font-bold text-[#F2C98A]">
                Admin Console (Demo)
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-[#2A323E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D8592]">
        <p>© 2026 ABDUL'S REAL ESTATE INC. All rights reserved. Registered High-Value Brokerage.</p>
        <div className="flex items-center gap-6">
          <span>Equal Housing Opportunity</span>
          <span>Discreet Wealth Protocol</span>
        </div>
      </div>

    </footer>
  );
};
