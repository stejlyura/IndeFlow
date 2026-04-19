<script lang="ts">
	import type { PageData } from './$types';
	import { 
		Hero, 
		LogoCloud, 
		Stats, 
		Expertise, 
		Workflow, 
		Disclaimer, 
		Pricing, 
		CallbackForm,
		FAQ,
		About,
		Comparison,
		Cta,
		ServicesExt,
		UILab,
		Seo
	} from '$lib';
	import { generateSeoConfig } from '$lib/functions/generateSeoParams';

	let { data }: { data: PageData } = $props();
	let config = $derived(data.pageConfig);
	let seoParams = $derived(generateSeoConfig(config));

	const componentMap: Record<string, any> = {
		Hero,
		LogoCloud,
		Stats,
		Expertise,
		Workflow,
		Disclaimer,
		Pricing,
		CallbackForm,
		FAQ,
		About,
		Comparison,
		Cta,
		ServicesExt,
		UILab
	};
</script>

<Seo 
	seo_title={seoParams.title}
	seo_desc={seoParams.description}
	seo_keywords={seoParams.keywords}
/>

<!-- Map the sections from the JSON configuration to the CSS-only components -->
{#each Object.entries(config) as [componentName, componentData] (componentName)}
	{@const Component = componentMap[componentName]}
	{#if Component && componentData?.props}
		<Component {...componentData.props} />
	{/if}
{/each}