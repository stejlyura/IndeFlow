<script lang="ts">
    import type { PageConfig } from '$lib/types';
    import Hero from './Hero.svelte';
    import Expertise from './Expertise.svelte';
    import Workflow from './Workflow.svelte';
    import Disclaimer from './Disclaimer.svelte';
    import LogoCloud from './LogoCloud.svelte';
    import Stats from './Stats.svelte';
    import Pricing from './Pricing.svelte';
    import CallbackForm from './CallbackForm.svelte';
    import Comparison from './Comparison.svelte';
    import FAQ from './FAQ.svelte';
    import UILab from './UILab.svelte';

    let { config } = $props<{ config: PageConfig }>();

    const componentMap: Record<string, any> = {
        'Hero': Hero,
        'Expertise': Expertise,
        'Workflow': Workflow,
        'Disclaimer': Disclaimer,
        'LogoCloud': LogoCloud,
        'Stats': Stats,
        'Pricing': Pricing,
        'CallbackForm': CallbackForm,
        'Comparison': Comparison,
        'FAQ': FAQ,
        'UILab': UILab
    };
</script>

<div data-theme={config?.theme} class="min-h-screen">
    {#if config?.sections}
        {#each config.sections as section (section.id)}
            {@const Component = componentMap[section.type]}
            {#if Component}
                <Component {...section.data} />
            {/if}
        {/each}
    {/if}
</div>
