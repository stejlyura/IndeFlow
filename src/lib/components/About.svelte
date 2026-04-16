<script lang="ts">
    import * as m from '$lib/paraglide/messages';
</script>

<section class="py-24 px-4 md:px-8 bg-[var(--bg-body)] text-[var(--text-main)] reveal border-t border-[var(--border-color)]">
    <div class="container mx-auto max-w-4xl">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-black uppercase italic mb-4 tracking-tighter">
                {m.about_title()}
            </h2>
            <p class="text-lg md:text-xl font-bold opacity-70 italic text-[var(--primary)]">
                {m.about_subtitle()}
            </p>
        </div>
        
        <div class="space-y-8 text-sm md:text-base leading-relaxed opacity-80">
            <p>{m.about_p1()}</p>
            <p>{m.about_p2()}</p>
            <p>{m.about_p3()}</p>
        </div>
    </div>
</section>
