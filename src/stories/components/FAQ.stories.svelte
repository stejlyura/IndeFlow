<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FAQ from '$lib/components/FAQ.svelte';

  const { Story } = defineMeta({
    title: 'Components/FAQ',
    component: FAQ,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
