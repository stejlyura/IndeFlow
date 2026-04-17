<script lang="ts">
    import type { ExpertiseItem } from '$lib/types';

    let {
        title1 = '',
        title2 = '',
        mainText = '',
        items = []
    } = $props<{
        title1?: string;
        title2?: string;
        mainText?: string;
        items?: ExpertiseItem[];
    }>();
</script>

<section class="py-24 px-4 md:px-8 bg-accent-section reveal" style="animation-delay: 0.3s;" id="portfolio">
    <div class="container mx-auto max-w-6xl">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 class="text-3xl md:text-6xl font-black uppercase italic mb-8 tracking-tighter leading-none">
                    {title1} <br> {title2}
                </h2>
                <p class="text-lg md:text-xl opacity-80 leading-relaxed mb-10">
                    {mainText}
                </p>
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
