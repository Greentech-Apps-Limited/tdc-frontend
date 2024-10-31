'use client';

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { QuranMeta } from '@/lib/types/quran-meta-types';
import SurahRowView from './surah-row-view';
import GenericView from './generic-view';
import { useTranslations } from 'next-intl';

type TabsValue = 'surah' | 'page' | 'juz' | 'hizb' | 'ruku';

type SurahViewProps = {
  quranMeta: QuranMeta;
};

const QuranTabView = ({ quranMeta }: SurahViewProps) => {
  const t = useTranslations('Views');
  const [selectedTab, setSelectedTab] = useState<TabsValue>('surah');

  const renderTable = () => {
    switch (selectedTab) {
      case 'surah':
        return <SurahRowView references={quranMeta.surahs} />;
      case 'page':
      case 'juz':
      case 'hizb':
      case 'ruku':
        return <GenericView quranMeta={quranMeta} type={selectedTab} />;
      default:
        return null;
    }
  };
  return (
    <section className="space-y-6">
      <Tabs
        defaultValue="surah"
        className="w-[400px]"
        onValueChange={(value: string): void => {
          setSelectedTab(value as TabsValue);
        }}
      >
        <TabsList>
          <TabsTrigger value="surah">{t('surah')}</TabsTrigger>
          <TabsTrigger value="page">{t('page')}</TabsTrigger>
          <TabsTrigger value="juz">{t('juz')}</TabsTrigger>
          <TabsTrigger value="hizb">{t('hizb')}</TabsTrigger>
          <TabsTrigger value="ruku">{t('ruku')}</TabsTrigger>
        </TabsList>
      </Tabs>
      <div>{renderTable()}</div>
    </section>
  );
};

export default QuranTabView;
