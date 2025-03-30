'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  ACCEPTED_CLERK_IMAGE_TYPES,
  MAX_CLERK_FILE_SIZE,
  MAX_CLERK_FILE_SIZE_MB,
} from '@/constants';

import { ClerkError } from '@/types';

import ProfilePictureUploader from '../base/ProfilePictureUploader';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface UserDetailsFormProps {
  defaultValues?: UserDetailsFormValues;
  onFormSubmit: (values: UserDetailsFormValues) => Promise<void>;
}

const ACCEPTED_EXTENSIONS = ACCEPTED_CLERK_IMAGE_TYPES.map((type) => type.split('/')[1]);

export const UserDetailsFormSchema = z.object({
  profileImage: z
    .any()
    .optional()
    .refine(
      (file) => (!file || typeof file === 'string' ? true : file.size <= MAX_CLERK_FILE_SIZE),
      `Max file size is ${MAX_CLERK_FILE_SIZE_MB}MB`,
    )
    .refine(
      (file) =>
        !file || typeof file === 'string' ? true : ACCEPTED_CLERK_IMAGE_TYPES.includes(file.type),
      `.${ACCEPTED_EXTENSIONS.join(', .')} files are accepted`,
    ),
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
      profileImage: null,
      firstName: '',
      lastName: '',
    },
  });

  const submitHandler = async (values: UserDetailsFormValues) => {
    try {
      await onFormSubmit(values);

      toast.success('User details updated successfully');
    } catch (error) {
      const message = (error as ClerkError).errors[0].long_message;

      toast.error(message);
    }
  };

  const changeProfilePictureHandler = (file: File | null) => {
    form.setValue('profileImage', file);
    form.trigger('profileImage');
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="grid gap-8">
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>

              <FormControl>
                <ProfilePictureUploader
                  onFieldChange={changeProfilePictureHandler}
                  value={field.value}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
