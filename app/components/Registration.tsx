'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    institution: '',
    role: 'delegate',
    language: 'russian',
    committee: 'un-women',
    comment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useLanguage();

  const committees = [
    { id: 'un-women', name: 'ООН Женщины' },
    { id: 'general-assembly', name: 'Генеральная Ассамблея' },
    { id: 'unicef', name: 'ЮНИСЕФ' },
    { id: 'who', name: 'ВОЗ' },
    { id: 'climate', name: 'Climate Change Committee' },
    { id: 'human-rights', name: 'Адам укуктары боюнча комитет' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          fullName: '',
          birthDate: '',
          phone: '',
          email: '',
          institution: '',
          role: 'delegate',
          language: 'russian',
          committee: 'un-women',
          comment: ''
        });
        
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Ошибка при отправке формы');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке формы.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, text: t('registration.steps.step1') },
    { number: 2, text: t('registration.steps.step2') },
    { number: 3, text: t('registration.steps.step3') },
  ];

  return (
    <section id="registration" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('registration.title')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('registration.subtitle')}
            </p>
          </div>

          {/* Steps */}
          <div className="card mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {t('registration.steps.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="bg-ngmun-blue-100 text-ngmun-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <p className="text-gray-700">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 mb-4 animate-fadeIn">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-2" />
                  <span className="font-medium">{t('registration.form.success')}</span>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* ФИО */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  {t('registration.form.fullName')}
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngmun-blue-500 focus:border-transparent transition"
                  placeholder="Иванов Иван Иванович"
                />
              </div>

              {/* Дата рождения */}
              <div className="space-y-2">
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                  {t('registration.form.birthDate')}
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngmun-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Телефон */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  {t('registration.form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngmun-blue-500 focus:border-transparent transition"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('registration.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngmun-blue-500 focus:border-transparent transition"
                  placeholder="example@email.com"
                />
              </div>

              {/* Учебное заведение */}
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                  {t('registration.form.institution')}
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngmun-blue-500 focus:border-transparent transition"
                  placeholder="Например: МГУ им. М.В. Ломоносова"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Роль */}
              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  {t('registration.form.role')}
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngmun-blue-500 focus:border-transparent transition"
                >
                  <option value="delegate">{t('common.roles.delegate')}</option>
                  <option value="volunteer">{t('common.roles.volunteer')}</option>
                  <option value="observer">{t('common.roles.observer')}</option>
                </select>
              </div>

              {/* Язык */}
              <div className="space-y-2">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  {t('registration.form.language')}
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngmun-blue-500 focus:border-transparent transition"
                >
                  <option value="russian">{t('common.languages.russian')}</option>
                  <option value="english">{t('common.languages.english')}</option>
                  <option value="kyrgyz">{t('common.languages.kyrgyz')}</option>
                </select>
              </div>

              {/* Комитет */}
              <div className="space-y-2">
                <label htmlFor="committee" className="block text-sm font-medium text-gray-700">
                  {t('registration.form.committee')}
                </label>
                <select
                  id="committee"
                  name="committee"
                  value={formData.committee}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngmun-blue-500 focus:border-transparent transition"
                >
                  {committees.map((committee) => (
                    <option key={committee.id} value={committee.id}>
                      {committee.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Комментарий */}
            <div className="space-y-2">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                {t('registration.form.comment')}
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ngmun-blue-500 focus:border-transparent transition"
                placeholder="Дополнительная информация или пожелания..."
              />
            </div>

            {/* Кнопка отправки */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary flex items-center justify-center ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" />
                    {t('registration.form.submit')}
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500 mt-3 text-center">
                {t('registration.form.agreement')}
              </p>
            </div>
          </form>

          {/* Important Info */}
          <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle size={24} className="text-yellow-500 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  {t('registration.importantInfo')}
                </h4>
                <ul className="text-gray-700 space-y-1">
                  {t('registration.infoList').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;