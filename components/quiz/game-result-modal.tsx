import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import useQuizStore from '@/stores/quiz-store';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';

const GameResultModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { questions, selectedAnswers = [] } = useQuizStore();
  const correctAnswers = questions.filter((q, i) => selectedAnswers[i] === q.right_answer).length;
  const score = Math.round((correctAnswers / questions.length) * 100);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="flex h-[90vh] max-h-[800px] w-[95vw] max-w-3xl flex-col rounded-xl p-1 sm:p-4">
        <AlertDialogHeader className=" pb-0 sm:p-0">
          <AlertDialogTitle className="text-center text-xl font-semibold sm:text-2xl">
            Quiz Results
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-1 flex-col space-y-3  overflow-hidden p-3 sm:p-0 md:p-6 ">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-primary text-lg font-bold sm:text-xl">{score}%</div>
            <Progress value={score} className="h-4 w-1/2" />
          </div>

          <AlertDialogDescription className="text-muted-foreground text-center text-sm sm:text-base">
            You answered {correctAnswers} out of {questions.length} questions correctly.
          </AlertDialogDescription>

          <ScrollArea className="flex-1 rounded-md border px-2 text-sm md:px-4 md:pb-0 md:text-base">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index] || 'No answer';
              const isCorrect = userAnswer === question.right_answer;

              return (
                <div key={question.id} className="py-4 last:mb-0">
                  <div className="flex items-start space-x-2">
                    <div className={`mt-1 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {isCorrect ? (
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 " />
                      ) : (
                        <XCircle className=" h-4 w-4 md:h-5 md:w-5" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {index + 1}. {question.text}
                      </h3>

                      <div className="mt-2 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Your answer:</span>
                          <span className={isCorrect ? 'text-green-500' : 'text-red-500'}>
                            {userAnswer}
                          </span>
                        </div>

                        {!isCorrect && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Correct answer:</span>
                            <span className="text-green-600">{question.right_answer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollArea>

          <div className="flex justify-end">
            <Button onClick={onClose} className="flex items-center space-x-2 rounded-full">
              <span>Back to Dashboard</span>
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GameResultModal;
