import { readData } from '@/lib/read-file';
import { Surah } from '@/lib/types/quran-meta-types';
import { VersesResponse } from '@/lib/types/verses-type';
import VerseDisplayCard from './verse-display-card';
import SurahDisplayCard from './surah-display-card';

type SurahDetailsMainProps = {
  surahs: Surah[];
  surahId: string;
  searchParams?: {
    wbw_tr?: string;
  };
};
const SurahDetailsMain = async ({ surahs, surahId, searchParams }: SurahDetailsMainProps) => {
  const surah = surahs.find(surah => surah.id === parseInt(surahId));
  const { verses } = await readData<VersesResponse>(`data/verses/surah_id_${surahId}.json`);

  //FIXME: Need to improve it
  if (!surah) {
    return <div>Surah with id ${surahId} not found</div>;
  }

  console.log(searchParams);
  return (
    <div>
      <SurahDisplayCard surah={surah}>
        {verses.map(verse => (
          <VerseDisplayCard key={verse.id} verse={verse} />
        ))}
      </SurahDisplayCard>
    </div>
  );
};

export default SurahDetailsMain;
