import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Экранирование специальных символов Markdown
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

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: 'Telegram не настроен' },
        { status: 500 }
      );
    }

    // Проверка токена
    const botInfo = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`
    ).then(res => res.json());

    if (!botInfo.ok) {
      return NextResponse.json(
        { error: 'Неверный токен Telegram' },
        { status: 500 }
      );
    }

    // Маппинги
    const roleMap: Record<string, string> = {
      delegate: 'Делегат',
      volunteer: 'Волонтёр',
      observer: 'Наблюдатель',
    };

    const languageMap: Record<string, string> = {
      russian: 'Русский',
      english: 'English',
      kyrgyz: 'Кыргызский',
    };

    const committeeMap: Record<string, string> = {
      'un-women': 'ООН Женщины',
      'general-assembly': 'Генеральная Ассамблея',
      unicef: 'ЮНИСЕФ',
      who: 'ВОЗ',
      climate: 'Climate Change Committee',
      'human-rights': 'Адам укуктары боюнча комитет',
    };

    // Экранированные поля
    const escapedFullName = escapeMarkdown(data.fullName || 'Не указано');
    const escapedBirthDate = escapeMarkdown(data.birthDate || 'Не указана');
    const escapedPhone = escapeMarkdown(data.phone || 'Не указан');
    const escapedEmail = escapeMarkdown(data.email || 'Не указан');
    const escapedInstitution = escapeMarkdown(data.institution || 'Не указано');
    const escapedTelegram = escapeMarkdown(data.telegramUsername || 'Не указан');
    const escapedRole = escapeMarkdown(roleMap[data.role] || data.role);
    const escapedLanguage = escapeMarkdown(languageMap[data.language] || data.language);
    const escapedCommittee = escapeMarkdown(committeeMap[data.committee] || data.committee);
    const escapedComment = escapeMarkdown(data.comment || '');

    // Сообщение
    const message = `🎉 *НОВАЯ ЗАЯВКА НА NGMUN* 🎉

*👤 ФИО:* ${escapedFullName}
*📅 Дата рождения:* ${escapedBirthDate}
*📞 Телефон:* ${escapedPhone}
*📧 Email:* ${escapedEmail}
*🏫 Учебное заведение:* ${escapedInstitution}
*💬 Telegram:* ${escapedTelegram}

*🎭 Роль:* ${escapedRole}
*🗣️ Язык:* ${escapedLanguage}
*🏛️ Комитет:* ${escapedCommittee}

${escapedComment ? `*💬 Комментарий:* ${escapedComment}` : ''}

*📋 Получено:* ${new Date().toLocaleString('ru-RU')}
*🆔 ID:* ${Date.now().toString(36).toUpperCase()}`;

    // Отправка
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    // Fallback без Markdown
    if (!telegramResponse.ok) {
      const plainMessage = `НОВАЯ ЗАЯВКА НА NGMUN

ФИО: ${data.fullName}
Дата рождения: ${data.birthDate}
Телефон: ${data.phone}
Email: ${data.email}
Учебное заведение: ${data.institution}
Telegram: @${data.telegramUsername}

Роль: ${roleMap[data.role]}
Язык: ${languageMap[data.language]}
Комитет: ${committeeMap[data.committee]}

${data.comment ? `Комментарий: ${data.comment}` : ''}`;

      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: plainMessage,
          }),
        }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Ошибка сервера', details: error.message },
      { status: 500 }
    );
  }
}
