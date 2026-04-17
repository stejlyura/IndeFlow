<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CallbackForm from '$lib/components/CallbackForm.svelte';

  const { Story } = defineMeta({
    title: 'Components/CallbackForm',
    component: CallbackForm,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
