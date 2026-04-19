import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  // Skip internal paths and API routes early
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return intlMiddleware(req);
  }

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    const url = req.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.redirect(url, 301);
  }

  if (segments.length > 0) {
    const requestedLocale = segments[0];

    // English-Only Lockdown
    if (requestedLocale !== 'en') {
      const url = req.nextUrl.clone();
      const isKnownLocale = routing.locales.includes(requestedLocale as any) || /^[a-z]{2}(-[a-z]{2})?$/i.test(requestedLocale);
      const newSegments = isKnownLocale ? ['en', ...segments.slice(1)] : ['en', ...segments];
      url.pathname = `/${newSegments.join('/')}`;
      return NextResponse.redirect(url, 301);
    }

    // Check if the first segment is a 2-letter code but not in our supported locales
    const isSupportedLocale = routing.locales.includes(requestedLocale as any);
    const looksLikeLocale = /^[a-z]{2}(-[a-z]{2})?$/i.test(requestedLocale);

    if (!isSupportedLocale && looksLikeLocale) {
      // It's a malformed or unsupported locale, redirect to the default locale (/en)
      const url = req.nextUrl.clone();
      
      // Reconstruct the path with the default locale
      const newSegments = [routing.defaultLocale, ...segments.slice(1)];
      url.pathname = `/${newSegments.join('/')}`;
      
      return NextResponse.redirect(url, 301);
    }
    
    if (isSupportedLocale && segments.length > 1) {
      const secondSegment = segments[1];
      const isSecondSupportedLocale = routing.locales.includes(secondSegment as any);
      
      if (isSecondSupportedLocale) {
        // Double locale detected (e.g., /ca/de/auto/...). 
        // This usually happens with broken relative links.
        // We'll strip the first locale and keep the second (the destination they intended to click).
        const url = req.nextUrl.clone();
        url.pathname = `/${segments.slice(1).join('/')}`;
        return NextResponse.redirect(url, 301);
      }
    }
  }

  // Fallback to next-intl middleware for valid locales or paths without locales
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Match all paths except internal Next.js files and static assets
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/'
  ]
}; proxy js

Я помогу вам разобраться с системой роутинга в вашем проекте. Давайте сначала изучим структуру проекта и найдем функции, отвечающие за создание карты сайта и роутинг.Вижу, что это Next.js проект. Давайте посмотрим на директорию `app` и папку `messages`:Отлично! Я проанализировал вашу систему роутинга и создаю подробный отчет.

## 📊 ПОЛНЫЙ ОТЧЕТ: Как работает роутинг и карта сайта в вашем проекте

### 🎯 Обзор системы

Ваш проект использует **Next.js App Router** с поддержкой мультилангуальности через **next-intl**. Структура базируется на динамическом роутинге, где **паука sitemap и маршруты генерируются автоматически** из содержимого папки `messages` и конфига `VALID_TOOLS`.

---

## 1️⃣ АРХИТЕКТУРА РОУТИНГА

### Основная структура URL:
```
/{locale}/{category}/{tool}/{spoke?}
```

**Пример:**
```
/en/auto/fuel-consumption
/en/auto/total-cost-of-ownership/sedan
/uk-ua/health/bmr-calculator
```

### Уровни иерархии:

```
app/
├── [locale]/                          # Уровень 1: Язык/локаль
│   ├── layout.tsx                     # Root Layout
│   ├── page.tsx                       # Домашняя страница
│   ├── [category]/                    # Уровень 2: Категория инструментов
│   │   ├── page.tsx                   # Страница категории
│   │   └── [...tool]/                 # Уровень 3: Инструмент (динамический)
│   │       └── page.tsx               # Страница инструмента
│   ├── privacy/
│   ├── terms/
│   ├── cookies/
│   └── about-us/
```

---

## 2️⃣ КЛЮЧЕВЫЕ ФАЙЛЫ И ИХ ФУНКЦИИ

### A) 🔧 **i18n/routing.ts** - Определение локалей

```typescript
// Базовые языки (27 штук)
const baseLocales = ['ar', 'be', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fi', 'fr', 'hu', 'it', 'lb', 'lt', 'lv', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sv', 'tr', 'uk'];

// Региональные гео-локали (язык-страна)
const geoLocales = ['uk-ua', 'ru-ua', 'en-ua', /* и ещё ~35... */];

export const routing = defineRouting({
  locales: [...baseLocales, ...geoLocales],  // 62+ локали всего
  defaultLocale: 'en',
  localePrefix: 'always'  // Всегда показываем /locale в URL
});
```

