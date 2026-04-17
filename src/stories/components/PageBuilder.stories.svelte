<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PageBuilder from '$lib/components/PageBuilder.svelte';

  const { Story } = defineMeta({
    title: 'Components/PageBuilder',
    component: PageBuilder,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
