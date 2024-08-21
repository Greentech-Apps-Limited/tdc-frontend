'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const LoadingProgressBar = () => {
  return (
    <>
      <ProgressBar height="4px" color="#85776A" options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default LoadingProgressBar;
