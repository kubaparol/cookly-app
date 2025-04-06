import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { ProjectUrls } from '@/constants';

import ForgotPasswordWrapper from '@/components/modules/auth/ForgotPasswordWrapper';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default async function Page() {
  const user = await currentUser();

  if (user) {
    redirect(ProjectUrls.dashboard);
  }

  return <ForgotPasswordWrapper />;
}
