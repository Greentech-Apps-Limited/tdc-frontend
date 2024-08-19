import { readData } from '@/lib/read-file';
import { Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';

type QuranSegmentDetails = {
  params: {
    quranSegment: QuranSegment;
    segmentId: string;
  };
};

const QuranSegmentDetails = async ({ params }: QuranSegmentDetails) => {
  const surahs = await readData<Surah[]>('data/quran-meta/surahs/en.json');

  const surah = surahs.find(surah => surah.id === parseInt(params.segmentId));
  return <div>{surah?.transliteration}</div>;
};

export default QuranSegmentDetails;
