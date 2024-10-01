type ScoreboardProps = {
  quizzesAttempted: number;
  score: number;
  leaderBoardPosition: number;
};

export const Scoreboard = ({ quizzesAttempted, score, leaderBoardPosition }: ScoreboardProps) => {
  return (
    <section className="h-full space-y-6 rounded-4xl border border-neutral-300 bg-neutral p-4 shadow">
      <div>
        <h1 className="text-xl font-semibold">Scoreboard</h1>
      </div>
      <section>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-neutral-50 p-4">
            <p className="text-xl font-bold">{quizzesAttempted.toString().padStart(2, '0')}</p>
            <p className="text-sm text-neutral-700">Quizzes Attempted</p>
          </div>
          <div className="rounded-2xl bg-neutral-50 p-4">
            <p className="text-xl font-bold">{score}</p>
            <p className="text-sm text-neutral-700">Score on quizzes</p>
          </div>
          <div className="col-span-2 rounded-2xl bg-neutral-50 p-4">
            <p className="font-hidayatullah_demo text-3xl font-bold">{leaderBoardPosition}rd</p>
            <p className="text-sm text-neutral-700">on Leaderboard</p>
          </div>
        </div>
      </section>
    </section>
  );
};
