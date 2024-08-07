import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className="flex h-full w-full">
      <Sidebar />
      <div className="flex h-full w-full flex-col">
        <Header />
        <div className="h-full w-full flex-1 overflow-y-scroll p-6">
          <div className="mx-auto max-w-8xl">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default HomeLayout;
