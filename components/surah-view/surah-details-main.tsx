import { readData } from '@/lib/read-file';
import { Surah } from '@/lib/types/quran-meta-types';
import { MergedVerse, VersesResponse } from '@/lib/types/verses-type';
import VerseDisplayCard from './verse-display-card';
import SurahDisplayCard from './surah-display-card';
import { WbwVersesResponse } from '@/lib/types/wbw-type';

type SurahDetailsMainProps = {
  surahs: Surah[];
  surahId: string;
  searchParams?: {
    wbw_tr?: string;
  };
};

const SurahDetailsMain = async ({ surahs, surahId }: SurahDetailsMainProps) => {
  const surah = surahs.find(surah => surah.id === parseInt(surahId));
  const { verses } = await readData<VersesResponse>(`data/verses/surah_id_${surahId}.json`);
  const wbwSurahResponse = await readData<WbwVersesResponse>(
    `data/wbw/en/wbw_surah_id_${surahId}.json`
  );

  if (!surah) {
    return <div>Surah with id {surahId} not found</div>;
  }

  const mergedVerses: MergedVerse[] = verses.map(verse => {
    const wbwVerse = wbwSurahResponse.verses.find(wbw => wbw.verse_number === verse.verse_number);
    return {
      ...verse,
      words: wbwVerse?.words || [],
    };
  });

  return (
    <div>
      <SurahDisplayCard surah={surah}>
        {mergedVerses.map(mergedVerse => (
          <VerseDisplayCard key={mergedVerse.id} verse={mergedVerse} />
        ))}
      </SurahDisplayCard>
    </div>
  );
};

export default SurahDetailsMain;
