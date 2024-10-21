'use client';

import { useState } from 'react';
import QuizIntroCard from './quiz-intro-card';
import { Scoreboard } from './score-board';
import QuizLevelSelectionModal from './quiz-level-selection-modal';
import { useRouter } from '@/i18n/routing';

const userScoreboard = {
  quizzesAttempted: 4,
  score: 8340,
  leaderBoardPosition: 53,
};

const QuizDashboard = () => {
  const { push } = useRouter();
  const [showLevelModal, setShowLevelModal] = useState(false);

  return (
    <section className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <QuizIntroCard setShowLevelModal={setShowLevelModal} />
      </div>
      <div className="col-span-1">
        <Scoreboard {...userScoreboard} />
      </div>
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
