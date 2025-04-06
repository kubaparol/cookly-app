import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { ProjectUrls } from '@/constants';

import SignUpWrapper from '@/components/modules/auth/SignUpWrapper';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default async function Page() {
  const user = await currentUser();

  if (user) {
    redirect(ProjectUrls.dashboard);
  }

  return <SignUpWrapper />;
}
