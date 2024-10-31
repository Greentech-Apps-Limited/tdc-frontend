
type LeaderboardEntry = {
    rank: number;
    name: string;
    points: number;
    change?: 'up' | 'down' | undefined;
};


type LeaderboardData = LeaderboardEntry[];

export type { LeaderboardEntry, LeaderboardData };