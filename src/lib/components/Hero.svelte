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

<section class="pt-32 pb-16 md:pt-60 md:pb-32 px-4 md:px-8 reveal" id="home">
    <div class="container mx-auto">
        <div class="max-w-5xl">
            <h1 class="text-5xl md:text-7xl lg:text-[120px] font-black leading-[0.85] mb-8 md:mb-12 tracking-tighter uppercase">
                {hero_title_1} <br> <span style="color: var(--primary);">{hero_title_2}</span>
            </h1>
            <p class="max-w-2xl opacity-75 mb-10 md:mb-16 text-lg md:text-2xl font-light leading-relaxed">
                {hero_desc}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 md:gap-6">
                <a href="/#contact" class="btn-premium px-12 py-5 sharp text-[10px] md:text-xs italic text-center">
                    {btn_primary}
                </a>
                <a href="/#portfolio" class="border px-12 py-5 sharp text-[10px] md:text-xs uppercase tracking-widest hover:invert transition text-center inline-block" style="border-color: var(--border-color);">
                    {btn_secondary}
                </a>
            </div>
        </div>
    </div>
</section>
