import { Banknote, Bot, ScrollText } from 'lucide-react';

import StatisticCard from '../shared/StatisticCard';

export default function StatisticCardsWrapper() {
  return (
    <>
      <StatisticCard icon={ScrollText} title="My recipes" value="0" />
      <StatisticCard icon={Banknote} title="Collected" value="0" notAvailable />
      <div className="sm:col-span-2 lg:col-span-1">
        <StatisticCard icon={Bot} title="AI Recipe Limit" value="0" notAvailable />
      </div>
    </>
  );
}
