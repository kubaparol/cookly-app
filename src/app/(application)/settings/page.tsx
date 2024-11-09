import { Metadata } from 'next';

import PageTitle from '@/components/base/PageTitle';
import UserDetailsContainer from '@/components/containers/UserDetailsContainer';
import UserPasswordContainer from '@/components/containers/UserPasswordContainer';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return (
    <section className="grid gap-2 sm:gap-6">
      <PageTitle title="Settings" />

      <div className="grid gap-8">
        <UserDetailsContainer />

        <UserPasswordContainer />
      </div>
    </section>
  );
}
