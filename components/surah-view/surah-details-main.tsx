import { readData } from '@/lib/read-file';
import { Surah } from '@/lib/types/quran-meta-types';
import { VersesResponse } from '@/lib/types/verses-type';
import React from 'react';
type SurahDetailsMainProps = {
  surahs: Surah[];
  surahId: string;
};
const SurahDetailsMain = async ({ surahs, surahId }: SurahDetailsMainProps) => {
  const surah = surahs.find(surah => surah.id === parseInt(surahId));
  const { verses } = await readData<VersesResponse>(`data/verses/surah_id_${surahId}.json`);
  return (
    <div>
      {surah?.transliteration}
      <div>
        {verses.map(verse => {
          return <p key={verse.id}>{verse.text_uthmani}</p>;
        })}
      </div>
    </div>
  );
};

export default SurahDetailsMain;
