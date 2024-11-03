'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ClerkError } from '@/types';

import { PasswordInput } from '../base/PasswordInput';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

interface UserPasswordFormProps {
  onFormSubmit: (values: UserPasswordFormValues) => Promise<void>;
}

export const UserPasswordFormSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(1, 'New password name is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type UserPasswordFormValues = z.infer<typeof UserPasswordFormSchema>;

export default function UserPasswordForm(props: UserPasswordFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<UserPasswordFormValues>({
    resolver: zodResolver(UserPasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const submitHandler = async (values: UserPasswordFormValues) => {
    try {
      await onFormSubmit(values);

      toast.success('User password updated successfully');
      form.reset();
    } catch (error) {
      const message = (error as ClerkError).errors[0].message;

      toast.error(message);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="grid gap-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Current Password</FormLabel>

                <FormControl className="bg-white">
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>New Password</FormLabel>

                <FormControl className="bg-white">
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-fit">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {form.formState.isSubmitting ? 'Submitting...' : 'Save'}
        </Button>
      </form>
    </Form>
  );
}
