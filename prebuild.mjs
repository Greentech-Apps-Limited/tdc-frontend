import { getVersesAndWriteFile } from './scripts/get-verses.mjs';
import { getWbwDataAndWriteFile } from './scripts/get-wbw-data.mjs';
import getTranslations from './scripts/translations.mjs';

const runPrebuildTasks = async () => {
  try {
    await Promise.all([getVersesAndWriteFile(), getWbwDataAndWriteFile(), getTranslations()]);

    console.log('Prebuild complete!');
  } catch (error) {
    console.error('Prebuild failed:', error.message);
  }
};

runPrebuildTasks();
