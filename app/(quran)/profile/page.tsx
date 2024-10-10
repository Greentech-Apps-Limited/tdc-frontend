import StatisticsPanel from '@/components/profile/statistics-panel';

const ProfilePage = () => {
  return (
    <section className="h-full w-full space-y-6 rounded-4xl border border-neutral-300 bg-neutral p-6">
      <h1 className="font-hidayatullah_demo text-3xl font-bold">Profile</h1>
      <StatisticsPanel />
    </section>
  );
};

export default ProfilePage;
