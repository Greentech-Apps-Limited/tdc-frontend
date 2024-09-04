import { readData } from '@/lib/read-file';
import { Surah } from '@/lib/types/quran-meta-types';
import { MergedVerse, VersesResponse } from '@/lib/types/verses-type';
import VerseDisplayCard from './verse-display-card';
import SurahDisplayCard from './surah-display-card';
import { WbwVersesResponse } from '@/lib/types/wbw-type';
import { SurahTranslation, TranslationInfosType } from '@/lib/types/surah-translation-type';

type SurahDetailsMainProps = {
  surahs: Surah[];
  surahId: string;
  translationInfos: TranslationInfosType;
  searchParams: {
    translations?: string;
  };
};

function parseTranslationIds(searchParams: { translations?: string }): string[] {
  return searchParams?.translations ? searchParams.translations.split('-') : ['20'];
}

const SurahDetailsMain = async ({
  surahs,
  surahId,
  translationInfos,
  searchParams,
}: SurahDetailsMainProps) => {
  const surah = surahs.find(surah => surah.id === parseInt(surahId));

  if (!surah) {
    return <div>Surah with id {surahId} not found</div>;
  }

  const { verses } = await readData<VersesResponse>(`data/verses/surah_id_${surahId}.json`);
  const wbwSurahResponse = await readData<WbwVersesResponse>(
    `data/wbw/en/wbw_surah_id_${surahId}.json`
  );

  const translationIds = parseTranslationIds(searchParams);

  const translations = await Promise.all(
    translationIds.map(async id => {
      try {
        const translation = await readData<SurahTranslation>(
          `data/translations/en/${id}/surah_id_${surahId}.json`
        );
        return { id, translation };
      } catch (error) {
        console.error(`Failed to load translation for ID ${id}:`, error);
        return { id, translation: null };
      }
    })
  );

  const mergedVerses: MergedVerse[] = verses.map(verse => {
    const wbwVerse = wbwSurahResponse.verses.find(wbw => wbw.verse_number === verse.verse_number);
    const combinedTranslations = translations
      .filter(({ translation }) => translation !== null)
      .map(({ id, translation }) => ({
        info: translationInfos[id],
        text: translation?.[verse.verse_number.toString()]?.text || 'Translation not available',
      }));

    return {
      ...verse,
      words: wbwVerse?.words || [],
      combinedTranslations,
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
