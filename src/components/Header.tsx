import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/', icon: 'fas fa-home' },
    { name: 'Certificates', path: '/certificates', icon: 'fas fa-certificate' },
    { name: 'Projects', path: '/projects', icon: 'fas fa-code' },
    { name: 'Writeups', path: '/writeups', icon: 'fas fa-blog' },
    { name: 'Reported Bugs', path: '/bugs', icon: 'fas fa-bug' },
    { name: 'Contact', path: '/contact', icon: 'fas fa-envelope' }
  ];

  const themeIcons: { [key: string]: string } = {
    dark: 'fas fa-moon',
    blue: 'fas fa-briefcase',
    green: 'fas fa-terminal',
    purple: 'fas fa-user-secret',
    red: 'fas fa-fire',
    orange: 'fas fa-sun',
    teal: 'fas fa-water',
    indigo: 'fas fa-star',
    rose: 'fas fa-heart',
    amber: 'fas fa-gem',
    emerald: 'fas fa-leaf',
    slate: 'fas fa-mountain'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
              <i className="fas fa-shield-alt text-white text-lg"></i>
            </div>
            <span className="font-bold text-xl text-text-primary hidden sm:block">
              Amr Khaled Ahmed
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group ${
                  location.pathname === item.path
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-text-secondary hover:bg-accent hover:text-text-primary'
                }`}
              >
                <i className={`${item.icon} text-sm group-hover:scale-110 transition-transform`}></i>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Theme Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="w-10 h-10 rounded-lg bg-accent hover:bg-primary transition-colors duration-300 flex items-center justify-center group"
                title="Change Theme"
              >
                <i className={`${themeIcons[theme]} text-text-primary group-hover:text-white transition-colors`}></i>
              </button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 top-12 bg-card border border-border rounded-xl shadow-xl p-2 min-w-48 z-50">
                  {Object.entries(themes).map(([key, name]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setTheme(key);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        theme === key
                          ? 'bg-primary text-white'
                          : 'hover:bg-accent text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <i className={themeIcons[key]}></i>
                      <span className="font-medium">{name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-accent hover:bg-primary transition-colors duration-300 flex items-center justify-center group"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-text-primary group-hover:text-white transition-colors`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-text-secondary hover:bg-accent hover:text-text-primary'
                  }`}
                >
                  <i className={item.icon}></i>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
