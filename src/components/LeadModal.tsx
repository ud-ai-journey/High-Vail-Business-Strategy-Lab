import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle, ArrowRight, ShieldCheck, Copy, Mail, ExternalLink, Check } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    revenue: 'under-10l',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dossierCopied, setDossierCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const targetEmail = 'highvailbusinessstrategylab@gmail.com';

  const getFormattedDossier = () => {
    const revenueLabels: Record<string, string> = {
      'under-10l': 'Under ₹10 Lakhs Annual Revenue (INR)',
      '10l-50l': '₹10 Lakhs - ₹50 Lakhs Annual Revenue (INR)',
      '50l-2cr': '₹50 Lakhs - ₹2 Crores Annual Revenue (INR)',
      'above-2cr': 'Above ₹2 Crores Annual Revenue (INR)'
    };
    const revenueValue = revenueLabels[formData.revenue] || formData.revenue;

    return `HIGH VAIL BUSINESS STRATEGY LAB - SECURE BRIEFING REQUEST
------------------------------------------------------------
RECIPIENT (TO)        : ${targetEmail}
SENDER COPY (FROM)    : ${targetEmail}
------------------------------------------------------------
FOUNDER / OPERATOR    : ${formData.name}
USER DIRECT EMAIL     : ${formData.email}
USER PHONE CONTACT    : ${formData.phone}
ENTERPRISE NAME       : ${formData.company || 'Not Specified'}
CURRENT PORTAL URL    : ${formData.website || 'Not Specified'}
REVENUE MILESTONE     : ${revenueValue}
ESTIMATED START LINE  : Immediate Action Required

GROWTH BOTTLENECK ANALYSIS:
------------------------------------------------------------
${formData.message || 'No additional details provided.'}
------------------------------------------------------------
Generated via High Vail Strategy Lab Portal.`;
  };

  const triggerEmailClient = () => {
    const subject = `High Vail Strategy Lab Briefing: ${formData.company || 'New Venture'}`;
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(getFormattedDossier())}`;
    
    // Attempt to open mail app safely
    window.location.href = mailtoUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    
    setIsSending(true);
    setSendError(null);
    setSendSuccess(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          dossier: getFormattedDossier(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSendSuccess(true);
      } else if (response.status === 412) {
        // SMTP Configuration pending (App passwords not set up)
        setSendSuccess(false);
        setSendError(data.message || "SMTP Secret Keys pending configuration in settings.");
        triggerEmailClient(); // Auto-launch client helper as physical fallback
      } else {
        setSendSuccess(false);
        setSendError(data.message || data.error || "Automated SMTP pipeline issue encountered.");
        triggerEmailClient(); // Auto-launch client helper as physical fallback
      }
    } catch (err: any) {
      console.warn("API direct send failed, using mailto fallback:", err);
      setSendSuccess(false);
      setSendError("Local server routing bypass active. Transitioning to system client.");
      triggerEmailClient(); // Safe fallback to direct client mail trigger
    } finally {
      setIsSending(false);
      setIsSubmitted(true);
    }
  };

  const copyToClipboard = async (text: string, type: 'dossier' | 'email') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'dossier') {
        setDossierCopied(true);
        setTimeout(() => setDossierCopied(false), 2000);
      } else {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Clipboard write fallback needed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-[#090909] border border-white/10 rounded-xl overflow-hidden relative shadow-[0_20px_50px_rgba(198,166,107,0.15)] animate-fade-in"
      >
        {/* Decorative corner ticks */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#c6a66b]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#c6a66b]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#c6a66b]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#c6a66b]" />

        {/* Global Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-all cursor-pointer focus:outline-none z-30"
        >
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
              <div className="text-center mb-1">
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

                {/* Contact Coordinates (Email & Phone side-by-side) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 uppercase tracking-widest">DIRECT SECURE EMAIL *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/5 border border-white/10 p-2.5 rounded text-white focus:outline-none focus:border-[#c6a66b] transition-colors"
                      placeholder="e.g. founder@brand.com"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-400 uppercase tracking-widest">PHONE CONTACT (PCONTACT) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-white/5 border border-white/10 p-2.5 rounded text-white focus:outline-none focus:border-[#c6a66b] transition-colors"
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
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

                {/* Target Range in INR */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-neutral-400 uppercase tracking-widest">CURRENT ANNUAL REVENUE TARGET (INR)</label>
                  <select
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    className="bg-white/5 border border-white/10 p-2.5 rounded text-neutral-300 focus:outline-none focus:border-[#c6a66b] transition-colors select-none"
                  >
                    <option value="under-10l" className="bg-[#090909] text-white">Under ₹10 Lakhs ARR</option>
                    <option value="10l-50l" className="bg-[#090909] text-white">₹10 Lakhs - ₹50 Lakhs ARR</option>
                    <option value="50l-2cr" className="bg-[#090909] text-white">₹50 Lakhs - ₹2 Crores ARR</option>
                    <option value="above-2cr" className="bg-[#090909] text-white">Above ₹2 Crores ARR</option>
                  </select>
                </div>

                {/* Narrative pitch */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-neutral-400 uppercase tracking-widest">HOW CAN HIGH VAIL SCALE YOU?</label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-white/5 border border-white/10 p-2.5 rounded text-white focus:outline-none focus:border-[#c6a66b] transition-colors resize-none"
                    placeholder="Describe your current business bottlenecks..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-gradient-to-r from-[#c6a66b] to-[#d4af37] disabled:opacity-50 text-black font-extrabold text-xs py-3.5 rounded tracking-widest uppercase hover:shadow-[0_0_20px_rgba(198,166,107,0.4)] transition-all cursor-pointer mt-2 flex items-center justify-center gap-2"
              >
                {isSending ? "DISPATCHING SECURE PILELINE..." : "COMPILE & SEND TO STRATEGY LAB"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 sm:p-8 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center flex flex-col items-center gap-2">
                {sendSuccess ? (
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-1">
                    <CheckCircle className="w-6 h-6 animate-pulse" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-1">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                )}
                
                {sendSuccess ? (
                  <>
                    <span className="font-mono text-[9px] text-emerald-400 tracking-[0.3em] uppercase block">MAIL DISPATCHED SUCCESS</span>
                    <h3 className="font-display font-extrabold text-xl tracking-wider text-white uppercase">TRANSMISSION SECURED</h3>
                    <p className="text-stone-400 text-xs font-serif italic max-w-sm mt-1 leading-relaxed">
                      Your business briefing has been dispatched automatically from our strategy terminal to our secure lab inbox:
                    </p>
                  </>
                ) : (
                  <>
                    <span className="font-mono text-[9px] text-[#c6a66b] tracking-[0.3em] uppercase block">SYSTEM TRANSMITTING (MANUAL FALLBACK)</span>
                    <h3 className="font-display font-extrabold text-xl tracking-wider text-white uppercase">BRIEFING COMPILED</h3>
                    <p className="text-stone-400 text-xs font-serif italic max-w-sm mt-1 leading-relaxed">
                      We have compiled your secure dossier and attempted a direct server dispatch. SMTP keys are currently unconfigured. Please send manually using your local client:
                    </p>
                  </>
                )}
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/5 px-3 py-1.5 rounded mt-1 max-w-full">
                  <span className="font-mono text-[10px] text-white truncate max-w-[240px] sm:max-w-none font-bold">
                    {targetEmail}
                  </span>
                  <button
                    onClick={() => copyToClipboard(targetEmail, 'email')}
                    className="p-1 text-neutral-400 hover:text-[#e4c281] transition-colors cursor-pointer"
                    title="Copy Email Address"
                  >
                    {emailCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Dossier Preview Block */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest font-black">
                    SECURE BRIEF DOSSIER FILE
                  </span>
                  <button
                    onClick={() => copyToClipboard(getFormattedDossier(), 'dossier')}
                    className="font-mono text-[8.5px] text-[#c6a66b] hover:text-[#e4c281] flex items-center gap-1 transition-colors cursor-pointer uppercase"
                  >
                    {dossierCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        COPIED
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        COPY FULL DOSSIER
                      </>
                    )}
                  </button>
                </div>
                <pre className="font-mono text-[9.5px] bg-[#050505] text-neutral-300 p-3 rounded-lg border border-white/5 overflow-x-auto whitespace-pre leading-relaxed max-h-41 scrollbar-thin select-text">
                  {getFormattedDossier()}
                </pre>
              </div>

              {/* Secure Delivery Actions */}
              <div className="flex flex-col gap-2.5 mt-1">
                <button
                  onClick={triggerEmailClient}
                  className="w-full bg-gradient-to-r from-[#c6a66b] to-[#d4af37] text-black font-extrabold text-xs py-3 rounded tracking-widest uppercase hover:shadow-[0_0_15px_rgba(198,166,107,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  RE-LAUNCH SECURE EMAIL CLIENT
                </button>

                <p className="text-neutral-500 text-[10px] font-sans text-center px-4 leading-relaxed">
                  If your system email client didn't launch automatically, use the buttons above to <strong className="text-neutral-300">Copy the Dossier</strong> and send it directly to our secure inbox.
                </p>
              </div>

              <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  DISCRETION GUARANTEED
                </div>
                <button
                  onClick={onClose}
                  className="font-mono text-[10px] text-neutral-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
                >
                  RETURN TO LAB
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
