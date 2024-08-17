const SurahDetailsLayout = ({ children, ...props }: Readonly<{ children: React.ReactNode }>) => {
  console.log(props);
  return <section>{children}</section>;
};

export default SurahDetailsLayout;
