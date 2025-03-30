'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { ProjectUrls } from '@/constants';

import RegistrationVerificationForm, {
  RegistrationVerificationFormValues,
} from '@/components/forms/RegistrationVerificationForm';
import SignUpForm, { SignUpFormValues } from '@/components/forms/SignUpForm';

import { ClerkError } from '@/types';

export default function SignUpWrapper() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  const [signUpStatus, setSignUpStatus] = useState<'idle' | 'verifying'>('idle');
  const [isResending, setIsResending] = useState(false);

  const handleSignUp = async (values: SignUpFormValues) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setSignUpStatus('verifying');
    } catch (error) {
      const message = (error as ClerkError).errors[0].long_message;

      toast.error(message);
    }
  };

  const handleVerify = async (values: RegistrationVerificationFormValues) => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.code,
      });

      if (completeSignUp.status !== 'complete') {
        toast.error(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === 'complete') {
        setActive({ session: completeSignUp.createdSessionId });

        toast.success('You have been signed up successfully');

        router.push(ProjectUrls.dashboard);
      }
    } catch (error) {
      const message = (error as ClerkError).errors[0].long_message;

      toast.error(message);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;

    setIsResending(true);

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
    } catch (error) {
      const message = (error as ClerkError).errors[0].long_message;

      toast.error(message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {signUpStatus === 'idle' && <SignUpForm onFormSubmit={handleSignUp} />}

      {signUpStatus === 'verifying' && (
        <RegistrationVerificationForm
          length={6}
          isResending={isResending}
          onFormSubmit={handleVerify}
          onResendCode={handleResendCode}
        />
      )}
    </>
  );
}
