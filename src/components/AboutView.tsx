import React from 'react';
import { ShieldCheck, Award, Globe, Building2, Users, ArrowRight, CheckCircle2, Phone, Mail } from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';

export const AboutView: React.FC = () => {
  const { setActiveView, setIsAuthModalOpen } = useRealEstate();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Hero Brand Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#9E6414] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#D99A40]"></span>
            <span>About Abdul's Real Estate</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E232A] leading-tight font-heading">
            Curating the World's Most <span className="font-serif-luxury italic text-[#C6852C] font-normal">Exquisite Sanctuaries</span>
          </h1>
          <p className="text-sm text-[#5C6470] leading-relaxed">
            Founded by Abdul Malik, <strong>ABDUL'S REAL ESTATE</strong> has grown from an exclusive private advisory into a premier global luxury brokerage managing over $2.4 Billion in prime residential real estate across Beverly Hills, London, Dubai, and Miami.
          </p>
          <p className="text-sm text-[#5C6470] leading-relaxed">
            We represent royalty, visionary tech founders, and distinguished families with absolute discretion, bespoke architectural intelligence, and private off-market access.
          </p>
          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => setActiveView('listings')}
              className="px-7 py-3.5 bg-[#1E232A] hover:bg-[#343D4A] text-white text-xs font-extrabold rounded-full transition-all shadow-md cursor-pointer"
            >
              Explore Signature Portfolio
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative rounded-[36px] overflow-hidden shadow-2xl border border-[#E8E2D9] aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Estate"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[#1E232A] text-white p-6 rounded-3xl shadow-xl border border-[#343D4A] max-w-xs hidden sm:block">
            <p className="font-heading font-extrabold text-2xl text-[#F2C98A]">$2.4B+</p>
            <p className="text-xs text-[#A0AAB8] mt-0.5">Cumulative lifetime transactions across 12 countries</p>
          </div>
        </div>
      </div>

      {/* Global Offices */}
      <div className="bg-[#FAF7F2] rounded-[36px] p-8 sm:p-12 border border-[#E8E2D9] space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase text-[#C6852C] tracking-wider">
            Global Presence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E232A]">
            Offices in World Capital Metropolises
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              city: 'Beverly Hills',
              address: '9601 Wilshire Blvd, Suite 1100',
              phone: '+1 (310) 880-4921',
              email: 'beverlyhills@abdulsrealestate.com'
            },
            {
              city: 'London Mayfair',
              address: '14 Berkeley Square, London W1J 6BL',
              phone: '+44 20 7946 0888',
              email: 'london@abdulsrealestate.com'
            },
            {
              city: 'Dubai Marina & Palm',
              address: 'Gate Precinct 4, DIFC & Palm Jumeirah',
              phone: '+971 4 312 9000',
              email: 'dubai@abdulsrealestate.com'
            },
            {
              city: 'Miami Beach',
              address: '1111 Lincoln Road, Penthouse Suite',
              phone: '+1 (305) 539-8800',
              email: 'miami@abdulsrealestate.com'
            }
          ].map((loc, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E8E2D9] space-y-3">
              <h3 className="font-heading font-extrabold text-lg text-[#1E232A]">{loc.city}</h3>
              <p className="text-xs text-[#68707C] leading-relaxed">{loc.address}</p>
              <div className="pt-2 border-t border-[#F0EBE1] text-xs text-[#1E232A] space-y-1 font-semibold">
                <p>📞 {loc.phone}</p>
                <p className="text-[11px] text-[#C6852C] truncate">✉️ {loc.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
