const QuranicQuizLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className="h-full w-full">
      <div className="m-6 max-w-8xl">{children}</div>
    </section>
  );
};

export default QuranicQuizLayout;
