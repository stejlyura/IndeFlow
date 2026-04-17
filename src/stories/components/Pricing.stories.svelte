<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Pricing from '$lib/components/Pricing.svelte';

  const { Story } = defineMeta({
    title: 'Components/Pricing',
    component: Pricing,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
