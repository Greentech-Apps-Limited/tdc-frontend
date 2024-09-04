import fs from 'fs';
import path from 'path';
import axios from 'axios';

const inputFilePath = path.join('data', 'quran-meta', 'surahs', 'en.json');
const outputDir = path.join('data', 'translations', 'en', '20');

const getTranslations = async () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const fileContent = fs.readFileSync(inputFilePath, 'utf8');
    const surahList = JSON.parse(fileContent);

    for (const surah of surahList) {
      const apiUrl = `https://api.quran.com/api/v4/verses/by_chapter/${surah.id}?page=1&translations=20&per_page=${surah.verses}`;

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const modifiedData = data.verses.reduce((acc, verse) => {
          if (verse.translations.length > 0) {
            acc[verse.verse_number] = {
              id: verse.translations[0].id,
              resource_id: verse.translations[0].resource_id,
              text: verse.translations[0].text,
            };
          }
          return acc;
        }, {});
        const outputFilePath = path.join(outputDir, `surah_id_${surah.id}.json`);
        fs.writeFileSync(outputFilePath, JSON.stringify(modifiedData, null, 2));
        console.log(`File saved: ${outputFilePath}`);
      } catch (error) {
        console.error(`Failed to fetch data for Surah ID ${surah.id}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error reading or processing the Surah list file:', error.message);
  }
};

export default getTranslations;
