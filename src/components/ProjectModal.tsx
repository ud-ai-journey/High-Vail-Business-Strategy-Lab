import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ExternalLink, ShieldCheck, ArrowRight, TrendingUp, Sparkles, Target } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  // Render dummy custom premium decorative preview card layout based on category
  const renderMockVisual = () => {
    if (project.videoUrl) {
      return (
        <div className="relative w-full h-[320px] rounded-lg bg-black border border-white/10 overflow-hidden flex flex-col items-center justify-center pointer-events-auto">
          <video
            src={project.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[8px] font-mono uppercase text-[#c6a66b] tracking-wider pointer-events-none z-10 shadow-lg flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c6a66b] animate-pulse"></span>
            CINEMATIC REVEAL
          </div>
        </div>
      );
    }

    switch (project.id) {
      case 'chils':
        return (
          <div className="relative w-full h-[320px] rounded-lg bg-gradient-to-tr from-stone-900 to-amber-950/40 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-8 text-center">
            <div className="absolute inset-0 bg-radial-gradient from-[#c6a66b]/10 via-transparent to-transparent opacity-60" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#c6a66b] uppercase mb-4">REBRAND ARCHITECTURE</span>
            <h4 className="font-sans font-black text-4xl text-white tracking-widest uppercase mb-3">CHILS & CO</h4>
            <p className="font-mono text-xs text-neutral-400 max-w-sm mb-6">PREMIUM COUTURE HEADLESS STORES</p>
            <div className="flex gap-4">
              <span className="bg-white/5 border border-white/10 text-white font-mono text-[10px] px-3 py-1 rounded">FASTEST EDGE API</span>
              <span className="bg-[#c6a66b]/10 border border-[#c6a66b]/20 text-[#c6a66b] font-mono text-[10px] px-3 py-1 rounded">RETAINER: AUTOMATED</span>
            </div>
          </div>
        );
      case 'mogalthur':
        return (
          <div className="relative w-full h-[320px] rounded-lg bg-gradient-to-tr from-neutral-900 to-yellow-950/40 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-8 text-center">
            <div className="absolute inset-0 bg-radial-gradient from-yellow-500/10 via-transparent to-transparent opacity-60" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#d4af37] uppercase mb-4">AGRICULTURE PRESTIGE</span>
            <h4 className="font-sans font-black text-4xl text-white tracking-widest uppercase mb-3">MOGALTHUR MANGOES</h4>
            <p className="font-mono text-xs text-neutral-400 max-w-sm mb-6">TRIPLED PROFIT VALUATION ENGINES</p>
            <div className="flex gap-4">
              <span className="bg-white/5 border border-white/10 text-white font-mono text-[10px] px-3 py-1 rounded">SOLD-OUT LAUNCH</span>
              <span className="bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] font-mono text-[10px] px-3 py-1 rounded">400K+ ORGANIC VIEWS</span>
            </div>
          </div>
        );
      case 'swami-reddy':
        return (
          <div className="relative w-full h-[320px] rounded-lg bg-gradient-to-tr from-neutral-950 to-amber-900/40 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-8 text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#c6a66b] uppercase mb-4">DIGITAL RETIREMENT AGENTS</span>
            <h4 className="font-sans font-black text-4xl text-white tracking-widest uppercase mb-3 text-center">SWAMI REDDY</h4>
            <p className="font-mono text-xs text-neutral-400 max-w-sm mb-6">HERITAGE COCONUT & AGRICULTURE PORTAL</p>
            <div className="flex gap-4">
              <span className="bg-white/5 border border-white/10 text-white font-mono text-[10px] px-3 py-1 rounded">DIRECT TO CONSUMER</span>
              <span className="bg-[#c6a66b]/10 border border-[#c6a66b]/20 text-[#c6a66b] font-mono text-[10px] px-3 py-1 rounded">ZERO REVENUE LEAKAGE</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-[320px] rounded-lg bg-gradient-to-tr from-[#121212] to-neutral-900 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-8 text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#c6a66b] uppercase mb-4">{project.category}</span>
            <h4 className="font-sans font-black text-4xl text-white tracking-widest uppercase mb-3">{project.title}</h4>
            <p className="font-mono text-xs text-neutral-400 max-w-sm">{project.subtitle}</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-4xl bg-[#090909]/95 border border-white/15 rounded-xl shadow-2xl p-6 md:p-10 relative overflow-hidden pointer-events-auto"
      >
        {/* Subtle Luxury gold gradient light accent blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#c6a66b]/5 rounded-full blur-3xl pointer-events-none -mt-40 -mr-40" />

        {/* Global Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-all cursor-pointer focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
          {/* LEFT CONTENT COLUMN */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#c6a66b]">CASE STUDY</span>
              <h2 className="text-3xl font-black text-white uppercase tracking-wider mt-1">{project.title}</h2>
              <p className="text-stone-400 text-sm italic font-sans mt-2">{project.subtitle}</p>
            </div>

            {/* Premium descriptive tags */}
            <div className="flex flex-wrap gap-2">
              {project.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-1 bg-[#c6a66b]/10 border border-[#c6a66b]/20 px-3 py-1 rounded text-[#c6a66b] font-mono text-[10px] font-bold tracking-wide">
                  <ShieldCheck className="w-3 h-3" />
                  {stat}
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 flex flex-col gap-5">
              {/* CHALLENGE */}
              <div>
                <h4 className="font-sans font-extrabold text-[12px] tracking-[0.2em] text-white uppercase flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-[#c6a66b]" />
                  THE ENTERPRISE CHALLENGE
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">{project.challenge}</p>
              </div>

              {/* SOLUTION */}
              <div>
                <h4 className="font-sans font-extrabold text-[12px] tracking-[0.2em] text-[#c6a66b] uppercase flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#c6a66b]" />
                  HIGH VAIL ARCHITECTURE
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">{project.solution}</p>
              </div>

              {/* IMPACT */}
              <div>
                <h4 className="font-sans font-extrabold text-[12px] tracking-[0.2em] text-emerald-500 uppercase flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  BUSINESS IMPACT REVEALED
                </h4>
                <p className="text-emerald-400/90 text-xs sm:text-sm font-semibold leading-relaxed">{project.impact}</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN WITH PREVIEW CARD & META-INFO */}
          <div className="md:col-span-5 flex flex-col gap-6 justify-between">
            {renderMockVisual()}

            <div className="bg-white/5 border border-white/10 p-5 rounded-lg backdrop-blur-md flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-2">
                <span className="text-neutral-400">PARTNER STATUS:</span>
                <span className="text-emerald-400 font-bold">100% OPERATIONAL</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-2">
                <span className="text-neutral-400">DISCIPLINE:</span>
                <span className="text-white font-bold">{project.category}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-400">LATEST ITERATION:</span>
                <span className="text-white font-bold">V4.9 LIVE</span>
              </div>

              <div className="pt-2">
                <a
                  href={project.link}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c6a66b] to-[#d4af37] text-black font-extrabold text-xs py-3 rounded uppercase pointer-events-auto cursor-pointer hover:shadow-[0_0_15px_rgba(198,166,107,0.3)] transition-all duration-300"
                >
                  VISIT DEPLOYED SYSTEMS
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
