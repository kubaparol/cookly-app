import { Metadata } from 'next';

import SignInWrapper from '@/components/modules/auth/SignInWrapper';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Page() {
  return <SignInWrapper />;
}
