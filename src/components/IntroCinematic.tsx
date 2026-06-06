import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, Volume2, ArrowRight } from 'lucide-react';

interface IntroCinematicProps {
  onComplete: () => void;
}

export default function IntroCinematic({ onComplete }: IntroCinematicProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  useEffect(() => {
    // Attempt auto play immediately on mount
    const playTimer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
          .then(() => setHasStarted(true))
          .catch(() => {
            // Browser might block auto-play, let state recognize we tried
            setHasStarted(true);
          });
      }
    }, 450);

    return () => clearTimeout(playTimer);
  }, []);

  const handleSkip = () => {
    setIsSkipping(true);
    setTimeout(() => {
      onComplete();
    }, 400); // Allow fade out animation to complete
  };

  const handleVideoEnded = () => {
    handleSkip();
  };

  return (
    <AnimatePresence>
      {!isSkipping && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 w-full h-full bg-[#030303] z-[999] flex flex-col justify-between overflow-hidden select-none"
        >
          {/* Cinemascope Top Black Bar */}
          <div className="w-full h-[8vh] bg-black border-b border-white/5 flex items-center justify-between px-6 sm:px-12 z-20">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#c6a66b] rounded-full animate-ping" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#c6a66b]">
                SYSTEM ESTABLISHED // QUANTUM CONNECTION
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600">
              HIGH VAIL CINEMA // REVEAL
            </span>
          </div>

          {/* Core Video Player Container */}
          <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
            {/* Soft Ambient Background Glow mapped to the logo */}
            <div className="absolute w-[50vh] h-[50vh] rounded-full bg-[#c6a66b]/5 blur-[120px] pointer-events-none animate-pulse" />

            <div className="relative w-full max-w-4xl aspect-video border border-white/5 bg-black rounded-lg overflow-hidden shadow-[0_0_80px_rgba(198,166,107,0.03)] mx-4 md:mx-10">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/ddatd5ruz/video/upload/v1780767651/Firefly_A_tiny_golden_point_of_light_sits_in_the_center_of_a_completely_black_background.__The_camer_vemp5l.mp4"
                className="w-full h-full object-cover"
                muted
                playsInline
                onEnded={handleVideoEnded}
              />

              {/* Overlay with subtle static lines/retro aesthetics */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-40" />
            </div>
          </div>

          {/* Cinemascope Bottom Black Bar */}
          <div className="w-full h-[12vh] bg-black border-t border-white/5 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 py-4 z-20 gap-3">
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#c6a66b] uppercase font-bold">
                HIGH VAIL BUSINESS STRATEGY LAB
              </span>
              <span className="font-serif italic text-[11px] text-neutral-500 mt-0.5">
                "A pristine golden spark of genesis representing clean enterprise formulation."
              </span>
            </div>

            <button
              onClick={handleSkip}
              className="group pointer-events-auto bg-white/5 border border-white/10 hover:border-[#c6a66b]/40 hover:bg-[#c6a66b]/5 active:scale-95 px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-[0.25em] text-white flex items-center gap-2 transition-all cursor-pointer"
            >
              SKIP INTRO
              <ArrowRight className="w-3.5 h-3.5 text-[#c6a66b] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
