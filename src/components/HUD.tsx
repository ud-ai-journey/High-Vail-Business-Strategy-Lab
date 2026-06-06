import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, Menu, X, ArrowUpRight, ChevronDown, Compass, Award, Volume2, VolumeX } from 'lucide-react';
import { cinematicAudio } from '../utils/audio';

interface HUDProps {
  currentSection: number;
  totalSections: number;
  scrollProgress: number; // 0 to 1
  onNavigateToSection: (sectionIdx: number) => void;
  onOpenContact: () => void;
  onReplayIntro?: () => void;
}

export default function HUD({
  currentSection,
  totalSections,
  scrollProgress,
  onNavigateToSection,
  onOpenContact,
  onReplayIntro,
}: HUDProps) {
  const [time, setTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Keep internal mute state in sync with actual audio engine
    setIsMuted(cinematicAudio.getMutedStatus());
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate dynamic Brand Impact Score based on scroll progress
  // Let it start at 24 and grow cleanly to 98.6
  const impactScore = (24 + scrollProgress * 74.6).toFixed(1);

  const sectionsList = [
    { name: 'INDEX', label: 'WE BUILD' },
    { name: 'IMPACT', label: 'IMPACT' },
    { name: 'PROCESS', label: 'PROCESS' },
    { name: 'PORTFOLIO', label: 'WORK' },
    { name: 'RESULTS', label: 'STATS' },
    { name: 'SERVICES', label: 'SERVICES' },
    { name: 'WHY US', label: 'COMPARE' },
    { name: 'NEXT', label: 'PIPELINE' },
    { name: 'GROWTH', label: 'LAUNCH' },
  ];

  return (
    <>
      {/* GLOBAL BACKGROUND BORDERS ETCHED WITH LUXURY TICKS */}
      <div className="fixed inset-0 pointer-events-none z-40 border-l border-r border-[#ffffff]/10 mx-4 md:mx-10 select-none">
        {/* Top Boundary Line with ticks */}
        <div className="absolute top-10 left-0 right-0 h-px bg-[#ffffff]/10 flex justify-between px-4">
          <div className="w-1 bg-amber-500/80 h-1 -mt-0.5" />
          <div className="w-16 h-px bg-[#c6a66b]/30" />
          <div className="w-1 bg-amber-500/80 h-1 -mt-0.5" />
        </div>

        {/* Bottom Boundary Line with ticks */}
        <div className="absolute bottom-10 left-0 right-0 h-px bg-[#ffffff]/10 flex justify-between px-4">
          <div className="w-1 bg-[#c6a66b]/80 h-1 -mb-0.5" />
          <div className="w-20 h-px bg-white/20" />
          <div className="w-1 bg-[#c6a66b]/80 h-1 -mb-0.5" />
        </div>

        {/* Outer Corner Accents */}
        <div className="absolute top-10 left-0 w-2 h-2 border-t border-l border-[#c6a66b]" />
        <div className="absolute top-10 right-0 w-2 h-2 border-t border-r border-[#c6a66b]" />
        <div className="absolute bottom-10 left-0 w-2 h-2 border-b border-l border-[#c6a66b]" />
        <div className="absolute bottom-10 right-0 w-2 h-2 border-b border-r border-[#c6a66b]" />
      </div>

      {/* TOP HEADER HUD OVERLAY */}
      <header className="fixed top-0 left-0 right-0 h-24 z-50 px-8 md:px-16 flex items-center justify-between select-none bg-gradient-to-b from-[#050505] to-transparent">
        {/* Top Left Label */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onReplayIntro?.()}
            className="w-10 h-10 relative rounded-lg overflow-hidden bg-black/60 border border-white/10 hover:border-[#c6a66b]/60 flex items-center justify-center p-0.5 group cursor-pointer pointer-events-auto transition-all focus:outline-none"
            title="Replay Brand Cinematic intro"
          >
            {/* Ambient gold glow behind logo */}
            <div className="absolute inset-0 bg-[#c6a66b]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              referrerPolicy="no-referrer"
              src="https://res.cloudinary.com/ddatd5ruz/image/upload/v1780762580/ChatGPT_Image_Jun_6_2026_09_41_43_PM_nemvis.png" 
              alt="High Vail Brand Mark" 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
            />
          </button>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#c6a66b]">HIGH VAIL</span>
            <span className="font-sans font-extrabold text-[13px] tracking-[0.15em] text-white">STRATEGY LAB</span>
          </div>
        </div>

        {/* Top Center Scroll Indicator Line for Large Screens */}
        <div className="hidden lg:flex items-center gap-6 mt-1 text-xs text-neutral-400 font-mono">
          {sectionsList.map((sec, idx) => (
            <button
              key={sec.name}
              onClick={() => onNavigateToSection(idx)}
              className="group relative py-2 pointer-events-auto cursor-pointer focus:outline-none"
            >
              <span
                className={`text-[10px] tracking-wider transition-all duration-300 ${
                  currentSection === idx
                    ? 'text-white font-medium drop-shadow-[0_0_8px_#c6a66b]'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {sec.label}
              </span>
              {currentSection === idx && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c6a66b] to-[#d4af37]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Top Right Label & Controls */}
        <div className="flex items-center gap-6">
          <div className="hidden xl:flex flex-col text-right">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#d9d9d9]/60">CORE MISSION</span>
            <span className="font-sans text-[11px] font-semibold tracking-wider text-white">
              BUILDING BRANDS // SCALING BUSINESSES
            </span>
          </div>

          {/* Ambient Sound Designer Controls */}
          <button
            onClick={() => {
              const muted = cinematicAudio.toggleMute();
              setIsMuted(muted);
            }}
            className="pointer-events-auto h-8 px-3 rounded border border-white/10 bg-white/5 hover:bg-[#c6a66b]/10 hover:border-[#c6a66b]/35 transition-all font-mono text-[9px] uppercase tracking-wider flex items-center gap-2 cursor-pointer text-white select-none active:scale-95 whitespace-nowrap"
            title="Toggle Ambient Sound Design"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-neutral-400 font-semibold tracking-widest text-[8px]">SOUND: OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#c6a66b]" />
                <span className="text-[#c6a66b] font-bold tracking-widest text-[8px] animate-pulse">SOUND: ACTIVE</span>
                <span className="flex items-end gap-[1.5px] h-2 pb-0.5">
                  <span className="w-[1px] h-2 bg-[#c6a66b]/80 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-[1px] h-3.5 bg-[#c6a66b]/80 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-[1px] h-2.5 bg-[#c6a66b]/80 animate-bounce" style={{ animationDelay: '0.3s' }} />
                </span>
              </>
            )}
          </button>

          <div className="hidden sm:block font-mono text-[11px] text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded backdrop-blur-md">
            {time} <span className="text-[#c6a66b] ml-1">UTC</span>
          </div>

          {/* Start Growth Journey CTA */}
          <button
            onClick={onOpenContact}
            className="group pointer-events-auto bg-gradient-to-r from-[#c6a66b] to-[#e4c281] text-black px-4 py-2 text-xs font-bold tracking-widest rounded uppercase cursor-pointer hover:shadow-[0_0_15px_rgba(198,166,107,0.4)] transition-all duration-300 flex items-center gap-2"
          >
            GROW NOW
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden pointer-events-auto text-white hover:text-[#c6a66b] transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE FULLSCREEN NAVIGATION */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#050505] z-40 pt-28 px-8 flex flex-col justify-between pb-12 overflow-y-auto lg:hidden"
          >
            <div className="flex flex-col gap-5 mt-4">
              <span className="font-mono text-[10px] tracking-widest text-[#c6a66b] border-b border-white/10 pb-2">
                GROWTH STATIONS
              </span>
              {sectionsList.map((sec, idx) => (
                <button
                  key={sec.name}
                  onClick={() => {
                    onNavigateToSection(idx);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-2 text-left group border-b border-white/5"
                >
                  <span
                    className={`text-lg tracking-wider font-sans uppercase font-bold transition-all ${
                      currentSection === idx ? 'text-[#c6a66b] pl-2' : 'text-stone-300'
                    }`}
                  >
                    {idx + 1}. {sec.name}
                  </span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      currentSection === idx ? 'text-[#c6a66b] rotate-45' : 'text-stone-600'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <div className="text-stone-400 text-xs font-mono">
                BUILDING BRANDS // SCALING BUSINESSES
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full bg-gradient-to-r from-[#c6a66b] to-[#d4af37] text-black py-3 text-center text-xs font-mono font-bold tracking-widest rounded cursor-pointer"
              >
                START YOUR SUCCESS STORY
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SIDE VERTICAL CONTROLS & INDICATOR */}
      <div className="fixed left-4 md:left-10 top-24 bottom-24 w-12 z-40 flex flex-col justify-between items-center pointer-events-none select-none">
        {/* Dynamic score visualization */}
        <div className="flex flex-col items-center gap-1">
          <div className="font-mono text-[8px] tracking-widest text-[#c6a66b] uppercase [writing-mode:vertical-lr] scale-95 mb-2">
            IMPACT METRIC
          </div>
          <div className="w-[1.5px] h-12 bg-white/10 relative">
            <div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#c6a66b] to-[#d4af37] transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Brand Impact Score Vertical Display */}
        <div className="flex flex-col items-center">
          <span className="font-mono text-[8px] tracking-[0.25em] text-[#d9d9d9]/50 uppercase [writing-mode:vertical-lr] transform rotate-180">
            BRAND IMPACT SCORE
          </span>
          <div className="h-6 w-px bg-white/20 my-3" />
          <div className="flex flex-col items-center">
            <span className="text-white font-mono text-[11px] font-bold tracking-tighter bg-white/5 border border-white/10 px-1 py-0.5 rounded backdrop-blur-sm">
              {impactScore}
            </span>
            <span className="font-mono text-[8px] text-[#c6a66b] mt-0.5">SCORE</span>
          </div>
        </div>

        {/* Scroll helper */}
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
          <span className="font-mono text-[7px] text-neutral-500 tracking-widest [writing-mode:vertical-lr]">
            SCROLL
          </span>
        </div>
      </div>

      {/* RIGHT SIDE VERTICAL PROGRESS TICK LINES */}
      <div className="fixed right-4 md:right-10 top-28 bottom-28 w-12 z-40 flex flex-col justify-center items-center pointer-events-none select-none">
        <div className="flex flex-col gap-3 items-center">
          {sectionsList.map((_, idx) => {
            const isActive = idx === currentSection;
            return (
              <button
                key={idx}
                onClick={() => onNavigateToSection(idx)}
                className="group relative w-3 h-3 flex items-center justify-center pointer-events-auto cursor-pointer focus:outline-none"
                title={`Enter Space ${idx + 1}`}
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2 h-2 bg-gradient-to-r from-[#c6a66b] to-[#d4af37] shadow-[0_0_8px_#c6a66b]'
                      : 'w-1 h-1 bg-white/20 group-hover:bg-white/50'
                  }`}
                />
                <span className="absolute right-6 text-[8px] font-mono font-bold text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity bg-[#050505]/90 border border-white/10 rounded px-1 backdrop-blur-md">
                  {_ .name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOTTOM METADATA BAR HUD */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 z-30 px-6 md:px-14 flex items-center justify-between select-none pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent">
        {/* Bottom Left Label */}
        <div className="flex items-center gap-2 pl-3">
          <Award className="w-3.5 h-3.5 text-[#c6a66b] animate-spin-slow" />
          <div className="flex flex-col">
            <span className="font-sans font-black text-[11px] text-white tracking-widest uppercase">
              ACTIVE PORTFOLIO ENGINE
            </span>
            <span className="font-mono text-[9px] text-[#c6a66b] tracking-wider">
              EST. GROWTH LAB // VERSION 2026.1
            </span>
          </div>
        </div>

        {/* Bottom Center Indicator showing Z depth mapping */}
        <div className="hidden md:flex items-center gap-2">
          <div className="font-mono text-[9px] text-[#d9d9d9]/40 tracking-widest uppercase">
            ORBIT VELOCITY:
          </div>
          <div className="font-mono text-[10px] text-white/80 font-bold bg-white/5 px-2 py-0.5 border border-white/10 rounded tracking-widest">
            {Math.abs(scrollProgress * 23000).toFixed(0)} Z-UNITS/SEC
          </div>
        </div>

        {/* Bottom Right Label */}
        <div className="flex items-center gap-3 pr-3">
          <div className="text-right">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#d9d9d9]/60 block">
              ENTERPRISE DEPLOYMENTS
            </span>
            <span className="font-sans text-[11px] font-black tracking-widest text-[#c6a66b]">
              ACTIVE SYSTEMS: 07 // PARTNERSHIPS
            </span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </footer>
    </>
  );
}
