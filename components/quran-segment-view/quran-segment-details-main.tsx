import { MappingObjectType, Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { MergedVerse, Verse } from '@/lib/types/verses-type';
import SurahDisplayCard from '../surah-view/surah-display-card';
import VerseDisplayCard from '../surah-view/verse-display-card';
import { TranslationInfosType } from '@/lib/types/surah-translation-type';
import { SearchParamsType } from '@/lib/types/search-params-type';
import {
  filterVersesBySegment,
  getVersesBySurah,
  getWbwVersesBySurah,
  mergeVersesWithWbw,
} from '@/lib/utils/verse-utils';
import { addTranslationsToVerses, parseTranslationIds } from '@/lib/utils/translation-utils';
import { RUB_EL_HIZB_TO_SURAH_MAPPINGS } from '@/data/quran-meta/rub-el-hizb-to-surah-mappings';
import { PAGE_TO_SURAH_MAPPINGS } from '@/data/quran-meta/page-to-surah-mappings';
import { JUZ_TO_SURAH_MAPPINGS } from '@/data/quran-meta/juz-to-surah-mappings';
import { HIZB_TO_SURAH_MAPPINGS } from '@/data/quran-meta/hizb-to-surah-mappings';

type QuranSegmentDetailsMainProps = {
  params: {
    quranSegment?: Exclude<QuranSegment, 'surah'>;
    segmentId: string;
  };
  translationInfos: TranslationInfosType;
  surahs: Surah[];
  searchParams: SearchParamsType;
};

const QuranSegmentDetailsMain = async ({
  surahs,
  params,
  searchParams,
  translationInfos,
}: QuranSegmentDetailsMainProps) => {
  const { quranSegment, segmentId } = params;
  let segmentData: Array<{ surahInfo: Surah; mergedVerses: MergedVerse[] }> = [];

  const mappings: Record<Exclude<QuranSegment, 'surah'>, MappingObjectType> = {
    page: PAGE_TO_SURAH_MAPPINGS,
    juz: JUZ_TO_SURAH_MAPPINGS,
    hizb: HIZB_TO_SURAH_MAPPINGS,
    ruku: RUB_EL_HIZB_TO_SURAH_MAPPINGS,
  };

  if (quranSegment && quranSegment in mappings) {
    const filterKey =
      quranSegment === 'hizb' ? 'rub_el_hizb_number' : (`${quranSegment}_number` as keyof Verse);
    const verseMapping = mappings[quranSegment];
    const numericSegmentId = parseInt(segmentId, 10);
    const surahIDs = verseMapping[numericSegmentId] || [];
    const surahInfos = surahs.filter(surah => surahIDs.includes(surah.id.toString()));

    segmentData = await Promise.all(
      surahInfos.map(async surahInfo => {
        const verses = await getVersesBySurah(surahInfo.id.toString(), surahInfo.verses);
        const wbwVerses = await getWbwVersesBySurah(
          surahInfo.id.toString(),
          surahInfo.verses,
          searchParams?.wbw_tr
        );
        const filteredVerses = filterVersesBySegment(verses, segmentId, filterKey);
        let mergedVerses = mergeVersesWithWbw(filteredVerses, wbwVerses);
        const translationIds = parseTranslationIds(searchParams.translations);
        mergedVerses = await addTranslationsToVerses(
          mergedVerses,
          surahInfo.id.toString(),
          translationIds,
          translationInfos
        );
        return { surahInfo, mergedVerses };
      })
    );
  }

  return (
    <div>
      {segmentData.map(({ surahInfo, mergedVerses }) => (
        <SurahDisplayCard key={surahInfo.id} surah={surahInfo}>
          {mergedVerses.map(mergedVerse => (
            <VerseDisplayCard key={mergedVerse.id} verse={mergedVerse} />
          ))}
        </SurahDisplayCard>
      ))}
    </div>
  );
};

export default QuranSegmentDetailsMain;
