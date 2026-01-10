'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en' | 'ky';

const translations = {
  ru: {
    // Навигация
    nav: {
      home: 'Главная',
      about: 'О Модели ООН',
      committees: 'Комитеты',
      registration: 'Регистрация',
      contacts: 'Контакты'
    },
    
    // Герой-секция
    hero: {
      title: 'Next Generation Model United Nations',
      subtitle: 'Образовательная симуляция работы ООН, где будущие лидеры решают глобальные проблемы',
      registerBtn: 'Зарегистрироваться',
      viewCommittees: 'Посмотреть комитеты',
      features: {
        international: 'Международный опыт',
        internationalDesc: 'Симуляция, которая проводится в 64 странах мира',
        participants: '200+ участников',
        participantsDesc: 'Студенты и молодые специалисты',
        committees: '6 комитетов',
        committeesDesc: 'На русском, английском и кыргызском',
        languages: '3 языка',
        languagesDesc: 'Русский, английский, кыргызский'
      }
    },
    
    // О модели ООН
    about: {
      title: 'Что такое Модель ООН?',
      description1: 'Модель ООН — это образовательная симуляция работы Организации Объединённых Наций, где участники (делегаты) представляют разные страны и обсуждают важнейшие международные вопросы: безопасность, экология, права человека, технологии, развитие и многое другое.',
      description2: 'Участники учатся вести дебаты, искать компромиссы, выступать публично и принимать решения как настоящие дипломаты. Это мероприятие проходит в 64 странах мира в рамках ООН.',
      team: 'Организационная команда',
      secretaryGeneral: 'Генеральный секретарь',
      deputySecretary: 'Заместитель секретаря',
      features: [
        {
          icon: '🌍',
          title: 'Международный опыт',
          description: 'Симуляция, которая проводится в 64 странах мира'
        },
        {
          icon: '💬',
          title: 'Развитие навыков',
          description: 'Дипломатия, публичные выступления и критическое мышление'
        },
        {
          icon: '👥',
          title: 'Нетворкинг',
          description: 'Встречайте единомышленников и будущих лидеров'
        }
      ]
    },
    
    // Комитеты
    committees: {
      title: 'Комитеты NGMUN',
      subtitle: 'Выберите комитет для участия. Доступны варианты на русском, английском и кыргызском языках.',
      russianCommittees: 'Русские комитеты',
      englishCommittee: 'English Committee',
      kyrgyzCommittee: 'Кыргыз комитеттери',
      topic: 'Тема',
      language: 'Язык',
      registerForCommittee: 'Зарегистрироваться в комитет'
    },
    
    // Регистрация
    registration: {
      title: 'Регистрация на NGMUN',
      subtitle: 'Заполните форму для участия в Next Generation Model United Nations',
      steps: {
        title: 'Как проходит регистрация',
        step1: 'Заполните форму ниже',
        step2: 'Отправьте заявку',
        step3: 'Получите подтверждение в Telegram'
      },
      form: {
        fullName: 'ФИО участника *',
        birthDate: 'Дата рождения *',
        phone: 'Номер телефона *',
        email: 'Email *',
        telegramUsername: 'Telegram ник *',
        telegramPlaceholder: '@username',
        telegramHint: 'Укажите ваш Telegram username (например: @ivan_ivanov)',
        institution: 'Учебное заведение *',
        role: 'Роль участника *',
        language: 'Выбор языка *',
        committee: 'Выбор комитета *',
        comment: 'Комментарий (по желанию)',
        commentPlaceholder: 'Дополнительная информация или пожелания...',
        submit: 'Отправить заявку',
        success: 'Заявка успешно отправлена! Мы свяжемся с вами в течение 24 часов.',
        agreement: 'Нажимая кнопку, вы соглашаетесь на обработку персональных данных'
      },
      importantInfo: 'Важная информация',
      infoList: [
        'Все данные защищены и не передаются третьим лицам',
        'Заявка мгновенно поступает организаторам в Telegram',
        'Вы получите подтверждение на email',
        'Организаторы свяжутся с вами для уточнения деталей'
      ]
    },
    
    // Контакты
    contacts: {
      title: 'Контакты',
      subtitle: 'Свяжитесь с организаторами NGMUN',
      telegramBot: 'Telegram Bot',
      officialChannel: 'Официальный канал',
      officialEmail: 'Официальный email',
      instagram: 'Instagram',
      instagramDescription: 'Официальная страница в Instagram',
      channelDescription: 'Новости и анонсы',
      emailDescription: 'Для деловых предложений',
      faq: 'Часто задаваемые вопросы',
      officialChannels: 'Официальные каналы',
      faqItems: [
        {
          q: 'Как я узнаю, что моя регистрация принята?',
          a: 'После отправки формы заявка мгновенно поступает организаторам. В течение 24 часов вам придет подтверждение в Telegram или на email.'
        },
        {
          q: 'Можно ли изменить выбранный комитет после регистрации?',
          a: 'Да, для изменения комитета свяжитесь с организаторами через Telegram в течение 3 дней после регистрации.'
        },
        {
          q: 'Есть ли плата за участие?',
          a: 'Информация о взносах будет опубликована на официальном канале Telegram @next_modelun за 2 недели до мероприятия.'
        }
      ]
    },
    
    // Футер
    footer: {
      description: 'Образовательная симуляция работы ООН',
      follow: 'Следите за обновлениями',
      rights: 'Все права защищены'
    },
    
    // Общие
    common: {
      roles: {
        delegate: 'Делегат',
        volunteer: 'Волонтёр',
        observer: 'Наблюдатель'
      },
      languages: {
        russian: 'Русский',
        english: 'English',
        kyrgyz: 'Кыргызский'
      },
      backToTop: 'Наверх'
    }
  },
  
  en: {
    nav: {
      home: 'Home',
      about: 'About Model UN',
      committees: 'Committees',
      registration: 'Registration',
      contacts: 'Contacts'
    },
    hero: {
      title: 'Next Generation Model United Nations',
      subtitle: 'Educational simulation of the UN where future leaders solve global problems',
      registerBtn: 'Register',
      viewCommittees: 'View Committees',
      features: {
        international: 'International Experience',
        internationalDesc: 'Simulation held in 64 countries worldwide',
        participants: '200+ Participants',
        participantsDesc: 'Students and young professionals',
        committees: '6 Committees',
        committeesDesc: 'In Russian, English and Kyrgyz',
        languages: '3 Languages',
        languagesDesc: 'Russian, English, Kyrgyz'
      }
    },
    about: {
      title: 'What is Model UN?',
      description1: 'Model UN is an educational simulation of the United Nations where participants (delegates) represent different countries and discuss critical international issues: security, ecology, human rights, technology, development and more.',
      description2: 'Participants learn to debate, seek compromises, speak publicly and make decisions like real diplomats. This event takes place in 64 countries worldwide within the UN framework.',
      team: 'Organizational Team',
      secretaryGeneral: 'Secretary General',
      deputySecretary: 'Deputy Secretary',
      features: [
        {
          icon: '🌍',
          title: 'International Experience',
          description: 'Simulation held in 64 countries worldwide'
        },
        {
          icon: '💬',
          title: 'Skills Development',
          description: 'Diplomacy, public speaking and critical thinking'
        },
        {
          icon: '👥',
          title: 'Networking',
          description: 'Meet like-minded people and future leaders'
        }
      ]
    },
    committees: {
      title: 'NGMUN Committees',
      subtitle: 'Choose a committee to participate in. Options available in Russian, English and Kyrgyz languages.',
      russianCommittees: 'Russian Committees',
      englishCommittee: 'English Committee',
      kyrgyzCommittee: 'Kyrgyz Committees',
      topic: 'Topic',
      language: 'Language',
      registerForCommittee: 'Register for committee'
    },
    registration: {
      title: 'NGMUN Registration',
      subtitle: 'Fill out the form to participate in Next Generation Model United Nations',
      steps: {
        title: 'How registration works',
        step1: 'Fill out the form below',
        step2: 'Submit your application',
        step3: 'Receive confirmation in Telegram'
      },
      form: {
        fullName: 'Full Name *',
        birthDate: 'Date of Birth *',
        phone: 'Phone Number *',
        email: 'Email *',
        telegramUsername: 'Telegram Username *',
        telegramPlaceholder: '@username',
        telegramHint: 'Enter your Telegram username (e.g. @john_doe)',
        institution: 'Educational Institution *',
        role: 'Participant Role *',
        language: 'Language Selection *',
        committee: 'Committee Selection *',
        comment: 'Comment (optional)',
        commentPlaceholder: 'Additional information or wishes...',
        submit: 'Submit Application',
        success: 'Application successfully submitted! We will contact you within 24 hours.',
        agreement: 'By clicking the button, you agree to the processing of personal data'
      },
      importantInfo: 'Important Information',
      infoList: [
        'All data is protected and not shared with third parties',
        'Application instantly goes to organizers in Telegram',
        'You will receive confirmation by email',
        'Organizers will contact you to clarify details'
      ]
    },
    contacts: {
      title: 'Contacts',
      subtitle: 'Contact NGMUN organizers',
      telegramBot: 'Telegram Bot',
      officialChannel: 'Official Telegram Channel',
      officialEmail: 'Official Email',
      instagram: 'Instagram',
      instagramDescription: 'Official Instagram page',
      channelDescription: 'News and announcements',
      emailDescription: 'For business proposals',
      faq: 'Frequently Asked Questions',
      officialChannels: 'Official Channels',
      faqItems: [
        {
          q: 'How do I know if my registration is accepted?',
          a: 'After submitting the form, the application instantly goes to the organizers. You will receive confirmation via Telegram or email within 24 hours.'
        },
        {
          q: 'Can I change the selected committee after registration?',
          a: 'Yes, to change the committee, contact the organizers via Telegram within 3 days after registration.'
        },
        {
          q: 'Is there a participation fee?',
          a: 'Information about fees will be published on the official Telegram channel @next_modelun 2 weeks before the event.'
        }
      ]
    },
    footer: {
      description: 'Educational simulation of the UN',
      follow: 'Follow updates',
      rights: 'All rights reserved'
    },
    common: {
      roles: {
        delegate: 'Delegate',
        volunteer: 'Volunteer',
        observer: 'Observer'
      },
      languages: {
        russian: 'Russian',
        english: 'English',
        kyrgyz: 'Kyrgyz'
      },
      backToTop: 'Back to top'
    }
  },
  
  ky: {
    nav: {
      home: 'Башкы',
      about: 'Модель ООН жөнүндө',
      committees: 'Комитеттер',
      registration: 'Катталуу',
      contacts: 'Байланыш'
    },
    hero: {
      title: 'Next Generation Model United Nations',
      subtitle: 'Келечектеги лидерлер глобалдык маселелерди чечкен БУУнун билим берүү симуляциясы',
      registerBtn: 'Катталуу',
      viewCommittees: 'Комитеттерди көрүү',
      features: {
        international: 'Эл аралык тажрыйба',
        internationalDesc: '64 өлкөдө өткөрүлгөн симуляция',
        participants: '200+ катышуучу',
        participantsDesc: 'Студенттер жана жаш адистер',
        committees: '6 комитет',
        committeesDesc: 'Орус, англис жана кыргыз тилдеринде',
        languages: '3 тил',
        languagesDesc: 'Орусча, англисче, кыргызча'
      }
    },
    about: {
      title: 'Модель ООН деген эмне?',
      description1: 'Модель ООН — бул катышуучулар (делегаттар) ар кайы өлкөлөрдү көрсөтүп, маанилүү эл аралык маселелерди талкуулаган БУУнун билим берүү симуляциясы: коопсуздук, экология, адам укуктары, технология, өнүгүү жана башкалар.',
      description2: 'Катышуучулар талкуулоону үйрөнүшөт, компромисстерди издешет, коомчулук алдында сүйлөшөт жана чыныгы дипломаттар сыяктуу чечимдерди кабыл алышат. Бул иш-чара 64 өлкөдө БУУнун алкагында өткөрүлөт.',
      team: 'Уюштуруучу команда',
      secretaryGeneral: 'Башкы катчы',
      deputySecretary: 'Катчынын орун басары',
      features: [
        {
          icon: '🌍',
          title: 'Эл аралык тажрыйба',
          description: '64 өлкөдө өткөрүлгөн симуляция'
        },
        {
          icon: '💬',
          title: 'Өнүктүрүлгөн көндүмдөр',
          description: 'Дипломатия, коомчулук алдында сүйлөө жана сын ой жүгүртүү'
        },
        {
          icon: '👥',
          title: 'Нетворкинг',
          description: 'Ой-пикири окшош адамдар жана келечектеги лидердер менен жолугуу'
        }
      ]
    },
    committees: {
      title: 'NGMUN комитеттери',
      subtitle: 'Катышуу үчүн комитетти тандаңыз. Орус, англис жана кыргыз тилдеринде варианттар бар.',
      russianCommittees: 'Орус комитеттери',
      englishCommittee: 'Англис комитети',
      kyrgyzCommittee: 'Кыргыз комитеттери',
      topic: 'Тема',
      language: 'Тил',
      registerForCommittee: 'Комитетке катталуу'
    },
    registration: {
      title: 'NGMUN катталуусу',
      subtitle: 'Next Generation Model United Nations катышуу үчүн форманы толтуруңуз',
      steps: {
        title: 'Катталуу кандай жүрөт',
        step1: 'Төмөндөгү форманы толтуруңуз',
        step2: 'Арызды жөнөтүңүз',
        step3: 'Telegram аркылуу ырастоо алыңыз'
      },
      form: {
        fullName: 'Катышуучунун Ф.А.А. *',
        birthDate: 'Туулган күнү *',
        phone: 'Телефон номери *',
        email: 'Email *',
        telegramUsername: 'Telegram ник *',
        telegramPlaceholder: '@колдонуучунун_аты',
        telegramHint: 'Телеграм колдонуучунун атын көрсөтүңүз (мисалы: @супер_колдонуучу)',
        institution: 'Билим берүү мекемеси *',
        role: 'Катышуучунун ролу *',
        language: 'Тилди тандау *',
        committee: 'Комитетти тандау *',
        comment: 'Комментарий (каалаган)',
        commentPlaceholder: 'Кошумча маалымат же каалоолор...',
        submit: 'Арыз жөнөтүү',
        success: 'Арыз ийгиликтүү жөнөтүлдү! Биз 24 саат ичинде сиз менен байланышабыз.',
        agreement: 'Баскычты басуу менен сиз жеке маалыматтарды иштетүүгө макулсуз'
      },
      importantInfo: 'Маанилүү маалымат',
      infoList: [
        'Бардык маалыматтар корголгон жана үчүнчү тарапка берилбейт',
        'Арыз Telegram аркылуу уюштуруучуларга дароо барат',
        'Сиз email аркылуу ырастоо аласыз',
        'Уюштуруучулар сиз менен деталдарды тактоо үчүн байланышат'
      ]
    },
    contacts: {
      title: 'Байланыш',
      subtitle: 'NGMUN уюштуруучулары менен байланыш',
      telegramBot: 'Telegram Bot',
      officialChannel: 'Расмий Telegram каналы',
      officialEmail: 'Расмий email',
      instagram: 'Instagram',
      instagramDescription: 'Instagramдагы расмий баракча',
      channelDescription: 'Жаңылыктар жана жарыялар',
      emailDescription: 'Бизнес сунуштар үчүн',
      faq: 'Көп берилүүчү суроолор',
      officialChannels: 'Расмий каналдар',
      faqItems: [
        {
          q: 'Менин катталуум кабыл алынганын кантип билем?',
          a: 'Форманы жөнөткөндөн кийин, арыз дароо уюштуруучуларга барат. Сиз 24 саат ичинде Telegram же email аркылуу ырастоо аласыз.'
        },
        {
          q: 'Катталуудан кийин тандалган комитетти өзгөртсө болобу?',
          a: 'Ооба, комитетти өзгөртүү үчүн, катталуудан кийин 3 күн ичинде Telegram аркылуу уюштуруучулар менен байланышыңыз.'
        },
        {
          q: 'Катышуу үчүн төлөм барбы?',
          a: 'Төлөм жөнүндө маалымат иш-чарадан 2 жума мурун Telegram каналында @next_modelun жарыяланат.'
        }
      ]
    },
    footer: {
      description: 'БУУнун билим берүү симуляциясы',
      follow: 'Жаңылыктарды ээрчиңиз',
      rights: 'Бардык укуктар корголгон'
    },
    common: {
      roles: {
        delegate: 'Делегат',
        volunteer: 'Волонтёр',
        observer: 'Күзөтчү'
      },
      languages: {
        russian: 'Орусча',
        english: 'Англисче',
        kyrgyz: 'Кыргызча'
      },
      backToTop: 'Жогору кайтуу'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, options?: { returnObjects?: boolean }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (path: string, options?: { returnObjects?: boolean }): any => {
    const keys = path.split('.');
    let value: any = translations[language];
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        // Fallback to Russian if translation not found
        let fallbackValue: any = translations['ru'];
        for (const fallbackKey of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
            fallbackValue = fallbackValue[fallbackKey];
          } else {
            return path; // Return the path itself if not found even in fallback
          }
        }
        return fallbackValue || path;
      }
    }
    
    if (options?.returnObjects && (Array.isArray(value) || typeof value === 'object')) {
      return value;
    }
    
    return value || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}