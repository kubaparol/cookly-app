import { Metadata } from 'next';

import SignUpWrapper from '@/components/modules/auth/SignUpWrapper';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function Page() {
  return <SignUpWrapper />;
}
