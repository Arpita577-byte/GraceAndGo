import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ArrowRight, Sparkles, MapPin, CheckCircle, Info } from 'lucide-react';
import { SALON_ROOMS, SALON_CORRIDOR_IMAGE } from '../data';
import { SalonRoom } from '../types';

interface CorridorViewProps {
  onEnterServiceCategory: (categoryId: string) => void;
  onInstantBook: (categoryId: string) => void;
}

export function CorridorView({ onEnterServiceCategory, onInstantBook }: CorridorViewProps) {
  const [currentSection, setCurrentSection] = useState(0); // 0: Lobby Corridor, 1: Hair, 2: Spa, 3: Nails
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt controller for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5
    setMousePosition({ x, y });
  };

  const handleNext = () => {
    setCurrentSection((prev) => (prev < 3 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentSection((prev) => (prev > 0 ? prev - 1 : 3));
  };

  // Auto-slide to show off corridor perspective
  useEffect(() => {
    const timer = setInterval(() => {
      // Slow cycle
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const sections = [
    {
      id: 'lobby',
      title: 'Grand Salon Corridor',
      subtitle: 'Where Luxury Finds Its True Canvas',
      desc: 'Glide through elegant glass-enclosed spaces. Each salon atelier represents world-class master expertise curated to inspire sensory transformation.',
      image: SALON_CORRIDOR_IMAGE,
      features: ['24K Gold Dust Infused Spaces', 'Soundproof Sensory Isolation', 'Elite Parisian trained artists'],
      featuresTitle: 'THE HOLISTIC JOURNEY',
      ctaLabel: 'Begin Tour de Beauté',
      action: () => setCurrentSection(1),
      roomData: undefined
    },
    ...SALON_ROOMS.map(room => ({
      id: room.id,
      title: room.title,
      subtitle: `${room.category.toUpperCase()} SANCTUARY Suite`,
      desc: room.description,
      image: room.image,
      features: room.features,
      featuresTitle: 'RITUAL ACCOUTREMENTS',
      ctaLabel: `View ${room.title.split(' ')[0]} Menu`,
      action: () => onEnterServiceCategory(room.category),
      roomData: room
    }))
  ];

  const currentData = sections[currentSection];

  // Hotspots info per room
  const HOTSPOTS: Record<number, { x: string; y: string; title: string; desc: string }[]> = {
    1: [
      { x: '45%', y: '40%', title: 'The Royal Vanity', desc: 'Custom backlit mirrors from Murano, engineered to cast shadow-free gold glow.' },
      { x: '70%', y: '65%', title: 'Couture Siphon', desc: 'Shiatsu massage reclining chairs for stress release during double infusion washes.' }
    ],
    2: [
      { x: '35%', y: '50%', title: 'Prestige Quartz Bed', desc: 'Filled with warm alpha-quartz sands to align physical vibrations while face cells regenerate.' },
      { x: '65%', y: '30%', title: 'Dermal Light Arch', desc: 'LED spectrum system activating peptide synthesis and targeted cellular repairs.' }
    ],
    3: [
      { x: '40%', y: '48%', title: 'Elite Scent Station', desc: 'High-vacuum custom cabinetry extracting any volatile elements, preserving fresh jasmine aroma.' },
      { x: '75%', y: '70%', title: 'Spa Footbath Arches', desc: 'Individual white marble bowls carved from premium Carrara reserves, delivering herb milk steams.' }
    ]
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-stone-950 text-stone-100 flex flex-col justify-between pt-24 pb-12 font-sans select-none"
      id="corridor-view-main"
    >
      {/* Background Ambience Filter */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-transparent to-stone-950 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[0.5px] pointer-events-none z-10" />

      {/* Floating Sparkles across corridor */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-300/30 blur-[2px]"
            animate={{
              y: [-10, -30, -10],
              opacity: [0.2, 0.7, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + (i % 3) * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: `${(i % 3) * 3 + 4}px`,
              height: `${(i % 3) * 3 + 4}px`,
              left: `${15 + (i * 7) % 75}%`,
              top: `${20 + (i * 9) % 65}%`,
            }}
          />
        ))}
      </div>

      {/* 3D Moving Perspective Background Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, scale: 1.15, filter: 'brightness(0.3) blur(4px)' }}
            animate={{ 
              opacity: 1, 
              scale: 1.05, 
              filter: 'brightness(0.75) blur(0px)',
              x: mousePosition.x * -25, // Parallax depth shift
              y: mousePosition.y * -25
            }}
            exit={{ opacity: 0, scale: 0.95, filter: 'brightness(0.2) blur(8px)' }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentData.image})` }}
          />
        </AnimatePresence>
      </div>

      {/* Central Corridor Perspective Grid overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/30 to-stone-950 pointer-events-none z-10" />

      {/* Corridor Gliding Header */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] tracking-[0.4em] text-amber-400 font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>La Galerie Glissante</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-stone-100 mt-2">
          {currentSection === 0 ? 'Maison d’Artiste' : sections[currentSection].title}
        </h2>
      </div>

      {/* Main Content Layout (Glassmorphic panels & 3D Interactive Hotspots) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto">
        
        {/* LEFT COLUMN: Floating Informational Glass Box (Tilted on hover) */}
        <div className="md:col-span-5 order-2 md:order-1 flex justify-center">
          <motion.div 
            id={`corridor-glasscard-${currentData.id}`}
            whileHover={{ 
              scale: 1.01,
              rotateY: mousePosition.x * 6,
              rotateX: mousePosition.y * -6,
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 25px rgba(251, 191, 36, 0.1)'
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-full max-w-sm bg-stone-900/60 backdrop-blur-xl border border-amber-300/20 rounded-2xl p-6 md:p-8 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden"
          >
            {/* Mirror-glass highlight reflection */}
            <div className="absolute -top-[150%] -left-[150%] w-[300%] h-[300%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 pointer-events-none transition-transform duration-1000 group-hover:translate-x-[50%] group-hover:translate-y-[50%]" />
            
            <span className="text-[10px] tracking-[0.3em] font-medium text-amber-400 uppercase">
              {currentData.subtitle}
            </span>

            <p className="mt-4 text-[13px] sm:text-sm font-light text-stone-300 leading-relaxed font-sans">
              {currentData.desc}
            </p>

            <div className="border-t border-stone-800 my-6" />

            {/* List of custom features */}
            <div className="space-y-3.5 mb-8">
              <span className="text-[10px] tracking-[0.2em] font-medium text-stone-400 uppercase block">
                {currentData.featuresTitle}
              </span>
              {currentData.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-amber-400/80 mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-auto">
              <button
                onClick={currentData.action}
                className="flex-1 px-5 py-3 rounded-full bg-gradient-to-r from-amber-400/90 to-amber-500/90 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                id={`explore-room-btn-${currentData.id}`}
              >
                <span>{currentSection === 0 ? 'Enter Suite' : 'View Catalog'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              {currentSection > 0 && (
                <button
                  onClick={() => onInstantBook(currentData.roomData?.category || 'hair')}
                  className="px-5 py-3 rounded-full bg-stone-950 hover:bg-stone-900 text-amber-300 border border-amber-300/30 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center cursor-pointer"
                  id={`instant-book-room-btn-${currentData.id}`}
                >
                  Schedule Unit
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: The Immersive Corridor Active Window with Hotspots */}
        <div className="md:col-span-7 order-1 md:order-2 relative h-[240px] sm:h-[350px] md:h-[450px] w-full rounded-2xl border border-stone-800 overflow-hidden shadow-2xl flex items-center justify-center group/stage">
          {/* Transparent Glass Barrier Overlay */}
          <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[0.2px] border-4 border-amber-300/10 rounded-2xl z-20 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-white/2 to-transparent pointer-events-none z-20" />

          {/* Gliding Screen Indicators & Glass Sign */}
          <div className="absolute top-4 left-4 z-30 bg-stone-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-800 text-[10px] font-mono tracking-widest text-stone-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>ROOM 0{currentSection} : GLASS PANEL VIEW</span>
          </div>

          {/* Interactive Sparkle Pins / Hotspots (shown if not Lobby corridor) */}
          <AnimatePresence>
            {currentSection > 0 && HOTSPOTS[currentSection]?.map((spot, index) => {
              const isSelected = activeHotspot === `${currentSection}-${index}`;
              return (
                <div
                  key={index}
                  className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: spot.x, top: spot.y }}
                  onMouseEnter={() => setActiveHotspot(`${currentSection}-${index}`)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  {/* Glowing Pulse Node */}
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-amber-400/40 opacity-75"></span>
                    <div className="relative rounded-full w-3.5 h-3.5 bg-amber-400 border border-white flex items-center justify-center shadow-[0_0_12px_rgba(251,191,36,0.8)]">
                      <div className="w-1 h-1 rounded-full bg-stone-950" />
                    </div>
                  </div>

                  {/* Hotspot Floating Tooltip glass box */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: -8, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 bg-stone-950/95 border border-amber-300/30 rounded-lg p-3 text-left shadow-2xl z-40 backdrop-blur-md"
                        style={{ pointerEvents: 'none' }}
                      >
                        <span className="text-[10px] font-bold text-amber-300 block tracking-widest uppercase">
                          {spot.title}
                        </span>
                        <p className="mt-1 text-[11px] text-stone-300 leading-normal font-light">
                          {spot.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </AnimatePresence>

          {/* Backdrop guide to trigger exploration clicks */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center opacity-0 group-hover/stage:opacity-100 transition-opacity duration-300 bg-stone-950/40 backdrop-blur-[1px] pointer-events-none">
            <Eye className="w-8 h-8 text-amber-300/80 mb-2 animate-bounce" />
            <span className="text-xs font-mono tracking-widest text-stone-200">HOVER PINS TO INSPECT EQUIPMENT</span>
          </div>
        </div>

      </div>

      {/* Corridor Controller Navigation Rails */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 flex items-center justify-between">
        
        {/* Navigation Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {sections.map((sec, i) => (
            <button
              key={sec.id}
              onClick={() => setCurrentSection(i)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentSection === i ? 'w-10 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'w-2 bg-stone-700 hover:bg-stone-500'
              }`}
              title={sec.title}
            />
          ))}
        </div>

        {/* Previous / Next buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-400 hover:text-stone-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
            id="corridor-prev-btn"
          >
            ←
          </button>
          
          <div className="text-xs font-mono text-stone-500 px-1 tracking-widest">
            0{currentSection + 1} <span className="text-stone-800">/</span> 04
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-amber-400/10 hover:bg-amber-400/20 border border-amber-300/30 text-amber-300 hover:text-amber-100 transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer font-bold animate"
            id="corridor-next-btn"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
