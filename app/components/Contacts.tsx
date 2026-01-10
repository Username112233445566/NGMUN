'use client';

import { User, Instagram, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { FAQItem, ContactPerson, GeneralContact } from '../../types/faq';

const Contacts = () => {
  const { t } = useLanguage();

  // Типизированные данные с проверками
  const contacts: ContactPerson[] = [
    {
      name: 'Уларбекова Даткайым',
      position: t('about.secretaryGeneral'),
      telegram: '@sucr4e',
      email: 'ddtty044@gmail.com',
    },
    {
      name: 'Султанова Асель',
      position: t('about.deputySecretary'),
      telegram: '@srwxmi',
      email: 'srwxmi@gmail.com',
    },
  ];

  const generalContacts: GeneralContact[] = [
    {
      icon: <Instagram size={24} className="text-ngmun-blue-600" />,
      title: t('contacts.instagram'),
      description: t('contacts.instagramDescription'),
      link: 'https://www.instagram.com/next.gmun?igsh=MTF6aDQzODBxM2pqdQ==',
      linkText: '@next.gmun'
    },
    {
      icon: <MessageCircle size={24} className="text-ngmun-blue-600" />,
      title: t('contacts.officialChannel'),
      description: t('contacts.channelDescription'),
      link: 'https://t.me/next_modelun',
      linkText: '@next_modelun'
    },
    {
      icon: <Mail size={24} className="text-ngmun-blue-600" />,
      title: t('contacts.officialEmail'),
      description: t('contacts.emailDescription'),
      link: 'mailto:nextgen.modelun@gmail.com',
      linkText: 'nextgen.modelun@gmail.com'
    }
  ];

  // Безопасное получение FAQ items
  const getFAQItems = (): FAQItem[] => {
    try {
      const faqData = t('contacts.faqItems') as unknown;
      
      // Проверяем, что это массив
      if (Array.isArray(faqData)) {
        // Фильтруем только валидные объекты с полями q и a
        return faqData.filter((item): item is FAQItem => 
          item && 
          typeof item === 'object' && 
          'q' in item && 
          'a' in item &&
          typeof item.q === 'string' &&
          typeof item.a === 'string'
        );
      }
      
      return getDefaultFAQItems();
    } catch (error) {
      console.error('Error parsing FAQ items:', error);
      return getDefaultFAQItems();
    }
  };

  const getDefaultFAQItems = (): FAQItem[] => [
    { 
      q: 'Как принять участие в конференции?', 
      a: 'Зарегистрируйтесь на нашем сайте в разделе регистрации.' 
    },
    { 
      q: 'Сколько стоит участие?', 
      a: 'Стоимость участия уточняйте в официальном канале.' 
    },
    { 
      q: 'Кто может участвовать?', 
      a: 'Учащиеся школ, студенты и молодые специалисты.' 
    },
  ];

  const faqItems = getFAQItems();

  return (
    <section id="contacts" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('contacts.title')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('contacts.subtitle')}
            </p>
          </div>

          {/* Основные контакты */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {contacts.map((contact, index) => (
              <div key={index} className="card hover:border-ngmun-blue-300 border-2 border-transparent transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-ngmun-blue-100 rounded-full flex items-center justify-center mr-4">
                    <User size={28} className="text-ngmun-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{contact.position}</h3>
                    <p className="text-ngmun-blue-600 font-semibold">{contact.name}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-lg">📱</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telegram</p>
                      <a
                        href={`https://t.me/${contact.telegram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 font-medium hover:text-ngmun-blue-600 transition duration-300"
                      >
                        {contact.telegram}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-lg">✉️</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-gray-800 font-medium hover:text-ngmun-blue-600 transition duration-300"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Общие контакты */}
          <div className="bg-ngmun-blue-50 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              {t('contacts.officialChannels')}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {generalContacts.map((contact, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-ngmun-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {contact.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    {contact.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {contact.description}
                  </p>
                  <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ngmun-blue-600 font-medium hover:text-ngmun-blue-700"
                  >
                    {contact.linkText}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          {faqItems.length > 0 && (
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {t('contacts.faq')}
              </h3>
              <div className="space-y-6">
                {faqItems.map((faq, index) => (
                  <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-start">
                      <span className="bg-ngmun-blue-100 text-ngmun-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">
                        ?
                      </span>
                      {faq.q}
                    </h4>
                    <p className="text-gray-600 pl-9">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contacts;