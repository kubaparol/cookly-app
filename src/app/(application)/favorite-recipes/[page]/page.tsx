import { Heart } from 'lucide-react';
import { Metadata } from 'next';

import { ProjectUrls } from '@/constants';

import { PageWrapper } from '@/components/layouts/components/PageWrapper';

import { PageProps } from '@/types';

import FavoriteRecipesList from './FavoriteRecipesList';

export const metadata: Metadata = {
  title: 'Favorite Recipes',
};

export default function FavoriteRecipesPage(props: PageProps) {
  return (
    <PageWrapper
      title="Favorite Recipes"
      description="View and manage all your favorite recipes."
      breadcrumbs={[
        { href: ProjectUrls.home, label: 'Home' },
        { href: ProjectUrls.favoriteRecipes, label: 'Favorite Recipes', isCurrent: true },
      ]}
      icon={<Heart className="text-muted-foreground" />}>
      <section className="flex h-full flex-1 flex-col gap-6 pb-8">
        <FavoriteRecipesList {...props} />
      </section>
    </PageWrapper>
  );
}
