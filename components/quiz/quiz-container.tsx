type QuizContainerProps = {
  children: React.ReactNode;
};

const QuizContainer = ({ children }: QuizContainerProps) => {
  return <div className="m-6 mx-auto space-y-8 md:max-w-md">{children}</div>;
};

export default QuizContainer;
