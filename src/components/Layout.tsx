import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#1B2845] to-[#0a0e1a]">
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Navigation currentPage={currentPage} onNavigate={onNavigate} />
      <main className="relative z-10">
        {children}
      </main>

      <footer className="relative z-10 border-t border-[#D4AF37]/20 bg-[#0a0e1a]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <span className="text-[#D4AF37] text-2xl">𓂀</span>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            </div>
            <p className="text-gray-400">
              Built with passion for cybersecurity, gaming, and ancient wisdom
            </p>
            <p className="text-[#D4AF37] mt-2 font-mono text-sm">
              © 2024 - Egyptian Cyber Warrior
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
