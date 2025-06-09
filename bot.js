// Імпортуємо бібліотеки
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

// Отримуємо токен з файлу .env
const token = process.env.TELEGRAM_BOT_TOKEN;
const adminChatId = process.env.ADMIN_CHAT_ID;

// Перевіряємо, чи є токен та ID адміна
if (!token || !adminChatId) {
  console.error(
    "Помилка: Не знайдено TELEGRAM_BOT_TOKEN або ADMIN_CHAT_ID у файлі .env"
  );
  process.exit(1);
}

// Ініціалізуємо бота
const bot = new TelegramBot(token, { polling: true });

// Об'єкт для зберігання стану користувачів (для функції "Написати нам")
const userState = {};

// Об'єкт для зберігання зв'язку між повідомленнями адміна та ID користувачів
const messageToUserMap = {};

// --- КОНТЕНТ ТА КЛАВІАТУРИ ---

// 1. Привітання
const welcomeText = `<b>Привіт! Я — Нейрон, твій провідник у світ комп'ютерних наук.</b>
Я народився на кафедрі Інформаційних систем і знаю все про ІТ 🌍

Наша кафедра — частина <b>Національного університету "Одеська політехніка"</b>, Інституту комп'ютерних систем 🧠💻

🎓 Ми готуємо фахівців зі спеціальності <b>122 — Комп'ютерні науки (F3)</b>
Це одна з найперспективніших спеціальностей сьогодення та майбутнього!

💡 У нас ти навчишся не просто програмувати — ти створюватимеш реальні ІТ-рішення, працюватимеш із штучним інтелектом, сучасними мовами, мобільною та веб-розробкою.

🔗 <b>Наш Telegram-канал:</b> <a href="https://t.me/is122_ics">t.me/is122_ics</a>
🔗 <b>Facebook:</b> <a href="https://facebook.com/isonpu">facebook.com/isonpu</a>
🔗 <b>Сайт кафедри:</b> <a href="https://op.edu.ua/kaf-is">op.edu.ua/kaf-is</a>

👇 Обери, що цікавить далі:`;

const welcomeImage = "./img/image.png";

const welcomeKeyboard = {
  inline_keyboard: [
    [{ text: "ℹ️ Про спеціальність", callback_data: "about_specialty" }],
    [{ text: "📞 Контакти кафедри", callback_data: "contacts" }],
  ],
};

// 2. Про спеціальність
const aboutText = `<b>👨‍💻 Що ти тут вивчатимеш?</b>
• програмування, алгоритми
• бази даних, комп'ютерні мережі
• штучний інтелект
• веб- і мобільну розробку
• інженерію ПЗ та кібербезпеку

<b>🔍 Для кого це?</b>
Для тих, хто хоче:
• створювати веб-додатки та сайти
• розвивати стартапи
• бути частиною глобального IT

<b>🎯 Навіщо?</b>
Щоб отримати професію, яка реально потрібна у сучасному світі та змінює світ.
IT — це не майбутнє. Це вже твоя реальність.

📥 <b>Завантаж короткий файл з описом спеціальності:</b>
<a href="https://example.com/specialty.pdf">[PDF-файл із описом]</a> (Замініть посилання на реальний файл)`;

const aboutKeyboard = {
  inline_keyboard: [
    [{ text: "🚀 Кар'єрні можливості", callback_data: "career" }],
    [{ text: "🌍 Міжнародні можливості", callback_data: "international" }],
    [{ text: "🔙 Назад", callback_data: "back_to_start" }],
  ],
};

// 3.1 Кар'єрні можливості
const careerText = `<b>🚀 КАР'ЄРНІ МОЖЛИВОСТІ</b>
Ти зможеш розвиватися як фахівець рівня:
<b>Junior → Middle → Senior</b>

<b>🔧 Обирай напрям за інтересами:</b>
• Software Developer
• Mobile Developer (iOS/Android)
• Frontend / Backend / Fullstack Developer
• QA / QC Engineer
• System Administrator
• Database Developer / Administrator
• System Analyst
• Data Scientist
• Intelligent Systems Developer

🎯 Знання + практика = сильне IT-портфоліо ще до випуску!`;

const careerKeyboard = {
  inline_keyboard: [
    [{ text: "🔙 Назад до опису", callback_data: "about_specialty" }],
    [{ text: "📞 Контакти кафедри", callback_data: "contacts" }],
  ],
};

// 3.2 Міжнародні можливості
const internationalText = `<b>🌍 Хочеш навчатися за європейськими стандартами?</b>
З нами — це реальність:
• подвійні дипломи з ВНЗ Європи
• міжнародні програми обміну
• стажування в ІТ-компаніях
• англомовні курси
• робота з іноземними студентами

🚀 Кар'єра в ІТ починається вже тут!`;

const internationalKeyboard = {
  inline_keyboard: [
    [{ text: "🔙 Назад до опису", callback_data: "about_specialty" }],
    [{ text: "📞 Контакти кафедри", callback_data: "contacts" }],
  ],
};

// 4. Контакти
const contactsText = `<b>📞 Контакти кафедри ІС</b>
📧 <b>Email:</b> kaf.is@op.edu.ua
☎️ <b>Телефон:</b> +38 (048) 705-85-86
🌐 <b>Сайт:</b> <a href="https://op.edu.ua/kaf-is">op.edu.ua/kaf-is</a>`;

const contactsKeyboard = {
  inline_keyboard: [
    [{ text: "💬 Написати нам", callback_data: "write_to_us" }],
    [{ text: "🔙 Назад до головного меню", callback_data: "back_to_start" }],
  ],
};

