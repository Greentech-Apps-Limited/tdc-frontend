import { getStaticMetadata } from '@/lib/metadata';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getStaticMetadata('profile', locale);
}
const UserProfileLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className="h-full w-full overflow-y-scroll">
      <div className="m-6 max-w-8xl">{children}</div>
    </section>
  );
};

export default UserProfileLayout;
