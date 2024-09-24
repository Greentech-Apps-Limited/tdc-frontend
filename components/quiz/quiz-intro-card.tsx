import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StartQuizButton = () => (
  <Button className="w-full bg-brown-600 text-white hover:bg-brown-500 rounded-full">Play Now</Button>
);

const ViewLeaderBoardButton = () => (
  <Button className="w-full rounded-full" variant="outline">
    View LeaderBoard
  </Button>
);

const QuizIntroCard = () => {
  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="font-hidayatullah_demo text-3xl font-bold">Quranic Quiz</CardTitle>
        <CardDescription className="text-base">
          Embark on a journey of Quranic discovery! Test your knowledge with our quiz and deepen
          your understanding of the divine verbs found in the Quran.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex max-w-96  space-x-4">
        <StartQuizButton />
        <ViewLeaderBoardButton />
      </CardContent>
    </Card>
  );
};

export default QuizIntroCard;
