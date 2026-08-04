<div align="center">

# 🎂 Valerie Bakery

**Custom cakes & desserts in Saint Petersburg · Торты и десерты на заказ в Санкт-Петербурге**

Natural ingredients · handcrafted · individual decor

[![Visit the site](https://img.shields.io/badge/🌐_Visit_site-valeriebakery.ru-E59CB0?style=for-the-badge)](https://valeriebakery.ru/)

[**valeriebakery.ru**](https://valeriebakery.ru/)

![Valerie Bakery](https://storage.googleapis.com/gpt-engineer-file-uploads/IW4fwzxeEgQoLUO485BPvg6U9CY2/social-images/social-1777320994073-CE9C9C4C-5928-41E2-8F6E-E29B0A277CDF.webp)

**[English](#english)** · **[Русский](#русский)**

</div>

---

## English

### About

**Valerie Bakery** is the landing site for a private confectionery in Saint Petersburg. It showcases the product range, presents a gallery of work, and accepts orders for custom cakes, cupcakes, and desserts. Order requests are delivered to the baker in Telegram in real time.

It's a single-page application with smooth animated scrolling, a fully responsive layout, and search-engine optimization (SEO meta tags, Open Graph, canonical links).

### Features

- 🧁 **Menu** — a showcase of cakes and desserts with descriptions and prices
- 🖼️ **Gallery** — a portfolio of completed work
- 📝 **Order form** — request submission with validation and a phone-number mask
- 📩 **Telegram notifications** — orders reach the confectioner instantly
- ❓ **FAQ** — answers to common customer questions
- 🌊 **Smooth scrolling** and section reveal animations
- 📱 **Responsive design** — looks great on any device
- 🔎 **SEO** — meta tags, Open Graph, Twitter Card, `robots`, canonical links
- 🔐 **Privacy policy page**

### Getting started

You'll need [Node.js](https://nodejs.org/) (18+) and npm.

```sh
# 1. Clone the repository
git clone https://github.com/Max-Osipchuk/valeriebakery.git

# 2. Enter the project directory
cd valeriebakery

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

The app will open at `http://localhost:5173`.

### Environment variables

Create a `.env` file in the project root for the order form and Supabase integration:

```sh
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

The `send-telegram` Edge Function forwards orders to Telegram — set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in your Supabase settings.

### Scripts

| Command              | Purpose |
|----------------------|---------|
| `npm run dev`        | Start the dev server |
| `npm run build`      | Production build |
| `npm run preview`    | Preview the build locally |
| `npm run lint`       | Run ESLint |
| `npm run test`       | Run tests |
| `npm run test:watch` | Tests in watch mode |

### Deployment

The project is deployed on [Lovable](https://lovable.dev/) and is live at **[valeriebakery.ru](https://valeriebakery.ru/)**. The production build (`npm run build`) can be hosted on any static host (Vercel, Netlify, GitHub Pages, etc.).

---

## Русский

### О проекте

**Valerie Bakery** — лендинг частной кондитерской из Санкт-Петербурга. Сайт знакомит с ассортиментом, показывает галерею работ и принимает заявки на индивидуальный заказ тортов, капкейков и десертов. Заявки с формы мгновенно отправляются мастеру в Telegram.

Одностраничное приложение с плавной анимированной прокруткой, адаптивной вёрсткой и оптимизацией под поисковые системы (SEO-метатеги, Open Graph, канонические ссылки).

### Возможности

- 🧁 **Меню** — витрина тортов и десертов с описанием и ценами
- 🖼️ **Галерея** — портфолио готовых работ
- 📝 **Форма заказа** — оформление заявки с валидацией и маской телефона
- 📩 **Уведомления в Telegram** — заявки приходят кондитеру в реальном времени
- ❓ **FAQ** — ответы на частые вопросы клиентов
- 🌊 **Плавная прокрутка** и анимации появления секций
- 📱 **Адаптивный дизайн** — корректное отображение на любых устройствах
- 🔎 **SEO** — метатеги, Open Graph, Twitter Card, `robots`, канонические ссылки
- 🔐 **Страница политики конфиденциальности**

### Быстрый старт

Нужны [Node.js](https://nodejs.org/) (18+) и npm.

```sh
# 1. Клонировать репозиторий
git clone https://github.com/Max-Osipchuk/valeriebakery.git

# 2. Перейти в каталог проекта
cd valeriebakery

# 3. Установить зависимости
npm install

# 4. Запустить дев-сервер
npm run dev
```

Приложение откроется на `http://localhost:5173`.

### Переменные окружения

Для работы формы заказа и интеграции с Supabase создайте файл `.env` в корне проекта:

```sh
VITE_SUPABASE_URL=ваш_supabase_url
VITE_SUPABASE_ANON_KEY=ваш_anon_key
```

Edge Function `send-telegram` отправляет заявки в Telegram — задайте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` в настройках Supabase.

### Команды

| Команда              | Назначение |
|----------------------|------------|
| `npm run dev`        | Запуск дев-сервера |
| `npm run build`      | Продакшен-сборка |
| `npm run preview`    | Локальный просмотр сборки |
| `npm run lint`       | Проверка ESLint |
| `npm run test`       | Запуск тестов |
| `npm run test:watch` | Тесты в watch-режиме |

### Деплой

Проект развёрнут на платформе [Lovable](https://lovable.dev/) и доступен по адресу **[valeriebakery.ru](https://valeriebakery.ru/)**. Продакшен-сборка (`npm run build`) может быть размещена на любом статическом хостинге (Vercel, Netlify, GitHub Pages и др.).

---

## Tech stack · Технологии

| Category · Категория | Stack · Стек |
|----------------------|------|
| Build · Сборка       | [Vite](https://vitejs.dev/) |
| Language · Язык      | [TypeScript](https://www.typescriptlang.org/) |
| UI                   | [React 18](https://react.dev/) |
| Components · Компоненты | [shadcn/ui](https://ui.shadcn.com/) · [Radix UI](https://www.radix-ui.com/) |
| Styles · Стили       | [Tailwind CSS](https://tailwindcss.com/) |
| Data · Данные        | [TanStack Query](https://tanstack.com/query) |
| Routing · Маршрутизация | [React Router](https://reactrouter.com/) |
| Forms · Формы        | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Scroll · Прокрутка   | [Lenis](https://lenis.darkroom.engineering/) |
| Backend · Бэкенд     | [Supabase](https://supabase.com/) (Edge Functions) |
| Tests · Тесты        | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |

## Project structure · Структура проекта

```
src/
├── components/        # Sections & UI components · Секции и UI-компоненты
│   ├── HeroSection.tsx
│   ├── MenuSection.tsx
│   ├── GallerySection.tsx
│   ├── FAQSection.tsx
│   ├── CTASection.tsx
│   ├── OrderForm.tsx
│   ├── Header.tsx · Footer.tsx
│   └── ui/            # shadcn/ui components
├── data/menu.ts       # Menu data · Данные меню
├── pages/             # Index · Privacy · NotFound
├── hooks/ · lib/      # Hooks & utilities · Хуки и утилиты
└── integrations/      # Supabase integration · Интеграция с Supabase
supabase/
└── functions/
    └── send-telegram/ # Edge Function for notifications · Edge Function для уведомлений
```

---

<div align="center">

Made with ❤️ for **Valerie Bakery** · Saint Petersburg / Санкт-Петербург

[🌐 Website](https://valeriebakery.ru/) · [📷 Twitter / X](https://twitter.com/ValerieBakery)

</div>
