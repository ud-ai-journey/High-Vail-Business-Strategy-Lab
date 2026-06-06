import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { comparisonTable } from '../data';

const GOLD = '#c6a66b';
const GOLD_DARK = '#d4af37';

export default function WhyUsVerdict() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto pointer-events-auto select-none">

      {/* Toggle label */}
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-600 text-center mb-5">
        Hover any axis to reveal the gap
      </p>

      <div className="flex flex-col gap-2">
        {comparisonTable.map((row, idx) => {
          const isOpen = active === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              className="relative rounded-xl border cursor-pointer transition-all duration-300 overflow-hidden"
              style={{
                borderColor: isOpen ? `${GOLD}40` : 'rgba(255,255,255,0.06)',
                background: isOpen ? `${GOLD}06` : 'rgba(255,255,255,0.015)',
              }}
            >
              {/* Collapsed row */}
              <div className="flex items-center gap-4 px-5 py-3">
                {/* Index */}
                <span
                  className="font-mono text-[10px] font-black w-5 shrink-0"
                  style={{ color: isOpen ? GOLD : 'rgba(255,255,255,0.2)' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Aspect */}
                <span
                  className="font-sans font-extrabold text-xs uppercase tracking-wider flex-1 transition-colors duration-200"
                  style={{ color: isOpen ? '#fff' : 'rgba(255,255,255,0.5)' }}
                >
                  {row.aspect}
                </span>

                {/* Closed state: ghost labels */}
                {!isOpen && (
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[8px] text-neutral-700 uppercase tracking-widest">
                      Generic
                    </span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: `${GOLD}80` }}>
                      High Vail
                    </span>
                  </div>
                )}

                {/* Open state: chevron */}
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-4 shrink-0 flex items-center justify-center"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M2 1l3 3-3 3" stroke={isOpen ? GOLD : 'rgba(255,255,255,0.25)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>

              {/* Expanded: two-column verdict */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-px mx-5 mb-4 rounded-lg overflow-hidden border border-white/5">
                      {/* Conventional */}
                      <div className="bg-white/[0.03] px-4 py-3 flex flex-col gap-1.5">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-red-500/60">
                          ✗ Conventional
                        </span>
                        <p className="text-neutral-400 text-[11px] font-serif italic leading-relaxed">
                          {row.traditional}
                        </p>
                      </div>
                      {/* High Vail */}
                      <div
                        className="px-4 py-3 flex flex-col gap-1.5"
                        style={{ background: `${GOLD}07` }}
                      >
                        <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: GOLD_DARK }}>
                          ✓ High Vail
                        </span>
                        <p className="text-white text-[11px] font-sans font-medium leading-relaxed">
                          {row.highVail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Gold scan line on hover */}
              {isOpen && (
                <motion.div
                  layoutId="scan"
                  className="absolute left-0 top-0 bottom-0 w-[2px] rounded-r"
                  style={{ background: `linear-gradient(to bottom, ${GOLD}, ${GOLD_DARK})` }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom conviction line */}
      <div className="mt-6 px-5 py-3 rounded-xl border border-white/5 bg-white/[0.01] flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0 animate-pulse" style={{ background: GOLD }} />
        <p className="font-serif italic text-neutral-500 text-[11px] leading-relaxed">
          "Conventional agencies bill by deliverable, creating misaligned incentives.{' '}
          <span className="text-white font-sans not-italic font-semibold">
            We operate as co-builders — tied strictly to your growth milestones.
          </span>"
        </p>
      </div>
    </div>
  );
}
