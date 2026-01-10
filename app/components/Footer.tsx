'use client';

import { useLanguage } from './LanguageContext';
import { Code2, Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

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
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <div className="bg-ngmun-blue-500 p-2 rounded-lg">
                <button
                  onClick={scrollToTop}
                  className="text-2xl font-bold"
                >
                  NGMUN
                </button>
              </div>
              <span className="ml-3 text-xl">Next Generation MUN</span>
            </div>
            <p className="text-gray-400 mt-4">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">{t('footer.follow')}</p>
            <div className="flex space-x-4 mt-4 justify-center md:justify-end">
              <a 
                href="https://t.me/next_modelun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Telegram
              </a>
              <a 
                href="https://www.instagram.com/next.gmun?igsh=MTF6aDQzODBxM2pqdQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Instagram
              </a>
              <a 
                href="mailto:nextgen.modelun@gmail.com" 
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        
      {/* Вставьте этот блок вместо последнего div с классом border-t */}
      <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
          <p>© 2026 NGMUN - Next Generation Model United Nations. {t('footer.rights')}</p>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <span className="text-sm">Разработано с</span>
          <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="text-sm">командой</span>
          <a 
            href="https://next-bit.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 text-ngmun-blue-300 hover:text-white transition duration-300"
          >
            <Code2 className="w-4 h-4" />
            <span className="font-semibold bg-gradient-to-r from-ngmun-blue-300 to-ngmun-blue-100 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-200">
              NextBit
            </span>
          </a>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;