import { HomeIconFill } from '@/icons';
import React from 'react';
import { Button } from './ui/button';

const ReadingGoal = () => {
  return (
    <div className="flex h-full flex-grow flex-col justify-between gap-4 rounded-xl bg-neutral-50 p-3">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold">20m</h2>
          <p className="text-xs text-neutral-700">out of 30m reading goal</p>
        </div>
        <HomeIconFill className="h-6 w-6 text-neutral-300" />
      </div>
      <Button className="w-max rounded-full px-3 py-2 text-sm" variant="outline">
        Continue
      </Button>
    </div>
  );
};

export default ReadingGoal;
