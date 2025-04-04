import { Heart, MessageSquare } from 'lucide-react';
import { ChefHat } from 'lucide-react';
import { Suspense } from 'react';

import { getQuickStats } from '@/db';

import { QuickStatsSkeleton } from '@/components/shared/skeletons';

async function QuickStatsLoader() {
  const stats = await getQuickStats();

  if (!stats) return null;

  return (
    <div className="grid gap-4 xxs:grid-cols-2 xs:grid-cols-3">
      <div className="flex flex-col items-center justify-center rounded-lg bg-muted/30 p-3">
        <ChefHat className="mb-1 h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">{stats.recipesCreated}</span>
        <span className="text-xs text-muted-foreground">Recipes Created</span>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg bg-muted/30 p-3">
        <Heart className="mb-1 h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">{stats.savedRecipes}</span>
        <span className="text-xs text-muted-foreground">Saved Recipes</span>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg bg-muted/30 p-3 xxs:col-span-full xs:col-span-1">
        <MessageSquare className="mb-1 h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">{stats.comments}</span>
        <span className="text-xs text-muted-foreground">Comments</span>
      </div>
    </div>
  );
}

export default function QuickStats() {
  return (
    <Suspense fallback={<QuickStatsSkeleton />}>
      <QuickStatsLoader />
    </Suspense>
  );
}
