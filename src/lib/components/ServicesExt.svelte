<script lang="ts">
    import * as m from '$lib/paraglide/messages';

    let services = [
        { title: m.srv_ext_1_title(), desc: m.srv_ext_1_desc() },
        { title: m.srv_ext_2_title(), desc: m.srv_ext_2_desc() },
        { title: m.srv_ext_3_title(), desc: m.srv_ext_3_desc() }
    ];
</script>

<section class="py-24 px-4 md:px-8 bg-accent-section reveal">
    <div class="container mx-auto max-w-6xl">
        <h2 class="text-3xl md:text-5xl font-black uppercase italic mb-16 tracking-tighter text-center">
            {m.srv_ext_title()}
        </h2>

        <div class="grid md:grid-cols-3 gap-12">
            {#each services as service, i}
                <div class="p-8 border border-[var(--border-color)] bg-[var(--bg-card)] glass-effect sharp transition-transform hover:-translate-y-2">
                    <div class="text-[var(--primary)] font-black text-4xl mb-6 opacity-50">0{i + 1}</div>
                    <h3 class="text-xl font-bold uppercase mb-4 tracking-widest">{service.title}</h3>
                    <p class="text-sm opacity-70 leading-relaxed">
                        {service.desc}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</section>
