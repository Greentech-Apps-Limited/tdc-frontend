'use client';
import { SearchParamsType } from '@/lib/types/search-params-type';
import { scrollToElement } from '@/lib/utils/common-utils';
import { useEffect, useRef } from 'react';

type QuranDetailsWrapperProps = {
  children: React.ReactNode;
  searchParams: SearchParamsType;
};

const QuranDetailsWrapper = ({ children, searchParams }: QuranDetailsWrapperProps) => {
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (searchParams.verse) {
      const [start, end] = searchParams.verse.split('-');
      const formattedVerse = end ? `${start}:${end}` : `${start}:${start}`;

      const scrollToVerse = () => {
        const scrollContainer = document.getElementById('scroll-container');
        const highlightedElement = document.querySelector(
          `[data-verse="${formattedVerse}"]`
        ) as HTMLElement;

        if (scrollContainer && highlightedElement) {
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
      };

      // Set up the mutation observer
      observerRef.current = new MutationObserver(mutations => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            const addedNodes = Array.from(mutation.addedNodes);
            if (
              addedNodes.some(
                node =>
                  node instanceof Element && node.querySelector(`[data-verse="${formattedVerse}"]`)
              )
            ) {
              scrollToVerse();
              break;
            }
          }
        }
      });

      // Start observing the document body for changes
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
      });

      scrollToVerse();
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [searchParams.verse]);

  return <>{children}</>;
};

export default QuranDetailsWrapper;
