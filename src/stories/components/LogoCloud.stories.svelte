<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import LogoCloud from '$lib/components/LogoCloud.svelte';

  const { Story } = defineMeta({
    title: 'Components/LogoCloud',
    component: LogoCloud,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
