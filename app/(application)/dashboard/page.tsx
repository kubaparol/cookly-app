import { Metadata } from 'next';
import { Suspense } from 'react';

import PageTitle from '@/components/base/PageTitle';
import StatisticCardsContainer from '@/components/containers/StatisticCardsContainer';
import RecentRecipesCard from '@/components/shared/RecentRecipesCard';
import { RecipesOverviewCard } from '@/components/shared/RecipesOverviewCard';
import { StatisticCardsSkeleton } from '@/components/shared/skeletons';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <section className="grid gap-6">
      <PageTitle title="Dashboard" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<StatisticCardsSkeleton />}>
          <StatisticCardsContainer />
        </Suspense>
      </div>

      <div className="grid gap-6 xl:grid-cols-7">
        <RecipesOverviewCard className="xl:col-span-4" />
        <RecentRecipesCard className="xl:col-span-3" />
      </div>
    </section>
  );
}
