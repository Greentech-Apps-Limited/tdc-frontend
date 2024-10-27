import QuranSegmentDetailsMain from '@/components/quran-segment-view/quran-segment-details-main';
import QuranDetailsWrapper from '@/components/quran-view/quran-details-wrapper';
import SurahDetailsMain from '@/components/surah-view/surah-details-main';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { SearchParamsType } from '@/lib/types/search-params-type';
import { TranslationItem, TranslationResponse } from '@/lib/types/surah-translation-type';
import { fetcher } from '@/services/api';
import { unstable_setRequestLocale } from 'next-intl/server';

const fetchTranslations = async (): Promise<TranslationItem[]> => {
  const data = await fetcher<TranslationResponse>(
    'https://tdc-backend.greentechapps.com/api/quran/translations/'
  );
  return data.results;
};

type QuranSegmentDetailsProps = {
  params: {
    quranSegment: QuranSegment;
    segmentId: string;
    locale: string;
  };
  searchParams: SearchParamsType;
};

const QuranSegmentDetails = async ({ params, searchParams }: QuranSegmentDetailsProps) => {
  unstable_setRequestLocale(params.locale);
  const { quranSegment, segmentId } = params;
  const surahs = SURAH_EN;
  const translationInfos = await fetchTranslations();

  switch (quranSegment) {
    case 'surah':
      return (
        <QuranDetailsWrapper searchParams={searchParams}>
          <SurahDetailsMain
            surahId={segmentId}
            surahs={surahs}
            searchParams={searchParams}
            translationInfos={translationInfos}
          />
        </QuranDetailsWrapper>
      );
    case 'page':
    case 'juz':
    case 'hizb':
    case 'ruku':
      return (
        <QuranDetailsWrapper searchParams={searchParams}>
          <QuranSegmentDetailsMain
            params={{ quranSegment, segmentId }}
            surahs={surahs}
            searchParams={searchParams}
            translationInfos={translationInfos}
          />
        </QuranDetailsWrapper>
      );
    default:
      return <div>Invalid Quran Segment</div>;
  }
};

export default QuranSegmentDetails;
