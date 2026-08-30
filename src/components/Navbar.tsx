import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Calendar, 
  Heart, 
  User, 
  Sparkles, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  PlusCircle,
  Calculator,
  Compass,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { CurrencyCode } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    isAdmin, 
    logout, 
    setIsAuthModalOpen, 
    currency, 
    setCurrency, 
    favorites, 
    appointments,
    activeView, 
    setActiveView,
    setIsMortgageCalcOpen,
    siteContent
  } = useRealEstate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const pendingAppointmentsCount = appointments.filter(a => a.status === 'pending' || a.status === 'confirmed').length;

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      {/* Top mini announcement banner */}
      {siteContent.announcementBanner?.enabled && (
        <div className="bg-[#1E232A] text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
          <span>{siteContent.announcementBanner.text}</span>
          <button 
            onClick={() => setActiveView('listings')} 
            className="text-[#E5A853] hover:underline font-semibold ml-1 cursor-pointer"
          >
            {siteContent.announcementBanner.linkText || 'View Listings →'}
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand matching reference */}
          <div 
            onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D99A40] via-[#C6852C] to-[#8C5815] p-[1.5px] shadow-sm group-hover:shadow-md transition-all">
              <div className="w-full h-full bg-[#1A1F26] rounded-[14px] flex items-center justify-center text-[#F2C98A]">
                <Building2 className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold tracking-tight text-xl text-[#1E232A]">
                  ABDUL'S
                </span>
                <span className="text-xs uppercase font-bold tracking-widest text-[#C6852C] bg-[#F7EFE2] px-1.5 py-0.5 rounded">
                  ESTATE
                </span>
              </div>
              <p className="text-[10px] uppercase font-semibold tracking-widest text-[#7D8592] -mt-0.5">
                Luxury Properties & Private Mansions
              </p>
            </div>
          </div>

          {/* Center Navigation Links matching reference */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => { setActiveView('home'); }}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
                activeView === 'home' 
                  ? 'text-[#1E232A] bg-[#EFE9DF]' 
                  : 'text-[#5C6470] hover:text-[#1E232A] hover:bg-[#F3EEE6]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveView('listings'); }}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
                activeView === 'listings' 
                  ? 'text-[#1E232A] bg-[#EFE9DF]' 
                  : 'text-[#5C6470] hover:text-[#1E232A] hover:bg-[#F3EEE6]'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => { setActiveView('ai_architect'); }}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'ai_architect' 
                  ? 'text-[#94580D] bg-[#FCECD7] border border-[#F2C98A]' 
                  : 'text-[#94580D] bg-[#FDF6ED] hover:bg-[#FCECD7]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6852C]" />
              <span>AI Architect Studio</span>
            </button>
            <button
              onClick={() => { setActiveView('appointments'); }}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 cursor-pointer relative ${
                activeView === 'appointments' 
                  ? 'text-[#1E232A] bg-[#EFE9DF]' 
                  : 'text-[#5C6470] hover:text-[#1E232A] hover:bg-[#F3EEE6]'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#7D8592]" />
              <span>Bookings</span>
              {pendingAppointmentsCount > 0 && (
                <span className="w-5 h-5 bg-[#C6852C] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {pendingAppointmentsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMortgageCalcOpen(true)}
              className="px-3.5 py-2 text-sm font-medium text-[#5C6470] hover:text-[#1E232A] hover:bg-[#F3EEE6] rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#7D8592]" />
              <span>Mortgage</span>
            </button>
            <button
              onClick={() => { setActiveView('about'); }}
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
                activeView === 'about' 
                  ? 'text-[#1E232A] bg-[#EFE9DF]' 
                  : 'text-[#5C6470] hover:text-[#1E232A] hover:bg-[#F3EEE6]'
              }`}
            >
              About Us
            </button>
          </nav>

          {/* Right Action Tools & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Switcher */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-[#EFEAE2] hover:bg-[#E7E0D6] border border-[#DDD6CB] text-[#1E232A] text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C6852C] cursor-pointer appearance-none pr-6 transition-all"
                title="Select Currency"
              >
                <option value="USD">USD ($)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-[#7D8592] text-[10px]">
                ▼
              </div>
            </div>

            {/* Saved Favorites button */}
            <button
              onClick={() => { setActiveView('listings'); }}
              className="relative p-2 rounded-xl text-[#5C6470] hover:text-[#C6852C] hover:bg-[#EFE9DF] transition-all cursor-pointer"
              title="Saved Favorites"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D9534F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Admin Dashboard shortcut if admin */}
            {isAdmin && (
              <button
                onClick={() => setActiveView('admin')}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeView === 'admin'
                    ? 'bg-[#1E232A] text-[#F2C98A] shadow'
                    : 'bg-[#2B323D] text-[#E0E5EC] hover:bg-[#1E232A]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#D99A40]" />
                <span>Admin Panel</span>
              </button>
            )}

            {/* User Profile / Sign In */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-[#EFE9DF] hover:bg-[#E6DEC0] border border-[#DDD6CB] transition-all cursor-pointer"
                >
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName} 
                      className="w-7 h-7 rounded-full object-cover border border-[#C6852C]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#1E232A] text-[#F2C98A] flex items-center justify-center font-bold text-xs">
                      {currentUser.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-bold text-[#1E232A] max-w-[100px] truncate hidden sm:inline">
                    {currentUser.displayName.split(' ')[0]}
                  </span>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E8E2D9] py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-[#F0EBE1]">
                      <p className="text-xs text-[#7D8592] font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-[#1E232A] truncate">{currentUser.displayName}</p>
                      <p className="text-[11px] text-[#7D8592] truncate">{currentUser.email}</p>
                      {currentUser.role === 'admin' && (
                        <span className="inline-block mt-1 text-[10px] font-bold bg-[#FDF6ED] text-[#C6852C] border border-[#F2C98A] px-2 py-0.5 rounded-full">
                          Executive Admin
                        </span>
                      )}
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => { setActiveView('admin'); setIsUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1E232A] hover:bg-[#F7F4EE] flex items-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#C6852C]" />
                        <span>Manage Properties & CMS</span>
                      </button>
                    )}

                    <button
                      onClick={() => { setActiveView('appointments'); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1E232A] hover:bg-[#F7F4EE] flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#7D8592]" />
                      <span>My Viewing Appointments</span>
                    </button>

                    <button
                      onClick={() => { setActiveView('ai_architect'); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1E232A] hover:bg-[#F7F4EE] flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#C6852C]" />
                      <span>AI Architectural Visualizer</span>
                    </button>

                    <div className="border-t border-[#F0EBE1] my-1"></div>

                    <button
                      onClick={() => { logout(); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-[#D9534F] hover:bg-[#FDF2F2] flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-[#1E232A] bg-[#EFE9DF] hover:bg-[#E5DDCF] border border-[#DDD6CB] rounded-full transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="hidden sm:inline-flex px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#1E232A] hover:bg-[#2F3742] rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  Join VIP Club
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#1E232A] hover:bg-[#EFE9DF] rounded-xl cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F5] border-b border-[#E8E2D9] px-4 pt-2 pb-6 space-y-3 animate-in fade-in">
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => { setActiveView('home'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 text-center text-sm font-bold rounded-xl ${
                activeView === 'home' ? 'bg-[#1E232A] text-white' : 'bg-[#EFE9DF] text-[#1E232A]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveView('listings'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 text-center text-sm font-bold rounded-xl ${
                activeView === 'listings' ? 'bg-[#1E232A] text-white' : 'bg-[#EFE9DF] text-[#1E232A]'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => { setActiveView('ai_architect'); setIsMobileMenuOpen(false); }}
              className="p-2.5 text-center text-sm font-bold rounded-xl bg-[#FCECD7] text-[#94580D] flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#C6852C]" />
              <span>AI Studio</span>
            </button>
            <button
              onClick={() => { setActiveView('appointments'); setIsMobileMenuOpen(false); }}
              className="p-2.5 text-center text-sm font-bold rounded-xl bg-[#EFE9DF] text-[#1E232A] flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-[#7D8592]" />
              <span>Bookings ({pendingAppointmentsCount})</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { setIsMortgageCalcOpen(true); setIsMobileMenuOpen(false); }}
              className="flex-1 p-2.5 text-xs font-semibold rounded-xl bg-[#EFE9DF] text-[#1E232A] flex items-center justify-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Mortgage Calculator</span>
            </button>
            {isAdmin && (
              <button
                onClick={() => { setActiveView('admin'); setIsMobileMenuOpen(false); }}
                className="flex-1 p-2.5 text-xs font-bold rounded-xl bg-[#1E232A] text-[#F2C98A] flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin CMS</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
