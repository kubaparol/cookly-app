'use client';

import { useUser } from '@clerk/nextjs';
import { useCallback } from 'react';
import { toast } from 'sonner';

import UserDetailsForm, { UserDetailsFormValues } from '../forms/UserDetailsForm';
import { UserDetailsFormSkeleton } from '../shared/skeletons';

export default function UserDetailsContainer() {
  const { user, isLoaded } = useUser();

  const userDetailsHandler = useCallback(async (values: UserDetailsFormValues) => {
    await user?.update({
      firstName: values.firstName,
      lastName: values.lastName,
    });

    toast.success('User details updated successfully');
  }, []);

  if (!isLoaded) return <UserDetailsFormSkeleton />;

  return (
    <UserDetailsForm
      defaultValues={{ firstName: user?.firstName || '', lastName: user?.lastName || '' }}
      onFormSubmit={userDetailsHandler}
    />
  );
}
