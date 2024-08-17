const SurahDetailsLayout = ({
  children,
  list,
}: Readonly<{ children: React.ReactNode; list: React.ReactNode }>) => {
  return (
    <section className="flex h-full w-full">
      <aside className="h-full overflow-hidden">{list}</aside>
      <aside className="h-full w-full flex-1 overflow-y-scroll">{children}</aside>
    </section>
  );
};

export default SurahDetailsLayout;
