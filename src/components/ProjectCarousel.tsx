import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { portfolioProjects } from '../data';
import { Project } from '../types';

interface ProjectCarouselProps {
  onSelect: (p: Project) => void;
}

const ACCENT = '#c6a66b';

const categoryColors: Record<string, string> = {
  'E-commerce & Branding':       '#c6a66b',
  'Growth & Launch Systems':     '#d4af37',
  'Digital Repositioning':       '#c6a66b',
  'Branding & Launch Strategy':  '#d4af37',
  'Spatial Identity & Web':      '#b8906a',
};

export default function ProjectCarousel({ onSelect }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const project = portfolioProjects[index];
  const accent = categoryColors[project.category] ?? ACCENT;

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setIndex(i => (i + dir + portfolioProjects.length) % portfolioProjects.length);
  }, []);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit:  (d: number) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto pointer-events-auto select-none">

      {/* Progress pips */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {portfolioProjects.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === index ? 24 : 6,
              height: 6,
              background: i === index ? accent : 'rgba(255,255,255,0.12)',
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-md"
        style={{ minHeight: 340 }}>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={project.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start"
          >
            {/* Left: story block */}
            <div className="flex-1 flex flex-col gap-4 text-left">

              {/* Category tag */}
              <span
                className="font-mono text-[9px] uppercase tracking-[0.3em] px-2 py-0.5 rounded self-start border"
                style={{ color: accent, borderColor: `${accent}30`, background: `${accent}10` }}
              >
                {project.category}
              </span>

              {/* Title */}
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-none">
                {project.title}
              </h3>
              <p className="font-serif italic text-neutral-400 text-sm leading-relaxed max-w-sm">
                {project.subtitle}
              </p>

              {/* Story beat: Challenge → Impact in one line each */}
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex gap-3 items-start">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-600 w-16 shrink-0 pt-0.5">
                    PROBLEM
                  </span>
                  <p className="text-neutral-300 text-[11px] leading-relaxed font-sans">
                    {project.challenge}
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-mono text-[8px] uppercase tracking-widest pt-0.5 w-16 shrink-0" style={{ color: accent }}>
                    RESULT
                  </span>
                  <p className="text-[11px] leading-relaxed font-sans font-semibold text-white">
                    {project.impact}
                  </p>
                </div>
              </div>

              {/* Action row */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => onSelect(project)}
                  className="font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded border transition-all duration-200 hover:scale-105"
                  style={{ color: accent, borderColor: `${accent}40`, background: `${accent}08` }}
                >
                  Case Study →
                </button>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {project.link.replace('https://', '').replace(/\/$/, '')}
                </a>
              </div>
            </div>

            {/* Right: stat pillar */}
            <div className="shrink-0 w-full sm:w-36 flex sm:flex-col flex-row gap-3">
              {project.stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex-1 sm:flex-none rounded-xl p-3 border flex flex-col items-center justify-center text-center"
                  style={{
                    borderColor: i === 0 ? `${accent}30` : 'rgba(255,255,255,0.05)',
                    background: i === 0 ? `${accent}08` : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <span
                    className="font-sans font-black text-base sm:text-lg leading-tight"
                    style={{ color: i === 0 ? accent : 'white' }}
                  >
                    {stat}
                  </span>
                  <span className="font-mono text-[7px] text-neutral-600 uppercase tracking-widest mt-0.5">
                    {i === 0 ? 'PRIMARY' : i === 1 ? 'OUTCOME' : 'IMPACT'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Video strip if available */}
        {project.videoUrl && (
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden pointer-events-none">
            <motion.div
              key={project.id}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 6, ease: 'linear' }}
              style={{ height: '100%', background: `linear-gradient(to right, ${accent}, #d4af37)` }}
            />
          </div>
        )}
      </div>

      {/* Nav arrows */}
      <div className="flex items-center justify-between mt-4 px-1">
        <button
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200 hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">
          {String(index + 1).padStart(2, '0')} / {String(portfolioProjects.length).padStart(2, '0')}
        </span>
        <button
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200 hover:translate-x-0.5"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
