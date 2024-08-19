import { readData } from '@/lib/read-file';
import { QuranSegment } from '@/lib/types/quran-segment-type';

type QuranSegmentDetails = {
  params: {
    quranSegment: QuranSegment;
    segmentId: string;
  };
};

const QuranSegmentDetails = async ({ params }: QuranSegmentDetails) => {
  const quranMeta = await readData(`data/verses/surah_id_${params.segmentId}.json`);
  console.log(quranMeta);
  return (
    <div>
      {quranMeta.verses.map(item => {
        return <div key={item.id}>{item.text_uthmani}</div>;
      })}
    </div>
  );
};

export default QuranSegmentDetails;
