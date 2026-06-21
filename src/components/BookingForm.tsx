import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Calendar, ShieldCheck, Mail, Phone, User, Check, Sparkles, Scissors, Trash } from 'lucide-react';
import { SERVICES, STYLISTS } from '../data';
import { Booking, ServiceItem, Stylist } from '../types';

interface BookingFormProps {
  initialServiceId: string;
  initialStylistId: string;
  onBookingSubmitted: (booking: Booking) => void;
  onClose: () => void;
}

export function BookingForm({ initialServiceId, initialStylistId, onBookingSubmitted, onClose }: BookingFormProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId || SERVICES[0].id);
  const [selectedStylistId, setSelectedStylistId] = useState(initialStylistId || STYLISTS[0].id);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // Date Picker State (We design a custom 3D desk calendar showing 14 days starting tomorrow)
  const today = new Date();
  const daysArray = Array.from({ length: 14 }).map((_, idx) => {
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + idx + 1);
    return nextDate;
  });
  const [selectedDate, setSelectedDate] = useState<Date>(daysArray[0]);

  // Timeslots State
  const TIME_SLOTS = [
    { value: '09:00', label: '09:00 AM', hourRotation: 270 },
    { value: '11:00', label: '11:00 AM', hourRotation: 330 },
    { value: '13:00', label: '01:00 PM', hourRotation: 30 },
    { value: '15:00', label: '03:00 PM', hourRotation: 90 },
    { value: '17:00', label: '05:00 PM', hourRotation: 150 },
  ];
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[1]); // Default 11:00 AM

  // Steps controller
  const [isCompleted, setIsCompleted] = useState(false);
  const [newBookingId, setNewBookingId] = useState('');

  // Find info
  const selectedService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  const selectedStylist = STYLISTS.find(st => st.id === selectedStylistId) || STYLISTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert("Please fill in your primary details to reserve.");
      return;
    }

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const generatedId = `MB-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking: Booking = {
      id: generatedId,
      customerName: guestName,
      customerEmail: guestEmail,
      customerPhone: guestPhone,
      date: formattedDate,
      time: selectedTimeSlot.value,
      serviceId: selectedServiceId,
      stylistId: selectedStylistId,
      notes,
      status: 'confirmed'
    };

    setNewBookingId(generatedId);
    onBookingSubmitted(newBooking);
    setIsCompleted(true);
  };

  // Format date helper
  const formatDateLabel = (d: Date) => {
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full bg-stone-900/45 backdrop-blur-2xl border border-amber-300/10 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative font-sans text-stone-100" id="booking-wizard-container">
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: ACTIVE ENROLLMENT AND FORM */}
        {!isCompleted ? (
          <motion.div
            key="booking-form-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12"
          >
            {/* LEFT HALF: THE 3D INTERACTIVE PLANNERS (Calendar & Clock) */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-6">
              
              {/* THE 3D FLOATING DESK CALENDAR */}
              <div className="bg-stone-950/65 rounded-2xl p-5 border border-amber-300/15 shadow-md flex flex-col" id="floating-3d-calendar">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span className="text-[10px] tracking-[0.3em] font-mono text-amber-300 font-bold uppercase">
                    3D Desk Calendar
                  </span>
                </div>

                {/* Calendar Grid Slices */}
                <div className="grid grid-cols-4 gap-2.5">
                  {daysArray.map((date, dI) => {
                    const isSelected = selectedDate.getDate() === date.getDate() && selectedDate.getMonth() === date.getMonth();
                    const dayNum = date.getDate();
                    const weekDay = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const monthLabel = date.toLocaleDateString('en-US', { month: 'short' });

                    return (
                      <motion.button
                        key={dI}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        whileHover={{ y: -3, scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-2.5 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-sm ${
                          isSelected
                            ? 'bg-amber-300 border-amber-400 text-stone-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                            : 'bg-stone-900 border-stone-850 hover:bg-stone-850 hover:border-stone-700 text-stone-300'
                        }`}
                        id={`calendar-tile-${dayNum}`}
                      >
                        <span className={`text-[8px] tracking-widest uppercase font-mono ${isSelected ? 'text-stone-800' : 'text-stone-500'}`}>
                          {weekDay}
                        </span>
                        <span className="text-sm font-serif font-semibold mt-1">
                          {dayNum}
                        </span>
                        <span className={`text-[8px] uppercase mt-0.5 tracking-wider ${isSelected ? 'text-stone-700' : 'text-stone-500'}`}>
                          {monthLabel}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* THE TACTILE LUXURY CLOCK */}
              <div className="bg-stone-950/65 rounded-2xl p-5 border border-amber-300/15 shadow-md flex items-center justify-between gap-6" id="tactile-interactive-clock">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-300" />
                    <span className="text-[10px] tracking-[0.3em] font-mono text-amber-300 font-bold uppercase">
                      Chronos Ritual Clock
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-stone-400 font-light leading-relaxed">
                    Select a glowing golden slot to turn the analog clock hands.
                  </p>

                  {/* Horizontal list of timeslots */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTimeSlot.value === slot.value;
                      return (
                        <button
                          key={slot.value}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`px-2.5 py-1.5 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-stone-950 shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                              : 'bg-stone-900 text-stone-400 border border-stone-850 hover:text-stone-100'
                          }`}
                          id={`clock-slot-${slot.value}`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actual 3D Circular Clock Face */}
                <div className="relative w-28 h-28 flex-shrink-0 bg-stone-900 rounded-full border-4 border-double border-amber-300/30 flex items-center justify-center shadow-lg transform hover:scale-[1.03] transition-all">
                  {/* Subtle ticking points */}
                  <div className="absolute top-1 font-sans text-[8px] text-amber-400/40">12</div>
                  <div className="absolute bottom-1 font-sans text-[8px] text-amber-400/40">6</div>
                  <div className="absolute right-1 font-sans text-[8px] text-amber-400/40 font-mono">3</div>
                  <div className="absolute left-1 font-sans text-[8px] text-amber-400/40">9</div>

                  {/* Center pin node */}
                  <div className="absolute w-2.5 h-2.5 bg-amber-400 rounded-full border border-stone-950 z-20 shadow-[0_0_5px_rgba(251,191,36,0.8)]" />

                  {/* Clock hour hand (Rotates dynamically) */}
                  <motion.div
                    className="absolute w-1 h-8 bg-amber-400/90 rounded-full origin-bottom"
                    style={{ bottom: '50%' }}
                    animate={{ rotate: selectedTimeSlot.hourRotation }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  />

                  {/* Clock minute hand (points upright or static on 12) */}
                  <motion.div
                    className="absolute w-0.5 h-10 bg-amber-300/50 rounded-full origin-bottom"
                    style={{ bottom: '50%' }}
                    animate={{ rotate: 0 }}
                    transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  />
                </div>
              </div>

            </div>

            {/* RIGHT HALF: SERVICE SELECTION, CONTACT INFO & CONFIRMATION */}
            <form onSubmit={handleSubmit} className="md:col-span-6 space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-light tracking-wide text-stone-100 block mb-6">
                  Ritual Specifications
                </h3>

                {/* Dropdowns / Specifications Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service selection dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-widest text-stone-500 uppercase font-bold">
                      Requested Treatment
                    </label>
                    <select
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="bg-stone-950 border border-stone-800 focus:border-amber-400 rounded-lg px-3 py-2 text-xs font-sans text-stone-300 focus:outline-none transition-colors"
                      id="spec-select-service"
                    >
                      {SERVICES.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} (${service.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Stylist selection dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-widest text-stone-500 uppercase font-bold">
                      Assigned Stylist
                    </label>
                    <select
                      value={selectedStylistId}
                      onChange={(e) => setSelectedStylistId(e.target.value)}
                      className="bg-stone-950 border border-stone-800 focus:border-amber-400 rounded-lg px-3 py-2 text-xs font-sans text-stone-300 focus:outline-none transition-colors"
                      id="spec-select-stylist"
                    >
                      {STYLISTS.map(stylist => (
                        <option key={stylist.id} value={stylist.id}>
                          {stylist.name} ({stylist.role.split(' ')[0]})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact Forms */}
                <div className="space-y-4 mt-6">
                  {/* Full Name */}
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                    <input
                      type="text"
                      placeholder="GUEST FULL NAME"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none rounded-lg pl-10 pr-4 py-3 text-xs tracking-wider font-sans text-stone-200 uppercase transition-colors"
                      id="booking-input-name"
                    />
                  </div>

                  {/* Email & Phone columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                      <input
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none rounded-lg pl-10 pr-4 py-3 text-xs tracking-wider font-sans text-stone-200 uppercase transition-colors"
                        id="booking-input-email"
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                      <input
                        type="tel"
                        placeholder="PHONE NUMBER"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none rounded-lg pl-10 pr-4 py-3 text-xs tracking-wider font-sans text-stone-200 uppercase transition-colors"
                        id="booking-input-phone"
                      />
                    </div>
                  </div>

                  {/* Special requests Notes */}
                  <div className="flex flex-col gap-1.5">
                    <textarea
                      placeholder="SPECIAL REQUESTS (e.g., champagne concierge, allergy alerts)"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none rounded-lg p-3 text-xs tracking-wider font-sans text-stone-200 uppercase transition-colors resize-none"
                      id="booking-input-notes"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Reservation Action */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(251,191,36,0.2)]"
                  id="confirm-appointment-btn"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Couture Session</span>
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-stone-500 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400/60" />
                  <span>24-Hour complimentary cancellation window</span>
                </div>
              </div>
            </form>

          </motion.div>
        ) : (
          
          /* VIEW 2: CERTIFICATE COMPLETION SCREEN */
          <motion.div
            key="booking-success-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-6"
          >
            {/* Elegant Emblem */}
            <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.15)] animate-pulse">
              <Check className="w-8 h-8" />
            </div>

            {/* Glowing Golden Invitation Header */}
            <h3 className="font-serif text-2xl md:text-3xl text-stone-100 font-light tracking-widest mt-6 uppercase">
              RITUAL RESERVED
            </h3>
            <span className="text-amber-400 font-mono text-[10px] font-semibold tracking-[0.3em] uppercase block mt-1">
              Ritual Reference: {newBookingId}
            </span>

            {/* THE INVITATION CARD (Luxury Ticket looks) */}
            <div className="relative w-full max-w-md bg-stone-950 border border-amber-400/40 rounded-2xl p-6 sm:p-8 mt-8 shadow-2xl overflow-hidden font-sans text-left">
              {/* Torn ticket edge cuts using circles */}
              <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-900 border-r border-amber-400/40" />
              <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-900 border-l border-amber-400/40" />

              <span className="text-[9px] tracking-widest font-mono text-stone-500 uppercase">
                Maison de Beauté Invitation
              </span>
              <h4 className="font-serif text-lg font-light text-stone-100 tracking-wide mt-2 uppercase">
                {selectedService.name}
              </h4>
              <p className="text-[11px] text-stone-400 font-light mt-1 uppercase">
                With Master {selectedStylist.name.split(' ')[0]}
              </p>

              <div className="border-t border-dashed border-stone-850 my-5" />

              {/* Day and time stats block */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[8px] tracking-[0.2em] font-mono text-stone-500 uppercase block">
                    Date Of Ritual
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-stone-200 mt-1 uppercase">
                    {formatDateLabel(selectedDate)}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] tracking-[0.2em] font-mono text-stone-500 uppercase block">
                    Assigned Hour
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-stone-200 mt-1 uppercase">
                    {selectedTimeSlot.label}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] tracking-[0.2em] font-mono text-stone-500 uppercase block">
                    Exclusive Guest
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-stone-200 mt-1 uppercase truncate block">
                    {guestName}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] tracking-[0.2em] font-mono text-stone-500 uppercase block">
                    Atelier Rate
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-amber-300 mt-1 uppercase font-serif">
                    ${selectedService.price} (Pay on Arrival)
                  </span>
                </div>
              </div>

              {notes && (
                <div className="mt-4 pt-4 border-t border-stone-900 text-[10px] text-stone-400 italic">
                  * Guest Notes: &ldquo;{notes}&rdquo;
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={() => {
                  // Reset form to book another
                  setIsCompleted(false);
                  setGuestName('');
                  setGuestEmail('');
                  setGuestPhone('');
                  setNotes('');
                }}
                className="px-6 py-3 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
                id="book-another-btn"
              >
                Schedule Another
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-amber-300 hover:bg-amber-400 text-stone-950 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
                id="done-booking-btn"
              >
                Fermer Sanctuary
              </button>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
