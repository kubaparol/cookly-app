import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import { PasswordInput } from '../base/PasswordInput';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ForgotPasswordVerificationFormProps {
  length?: number;
  isResending?: boolean;
  onFormSubmit: (values: ForgotPasswordVerificationFormValues) => void;
  onResendCode?: () => void;
}

const createForgotPasswordVerificationFormSchema = (length: number) => {
  return z
    .object({
      code: z
        .string()
        .length(length, { message: `Verification code must be ${length} characters` }),
      password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });
};

export interface ForgotPasswordVerificationFormValues {
  code: string;
  password: string;
  confirmPassword: string;
}

export default function ForgotPasswordVerificationForm({
  length = 6,
  isResending,
  onFormSubmit,
  onResendCode,
}: ForgotPasswordVerificationFormProps) {
  const ForgotPasswordVerificationFormSchema = createForgotPasswordVerificationFormSchema(length);
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

  const form = useForm<ForgotPasswordVerificationFormValues>({
    resolver: zodResolver(ForgotPasswordVerificationFormSchema),
    defaultValues: {
      code: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleValueChange = (value: string) => {
    form.setValue('code', value);
  };

  const handleResendCode = () => {
    if (onResendCode) {
      onResendCode();
      setCountdown(30);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Reset your password</CardTitle>
        <CardDescription>
          Enter the verification code sent to your email and create a new password
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>

                  <FormControl>
                    <InputOTP
                      maxLength={length}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        handleValueChange(value);
                      }}
                      disabled={isSubmitting}>
                      <InputOTPGroup>
                        {Array.from({ length }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </Button>

            <div className="text-center">
              <Button
                variant="link"
                type="button"
                className="text-sm text-muted-foreground"
                onClick={handleResendCode}
                disabled={countdown > 0}>
                {isResending ? (
                  'Resending...'
                ) : (
                  <>
                    Didn&apos;t receive the code?{' '}
                    {countdown > 0 ? `Resend (${countdown}s)` : 'Resend'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
