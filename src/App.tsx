import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DoubleDoorsEntrance } from './components/DoubleDoorsEntrance';
import { NavigationBar } from './components/NavigationBar';
import { CorridorView } from './components/CorridorView';
import { InteractiveCards } from './components/InteractiveCards';
import { BookingForm } from './components/BookingForm';
import { BookingsDrawer } from './components/BookingsDrawer';
import { Booking } from './types';
import { SERVICES, STYLISTS } from './data';
import { Sparkles, Calendar, Compass, Shield, Clock } from 'lucide-react';

export default function App() {
  const [isEntranceActive, setIsEntranceActive] = useState(true);
  const [activeTab, setActiveTab] = useState<'corridor' | 'services' | 'stylists' | 'testimonials' | 'booking'>('corridor');
  const [activeCategory, setActiveCategory] = useState<string>('hair');
  
  // High-End Scheduling Pre-selections
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string>('');
  const [preSelectedStylistId, setPreSelectedStylistId] = useState<string>('');

  // Local storage synchronized bookings list
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load bookings from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('maison_beaute_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not retrieve local storage bookings.", e);
    }
  }, []);

  // Sync back to local storage
  const handleBookingSubmitted = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('maison_beaute_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error("Could not write bookings to local storage", e);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.filter(b => b.id !== bookingId);
    setBookings(updated);
    try {
      localStorage.setItem('maison_beaute_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error("Could not write bookings to local storage", e);
    }
  };

  // Pre-select service/stylist and automatically jump to the scheduling wizard tab
  const handleSelectServiceAndStylist = (serviceId: string, stylistId: string) => {
    setPreSelectedServiceId(serviceId);
    setPreSelectedStylistId(stylistId);
    setActiveTab('booking');
    
    // Auto-scroll to pricing or booking element if any
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Jump from corridor rooms direct to pricing columns
  const handleEnterServiceCategory = (category: string) => {
    setActiveCategory(category);
    setActiveTab('services');
  };

  // Jump from corridor room direct to booking wizard with related parameters pre-configured
  const handleInstantBookFromCorridor = (category: string) => {
    // Find first service & stylist corresponding to category
    const foundService = SERVICES.find(s => s.category === category);
    const foundStylist = STYLISTS.find(st => {
      if (category === 'hair') return st.id === 'st1';
      if (category === 'spa') return st.id === 'st2';
      return st.id === 'st3';
    });

    handleSelectServiceAndStylist(
      foundService?.id || SERVICES[0].id,
      foundStylist?.id || STYLISTS[0].id
    );
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-300 selection:text-stone-950 overflow-x-hidden antialiased">
      <AnimatePresence mode="wait">
        
        {/* CINEMATIC INTRO DOOR OPENER SCENE */}
        {isEntranceActive ? (
          <motion.div
            key="entrance-scene"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-screen"
          >
            <DoubleDoorsEntrance onCompleted={() => setIsEntranceActive(false)} />
          </motion.div>
        ) : (
          
          /* CORE IMMERSIVE WEB LAYOUT */
          <motion.div
            key="core-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative flex-1 flex flex-col justify-between"
          >
            {/* Nav Bar */}
            <NavigationBar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab as any);
                // Clear pre-selections if clicking standard booking tab manually
                if (tab === 'booking' && !preSelectedServiceId) {
                  setPreSelectedServiceId(SERVICES[0].id);
                  setPreSelectedStylistId(STYLISTS[0].id);
                }
              }}
              onOpenBookings={() => setIsDrawerOpen(true)}
              bookingsCount={bookings.length}
            />

            {/* Main Tabs Container */}
            <main className="flex-1 w-full relative">
              <AnimatePresence mode="wait">
                
                {/* TAB 1: IMMERSIVE SCROLLING CORRIDOR OF LUXURY SUITES */}
                {activeTab === 'corridor' && (
                  <motion.div
                    key="corridor-tab"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                  >
                    <CorridorView
                      onEnterServiceCategory={handleEnterServiceCategory}
                      onInstantBook={handleInstantBookFromCorridor}
                    />
                  </motion.div>
                )}

                {/* TAB 2, 3 & 4: HIGH-END CARDS (Services, Stylists, Testimonials) */}
                {(activeTab === 'services' || activeTab === 'stylists' || activeTab === 'testimonials') && (
                  <motion.div
                    key="interactive-cards-tab"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6 }}
                    className="w-full pt-16"
                  >
                    <InteractiveCards
                      activeCategory={activeCategory}
                      onSetCategory={setActiveCategory}
                      onSelectServiceAndStylist={handleSelectServiceAndStylist}
                    />
                  </motion.div>
                )}

                {/* TAB 5: FRICTIONLESS SCHEDULING WIZARD */}
                {activeTab === 'booking' && (
                  <motion.div
                    key="booking-form-tab"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-5xl mx-auto px-6 py-32 flex flex-col"
                  >
                    <div className="text-center mb-10">
                      <span className="text-[10px] tracking-[0.4em] text-amber-400 font-bold uppercase block mb-3">
                        RITUAL SCHEDULER
                      </span>
                      <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100 uppercase tracking-wider leading-tight">
                        Reserve Your Session
                      </h2>
                      <p className="mt-4 text-xs text-stone-400 font-light max-w-md mx-auto uppercase tracking-widest leading-relaxed">
                        Customize your beauty calendar. Synchronize with our world-class stylist directors.
                      </p>
                    </div>

                    <BookingForm
                      initialServiceId={preSelectedServiceId}
                      initialStylistId={preSelectedStylistId}
                      onBookingSubmitted={(newB) => {
                        handleBookingSubmitted(newB);
                        // Trigger opening of reservations drawer to review
                        setTimeout(() => {
                          setIsDrawerOpen(true);
                        }, 500);
                      }}
                      onClose={() => setActiveTab('corridor')}
                    />
                  </motion.div>
                )}

              </AnimatePresence>
            </main>

            {/* My Bookings Slider Drawer */}
            <BookingsDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              onTriggerBook={() => {
                setPreSelectedServiceId(SERVICES[0].id);
                setPreSelectedStylistId(STYLISTS[0].id);
                setActiveTab('booking');
              }}
            />

            {/* High-Contrast Luxury Footer */}
            <footer className="bg-stone-950 border-t border-stone-900 py-12 px-6 text-center select-none z-30">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="font-serif text-lg font-light tracking-[0.25em] text-stone-100 uppercase">
                    Maison<span className="text-amber-300 font-bold font-sans">B.</span>
                  </span>
                  <p className="mt-2 text-[10px] text-stone-500 font-light tracking-[0.2em] uppercase leading-relaxed text-center md:text-left">
                    © 2026 MAISON DE BEAUTÉ. ALL RIGHTS RESERVED. PARIS • TOKYO • NEW YORK
                  </p>
                </div>
                
                {/* Security and safety symbols */}
                <div className="flex items-center gap-6 text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                  <div className="flex items-center gap-1.5" title="Complimentary cancellation">
                    <Shield className="w-3.5 h-3.5 text-amber-400/80" />
                    <span>SECURE CONCIERGE</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                    <span>24/7 RESERVATIONS</span>
                  </div>
                </div>
              </div>
            </footer>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
