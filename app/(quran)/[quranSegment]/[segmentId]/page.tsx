import HizbDetailsMain from '@/components/hizb-view/hizb-details-main';
import JuzDetailsMain from '@/components/juz-view/juz-details-main';
import PageDetailsMain from '@/components/page-view/page-details-main';
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
      return <PageDetailsMain pageId={segmentId} surahs={surahs} />;
    case 'juz':
      return <JuzDetailsMain juzId={segmentId} surahs={surahs} />;
    case 'hizb':
      return <HizbDetailsMain hizbId={segmentId} surahs={surahs} />;
    case 'ruku':
      return <div>Ruku Component for ID: {segmentId}</div>;
    default:
      return <div>Invalid Quran Segment</div>;
  }
};

export default QuranSegmentDetails;
