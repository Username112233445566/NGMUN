'use client';

import { useLanguage } from './LanguageContext';

const Committees = () => {
  const { t } = useLanguage();

  const committees = [
    {
      id: 'un-women',
      title: 'Комитет ООН Женщины',
      language: 'Русский',
      topic: 'Гендерное неравенство и трудности с которыми сталкиваются женщины в регионе Средней и Центральной Азии.',
      icon: '♀️'
    },
    {
      id: 'general-assembly',
      title: 'Генеральная Ассамблея',
      language: 'Русский',
      topic: 'Реформа право ВЕТО.',
      icon: '🏛️'
    },
    {
      id: 'unicef',
      title: 'ЮНИСЕФ',
      language: 'Русский',
      topic: 'Крупнейшая вспышка холеры среди детей на территории Демократической Республики Конго.',
      icon: '🧒'
    },
    {
      id: 'who',
      title: 'ВОЗ',
      language: 'Русский',
      topic: 'Критически низкие показатели рождаемости в мире , и ее последствие на глобальную и внутреннюю экономически-социальную стабильность',
      icon: '⚕️'
    },
    {
      id: 'climate',
      title: 'Climate Change Committee',
      language: 'English',
      topic: 'Climate Change in the European Region and Its Impact on Economic and Social Stability',
      icon: '🌍'
    },
    {
      id: 'human-rights',
      title: 'Адам укуктары боюнча комитет',
      language: 'Кыргызча',
      topic: 'Жасалма интеллект жана Deepfake технологиялардын адам укуктарына тийгизген таасири.',
      icon: '🤖'
    },
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
    }
  };

  return (
    <section id="committees" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('committees.title')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('committees.subtitle')}
            </p>
          </div>

          {/* Русские комитеты */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-ngmun-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🇷🇺</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                {t('committees.russianCommittees')}
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {committees.slice(0, 4).map((committee) => (
                <div key={committee.id} className="card hover:border-ngmun-blue-300 border-2 border-transparent transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="bg-ngmun-blue-100 p-3 rounded-lg mr-4">
                      <span className="text-xl">{committee.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{committee.title}</h4>
                      <div className="flex items-center mt-2">
                        <span className="text-gray-600 text-sm">
                          {t('committees.language')}: {committee.language}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-gray-700 font-medium">{t('committees.topic')}:</span>
                    <p className="text-gray-700 mt-1">{committee.topic}</p>
                  </div>
                  <button
                    onClick={() => scrollToSection('registration')}
                    className="mt-6 text-ngmun-blue-600 hover:text-ngmun-blue-700 font-medium"
                  >
                    {t('committees.registerForCommittee')} →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* English Committee */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🇬🇧</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                {t('committees.englishCommittee')}
              </h3>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="card hover:border-ngmun-blue-300 border-2 border-transparent transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-ngmun-blue-100 p-3 rounded-lg mr-4">
                    <span className="text-xl">{committees[4].icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{committees[4].title}</h4>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600 text-sm">
                        {t('committees.language')}: {committees[4].language}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-gray-700 font-medium">{t('committees.topic')}:</span>
                  <p className="text-gray-700 mt-1">{committees[4].topic}</p>
                </div>
                <button
                  onClick={() => scrollToSection('registration')}
                  className="mt-6 text-ngmun-blue-600 hover:text-ngmun-blue-700 font-medium"
                >
                  {t('committees.registerForCommittee')} →
                </button>
              </div>
            </div>
          </div>

          {/* Кыргыз комитети */}
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🇰🇬</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                {t('committees.kyrgyzCommittee')}
              </h3>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="card hover:border-ngmun-blue-300 border-2 border-transparent transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-ngmun-blue-100 p-3 rounded-lg mr-4">
                    <span className="text-xl">{committees[5].icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{committees[5].title}</h4>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600 text-sm">
                        {t('committees.language')}: {committees[5].language}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-gray-700 font-medium">{t('committees.topic')}:</span>
                  <p className="text-gray-700 mt-1">{committees[5].topic}</p>
                </div>
                <button
                  onClick={() => scrollToSection('registration')}
                  className="mt-6 text-ngmun-blue-600 hover:text-ngmun-blue-700 font-medium"
                >
                  {t('committees.registerForCommittee')} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Committees;
