<script lang="ts">
    import type { ComparisonRow } from '$lib/types';
    let { 
        title = "Comparison", 
        rows = [],
        header_1 = "Metric",
        header_2 = "Typical Solution",
        header_3 = "IndxFlow (Modern Stack)"
    } = $props<{ 
        title?: string, 
        rows?: ComparisonRow[],
        header_1?: string,
        header_2?: string,
        header_3?: string
    }>();
</script>

<section class="py-24 px-4 md:px-8 bg-opacity-30 reveal" style="background-color: var(--bg-card);">
    <div class="container mx-auto">
        <h2 class="text-3xl md:text-6xl font-black mb-16 uppercase italic text-center tracking-tighter">{title}</h2>
        <div class="table-wrap border border-zinc-200">
            <table class="w-full min-w-[700px] border-collapse bg-white text-black">
                <thead>
                    <tr class="border-b" style="border-color: var(--border-color);">
                        <th class="py-10 px-8 text-left text-[10px] uppercase opacity-40">{header_1}</th>
                        <th class="py-10 px-8 text-left text-[10px] uppercase opacity-40">{header_2}</th>
                        <th class="py-10 px-8 text-left text-xs font-black uppercase tracking-widest" style="background-color: #f8f9fa;">{header_3}</th>
                    </tr>
                </thead>
                <tbody class="text-sm">
                    {#if rows.length === 0}
                        <tr class="border-b" style="border-color: var(--border-color);">
                            <td class="py-10 px-8 font-bold uppercase">Чистота кода (W3C)</td>
                            <td class="py-10 px-8 opacity-60">Зависимость от плагинов</td>
                            <td class="py-10 px-8 font-black text-2xl tracking-tighter" style="color: var(--primary);">0 Ошибок / Native</td>
                        </tr>
                        <tr class="border-b" style="border-color: var(--border-color);">
                            <td class="py-10 px-8 font-bold uppercase">SEO Потенциал</td>
                            <td class="py-10 px-8 opacity-60">Шаблонные теги</td>
                            <td class="py-10 px-8 font-black text-2xl tracking-tighter" style="color: var(--primary);">Custom Semantic</td>
                        </tr>
                    {:else}
                        {#each rows as row}
                            <tr class="border-b {row.isAccent ? 'bg-zinc-50' : ''}" style="border-color: var(--border-color);">
                                <td class="py-10 px-8 font-bold uppercase">{row.label}</td>
                                <td class="py-10 px-8 opacity-60">{row.market}</td>
                                <td class="py-10 px-8 font-black text-2xl tracking-tighter" style="color: var(--primary);">{row.IndxFlow}</td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</section>

<style>
    .table-wrap { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
</style>

