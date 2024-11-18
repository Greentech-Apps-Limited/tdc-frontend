import SurahContentProvider from '@/components/surah-view/surah-content-provider';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { TranslationItem, TranslationResponse } from '@/lib/types/surah-translation-type';
import { fetcher } from '@/services/api';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateQuranSegmentMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: {
    locale: string;
    quranSegment: string;
    segmentId: string;
  };
}) {
  return generateQuranSegmentMetadata({
    params,
    segment: params.quranSegment,
    segmentId: params.segmentId,
  });
}

const fetchTranslations = async (): Promise<TranslationItem[]> => {
  const data = await fetcher<TranslationResponse>('/quran/translations/?limit=500');
  return data.results;
};

type QuranSegmentDetailsProps = {
  params: {
    quranSegment: QuranSegment;
    segmentId: string;
    locale: string;
  };
};

const QuranSegmentDetails = async ({ params }: QuranSegmentDetailsProps) => {
  unstable_setRequestLocale(params.locale);
  const { quranSegment, segmentId } = params;
  const surahs = SURAH_EN;
  const translationInfos = await fetchTranslations();

  switch (quranSegment) {
    case 'surah':
    case 'page':
    case 'juz':
    case 'hizb':
    case 'ruku':
      return (
        <SurahContentProvider
          quranSegment={quranSegment}
          segmentId={segmentId}
          surahs={surahs}
          translationInfos={translationInfos}
        />
      );
    default:
      return <div>Invalid Quran Segment</div>;
  }
};

export default QuranSegmentDetails;
