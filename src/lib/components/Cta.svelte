<script lang="ts">
    import * as m from '$lib/paraglide/messages';
</script>

<section class="py-32 px-4 md:px-8 bg-[var(--bg-body)] text-center reveal border-t border-[var(--border-color)]" id="contact">
    <div class="container mx-auto max-w-3xl">
        <h2 class="text-4xl md:text-6xl font-black uppercase italic mb-6 tracking-tighter">
            {m.cta_title()}
        </h2>
        <p class="text-lg md:text-xl opacity-75 mb-12">
            {m.cta_desc()}
        </p>
        <a href="mailto:hello@indexflow.agency" class="btn-premium px-12 py-6 sharp text-xs md:text-sm">
            {m.cta_btn()}
        </a>
    </div>
</section>
