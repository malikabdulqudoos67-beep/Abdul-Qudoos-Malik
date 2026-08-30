import React, { useState } from 'react';
import { Home, MapPin, Calendar, DollarSign, Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { PropertyType } from '../types';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, resetFilters, setActiveView } = useRealEstate();
  const [selectedMoveInDate, setSelectedMoveInDate] = useState('anytime');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('listings');
    // Scroll smoothly to property catalog
    const listingsElement = document.getElementById('listings-section');
    if (listingsElement) {
      listingsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#EFEAE2] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border border-[#E0D8CB] shadow-xs text-center space-y-6">
        
        {/* Title matching reference */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E232A] tracking-tight">
            Find your <span className="font-serif-luxury italic text-[#8B93A0] font-normal">dream home</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#68707C] mt-1 font-medium">
            Connecting you with the perfect luxury residence for you and your loved ones
          </p>
        </div>

        {/* 4-Field Search Pill Bar matching reference */}
        <form 
          onSubmit={handleSearch}
          className="bg-white rounded-full p-2 sm:p-3 shadow-md border border-[#E0D8CB] flex flex-col md:flex-row items-center justify-between gap-2 max-w-5xl mx-auto"
        >
          {/* Field 1: Property Type */}
          <div className="flex-1 w-full flex items-center px-4 py-2 hover:bg-[#F9F7F3] rounded-full transition-colors border-b md:border-b-0 md:border-r border-[#F0EBE1]">
            <Home className="w-4 h-4 text-[#C6852C] mr-2.5 flex-shrink-0" />
            <div className="text-left w-full">
              <label className="block text-[10px] uppercase font-bold text-[#8A92A0]">
                Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value as any }))}
                className="w-full bg-transparent text-xs font-bold text-[#1E232A] focus:outline-none cursor-pointer appearance-none"
              >
                <option value="all">All Residences</option>
                <option value="villa">Luxury Villas</option>
                <option value="penthouse">Sky Penthouses</option>
                <option value="mansion">Private Mansions</option>
                <option value="house">Modern Houses</option>
                <option value="apartment">Designer Apartments</option>
              </select>
            </div>
          </div>

          {/* Field 2: Location */}
          <div className="flex-1 w-full flex items-center px-4 py-2 hover:bg-[#F9F7F3] rounded-full transition-colors border-b md:border-b-0 md:border-r border-[#F0EBE1]">
            <MapPin className="w-4 h-4 text-[#C6852C] mr-2.5 flex-shrink-0" />
            <div className="text-left w-full">
              <label className="block text-[10px] uppercase font-bold text-[#8A92A0]">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full bg-transparent text-xs font-bold text-[#1E232A] focus:outline-none cursor-pointer appearance-none"
              >
                <option value="">Worldwide Prime</option>
                <option value="Beverly Hills">Beverly Hills, CA</option>
                <option value="Dubai">Dubai, UAE</option>
                <option value="Palm Jumeirah">Palm Jumeirah</option>
                <option value="Miami Beach">Miami Beach, FL</option>
                <option value="London">London, UK</option>
                <option value="Paris">Paris, France</option>
              </select>
            </div>
          </div>

          {/* Field 3: Date / Move In */}
          <div className="flex-1 w-full flex items-center px-4 py-2 hover:bg-[#F9F7F3] rounded-full transition-colors border-b md:border-b-0 md:border-r border-[#F0EBE1]">
            <Calendar className="w-4 h-4 text-[#C6852C] mr-2.5 flex-shrink-0" />
            <div className="text-left w-full">
              <label className="block text-[10px] uppercase font-bold text-[#8A92A0]">
                Move-in Date
              </label>
              <select
                value={selectedMoveInDate}
                onChange={(e) => setSelectedMoveInDate(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-[#1E232A] focus:outline-none cursor-pointer appearance-none"
              >
                <option value="anytime">Immediate / Flexible</option>
                <option value="30days">Within 30 Days</option>
                <option value="q4">Late 2026</option>
                <option value="q1_2027">Early 2027</option>
              </select>
            </div>
          </div>

          {/* Field 4: Price Range */}
          <div className="flex-1 w-full flex items-center px-4 py-2 hover:bg-[#F9F7F3] rounded-full transition-colors">
            <DollarSign className="w-4 h-4 text-[#C6852C] mr-2.5 flex-shrink-0" />
            <div className="text-left w-full">
              <label className="block text-[10px] uppercase font-bold text-[#8A92A0]">
                Price Range
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full bg-transparent text-xs font-bold text-[#1E232A] focus:outline-none cursor-pointer appearance-none"
              >
                <option value="50000000">Any Price</option>
                <option value="1000000">Under $1,000,000</option>
                <option value="5000000">Under $5,000,000</option>
                <option value="15000000">Under $15,000,000</option>
                <option value="30000000">Under $30,000,000</option>
              </select>
            </div>
          </div>

          {/* Search Button matching reference dark pill */}
          <div className="w-full md:w-auto p-1 flex-shrink-0">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 rounded-full bg-[#1E232A] hover:bg-[#343D4A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#F2C98A]" />
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* Quick Tags / Reset */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#7D8592]">
          <span className="font-semibold text-[#1E232A]">Popular Enclaves:</span>
          {['Beverly Hills', 'Downtown Dubai', 'Palm Jumeirah', 'Miami Beach', 'London W8'].map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                setFilters(prev => ({ ...prev, location: loc }));
                setActiveView('listings');
              }}
              className="px-3 py-1 bg-white hover:bg-[#FAF7F2] rounded-full border border-[#DDD6CA] text-[#4E5664] font-medium transition-colors cursor-pointer"
            >
              {loc}
            </button>
          ))}
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 text-[#C6852C] hover:underline font-bold ml-2 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

      </div>
    </section>
  );
};
