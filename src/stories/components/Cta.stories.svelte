<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Cta from '$lib/components/Cta.svelte';

  const { Story } = defineMeta({
    title: 'Components/Cta',
    component: Cta,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
