<script lang="ts">
    let { title = '', subtitle = '', p1 = '', p2 = '', p3 = '', items = [] } = $props<{ 
        title?: string, 
        subtitle?: string, 
        p1?: string, 
        p2?: string, 
        p3?: string,
        items?: string[]
    }>();
</script>

<section class="py-24 px-4 md:px-8 bg-[var(--bg-body)] text-[var(--text-main)] reveal border-t border-[var(--border-color)]">
    <div class="container mx-auto max-w-4xl">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-black uppercase italic mb-4 tracking-tighter">
                {title}
            </h2>
            {#if subtitle}
                <p class="text-lg md:text-xl font-bold opacity-70 italic text-[var(--primary)]">
                    {subtitle}
                </p>
            {/if}
        </div>
        
        <div class="space-y-8 text-sm md:text-base leading-relaxed opacity-80">
            {#if p1}<p>{p1}</p>{/if}
            {#if p2}<p>{p2}</p>{/if}
            {#if p3}<p>{p3}</p>{/if}
            
            {#if items.length > 0}
                <ul class="space-y-4 mt-8">
                    {#each items as item}
                        <li class="flex items-start gap-4">
                            <span class="text-[var(--primary)] font-black">—</span>
                            <span>{item}</span>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
</section>
