import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface VerifyFormProps {
  length?: number;
  isResending?: boolean;
  onFormSubmit: (values: VerifyFormValues) => void;
  onResendCode?: () => void;
}

const createVerifyFormSchema = (length: number) => {
  return z.object({
    code: z.string().length(length, { message: `Verification code must be ${length} characters` }),
  });
};

export interface VerifyFormValues {
  code: string;
}

export default function VerifyForm({
  length = 6,
  isResending,
  onFormSubmit,
  onResendCode,
}: VerifyFormProps) {
  const VerifyFormSchema = createVerifyFormSchema(length);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(VerifyFormSchema),
    defaultValues: {
      code: '',
    },
  });

  const handleValueChange = (value: string) => {
    form.setValue('code', value);

    if (value.length === length) {
      form.handleSubmit(onFormSubmit)();
    }
  };

  const handleResendCode = () => {
    if (onResendCode) {
      onResendCode();
      setCountdown(30);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Verify your email</h2>
        <p className="text-sm text-muted-foreground">
          Enter the verification code sent to your email
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
          <InputOTP
            maxLength={length}
            value={form.watch('code')}
            onChange={handleValueChange}
            disabled={isSubmitting}>
            <InputOTPGroup className="mx-auto">
              {Array.from({ length }).map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <Button
            type="submit"
            className="w-full"
            disabled={form.watch('code').length !== length || isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Verifying...' : 'Verify'}
          </Button>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              type="button"
              className="text-sm text-muted-foreground"
              onClick={handleResendCode}
              disabled={countdown > 0}>
              {isResending ? (
                'Resending...'
              ) : (
                <>Didn't receive the code? {countdown > 0 ? `Resend (${countdown}s)` : 'Resend'}</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
