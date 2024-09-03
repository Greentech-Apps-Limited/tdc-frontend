import fs from 'fs';
import axios from 'axios';
import path from 'path';

const inputFilePath = path.join('data', 'quran-meta', 'surahs', 'en.json');
const outputDir = path.join('data', 'wbw', 'en');

export const getWbwDataAndWriteFile = async () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const fileContent = fs.readFileSync(inputFilePath, 'utf8');
    const surahList = JSON.parse(fileContent);

    for (const surah of surahList) {
      const apiUrl = `https://api.quran.com/api/v4/verses/by_chapter/${surah.id}?language=en&page=1&per_page=${surah.verses}&word_fields=text_uthmani,location&words=true`;

      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const modifiedData = {
          ...data,
          verses: data.verses.map(verse => ({
            ...verse,
            words: verse.words.map(word => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { audio_url, ...rest } = word;
              return rest;
            }),
          })),
        };

        const outputFilePath = path.join(outputDir, `wbw_surah_id_${surah.id}.json`);

        fs.writeFileSync(outputFilePath, JSON.stringify(modifiedData, null, 2));
        console.log(`File saved: ${outputFilePath}`);
      } catch (error) {
        console.error(`Failed to fetch data for Surah ID ${surah.id}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error reading or processing the file:', error.message);
  }
};
