'use client';

import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { ProjectUrls } from '@/constants';

import ForgotPasswordForm, {
  ForgotPasswordFormValues,
} from '@/components/forms/ForgotPasswordForm';
import ForgotPasswordVerificationForm, {
  ForgotPasswordVerificationFormValues,
} from '@/components/forms/ForgotPasswordVerificationForm';

import { ClerkError } from '@/types';

export default function ForgotPasswordWrapper() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [step, setStep] = useState<'idle' | 'first_factor' | 'second_factor'>('idle');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [isResending, setIsResending] = useState(false);

  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    if (!isLoaded) return;

    setEmailAddress(values.email);

    try {
      const result = await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: values.email,
      });

      if (result.status === 'needs_first_factor') {
        setStep('first_factor');
      }
    } catch (error) {
      const message = (error as ClerkError).errors[0].message;

      toast.error(message);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;

    setIsResending(true);

    try {
      await handleForgotPassword({ email: emailAddress });
    } catch (error) {
      const message = (error as ClerkError).errors[0].message;

      toast.error(message);
    } finally {
      setIsResending(false);
    }
  };

  const handleForgotPasswordVerification = async (values: ForgotPasswordVerificationFormValues) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: values.code,
        password: values.password,
      });

      if (result.status === 'needs_second_factor') {
        setStep('second_factor');
      }

      if (result.status === 'complete') {
        setActive({ session: result.createdSessionId });
        toast.success('Password reset successful');

        router.push(ProjectUrls.dashboard);
      }
    } catch (error) {
      const message = (error as ClerkError).errors[0].message;

      toast.error(message);
    }
  };

  return (
    <>
      {step === 'idle' && <ForgotPasswordForm onFormSubmit={handleForgotPassword} />}

      {step === 'first_factor' && (
        <ForgotPasswordVerificationForm
          onFormSubmit={handleForgotPasswordVerification}
          onResendCode={handleResendCode}
          isResending={isResending}
        />
      )}

      {step === 'second_factor' && (
        <p>
          2FA is required, but this UI does not handle that yet. Please try again later or contact
          with support.
        </p>
      )}
    </>
  );
}
