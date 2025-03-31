import { Metadata } from 'next';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { PageProps } from '@/types';

import FavoriteRecipesList from './FavoriteRecipesList';

export const metadata: Metadata = {
  title: 'Favorite Recipes',
};

export default function FavoriteRecipesPage(props: PageProps) {
  return (
    <section className="flex h-full flex-1 flex-col gap-6 pb-8">
      <Card>
        <CardHeader>
          <CardTitle>Favorite Recipes</CardTitle>
          <CardDescription>Your collection of favorite recipes</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <FavoriteRecipesList {...props} />
        </CardContent>
      </Card>
    </section>
  );
}
