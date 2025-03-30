import { Metadata } from 'next';

import ForgotPasswordWrapper from '@/components/modules/auth/ForgotPasswordWrapper';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default function Page() {
  return <ForgotPasswordWrapper />;
}
