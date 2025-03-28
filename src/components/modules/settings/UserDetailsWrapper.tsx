'use client';

import { useUser } from '@clerk/nextjs';
import { useCallback } from 'react';

import UserDetailsForm, { UserDetailsFormValues } from '@/components/forms/UserDetailsForm';
import { UserDetailsFormSkeleton } from '@/components/shared/skeletons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserDetailsWrapper() {
  const { user, isLoaded } = useUser();

  const userDetailsHandler = useCallback(
    async (values: UserDetailsFormValues) => {
      await user?.update({
        firstName: values.firstName,
        lastName: values.lastName,
      });

      if (typeof values.profileImage !== 'string') {
        await user?.setProfileImage({
          file: values.profileImage,
        });
      }
    },
    [user],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>

      <CardContent>
        {!isLoaded ? (
          <UserDetailsFormSkeleton />
        ) : (
          <UserDetailsForm
            defaultValues={{
              profileImage: user?.imageUrl,
              firstName: user?.firstName || '',
              lastName: user?.lastName || '',
            }}
            onFormSubmit={userDetailsHandler}
          />
        )}
      </CardContent>
    </Card>
  );
}
