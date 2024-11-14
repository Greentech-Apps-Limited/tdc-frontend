export type PlayerData = {
    account: {
        name: string;
        url: string;
    };
    points: number;
    quiz_attempted: number;
    rank: number;
    ranking_group: number;
}

export type PlayerResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PlayerData[];
}

export type UserRankData = {
    account: {
        name: string;
        url: string;
    };
    points: number;
    quiz_attempted: number;
    rank: number;
    ranking_group: number;
}

export type LeaderboardEntry = {
    rank: number;
    name: string;
    points: number;
    isCurrentUser: boolean;
}
