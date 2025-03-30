'use client';

import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ProjectUrls } from '@/constants';

import SignInForm, { SignInFormValues } from '@/components/forms/SignInForm';

import { ClerkError } from '@/types';

export default function SignInWrapper() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const handleSignIn = async (values: SignInFormValues) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === 'complete') {
        setActive({ session: result.createdSessionId });

        toast.success('You have been logged in successfully');

        router.push(ProjectUrls.dashboard);
      }
    } catch (error) {
      const message = (error as ClerkError).errors[0].long_message;

      toast.error(message);
    }
  };

  return <SignInForm onFormSubmit={handleSignIn} />;
}
