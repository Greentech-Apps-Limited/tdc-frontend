'use client';

import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import QuranDetailsSidebar from './quran-view/quran-details-sidebar';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { useParams, usePathname } from 'next/navigation';
import SidebarBrandLogo from './sidebar-brand-logo';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import { useTranslations } from 'next-intl';
import { useNumberTranslation } from '@/hooks/use-number-translation';
import { ArrowRightIcon } from '@/icons';

const ScrollHeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const params = useParams<{ quranSegment: QuranSegment; segmentId: string; locale: string }>();
  const pathname = usePathname();
  const [showCondensedHeader, setShowCondensedHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const MOBILE_BREAKPOINT = 767;
  const t = useTranslations('Views');
  const translateNumber = useNumberTranslation();

  const getSegmentTitle = (segmentType: QuranSegment, segmentId: string): string => {
    if (segmentType === 'surah') {
      const surah = SURAH_EN.find(s => s.id === parseInt(segmentId));
      return surah ? surah.transliteration : '';
    }

    const titles: Record<QuranSegment, string> = {
      surah: '',
      page: t('page'),
      juz: t('juz'),
      hizb: t('hizb'),
      ruku: t('ruku'),
    };

    return `${titles[segmentType]} ${translateNumber(parseInt(segmentId))}`;
  };

  const isQuranSegmentRoute = (pathname: string): boolean => {
    const pathsToCheck = ['surah', 'page', 'juz', 'hizb', 'ruku'];
    return pathsToCheck.some(path => pathname.includes(`/${path}/`));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 0) {
          setShowCondensedHeader(true);
        } else {
          setShowCondensedHeader(false);
        }
        setLastScrollY(currentScrollY);
      } else {
        setShowCondensedHeader(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setShowCondensedHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY]);

  return (
    <>
      {isQuranSegmentRoute(pathname) && (
        <div
          className={`fixed left-0 right-0 top-0 z-50 transform border-b border-neutral-200 bg-gradient-to-b from-neutral to-neutral shadow transition-all duration-300 ease-in-out md:hidden ${
            showCondensedHeader ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <div className="m-2 flex w-64 items-center justify-between gap-2 rounded-full bg-neutral-100 px-3 py-2">
                <h1 className="font-hidayatullah_demo text-lg font-semibold">
                  {getSegmentTitle(params.quranSegment, params.segmentId)}
                </h1>
                <ArrowRightIcon className="text-2xl" />
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="flex h-full w-64 flex-col p-0">
              <SheetHeader>
                <SheetTitle className="sr-only">Sidebar</SheetTitle>
                <SheetDescription className="sr-only">Quran details page sidebar</SheetDescription>
              </SheetHeader>
              <div className="h-16">
                <SidebarBrandLogo isMinimized={false} />
              </div>
              <QuranDetailsSidebar listType={params.quranSegment} />
            </SheetContent>
          </Sheet>
        </div>
      )}
      <div
        className={`fixed left-0 right-0 top-0 z-40 ${
          showCondensedHeader ? '-translate-y-full md:translate-y-0' : 'translate-y-0'
        } transition-transform duration-300 ease-in-out`}
      >
        {children}
      </div>
      <div className="h-16" />
    </>
  );
};

export default ScrollHeaderWrapper;
