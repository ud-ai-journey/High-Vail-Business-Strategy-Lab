import React, { useState } from 'react';
import { motion } from 'motion/react';
import { comparisonTable } from '../data';
import { AlertCircle, HelpCircle, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

export default function InteractiveComparison() {
  const [activeRow, setActiveRow] = useState<number | null>(0);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden backdrop-blur-md select-none font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#d4af37]/10 to-amber-950/20 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#c6a66b]" />
          <span className="font-mono text-[10px] uppercase font-black tracking-widest text-[#c6a66b]">THE ARCHITECTURAL DIFFERENCE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase">VALUATION BOOST</span>
        </div>
      </div>

      {/* Grid columns titles */}
      <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-white/[0.04] text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5">
        <div className="col-span-3">CRITERIA</div>
        <div className="col-span-4 pl-2 text-[#d9d9d9]/60">CONVENTIONAL AGENCIES</div>
        <div className="col-span-5 pl-4 text-[#e4c281] flex items-center gap-1">
          HIGH VAIL LAB
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-white/5">
        {comparisonTable.map((row, idx) => {
          const isActive = idx === activeRow;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveRow(idx)}
              className={`grid grid-cols-12 gap-2 px-6 py-4 transition-all duration-300 items-start cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-transparent via-[#c6a66b]/5 to-[#c6a66b]/10'
                  : 'hover:bg-white/[0.01]'
              }`}
            >
              {/* Aspect / Criteria */}
              <div className="col-span-3 font-sans font-extrabold text-[11px] sm:text-[12px] text-white uppercase tracking-wider py-0.5">
                {row.aspect}
              </div>

              {/* Conventional Agency */}
              <div className="col-span-4 text-[11px] sm:text-[12px] text-neutral-400 font-serif leading-relaxed pl-2 pr-2">
                <span className="inline-block md:hidden font-bold block text-neutral-500 text-[9px] font-mono mb-1">CONVENTIONAL:</span>
                {row.traditional}
              </div>

              {/* High Vail */}
              <div className="col-span-5 text-[11px] sm:text-[12px] text-white font-sans font-medium leading-relaxed pl-4 border-l border-[#c6a66b]/15 flex gap-2">
                <div>
                  <span className="inline-block md:hidden font-bold block text-[#c6a66b] text-[9px] font-mono mb-1">HIGH VAIL:</span>
                  <div className={`transition-all duration-300 ${isActive ? 'text-[#e4c281] font-semibold font-sans scale-[1.01]' : 'text-stone-100'}`}>
                    {row.highVail}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer message / Insight summary */}
      <div className="px-6 py-4 bg-white/[0.01] border-t border-white/10 flex items-center gap-3">
        <div className="w-1.5 h-1.5 bg-[#c6a66b] rounded-full animate-bounce" />
        <p className="text-neutral-400 font-serif italic text-xs leading-relaxed">
          "Conventional agencies bill by the hour or the deliverable post, creating misaligned incentives structure. We operate as an co-builder with equity or performance multipliers tied strictly to growth milestones."
        </p>
      </div>
    </div>
  );
}
