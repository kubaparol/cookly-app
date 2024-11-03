'use client';

import { useUser } from '@clerk/nextjs';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import UserDetailsForm, { UserDetailsFormValues } from '../forms/UserDetailsForm';
import { UserDetailsFormSkeleton } from '../shared/skeletons';

export default function UserDetailsContainer() {
  const { user, isLoaded } = useUser();

  const userDetailsHandler = useCallback(
    async (values: UserDetailsFormValues) => {
      try {
        await user?.update({
          firstName: values.firstName,
          lastName: values.lastName,
        });

        toast.success('User details updated successfully');
      } catch (error) {
        toast.error('Failed to update user details');
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
            defaultValues={{ firstName: user?.firstName || '', lastName: user?.lastName || '' }}
            onFormSubmit={userDetailsHandler}
          />
        )}
      </CardContent>
    </Card>
  );
}
