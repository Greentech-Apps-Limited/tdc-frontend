import { cn } from '@/lib/utils/common-utils';
import { cloneElement } from 'react';
import * as SurahNames from '../../icons/surah-names';

type SurahNameIconComponentProps = {
  surahNumber: number;
  className?: string;
} & Omit<React.SVGProps<SVGSVGElement>, 'className'>;

const SurahNameIconComponent = ({
  surahNumber,
  className,
  ...props
}: SurahNameIconComponentProps) => {
  const iconClassName = cn(className, 'text-2xl');

  const formattedNumber = surahNumber.toString().padStart(1, '0');
  const iconKey = `SurahName${formattedNumber}` as keyof typeof SurahNames;

  const SurahIcon = SurahNames[iconKey];

  if (!SurahIcon) {
    return null;
  }

  const icon = <SurahIcon {...props} />;

  return cloneElement(icon, {
    className: iconClassName,
    ...props,
  });
};

export default SurahNameIconComponent;
