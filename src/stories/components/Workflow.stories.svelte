<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Workflow from '$lib/components/Workflow.svelte';

  const { Story } = defineMeta({
    title: 'Components/Workflow',
    component: Workflow,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
