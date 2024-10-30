'use client';

import { SearchParamsType } from '@/lib/types/search-params-type';
import { scrollToElement } from '@/lib/utils/common-utils';
import { useEffect, useRef, useState } from 'react';

type QuranDetailsWrapperProps = {
  children: React.ReactNode;
  searchParams: SearchParamsType;
};

const QuranDetailsWrapper = ({ children, searchParams }: QuranDetailsWrapperProps) => {
  const observerRef = useRef<MutationObserver | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const scrollToVerse = () => {
      if (searchParams.verse) {
        const [start, end] = searchParams.verse.split('-');
        const formattedVerse = end ? `${start}:${end}` : `${start}:${start}`;
        const scrollContainer = document.getElementById('scroll-container');
        const highlightedElement = document.querySelector(
          `[data-verse="${formattedVerse}"]`
        ) as HTMLElement;

        if (scrollContainer && highlightedElement) {
          document.body.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
          scrollToElement({
            container: scrollContainer,
            element: highlightedElement,
            offset: 0.01,
          });
          highlightedElement.style.transition = 'background-color 0.5s ease-in-out';
          highlightedElement.style.backgroundColor = '#F9F5F1';
          setTimeout(() => {
            highlightedElement.style.backgroundColor = '';
          }, 2000);

          // Disconnect the observer once we've found and scrolled to the element
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      }
    };

    observerRef.current = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          if (
            addedNodes.some(
              node =>
                node instanceof Element &&
                node.querySelector(`[data-verse="${searchParams.verse}"]`)
            )
          ) {
            scrollToVerse();
            break;
          }
        }
      }
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    scrollToVerse();

    const retryTimeout = setTimeout(scrollToVerse, 500);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(retryTimeout);
    };
  }, [searchParams.verse, isLoaded]);

  return <>{children}</>;
};

export default QuranDetailsWrapper;
