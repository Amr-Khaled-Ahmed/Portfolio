import { useState, useEffect, useRef } from 'react';
import { Shield, Scroll, Award, Mail, Home, X, ChevronRight, Download, BookOpen, Github, Linkedin, ExternalLink } from 'lucide-react';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function Navigation({ currentPage = 'home', onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close side panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleNavClick = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, glyph: '𓁢', desc: 'Sanctum & Interactive Terminal' },
    { id: 'projects', label: 'Projects', icon: Shield, glyph: '𓃭', desc: 'Tools, Exploits & Repositories' },
    { id: 'writeups', label: 'Writeups', icon: Scroll, glyph: '𓀀', desc: 'CTFs, Malware & Technical Research' },
    { id: 'certifications', label: 'Certifications', icon: Award, glyph: '𓉠', desc: 'Verified Credentials & Drive Badges' },
    { id: 'contact', label: 'Contact', icon: Mail, glyph: '𓂀', desc: 'Communications & Direct Inquiries' },
  ];

  return (
    <>
      {/* ── Compact Side Trigger (Fixed on right side) ── */}
      <aside aria-label="Quick Navigation Trigger" className="fixed top-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full bg-[#0a0f1d]/85 border-2 border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          aria-label="Open Egyptian Cartouche Navigation"
          aria-expanded={isOpen}
        >
          {/* Subtle gold scan line on trigger border */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
          </span>

          {/* Hieroglyphic emblem */}
          <span className="text-xl sm:text-2xl text-[#D4AF37] transition-transform duration-300 group-hover:rotate-12">
            𓁢
          </span>

          <span className="font-bold text-xs sm:text-sm tracking-wider text-white group-hover:text-[#D4AF37] transition-colors font-mono">
            MENU
          </span>

          <span className="text-xs text-[#D4AF37]/70 font-mono hidden sm:inline">
            𓂀
          </span>
        </button>
      </aside>

      {/* ── Top Floating Minimal Brand Capsule (Left corner) - Hidden for now ── */}
      {/* 
      <header className="fixed top-6 left-4 sm:left-6 z-40">
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer group flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2 rounded-full bg-[#0a0f1d]/75 border border-[#D4AF37]/30 shadow-lg shadow-black/40 backdrop-blur-xl transition-all hover:border-[#D4AF37]/70 hover:bg-[#0a0f1d]/90"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#D4AF37] blur-md opacity-40 group-hover:opacity-75 transition-opacity" />
            <span className="relative text-xl sm:text-2xl text-[#D4AF37]">𓉠</span>
          </div>
          <div className="leading-tight">
            <h1 className="text-xs sm:text-sm font-extrabold tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">
              AMR ELDHSHAN
            </h1>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SOC ENGINEER
            </p>
          </div>
        </div>
      </header>
      */}

      {/* ── Backdrop Overlay ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* ── Royal Egyptian Cartouche Slide-out Drawer ── */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Cartouche"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-gradient-to-b from-[#0a0e1c] via-[#10172a] to-[#0a0e1c] border-l-2 border-[#D4AF37]/40 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out flex flex-col justify-between overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Animated Gold Scan Line at top of cartouche */}
        <div className="absolute top-0 left-0 right-0 h-[2px] cartouche-scan" />

        {/* ── Cartouche Header ── */}
        <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between relative bg-[#0a0e1c]/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-2xl text-[#D4AF37] shadow-inner shadow-[#D4AF37]/30">
              𓁢
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono">Royal Cartouche</span>
                <span className="text-xs text-[#D4AF37]">𓂀</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">Command Sanctum</h2>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all flex items-center justify-center focus:outline-none"
            aria-label="Close cartouche navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Cartouche Body / Nav Items ── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest px-2 mb-2">
            Select Destination
          </p>

          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group w-full relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                  isActive
                    ? 'border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'border-white/5 bg-[#0a0f1d]/50 hover:border-[#D4AF37]/40 hover:bg-[#16223b]/60'
                }`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#D4AF37] rounded-r-full shadow-[0_0_8px_#D4AF37]" />
                )}

                {/* Glyphic Emblem */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#1B2845] font-bold shadow-lg shadow-[#D4AF37]/40 scale-105'
                      : 'bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37]/20 group-hover:scale-105'
                  }`}
                >
                  <span>{item.glyph}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Icon size={15} className={isActive ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-[#D4AF37]'} />
                    <span className={`text-base font-bold transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-white group-hover:text-[#D4AF37]'}`}>
                      {item.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight
                  size={18}
                  className={`transition-transform duration-300 ${
                    isActive
                      ? 'text-[#D4AF37] translate-x-1'
                      : 'text-gray-600 group-hover:text-[#D4AF37] group-hover:translate-x-1'
                  }`}
                />
              </button>
            );
          })}

          {/* Quick CV Request Card inside Cartouche */}
          <div className="pt-2">
            <a
              href="mailto:amrKhaledv2171516@gmail.com?subject=CV%20Request&body=Hi%20Amr%2C%20I'd%20like%20to%20receive%20your%20CV."
              className="group w-full flex items-center justify-between p-3.5 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#1B2845] transition-all duration-300 shadow-md"
            >
              <div className="flex items-center gap-2.5 font-bold text-xs sm:text-sm">
                <Download size={16} />
                <span>Request Credentials (CV)</span>
              </div>
              <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* ── Cartouche Footer & Socials ── */}
        <div className="p-5 border-t border-[#D4AF37]/20 bg-[#0a0e1c]/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Amr-Khaled-Ahmed"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-colors"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/amr-eldhshan"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#0077B5] hover:border-[#0077B5]/50 hover:bg-[#0077B5]/10 transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://medium.com/@amrkhaledv2171516"
                target="_blank"
                rel="noreferrer"
                aria-label="Medium Profile"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#00ab6c] hover:border-[#00ab6c]/50 hover:bg-[#00ab6c]/10 transition-colors"
              >
                <BookOpen size={16} />
              </a>
            </div>

            <span className="text-xs font-mono text-gray-500">
              ZeroAccess OS 11
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
