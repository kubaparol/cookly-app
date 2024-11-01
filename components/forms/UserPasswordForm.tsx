'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface UserPasswordFormProps {}

export const UserPasswordFormSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(1, 'New password name is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type UserPasswordFormValues = z.infer<typeof UserPasswordFormSchema>;

export default function UserPasswordForm(props: UserPasswordFormProps) {
  const {} = props;

  const form = useForm<UserPasswordFormValues>({
    resolver: zodResolver(UserPasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const submitHandler = (values: UserPasswordFormValues) => {
    console.log(values);
  };

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
                  <Input placeholder="********" {...field} />
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
                  <Input placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-fit">
          Save
        </Button>
      </form>
    </Form>
  );
}
