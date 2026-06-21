import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';
import { DOUBLE_DOOR_IMAGE, SALON_CORRIDOR_IMAGE } from '../data';

interface DoubleDoorsEntranceProps {
  onCompleted: () => void;
}

export function DoubleDoorsEntrance({ onCompleted }: DoubleDoorsEntranceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const handleEnter = () => {
    setIsStarted(true);
    // Sequence: Start particles & hum -> open doors -> fade out to main view
    setTimeout(() => {
      setIsOpen(true);
    }, 400);

    setTimeout(() => {
      onCompleted();
    }, 2800);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-stone-900 flex items-center justify-center select-none font-sans" id="entrance-container">
      {/* Golden Cinematic Lighting behind the doors */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-black pointer-events-none" />

      {/* Corridor Reveal under doors */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] ease-out pointer-events-none"
        style={{ 
          backgroundImage: `url(${SALON_CORRIDOR_IMAGE})`,
          transform: isStarted ? 'scale(1.1)' : 'scale(1.0)',
          filter: 'brightness(0.95)'
        }}
      />

      {/* Floating particles (ambient gold dust) */}
      {isStarted && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => {
            const size = Math.random() * 5 + 2;
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = Math.random() * 3 + 2;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-amber-200/60 blur-[1px]"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  bottom: `-10px`,
                }}
                initial={{ y: 0, opacity: 0, scale: 0.5 }}
                animate={{
                  y: -window.innerHeight - 20,
                  opacity: [0, 0.9, 0.9, 0],
                  scale: [0.5, 1.2, 0.8, 0.5],
                  x: [0, Math.sin(i) * 60, Math.sin(i) * -60, 0]
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      )}

      {/* 3D Double Salon Doors Section */}
      <div className="absolute inset-0 flex items-center justify-center perspective-[1200px] z-10">
        
        {/* Left Salon Door */}
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2 origin-left bg-cover bg-left shadow-2xl border-r border-amber-500/20"
          style={{
            backgroundImage: `url(${DOUBLE_DOOR_IMAGE})`,
          }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? -110 : 0 }}
          transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Gold Trim Left Panel */}
          <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-16 rounded-l-md bg-gradient-to-l from-amber-400 to-amber-600 border border-amber-300 shadow-md flex items-center justify-end pr-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        </motion.div>

        {/* Right Salon Door */}
        <motion.div
          className="absolute right-0 top-0 h-full w-1/2 origin-right bg-cover bg-right shadow-2xl border-l border-amber-500/20"
          style={{
            backgroundImage: `url(${DOUBLE_DOOR_IMAGE})`,
          }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? 110 : 0 }}
          transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Gold Trim Right Panel */}
          <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-16 rounded-r-md bg-gradient-to-r from-amber-400 to-amber-600 border border-amber-300 shadow-md flex items-center justify-start pl-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        </motion.div>
      </div>

      {/* Cinematic Copy overlay */}
      <AnimatePresence>
        {!isStarted && (
          <motion.div 
            className="relative z-30 flex flex-col items-center justify-center px-4 text-center max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.8 } }}
            transition={{ delay: 0.2, duration: 1.2 }}
          >
            {/* Elegant Emblem */}
            <motion.div 
              className="w-16 h-16 rounded-full border border-amber-300/30 bg-stone-900/80 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.1)] mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <Compass className="w-8 h-8" />
            </motion.div>

            {/* Shimmering Gold Salon Title */}
            <h1 className="font-serif text-5xl md:text-6xl tracking-[0.2em] uppercase text-stone-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-light leading-tight">
              Maison
              <span className="block text-xl md:text-2xl text-amber-300 tracking-[0.4em] font-sans mt-3 font-medium uppercase">De Beauté</span>
            </h1>

            <p className="mt-6 text-sm md:text-base font-light text-stone-300 tracking-widest max-w-sm mx-auto leading-relaxed uppercase">
              PARIS • TOKYO • NEW YORK
            </p>

            {/* Premium Button */}
            <motion.button
              id="step-inside-btn"
              onClick={handleEnter}
              className="mt-10 group relative px-8 py-4 bg-transparent border-0 flex items-center justify-center cursor-pointer overflow-hidden rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button Glass Backdrop */}
              <div className="absolute inset-0 bg-stone-900/90 border border-amber-300/30 rounded-full group-hover:border-amber-300/60 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              
              <span className="relative z-10 flex items-center gap-3 text-stone-100 font-sans tracking-[0.2em] text-xs font-semibold uppercase">
                Step Inside
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:animate-pulse" />
              </span>
            </motion.button>

            {/* Guidance */}
            <p className="mt-6 text-[10px] text-stone-400 uppercase tracking-[0.3em]">
              Turn on sound for the ultimate luxury dive
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
