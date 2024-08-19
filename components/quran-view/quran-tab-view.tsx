'use client';
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { QuranMeta } from '@/lib/types/quran-meta-types';
import SurahRowView from './surah-row-view';
import GenericView from './generic-view';

type TabsValue = 'surah' | 'page' | 'juz' | 'hizb' | 'ruku';

type SurahViewProps = {
  quranMeta: QuranMeta;
};

const QuranTabView = ({ quranMeta }: SurahViewProps) => {
  const [selectedTab, setSelectedTab] = useState<TabsValue>('surah');

  const renderTable = () => {
    switch (selectedTab) {
      case 'surah':
        return <SurahRowView references={quranMeta.surahs.references} />;
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
          <TabsTrigger value="surah">Surah</TabsTrigger>
          <TabsTrigger value="page">Page</TabsTrigger>
          <TabsTrigger value="juz">Juz</TabsTrigger>
          <TabsTrigger value="hizb">Hizb</TabsTrigger>
          <TabsTrigger value="ruku">Ruku</TabsTrigger>
        </TabsList>
      </Tabs>
      <div>{renderTable()}</div>
    </section>
  );
};

export default QuranTabView;
