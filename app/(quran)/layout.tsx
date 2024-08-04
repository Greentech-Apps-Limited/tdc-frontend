const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section>
      <div>sidebar</div>
      <div>
        other
        {children}
      </div>
    </section>
  );
};

export default HomeLayout;
