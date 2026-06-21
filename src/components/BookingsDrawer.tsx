import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Scissors, Trash2, Clock, MapPin, Sparkles } from 'lucide-react';
import { Booking } from '../types';
import { SERVICES, STYLISTS } from '../data';

interface BookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onTriggerBook: () => void;
}

export function BookingsDrawer({ isOpen, onClose, bookings, onCancelBooking, onTriggerBook }: BookingsDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md cursor-pointer"
            id="bookings-drawer-backdrop"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-[100%] sm:w-[440px] z-50 bg-stone-900 border-l border-amber-300/20 shadow-[-15px_0_45px_rgba(0,0,0,0.8)] flex flex-col justify-between font-sans text-stone-100"
            id="bookings-drawer-body"
          >
            <div>
              {/* Header */}
              <div className="p-6 border-b border-stone-850 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-300" />
                  <span className="font-serif text-lg tracking-wide uppercase font-light text-stone-200">My Saved Rituals</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-stone-800 hover:border-amber-300/40 flex items-center justify-center text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
                  id="close-drawer-btn"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Booking List Container */}
              <div className="p-6 overflow-y-auto max-h-[75vh] space-y-5">
                {bookings.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center">
                    <Sparkles className="w-12 h-12 text-stone-700 mb-4 animate-pulse" />
                    <h4 className="font-serif text-lg text-stone-300 tracking-wide">No Active Reservations</h4>
                    <p className="mt-2 text-xs text-stone-500 font-light tracking-widest max-w-[240px] leading-relaxed uppercase">
                      Embark on your beauty ritual down our luxury hallway corridor.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onTriggerBook();
                      }}
                      className="mt-6 px-6 py-2.5 rounded-full bg-amber-300 text-stone-950 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer shadow-md"
                      id="drawer-arrange-appointment"
                    >
                      Arrange Appointment
                    </button>
                  </div>
                ) : (
                  bookings.map((booking) => {
                    const svc = SERVICES.find(s => s.id === booking.serviceId) || SERVICES[0];
                    const sty = STYLISTS.find(st => st.id === booking.stylistId) || STYLISTS[0];
                    
                    return (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        className="bg-stone-950/60 border border-amber-300/10 rounded-xl p-5 relative overflow-hidden group shadow-md"
                      >
                        {/* Shimmer top gold line */}
                        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
                        
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-mono text-[9px] text-amber-400/80 tracking-widest uppercase">
                              REFERENCE: {booking.id}
                            </span>
                            <h4 className="font-serif text-base text-stone-100 font-light mt-1 uppercase tracking-wide">
                              {svc.name}
                            </h4>
                          </div>

                          {/* Close/Delete Action */}
                          <button
                            onClick={() => onCancelBooking(booking.id)}
                            className="text-stone-600 hover:text-red-400 p-1.5 transition-colors duration-200 cursor-pointer"
                            title="Cancel Reservation"
                            id={`cancel-ritual-${booking.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Booking specifics summary columns */}
                        <div className="mt-4 grid grid-cols-2 gap-y-3.5 gap-x-2 border-t border-stone-900 pt-4">
                          <div className="flex items-center gap-2 text-[11px] text-stone-400 font-light leading-none uppercase">
                            <Clock className="w-3.5 h-3.5 text-amber-300/70" />
                            <span>{booking.time} slots</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-[11px] text-stone-400 font-light leading-none uppercase whitespace-nowrap truncate">
                            <Calendar className="w-3.5 h-3.5 text-amber-300/70" />
                            <span>{booking.date}</span>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] text-stone-400 font-light leading-none uppercase col-span-2">
                            <User className="w-3.5 h-3.5 text-amber-300/60" />
                            <span>Artist: {sty.name}</span>
                          </div>
                        </div>

                        {/* Cancel hint info */}
                        <p className="mt-4 text-[9px] text-stone-500 uppercase tracking-widest leading-relaxed">
                          * Present this pass at our luxury lobby check-in desk
                        </p>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="p-6 bg-stone-950/40 border-t border-stone-850 text-center">
              <span className="text-[9px] tracking-[0.3em] font-light text-stone-500 uppercase">
                Maison de Beauté, Paris
              </span>
              <p className="text-[10px] text-amber-400/80 mt-1 uppercase tracking-widest">
                Support hotline: (33) 1 42 68 53 00
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
