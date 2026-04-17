<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Header from '$lib/components/Header.svelte';

  const { Story } = defineMeta({
    title: 'Components/Header',
    component: Header,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
