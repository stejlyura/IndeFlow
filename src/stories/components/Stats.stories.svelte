<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stats from '$lib/components/Stats.svelte';

  const { Story } = defineMeta({
    title: 'Components/Stats',
    component: Stats,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
