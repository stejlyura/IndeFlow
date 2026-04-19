<script lang="ts">
    interface CtaConfig {
        label: string;
        href: string;
    }

    let {
        title = '',
        highlight = '',
        description = '',
        primary_cta = { label: 'Get Started', href: '#contact' },
        secondary_cta = { label: 'Our Work', href: '#portfolio' },
        id = 'home'
    } = $props<{
        title?: string;
        highlight?: string;
        description?: string;
        primary_cta?: CtaConfig;
        secondary_cta?: CtaConfig;
        id?: string;
    }>();
</script>

<section class="pt-32 pb-16 md:pt-60 md:pb-32 px-4 md:px-8 reveal" {id}>
    <div class="container mx-auto">
        <div class="max-w-5xl">
            <h1 class="text-5xl md:text-7xl lg:text-[120px] font-black leading-[0.85] mb-8 md:mb-12 tracking-tighter uppercase">
                {title} <br> <span style="color: var(--primary);">{highlight}</span>
            </h1>
            <p class="max-w-2xl opacity-75 mb-10 md:mb-16 text-lg md:text-2xl font-light leading-relaxed">
                {description}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 md:gap-6">
                {#if primary_cta}
                    <a href={primary_cta.href} class="btn-premium px-12 py-5 sharp text-[10px] md:text-xs italic text-center">
                        {primary_cta.label}
                    </a>
                {/if}
                {#if secondary_cta}
                    <a href={secondary_cta.href} class="border px-12 py-5 sharp text-[10px] md:text-xs uppercase tracking-widest hover:invert transition text-center inline-block" style="border-color: var(--border-color);">
                        {secondary_cta.label}
                    </a>
                {/if}
            </div>
        </div>
    </div>
</section>
