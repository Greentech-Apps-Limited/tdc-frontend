import QuranSegmentDetailsMain from '@/components/quran-segment-view/quran-segment-details-main';
import SurahDetailsMain from '@/components/surah-view/surah-details-main';
import { readData } from '@/lib/read-file';
import { Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';

type QuranSegmentDetailsProps = {
  params: {
    quranSegment: QuranSegment;
    segmentId: string;
  };
};

const QuranSegmentDetails = async ({ params }: QuranSegmentDetailsProps) => {
  const { quranSegment, segmentId } = params;
  const surahs = await readData<Surah[]>('data/quran-meta/surahs/en.json');

  switch (quranSegment) {
    case 'surah':
      return <SurahDetailsMain surahId={segmentId} surahs={surahs} />;
    case 'page':
    case 'juz':
    case 'hizb':
    case 'ruku':
      return <QuranSegmentDetailsMain params={params} surahs={surahs} />;
    default:
      return <div>Invalid Quran Segment</div>;
  }
};

export default QuranSegmentDetails;
