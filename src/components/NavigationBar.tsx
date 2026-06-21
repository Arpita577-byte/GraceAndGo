import React from 'react';
import { Calendar, UserCheck, Scissors, Sparkles, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenBookings: () => void;
  bookingsCount: number;
}

export function NavigationBar({ activeTab, onTabChange, onOpenBookings, bookingsCount }: NavigationBarProps) {
  const navItems = [
    { id: 'corridor', label: 'La Galerie', icon: Sparkles },
    { id: 'services', label: 'Couture Services', icon: Scissors },
    { id: 'stylists', label: 'Master Stylists', icon: UserCheck },
    { id: 'testimonials', label: 'Reviews', icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-5xl transition-all duration-300 font-sans" id="glass-nav-bar">
      <div className="bg-stone-900/70 backdrop-blur-xl border border-amber-300/20 rounded-full px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        
        {/* Logo / Brand */}
        <div 
          onClick={() => onTabChange('corridor')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="nav-logo"
        >
          <span className="font-serif text-sm sm:text-base tracking-[0.25em] font-light text-stone-100 uppercase group-hover:text-amber-300 transition-colors duration-300">
            Maison<span className="text-amber-300 ml-1 font-bold font-sans">B.</span>
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive ? 'text-amber-100 font-semibold' : 'text-stone-400 hover:text-stone-100'
                }`}
                id={`nav-tab-${item.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-bg"
                    className="absolute inset-0 bg-amber-400/10 border border-amber-400/20 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 text-amber-300/80" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Button & Miniature Clock */}
        <div className="flex items-center gap-3">
          {/* Quick Schedule Button */}
          <button
            onClick={() => onTabChange('booking')}
            className={`px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'booking'
                ? 'bg-amber-300 text-stone-900 shadow-[0_0_15px_rgba(251,191,36,0.5)] border border-amber-400'
                : 'bg-stone-900 border border-amber-300/30 text-amber-300 hover:bg-stone-800'
            }`}
            id="nav-schedule-btn"
          >
            Book Session
          </button>

          {/* Cart / Bookings list counter */}
          <button
            onClick={onOpenBookings}
            className="relative w-9 h-9 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-300 hover:border-amber-300/40 transition-colors duration-300 cursor-pointer"
            title="My Booked Rituals"
            id="nav-bookings-button"
          >
            <Calendar className="w-4 h-4" />
            {bookingsCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-stone-950 font-sans font-bold text-[9px] rounded-full flex items-center justify-center border border-stone-900"
              >
                {bookingsCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Tiny banner for mobile */}
      <div className="md:hidden flex justify-center gap-4 mt-2">
        <div className="bg-stone-900/80 backdrop-blur-md border border-amber-300/10 rounded-full px-4 py-1 flex gap-4 text-[9px] tracking-widest text-stone-400 uppercase">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={activeTab === item.id ? "text-amber-300 font-bold" : "text-stone-400"}
              id={`mobile-nav-${item.id}`}
            >
              {item.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
