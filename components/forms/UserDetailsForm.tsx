'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ClerkError } from '@/types';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface UserDetailsFormProps {
  defaultValues?: UserDetailsFormValues;
  onFormSubmit: (values: UserDetailsFormValues) => Promise<void>;
}

export const UserDetailsFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(256, 'First name must be less than 256 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(256, 'Last name must be less than 256 characters'),
});

export type UserDetailsFormValues = z.infer<typeof UserDetailsFormSchema>;

export default function UserDetailsForm(props: UserDetailsFormProps) {
  const { defaultValues, onFormSubmit } = props;

  const form = useForm<UserDetailsFormValues>({
    resolver: zodResolver(UserDetailsFormSchema),
    defaultValues: defaultValues || {
      firstName: '',
      lastName: '',
    },
  });

  const submitHandler = async (values: UserDetailsFormValues) => {
    try {
      await onFormSubmit(values);

      toast.success('User details updated successfully');
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
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>

                <FormControl className="bg-white">
                  <Input placeholder="e.g., John" disabled={isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>

                <FormControl className="bg-white">
                  <Input placeholder="e.g., Doe" disabled={isSubmitting} {...field} />
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
