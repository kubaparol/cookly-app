import { Metadata } from 'next';

import UserDetailsWrapper from '@/components/modules/settings/UserDetailsWrapper';
import UserPasswordWrapper from '@/components/modules/settings/UserPasswordWrapper';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return (
    <section className="grid gap-2 sm:gap-6">
      <div className="grid gap-8">
        <UserDetailsWrapper />

        <UserPasswordWrapper />
      </div>
    </section>
  );
}
