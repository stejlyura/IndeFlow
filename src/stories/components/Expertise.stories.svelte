<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Expertise from '$lib/components/Expertise.svelte';

  const { Story } = defineMeta({
    title: 'Components/Expertise',
    component: Expertise,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
