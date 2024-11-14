import { getStaticMetadata } from '@/lib/metadata';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getStaticMetadata('leaderboard', locale);
}

const LeaderBoardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <section className="h-full w-full">{children}</section>;
};

export default LeaderBoardLayout;
