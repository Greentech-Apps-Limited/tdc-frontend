import SignInMain from '@/components/auth/signin-main';
import { unstable_setRequestLocale } from 'next-intl/server';
import React, { Suspense } from 'react';

const SignIn = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return (
    <div className="m-auto my-16 w-full max-w-md">
      <Suspense>
        <SignInMain />
      </Suspense>
    </div>
  );
};

export default SignIn;
