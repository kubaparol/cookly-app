import { Banknote, Bot, ScrollText } from 'lucide-react';
import { Metadata } from 'next';

import PageTitle from '@/components/base/PageTitle';
import RecentRecipesCard from '@/components/shared/RecentRecipesCard';
import { RecipesOverviewCard } from '@/components/shared/RecipesOverviewCard';
import StatisticCard from '@/components/shared/StatisticCard';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <section className="grid gap-6">
      <PageTitle title="Dashboard" />
      <div className="grid gap-6 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        <StatisticCard icon={ScrollText} title="My recipes" value="0" />
        <StatisticCard icon={Banknote} title="Collected" value="-" className="opacity-50" />

        <StatisticCard
          icon={Bot}
          title="AI Recipe Limit"
          value="-"
          className="opacity-50 xxs:col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-7">
        <RecipesOverviewCard className="xl:col-span-4" />
        <RecentRecipesCard className="xl:col-span-3" />
      </div>
    </section>
  );
}
