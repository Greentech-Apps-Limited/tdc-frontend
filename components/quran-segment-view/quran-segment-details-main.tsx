import { MappingObjectType, Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { MergedVerse, Verse } from '@/lib/types/verses-type';
import SurahDisplayCard from '../surah-view/surah-display-card';
import VerseDisplayCard from '../surah-view/verse-display-card';
import { TranslationInfosType } from '@/lib/types/surah-translation-type';
import { SearchParamsType } from '@/lib/types/search-params-type';
import { readData } from '@/lib/read-file';
import {
  filterVersesBySegment,
  getVersesBySurah,
  getWbwVersesBySurah,
  mergeVersesWithWbw,
} from '@/lib/utils/verse-utils';
import { addTranslationsToVerses, parseTranslationIds } from '@/lib/utils/translation-utils';

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

  const mappingPaths = {
    page: 'data/quran-meta/page-to-surah-mappings.json',
    juz: 'data/quran-meta/juz-to-surah-mappings.json',
    hizb: 'data/quran-meta/rub-el-hizb-to-surah-mappings.json',
    ruku: 'data/quran-meta/ruku-surah-mapping.json',
  };

  if (quranSegment && mappingPaths[quranSegment]) {
    const filterKey =
      quranSegment === 'hizb' ? 'rub_el_hizb_number' : (`${quranSegment}_number` as keyof Verse);
    const verseMapping: MappingObjectType = await readData(mappingPaths[quranSegment]);
    const surahIDs = verseMapping[segmentId] || [];
    const surahInfos = surahs.filter(surah => surahIDs.includes(surah.id.toString()));

    segmentData = await Promise.all(
      surahInfos.map(async surahInfo => {
        const verses = await getVersesBySurah(surahInfo.id.toString());
        const wbwVerses = await getWbwVersesBySurah(surahInfo.id.toString(), searchParams?.wbw_tr);
        const filteredVerses = filterVersesBySegment(verses, segmentId, filterKey);
        let mergedVerses = mergeVersesWithWbw(filteredVerses, wbwVerses);

        const translationIds = parseTranslationIds(searchParams);
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
