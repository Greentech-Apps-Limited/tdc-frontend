import { getVersesAndWriteFile } from './scripts/get-verses.mjs';
import { getWbwDataAndWriteFile } from './scripts/get-wbw-data.mjs';

const runPrebuildTasks = async () => {
  try {
    await Promise.all([getVersesAndWriteFile(), getWbwDataAndWriteFile()]);

    console.log('Prebuild complete!');
  } catch (error) {
    console.error('Prebuild failed:', error.message);
  }
};

runPrebuildTasks();
