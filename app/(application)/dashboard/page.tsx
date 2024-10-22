import { Metadata } from 'next';
import { Suspense } from 'react';

import PageTitle from '@/components/base/PageTitle';
import RecipesOverviewCardContainer from '@/components/containers/RecipesOverviewCardContainer';
import StatisticCardsContainer from '@/components/containers/StatisticCardsContainer';
import RecentRecipesCard from '@/components/shared/RecentRecipesCard';
import { RecipesOverviewCardSkeleton, StatisticCardsSkeleton } from '@/components/shared/skeletons';

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
        <div className="xl:col-span-4">
          <Suspense fallback={<RecipesOverviewCardSkeleton />}>
            <RecipesOverviewCardContainer />
          </Suspense>
        </div>

        <RecentRecipesCard className="xl:col-span-3" />
      </div>
    </section>
  );
}
