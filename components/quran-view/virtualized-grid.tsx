'use client';
import React, { forwardRef, CSSProperties, PropsWithChildren } from 'react';

interface ListComponentProps extends PropsWithChildren {
  style?: CSSProperties;
  className?: string;
}

const ListComponent = forwardRef<HTMLDivElement, ListComponentProps>(
  ({ style, children, className }, ref) => (
    <div
      ref={ref}
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className || ''}`}
      style={style}
    >
      {children}
    </div>
  )
);
ListComponent.displayName = 'VirtuosoList';

interface ItemComponentProps extends PropsWithChildren {
  'data-index'?: number;
  style?: CSSProperties;
  className?: string;
}

const ItemComponent = ({ children, className, style, ...props }: ItemComponentProps) => {
  return (
    <div className={`box-border w-full  ${className || ''}`} style={style} {...props}>
      {children}
    </div>
  );
};

ItemComponent.displayName = 'VirtuosoItem';

export const GridComponents = {
  List: ListComponent,
  Item: ItemComponent,
};
