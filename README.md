# Neuron - Odesa Polytechnic ICS Department Bot

This is an informational Telegram bot for the Department of Information Systems (ICS) at Odesa Polytechnic National University. It is designed to provide prospective students with essential details about the "122 - Computer Science" specialty, showcase career opportunities, and offer a direct line of communication with a department administrator.

## Features

-   **Interactive Menu**: Easy navigation using inline keyboards.
-   **Detailed Information**: Provides structured information about the curriculum, career paths, and international exchange programs.
-   **Direct Feedback System**: Allows users to send questions directly to the administrator.
-   **Admin Reply Functionality**: The administrator can reply to user questions directly from their own Telegram chat using the "Reply" feature, and the bot will forward the response to the correct user.
-   **External Links**: Quick access to the department's official website, Facebook page, and Telegram channel.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
-   [Node.js](https://nodejs.org/) (v14.x or higher is recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

You will also need:
-   A **Telegram Bot Token**. You can get one from [@BotFather](https://t.me/BotFather) on Telegram.
-   Your personal **Telegram User ID**. You can get it by messaging a bot like [@userinfobot](https://t.me/userinfobot).

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Clone the repository

First, clone the repository to your local machine using Git.

```bash
git clone https://github.com/S-Kulibaba/polytechnic-bot.git
```

Then, navigate to the project directory.

### 2. Install dependencies

Install all the required npm packages defined in `package.json`.

```bash
npm install
```

### 3. Set up environment variables

The project uses a `.env` file to store sensitive credentials. Create a copy of the example file.

```bash
cp .env.example .env
```

Now, open the newly created `.env` file with a text editor and add your credentials.

```env
# Telegram Bot Token from @BotFather
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE

# Your personal Telegram User ID to receive and reply to messages
ADMIN_CHAT_ID=YOUR_PERSONAL_TELEGRAM_ID_HERE
```

### 4. Run the bot

You are now ready to start the bot. Run the following command in your console:

```bash
node bot.js
```

If everything is set up correctly, you will see a confirmation message in your console:
`Бот "Нейрон" успішно запущений!`

Your Telegram bot is now online and ready to use!

## Environment Variables

As mentioned earlier, this project requires the following environment variables to be set in the `.env` file:

| Variable             | Description                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| `TELEGRAM_BOT_TOKEN` | The secret token for your Telegram bot, provided by @BotFather.                                          |
| `ADMIN_CHAT_ID`      | The unique numeric ID of the Telegram user who will act as the administrator to receive and answer questions. |
