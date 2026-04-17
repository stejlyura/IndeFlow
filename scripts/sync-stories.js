import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, '../src/lib/components');

function generateStory(componentName) {
  return `<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ${componentName} from './${componentName}.svelte';

  const { Story } = defineMeta({
    title: 'Components/${componentName}',
    component: ${componentName},
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
`;
}

if (fs.existsSync(componentsDir)) {
  const files = fs.readdirSync(componentsDir);
  
  for (const file of files) {
    if (file.endsWith('.svelte') && !file.endsWith('.stories.svelte')) {
      const componentName = file.replace('.svelte', '');
      const storyFile = path.join(componentsDir, `${componentName}.stories.svelte`);
      
      if (!fs.existsSync(storyFile)) {
        fs.writeFileSync(storyFile, generateStory(componentName));
        console.log(`Generated story for ${componentName}`);
      }
    }
  }
}
