import { Surah } from '@/lib/types/quran-meta-types';
import { TranslationItem } from '@/lib/types/surah-translation-type';
import { generateVerseKeys } from '@/lib/utils/verse-utils';
import { Suspense } from 'react';
import SurahDetailsMain from './surah-details-main';

type SurahContentProviderProps = {
  surahs: Surah[];
  translationInfos: TranslationItem[];
  surahId: string;
};

const SurahContentProvider = ({ surahs, surahId, translationInfos }: SurahContentProviderProps) => {
  const surah = surahs.find(surah => surah.id === parseInt(surahId));

  if (!surah) {
    return <div className="p-4 text-center">Surah with id {surahId} not found</div>;
  }
  const verseKeys = generateVerseKeys(surah.id, surah.verses);
  const totalVerseCount = surah.verses;

  return (
    <div>
      <Suspense>
        <SurahDetailsMain
          surahs={surahs}
          surahId={surahId}
          translationInfos={translationInfos}
          verseLookup={verseKeys}
          totalVerseCount={totalVerseCount}
        />
      </Suspense>
    </div>
  );
};

export default SurahContentProvider;
