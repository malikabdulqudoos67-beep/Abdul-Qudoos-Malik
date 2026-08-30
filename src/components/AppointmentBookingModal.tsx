import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Car, 
  Video, 
  MapPin 
} from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { ViewingType, Appointment } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const AppointmentBookingModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    setIsBookingModalOpen, 
    bookingTargetProperty, 
    currentUser, 
    formatPrice, 
    bookAppointment,
    showToast
  } = useRealEstate();

  // Booking Form State
  const [step, setStep] = useState<'details' | 'confirmed'>('details');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('02:00 PM');
  const [viewingType, setViewingType] = useState<ViewingType>('in_person');
  const [clientName, setClientName] = useState(currentUser?.displayName || '');
  const [clientEmail, setClientEmail] = useState(currentUser?.email || '');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '+1 (555) 019-2834');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  if (!isBookingModalOpen || !bookingTargetProperty) return null;

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM (Sunset Viewing)'
  ];

  // Next 7 available dates
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + (i + 1));
    return {
      iso: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      showToast('Please provide your name, email, and contact number', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const apt = await bookAppointment({
        propertyId: bookingTargetProperty.id,
        propertyTitle: bookingTargetProperty.title,
        propertyImage: bookingTargetProperty.imageUrl,
        propertyLocation: bookingTargetProperty.location,
        propertyPrice: bookingTargetProperty.price,
        propertyListingType: bookingTargetProperty.listingType,
        userId: currentUser?.uid,
        userName: clientName,
        userEmail: clientEmail,
        userPhone: clientPhone,
        date: selectedDate,
        time: selectedTime,
        viewingType: viewingType,
        guests: guestCount,
        notes: notes
      });

      setConfirmedAppointment(apt);
      setStep('confirmed');
    } catch (err: any) {
      showToast(err?.message || 'Failed to book viewing appointment', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setStep('details');
    setConfirmedAppointment(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[32px] max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EAE4DA] my-8 relative"
      >
        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1E232A] flex items-center justify-center shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            {/* Header with Property Summary */}
            <div className="bg-[#FAF7F2] p-6 border-b border-[#EBE5DA]">
              <div className="flex items-center gap-4">
                <img
                  src={bookingTargetProperty.imageUrl}
                  alt={bookingTargetProperty.title}
                  className="w-20 h-20 rounded-2xl object-cover border border-[#E0D8CB] flex-shrink-0 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-[#FCECD7] text-[#9E6414] px-2 py-0.5 rounded">
                    <Sparkles className="w-3 h-3 text-[#C6852C]" />
                    <span>Private Viewing Reservation</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-[#1E232A] truncate">
                    {bookingTargetProperty.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#68707C]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C6852C]" />
                      {bookingTargetProperty.location}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-[#1E232A]">
                      {formatPrice(bookingTargetProperty.price, bookingTargetProperty.listingType)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Booking Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* Step 1: Viewing Format Selection */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-extrabold text-[#1E232A] tracking-wider block">
                  1. Select Preferred Viewing Experience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      type: 'in_person' as ViewingType,
                      title: 'Private Tour',
                      desc: 'On-site personal walk-through with listing director',
                      icon: Building2
                    },
                    {
                      type: 'vip_chauffeur' as ViewingType,
                      title: 'VIP Chauffeur',
                      desc: 'Luxury vehicle transfer & champagne reception',
                      icon: Car
                    },
                    {
                      type: 'video_call' as ViewingType,
                      title: 'Live 4K Call',
                      desc: 'Interactive virtual tour via FaceTime/Zoom',
                      icon: Video
                    }
                  ].map((option) => {
                    const Icon = option.icon;
                    const isSelected = viewingType === option.type;
                    return (
                      <button
                        type="button"
                        key={option.type}
                        onClick={() => setViewingType(option.type)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#FDF6ED] border-[#C6852C] ring-2 ring-[#C6852C]/30 shadow-xs'
                            : 'bg-white border-[#E8E2D9] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C6852C]' : 'text-[#7D8592]'}`} />
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C6852C]" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1E232A]">{option.title}</p>
                          <p className="text-[10px] text-[#7D8592] mt-0.5 leading-tight">{option.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date Selector */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-extrabold text-[#1E232A] tracking-wider block">
                  2. Choose Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.iso;
                    return (
                      <button
                        type="button"
                        key={item.iso}
                        onClick={() => setSelectedDate(item.iso)}
                        className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1E232A] text-white border-[#1E232A] shadow-sm'
                            : 'bg-white text-[#1E232A] border-[#E8E2D9] hover:bg-[#F7F4EE]'
                        }`}
                      >
                        <span className="block text-[10px] uppercase font-bold opacity-75">{item.dayName}</span>
                        <span className="block text-base font-extrabold">{item.dayNum}</span>
                        <span className="block text-[9px] opacity-75">{item.month}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Time Slot Selector */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-extrabold text-[#1E232A] tracking-wider block">
                  3. Select Time Window
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#E5A853] text-white border-[#E5A853] shadow-xs'
                            : 'bg-white text-[#1E232A] border-[#E8E2D9] hover:bg-[#F7F4EE]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Contact Details */}
              <div className="space-y-3 pt-2 border-t border-[#F0EBE1]">
                <label className="text-xs uppercase font-extrabold text-[#1E232A] tracking-wider block">
                  4. Confidential Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#8A92A0] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8A92A0] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Lord Alistair Vance"
                        className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl py-2 pl-9 pr-3 text-xs font-semibold text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#8A92A0] mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8A92A0] absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="client@luxuryholding.com"
                        className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl py-2 pl-9 pr-3 text-xs font-semibold text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#8A92A0] mb-1">
                      Direct Mobile / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8A92A0] absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl py-2 pl-9 pr-3 text-xs font-semibold text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#8A92A0] mb-1">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-[#8A92A0] absolute left-3 top-3" />
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl py-2 pl-9 pr-3 text-xs font-semibold text-[#1E232A] focus:outline-none focus:border-[#C6852C] appearance-none"
                      >
                        <option value={1}>1 Guest (Private)</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={5}>5+ Guests (VIP Party)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8A92A0] mb-1">
                    Special Requests or Security Protocol (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g. Require NDA beforehand, interested in purchasing with full designer furnishings, chauffeur pickup from Armani Hotel."
                    className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#1E232A] hover:bg-[#343D4A] text-white font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <CalendarIcon className="w-4 h-4 text-[#F2C98A]" />
                  <span>{isSubmitting ? 'Confirming Appointment...' : 'Confirm Private Viewing'}</span>
                </button>
                <p className="text-[11px] text-center text-[#8A92A0] mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6852C]" />
                  <span>Strict confidentiality guaranteed under Abdul's Real Estate Private Wealth Protocol</span>
                </p>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#10B981] mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold text-[#C6852C] tracking-widest">
                Viewing Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E232A]">
                Appointment Successfully Scheduled
              </h2>
              <p className="text-xs sm:text-sm text-[#68707C] max-w-md mx-auto">
                Thank you, <strong>{confirmedAppointment?.userName}</strong>. Our senior concierge has received your request for <strong>{confirmedAppointment?.propertyTitle}</strong>.
              </p>
            </div>

            {/* Booking Details Ticket */}
            <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#E8E2D9] max-w-md mx-auto text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#E8E2D9] pb-2">
                <span className="text-[#8A92A0] font-medium">Reservation Code:</span>
                <span className="font-bold text-[#1E232A] font-mono">{confirmedAppointment?.id}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E2D9] pb-2">
                <span className="text-[#8A92A0] font-medium">Date & Time:</span>
                <span className="font-bold text-[#1E232A]">{confirmedAppointment?.date} at {confirmedAppointment?.time}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E2D9] pb-2">
                <span className="text-[#8A92A0] font-medium">Viewing Type:</span>
                <span className="font-bold uppercase text-[#C6852C]">{confirmedAppointment?.viewingType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A92A0] font-medium">Assigned Advisor:</span>
                <span className="font-bold text-[#1E232A]">Abdul Malik (Principal)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-8 py-3 bg-[#1E232A] text-white rounded-full text-xs font-bold hover:bg-[#343D4A] transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
