'use client';

import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface UserDetailsFormProps {
  defaultValues?: UserDetailsFormValues;
}

export const UserDetailsFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export type UserDetailsFormValues = z.infer<typeof UserDetailsFormSchema>;

export default function UserDetailsForm(props: UserDetailsFormProps) {
  const { defaultValues } = props;

  const { user } = useUser();

  const form = useForm<UserDetailsFormValues>({
    resolver: zodResolver(UserDetailsFormSchema),
    defaultValues: defaultValues || {
      firstName: '',
      lastName: '',
    },
  });

  const submitHandler = async (values: UserDetailsFormValues) => {
    await user?.update({
      firstName: values.firstName,
      lastName: values.lastName,
    });

    toast.success('User details updated successfully');
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
