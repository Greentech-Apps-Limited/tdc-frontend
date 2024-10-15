import LeaderboardMain from '@/components/leaderboard/leaderboard-main';
import { unstable_setRequestLocale } from 'next-intl/server';

const Leaderboard = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return <LeaderboardMain />;
};

export default Leaderboard;
