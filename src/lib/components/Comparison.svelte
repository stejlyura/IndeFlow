<script lang="ts">
    import type { ComparisonRow } from '$lib/types';
    let { title = "Comparison", rows = [] } = $props<{ title?: string, rows?: ComparisonRow[] }>();
</script>

<section class="py-24 px-4 md:px-8 bg-opacity-30 reveal" style="background-color: var(--bg-card);">
    <div class="container mx-auto">
        <h2 class="text-3xl md:text-6xl font-black mb-16 uppercase italic text-center tracking-tighter">{title}</h2>
        <div class="table-wrap border border-zinc-200">
            <table class="w-full min-w-[700px] border-collapse bg-white text-black">
                <thead>
                    <tr class="border-b" style="border-color: var(--border-color);">
                        <th class="py-10 px-8 text-left text-[10px] uppercase opacity-40">Критерий</th>
                        <th class="py-10 px-8 text-left text-[10px] uppercase opacity-40">Рыночное Решение</th>
                        <th class="py-10 px-8 text-left text-xs font-black uppercase tracking-widest" style="background-color: #f8f9fa;">IndexFlow Engine</th>
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
                                <td class="py-10 px-8 font-black text-2xl tracking-tighter" style="color: var(--primary);">{row.indexflow}</td>
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
