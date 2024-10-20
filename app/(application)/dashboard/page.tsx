import { Metadata } from 'next';

import PageTitle from '@/components/base/PageTitle';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <section>
      <PageTitle title="Dashboard" />
    </section>
  );
}
