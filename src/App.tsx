import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Layout,
  Layers,
  Sparkles,
  Zap,
  Globe,
  Share2,
  ExternalLink,
  ChevronRight,
  Calendar,
  Lock,
  Compass,
  Briefcase,
  ChevronUp,
  LineChart,
  Target
} from 'lucide-react';
import HUD from './components/HUD';
import BackgroundCanvas from './components/BackgroundCanvas';
import ProjectModal from './components/ProjectModal';
import LeadModal from './components/LeadModal';
import InteractiveComparison from './components/InteractiveComparison';
import CountUp from './components/CountUp';
import { portfolioProjects, servicesList } from './data';
import { Project } from './types';
import { cinematicAudio } from './utils/audio';

interface Card3DProps {
  project: Project;
  onSelect: (p: Project) => void;
}

const Card3D: React.FC<Card3DProps> = ({ project, onSelect }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleLocalMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setCoords({ x, y });
  };

  const handleLocalLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleLocalMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLocalLeave}
      onClick={() => onSelect(project)}
      className="glass-panel hover:glass-panel-gold rounded-xl p-5 border border-white/10 hover:border-[#c6a66b]/35 w-full sm:w-[310px] transition-all duration-300 transform cursor-pointer relative overflow-hidden group select-none flex flex-col justify-between h-[360px]"
      style={{
        transform: `perspective(1000px) rotateX(${coords.y * -9}deg) rotateY(${coords.x * 9}deg) translateY(${isHovered ? -4 : 0}px)`,
        boxShadow: isHovered ? '0 12px 35px -15px rgba(198,166,107,0.3)' : 'none',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 120px at ${(coords.x + 1) * 50}% ${(coords.y + 1) * 50}%, rgba(198, 166, 107, 0.08), transparent)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div>
        <span className="font-mono text-[9px] text-[#c6a66b] uppercase tracking-[0.2em]">{project.category}</span>
        <h3 className="font-sans font-black text-xl text-white uppercase tracking-wider mt-1 group-hover:text-[#e4c281] transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-xs mt-1 font-serif italic line-clamp-2">
          {project.subtitle}
        </p>
      </div>

      {/* Custom mock visual representation of luxurious web screenshots */}
      <div className="relative w-full h-36 rounded bg-[#0b0b0b] border border-white/5 overflow-hidden flex flex-col items-center justify-center p-3">
        {project.videoUrl && (
          <video
            src={project.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 z-20 ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100 pointer-events-none'
            }`}
          />
        )}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:8px_8px]" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-20 bg-[#c6a66b]/10 rounded-full blur-xl group-hover:scale-135 transition-transform duration-500" />

        {/* Interactive UI element simulation */}
        <div className="z-10 flex flex-col items-center gap-1">
          <span className="font-mono text-[8px] text-[#c6a66b] uppercase tracking-widest bg-[#c6a66b]/10 border border-[#c6a66b]/20 px-2 py-0.5 rounded">
            SYSTEM LEVEL: ENTERPRISE
          </span>
          <span className="text-[10px] text-white/50 font-mono mt-1 font-semibold group-hover:text-white transition-colors duration-300">
            {project.link.replace('https://', '')}
          </span>
        </div>

        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[7px] font-mono text-neutral-500">
          <span>STRIKE RATE: 100%</span>
          <span className="text-emerald-400 flex items-center gap-0.5">
            ● SECURE ACTIVE
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1 bg-[#c6a66b]/20 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#c6a66b] to-[#d4af37] w-[15%] group-hover:w-[100%] transition-all duration-700 ease-out" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <div className="flex flex-col">
          <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider">MILESTONE SUCCESS</span>
          <span className="text-[11px] font-sans font-extrabold text-white">
            {project.stats[1] || 'Completed'}
          </span>
        </div>

        <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-[#c6a66b]/30 flex items-center justify-center text-neutral-400 group-hover:text-[#e4c281] bg-white/2 group-hover:bg-[#c6a66b]/5 transition-all">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [smoothedScrollY, setSmoothedScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Modals status
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Scroll tracker reference
  const lastScrollYRef = useRef(0);

  // Map scrolling
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrollY(current);
      
      // Compute raw velocity
      const rawVel = current - lastScrollYRef.current;
      setScrollVelocity(rawVel);
      lastScrollYRef.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoothed Interpolation loop (Momentum scroll engine)
  useEffect(() => {
    let frameId: number;
    const tick = () => {
      setSmoothedScrollY((prev) => {
        const diff = scrollY - prev;
        const speed = 0.085; // smooth damping multiplier
        const targetNext = prev + diff * speed;
        
        // Feed frame-by-frame velocity to our live sound engine
        cinematicAudio.updateVelocity(diff);

        // If difference is tiny, snap immediately to prevent micro-computations
        if (Math.abs(diff) < 0.1) {
          return scrollY;
        }
        return targetNext;
      });
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [scrollY]);

  // Monitor mouse for beautiful camera sway / parallax drift
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2),
        y: (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2),
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Determine total sections and section depths spacing
  // Each section occupies exactly 1400px of Z depth
  const stepDepth = 1450;
  const totalSections = 9;
  const maxDepth = (totalSections - 1) * stepDepth;

  // Compute overall scrolled ratio (0 to 1)
  const [totalHeight, setTotalHeight] = useState(1);
  useEffect(() => {
    const updateHeight = () => {
      setTotalHeight(document.documentElement.scrollHeight - window.innerHeight || 1);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const progressRatio = Math.max(0, Math.min(1, smoothedScrollY / totalHeight));
  const zTranslate = progressRatio * maxDepth;

  // Continuously refresh current central focus section
  useEffect(() => {
    const exactIndex = zTranslate / stepDepth;
    const closestIdx = Math.max(0, Math.min(totalSections - 1, Math.round(exactIndex)));
    if (closestIdx !== activeSection) {
      setActiveSection(closestIdx);
    }
  }, [zTranslate, activeSection]);

  // Method to jump directly to any given section
  const navigateToSection = (idx: number) => {
    const targetY = (idx / (totalSections - 1)) * totalHeight;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  // Helper function to map Z positions and output inline styles for 3d layers
  const getSectionStyle = (idx: number) => {
    const sectionZ = -idx * stepDepth;
    const camZ = sectionZ + zTranslate;

    let opacity = 0;
    // Section is visible if camera is within 1400px before or 250px after
    if (camZ <= 400 && camZ >= -1450) {
      if (camZ > 0) {
        // Fast fade-out as cards pass past customer eye
        opacity = 1 - camZ / 400;
      } else {
        // Slow fade-in as details rise from depth infinity
        opacity = 1 - Math.abs(camZ) / 1450;
      }
    }

    const isFocused = camZ <= 150 && camZ >= -250;

    return {
      transform: `translate3d(0, 0, ${camZ}px)`,
      opacity: opacity,
      pointerEvents: isFocused ? 'auto' : 'none',
      visibility: opacity > 0.01 ? 'visible' : 'hidden',
      transition: 'opacity 0.2s cubic-bezier(0.1, 0.9, 0.2, 1)',
    } as React.CSSProperties;
  };

  return (
    <div className="relative text-white min-h-screen bg-[#050505] selection:bg-[#c6a66b]/35 selection:text-white overflow-hidden">
      
      {/* 3D PERSPECTIVE GLOBAL VIEWPORT CONTAINER */}
      <div className="fixed inset-0 w-full h-full z-10 overflow-hidden pointer-events-none select-none">
        
        {/* Particle/Gold stream background canvas */}
        <BackgroundCanvas scrollZ={zTranslate} scrollVelocity={scrollVelocity} />

        {/* Global interactive scroll hint overlay */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-20 pointer-events-none md:hidden">
          <ChevronDown className="w-5 h-5 text-neutral-400 animate-bounce" />
          <span className="text-[9px] font-mono tracking-widest text-[#c6a66b]">SWIPE TO ENTER SPACE</span>
        </div>

        {/* CAMERA MOTION STAGE CONTAINER */}
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            perspective: '750px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* THE WORLD INTERPOLATION MATRIX - DRIFTS WITH MOUSE PARALLAX */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg) translate3d(0, 0, 0)`,
              transition: 'transform 0.12s cubic-bezier(0.1, 0.9, 0.2, 1)',
              width: '100%',
              height: '100%',
            }}
          >
            
            {/* ================= SECTION 01 ================= */}
            <div className="absolute w-full h-full flex flex-col items-center justify-center px-6" style={getSectionStyle(0)}>
              <div className="max-w-4xl text-center flex flex-col items-center">
                {/* Gold Prestige tag */}
                <span className="font-mono text-[10px] md:text-xs text-[#c6a66b] tracking-[0.4em] uppercase mb-4 opacity-80 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#c6a66b] to-[#d4af37] rotate-45" />
                  HIGH VAIL BUSINESS STRATEGY LAB
                </span>
                
                <h1 className="font-display font-extrabold text-[#ffffff] text-5xl sm:text-7xl md:text-8xl lg:text-[104px] leading-[0.9] tracking-tighter uppercase mb-4 select-none">
                  WE BUILD <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-white to-[#c6a66b]">
                    BUSINESSES
                  </span>
                </h1>
                
                <h2 className="font-mono text-[9px] sm:text-xs text-[#c6a66b] uppercase tracking-[0.3em] bg-white/[0.03] border border-white/5 py-1 px-4 mb-6 rounded-full">
                  BUILDING BRANDS. SCALING BUSINESSES.
                </h2>
                
                <p className="text-neutral-300 text-xs sm:text-sm md:text-base font-serif italic max-w-xl leading-relaxed mb-8 opacity-80 px-2">
                  "From deep-seated brand strategy and legacy visual identity to content creation, high-performance commerce websites, and scalable growth systems."
                </p>
                
                <button
                  onClick={() => navigateToSection(3)}
                  className="group pointer-events-auto bg-white/5 border border-white/10 hover:border-[#c6a66b]/35 px-6 py-3.5 text-xs font-mono font-bold tracking-[0.25em] text-white rounded-lg flex items-center gap-3 transition-all duration-300 cursor-pointer"
                >
                  VIEW OUR WORK
                  <ArrowRight className="w-4 h-4 text-[#c6a66b] group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* ================= SECTION 02 ================= */}
            <div className="absolute w-full h-full flex flex-col items-center justify-center px-6" style={getSectionStyle(1)}>
              <div className="max-w-4xl text-center flex flex-col items-center">
                <span className="font-mono text-[10px] text-[#c6a66b] tracking-[0.3em] uppercase mb-1">
                  MEASURABLE METRICS
                </span>
                <h2 className="font-display font-black text-6xl md:text-8xl text-stone-200/20 tracking-widest uppercase mb-12 select-none">
                  IMPACT
                </h2>
                
                {/* Floating dynamic cards around IMPACT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4 sm:px-12 pointer-events-auto">
                  
                  <div className="glass-panel border-l-2 border-l-[#c6a66b] rounded-xl p-5 hover:translate-y-[-4px] transition-transform duration-300 text-left flex flex-col justify-between h-36">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">AUDIENCE REACH</span>
                    <div>
                      <h4 className="font-sans font-black text-2xl text-white uppercase tracking-wider">400K+</h4>
                      <p className="font-serif italic text-xs text-stone-300 mt-1">Direct views generated organically from scratch.</p>
                    </div>
                  </div>

                  <div className="glass-panel border-l-2 border-l-[#d4af37] rounded-xl p-5 hover:translate-y-[-4px] transition-transform duration-300 text-left flex flex-col justify-between h-36">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">VALUATION BLUEPRINT</span>
                    <div>
                      <h4 className="font-sans font-black text-2xl text-white uppercase tracking-wider">PROFITS TRIPLED</h4>
                      <p className="font-serif italic text-xs text-stone-300 mt-1">Achieved by shifting from wholesale to premium DTC.</p>
                    </div>
                  </div>

                  <div className="glass-panel border-l-2 border-l-emerald-500/80 rounded-xl p-5 hover:translate-y-[-4px] transition-transform duration-300 text-left flex flex-col justify-between h-36">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">CREATIVE ORIGIN</span>
                    <div>
                      <h4 className="font-sans font-black text-2xl text-white tracking-wider uppercase">BRAND SYSTEM</h4>
                      <p className="font-serif italic text-xs text-stone-300 mt-1">Formulated legacy concepts from zero base.</p>
                    </div>
                  </div>

                  <div className="glass-panel border-l-2 border-l-indigo-500/80 rounded-xl p-5 hover:translate-y-[-4px] transition-transform duration-300 text-left flex flex-col justify-between h-36">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">INFRASTRUCTURE</span>
                    <div>
                      <h4 className="font-sans font-black text-2xl text-white tracking-wider uppercase">ECOSYSTEMS</h4>
                      <p className="font-serif italic text-xs text-stone-300 mt-1">Engineering robust and automated commerce rails.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ================= SECTION 03 ================= */}
            <div className="absolute w-full h-full flex flex-col items-center justify-center px-4" style={getSectionStyle(2)}>
              <div className="max-w-4xl text-center flex flex-col items-center w-full">
                <span className="font-mono text-[10px] text-[#c6a66b] tracking-[0.3em] uppercase mb-1">
                  SYSTEMATIC REPEATABILITY
                </span>
                <h2 className="font-display font-black text-5xl md:text-8xl text-stone-200/20 tracking-widest uppercase mb-10 select-none">
                  PROCESS
                </h2>

                {/* Horizontal connected step loop */}
                <div className="w-full pointer-events-auto">
                  <div className="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6 md:gap-4 items-center justify-between">
                    
                    {/* Glowing flow connection stream line on desktop */}
                    <div className="hidden md:block absolute left-4 right-4 top-[38px] h-[1px] bg-gradient-to-r from-[#c6a66b]/5 via-[#c6a66b]/30 to-[#c6a66b]/5 z-0" />

                    {[
                      { title: 'Strategy', code: 'ST-01', desc: 'Enterprise positioning model, mapping unit margins & direct equity Blueprints.' },
                      { title: 'Identity', code: 'ID-02', desc: 'Prestige visual development, craft logos, color codes & luxury brand books.' },
                      { title: 'Website', code: 'WB-03', desc: 'Headless technology engineering, responsive speed, custom 3D content engines.' },
                      { title: 'Content', code: 'CN-04', desc: 'Studio grade short-form videos, script editing, documentarian standard films.' },
                      { title: 'Growth', code: 'GR-05', desc: 'Launch ecosystems, integrated sales pipelines, automated audience distribution.' }
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className="relative z-10 glass-panel hover:glass-panel-gold rounded-lg p-4 text-center flex flex-col items-center md:max-w-[170px] w-full border border-white/8 hover:border-[#c6a66b]/20 hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#050505] border border-[#c6a66b]/30 flex items-center justify-center font-mono text-xs text-[#c6a66b] font-extrabold tracking-widest mb-3">
                          {step.code}
                        </div>
                        <h4 className="font-display font-bold text-sm uppercase text-white tracking-widest mb-1">{step.title}</h4>
                        <p className="text-neutral-400 text-[11px] leading-relaxed font-serif italic">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ================= SECTION 04 (PORTFOLIO GRID) ================= */}
            <div className="absolute w-full h-full flex flex-col items-center justify-center px-4" style={getSectionStyle(3)}>
              <div className="max-w-[1100px] w-full text-center flex flex-col items-center">
                <span className="font-mono text-[10px] text-[#c6a66b] tracking-[0.3em] uppercase mb-1">
                  SELECTED INVENTIONS
                </span>
                <h2 className="font-display font-black text-5xl md:text-7xl text-stone-200/20 tracking-widest uppercase mb-10 select-none">
                  PORTFOLIO
                </h2>

                {/* Portfolio Horizontal Stream */}
                <div className="flex flex-wrap justify-center gap-4 max-h-[460px] overflow-y-auto sm:overflow-visible w-full py-2 pointer-events-auto">
                  {portfolioProjects.map((project) => (
                    <Card3D key={project.id} project={project} onSelect={setSelectedProject} />
                  ))}
                </div>
              </div>
            </div>

            {/* ================= SECTION 05 (RESULTS TRACKER) ================= */}
            <div className="absolute w-full h-full flex flex-col items-center justify-center px-6" style={getSectionStyle(4)}>
              <div className="max-w-4xl text-center flex flex-col items-center">
                <span className="font-mono text-[10px] text-[#c6a66b] tracking-[0.4em] uppercase mb-2">
                  VERIFIED DEPLOYED OUTCOMES
                </span>
                <h2 className="font-display font-black text-6xl md:text-8xl text-stone-300/10 tracking-widest uppercase mb-10 select-none">
                  RESULTS
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl pointer-events-auto">
                  
                  <div className="glass-panel rounded-xl p-6 text-center border-t-2 border-[#c6a66b]">
                    <div className="text-4xl md:text-5xl font-sans font-black tracking-normal text-white mb-2">
                      <CountUp end={400000} suffix="+" isActive={activeSection === 4} />
                    </div>
                    <span className="font-mono text-[9px] text-[#c6a66b] uppercase tracking-widest block mb-2">INSTAGRAM VIEWS</span>
                    <p className="text-stone-300 text-xs font-serif italic leading-relaxed">Direct organic views generated without paid advertisement spend.</p>
                  </div>

                  <div className="glass-panel rounded-xl p-6 text-center border-t-2 border-emerald-500/80">
                    <div className="text-4xl md:text-5xl font-sans font-black tracking-normal text-white mb-2">
                      <CountUp end={3} suffix="X" isActive={activeSection === 4} />
                    </div>
                    <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest block mb-2">PROFIT GROWTH</span>
                    <p className="text-stone-300 text-xs font-serif italic leading-relaxed">Systematic margin improvement from legacy baseline audits.</p>
                  </div>

                  <div className="glass-panel rounded-xl p-6 text-center border-t-2 border-[#d4af37]">
                    <div className="text-4xl md:text-5xl font-sans font-black tracking-normal text-white mb-2">
                      <CountUp end={5} suffix="+" isActive={activeSection === 4} />
                    </div>
                    <span className="font-mono text-[9px] text-[#d4af37] uppercase tracking-widest block mb-2">BRANDS BUILT</span>
                    <p className="text-stone-300 text-xs font-serif italic leading-relaxed">Engineered from ground-zero ideation to commercial delivery.</p>
                  </div>

                  <div className="glass-panel rounded-xl p-6 text-center border-t-2 border-indigo-500/80">
                    <div className="text-4xl md:text-5xl font-sans font-black tracking-normal text-white mb-2">
                      <CountUp end={100} suffix="%" isActive={activeSection === 4} />
                    </div>
                    <span className="font-mono text-[9px] text-indigo-400 uppercase tracking-widest block mb-2">END-TO-END EXECUTION</span>
                    <p className="text-stone-300 text-xs font-serif italic leading-relaxed">Zero outsourcing. We strategy, design, film, and code natively.</p>
                  </div>

                </div>
              </div>
            </div>

            {/* ================= SECTION 06 (SERVICES BENTO) ================= */}
            <div className="absolute w-full h-full flex flex-col items-center justify-center px-4" style={getSectionStyle(5)}>
              <div className="max-w-[1000px] w-full text-center flex flex-col items-center">
                <span className="font-mono text-[10px] text-[#c6a66b] tracking-[0.3em] uppercase mb-1">
                  TACTICAL SYSTEMS CAPABILITIES
                </span>
                <h2 className="font-display font-black text-5xl md:text-7xl text-stone-200/20 tracking-widest uppercase mb-6 select-none">
                  SERVICES
                </h2>

                {/* Responsive grid of tags and descriptions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-h-[380px] overflow-y-auto pointer-events-auto pr-2">
                  {servicesList.map((srv, idx) => (
                    <div
                      key={idx}
                      className="glass-panel hover:glass-panel-gold rounded-lg p-3 text-left border border-white/8 hover:border-[#c6a66b]/30 flex flex-col justify-between transition-colors duration-300 group"
                    >
                      <div className="w-1.5 h-1.5 bg-[#c6a66b] group-hover:bg-[#d4af37] rounded-full mb-2 transition-colors" />
                      <div>
                        <h4 className="font-sans font-bold text-xs sm:text-sm text-white group-hover:text-[#e4c281] transition-colors leading-tight">
                          {srv.name}
                        </h4>
                        <p className="text-[10px] text-neutral-400 leading-snug font-serif italic mt-1 line-clamp-2">
                          {srv.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= SECTION 07 (WHY US / COMPARISON) ================= */}
            <div className="absolute w-full h-full flex flex-col items-center justify-center px-4" style={getSectionStyle(6)}>
              <div className="max-w-4xl w-full text-center flex flex-col items-center">
                <span className="font-mono text-[10px] text-[#c6a66b] tracking-[0.3em] uppercase mb-1">
                  THE VALUE ASYMMETRY
                </span>
                <h2 className="font-display font-black text-5xl md:text-7xl text-stone-200/20 tracking-widest uppercase mb-4 select-none">
                  WHY US
                </h2>
                
                <p className="text-neutral-300 font-serif italic text-xs sm:text-sm md:text-base max-w-xl mb-6 text-center select-text">
                  "Most agencies deliver commoditized hours and generic assets. <br />
                  <strong className="text-white hover:text-[#e4c281] transition-colors font-sans uppercase text-sm tracking-wider not-italic font-black">
                    We build high-growth businesses.
                  </strong>"
                </p>

                {/* Integrated comparison widget */}
                <div className="w-full max-h-[340px] overflow-y-auto md:overflow-visible pointer-events-auto">
                  <InteractiveComparison />
                </div>
              </div>
            </div>

            {/* ================= SECTION 08 (VENTURE PIPELINE) ================= */}
            <div className="absolute w-full h-full flex flex-col items-center justify-center px-6" style={getSectionStyle(7)}>
              <div className="max-w-4xl text-center flex flex-col items-center w-full">
                <span className="font-mono text-[10px] text-[#c6a66b] tracking-[0.4em] uppercase mb-1">
                  PROPRIETARY INCUBATIONS
                </span>
                <h2 className="font-display font-black text-6xl md:text-8xl text-stone-200/10 tracking-widest uppercase mb-10 select-none">
                  NEXT
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl pointer-events-auto">
                  
                  <div className="glass-panel rounded-xl p-6 border border-white/5 hover:border-[#c6a66b]/20 transition-all text-center flex flex-col justify-between h-52 relative overflow-hidden group">
                    <div className="absolute top-2 right-2 font-mono text-[8.5px] bg-[#c6a66b]/10 text-[#c6a66b] px-2 py-0.5 rounded">
                      SPINNING UP
                    </div>
                    <div className="mt-4">
                      <span className="font-mono text-[9px] text-[#c6a66b] tracking-widest block uppercase mb-1 font-bold">SOFTWARE STAGE</span>
                      <h4 className="font-display font-extrabold text-2xl text-white uppercase tracking-wider group-hover:text-[#e4c281] transition-colors">
                        FreshScribe
                      </h4>
                    </div>
                    <p className="text-neutral-400 text-xs font-serif italic leading-relaxed mt-2 line-clamp-3">
                      Autonomous written narrative engine optimized for corporate scaling blogs.
                    </p>
                    <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-4">
                      <div className="bg-[#c6a66b] h-full w-[35%] animate-pulse" />
                    </div>
                  </div>

                  <div className="glass-panel rounded-xl p-6 border border-white/5 hover:border-[#c6a66b]/20 transition-all text-center flex flex-col justify-between h-52 relative overflow-hidden group">
                    <div className="absolute top-2 right-2 font-mono text-[8.5px] bg-[#c6a66b]/10 text-[#c6a66b] px-2 py-0.5 rounded">
                      ALPHA STAGE
                    </div>
                    <div className="mt-4">
                      <span className="font-mono text-[9px] text-[#c6a66b] tracking-widest block uppercase mb-1 font-bold">CONTENT BOT</span>
                      <h4 className="font-display font-extrabold text-2xl text-white uppercase tracking-wider group-hover:text-[#e4c281] transition-colors">
                        SuperCuts
                      </h4>
                    </div>
                    <p className="text-neutral-400 text-xs font-serif italic leading-relaxed mt-2 line-clamp-3">
                      Next-generation studio grade short cut generation scaling system.
                    </p>
                    <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-4">
                      <div className="bg-[#d4af37] h-full w-[60%] animate-pulse" />
                    </div>
                  </div>

                  <div className="glass-panel rounded-xl p-6 border border-white/5 border-dashed transition-all text-center flex flex-col justify-between h-52 relative overflow-hidden flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 justify-center h-full">
                      <Sparkles className="w-6 h-6 text-[#c6a66b]/40 animate-pulse" />
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                        VENTURE_03
                      </span>
                      <h4 className="font-sans font-black text-xs text-neutral-400 tracking-widest uppercase">
                        COMING SOON
                      </h4>
                      <p className="text-neutral-600 text-[10px] font-sans">
                        Confidential Launch Pipeline
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ================= SECTION 09 (FINAL SUCCESS ACTION) ================= */}
            <div className="absolute w-full h-full flex flex-col items-center justify-center px-6" style={getSectionStyle(8)}>
              <div className="max-w-3xl text-center flex flex-col items-center">
                <span className="font-mono text-[10px] text-[#c6a66b] tracking-[0.4em] uppercase mb-4 opacity-75">
                  THE ENTERPRISE CALLING
                </span>
                
                <h2 className="font-display font-extrabold text-white text-4xl sm:text-6xl md:text-[84px] leading-[0.95] tracking-tighter uppercase mb-6">
                  LET'S BUILD <br />
                  YOUR NEXT <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-white to-[#c6a66b]">
                    SUCCESS STORY
                  </span>
                </h2>

                <p className="text-neutral-300 text-xs sm:text-sm md:text-base font-serif italic max-w-lg leading-relaxed mb-8 opacity-80">
                  "Only a selected number of client operators are accepted each quarter to safeguard focus ratios. Submit your corporate linkage to initiate structural briefing."
                </p>

                <button
                  onClick={() => setIsLeadModalOpen(true)}
                  className="group pointer-events-auto bg-gradient-to-r from-[#c6a66b] to-[#d4af37] text-black px-8 py-4 text-xs font-mono font-bold tracking-[0.25em] rounded uppercase cursor-pointer hover:shadow-[0_0_25px_rgba(198,166,107,0.5)] transition-all duration-300 flex items-center gap-3"
                >
                  START YOUR GROWTH JOURNEY
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* PERSISTENT LUXURIOUS HUD OVERLAYS */}
        <HUD
          currentSection={activeSection}
          totalSections={totalSections}
          scrollProgress={progressRatio}
          onNavigateToSection={navigateToSection}
          onOpenContact={() => setIsLeadModalOpen(true)}
        />
        
      </div>

      {/* FIXED SMOOTH DUMMY SCROLLBAR TRACK CONTAINER - DRIVES CORE INTERACTION */}
      <div className="w-full relative bg-[#050505] z-0 pointer-events-auto">
        <div style={{ height: '980vh' }} className="w-full pointer-events-none" />
      </div>

      {/* ================= MODAL SYSTEMS ================= */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLeadModalOpen && (
          <LeadModal
            isOpen={isLeadModalOpen}
            onClose={() => setIsLeadModalOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
