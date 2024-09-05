const QuranSegmentDetailsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode; list: React.ReactNode }>) => {
  return <section className="h-full w-full">{children}</section>;
};

export default QuranSegmentDetailsLayout;
