import { useState } from 'react';
import { Menu, X, Shield, Scroll, Award, Mail, Home } from 'lucide-react';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function Navigation({ currentPage = 'home', onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Shield },
    { id: 'writeups', label: 'Writeups', icon: Scroll },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId as any);
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#1B2845]/90 border-b-2 border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37] blur-lg opacity-50 animate-pulse" />
              <span className="relative text-4xl">𓁢</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#D4AF37] tracking-wider">
                Amr Eldhshan
              </h1>
              <p className="text-xs text-gray-400 font-mono">Malware Analyst</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative group px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                      : 'text-gray-300 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#D4AF37] p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[#D4AF37]/20 bg-[#0a0e1a]/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                      : 'text-gray-300 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
