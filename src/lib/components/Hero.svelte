<script lang="ts">
    import * as m from '$lib/paraglide/messages';
</script>

<section class="pt-32 pb-16 md:pt-56 md:pb-32 px-4 md:px-8 reveal" id="home">
    <div class="container mx-auto max-w-6xl">
        <h1 class="text-4xl md:text-7xl lg:text-[110px] font-black leading-[0.85] mb-8 tracking-tighter uppercase">
            {m.hero_title_1()} <br> <span style="color: var(--primary);">{m.hero_title_2()}</span>
        </h1>
        <p class="max-w-2xl opacity-75 mb-12 text-lg md:text-2xl font-light leading-relaxed">
            {m.hero_desc()}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 md:gap-6">
            <a href="#contact" class="btn-premium px-10 py-5 sharp text-[10px] md:text-xs text-center">
                {m.btn_primary()}
            </a>
            <a href="#services" class="border px-10 py-5 sharp text-[10px] md:text-xs uppercase tracking-widest hover:invert transition text-center inline-flex items-center justify-center" style="border-color: var(--border-color);">
                {m.btn_secondary()}
            </a>
        </div>
    </div>
</section>
