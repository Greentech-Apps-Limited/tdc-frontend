import { cn } from '@/lib/utils/common-utils';
import { cloneElement } from 'react';

type IconComponentProps = {
  icon: JSX.Element;
  className?: string;
};

const IconComponent = ({ icon, className }: IconComponentProps) => {
  const iconClassName = cn(className, 'text-2xl');
  return cloneElement(icon, { className: iconClassName });
};

export default IconComponent;
