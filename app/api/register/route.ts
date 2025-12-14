import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Функция для экранирования специальных символов Markdown
function escapeMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/~/g, '\\~')
    .replace(/`/g, '\\`')
    .replace(/>/g, '\\>')
    .replace(/#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/-/g, '\\-')
    .replace(/=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/!/g, '\\!');
}

export async function POST(request: NextRequest) {
  console.log('=== НАЧАЛО ОБРАБОТКИ ЗАЯВКИ ===');
  
  try {
    const data = await request.json();
    console.log('Получены данные:', JSON.stringify(data, null, 2));
    console.log('TELEGRAM_BOT_TOKEN:', TELEGRAM_BOT_TOKEN ? '✅ Установлен' : '❌ Отсутствует');
    console.log('TELEGRAM_CHAT_ID:', TELEGRAM_CHAT_ID || '❌ Отсутствует');

    // Проверяем наличие обязательных переменных
    if (!TELEGRAM_BOT_TOKEN) {
      console.error('❌ TELEGRAM_BOT_TOKEN не установлен в .env.local');
      return NextResponse.json(
        { 
          error: 'Не настроен Telegram бот',
          details: 'Добавьте TELEGRAM_BOT_TOKEN в файл .env.local'
        },
        { status: 500 }
      );
    }

    if (!TELEGRAM_CHAT_ID) {
      console.error('❌ TELEGRAM_CHAT_ID не установлен в .env.local');
      return NextResponse.json(
        { 
          error: 'Не указан чат для уведомлений',
          details: 'Добавьте TELEGRAM_CHAT_ID в файл .env.local'
        },
        { status: 500 }
      );
    }

    // Проверяем токен на валидность
    console.log('Проверяем токен бота...');
    const botInfoUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`;
    const botInfoResponse = await fetch(botInfoUrl);
    const botInfo = await botInfoResponse.json();
    
    if (!botInfo.ok) {
      console.error('❌ Неверный токен бота:', botInfo.description);
      return NextResponse.json(
        { 
          error: 'Неверный токен Telegram бота',
          details: botInfo.description
        },
        { status: 500 }
      );
    }

    console.log('✅ Токен валиден. Бот:', botInfo.result.username);

    // Маппинг значений для читаемого отображения
    const roleMap: { [key: string]: string } = {
      delegate: 'Делегат',
      volunteer: 'Волонтёр',
      observer: 'Наблюдатель'
    };

    const languageMap: { [key: string]: string } = {
      russian: 'Русский',
      english: 'English',
      kyrgyz: 'Кыргызский'
    };

    const committeeMap: { [key: string]: string } = {
      'un-women': 'ООН Женщины',
      'general-assembly': 'Генеральная Ассамблея',
      unicef: 'ЮНИСЕФ',
      who: 'ВОЗ',
      climate: 'Climate Change Committee',
      'human-rights': 'Адам укуктары боюнча комитет'
    };

    // Экранируем все текстовые данные
    const escapedFullName = escapeMarkdown(data.fullName || 'Не указано');
    const escapedBirthDate = escapeMarkdown(data.birthDate || 'Не указана');
    const escapedPhone = escapeMarkdown(data.phone || 'Не указан');
    const escapedEmail = escapeMarkdown(data.email || 'Не указан');
    const escapedInstitution = escapeMarkdown(data.institution || 'Не указано');
    const escapedRole = escapeMarkdown(roleMap[data.role] || data.role);
    const escapedLanguage = escapeMarkdown(languageMap[data.language] || data.language);
    const escapedCommittee = escapeMarkdown(committeeMap[data.committee] || data.committee);
    const escapedComment = escapeMarkdown(data.comment || '');

    // Формируем сообщение с экранированными символами
    const message = `🎉 *НОВАЯ ЗАЯВКА НА NGMUN* 🎉

*👤 ФИО:* ${escapedFullName}
*📅 Дата рождения:* ${escapedBirthDate}
*📞 Телефон:* ${escapedPhone}
*📧 Email:* ${escapedEmail}
*🏫 Учебное заведение:* ${escapedInstitution}

*🎭 Роль:* ${escapedRole}
*🗣️ Язык:* ${escapedLanguage}
*🏛️ Комитет:* ${escapedCommittee}

${escapedComment ? `*💬 Комментарий:* ${escapedComment}` : ''}

*📋 Заявка получена:* ${new Date().toLocaleString('ru-RU')}
*🆔 ID заявки:* ${Date.now().toString(36).toUpperCase()}`;

    console.log('Отправляем сообщение в Telegram...');
    console.log('Chat ID:', TELEGRAM_CHAT_ID);
    console.log('Сообщение:', message);

    // Отправляем в Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const telegramData = await telegramResponse.json();
    console.log('Ответ Telegram:', telegramData);

    if (!telegramResponse.ok) {
      console.error('❌ Ошибка Telegram:', telegramData);
      
      // Если все равно ошибка с Markdown, пробуем отправить без разметки
      if (telegramData.description?.includes("can't parse entities")) {
        console.log('Пробуем отправить без Markdown разметки...');
        
        const plainMessage = `🎉 НОВАЯ ЗАЯВКА НА NGMUN 🎉

👤 ФИО: ${data.fullName || 'Не указано'}
📅 Дата рождения: ${data.birthDate || 'Не указана'}
📞 Телефон: ${data.phone || 'Не указан'}
📧 Email: ${data.email || 'Не указан'}
🏫 Учебное заведение: ${data.institution || 'Не указано'}

🎭 Роль: ${roleMap[data.role] || data.role}
🗣️ Язык: ${languageMap[data.language] || data.language}
🏛️ Комитет: ${committeeMap[data.committee] || data.committee}

${data.comment ? `💬 Комментарий: ${data.comment}` : ''}

📋 Заявка получена: ${new Date().toLocaleString('ru-RU')}
🆔 ID заявки: ${Date.now().toString(36).toUpperCase()}`;

        const fallbackResponse = await fetch(telegramUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: plainMessage,
          }),
        });

        const fallbackData = await fallbackResponse.json();
        
        if (!fallbackResponse.ok) {
          console.error('❌ Ошибка при отправке без разметки:', fallbackData);
          return NextResponse.json(
            { 
              error: 'Ошибка отправки в Telegram',
              telegramError: telegramData.description,
              fallbackError: fallbackData.description
            },
            { status: 500 }
          );
        }

        console.log('✅ Заявка успешно отправлена (без Markdown)!');
        console.log('Message ID:', fallbackData.result.message_id);

        return NextResponse.json(
          { 
            success: true, 
            message: 'Заявка успешно отправлена!',
            telegramMessageId: fallbackData.result.message_id,
            usedFallback: true
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { 
          error: 'Ошибка отправки в Telegram',
          telegramError: telegramData.description
        },
        { status: 500 }
      );
    }

    console.log('✅ Заявка успешно отправлена в Telegram!');
    console.log('Message ID:', telegramData.result.message_id);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена!',
        telegramMessageId: telegramData.result.message_id
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ Критическая ошибка:', error);
    console.error('Stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Внутренняя ошибка сервера',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  } finally {
    console.log('=== КОНЕЦ ОБРАБОТКИ ЗАЯВКИ ===\n');
  }
}