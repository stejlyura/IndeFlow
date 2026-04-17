<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Comparison from '$lib/components/Comparison.svelte';

  const { Story } = defineMeta({
    title: 'Components/Comparison',
    component: Comparison,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
