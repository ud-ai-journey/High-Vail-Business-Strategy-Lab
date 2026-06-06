import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, TrendingUp, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    revenue: 'under-100k',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-[#090909] border border-white/10 rounded-xl overflow-hidden relative"
      >
        {/* Decorative corner ticks */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#c6a66b]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#c6a66b]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#c6a66b]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#c6a66b]" />

        {/* Global Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-all cursor-pointer focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex flex-col gap-5">
              <div className="text-center mb-2">
                <div className="inline-flex items-center gap-1.5 bg-[#c6a66b]/10 border border-[#c6a66b]/25 px-2.5 py-1 rounded-full mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#c6a66b]" />
                  <span className="font-mono text-[9px] font-bold text-[#c6a66b] uppercase tracking-widest">INITIATE GROWTH LAB ROUTINE</span>
                </div>
                <h3 className="font-display font-bold text-2xl tracking-wider text-white uppercase">START YOUR SYSTEMS</h3>
                <p className="text-stone-400 text-xs sm:text-sm font-serif italic mt-1">
                  Ready to transcend standard services and engineer a high-growth brand?
                </p>
              </div>

              <div className="flex flex-col gap-4 text-xs font-mono">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-neutral-400 uppercase tracking-widest">FOUNDER / OPERATOR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border border-white/10 p-2.5 rounded text-white focus:outline-none focus:border-[#c6a66b] transition-colors"
                    placeholder="e.g. Johnathan Creed"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-neutral-400 uppercase tracking-widest">DIRECT SECURE EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border border-white/10 p-2.5 rounded text-white focus:outline-none focus:border-[#c6a66b] transition-colors"
                    placeholder="e.g. john@company.com"
                  />
                </div>

                {/* Company Name & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 uppercase tracking-widest">ENTERPRISE NAME</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-white/5 border border-white/10 p-2.5 rounded text-white focus:outline-none focus:border-[#c6a66b] transition-colors"
                      placeholder="e.g. CHILS & CO"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 uppercase tracking-widest">CURRENT URL (IF ANY)</label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="bg-white/5 border border-white/10 p-2.5 rounded text-white focus:outline-none focus:border-[#c6a66b] transition-colors"
                      placeholder="e.g. company.com"
                    />
                  </div>
                </div>

                {/* Target Range */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-neutral-400 uppercase tracking-widest">CURRENT ANNUAL REVENUE TARGET</label>
                  <select
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    className="bg-white/5 border border-white/10 p-2.5 rounded text-neutral-300 focus:outline-none focus:border-[#c6a66b] transition-colors select-none"
                  >
                    <option value="under-100k" className="bg-[#090909] text-white">Under $100K ARR</option>
                    <option value="100k-500k" className="bg-[#090909] text-white">$100K - $500K ARR</option>
                    <option value="500k-2m" className="bg-[#090909] text-white">$500K - $2M ARR</option>
                    <option value="above-2m" className="bg-[#090909] text-white">Above $2M ARR</option>
                  </select>
                </div>

                {/* Narrative pitch */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-neutral-400 uppercase tracking-widest">HOW CAN HIGH VAIL SCALE YOU?</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-white/5 border border-white/10 p-2.5 rounded text-white focus:outline-none focus:border-[#c6a66b] transition-colors resize-none"
                    placeholder="Describe your current business bottlenecks..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#c6a66b] to-[#d4af37] text-black font-extrabold text-xs py-3.5 rounded tracking-widest uppercase hover:shadow-[0_0_20px_rgba(198,166,107,0.4)] transition-all cursor-pointer mt-2 flex items-center justify-center gap-2"
              >
                DEPLOY GROWTH ARCHITECTS
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#c6a66b] tracking-[0.3em] uppercase block mb-1">SYSTEM LINK SECURED</span>
                <h3 className="font-display font-extrabold text-2xl tracking-wider text-white uppercase">GROWTH ROUTINE DEPLOYED</h3>
                <p className="text-stone-300 text-sm font-serif italic mt-3 max-w-sm mx-auto leading-relaxed">
                  "Founder: {formData.name}, system linkage confirmed. Our chief strategist will analyze your corporate ecosystem ({formData.company || 'New Venture'}) and secure direct contact via {formData.email} within 12 hours."
                </p>
              </div>

              <div className="w-full border-t border-white/10 pt-4 flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  HIGH-SECURITY DISCRETION GUARANTEED
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-white/5 border border-white/10 text-white font-mono text-xs px-6 py-2.5 rounded hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                RETURN TO LAB
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
