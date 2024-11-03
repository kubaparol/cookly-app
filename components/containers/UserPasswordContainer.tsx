'use client';

import { useUser } from '@clerk/nextjs';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ClerkError } from '@/types';

import UserPasswordForm, { UserPasswordFormValues } from '../forms/UserPasswordForm';
import { UserPasswordFormSkeleton } from '../shared/skeletons';

export default function UserPasswordContainer() {
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