**Это определяет:**
- Какие языки поддерживает приложение
- Какой язык по умолчанию
- Что локаль ВСЕГДА должна быть в URL

---

### B) 📋 **config/valid-tools.ts** - Карта категорий и инструментов

```typescript
export const VALID_TOOLS = {
  auto: ['fuel-consumption', 'power-converter', 'total-cost-of-ownership'],
  health: ['bmr-calculator'],
  pc: ['psu-calculator'],
  img: ['minipaint', 'polaroid'],
  programming: ['img-to-hash'],
  safety: ['password-generator'],
  math: ['compound-interest-calculator'],
};
```

**Это — ВАШ ИСТОЧНИК ИСТИНЫ для роутинга!**
- Определяет, какие категории существуют
- Какие инструменты в каждой категории
- Используется для валидации 404 на сервере

---

### C) 📦 **i18n/request.ts** - Загрузка переводов

```typescript
// Важная функция: loadFolderLocaleMessages
async function loadFolderLocaleMessages(locale: string, namespaces: string[]): Promise<Messages> {
  let messages: Messages = {};
  
  await Promise.all(
    namespaces.map(async (namespace) => {
      try {
        // Загружает: messages/{locale}/{namespace}.json
        const mod = await import(`../messages/${locale}/${namespace}.json`);
        messages = mergeDeep(messages, normalized);
      } catch {
        // Namespace опциональный для каждой локали
      }
    })
  );
  
  return messages;
}
```

**Поток загрузки переводов:**
```
1. Приходит запрос с locale = "en"
2. Код берёт первую часть (en) даже если locale = "en-ua"
3. Загружает messages/en/auto.json, messages/en/health.json, etc.
4. Объединяет все в один объектMessages
5. Передаёт в React Context для компонентов
```

---

