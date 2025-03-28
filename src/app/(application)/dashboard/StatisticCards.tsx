import { Suspense } from 'react';

import { getUserRecipeCount } from '@/db/actions/statistics';

import StatisticCard from '@/components/modules/dashboard/StatisticCard';
import { StatisticCardsSkeleton } from '@/components/shared/skeletons';

async function StatisticCardsLoader() {
  const recipeCount = await getUserRecipeCount();

  return <StatisticCard title="Your recipes" value={recipeCount ?? 0} />;
}

export default function StatisticCards() {
  return (
    <Suspense fallback={<StatisticCardsSkeleton />}>
      <StatisticCardsLoader />
    </Suspense>
  );
}
