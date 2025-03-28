import { currentUser } from '@clerk/nextjs/server';

import { getTotalCookingTime } from '@/utils';

import { getAllRecipes } from '@/db';

import { RecipeCard } from '../shared/RecipeCard';
import StatusCard from '../shared/StatusCard';

interface AllRecipesContainerProps {
  query?: string;
}

export default async function AllRecipesContainer(props: AllRecipesContainerProps) {
  const { query } = props;

  const [recipes, user] = await Promise.all([getAllRecipes({ query }), currentUser()]);

  if (recipes?.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <StatusCard
          type="sad"
          title="Recipes not found"
          message="Sorry, but we could not find the recipes you are looking for."
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes?.map((recipe, index) => (
        <RecipeCard
          key={index}
          id={recipe.id}
          title={recipe.title}
          imageUrl={recipe.imageUrl}
          servings={recipe.servings}
          cookingTime={getTotalCookingTime({
            preparationTime: recipe.preparationTime,
            cookingTime: recipe.cookingTime,
            restTime: recipe.restTime || 0,
          })}
          ingredientsLength={recipe.ingredients.length}
          difficulty={recipe.difficulty}
          dietaryTags={recipe.dietaryTags}
          isAuthor={user?.id === recipe.authorId}
          openInNewTab
        />
      ))}
    </div>
  );
}
