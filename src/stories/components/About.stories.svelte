<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import About from '$lib/components/About.svelte';

  const { Story } = defineMeta({
    title: 'Components/About',
    component: About,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
