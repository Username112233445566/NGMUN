'use client';

import { Users, Globe, MessageSquare } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Globe className="text-ngmun-blue-600" size={28} />,
      title: 'Международный опыт',
      description: 'Симуляция, которая проводится в 64 странах мира'
    },
    {
      icon: <MessageSquare className="text-ngmun-blue-600" size={28} />,
      title: 'Развитие навыков',
      description: 'Дипломатия, публичные выступления и критическое мышление'
    },
    {
      icon: <Users className="text-ngmun-blue-600" size={28} />,
      title: 'Нетворкинг',
      description: 'Встречайте единомышленников и будущих лидеров'
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            {t('about.title')}
          </h2>

          <div className="card mb-12">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {t('about.description1')}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              {t('about.description2')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="bg-ngmun-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-ngmun-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {t('about.team')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="font-bold text-ngmun-blue-600 text-lg">
                  {t('about.secretaryGeneral')}
                </h4>
                <p className="text-gray-700 mt-2">Уларбекова Даткайым</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="font-bold text-ngmun-blue-600 text-lg">
                  {t('about.deputySecretary')}
                </h4>
                <p className="text-gray-700 mt-2">Султанова Асель</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;