<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Hero from '$lib/components/Hero.svelte';

  const { Story } = defineMeta({
    title: 'Components/Hero',
    component: Hero,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
