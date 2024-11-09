import { getRecentRecipes } from '@/db';

import RecentRecipesCard from '../shared/RecentRecipesCard';

export default async function RecentRecipesCardContainer() {
  const recipes = await getRecentRecipes();

  return <RecentRecipesCard recipes={recipes || []} />;
}
