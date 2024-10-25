import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

import { ProjectUrls } from '@/constants';

import { getMyRecipes } from '@/db';

import RecipeCard from '../shared/RecipeCard';
import StatusCard from '../shared/StatusCard';

interface MyRecipesContainerProps {
  query?: string;
}

export default async function MyRecipesContainer(props: MyRecipesContainerProps) {
  const { query } = props;

  const recipes = await getMyRecipes({ query });

  const user = await currentUser();

  if (!user) {
    notFound();
  }

  if (recipes?.length === 0 && !query) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <StatusCard
          type="no-icon"
          title="You haven't created any recipes yet"
          primaryAction={{
            label: 'Create your first recipe',
            href: ProjectUrls.createRecipe,
          }}
        />
      </div>
    );
  }

  if (recipes?.length === 0) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <StatusCard
          type="sad"
          title="Recipes not found"
          message="Sorry, but we could not find the recipes you are looking for."
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
      {recipes?.map((recipe, index) => (
        <RecipeCard
          key={index}
          id={recipe.id}
          title={recipe.title}
          imageUrl={recipe.imageUrl}
          isAuthor={user.id === recipe.authorId}
          openInNewTab
        />
      ))}
    </div>
  );
}