// 4.1 Написати нам
const writeToUsText = `Обери, як зручно зв'язатися:`;
const writeToUsKeyboard = {
  inline_keyboard: [
    // Замініть USERNAME_ADMIN на нікнейм адміна
    [{ text: "✈️ Telegram-чат", url: "https://t.me/USERNAME_ADMIN" }],
    [{ text: "✍️ Написати тут (боту)", callback_data: "write_via_bot" }],
    [{ text: "🔙 Назад до контактів", callback_data: "contacts" }],
  ],
};

// --- ОБРОБНИКИ КОМАНД ТА КНОПОК ---

// Обробник команди /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendPhoto(chatId, welcomeImage, {
    caption: welcomeText,
    parse_mode: "HTML",
    reply_markup: welcomeKeyboard,
  });
});

// Обробник всіх натискань на inline-кнопки (ОНОВЛЕНА ВЕРСІЯ)
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;

  // Відповідаємо на запит, щоб прибрати "годинник" біля кнопки
  bot.answerCallbackQuery(query.id);

  let text;
  let keyboard;

  // Визначаємо, який текст та клавіатуру показати
  switch (data) {
    case "about_specialty":
      text = aboutText;
      keyboard = aboutKeyboard;
      break;
    case "career":
      text = careerText;
      keyboard = careerKeyboard;
      break;
    case "international":
      text = internationalText;
      keyboard = internationalKeyboard;
      break;
    case "contacts":
      text = contactsText;
      keyboard = contactsKeyboard;
      break;
    case "write_to_us":
      text = writeToUsText;
      keyboard = writeToUsKeyboard;
      break;
    case "write_via_bot":
      userState[chatId] = "awaiting_question";
      bot.sendMessage(
        chatId,
        "Будь ласка, напишіть ваше запитання одним повідомленням. Я передам його адміністратору."
      );
      return; // Виходимо, бо тут не потрібно редагувати повідомлення
    case "back_to_start":
      // Для повернення на головний екран видаляємо поточне повідомлення і надсилаємо стартове заново
      bot
        .deleteMessage(chatId, messageId)
        .catch((err) => console.log(err.message));
      bot.sendPhoto(chatId, welcomeImage, {
        caption: welcomeText,
        parse_mode: "HTML",
        reply_markup: welcomeKeyboard,
      });
      return; // Виходимо
  }

  // Намагаємося відредагувати повідомлення як текстове
  bot
    .editMessageText(text, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "HTML",
      reply_markup: keyboard,
      disable_web_page_preview: true,
    })
    .catch((error) => {
      // Якщо виникає помилка "there is no text...", це означає, що ми намагалися редагувати фото.
      // В такому випадку ми видаляємо повідомлення з фото і надсилаємо нове, вже текстове.
      if (
        error.code === "ETELEGRAM" &&
        error.message.includes("message is not modified") === false
      ) {
        bot
          .deleteMessage(chatId, messageId)
          .catch((err) => console.log(err.message));
        bot.sendMessage(chatId, text, {
          parse_mode: "HTML",
          reply_markup: keyboard,
          disable_web_page_preview: true,
        });
      } else {
        // Ігноруємо помилку "message is not modified" або логуємо інші помилки
        if (error.message.includes("message is not modified") === false) {
          console.error("Error editing message:", error.message);
        }
      }
    });
});

// Обробник текстових повідомлень
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;

  // Ігноруємо команди
  if (msg.text && msg.text.startsWith("/")) {
    return;
  }

  // Якщо це повідомлення від адміна і воно є відповіддю на інше повідомлення
  if (chatId == adminChatId && msg.reply_to_message) {
    const repliedMessageId = msg.reply_to_message.message_id;

    // Перевіряємо, чи є збережена інформація про користувача для цього повідомлення
    if (messageToUserMap[repliedMessageId]) {
      const originalUserId = messageToUserMap[repliedMessageId];
      const adminReply = msg.text;

      // Надсилаємо відповідь користувачу
      bot.sendMessage(
        originalUserId,
        `<b>📧 Відповідь від адміністратора:</b>\n\n${adminReply}`,
        { parse_mode: "HTML" }
      );

      // Повідомляємо адміну, що відповідь надіслана
      bot.sendMessage(adminChatId, "✅ Ваша відповідь надіслана користувачу.", {
        reply_to_message_id: messageId,
      });

      // Видаляємо запис з карти повідомлень
      delete messageToUserMap[repliedMessageId];

      return;
    }
  }

  // Перевіряємо, чи очікуємо ми на питання від цього користувача
  if (userState[chatId] === "awaiting_question") {
    const userQuestion = msg.text;
    const userName = msg.from.username
      ? `@${msg.from.username}`
      : `${msg.from.first_name} ${msg.from.last_name || ""}`;

    const messageToAdmin = `<b>Нове запитання від користувача ${userName} (ID: ${chatId})</b>\n\n"${userQuestion}"

<i>Щоб відповісти, використайте функцію Reply на це повідомлення.</i>`;

    // Надсилаємо повідомлення адміну
    bot
      .sendMessage(adminChatId, messageToAdmin, { parse_mode: "HTML" })
      .then((sentMessage) => {
        // Зберігаємо зв'язок між ID повідомлення адміна та ID користувача
        messageToUserMap[sentMessage.message_id] = chatId;
      });

    // Повідомляємо користувача, що його питання надіслано
    bot.sendMessage(
      chatId,
      "✅ Дякую! Ваше повідомлення надіслано адміністратору. Вам дадуть відповідь найближчим часом."
    );

    // Скидаємо стан користувача
    delete userState[chatId];
  }
});

console.log('Бот "Нейрон" успішно запущений!');
