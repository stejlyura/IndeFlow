<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import UILab from '$lib/components/UILab.svelte';

  const { Story } = defineMeta({
    title: 'Components/UILab',
    component: UILab,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
