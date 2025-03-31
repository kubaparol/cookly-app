import { Suspense } from 'react';

import { getUserFavoriteCount, getUserRecipeCount } from '@/db';

import StatisticCard from '@/components/modules/dashboard/StatisticCard';
import { StatisticCardsSkeleton } from '@/components/shared/skeletons';

async function StatisticCardsLoader() {
  const [recipeCount, favoriteCount] = await Promise.all([
    getUserRecipeCount(),
    getUserFavoriteCount(),
  ]);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <StatisticCard title="Your recipes" value={recipeCount ?? 0} />
      <StatisticCard title="Your favorites" value={favoriteCount ?? 0} />
    </div>
  );
}

export default function StatisticCards() {
  return (
    <Suspense fallback={<StatisticCardsSkeleton />}>
      <StatisticCardsLoader />
    </Suspense>
  );
}
