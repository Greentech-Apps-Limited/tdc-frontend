'use client';
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { QuranMeta } from '@/lib/types/quran-meta-types';
import SurahRowView from './surah-view/surah-row-view';

type TabsValue = 'surah' | 'page' | 'juz' | 'hizb' | 'ruku';

type SurahListViewProps = {
  quranMeta: QuranMeta;
};

const SurahListView = ({ quranMeta }: SurahListViewProps) => {
  const [selectedTab, setSelectedTab] = useState<TabsValue>('surah');
  console.log(quranMeta, selectedTab);
  const handleTabChange = (value: string): void => {
    setSelectedTab(value as TabsValue);
  };

  // const renderTable = () => {
  //   switch (selectedTab) {
  //     case 'applicants':
  //       return applicants && <DataTable data={applicants} columns={studentTableColumns} />;
  //     case 'current':
  //     case 'unverified':
  //     case 'alumni':
  //       return studentList && <DataTable data={studentList} columns={studentTableColumns} />;
  //     default:
  //       return null;
  //   }
  // };
  return (
    <section className="space-y-6">
      <Tabs defaultValue="surah" className="w-[400px]" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="surah">Surah</TabsTrigger>
          <TabsTrigger value="page">Page</TabsTrigger>
          <TabsTrigger value="juz">Juz</TabsTrigger>
          <TabsTrigger value="hizb">Hizb</TabsTrigger>
          <TabsTrigger value="ruku">Ruku</TabsTrigger>
        </TabsList>
      </Tabs>
      {/* <div className="mt-6"> {renderTable()}</div> */}
      <div>
        <SurahRowView />
      </div>
    </section>
  );
};

export default SurahListView;
