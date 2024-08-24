import { readData } from '@/lib/read-file';
import { Surah } from '@/lib/types/quran-meta-types';
import { MergedVerse, VersesResponse } from '@/lib/types/verses-type';
import VerseDisplayCard from './verse-display-card';
import SurahDisplayCard from './surah-display-card';
import { WbwVersesResponse } from '@/lib/types/wbw-type';
import {
  SurahTranslation,
  TranslationInfo,
  TranslationInfosType,
} from '@/lib/types/surah-translation-type';

type SurahDetailsMainProps = {
  surahs: Surah[];
  translationInfos: TranslationInfosType;
  surahId: string;
  searchParams?: {
    wbw_tr?: string;
  };
};

const SurahDetailsMain = async ({ surahs, surahId, translationInfos }: SurahDetailsMainProps) => {
  const surah = surahs.find(surah => surah.id === parseInt(surahId));

  // FIXME: Make translationIds dynamic based on user selections
  const translationIds = ['20'];

  const { verses } = await readData<VersesResponse>(`data/verses/surah_id_${surahId}.json`);
  const wbwSurahResponse = await readData<WbwVersesResponse>(
    `data/wbw/en/wbw_surah_id_${surahId}.json`
  );

  const filteredTranslationInfos = translationIds
    .map(id => translationInfos[id])
    .filter((info): info is TranslationInfo => info !== undefined);

  const combinedTranslations = await Promise.all(
    filteredTranslationInfos.map(async info => {
      const translation = await readData<SurahTranslation>(
        `data/translations/en/${info.id}/surah_id_${surahId}.json`
      );
      return { info, translation };
    })
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
          <VerseDisplayCard
            key={mergedVerse.id}
            verse={mergedVerse}
            combinedTranslations={combinedTranslations}
          />
        ))}
      </SurahDisplayCard>
    </div>
  );
};

export default SurahDetailsMain;
