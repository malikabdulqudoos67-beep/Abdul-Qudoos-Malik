import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  Calculator, 
  Building2,
  ChevronLeft,
  ChevronRight,
  Send
} from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { motion } from 'motion/react';

export const PropertyDetailModal: React.FC = () => {
  const { 
    selectedProperty, 
    setSelectedProperty, 
    formatPrice, 
    favorites, 
    toggleFavorite, 
    openBookingForProperty,
    setIsMortgageCalcOpen,
    submitInquiry,
    showToast
  } = useRealEstate();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('I am interested in scheduling a confidential private viewing for this property.');
  const [isSendingInquiry, setIsSendingInquiry] = useState(false);

  if (!selectedProperty) return null;

  const isFav = favorites.includes(selectedProperty.id);
  const gallery = selectedProperty.gallery?.length ? selectedProperty.gallery : [selectedProperty.imageUrl];

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) {
      showToast('Please enter your name and email', 'error');
      return;
    }

    setIsSendingInquiry(true);
    try {
      await submitInquiry({
        propertyId: selectedProperty.id,
        propertyTitle: selectedProperty.title,
        name: inquiryName,
        email: inquiryEmail,
        phone: inquiryPhone,
        message: inquiryMessage
      });
      setInquiryName('');
      setInquiryEmail('');
      setInquiryPhone('');
    } catch (e: any) {
      showToast('Failed to send inquiry', 'error');
    } finally {
      setIsSendingInquiry(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white rounded-[32px] max-w-5xl w-full overflow-hidden shadow-2xl border border-[#EAE4DA] my-6 relative max-h-[92vh] flex flex-col"
      >
        {/* Top Floating Close Button */}
        <button
          onClick={() => setSelectedProperty(null)}
          className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1E232A] flex items-center justify-center shadow-lg transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          
          {/* Main Gallery Hero */}
          <div className="relative aspect-[16/9] sm:aspect-[21/10] bg-[#1E232A] overflow-hidden">
            <img
              src={gallery[activeImageIndex] || selectedProperty.imageUrl}
              alt={selectedProperty.title}
              className="w-full h-full object-cover transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

            {/* Gallery navigation controls */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#1E232A] flex items-center justify-center shadow transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % gallery.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#1E232A] flex items-center justify-center shadow transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Title & Badges Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="bg-[#E5A853] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedProperty.listingType === 'rent' ? 'For Rent' : 'Exclusive Sale'}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F2C98A]" />
                    {selectedProperty.location}
                  </span>
                </div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                  {selectedProperty.title}
                </h1>
                <p className="text-xs sm:text-sm text-gray-200">
                  {selectedProperty.address}
                </p>
              </div>

              {/* Price box */}
              <div className="text-right bg-black/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                <span className="text-[10px] uppercase font-bold text-[#F2C98A] block">
                  Guide Price
                </span>
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  {formatPrice(selectedProperty.price, selectedProperty.listingType)}
                </span>
              </div>
            </div>

          </div>

          {/* Thumbnails Row */}
          {gallery.length > 1 && (
            <div className="flex gap-2 p-4 bg-[#FAF7F2] border-b border-[#EBE5DA] overflow-x-auto no-scrollbar">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#C6852C] scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Content Body Grid: Left specs & copy | Right booking & agent box */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Specs Card */}
              <div className="grid grid-cols-4 gap-3 bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E2D9] text-center">
                <div>
                  <Bed className="w-5 h-5 text-[#C6852C] mx-auto mb-1" />
                  <span className="block text-base font-extrabold text-[#1E232A]">{selectedProperty.bedrooms}</span>
                  <span className="text-[11px] text-[#7D8592] font-semibold">Bedrooms</span>
                </div>
                <div>
                  <Bath className="w-5 h-5 text-[#C6852C] mx-auto mb-1" />
                  <span className="block text-base font-extrabold text-[#1E232A]">{selectedProperty.bathrooms}</span>
                  <span className="text-[11px] text-[#7D8592] font-semibold">Bathrooms</span>
                </div>
                <div>
                  <Maximize2 className="w-5 h-5 text-[#C6852C] mx-auto mb-1" />
                  <span className="block text-base font-extrabold text-[#1E232A]">{selectedProperty.sqft.toLocaleString()}</span>
                  <span className="text-[11px] text-[#7D8592] font-semibold">Sq. Ft.</span>
                </div>
                <div>
                  <Building2 className="w-5 h-5 text-[#C6852C] mx-auto mb-1" />
                  <span className="block text-base font-extrabold text-[#1E232A]">{selectedProperty.yearBuilt || 2024}</span>
                  <span className="text-[11px] text-[#7D8592] font-semibold">Built Year</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="font-heading font-extrabold text-xl text-[#1E232A]">
                  About This Luxury Residence
                </h3>
                <p className="text-xs sm:text-sm text-[#4E5664] leading-relaxed whitespace-pre-line">
                  {selectedProperty.description}
                </p>
              </div>

              {/* Key Highlights */}
              {selectedProperty.keyHighlights && selectedProperty.keyHighlights.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-heading font-extrabold text-base text-[#1E232A]">
                    Key Property Highlights
                  </h3>
                  <div className="space-y-2">
                    {selectedProperty.keyHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4E5664]">
                        <div className="w-4 h-4 rounded-full bg-[#FCECD7] text-[#C6852C] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              <div className="space-y-3">
                <h3 className="font-heading font-extrabold text-base text-[#1E232A]">
                  Features & Luxury Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProperty.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#DDD6CB] text-xs font-semibold text-[#1E232A] flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C6852C]" />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Favorite + Mortgage Calc */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#F0EBE1]">
                <button
                  onClick={() => toggleFavorite(selectedProperty.id)}
                  className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isFav 
                      ? 'bg-[#D9534F] text-white border-[#D9534F]' 
                      : 'bg-white text-[#1E232A] border-[#DDD6CB] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  <span>{isFav ? 'Saved to Favorites' : 'Add to Favorites'}</span>
                </button>

                <button
                  onClick={() => setIsMortgageCalcOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-white text-[#1E232A] border border-[#DDD6CB] hover:bg-[#FAF8F5] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#C6852C]" />
                  <span>Calculate Mortgage</span>
                </button>
              </div>

            </div>

            {/* Right Column: Book Viewing + Agent Box */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary Book Viewing Box */}
              <div className="bg-[#1E232A] rounded-[28px] p-6 text-white space-y-4 shadow-xl border border-[#343E4E]">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#F2C98A] bg-[#2E3744] px-2.5 py-0.5 rounded-full">
                    <Calendar className="w-3 h-3" />
                    <span>Private Showing</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-white">
                    Experience This Home
                  </h3>
                  <p className="text-xs text-[#A0AAB8]">
                    Schedule a private in-person viewing, VIP chauffeur tour, or live 4K virtual walk-through.
                  </p>
                </div>

                <button
                  onClick={() => openBookingForProperty(selectedProperty)}
                  className="w-full py-4 rounded-2xl bg-[#E5A853] hover:bg-[#D99A40] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Private Appointment</span>
                </button>
              </div>

              {/* Listing Agent Box */}
              <div className="bg-[#FAF7F2] rounded-[28px] p-6 border border-[#E8E2D9] space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedProperty.agent.avatar}
                    alt={selectedProperty.agent.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#C6852C] shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-heading font-extrabold text-base text-[#1E232A]">
                      {selectedProperty.agent.name}
                    </h4>
                    <p className="text-xs text-[#68707C]">{selectedProperty.agent.title}</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#C6852C] mt-0.5">
                      <span>★ 5.0 Rating</span>
                      <span className="text-[#8A92A0] font-normal">• 140+ Transactions</span>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Form */}
                <form onSubmit={handleInquirySubmit} className="space-y-3 pt-2 border-t border-[#E8E2D9]">
                  <p className="text-xs font-bold text-[#1E232A]">Direct Confidential Inquiry</p>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full bg-white border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                  />
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="Your Email *"
                    className="w-full bg-white border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                  />
                  <input
                    type="tel"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="Phone Number (Optional)"
                    className="w-full bg-white border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                  />
                  <textarea
                    rows={2}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full bg-white border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                  />
                  <button
                    type="submit"
                    disabled={isSendingInquiry}
                    className="w-full py-2.5 rounded-xl bg-[#1E232A] hover:bg-[#343D4A] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-[#F2C98A]" />
                    <span>{isSendingInquiry ? 'Sending...' : 'Send Inquiry to Agent'}</span>
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
};
