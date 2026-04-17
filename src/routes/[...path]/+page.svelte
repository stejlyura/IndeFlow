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

<svelte:head>
	<title>{config.metaTitle}</title>
</svelte:head>

<!-- Map the sections from the JSON configuration to the CSS-only components -->
{#each config.sections as section (section.id)}
	{@const Component = componentMap[section.type]}
	{#if Component}
		<Component {...section.data} />
	{/if}
{/each}