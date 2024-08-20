import { readData } from '@/lib/read-file';
import { Surah } from '@/lib/types/quran-meta-types';
import { VersesResponse } from '@/lib/types/verses-type';
import React from 'react';
import SurahVerseDisplay from './surah-display-card';
import VerseDisplayCard from './verse-display-card';
type SurahDetailsMainProps = {
  surahs: Surah[];
  surahId: string;
};
const SurahDetailsMain = async ({ surahs, surahId }: SurahDetailsMainProps) => {
  const surah = surahs.find(surah => surah.id === parseInt(surahId));
  const { verses } = await readData<VersesResponse>(`data/verses/surah_id_${surahId}.json`);

  //FIXME: Need to improve it
  if (!surah) {
    return <div>Surah with id ${surahId} not found</div>;
  }

  return (
    <div>
      <SurahVerseDisplay surah={surah}>
        {verses.map(verse => (
          <VerseDisplayCard key={verse.id} verse={verse} />
        ))}
      </SurahVerseDisplay>
    </div>
  );
};

export default SurahDetailsMain;
