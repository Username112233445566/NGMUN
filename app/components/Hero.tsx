'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, Globe, Users, MessageSquare, Target } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const [scrollPosition, setScrollPosition] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { 
      icon: <Globe className="text-white" size={20} />, 
      text: t('hero.features.international') || '64 страны мира' 
    },
    { 
      icon: <Users className="text-white" size={20} />, 
      text: t('hero.features.participants') || '200+ участников' 
    },
    { 
      icon: <MessageSquare className="text-white" size={20} />, 
      text: t('hero.features.committees') || '6 комитетов' 
    },
    { 
      icon: <Target className="text-white" size={20} />, 
      text: t('hero.features.languages') || '3 языка' 
    },
  ];

  return (
    <section 
      id="hero" 
      className="relative pt-20 min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(56, 189, 248, 0.05) 50%, rgba(2, 132, 199, 0.08) 100%)',
      }}
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ngmun-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-ngmun-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/2 w-80 h-80 bg-ngmun-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-500"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        {/* Логотип и заголовок */}
        <div className="inline-block bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl mb-8 animate-fadeIn">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-ngmun-blue-500 p-3 rounded-xl mr-4">
              <span className="text-3xl">🌍</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ngmun-blue-800">
              NGMUN
            </h1>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {t('hero.title')}
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-ngmun-blue-400 to-ngmun-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Особенности */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center">
                <div className="bg-ngmun-blue-500 p-2 rounded-lg mb-2">
                  {feature.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700">{feature.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => scrollToSection('registration')}
            className="group relative px-8 py-4 bg-gradient-to-r from-ngmun-blue-500 to-ngmun-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2">📝</span>
              {t('hero.registerBtn')}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-ngmun-blue-600 to-ngmun-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={() => scrollToSection('committees')}
            className="group relative px-8 py-4 bg-white text-ngmun-blue-600 border-2 border-ngmun-blue-500 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2">🏛️</span>
              {t('hero.viewCommittees')}
            </span>
            <div className="absolute inset-0 bg-ngmun-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Волна внизу */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;