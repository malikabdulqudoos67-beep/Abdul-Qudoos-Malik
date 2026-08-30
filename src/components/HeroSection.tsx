import React, { useState } from 'react';
import { Search, ArrowLeft, ArrowRight, Sparkles, MapPin, Bed, Bath, Maximize2, Calendar, Check } from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { motion, AnimatePresence } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { 
    properties, 
    siteContent, 
    formatPrice, 
    setSelectedProperty, 
    openBookingForProperty,
    filters,
    setFilters,
    setActiveView
  } = useRealEstate();

  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'sell'>('buy');
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Pick top featured properties for the hero carousel
  const heroProperties = properties.length > 0 
    ? properties.filter(p => p.isFeatured || p.isHeroHighlight).concat(properties).slice(0, 4)
    : [];

  const currentProperty = heroProperties[currentHeroIndex] || properties[0];

  const handleNextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroProperties.length);
  };

  const handlePrevHero = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroProperties.length) % heroProperties.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      searchQuery: heroSearchInput,
      listingType: activeTab === 'buy' ? 'sale' : activeTab === 'rent' ? 'rent' : 'all'
    }));
    setActiveView('listings');
  };

  return (
    <section className="pt-4 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Curved Architectural Container Matching Reference */}
      <div className="relative bg-[#ECE7DE] rounded-[36px] sm:rounded-[44px] overflow-hidden p-6 sm:p-10 lg:p-14 border border-[#DFD9CD] shadow-sm">
        
        {/* Decorative subtle ambient warm blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5D8A8]/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Big Bold Headline matching reference */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1E232A] tracking-tight leading-[1.08]"
          >
            {siteContent.heroHeadline.split('home you love').length > 1 ? (
              <>
                {siteContent.heroHeadline.split('home you love')[0]}
                <span className="text-[#68707C] font-normal italic font-serif-luxury block sm:inline">
                  home you love
                </span>
              </>
            ) : (
              siteContent.heroHeadline
            )}
          </motion.h1>
        </div>

        {/* Two Column Layout: Left (Controls + Quote) | Right (Curved House Frame) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
          
          {/* Left Column matching reference */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:space-y-12">
            
            {/* Search Box with Buy / Rent / Sell Pill Tabs */}
            <div className="space-y-3">
              {/* Tab Pills */}
              <div className="inline-flex p-1 bg-white/70 backdrop-blur-md rounded-full border border-white/80 shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('buy')}
                  className={`px-5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    activeTab === 'buy'
                      ? 'bg-white text-[#1E232A] shadow-xs'
                      : 'text-[#68707C] hover:text-[#1E232A]'
                  }`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('rent')}
                  className={`px-5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    activeTab === 'rent'
                      ? 'bg-white text-[#1E232A] shadow-xs'
                      : 'text-[#68707C] hover:text-[#1E232A]'
                  }`}
                >
                  Rent
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sell')}
                  className={`px-5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    activeTab === 'sell'
                      ? 'bg-white text-[#1E232A] shadow-xs'
                      : 'text-[#68707C] hover:text-[#1E232A]'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Main search bar matching reference */}
              <form 
                onSubmit={handleSearchSubmit}
                className="relative flex items-center bg-white rounded-full p-2 pl-5 shadow-sm border border-[#DDD6CA] focus-within:border-[#C6852C] transition-all"
              >
                <input
                  type="text"
                  value={heroSearchInput}
                  onChange={(e) => setHeroSearchInput(e.target.value)}
                  placeholder="Address, School, City or Market"
                  className="w-full bg-transparent text-sm text-[#1E232A] placeholder-[#8A92A0] font-medium focus:outline-none pr-12"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-[#E5A853] hover:bg-[#D99A40] text-white flex items-center justify-center transition-all shadow-xs cursor-pointer flex-shrink-0"
                  title="Search Properties"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            </div>

            {/* Quote badge matching reference */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative max-w-sm pl-6 border-l-2 border-[#C6852C]/60"
            >
              <span className="absolute -top-3 -left-3 text-4xl font-serif text-[#C6852C]/30 select-none">“</span>
              <p className="text-xs sm:text-sm text-[#4E5664] leading-relaxed italic font-medium">
                "{siteContent.heroQuote}"
              </p>
              {siteContent.heroQuoteAuthor && (
                <p className="text-[11px] font-bold text-[#1E232A] mt-2 uppercase tracking-wider">
                  — {siteContent.heroQuoteAuthor}
                </p>
              )}
            </motion.div>

          </div>

          {/* Right Column: Architectural Curved Photo Frame & Float Card */}
          <div className="lg:col-span-7 relative">
            
            {/* Curved Frame with Image */}
            <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden aspect-[4/3] sm:aspect-[16/11] shadow-xl border-4 border-white/90 bg-[#1E232A]">
              <AnimatePresence mode="wait">
                {currentProperty && (
                  <motion.div
                    key={currentProperty.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={currentProperty.imageUrl}
                      alt={currentProperty.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status Badge on top left of photo */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur-md text-[#1E232A] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  {currentProperty?.status === 'for_rent' ? 'For Rent' : 'Exclusive Sale'}
                </span>
                <span className="bg-black/60 backdrop-blur-md text-[#F2C98A] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#F2C98A]" />
                  {currentProperty?.location}
                </span>
              </div>
            </div>

            {/* Floating Luxury Info Card matching reference */}
            {currentProperty && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={`card-${currentProperty.id}`}
                className="lg:absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 shadow-2xl border border-[#ECE7DE] max-w-sm w-full mt-4 lg:mt-0 backdrop-blur-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1E232A] truncate">
                      {currentProperty.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase bg-[#F7EFE2] text-[#C6852C] px-2 py-0.5 rounded-md">
                      {currentProperty.type}
                    </span>
                  </div>

                  <p className="text-xs text-[#68707C] line-clamp-2">
                    {currentProperty.subtitle || currentProperty.description}
                  </p>

                  <div className="flex items-center gap-3 pt-1 text-xs text-[#5C6470]">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-[#C6852C]" />
                      <strong>{currentProperty.bedrooms}</strong> Beds
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-[#C6852C]" />
                      <strong>{currentProperty.bathrooms}</strong> Baths
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C6852C]" />
                      <strong>{currentProperty.sqft.toLocaleString()}</strong> sqft
                    </span>
                  </div>

                  {/* Price & Action row matching reference */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#F0EBE1]">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8A92A0] block">
                        Offer Price
                      </span>
                      <span className="font-heading font-extrabold text-lg sm:text-xl text-[#1E232A]">
                        {formatPrice(currentProperty.price, currentProperty.listingType)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Prev Arrow */}
                      <button
                        onClick={handlePrevHero}
                        className="w-9 h-9 rounded-full bg-[#F3EEE6] hover:bg-[#E8E1D5] text-[#1E232A] flex items-center justify-center transition-all cursor-pointer"
                        title="Previous Property"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      {/* Next / Primary Action Button matching gold circular arrow in reference */}
                      <button
                        onClick={handleNextHero}
                        className="w-9 h-9 rounded-full bg-[#E5A853] hover:bg-[#D99A40] text-white flex items-center justify-center transition-all shadow-sm hover:scale-105 cursor-pointer"
                        title="Next Property"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Book Viewing Button */}
                      <button
                        onClick={() => openBookingForProperty(currentProperty)}
                        className="px-3.5 py-2 text-xs font-bold bg-[#1E232A] hover:bg-[#343D4A] text-white rounded-full transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#F2C98A]" />
                        <span>Book</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
