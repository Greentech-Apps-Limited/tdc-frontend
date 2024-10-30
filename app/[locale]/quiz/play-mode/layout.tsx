import constructMetadata from '@/lib/metadata';

export const metadata = constructMetadata({
  title: 'Play Mode',
  description: 'Play Quranic Quiz',
});

const QuranicQuizPlayModeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <section className="h-screen w-screen">{children}</section>;
};

export default QuranicQuizPlayModeLayout;
