import { Metadata } from 'next';

import PageTitle from '@/components/base/PageTitle';
import UserDetailsContainer from '@/components/containers/UserDetailsContainer';
import UserPasswordForm from '@/components/forms/UserPasswordForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return (
    <section className="grid gap-2 sm:gap-6">
      <PageTitle title="Settings" />

      <div className="grid gap-8">
        <UserDetailsContainer />

        <Card>
          <CardHeader>
            <CardTitle>User Password</CardTitle>
          </CardHeader>

          <CardContent>
            <UserPasswordForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
