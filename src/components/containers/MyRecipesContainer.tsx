import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

import { getTotalCookingTime } from '@/utils';

import { ProjectUrls } from '@/constants';

import { getMyRecipes } from '@/db';

import { RecipeCard } from '../shared/RecipeCard';
import StatusCard from '../shared/StatusCard';

interface MyRecipesContainerProps {
  query?: string;
  difficulty?: string[];
  cuisineType?: string[];
  mealType?: string[];
  dietaryTags?: string[];
  maxCookingTime?: string;
}

export default async function MyRecipesContainer(props: MyRecipesContainerProps) {
  const { query, difficulty, cuisineType, mealType, dietaryTags, maxCookingTime } = props;

  const recipes = await getMyRecipes({
    query,
    difficulty,
    cuisineType,
    mealType,
    dietaryTags,
    maxCookingTime: maxCookingTime ? parseInt(maxCookingTime) : undefined,
  });

  const user = await currentUser();

  if (!user) {
    notFound();
  }

  if (
    recipes?.length === 0 &&
    !query &&
    !difficulty?.length &&
    !cuisineType?.length &&
    !mealType?.length &&
    !dietaryTags?.length &&
    !maxCookingTime
  ) {
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
          message="Sorry, but we could not find the recipes matching your filters."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes?.map((recipe, index) => (
          <RecipeCard
            key={index}
            id={recipe.id}
            title={recipe.title}
            imageUrl={recipe.imageUrl}
            cookingTime={getTotalCookingTime({
              preparationTime: recipe.preparationTime,
              cookingTime: recipe.cookingTime,
              restTime: recipe.restTime || 0,
            })}
            difficulty={recipe.difficulty}
            dietaryTags={recipe.dietaryTags}
            isAuthor={user.id === recipe.authorId}
            openInNewTab
          />
        ))}
      </div>
    </div>
  );
}
