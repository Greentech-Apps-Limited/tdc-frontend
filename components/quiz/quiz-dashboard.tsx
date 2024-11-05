'use client';

import { useState } from 'react';
import QuizIntroCard from './quiz-intro-card';
import { Scoreboard } from './score-board';
import QuizLevelSelectionModal from './quiz-level-selection-modal';
import { useRouter } from '@/i18n/routing';
import { useSession } from 'next-auth/react';
import ScoreboardAuthPrompt from './scoreboard-auth-prompt';
import ScoreboardSkeleton from '../skeleton-loaders/scoreboard-skeleton';

const userScoreboard = {
  quizzesAttempted: 4,
  score: 8340,
  leaderBoardPosition: 53,
};

const QuizDashboard = () => {
  const { status } = useSession();
  const { push } = useRouter();
  const [showLevelModal, setShowLevelModal] = useState(false);

  const renderScoreboard = () => {
    switch (status) {
      case 'loading':
        return <ScoreboardSkeleton />;
      case 'authenticated':
        return <Scoreboard {...userScoreboard} />;
      case 'unauthenticated':
        return <ScoreboardAuthPrompt />;
      default:
        return null;
    }
  };
  return (
    <section className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <QuizIntroCard setShowLevelModal={setShowLevelModal} />
      </div>
      <div className="col-span-1">{renderScoreboard()}</div>
      {showLevelModal && (
        <QuizLevelSelectionModal
          onConfirm={() => {
            // TODO: Handle exit confirmation
            push('/quiz/play-mode');
          }}
          onCancel={() => setShowLevelModal(false)}
        />
      )}
    </section>
  );
};

export default QuizDashboard;
