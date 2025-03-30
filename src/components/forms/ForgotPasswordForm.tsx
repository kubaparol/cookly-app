'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ProjectUrls } from '@/constants';

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface ForgotPasswordFormProps {
  onFormSubmit: (values: ForgotPasswordFormValues) => void;
}

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordFormSchema>;

export default function ForgotPasswordForm({ onFormSubmit }: ForgotPasswordFormProps) {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot password?</CardTitle>
        <CardDescription>Enter your email to reset your password</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {form.formState.isSubmitting ? 'Sending...' : 'Send reset link'}
            </Button>

            <div className="text-center text-sm">
              Remember your password?{' '}
              <Link href={ProjectUrls.signIn} className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
