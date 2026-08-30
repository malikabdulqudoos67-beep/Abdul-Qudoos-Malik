import React, { useState, useMemo } from 'react';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Heart, 
  Calendar, 
  ArrowUpRight, 
  Sparkles, 
  Filter, 
  SlidersHorizontal, 
  Check,
  Building2,
  Share2
} from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { Property, PropertyType } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const PropertyListings: React.FC = () => {
  const { 
    properties, 
    formatPrice, 
    favorites, 
    toggleFavorite, 
    setSelectedProperty, 
    openBookingForProperty,
    filters,
    setFilters,
    showToast
  } = useRealEstate();

  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent'>('all');
  const [selectedTypeTab, setSelectedTypeTab] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      // Listing type (buy vs rent)
      if (activeTab !== 'all' && item.listingType !== activeTab) return false;
      if (filters.listingType !== 'all' && item.listingType !== filters.listingType) return false;

      // Property type
      if (selectedTypeTab !== 'all' && item.type !== selectedTypeTab) return false;
      if (filters.propertyType !== 'all' && item.type !== filters.propertyType) return false;

      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesLocation = item.location.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesAddress = item.address.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLocation && !matchesDesc && !matchesAddress) return false;
      }

      // Location filter
      if (filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Max price
      if (filters.maxPrice && item.price > filters.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'sqft_desc') return b.sqft - a.sqft;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [properties, activeTab, selectedTypeTab, filters]);

  const handleShare = (e: React.MouseEvent, prop: Property) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Listing link for "${prop.title}" copied to clipboard!`, 'success');
  };

  return (
    <section id="listings-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#E8E2D9] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#9E6414] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D99A40]"></span>
            <span>Signature Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E232A] tracking-tight">
            Featured Luxury <span className="font-serif-luxury italic text-[#8B93A0] font-normal">Residences</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#68707C] mt-1">
            Handpicked architectural estates, penthouses, and waterfront sanctuaries
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sale vs Rent toggle */}
          <div className="inline-flex p-1 bg-[#EFEAE2] rounded-full border border-[#DDD6CB]">
            <button
              onClick={() => { setActiveTab('all'); setFilters(prev => ({ ...prev, listingType: 'all' })); }}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-[#1E232A] text-white shadow-xs' : 'text-[#5C6470] hover:text-[#1E232A]'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => { setActiveTab('sale'); setFilters(prev => ({ ...prev, listingType: 'sale' })); }}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'sale' ? 'bg-[#1E232A] text-white shadow-xs' : 'text-[#5C6470] hover:text-[#1E232A]'
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => { setActiveTab('rent'); setFilters(prev => ({ ...prev, listingType: 'rent' })); }}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'rent' ? 'bg-[#1E232A] text-white shadow-xs' : 'text-[#5C6470] hover:text-[#1E232A]'
              }`}
            >
              For Rent
            </button>
          </div>

          {/* Sort By Dropdown */}
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="bg-[#EFEAE2] border border-[#DDD6CB] text-[#1E232A] text-xs font-bold rounded-full px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="sqft_desc">Largest Area</option>
          </select>
        </div>
      </div>

      {/* Property Type Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {[
          { id: 'all', label: 'All Collection' },
          { id: 'villa', label: 'Villas & Estates' },
          { id: 'penthouse', label: 'Sky Penthouses' },
          { id: 'mansion', label: 'Waterfront Mansions' },
          { id: 'house', label: 'Modern Houses' },
          { id: 'apartment', label: 'Luxury Condos' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTypeTab(tab.id)}
            className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all cursor-pointer ${
              selectedTypeTab === tab.id
                ? 'bg-[#E5A853] text-white shadow-sm'
                : 'bg-white text-[#5C6470] hover:text-[#1E232A] border border-[#E5E0D8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Property Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2D9] p-8">
          <Building2 className="w-12 h-12 text-[#C6852C] mx-auto mb-3 stroke-1" />
          <h3 className="font-heading font-bold text-lg text-[#1E232A]">No properties match your current filters</h3>
          <p className="text-xs text-[#7D8592] mt-1 max-w-md mx-auto">
            Try adjusting your search criteria, price range, or reset filters to see all available private estates.
          </p>
          <button
            onClick={() => {
              setActiveTab('all');
              setSelectedTypeTab('all');
              setFilters({
                searchQuery: '',
                propertyType: 'all',
                listingType: 'all',
                location: '',
                minPrice: 0,
                maxPrice: 50000000,
                bedrooms: 'all',
                bathrooms: 'all',
                amenities: [],
                sortBy: 'featured'
              });
            }}
            className="mt-4 px-5 py-2 text-xs font-bold bg-[#1E232A] text-white rounded-full hover:bg-[#343D4A] transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredProperties.map((property, index) => {
            const isFav = favorites.includes(property.id);

            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedProperty(property)}
                className="group bg-white rounded-[28px] overflow-hidden border border-[#EAE4DA] hover:border-[#D99A40] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col cursor-pointer"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#1E232A]">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                    <span className="bg-white/95 backdrop-blur-md text-[#1E232A] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                    {property.isFeatured && (
                      <span className="bg-[#E5A853] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Top Right Action Buttons (Favorite + Share) */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(property.id);
                      }}
                      className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
                        isFav 
                          ? 'bg-[#D9534F] text-white shadow' 
                          : 'bg-white/80 hover:bg-white text-[#1E232A]'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => handleShare(e, property)}
                      className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1E232A] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                      title="Share property"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Location badge on bottom left of image */}
                  <div className="absolute bottom-3 left-3.5 flex items-center gap-1 text-white text-xs font-semibold drop-shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-[#F2C98A]" />
                    <span>{property.location}</span>
                  </div>
                </div>

                {/* Content Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-[#8A92A0] tracking-wider">
                        {property.type}
                      </span>
                      {property.rating && (
                        <div className="flex items-center gap-1 text-xs font-bold text-[#1E232A]">
                          <span className="text-[#D99A40]">★</span>
                          <span>{property.rating}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#1E232A] group-hover:text-[#C6852C] transition-colors leading-snug line-clamp-1">
                      {property.title}
                    </h3>

                    <p className="text-xs text-[#68707C] line-clamp-2 leading-relaxed">
                      {property.subtitle || property.description}
                    </p>
                  </div>

                  {/* Bed, Bath, Sqft specs */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#F0EBE1] text-xs text-[#5C6470]">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-[#C6852C]" />
                      <span className="font-bold text-[#1E232A]">{property.bedrooms}</span>
                      <span className="text-[#8A92A0]">Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-[#C6852C]" />
                      <span className="font-bold text-[#1E232A]">{property.bathrooms}</span>
                      <span className="text-[#8A92A0]">Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-4 h-4 text-[#C6852C]" />
                      <span className="font-bold text-[#1E232A]">{property.sqft.toLocaleString()}</span>
                      <span className="text-[#8A92A0]">sqft</span>
                    </div>
                  </div>

                  {/* Pricing and Book Viewing CTA */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8A92A0] block">
                        {property.listingType === 'rent' ? 'Monthly Rental' : 'Guide Price'}
                      </span>
                      <span className="font-heading font-extrabold text-xl text-[#1E232A]">
                        {formatPrice(property.price, property.listingType)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBookingForProperty(property);
                        }}
                        className="px-4 py-2 text-xs font-bold bg-[#1E232A] hover:bg-[#C6852C] text-white rounded-full transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Visit</span>
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      )}

    </section>
  );
};
