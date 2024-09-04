// import SurahDetailsMain from '@/components/surah-view/surah-details-main';
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
  console.log(quranSegment, segmentId, translationInfos, surahs, searchParams);
  switch (quranSegment) {
    case 'surah':
      return <div>Test</div>;
    case 'page':
    case 'juz':
    case 'hizb':
    case 'ruku':
      return <div>In progress</div>;
    default:
      return <div>Invalid Quran Segment</div>;
  }
};

export default QuranSegmentDetails;
