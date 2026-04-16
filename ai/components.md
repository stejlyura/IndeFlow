IndexFlow — Low-JS Svelte Component Library

ИНСТРУКЦИЯ ДЛЯ ИИ (SYSTEM PROMPT):
Этот документ содержит библиотеку Svelte-компонентов, оптимизированных под SSR (Server Side Rendering) и CSS-first подход.
Минимизируй использование клиентского JS. Анимации выполняются через CSS. Взаимодействия (формы, переключатели) используют нативные HTML-атрибуты.

1. Схема данных (types.ts)

Без изменений, так как это типизация для этапа сборки.

2. Глобальные Стили (app.css)

Добавлены CSS-анимации для замены JS-обсервера.

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    /* Переменные тем из предыдущих версий сохраняются здесь */
    :root { /* Apple */ }
    [data-theme="berry"] { /* Berry Mint */ }
    /* ... и так далее ... */

    body {
        @apply antialiased overflow-x-hidden;
        background-color: var(--bg-body);
        color: var(--text-main);
    }
}

@layer components {
    /* Анимация появления без JS */
    .reveal {
        animation: reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
    }

    @keyframes reveal-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Нативные элементы форм в стиле IndexFlow */
    .btn-premium {
        @apply inline-flex items-center justify-center font-extrabold uppercase tracking-widest transition-all duration-300;
        background-color: var(--primary);
        color: white;
    }

    .input-premium {
        @apply w-full bg-transparent border-b-2 border-[var(--border-color)] py-3 outline-none transition-colors text-xs font-bold uppercase;
    }
    .input-premium:focus { border-color: var(--primary); }
}


3. Компоненты без JS (Blocks)

Hero.svelte

Использует нативные ссылки и CSS-анимацию.

<script lang="ts">
    import type { ButtonConfig } from '$lib/types';
    export let titleLine1: string;
    export let titleLine2: string;
    export let description: string;
    export let primaryBtn: ButtonConfig;
    export let secondaryBtn: ButtonConfig;
</script>

<section class="pt-32 pb-16 md:pt-56 md:pb-32 px-4 md:px-8 reveal">
    <div class="container mx-auto max-w-6xl">
        <h1 class="text-4xl md:text-7xl lg:text-[110px] font-black leading-[0.85] mb-8 tracking-tighter uppercase">
            {titleLine1} <br> <span style="color: var(--primary);">{titleLine2}</span>
        </h1>
        <p class="max-w-2xl opacity-75 mb-12 text-lg md:text-2xl font-light leading-relaxed">
            {description}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 md:gap-6">
            <a href={primaryBtn.href} class="btn-premium px-10 py-5 sharp text-[10px] md:text-xs italic text-center">
                {primaryBtn.label}
            </a>
            <a href={secondaryBtn.href} class="border px-10 py-5 sharp text-[10px] md:text-xs uppercase tracking-widest hover:invert transition text-center inline-block" style="border-color: var(--border-color);">
                {secondaryBtn.label}
            </a>
        </div>
    </div>
</section>


Workflow.svelte

Полностью на CSS. Адаптивность реализована через медиа-запросы без JS.

<script lang="ts">
    import type { WorkflowStep } from '$lib/types';
    export let title: string;
    export let steps: WorkflowStep[];
</script>

<style>
    .wf-wrap { position: relative; max-width: 900px; margin: 0 auto; }
    .wf-line { position: absolute; left: 23px; top: 0; bottom: 0; width: 2px; background: var(--border-color); }
    .wf-step { position: relative; padding-left: 80px; margin-bottom: 3rem; }
    .wf-dot { position: absolute; left: 0; top: 0; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--primary); font-weight: 900; color: #000; }
    
    @media (min-width: 768px) {
        .wf-line { left: 50%; transform: translateX(-50%); }
        .wf-step { padding-left: 0; margin-bottom: 6rem; display: flex; align-items: center; width: 100%; }
        .wf-dot { left: 50%; transform: translateX(-50%); }
        .wf-content { width: 45%; }
        .wf-step:nth-child(odd) { justify-content: flex-start; }
        .wf-step:nth-child(even) { justify-content: flex-end; }
        .wf-step:nth-child(odd) .wf-content { text-align: right; }
        .wf-step:nth-child(even) .wf-content { text-align: left; }
    }
</style>

