import fs from 'fs';
import axios from 'axios';
import path from 'path';

const inputFilePath = path.join('data', 'quran-meta', 'surahs', 'en.json');
const outputDir = path.join('data', 'verses');

export const getVersesAndWriteFile = async () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const fileContent = fs.readFileSync(inputFilePath, 'utf8');
    const surahList = JSON.parse(fileContent);

    for (const surah of surahList) {
      const apiUrl = `https://api.quran.com/api/v4/verses/by_chapter/${surah.id}?fields=text_uthmani&language=en&word_fields=text_uthmani,location&page=1&per_page=${surah.verses}`;

      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const outputFilePath = path.join(outputDir, `surah_id_${surah.id}.json`);
        fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
        console.log(`File saved: ${outputFilePath}`);
      } catch (error) {
        console.error(`Failed to fetch data for Surah ID ${surah.id}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error reading or processing the file:', error.message);
  }
};
