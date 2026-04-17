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