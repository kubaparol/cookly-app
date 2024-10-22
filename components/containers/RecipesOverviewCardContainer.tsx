import { getRecipesOverview } from '@/db';

import { RecipesOverviewCard } from '../shared/RecipesOverviewCard';

export default async function RecipesOverviewCardContainer() {
  const data = await getRecipesOverview();

  return <RecipesOverviewCard data={data || []} />;
}
