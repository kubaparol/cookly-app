import { getAllRecipes, getMyRecipes } from '@/db';

import RecipeCard from '../shared/RecipeCard';
import StatusCard from '../shared/StatusCard';

interface AllRecipesContainerProps {
  query?: string;
}

export default async function AllRecipesContainer(props: AllRecipesContainerProps) {
  const { query } = props;

  const recipes = await getAllRecipes({ query });

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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
      {recipes?.map((recipe, index) => (
        <RecipeCard key={index} id={recipe.id} title={recipe.title} imageUrl={recipe.imageUrl} />
      ))}
    </div>
  );
}
