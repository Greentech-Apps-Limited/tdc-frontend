import React from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

const SurahListView = () => {
  return (
    <section>
      <div>
        <Tabs defaultValue="surah" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="surah">Surah</TabsTrigger>
            <TabsTrigger value="page">Page</TabsTrigger>
            <TabsTrigger value="juz">Juz</TabsTrigger>
            <TabsTrigger value="hizb">Hizb</TabsTrigger>
            <TabsTrigger value="ruku">Ruku</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
};

export default SurahListView;
