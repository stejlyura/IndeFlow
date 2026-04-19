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
		CallbackForm
	} from '$lib';

	let { data }: { data: PageData } = $props();
	let config = $derived(data.pageConfig);

	const componentMap: Record<string, any> = {
		Hero,
		LogoCloud,
		Stats,
		Expertise,
		Workflow,
		Disclaimer,
		Pricing,
		CallbackForm
	};
</script>

<!-- Map the sections from the JSON configuration to the CSS-only components -->
{#each Object.entries(config) as [componentName, componentData] (componentName)}
	{@const Component = componentMap[componentName]}
	{#if Component && componentData?.props}
		<Component {...componentData.props} />
	{/if}
{/each}