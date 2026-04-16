<script lang="ts">
    export let items: { value: string, label: string }[] = [
        { value: "500+", label: "Projects" },
        { value: "0.4s", label: "Speed" },
        { value: "99%", label: "Uptime" },
        { value: "24/7", label: "Support" }
    ];
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
