<script lang="ts">
    import type { ComparisonRow } from '$lib/types';
    let { title = "Comparison", rows = [] } = $props<{ title?: string, rows?: ComparisonRow[] }>();
</script>

<section class="py-24 px-4 md:px-8 reveal">
    <div class="container mx-auto max-w-5xl">
        <h2 class="text-3xl md:text-5xl font-black uppercase italic mb-12 tracking-tighter text-center">{title}</h2>
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse border border-[var(--border-color)] sharp">
                <thead>
                    <tr class="bg-[var(--bg-card)]">
                        <th class="p-6 border-b border-r border-[var(--border-color)] opacity-60 text-xs uppercase tracking-widest w-1/3">Feature</th>
                        <th class="p-6 border-b border-r border-[var(--border-color)] opacity-60 text-xs uppercase tracking-widest w-1/3">Market Standard</th>
                        <th class="p-6 border-b border-[var(--primary)] text-[var(--primary)] font-black text-xs uppercase tracking-widest w-1/3">IndexFlow</th>
                    </tr>
                </thead>
                <tbody>
                    {#if rows.length === 0}
                        <tr>
                            <td class="p-6 border-b border-r border-[var(--border-color)] text-sm font-bold">Speed</td>
                            <td class="p-6 border-b border-r border-[var(--border-color)] text-sm opacity-70">3-5 Seconds</td>
                            <td class="p-6 border-b border-[var(--border-color)] text-sm font-bold text-[var(--primary)]">Instant</td>
                        </tr>
                        <tr class="bg-[var(--bg-accent)] text-[var(--text-accent)]">
                            <td class="p-6 border-b border-r border-[var(--border-color)] text-sm font-bold">Client JS</td>
                            <td class="p-6 border-b border-r border-[var(--border-color)] text-sm opacity-70">Megabytes (React/Vue)</td>
                            <td class="p-6 border-b border-[var(--border-color)] text-sm font-bold text-current">Zero by Default</td>
                        </tr>
                    {/if}
                    {#each rows as row}
                        <tr class={row.isAccent ? 'bg-[var(--bg-accent)] text-[var(--text-accent)]' : ''}>
                            <td class="p-6 border-b border-r border-[var(--border-color)] text-sm font-bold">{row.label}</td>
                            <td class="p-6 border-b border-r border-[var(--border-color)] text-sm opacity-70">{row.market}</td>
                            <td class="p-6 border-b border-[var(--border-color)] text-sm font-bold {row.isAccent ? 'text-current' : 'text-[var(--primary)]'}">{row.indexflow}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</section>
