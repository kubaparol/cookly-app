import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { ProjectUrls } from '@/constants';

import SignInWrapper from '@/components/modules/auth/SignInWrapper';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default async function Page() {
  const user = await currentUser();

  if (user) {
    redirect(ProjectUrls.dashboard);
  }

  return <SignInWrapper />;
}
