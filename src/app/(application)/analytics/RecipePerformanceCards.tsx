import { Suspense } from 'react';

import { getRecipePerformance } from '@/db';

import { RecipePerformanceCard } from '@/components/modules/analytics/RecipePerformanceCard';
import { RecipePerformanceCardsSkeleton } from '@/components/shared/skeletons';

async function RecipePerformanceCardsLoader({ period, sort }: { period: string; sort: string }) {
  const performance = await getRecipePerformance(period, sort);

  if (!performance || performance.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div>
          <p className="text-sm font-medium">No recipe performance data available</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Create and publish recipes to see performance metrics
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {performance.map((recipe) => (
        <RecipePerformanceCard
          key={recipe.id}
          title={recipe.title}
          image={recipe.imageUrl}
          views={recipe.views}
          saves={recipe.saves}
          comments={recipe.comments}
          rating={recipe.rating}
          trend={recipe.trend}
        />
      ))}
    </div>
  );
}

export default function RecipePerformanceCards({ period, sort }: { period: string; sort: string }) {
  return (
    <Suspense fallback={<RecipePerformanceCardsSkeleton />}>
      <RecipePerformanceCardsLoader period={period} sort={sort} />
    </Suspense>
  );
}
