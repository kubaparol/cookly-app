import { Metadata } from 'next';

import Search from '@/components/base/Search';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { PageProps } from '@/types';

import MyRecipesList from './MyRecipesList';

export const metadata: Metadata = {
  title: 'My Recipes',
};

export default function RecipesPage({ params, searchParams }: PageProps) {
  return (
    <section className="flex h-full flex-1 flex-col gap-6 pb-8">
      <Card>
        <CardHeader>
          <CardTitle>Recipe Collection</CardTitle>
          <CardDescription>
            View and manage all your recipes. Click on a recipe to see more details.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="w-full sm:max-w-xs">
            <Search placeholder="Search recipes..." pathPattern="/my-recipes/:page" />
          </div>

          <MyRecipesList params={params} searchParams={searchParams} />
        </CardContent>
      </Card>
    </section>
  );
}
