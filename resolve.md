# Аудит проекта IndexFlow

## Суть проблемы (Почему возникает ошибка 500)
Приложение падает с ошибкой 500 (`TypeError: (void 0) is not a function`) во время серверного рендеринга (SSR). Ошибка указывает на компоненты Svelte (в частности `Hero.svelte` и другие), где происходит вызов несуществующих функций.

## Причины:
1. **Конфликт в использовании папки `messages/`:** 
   В проекте файлы `messages/en/*.json` (например, `home.json`) используются сервером (`+page.server.ts`) как конфигурация структуры страницы (поля `theme`, `metaTitle`, массив `sections`). 
   Однако, в файле `project.inlang/settings.json` плагин `@inlang/paraglide-js` настроен на чтение текстов переводов по тому же самому пути: `"pathPattern": "./messages/{locale}/*.json"`.
2. **Отсутствие ключей перевода Paraglide:**
   Из-за пункта 1, Paraglide пытается сгенерировать функции перевода из JSON-файлов структуры. Из-за этого в сгенерированном объекте `$lib/paraglide/messages` **отсутствуют** функции вроде `nav_home`, `hero_title_1`, `btn_primary` и т.д.
3. **Игнорирование пропсов в компонентах:**
   Роутер (`+page.svelte`) перебирает секции из JSON и передает данные внутрь компонентов: `<Component {...section.data} />`. Например, для `Hero` передаются `title` и `subtitle`. Но сам компонент `Hero.svelte` игнорирует эти пропсы, и вместо этого напрямую вызывает сломанные функции Paraglide (например, `{m.hero_title_1()}`).
4. **Устаревший реактивный стейт в Svelte 5:**
   В `src/routes/[...path]/+page.svelte` строка `let config = data.pageConfig;` вызывает предупреждение компилятора, так как переменная не будет реактивно обновляться при переходе между страницами (клиентском роутинге).

---

## Как решить ситуацию (Пошаговый план)

Чтобы всё работало, необходимо разделить структуру страниц (JSON-билдер) и статические переводы (Paraglide), а также научить компоненты принимать пропсы.

### Шаг 1: Разделяем Paraglide и Page Builder
Не используйте одни и те же JSON-файлы для структуры страниц и для Paraglide.
1. Создайте в корне проекта новую папку, например `locales/` (или `translations/`).
2. Создайте в ней файлы `en.json` и `uk.json` и пропишите туда **все** статические тексты, которые используются в компонентах без пропсов (навигация, футер, кнопки).
   ```json
   {
     "nav_home": "Home",
     "nav_services": "Services",
     "hero_title_1": "Zero-Bloat",
     "btn_primary": "Get Started"
   }
   ```
3. В файле `project.inlang/settings.json` измените путь:
   ```json
   "plugin.inlang.messageFormat": {
     "pathPattern": "./locales/{locale}.json"
   }
   ```
*(Файлы в папке `messages/` оставляем как есть — они нужны для `+page.server.ts`)*

### Шаг 2: Обновляем компоненты на получение `$props()`
Если компонент получает данные из конфига страницы (как секция `Hero`, `Expertise`, `Pricing` и др.), он не должен использовать Paraglide напрямую для этих данных.
В `src/lib/components/Hero.svelte` удалите `import * as m...` и сделайте так:

```svelte
<script lang="ts">
    let { title, subtitle } = $props<{ title: string, subtitle: string }>();
</script>

<section id="home">
    <h1>{title}</h1>
    <p>{subtitle}</p>
</section>
```
Сделайте это для всех компонентов, которые загружаются через цикл `{#each config.sections...}`. Paraglide оставляем только для глобальных компонентов, таких как `Header.svelte` и `Footer.svelte`, которые не управляются JSON-билдером напрямую.

### Шаг 3: Исправляем реактивность в `+page.svelte`
Зайдите в `src/routes/[...path]/+page.svelte` и оберните присвоение в `$derived`, чтобы Svelte 5 правильно обрабатывал навигацию на клиенте:

```svelte
<script lang="ts">
	import type { PageData } from './$types';
	import { Hero, LogoCloud, Stats, Expertise, Workflow, Disclaimer, Pricing, CallbackForm } from '$lib';

	let { data }: { data: PageData } = $props();
	
	// Используем $derived, чтобы при смене роута/языка config обновлялся
	let config = $derived(data.pageConfig);

	const componentMap: Record<string, any> = { Hero, LogoCloud, Stats, Expertise, Workflow, Disclaimer, Pricing, CallbackForm };
</script>
```

### Итог:
После этих изменений:
1. `+page.server.ts` будет без помех загружать `messages/en/home.json` как структуру страницы.
2. Paraglide сгенерирует рабочие функции перевода из папки `locales/` для шапки и футера.
3. Ошибка 500 (void 0 is not a function) исчезнет, и `en home` (а также остальные роуты) начнут загружаться мгновенно и без сбоев.

### Шаг 1: Разделение файлов для переводов и сборки

Нужно создать отдельную папку для файлов с переводами (i18n), чтобы Paraglide не конфликтовал с JSON-файлами, которые описывают структуру страниц.

1.  **Создайте папку `locales`** в корне вашего проекта.

2.  **Создайте файл `locales/ru.json`** для статических текстов на русском (например, для навигации или футера):
    ```json
    {
      "nav_home": "Главная",
      "nav_portfolio": "Портфолио",
      "nav_price": "Цены",
      "nav_contact": "Контакты",
      "footer_copyright": "© 2026 IndexFlow. Все права защищены."
    }
    ```

