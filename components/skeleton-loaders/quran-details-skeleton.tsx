import SurahDisplayCardSkeleton from './surah-display-card-skeleton';
import VerseDisplayCardSkeleton from './verse-display-card-skeleton';

const QuranDetailsSkeleton = () => {
  return (
    <div>
      <SurahDisplayCardSkeleton>
        {[...Array(10)].map((_, index) => (
          <VerseDisplayCardSkeleton key={index} />
        ))}
      </SurahDisplayCardSkeleton>
    </div>
  );
};

export default QuranDetailsSkeleton;
