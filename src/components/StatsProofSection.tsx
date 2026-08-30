import React from 'react';
import { Compass, Star, Building, ArrowRight, ShieldCheck, Award, Users } from 'lucide-react';
import { CLIENT_AVATARS } from '../data/initialData';
import { useRealEstate } from '../context/RealEstateContext';

export const StatsProofSection: React.FC = () => {
  const { setFilters, setActiveView } = useRealEstate();

  const handleFilterCategory = (type: 'neighborhood' | 'top_rated' | 'condos') => {
    if (type === 'neighborhood') {
      setFilters(prev => ({ ...prev, location: 'Beverly Hills', propertyType: 'all' }));
    } else if (type === 'top_rated') {
      setFilters(prev => ({ ...prev, sortBy: 'featured', propertyType: 'villa' }));
    } else if (type === 'condos') {
      setFilters(prev => ({ ...prev, propertyType: 'penthouse' }));
    }
    setActiveView('listings');
    window.scrollTo({ top: 750, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Side: Proof & Metrics matching reference */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EDE1] text-[#9E6414] text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Global Prestige Standard</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E232A] tracking-tight leading-tight">
              Trusted by <span className="font-serif-luxury italic text-[#8B93A0] font-normal">100 Million</span> buyers
            </h2>
            <p className="text-sm sm:text-base text-[#5C6470] mt-3 max-w-lg leading-relaxed">
              Only we connect you directly to the person who knows the most about a property for sale — the listing agent and private developer.
            </p>
          </div>

          {/* Social Proof Avatars matching reference */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2.5 overflow-hidden">
              {CLIENT_AVATARS.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar.image}
                  alt={avatar.name}
                  className="inline-block h-11 w-11 rounded-full ring-2 ring-white object-cover shadow-sm"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="text-xs text-[#5C6470]">
              <span className="font-bold text-[#1E232A]">Verified Clients</span> from Dubai, London, New York & Beverly Hills
            </div>
          </div>

          {/* 3 Metric Stats matching reference */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8E2D9]">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1E232A] font-heading">
                100M
              </div>
              <div className="text-xs text-[#7D8592] font-semibold mt-0.5">
                Happy buyers
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1E232A] font-heading">
                40M
              </div>
              <div className="text-xs text-[#7D8592] font-semibold mt-0.5">
                Client review
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1E232A] font-heading flex items-baseline gap-1">
                <span>4.9</span>
                <span className="text-xs font-bold text-[#D99A40]">★</span>
              </div>
              <div className="text-xs text-[#7D8592] font-semibold mt-0.5">
                Positive Rating
              </div>
            </div>
          </div>
        </div>

        {/* Center Divider for large screens */}
        <div className="hidden lg:block lg:col-span-1 flex justify-center">
          <div className="w-[1px] h-64 bg-[#E0D9CD] mx-auto"></div>
        </div>

        {/* Right Side: 3 Luxury Feature Cards matching reference */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card 1: Explore great neighborhoods */}
          <div 
            onClick={() => handleFilterCategory('neighborhood')}
            className="group bg-white hover:bg-[#FAF7F2] p-5 sm:p-6 rounded-[24px] border border-[#EBE5DA] hover:border-[#D99A40] transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FCECD7] text-[#C6852C] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#1E232A] group-hover:text-[#C6852C] transition-colors">
                  Explore great neighborhoods
                </h3>
                <p className="text-xs text-[#68707C] mt-1 line-clamp-2 leading-relaxed">
                  Explore video tours, in-depth research, and architectural guides across 20,000 prime neighborhoods.
                </p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#F5EDE1] group-hover:bg-[#E5A853] text-[#1E232A] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Find highly rated best property */}
          <div 
            onClick={() => handleFilterCategory('top_rated')}
            className="group bg-white hover:bg-[#FAF7F2] p-5 sm:p-6 rounded-[24px] border border-[#EBE5DA] hover:border-[#D99A40] transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF3D6] text-[#D99A40] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Star className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#1E232A] group-hover:text-[#C6852C] transition-colors">
                  Find highly rated best property
                </h3>
                <p className="text-xs text-[#68707C] mt-1 line-clamp-2 leading-relaxed">
                  Discover top-tier school districts, elite amenities, and residences certified with 5-star builder ratings.
                </p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#F5EDE1] group-hover:bg-[#E5A853] text-[#1E232A] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Discover condo quality buildings */}
          <div 
            onClick={() => handleFilterCategory('condos')}
            className="group bg-white hover:bg-[#FAF7F2] p-5 sm:p-6 rounded-[24px] border border-[#EBE5DA] hover:border-[#D99A40] transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0EBE1] text-[#786E5D] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Building className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#1E232A] group-hover:text-[#C6852C] transition-colors">
                  Discover condo quality buildings
                </h3>
                <p className="text-xs text-[#68707C] mt-1 line-clamp-2 leading-relaxed">
                  Sky penthouses and serviced residences with 24/7 concierge, private elevators, and resort amenities.
                </p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#F5EDE1] group-hover:bg-[#E5A853] text-[#1E232A] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