3.  **Создайте файл `locales/en.json`** для английской версии:
    ```json
    {
      "nav_home": "Home",
      "nav_portfolio": "Portfolio",
      "nav_price": "Pricing",
      "nav_contact": "Contact",
      "footer_copyright": "© 2026 IndexFlow. All rights reserved."
    }
    ```

4.  **Обновите конфигурацию Paraglide**. Замените содержимое вашего `project.inlang/settings.json` на следующее, чтобы он искал переводы в новой папке:
    ```json
    {
      "$schema": "https://inlang.com/schema/project-settings",
      "sourceLanguageTag": "ru",
      "languageTags": [
        "ru",
        "en"
      ],
      "modules": [
        "https://cdn.jsdelivr.net/npm/@inlang/paraglide-js@1.2.0/dist/index.js"
      ],
      "plugin.inlang.messageFormat": {
        "pathPattern": "./locales/{locale}.json"
      }
    }
    ```

5.  **Пересоздайте файлы Paraglide**, выполнив в терминале команду:
    ```bash
    npx @inlang/paraglide-js generate
    ```

---

### Шаг 2: Обновление компонентов для получения данных через пропсы

Все компоненты секций (`Hero`, `Stats` и т.д.) должны получать данные из пропсов, а не вызывать функции Paraglide. Ниже приведен полный код для каждого компонента, который нужно обновить.

**Важно:** Замените содержимое существующих файлов на код, представленный ниже.

#### Файл: `src/lib/components/Hero.svelte`
```svelte
<script lang="ts">
    let {
        hero_title_1,
        hero_title_2,
        hero_desc,
        btn_primary,
        btn_secondary
    } = $props<{
        hero_title_1: string;
        hero_title_2: string;
        hero_desc: string;
        btn_primary: string;
        btn_secondary: string;
    }>();
</script>

<section class="pt-32 pb-16 md:pt-56 md:pb-32 px-4 md:px-8 reveal" id="home">
    <div class="container mx-auto max-w-6xl">
        <h1 class="text-4xl md:text-7xl lg:text-[110px] font-black leading-[0.85] mb-8 tracking-tighter uppercase">
            {hero_title_1} <br> <span style="color: var(--primary);">{hero_title_2}</span>
        </h1>
        <p class="max-w-2xl opacity-75 mb-12 text-lg md:text-2xl font-light leading-relaxed">
            {hero_desc}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 md:gap-6">
            <a href="/start-project" class="btn-premium px-10 py-5 sharp text-[10px] md:text-xs italic text-center">
                {btn_primary}
            </a>
            <a href="/portfolio" class="border px-10 py-5 sharp text-[10px] md:text-xs uppercase tracking-widest hover:invert transition text-center inline-block" style="border-color: var(--border-color);">
                {btn_secondary}
            </a>
        </div>
    </div>
</section>
```

#### Файл: `src/lib/components/LogoCloud.svelte`
```svelte
<script lang="ts">
    let { logos } = $props<{ logos: string[] }>();
</script>

<section class="py-12 border-y border-zinc-100 overflow-hidden reveal">
    <div class="flex space-x-20 items-center animate-[scroll_40s_linear_infinite] whitespace-nowrap">
        {#each [...logos, ...logos] as logo, i (logo + i)}
            <div class="text-2xl font-black opacity-10 uppercase italic w-62.5 inline-block">{logo}</div>
        {/each}
    </div>
</section>

<style>
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
</style>
```

#### Файл: `src/lib/components/Stats.svelte`
```svelte
<script lang="ts">
    type StatItem = { value: string; label: string };
    let { items } = $props<{ items: StatItem[] }>();
</script>

<section class="py-16 px-4 md:px-8 reveal">
    <div class="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {#each items as item (item.label)}
            <div class="p-8 border-l-4" style="border-color: var(--primary); background-color: var(--bg-card);">
                <div class="text-4xl md:text-6xl font-black mb-2 italic">{item.value}</div>
                <div class="text-[9px] uppercase font-bold tracking-widest opacity-40">{item.label}</div>
            </div>
        {/each}
    </div>
</section>
```

#### Файл: `src/lib/components/Expertise.svelte`
```svelte
<script lang="ts">
    type ExpertiseItem = { title: string; description: string };
    let { title1, title2, mainText, items } = $props<{
        title1: string;
        title2: string;
        mainText: string;
        items: ExpertiseItem[];
    }>();
</script>

<section class="py-24 px-4 md:px-8 bg-accent-section reveal" style="animation-delay: 0.3s;">
    <div class="container mx-auto max-w-6xl">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 class="text-3xl md:text-6xl font-black uppercase italic mb-8 tracking-tighter leading-none">
                    {title1} <br> {title2}
                </h2>
                <p class="text-lg md:text-xl opacity-80 leading-relaxed mb-10">{mainText}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {#each items as item (item.title)}
                        <div class="space-y-2">
                            <h4 class="font-bold uppercase text-xs tracking-widest">{item.title}</h4>
                            <p class="text-xs opacity-60">{item.description}</p>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="hidden lg:block border-2 border-current aspect-square opacity-20"></div>
        </div>
    </div>
</section>
```

#### Файл: `src/lib/components/Workflow.svelte`
```svelte
<script lang="ts">
    type WorkflowStep = { number: string; tag: string; title: string; description: string };
    let { title, steps } = $props<{
        title: string;
        steps: WorkflowStep[];
    }>();
</script>

<style>
    .wf-wrap { position: relative; max-width: 900px; margin: 0 auto; }
    .wf-line { position: absolute; left: 23px; top: 0; bottom: 0; width: 2px; background: var(--border-color); }
    .wf-step { position: relative; padding-left: 80px; margin-bottom: 3rem; }
