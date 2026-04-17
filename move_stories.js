import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src/lib/components');
const destDir = path.join(process.cwd(), 'src/stories/components');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.endsWith('.stories.svelte')) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    
    let content = fs.readFileSync(srcPath, 'utf8');
    // Replace `import ComponentName from './ComponentName.svelte';`
    content = content.replace(/import\s+(\w+)\s+from\s+['"]\.\/(\w+)\.svelte['"];?/g, "import $1 from '$lib/components/$2.svelte';");
    
    fs.writeFileSync(destPath, content);
    fs.unlinkSync(srcPath);
    console.log('Moved and updated:', file);
  }
});
