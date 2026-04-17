<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ServicesExt from '$lib/components/ServicesExt.svelte';

  const { Story } = defineMeta({
    title: 'Components/ServicesExt',
    component: ServicesExt,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
