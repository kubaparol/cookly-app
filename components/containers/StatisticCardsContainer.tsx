import { Banknote, Bot, Eye, ScrollText } from 'lucide-react';

import { getCardData } from '@/db';

import StatisticCard from '../shared/StatisticCard';

export default async function StatisticCardsContainer() {
  const numberOfRecipes = await getCardData();

  return (
    <>
      <StatisticCard icon={ScrollText} title="My recipes" value={numberOfRecipes?.count || 0} />
      <StatisticCard icon={Banknote} title="Collected" value="-" disabled />
      <StatisticCard icon={Eye} title="Views" value="-" disabled />
      <StatisticCard icon={Bot} title="AI Recipe Limit" value="-" disabled />
    </>
  );
}
