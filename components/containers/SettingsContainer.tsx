import { currentUser } from '@clerk/nextjs/server';

import UserDetailsForm from '@/components/forms/UserDetailsForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import UserPasswordForm from '../forms/UserPasswordForm';

export default async function SettingsContainer() {
  const user = await currentUser();

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>

        <CardContent>
          <UserDetailsForm
            defaultValues={{ firstName: user?.firstName || '', lastName: user?.lastName || '' }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Password</CardTitle>
        </CardHeader>

        <CardContent>
          <UserPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
