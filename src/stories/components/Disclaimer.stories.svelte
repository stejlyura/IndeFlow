<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Disclaimer from '$lib/components/Disclaimer.svelte';

  const { Story } = defineMeta({
    title: 'Components/Disclaimer',
    component: Disclaimer,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
