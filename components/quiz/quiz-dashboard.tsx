'use client';

import QuizIntroCard from './quiz-intro-card';
import { Scoreboard } from './score-board';

const userScoreboard = {
  quizzesAttempted: 4,
  score: 8340,
  leaderBoardPosition: 53,
};

const QuizDashboard = () => {
  return (
    <section className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <QuizIntroCard />
      </div>
      <div className="col-span-1">
        <Scoreboard {...userScoreboard} />
      </div>
    </section>
  );
};

export default QuizDashboard;
