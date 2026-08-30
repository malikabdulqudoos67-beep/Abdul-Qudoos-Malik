import React from 'react';
import { Calendar, Clock, MapPin, Building2, CheckCircle2, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { motion } from 'motion/react';

export const AppointmentsView: React.FC = () => {
  const { appointments, currentUser, formatPrice, setActiveView, deleteAppointment, showToast } = useRealEstate();

  // If user is logged in, show their appointments or all if none
  const userAppointments = currentUser 
    ? appointments.filter(a => a.userId === currentUser.uid || a.userEmail === currentUser.email)
    : appointments;

  const displayList = userAppointments.length > 0 ? userAppointments : appointments;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-[#1E232A] rounded-[32px] p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#343D4A] shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E3744] text-[#F2C98A] text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#C6852C]" />
            <span>Private Showing Itinerary</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Your Scheduled <span className="font-serif-luxury italic text-[#F2C98A] font-normal">Viewings</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A0AAB8] max-w-xl">
            Track your reserved private walkthroughs, VIP chauffeur transfers, and confirmed virtual tours.
          </p>
        </div>

        <button
          onClick={() => setActiveView('listings')}
          className="px-6 py-3 bg-[#E5A853] hover:bg-[#D99A40] text-white text-xs font-extrabold rounded-full transition-all flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          <span>Book More Properties</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Appointment Cards */}
      {displayList.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[32px] border border-[#E8E2D9] p-8 space-y-4">
          <Calendar className="w-14 h-14 text-[#C6852C] mx-auto opacity-70 stroke-1" />
          <h3 className="text-xl font-bold text-[#1E232A]">No viewings currently scheduled</h3>
          <p className="text-xs text-[#7D8592] max-w-md mx-auto">
            Browse our signature collection of villas, penthouses, and private estates to reserve a private viewing.
          </p>
          <button
            onClick={() => setActiveView('listings')}
            className="px-6 py-2.5 bg-[#1E232A] text-white rounded-full text-xs font-bold hover:bg-[#343D4A] cursor-pointer"
          >
            Explore Listings
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-[28px] overflow-hidden border border-[#EAE4DA] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Thumbnail & Badges */}
              <div className="relative aspect-[16/10] bg-[#1E232A]">
                <img
                  src={apt.propertyImage}
                  alt={apt.propertyTitle}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="absolute top-3.5 left-3.5 flex gap-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs ${
                    apt.status === 'confirmed' ? 'bg-[#10B981] text-white' :
                    apt.status === 'pending' ? 'bg-[#E5A853] text-white' :
                    'bg-gray-800 text-white'
                  }`}>
                    {apt.status}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3.5 text-white font-bold text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F2C98A]" />
                  <span>{apt.propertyLocation}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-heading font-extrabold text-base text-[#1E232A] line-clamp-1">
                    {apt.propertyTitle}
                  </h3>

                  {/* Date & Time Highlight Box */}
                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D9] space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#1E232A]">
                      <Calendar className="w-4 h-4 text-[#C6852C]" />
                      <span>{apt.date}</span>
                      <span className="text-[#8A92A0]">•</span>
                      <Clock className="w-4 h-4 text-[#C6852C]" />
                      <span>{apt.time}</span>
                    </div>
                    <div className="text-[11px] text-[#5C6470] flex justify-between">
                      <span>Type: <strong className="uppercase text-[#94580D]">{apt.viewingType.replace('_', ' ')}</strong></span>
                      <span>Guests: <strong>{apt.guests}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#8A92A0]">Assigned: Abdul Malik</span>
                  <button
                    onClick={() => {
                      if (confirm('Cancel this viewing appointment?')) {
                        deleteAppointment(apt.id);
                      }
                    }}
                    className="text-[#D9534F] hover:underline font-bold text-[11px] cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
};
