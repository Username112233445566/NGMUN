'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { key: 'nav.home', id: 'hero' },
    { key: 'nav.about', id: 'about' },
    { key: 'nav.committees', id: 'committees' },
    { key: 'nav.registration', id: 'registration' },
    { key: 'nav.contacts', id: 'contacts' },
  ];

  const languages = [
    { code: 'ru' as const, name: 'Русский', flag: '🇷🇺' },
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
    { code: 'ky' as const, name: 'Кыргызча', flag: '🇰🇬' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const switchLanguage = (langCode: 'ru' | 'en' | 'ky') => {
    setLanguage(langCode);
    setIsLangOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-ngmun-blue-50 p-2 rounded-lg">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-2xl font-bold text-ngmun-blue-600"
                >
                  NGMUN
                </button>
              </div>
              <span className="ml-3 text-gray-700 font-medium hidden md:block">
                Next Generation MUN
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-ngmun-blue-600 font-medium transition duration-300"
                >
                  {t(item.key)}
                </button>
              ))}
              
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center text-gray-700 hover:text-ngmun-blue-600 transition"
                >
                  <Globe size={20} className="mr-1" />
                  <span className="text-sm font-medium">
                    {languages.find(l => l.code === language)?.name}
                  </span>
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fadeIn">
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => switchLanguage(lang.code)}
                          className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-ngmun-blue-50 hover:text-ngmun-blue-700 transition ${
                            language === lang.code ? 'bg-ngmun-blue-50 text-ngmun-blue-700' : ''
                          }`}
                        >
                          <span className="mr-2 text-lg">{lang.flag}</span>
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Language Switcher for Mobile */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center text-gray-700 p-2"
                >
                  <Globe size={20} />
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fadeIn">
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => switchLanguage(lang.code)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-ngmun-blue-50 hover:text-ngmun-blue-700 transition"
                        >
                          <span className="mr-2 text-lg">{lang.flag}</span>
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t animate-fadeIn">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 text-gray-700 hover:text-ngmun-blue-600 font-medium"
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Back to top button */}
      {scrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-ngmun-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-ngmun-blue-700 transition duration-300 z-40 animate-fadeIn"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
};

export default Header;