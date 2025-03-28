import { Metadata } from 'next';
import { Suspense } from 'react';

import RecentRecipesCardContainer from '@/components/containers/RecentRecipesCardContainer';
import RecipesOverviewCardContainer from '@/components/containers/RecipesOverviewCardContainer';
import StatisticCardsContainer from '@/components/containers/StatisticCardsContainer';
import {
  RecentRecipesCardSkeleton,
  RecipesOverviewCardSkeleton,
  StatisticCardsSkeleton,
} from '@/components/shared/skeletons';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <section className="grid gap-2 sm:gap-6">
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <Suspense fallback={<StatisticCardsSkeleton />}>
          <StatisticCardsContainer />
        </Suspense>
      </div>

      <div className="grid gap-2 sm:gap-6 xl:grid-cols-7">
        <div className="xl:col-span-4">
          <Suspense fallback={<RecipesOverviewCardSkeleton />}>
            <RecipesOverviewCardContainer />
          </Suspense>
        </div>

        <div className="xl:col-span-3">
          <Suspense fallback={<RecentRecipesCardSkeleton />}>
            <RecentRecipesCardContainer />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
