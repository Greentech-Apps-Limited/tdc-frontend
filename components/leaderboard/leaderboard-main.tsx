import { LeaderboardData } from '@/lib/types/leaderboard';
import { DataTable } from './data-table';
import { leaderboardTableColumns } from './leaderboard-table-columns';

const LeaderboardMain = () => {
  // Dummy leaderboard data
  const leaderboardData: LeaderboardData = [
    { rank: 1, name: 'Alex Johnson', points: 1200, change: 'up' },
    { rank: 2, name: 'Sam Lee', points: 1180 },
    { rank: 3, name: 'Taylor Swift', points: 1150, change: 'down' },
    { rank: 4, name: 'Chris Evans', points: 1120 },
    { rank: 5, name: 'Emma Watson', points: 1100, change: 'up' },
    { rank: 10, name: 'Robert Downey Jr.', points: 1000 },
    { rank: 15, name: 'Scarlett Johansson', points: 950, change: 'down' },
    { rank: 20, name: 'Tom Holland', points: 900 },
    { rank: 25, name: 'Elizabeth Olsen', points: 880, change: 'up' },
    { rank: 30, name: 'Chris Hemsworth', points: 860 },
    { rank: 35, name: 'Mark Ruffalo', points: 840, change: 'down' },
    { rank: 40, name: 'Jeremy Renner', points: 820 },
    { rank: 45, name: 'Paul Rudd', points: 800, change: 'up' },
    { rank: 50, name: 'Benedict Cumberbatch', points: 790 },
    { rank: 51, name: 'Michael Knight', points: 780 },
    { rank: 52, name: 'Murdock', points: 780 },
    { rank: 53, name: 'Mike Torello', points: 779 },
    { rank: 54, name: 'Kate Tanner', points: 778, change: 'up' },
    { rank: 55, name: 'Jonathan Higgins', points: 775 },
    { rank: 56, name: 'Murdock', points: 771 },
    { rank: 57, name: 'April Curtis', points: 770 },
    { rank: 58, name: 'Michael Knight', points: 770 },
    { rank: 59, name: 'Willie Tanner', points: 768 },
    { rank: 60, name: 'Tony Danza', points: 764 },
    { rank: 65, name: 'Don Johnson', points: 750, change: 'down' },
    { rank: 70, name: 'Tom Selleck', points: 740 },
    { rank: 75, name: 'Angela Lansbury', points: 730, change: 'up' },
    { rank: 80, name: 'David Hasselhoff', points: 720 },
    { rank: 85, name: 'Telly Savalas', points: 710, change: 'down' },
    { rank: 90, name: 'Erik Estrada', points: 700 },
    { rank: 95, name: 'Linda Evans', points: 690, change: 'up' },
    { rank: 100, name: 'Larry Hagman', points: 680 },
  ];
  return (
    <section className="h-full w-full space-y-2 rounded-4xl border border-neutral-300 bg-neutral p-6">
      <p>Quiz</p>
      <h1 className="font-hidayatullah_demo text-3xl font-bold">Leaderboard</h1>
      <div className="mt-6">
        <DataTable data={leaderboardData} columns={leaderboardTableColumns} />
      </div>
    </section>
  );
};

export default LeaderboardMain;
