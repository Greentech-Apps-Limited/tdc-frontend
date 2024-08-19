import * as React from 'react';
import { cn } from '@/lib/utils';

type SmallCardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const SmallCard = React.forwardRef<HTMLDivElement, SmallCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          className,
          'w-max cursor-pointer rounded-xl border border-neutral-200 px-3 py-1 text-sm font-semibold text-neutral-950 hover:bg-neutral-100'
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SmallCard.displayName = 'SmallCard';

export default SmallCard;
