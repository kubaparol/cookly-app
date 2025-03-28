'use client';

import { useUser } from '@clerk/nextjs';
import { useCallback } from 'react';

import UserPasswordForm, { UserPasswordFormValues } from '@/components/forms/UserPasswordForm';
import { UserPasswordFormSkeleton } from '@/components/shared/skeletons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserPasswordWrapper() {
  const { user, isLoaded } = useUser();

  const userPasswordHandler = useCallback(
    async (values: UserPasswordFormValues) => {
      await user?.updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
    },
    [user],
  );

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
