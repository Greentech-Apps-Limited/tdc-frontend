type QuizContainerProps = {
  children: React.ReactNode;
};

const QuizContainer = ({ children }: QuizContainerProps) => {
  return <div className="m-6 mx-auto max-w-md space-y-8">{children}</div>;
};

export default QuizContainer;
