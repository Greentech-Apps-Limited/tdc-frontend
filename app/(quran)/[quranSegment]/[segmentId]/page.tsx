import QuranSegmentDetailsMain from '@/components/quran-segment-view/quran-segment-details-main';
import SurahDetailsMain from '@/components/surah-view/surah-details-main';
import { readData } from '@/lib/read-file';
import { Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { Suspense } from 'react';

type QuranSegmentDetailsProps = {
  params: {
    quranSegment: QuranSegment;
    segmentId: string;
  };
  searchParams?: {
    wbw_tr?: string;
  };
};

const QuranSegmentDetails = async ({ params, searchParams }: QuranSegmentDetailsProps) => {
  const { quranSegment, segmentId } = params;
  const surahs = await readData<Surah[]>('data/quran-meta/surahs/en.json');
  switch (quranSegment) {
    case 'surah':
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <SurahDetailsMain surahId={segmentId} surahs={surahs} searchParams={searchParams} />
        </Suspense>
      );
    case 'page':
    case 'juz':
    case 'hizb':
    case 'ruku':
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <QuranSegmentDetailsMain
            params={{ quranSegment, segmentId }}
            surahs={surahs}
            searchParams={searchParams}
          />
        </Suspense>
      );
    default:
      return <div>Invalid Quran Segment</div>;
  }
};

export default QuranSegmentDetails;
