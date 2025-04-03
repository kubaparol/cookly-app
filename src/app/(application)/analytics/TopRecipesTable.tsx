import { Suspense } from 'react';

import { getTopPerformingRecipes } from '@/db/actions/analytics/get-top-performing-recipes';

import { TopRecipesTable as TopRecipesTableComponent } from '@/components/modules/analytics/TopRecipesTable';
import { TopRecipesTableSkeleton } from '@/components/shared/skeletons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

async function TopRecipesTableLoader({ period }: { period: string }) {
  const recipes = await getTopPerformingRecipes(period);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Recipes</CardTitle>
        <CardDescription>Your most viewed and saved recipes</CardDescription>
      </CardHeader>

      <CardContent>
        <TopRecipesTableComponent recipes={recipes} />
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" disabled>
          View All Recipe Analytics
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function TopRecipesTable({ period }: { period: string }) {
  return (
    <Suspense fallback={<TopRecipesTableSkeleton />}>
      <TopRecipesTableLoader period={period} />
    </Suspense>
  );
}