<section class="py-24 px-4 md:px-8 bg-opacity-30 reveal" style="background-color: var(--bg-card); animation-delay: 0.2s;">
    <div class="container mx-auto">
        <h2 class="text-3xl md:text-6xl font-black mb-20 md:mb-32 uppercase italic text-center tracking-tighter">{title}</h2>
        <div class="wf-wrap">
            <div class="wf-line"></div>
            {#each steps as step}
                <div class="wf-step">
                    <div class="wf-dot sharp">{step.number}</div>
                    <div class="wf-content">
                        <div class="text-[10px] uppercase font-bold opacity-40 mb-2">{step.tag}</div>
                        <h4 class="text-2xl font-bold uppercase mb-4">{step.title}</h4>
                        <p class="text-sm opacity-60 italic leading-relaxed">{step.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>


Expertise.svelte (Accent Block)

Использование CSS-переменных для акцентных цветов.

<script lang="ts">
    import type { ExpertiseItem } from '$lib/types';
    export let title1: string;
    export let title2: string;
    export let mainText: string;
    export let items: ExpertiseItem[];
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
                    {#each items as item}
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


4. Сборщик страниц (PageBuilder.svelte)

Без JS-логики в браузере. Только SSR маппинг.

<script lang="ts">
    import type { PageConfig } from '$lib/types';
    import Hero from './blocks/Hero.svelte';
    import Expertise from './blocks/Expertise.svelte';
    import Workflow from './blocks/Workflow.svelte';
    import Disclaimer from './blocks/Disclaimer.svelte';

    export let config: PageConfig;

    const componentMap: Record<string, any> = {
        'Hero': Hero,
        'Expertise': Expertise,
        'Workflow': Workflow,
        'Disclaimer': Disclaimer
    };
</script>

<div data-theme={config.theme} class="min-h-screen">
    {#each config.sections as section (section.id)}
        <svelte:component this={componentMap[section.type]} {...section.data} />
    {/each}
</div>


5. Рекомендация по Google Analytics (JS-less)

Чтобы полностью исключить JS из основного потока, используй Partytown в SvelteKit.

Установи Partytown.

В файле app.html добавь скрипт с типом text/partytown.

Все тяжелые скрипты (GA4, GTM) будут выполняться в Web Worker, не замедляя рендеринг IndexFlow.

<!-- src/app.html -->
<script type="text/partytown" src="[https://www.googletagmanager.com/gtag/js?id=G-XXXXX](https://www.googletagmanager.com/gtag/js?id=G-XXXXX)"></script>
<script type="text/partytown">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXX');
</script>

IndexFlow — Complete JSON-Driven Svelte Kit

Этот файл содержит полный набор компонентов, которые соответствуют актуальной версии сайта в Canvas.

1. Обновленные Типы (types.ts)

Добавь эти интерфейсы, чтобы ИИ понимал структуру данных для новых блоков.

export type Theme = 'apple' | 'heritage' | 'berry' | 'mercedes' | 'wordpress';

export interface PageSection {
    id: string;
    type: 'Hero' | 'LogoCloud' | 'Stats' | 'Expertise' | 'Workflow' | 'Disclaimer' | 'UILab' | 'Comparison' | 'Pricing' | 'FAQ' | 'CallbackForm';
    data: any;
}

export interface PageConfig {
    theme: Theme;
    metaTitle: string;
    sections: PageSection[];
}

// Данные для прайса
export interface PricingPlan {
    name: string;
    price: string;
    features: string[];
    buttonText: string;
    isPopular?: boolean;
}

// Данные для сравнения
export interface ComparisonRow {
    label: string;
    market: string;
    indexflow: string;
    isAccent?: boolean;
}


2. Новые и Обновленные Компоненты (src/lib/components/blocks/)

LogoCloud.svelte

<script lang="ts">
    export let logos: string[] = ['TECH CORP', 'FINANCE HUB', 'GLOBAL MEDIA', 'LUXURY REALTY', 'CRYPTO FLOW'];
</script>

<section class="py-12 border-y border-zinc-100 overflow-hidden reveal">
    <div class="flex space-x-20 items-center animate-[scroll_40s_linear_infinite] whitespace-nowrap">
        {#each [...logos, ...logos] as logo}
            <div class="text-2xl font-black opacity-10 uppercase italic w-[250px] inline-block">{logo}</div>
        {/each}
    </div>
</section>

<style>
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
</style>


Stats.svelte

<script lang="ts">
    export let items: { value: string, label: string }[];
</script>

<section class="py-16 px-4 md:px-8 reveal">
    <div class="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {#each items as item}
            <div class="p-8 border-l-4" style="border-color: var(--primary); background-color: var(--bg-card);">
                <div class="text-4xl md:text-6xl font-black mb-2 italic">{item.value}</div>
                <div class="text-[9px] uppercase font-bold tracking-widest opacity-40">{item.label}</div>
            </div>
        {/each}
    </div>
</section>


Pricing.svelte

<script lang="ts">
    import type { PricingPlan } from '$lib/types';
    export let title: string;
    export let plans: PricingPlan[];
</script>

<section class="py-24 px-4 md:px-8 reveal">
    <div class="container mx-auto">
        <h2 class="text-4xl font-black mb-20 uppercase tracking-tighter text-center">{title}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[var(--border-color)]">
            {#each plans as plan}
                <div class="p-10 border-b md:border-b-0 md:border-r last:border-r-0 flex flex-col {plan.isPopular ? 'bg-white/5 relative z-10' : ''}" 
                     style={plan.isPopular ? 'background-color: var(--bg-card); border-top: 4px solid var(--primary);' : 'border-color: var(--border-color);'}>
                    <h3 class="text-xs font-bold uppercase opacity-40 mb-6 italic">{plan.name}</h3>
                    <div class="text-4xl md:text-5xl font-black mb-10 italic" style={plan.isPopular ? 'color: var(--primary);' : ''}>{plan.price}</div>
                    <ul class="space-y-4 mb-12 text-[10px] uppercase tracking-widest opacity-60 flex-grow">
                        {#each plan.features as feature}
                            <li>— {feature}</li>
                        {/each}
                    </ul>
                    <button class={plan.isPopular ? 'btn-premium p-4 sharp' : 'w-full border p-4 sharp text-[10px] font-bold uppercase hover:bg-black hover:text-white transition'} 
                            style={!plan.isPopular ? 'border-color: var(--border-color);' : ''}>
                        {plan.buttonText}
                    </button>
                </div>
            {/each}
        </div>
    </div>
</section>


CallbackForm.svelte

<script lang="ts">
    export let title: string;
    export let description: string;
</script>

<section class="py-32 px-4 md:px-8 bg-zinc-950 text-white relative reveal">
    <div class="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-24">
        <div>
            <h2 class="text-6xl md:text-[110px] font-black uppercase italic leading-[0.85] mb-12 tracking-tighter">{@html title}</h2>
            <p class="text-zinc-600 uppercase text-[10px] tracking-[0.5em] mb-16">{description}</p>
        </div>
        <div class="bg-zinc-900 p-8 md:p-12 sharp border border-zinc-800">
            <form class="space-y-12">
                <div class="grid md:grid-cols-2 gap-10">
                    <input type="text" placeholder="ВАШЕ ИМЯ" required class="input-premium w-full" style="border-color: #3f3f46;">
                    <input type="tel" placeholder="ТЕЛЕФОН" required class="input-premium w-full" style="border-color: #3f3f46;">
                </div>
                <input type="text" placeholder="НАЗВАНИЕ КОМПАНИИ" class="input-premium w-full" style="border-color: #3f3f46;">
                <div class="grid md:grid-cols-2 gap-10">
                    <div class="flex flex-col">
                        <label class="text-[9px] text-zinc-600 uppercase mb-4">Бюджет</label>
                        <select class="bg-transparent border-b border-zinc-800 py-3 text-xs uppercase font-bold outline-none cursor-pointer">
                            <option value="1">40,000 - 150,000 ₴</option>
                            <option value="2">150,000+ ₴</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label class="text-[9px] text-zinc-600 uppercase mb-4">Дедлайн</label>
                        <input type="date" class="bg-transparent border-b border-zinc-800 py-3 text-xs uppercase font-bold outline-none invert">
                    </div>
                </div>
                <button type="submit" class="w-full btn-premium py-8 sharp text-[11px] font-black tracking-[0.4em]">Отправить запрос</button>
            </form>
        </div>
    </div>
</section>


3. Пример Полного JSON (data.json)

Теперь ты можешь описать весь сайт одним файлом.

{
  "theme": "berry",
  "metaTitle": "IndexFlow | Production",
  "sections": [
    { "id": "h1", "type": "Hero", "data": { "titleLine1": "Цифровой", "titleLine2": "Поток", "description": "IndexFlow проектирует архитектуру..." } },
    { "id": "l1", "type": "LogoCloud", "data": { "logos": ["APPLE", "ROLEX", "MERCEDES"] } },
    { "id": "s1", "type": "Stats", "data": { "items": [ {"value": "500+", "label": "Проектов"}, {"value": "0.4s", "label": "Скорость"} ] } },
    { "id": "p1", "type": "Pricing", "data": { 
        "title": "Прайс-лист", 
        "plans": [
          { "name": "Silver", "price": "45,000 ₴", "features": ["SEO", "Landing"], "buttonText": "Выбрать" },
          { "name": "Business", "price": "105,000 ₴", "features": ["AdSense", "Support"], "buttonText": "Купить", "isPopular": true }
        ] 
    } },
    { "id": "f1", "type": "CallbackForm", "data": { "title": "Вход <br> в <br> Поток", "description": "Начните проект сегодня." } }
  ]
}
