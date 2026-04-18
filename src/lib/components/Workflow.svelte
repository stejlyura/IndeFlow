<script lang="ts">
    let {
        title = '',
        steps = []
    }: {
        title?: string;
        steps?: { number: string; tag: string; title: string; description: string }[];
    } = $props();
</script>

<style>
    .wf-wrap { position: relative; max-width: 900px; margin: 0 auto; }
    .wf-line { position: absolute; left: 23px; top: 0; bottom: 0; width: 2px; background: var(--border-color); }
    .wf-step { position: relative; padding-left: 80px; margin-bottom: 4rem; }
    .wf-dot { position: absolute; left: 0; top: 0; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--primary); font-weight: 900; color: #000; }
    
    @media (min-width: 768px) {
        .wf-line { left: 50%; transform: translateX(-50%); }
        .wf-step { padding-left: 0; margin-bottom: 8rem; display: flex; align-items: center; width: 100%; }
        .wf-dot { left: 50%; transform: translateX(-50%); }
        .wf-content { width: 45%; }
        .wf-step:nth-child(odd) { justify-content: flex-start; }
        .wf-step:nth-child(even) { justify-content: flex-end; }
        .wf-step:nth-child(odd) .wf-content { text-align: right; }
        .wf-step:nth-child(even) .wf-content { text-align: left; }
    }
</style>

<section class="py-24 px-4 md:px-8 bg-opacity-30 reveal" style="background-color: var(--bg-card); animation-delay: 0.2s;" id="services">
    <div class="container mx-auto">
        <h2 class="text-4xl md:text-7xl font-black mb-24 uppercase italic text-center tracking-tighter">
            {title}
        </h2>
        <div class="wf-wrap">
            <div class="wf-line"></div>
            {#each steps as step}
                <div class="wf-step">
                    <div class="wf-dot sharp">{step.number}</div>
                    <div class="wf-content">
                        <div class="text-[10px] uppercase font-bold opacity-40 mb-2">{step.tag}</div>
                        <h4 class="text-2xl font-bold uppercase mb-4">{step.title}</h4>
                        <p class="text-sm opacity-60 italic leading-relaxed">{step.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
