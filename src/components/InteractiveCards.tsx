import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, ShieldCheck, Heart, UserPlus, Scissors, Sparkle, Milestone } from 'lucide-react';
import { SERVICES, STYLISTS, TESTIMONIALS, SERVICE_CATEGORIES } from '../data';
import { ServiceItem, Stylist } from '../types';

interface InteractiveCardsProps {
  activeCategory: string;
  onSetCategory: (cat: string) => void;
  onSelectServiceAndStylist: (serviceId: string, stylistId: string) => void;
}

export function InteractiveCards({ activeCategory, onSetCategory, onSelectServiceAndStylist }: InteractiveCardsProps) {
  const [hoveredStylist, setHoveredStylist] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'services' | 'stylists' | 'testimonials'>('services');

  // Filter services by category
  const activeServices = SERVICES.filter(service => service.category === activeCategory);

  return (
    <div className="w-full bg-stone-950 text-stone-100 py-20 px-6 font-sans relative overflow-hidden" id="interactive-features-section">
      {/* Decorative Gold Elements */}
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-500/5 blur-[120px] pointer-events-none" />

      {/* Decorative Golden Line Divider */}
      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-16" />

      {/* Section Global Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <span className="text-xs font-mono tracking-[0.4em] text-amber-400 font-bold uppercase block mb-3">
          LES EXPERIENCES DE COUTURE
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-stone-100 uppercase leading-snug">
          Couture Cabinet & Stylists
        </h2>
        <p className="mt-4 text-xs sm:text-sm font-light text-stone-400 max-w-xl mx-auto uppercase tracking-widest leading-relaxed">
          Select or hover your luxurious treatment. Meet our global director suite.
        </p>

        {/* Feature Sections Navigation Pills */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {(['services', 'stylists', 'testimonials'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab 
                  ? 'bg-amber-300 text-stone-950 font-black shadow-[0_5px_15px_rgba(251,191,36,0.3)]' 
                  : 'bg-stone-900/60 border border-stone-850 text-stone-400 hover:text-stone-100'
              }`}
              id={`features-nav-${tab}`}
            >
              {tab === 'services' && 'Couture Menu'}
              {tab === 'stylists' && 'Master Stylists'}
              {tab === 'testimonials' && 'Guest Critiques'}
            </button>
          ))}
        </div>
      </div>

      {/* Inner Screen Display (Swaps dynamically depending on the selected activeTab) */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: COUTURE SERVICES CAB PREVIEW */}
          {activeTab === 'services' && (
            <motion.div
              key="services-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Category Switches (3D feeling pills) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="services-categories-grid">
                {SERVICE_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => onSetCategory(cat.id)}
                      className={`relative p-5 text-left rounded-xl border transition-all duration-500 cursor-pointer group flex flex-col justify-between ${
                        isActive
                          ? 'bg-stone-900 border-amber-300/60 shadow-[0_10px_30px_rgba(251,191,36,0.08)]'
                          : 'bg-stone-900/40 border-stone-850 hover:bg-stone-900/70 hover:border-stone-800'
                      }`}
                      id={`service-cat-button-${cat.id}`}
                    >
                      {/* Active golden border spotlight */}
                      {isActive && (
                        <div className="absolute inset-0 border border-amber-400/40 rounded-xl pointer-events-none" />
                      )}
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[10px] font-mono font-bold tracking-widest ${isActive ? 'text-amber-400' : 'text-stone-500'}`}>
                          {cat.id.toUpperCase()} RITUAL
                        </span>
                        <Sparkle className={`w-3.5 h-3.5 transition-transform duration-700 ${isActive ? 'text-amber-300 rotate-45 scale-110' : 'text-stone-700'}`} />
                      </div>
                      
                      <div className="mt-6">
                        <h3 className={`font-serif text-lg tracking-wide ${isActive ? 'text-stone-100' : 'text-stone-300'}`}>
                          {cat.name}
                        </h3>
                        <p className="mt-1 text-xs text-stone-400 font-light leading-normal line-clamp-1">
                          {cat.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Rotating Services Pricing List / Luxury Card Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="services-items-grid">
                {activeServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      y: -8, 
                      borderColor: 'rgba(251, 191, 36, 0.4)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.7), 0 0 15px rgba(251,191,36,0.05)'
                    }}
                    className="bg-stone-900/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-stone-850 flex flex-col justify-between shadow-lg relative group transition-all duration-350"
                  >
                    {/* Glowing Accent */}
                    <div className="absolute -top-[1px] left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div>
                      {/* Price Badge */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-amber-300/80 tracking-widest uppercase font-medium">
                          {service.duration}
                        </span>
                        <span className="font-serif text-2xl text-amber-300">
                          ${service.price}
                        </span>
                      </div>

                      {/* Info */}
                      <h4 className="mt-5 font-serif text-xl font-light tracking-wide text-stone-100 uppercase group-hover:text-amber-200 transition-colors">
                        {service.name}
                      </h4>
                      <p className="mt-3 text-xs text-stone-400 leading-relaxed font-light font-sans">
                        {service.description}
                      </p>
                    </div>

                    <div className="border-t border-stone-800/60 my-6" />

                    {/* Quick Booking CTA linking individual services */}
                    <button
                      onClick={() => {
                        // Pre-select stylist matching category or default
                        const matchedStylist = STYLISTS.find(stylist => 
                          stylist.specialties.some(spec => 
                            service.name.toLowerCase().includes(spec.toLowerCase().split(' ')[0])
                          )
                        ) || STYLISTS[index % STYLISTS.length];
                        onSelectServiceAndStylist(service.id, matchedStylist.id);
                      }}
                      className="w-full py-2.5 rounded-full bg-stone-950 hover:bg-amber-300 text-stone-400 hover:text-stone-950 border border-stone-800 hover:border-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                      id={`book-service-${service.id}`}
                    >
                      <span>Reserve Ritual</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: COUTURE FLIPPABLE STYLISTS */}
          {activeTab === 'stylists' && (
            <motion.div
              key="stylists-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 py-4"
              id="stylists-grid"
            >
              {STYLISTS.map((stylist) => (
                <div
                  key={stylist.id}
                  className="flex flex-col items-center justify-center group pointer-events-auto h-[380px]"
                  style={{ perspective: '1000px' }}
                  onMouseEnter={() => setHoveredStylist(stylist.id)}
                  onMouseLeave={() => setHoveredStylist(null)}
                >
                  {/* Outer 3D Card flippable wrapper */}
                  <motion.div
                    className="relative w-full h-full text-center transition-transform duration-700 ease-out"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transform: hoveredStylist === stylist.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    
                    {/* FRONT OF THE STYLIST AVATAR CARD */}
                    <div 
                      className="absolute inset-0 bg-stone-900/60 backdrop-blur-md rounded-2xl p-8 border border-stone-850 flex flex-col items-center justify-center shadow-lg pointer-events-none"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Circular 3D Medallion Avatar */}
                      <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-amber-200/20 via-stone-800 to-amber-500/20 p-[3px] shadow-[0_10px_25px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-500">
                        <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center border border-amber-300/10">
                          <span className="font-serif text-3xl font-light tracking-widest text-amber-300">
                            {stylist.avatar}
                          </span>
                        </div>
                        {/* Rating Star badge */}
                        <div className="absolute -bottom-1 -right-1 bg-amber-400 text-stone-950 rounded-full py-0.5 px-2 flex items-center gap-0.5 shadow-md border border-stone-800">
                          <Star className="w-2.5 h-2.5 fill-stone-950 stroke-none" />
                          <span className="font-sans font-bold text-[9px]">{stylist.rating}</span>
                        </div>
                      </div>

                      {/* Text */}
                      <h3 className="mt-8 font-serif text-xl font-light text-stone-100 tracking-wide uppercase">
                        {stylist.name}
                      </h3>
                      <p className="mt-2 text-xs text-amber-300 font-medium tracking-widest uppercase font-mono">
                        {stylist.role}
                      </p>

                      <div className="mt-5 border-t border-stone-800 w-12" />

                      {/* Badges */}
                      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5">
                        {stylist.specialties.slice(0, 2).map((spec, sI) => (
                          <span key={sI} className="px-2.5 py-1 text-[9px] font-medium tracking-wider bg-stone-950 border border-stone-800 rounded-full text-stone-300">
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* Instructions */}
                      <p className="text-[10px] text-stone-500 tracking-widest mt-6 uppercase group-hover:text-amber-400 transition-colors">
                        Hover or Tap to Inspect Bio
                      </p>
                    </div>

                    {/* BACK OF THE STYLIST AVATAR CARD */}
                    <div 
                      className="absolute inset-0 bg-stone-900 border-2 border-amber-300/30 rounded-2xl p-6 flex flex-col justify-between shadow-2xl text-left"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)' 
                      }}
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-stone-950 border border-amber-300/20 flex items-center justify-center text-amber-300 font-serif text-xs">
                            {stylist.avatar}
                          </div>
                          <div>
                            <h4 className="font-serif text-sm font-bold text-stone-200 tracking-wider">
                              {stylist.name}
                            </h4>
                            <p className="text-[9px] text-amber-400 font-mono uppercase tracking-widest">
                              {stylist.role.split('&')[0]}
                            </p>
                          </div>
                        </div>

                        {/* Bio */}
                        <p className="mt-4 text-[11px] font-light text-stone-300 leading-relaxed font-sans">
                          {stylist.bio}
                        </p>

                        <div className="border-t border-stone-800/80 my-4" />

                        {/* Portfolio samples list */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono tracking-widest text-stone-400 uppercase font-semibold">
                            Couture Portfolio
                          </span>
                          <div className="grid grid-cols-1 gap-1.5">
                            {stylist.portfolioUrls.map((sample, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-2 text-[10px] text-stone-300">
                                <span className="w-1 h-1 bg-amber-400 rounded-full" />
                                <span>{sample}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Select Stylist and open pricing book directly */}
                      <button
                        onClick={() => {
                          // Find service category matching stylist field:
                          let matchingCat = 'hair';
                          if (stylist.id === 'st2') matchingCat = 'spa';
                          if (stylist.id === 'st3') matchingCat = 'nails';
                          onSetCategory(matchingCat);
                          
                          // Scroll or trigger
                          const matchingServices = SERVICES.filter(s => s.category === matchingCat);
                          if (matchingServices.length > 0) {
                            onSelectServiceAndStylist(matchingServices[0].id, stylist.id);
                          }
                        }}
                        className="w-full py-2 bg-amber-300 text-stone-950 hover:bg-white text-[9px] font-bold tracking-[0.25em] uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                        id={`select-stylist-btn-${stylist.id}`}
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Work with {stylist.name.split(' ')[0]}</span>
                      </button>
                    </div>

                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 3: GUEST CRITIQUES / TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4"
              id="testimonials-grid"
            >
              {TESTIMONIALS.map((critique, index) => (
                <motion.div
                  key={critique.id}
                  whileHover={{ 
                    y: -5,
                    borderColor: 'rgba(251, 191, 36, 0.3)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
                  }}
                  className="bg-stone-900/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-stone-850 flex flex-col justify-between shadow-lg relative group transition-all duration-300"
                >
                  <div>
                    {/* Star ratings */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: critique.rating }).map((_, rIdx) => (
                        <Star key={rIdx} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="mt-6 font-serif italic text-stone-200 text-[13px] sm:text-sm leading-relaxed font-light">
                      &ldquo;{critique.comment}&rdquo;
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-stone-850 flex items-center gap-3">
                    {/* Circle initials medallion */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400/10 to-amber-600/10 border border-amber-300/20 flex items-center justify-center font-serif text-amber-300 text-sm">
                      {critique.avatarLetter}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-stone-100 tracking-wide">
                        {critique.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">
                        {critique.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