### D) 🗺️ **app/sitemap.ts** - Генерация sitemap для поисковиков

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.zernar.com';
  const locales = ['en'];  // ⚠️ Сейчас только английский
  
  // 1. Категории: /en, /en/auto, /en/health, /en/privacy
  const categoryRoutes = ['', ...Object.keys(VALID_TOOLS).map(cat => `/${cat}`)];
  
  // 2. Генерируем все инструменты динамически
  const toolEntries = locales.flatMap((locale) =>
    Object.entries(VALID_TOOLS).flatMap(([category, tools]) =>
      tools.map((tool) => ({
        url: `${baseUrl}/${locale}/${category}/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      }))
    )
  );
  
  return [...categoryEntries, ...toolEntries];
}
```

**Почему sitemap генерируется автоматически?**
- Потому что вы используете `Object.keys(VALID_TOOLS)` и `VALID_TOOLS[category]`
- **Если добавите новый инструмент в VALID_TOOLS → автоматически в sitemap**

---

## 3️⃣ КАК РАБОТАЕТ РОУТИНГ STEP-BY-STEP

### Сценарий: Пользователь заходит на `/en/auto/fuel-consumption`

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Next.js парсит URL: /en/auto/fuel-consumption            │
├─────────────────────────────────────────────────────────────┤
│ 2. Извлекает параметры из файлов [locale], [category], tool│
│    locale = "en"                                            │
│    category = "auto"                                        │
│    tool = ["fuel-consumption"]                              │
├─────────────────────────────────────────────────────────────┤
│ 3. Выполняется app/[locale]/layout.tsx                     │
│    ✓ setRequestLocale("en")                                │
│    ✓ getMessages() загружает переводы                       │
│    ✓ pickMessages() отбирает нужные namespace              │
│    ✓ Оборачивает дочерние компоненты в NextIntlClientProvider
├─────────────────────────────────────────────────────────────┤
│ 4. Выполняется app/[locale]/[category]/[...tool]/page.tsx │
│    ✓ generateMetadata() создаёт meta-теги для SEO          │
│    ✓ generateStaticParams() определяет какие URL предгенерировать
│    ✓ Основной компонент рендерит инструмент               │
├─────────────────────────────────────────────────────────────┤
│ 5. Валидация (если инструмент не существует):              │
│    ✓ Проверяет: category in VALID_TOOLS                    │
│    ✓ Проверяет: tool in VALID_TOOLS[category]              │
│    → Если ошибка → возвращает fallback категория page      │
└─────────────────────────────────────────────────────────────┘
```

---

## 4️⃣ ГЕНЕРАЦИЯ СТАТИЧЕСКИХ МАРШРУТОВ

### В файле `app/[locale]/[category]/[...tool]/page.tsx`:

```typescript
export async function generateStaticParams() {
  const paths = [];
  const spokes = ['luxus-suv', 'sedan', 'elektroauto', 'used-car'];
  
  // ЗАЦИКЛИВАЕМ по всем локалям × категориям × инструментам
  for (const locale of routing.locales) {           // 62 локали
    for (const [category, tools] of Object.entries(VALID_TOOLS)) {  // 7 категорий
      for (const tool of tools) {                    // 3-14 инструментов
        paths.push({ locale, category, tool: [tool] });
        
        // Спецслучай: для TCO калькулятора добавляем "спицы"
        if (tool === 'total-cost-of-ownership') {
          for (const spoke of spokes) {              // 4 варианта авто
            paths.push({ locale, category, tool: [tool, spoke] });
          }
        }
      }
    }
  }
  return paths;
}
```

**Примерная статистика:**
- Базовые маршруты: 62 локали × 7 категорий × 10 инструментов = **~4,340 страниц**
- С TCO спицами: +62 × 4 = **+248 страниц**
- **ИТОГО: ~4,588 статических HTML страниц**

---

## 5️⃣ СТРУКТУРА ПАПКИ `messages/`

### Как это связано с роутингом?

```
messages/
├── en.json                 # Глобальный переводы на англ
├── ru.json                 # Глобальный переводы на русс
├── uk.json
├─�� [...остальные языки...]
└── en/                     # Для каждого языка своя папка
    ├── auto.json          # Переводы для категории AUTO
    ├── health.json
    ├── math.json
    └── [...]
└── ru/
    ├── auto.json
    ├── health.json
    └── [...]
```

### Как `request.ts` это использует?

```typescript
// Когда приходит запрос с locale="en"
loadLocale = "en"

// Загружает:
// 1. messages/en.json (глобальные переводы)
// 2. messages/en/auto.json
// 3. messages/en/health.json
// ... все файлы в messages/en/

// Объединяет их в один MESSAGES объект
// Передаёт в компоненты через useTranslations()
```

---

## 6️⃣ КОМПОНЕНТНАЯ ИЕРАРХИЯ

```
RootLayout [locale]
├── Header (использует locale, messages)
├── main
│   ├── CategoryPage [category]
│   │   ��── Breadcrumbs
│   │   ├── Category Grid (список инструментов)
│   │   └── Link к /locale/category/tool
│   │
│   └── ToolPage [tool]
│       ├── Breadcrumbs
│       ├── Hero Section
│       ├── DynamicSeoArticle
│       ├── ClientToolRenderer (инструмент подгружается)
│       └── Ad Slots
└── Footer (использует locale, messages)
```

---

## 7️⃣ ДИНАМИЧЕСКИЙ ПРОЦЕСС: Что происходит когда вы добавляете новый инструмент

### Шаг 1️⃣: Добавляете инструмент в VALID_TOOLS

```typescript
// config/valid-tools.ts
export const VALID_TOOLS = {
  auto: ['fuel-consumption', 'power-converter', 'total-cost-of-ownership', 'my-new-tool'], // ← ДОБАВИЛИ
  // ...
};
```

### Шаг 2️⃣: Добавляете переводы

```
messages/
├── en/
│   └── auto.json  (обновляете с новым инструментом)
├── ru/
│   └── auto.json
└── [все остальные языки]/
    └── auto.json
```

### Шаг 3️⃣: Что происходит АВТОМАТИЧЕСКИ?

```
✅ generateStaticParams() -> добавляет 62 новых маршрута (1 на язык)
✅ sitemap.ts -> добавляет новый URL в карту сайта
✅ Category Page -> показывает новый инструмент в сетке
✅ Навигация -> все `Link` компоненты сработают правильно
✅ i18n -> переводы загрузятся автоматически из messages/[locale]/auto.json
```

**Вам нужно только:**
1. Добавить в VALID_TOOLS
2. Добавить переводы
3. Создать компонент инструмента

---

## 8️⃣ ОБРАБОТКА 404 И FALLBACK

### Когда пользователь заходит на несуществующий URL:

```typescript
// app/[locale]/[category]/[...tool]/page.tsx

const validCategoryTools = VALID_TOOLS[category as keyof typeof VALID_TOOLS];
if (!validCategoryTools || !(validCategoryTools as readonly string[]).includes(toolSlug)) {
  // Инструмент не в списке VALID_TOOLS
  return <CategoryPage params={params as any} isFallback={true} />;
}

if (!isRecord(bodyNode) || !isRecord(toolNode)) {
  // Нет данных в переводах
  return notFound();  // → Полноценная 404 страница
}
```

---

## 9️⃣ ТЕХНОЛОГИЧЕСКИЙ СТЕК

```
Next.js 16.1.6
├── App Router (динамический роутинг)
├── Static Generation (SSG с generateStaticParams)
└── Dynamic Rendering (когда нужно)

next-intl 4.8.3
├── Многоязычность
├── Lazy loading переводов
└── Server & Client переводы

Структура файлов:
├── [locale] = параметр URL (строка)
├── [category] = параметр URL (строка)
├── [...tool] = catch-all маршрут (массив)
└── [...] = опциональные параметры
```

---

## 🔟 ПРАКТИЧЕСКИЙ ПРИМЕР

### Добавление нового инструмента "Converter"

**1. Обновить config:**
```typescript
// config/valid-tools.ts
export const VALID_TOOLS = {
  auto: [...],
  health: [...],
  converter: ['temperature-converter', 'weight-converter'],  // ← НОВАЯ КАТЕГОРИЯ
};
```

**2. Создать переводы:**
```json
// messages/en/converter.json
{
  "temperature-converter": {
    "head": {
      "title": "Temperature Converter | Zernar",
      "description": "Convert between Celsius, Fahrenheit, Kelvin..."
    },
    "body": {
      "title": "Temperature Converter",
      "seo": { ... }
    }
  },
  "weight-converter": { ... }
}
```

**3. Создать компонент:**
```typescript
// features/converter/TemperatureConverter.tsx
export default function TemperatureConverter() {
  return <div>Converter UI</div>;
}
```

**Что происходит АВТОМАТИЧЕСКИ:**

```
✅ URL /en/converter/temperature-converter уже работает
✅ URL видна в sitemap.ts
✅ 62 локали × 2 инструмента = 124 новых статических страницы
✅ next-intl загружает messages/en/converter.json, messages/ru/converter.json и т.д.
✅ Категория отображается в Header (если он использует VALID_TOOLS)
✅ generateStaticParams() предгенерирует все 124 страницы при build
```

---

## 📌 КРАТКИЙ ЧЕКЛИСТ

### ✅ Что управляет роутингом:

| Файл | Функция |
|------|---------|
| `i18n/routing.ts` | Список поддерживаемых локале�� |
| `config/valid-tools.ts` | Категории и инструменты (ИСТОЧНИК ИСТИНЫ) |
| `messages/[locale]/[namespace].json` | Переводы и контент |
| `app/[locale]/...` | Иерархия маршрутов |
| `generateStaticParams()` | Pre-rendering всех страниц |
| `sitemap.ts` | Карта сайта для Google |

### 🚀 Когда вы добавляете новый инструмент:

1. ➕ `config/valid-tools.ts` - добавить в массив
2. 📝 `messages/[locale]/[category].json` - добавить переводы
3. 🧩 `features/[category]/[ToolName].tsx` - создать компонент
4. ✨ Всё остальное происходит автоматически!

---

## 📊 ДИАГРАММА ПОТОКА ДАННЫХ

```
User Request: /en/auto/fuel-consumption
    ↓
Next.js Router парсит параметры
    ↓
app/[locale]/layout.tsx (RootLayout)
    │ ├─ setRequestLocale("en")
    │ └─ getMessages() → loadFolderLocaleMessages("en", namespaces)
    │     └─ Загружает: messages/en.json, messages/en/auto.json и т.д.
    ↓
app/[locale]/[category]/[...tool]/page.tsx (ToolPage)
    │ ├─ generateMetadata() → создаёт <meta> теги
    │ ├─ VALID_TOOLS[category][tool] → валидация
    │ ├─ messages[category][tool] → контент инструмента
    │ └─ ClientToolRenderer → рендерит UI
    ↓
React компонент + Messages (локализованные данные)
    ↓
HTML + JavaScript → Отправляется браузеру
```

---

## 🎓 ИТОГОВОЕ ОБЪЯСНЕНИЕ

**Ваша система работает по принципу:**

1. **VALID_TOOLS** — единый источник истины для структуры сайта
2. **Параметры URL** (`[locale]`, `[category]`, `[...tool]`) — как переменные в маршрутах
3. **generateStaticParams()** — генерирует все возможные комбинации во время build
4. **messages/** — переводы организованы по языкам и категориям
5. **Автоматизм** — как только вы добавите запись в VALID_TOOLS, она:
   - Появится в sitemap
   - Получит роут
   - Загрузит переводы
   - Отобразится в категории

**Это позволяет масштабировать сайт без редактирования файлов роутинга!**