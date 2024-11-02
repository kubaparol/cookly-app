'use client';

import { useUser } from '@clerk/nextjs';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import UserPasswordForm, { UserPasswordFormValues } from '../forms/UserPasswordForm';
import { UserPasswordFormSkeleton } from '../shared/skeletons';

export default function UserPasswordContainer() {
  const { user, isLoaded } = useUser();

  const userPasswordHandler = useCallback(async (values: UserPasswordFormValues) => {
    try {
      await user?.updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      toast.success('User password updated successfully');
    } catch (error) {
      toast.error('Failed to update user password');
    }

    return;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Password</CardTitle>
      </CardHeader>

      <CardContent>
        {!isLoaded ? (
          <UserPasswordFormSkeleton />
        ) : (
          <UserPasswordForm onFormSubmit={userPasswordHandler} />
        )}
      </CardContent>
    </Card>
  );
}
