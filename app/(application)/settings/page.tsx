import { Metadata } from 'next';
import { Suspense } from 'react';

import PageTitle from '@/components/base/PageTitle';
import SettingsContainer from '@/components/containers/SettingsContainer';
import { SettingsSkeleton } from '@/components/shared/skeletons';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return (
    <section className="grid gap-2 sm:gap-6">
      <PageTitle title="Settings" />

      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsContainer />
      </Suspense>
    </section>
  );
}
