import { currentUser } from '@clerk/nextjs/server';

import UserDetailsForm from '@/components/forms/UserDetailsForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function SettingsContainer() {
  const user = await currentUser();

  return (
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
  );
}
