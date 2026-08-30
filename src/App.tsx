import React from 'react';
import { RealEstateProvider, useRealEstate } from './context/RealEstateContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsProofSection } from './components/StatsProofSection';
import { FilterBar } from './components/FilterBar';
import { PropertyListings } from './components/PropertyListings';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { AuthModal } from './components/AuthModal';
import { MortgageCalculatorModal } from './components/MortgageCalculatorModal';
import { AiArchitectStudio } from './components/AiArchitectStudio';
import { AdminPanel } from './components/AdminPanel';
import { AppointmentsView } from './components/AppointmentsView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { Sparkles, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeView, setActiveView } = useRealEstate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#1E232A]">
      {/* Global Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <div className="space-y-4">
            <HeroSection />
            <StatsProofSection />
            <FilterBar />
            <PropertyListings />

            {/* AI Architect Studio Teaser Banner */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="bg-[#1E232A] rounded-[36px] p-8 sm:p-12 text-white relative overflow-hidden border border-[#343E4E] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6852C]/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 space-y-3 max-w-xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#353D4B] text-[#F2C98A] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5A853]" />
                    <span>Gemini 3 Pro Architectural Engine</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                    Envision Your Bespoke <span className="font-serif-luxury italic text-[#F2C98A] font-normal">Dream Estate</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A0AAB8] leading-relaxed">
                    Generate bespoke ultra-high-definition architectural renderings in 1K, 2K, or 4K resolution using prompt intelligence.
                  </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => setActiveView('ai_studio')}
                    className="px-8 py-4 bg-[#E5A853] hover:bg-[#D99A40] text-white font-heading font-extrabold text-xs sm:text-sm rounded-full transition-all shadow-lg flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>Launch AI Studio (1K / 2K / 4K)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeView === 'listings' && (
          <div className="pt-4">
            <FilterBar />
            <PropertyListings />
          </div>
        )}

        {activeView === 'ai_studio' && <AiArchitectStudio />}

        {activeView === 'appointments' && <AppointmentsView />}

        {activeView === 'admin' && <AdminPanel />}

        {activeView === 'about' && <AboutView />}
      </main>

      {/* Global Modals */}
      <PropertyDetailModal />
      <AppointmentBookingModal />
      <AuthModal />
      <MortgageCalculatorModal />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RealEstateProvider>
      <MainAppContent />
    </RealEstateProvider>
  );
}
