'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
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

  const form = useForm<UserDetailsFormValues>({
    resolver: zodResolver(UserDetailsFormSchema),
    defaultValues: defaultValues || {
      firstName: '',
      lastName: '',
    },
  });

  const submitHandler = (values: UserDetailsFormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="grid gap-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="bg-white">
                  <Input placeholder="e.g., John" {...field} />
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
                <FormControl className="bg-white">
                  <Input placeholder="e.g., Doe" {...field} />
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
