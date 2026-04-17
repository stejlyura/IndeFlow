<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Seo from '$lib/components/Seo.svelte';

  const { Story } = defineMeta({
    title: 'Components/Seo',
    component: Seo,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
