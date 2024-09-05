import QuranSegmentDetailsMain from '@/components/quran-segment-view/quran-segment-details-main';
import SurahDetailsMain from '@/components/surah-view/surah-details-main';
import { readData } from '@/lib/read-file';
import { Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { SearchParamsType } from '@/lib/types/search-params-type';
import { TranslationInfosType } from '@/lib/types/surah-translation-type';

type QuranSegmentDetailsProps = {
  params: {
    quranSegment: QuranSegment;
    segmentId: string;
  };
  searchParams: SearchParamsType;
};

const QuranSegmentDetails = async ({ params, searchParams }: QuranSegmentDetailsProps) => {
  const { quranSegment, segmentId } = params;
  const surahs = await readData<Surah[]>('data/quran-meta/surahs/en.json');
  const translationInfos = await readData<TranslationInfosType>(
    `data/quran-meta/translationsInfo.json`
  );

  switch (quranSegment) {
    case 'surah':
      return (
        <SurahDetailsMain
          surahId={segmentId}
          surahs={surahs}
          searchParams={searchParams}
          translationInfos={translationInfos}
        />
      );
    case 'page':
    case 'juz':
    case 'hizb':
    case 'ruku':
      return (
        <QuranSegmentDetailsMain
          params={{ quranSegment, segmentId }}
          surahs={surahs}
          searchParams={searchParams}
          translationInfos={translationInfos}
        />
      );
    default:
      return <div>Invalid Quran Segment</div>;
  }
};

export default QuranSegmentDetails;
