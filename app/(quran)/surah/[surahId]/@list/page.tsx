export const dynamic = 'force-static';

import QuranDetailsSidebar from '@/components/quran-view/quran-details-sidebar';
import { readData } from '@/lib/read-file';
import { QuranMeta } from '@/lib/types/quran-meta-types';
import React from 'react';

const SurahList = async () => {
  const quranMeta: QuranMeta = await readData<QuranMeta>('data/quran-meta.json');
  return <QuranDetailsSidebar quranMeta={quranMeta} listType="surah" />;
};

export default SurahList;
