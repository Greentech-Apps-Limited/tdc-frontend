import fs from 'fs/promises';
import path from 'path';

const ICON_DIRECTORY = './icons/surah-names';
const INDEX_FILE_PATH = './icons/surah-names/index.ts';

const generateIconIndex = async () => {
  try {
    const svgFiles = await fs.readdir(ICON_DIRECTORY);
    const iconImports = [];
    const iconExports = [];

    for (const file of svgFiles) {
      if (file.endsWith('.svg')) {
        await updateSvgColors(file);
        const newFileName = await renameSvgFile(file);
        const { importStatement, exportName } = createImportExportStatements(newFileName);
        iconImports.push(importStatement);
        iconExports.push(exportName);
      }
    }

    const indexFileContent = `${iconImports.join('\n')}\n\nexport { ${iconExports.join(', ')} };\n`;
    await fs.writeFile(INDEX_FILE_PATH, indexFileContent, 'utf8');

    console.log(`Icon index file generated successfully at ${INDEX_FILE_PATH}`);
  } catch (error) {
    console.error('Error generating icon index:', error);
  }
};

const updateSvgColors = async fileName => {
  const filePath = path.join(ICON_DIRECTORY, fileName);
  let content = await fs.readFile(filePath, 'utf8');

  content = content.replace(/(stroke|fill)="(?!none)([^"]+)"/gi, (match, attr, value) => {
    if (value.toLowerCase() !== 'none') {
      return `${attr}="currentColor"`;
    }
    return match;
  });

  await fs.writeFile(filePath, content, 'utf8');
};

const renameSvgFile = async fileName => {
  const oldFilePath = path.join(ICON_DIRECTORY, fileName);
  const baseName = path.basename(fileName, '.svg').replace(/\.inline/g, '');
  const newFileName = `${baseName}.inline.svg`;
  const newFilePath = path.join(ICON_DIRECTORY, newFileName);

  await fs.rename(oldFilePath, newFilePath);
  return newFileName;
};

const createImportExportStatements = fileName => {
  const baseName = path.basename(fileName, '.inline.svg');
  const componentName = convertToComponentName(baseName);
  const importStatement = `import ${componentName} from './${baseName}.inline.svg';`;
  return { importStatement, exportName: componentName };
};

const convertToComponentName = baseName => baseName.split('-').map(capitalizeFirstLetter).join('');

const capitalizeFirstLetter = word => word.charAt(0).toUpperCase() + word.slice(1);

generateIconIndex();
