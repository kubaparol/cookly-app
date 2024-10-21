import { Metadata } from 'next';
import { Suspense } from 'react';

import PageTitle from '@/components/base/PageTitle';
import { CardsSkeleton } from '@/components/skeletons/CardsSkeleton';
import StatisticCardsWrapper from '@/components/wrappers/StatisticCardsWrapper';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <section>
      <header className="mb-4">
        <PageTitle title="Dashboard" />
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<CardsSkeleton />}>
          <StatisticCardsWrapper />
        </Suspense>
      </div>
    </section>
  );
}
