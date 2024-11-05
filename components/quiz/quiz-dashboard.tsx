'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';
import ScoreboardSkeleton from '../skeleton-loaders/scoreboard-skeleton';
import { authorizedFetcher } from '@/services/api';
import { Scoreboard } from './score-board';
import ScoreboardAuthPrompt from './scoreboard-auth-prompt';
import QuizIntroCard from './quiz-intro-card';
import QuizLevelSelectionModal from './quiz-level-selection-modal';
import { PlayerData } from '@/lib/types/user-profile-types';

const QuizDashboard = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const [showLevelModal, setShowLevelModal] = useState(false);

  const { data: playerData, isLoading } = useSWR<PlayerData>(
    status === 'authenticated' ? ['/quiz/players/me/', session?.accessToken] : null,
    ([url, token]) => authorizedFetcher<PlayerData>(url, token as string)
  );

  const userScoreboard = {
    quizzesAttempted: playerData?.ranking_group ?? 0,
    score: playerData?.points ?? 0,
    leaderBoardPosition: playerData?.rank ?? 0,
  };

  const renderScoreboard = () => {
    if (status === 'loading' || isLoading) {
      return <ScoreboardSkeleton />;
    }

    if (status === 'authenticated') {
      return <Scoreboard {...userScoreboard} />;
    }

    if (status === 'unauthenticated') {
      return <ScoreboardAuthPrompt />;
    }

    return null;
  };

  return (
    <section className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <QuizIntroCard
          setShowLevelModal={setShowLevelModal}
          unauthenticated={status === 'unauthenticated'}
        />
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
