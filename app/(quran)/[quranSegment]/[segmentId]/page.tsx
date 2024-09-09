import QuranSegmentDetailsMain from '@/components/quran-segment-view/quran-segment-details-main';
import QuranDetailsSkeleton from '@/components/skeleton-loaders/quran-details-skeleton';
import SurahDetailsMain from '@/components/surah-view/surah-details-main';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import { TRANSLATIONS_INFO } from '@/data/quran-meta/translations-info';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { SearchParamsType } from '@/lib/types/search-params-type';
import { Suspense } from 'react';

type QuranSegmentDetailsProps = {
  params: {
    quranSegment: QuranSegment;
    segmentId: string;
  };
  searchParams: SearchParamsType;
};

const QuranSegmentDetails = async ({ params, searchParams }: QuranSegmentDetailsProps) => {
  const { quranSegment, segmentId } = params;
  const surahs = SURAH_EN;
  const translationInfos = TRANSLATIONS_INFO;

  switch (quranSegment) {
    case 'surah':
      return (
        <Suspense fallback={<QuranDetailsSkeleton />}>
          <SurahDetailsMain
            surahId={segmentId}
            surahs={surahs}
            searchParams={searchParams}
            translationInfos={translationInfos}
          />
        </Suspense>
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
