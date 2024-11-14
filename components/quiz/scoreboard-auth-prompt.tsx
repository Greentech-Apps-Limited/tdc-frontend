import React from 'react';
import { Card } from '../ui/card';
import { ProfileIcon } from '@/icons';
import { useTranslations } from 'next-intl';

const ScoreboardAuthPrompt = () => {
  const t = useTranslations('Scoreboard');
  return (
    <Card className="w-full max-w-md rounded-2xl p-4 md:rounded-4xl md:p-8">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
          <ProfileIcon className="h-10 w-10 text-brown-600" />
        </div>
        <p className="text-muted-foreground text-center text-base">{t('authPrompt')}</p>
      </div>
    </Card>
  );
};

export default ScoreboardAuthPrompt;
