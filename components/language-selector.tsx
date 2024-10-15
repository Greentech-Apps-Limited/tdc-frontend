'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useCallback, useEffect, useState } from 'react';

const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const pathSegments = pathname.split('/');
    if (pathSegments.length > 1) {
      const lang = pathSegments[1];
      if (lang === 'en' || lang === 'ms') {
        setCurrentLang(lang);
      }
    }
  }, [pathname]);

  const handleLanguageChange = useCallback(
    (newLang: string) => {
      const currentPathname = pathname;
      const segments = currentPathname.split('/');
      segments[1] = newLang; // Replace the language segment
      const newPathname = segments.join('/');

      router.replace(newPathname);
      setCurrentLang(newLang);
    },
    [pathname, router]
  );

  if (!isHydrated) {
    return <div className="h-[40px] w-[118px]" />;
  }

  return (
    <Select onValueChange={handleLanguageChange} value={currentLang}>
      <SelectTrigger className="w-[118px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ms">Malaysian</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
