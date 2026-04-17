//node scripts/map.cjs

const fs = require('fs');
const path = require('path');

// Корневая директория проекта (папка, где лежит папка 'scripts')
const projectRoot = path.resolve(__dirname, '..');

// Список игнорируемых директорий и файлов/папок. Используем Set для быстрого поиска.
const ignoreList = new Set([
  'node_modules',
  '.git',
  '.svelte-kit',
  'build',
  'dist',
  '.env',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  'AGENT_MAP.md', // Игнорируем сам файл с картой
]);

function generateMap(dir, depth = 0) {
  let map = "";
  let files;

  try {
    // Читаем содержимое директории
    files = fs.readdirSync(dir);
  } catch (error) {
    console.error(`Ошибка чтения директории: ${dir}`, error);
    return ""; // Возвращаем пустую строку в случае ошибки
  }

  // Сортировка: сначала папки, потом файлы, все по алфавиту
  files.sort((a, b) => {
    try {
      const statA = fs.statSync(path.join(dir, a));
      const statB = fs.statSync(path.join(dir, b));
      if (statA.isDirectory() && !statB.isDirectory()) return -1; // Папки идут первыми
      if (!statA.isDirectory() && statB.isDirectory()) return 1;
      return a.localeCompare(b); // Сортировка по имени
    } catch (e) {
      // Файл мог быть удален во время выполнения, пропускаем сортировку для этой пары
      return 0;
    }
  });
  
  files.forEach(file => {
    // Пропускаем файлы и папки из списка игнорирования
    if (ignoreList.has(file)) {
      return;
    }
    
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath, { throwIfNoEntry: false });
    if (!stats) return; // Пропускаем, если не можем получить информацию о файле (например, битая ссылка)

    const indent = "  ".repeat(depth);
    
    if (stats.isDirectory()) {
      map += `${indent}- [DIR] ${file}/\n`;
      // Рекурсивно вызываем для поддиректории
      map += generateMap(filePath, depth + 1);
    } else {
      map += `${indent}- ${file}\n`;
    }
  });
  return map;
}

try {
  // Генерируем карту начиная с корневой директории проекта
  const projectMap = generateMap(projectRoot);
  const outputFile = path.join(projectRoot, 'AGENT_MAP.md');
  
  // Записываем результат в файл
  fs.writeFileSync(outputFile, `# Карта Проекта\n\n\`\`\`\n${projectMap}\`\`\``);
  
  console.log(`Карта проекта успешно обновлена в файле: ${outputFile}`);
} catch (error) {
  console.error("Произошла ошибка при создании карты проекта:", error);
}