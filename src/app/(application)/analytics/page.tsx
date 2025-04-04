import { BarChart3, Calendar } from 'lucide-react';
import { Metadata } from 'next';

import { ProjectUrls } from '@/constants';

import { ParamSelect } from '@/components/base/ParamSelect';
import { PageWrapper } from '@/components/layouts/components/PageWrapper';
import { ExportAnalyticsButton } from '@/components/modules/analytics/ExportAnalyticsButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { PageProps } from '@/types';

import EngagementCards from './EngagementCards';
import MetricCards from './MetricCards';
import RecentComments from './RecentComments';
import RecipePerformanceCards from './RecipePerformanceCards';
import SentimentCard from './SentimentCard';
import TopRecipesTable from './TopRecipesTable';

export const metadata: Metadata = {
  title: 'Analytics',
};

const periodOptions = [
  { label: 'Last 7 days', value: '7days' },
  { label: 'Last 30 days', value: '30days' },
  { label: 'Last 90 days', value: '90days' },
  { label: 'Last 12 months', value: 'year' },
  { label: 'All time', value: 'all' },
];

const sortOptions = [
  { label: 'Most Views', value: 'views' },
  { label: 'Most Saves', value: 'saves' },
  { label: 'Most Comments', value: 'comments' },
  { label: 'Highest Rating', value: 'rating' },
  { label: 'Newest First', value: 'newest' },
];

export default async function AnalyticsPage({ searchParams }: PageProps) {
  const period = (searchParams?.period as string) || '30days';
  const sort = (searchParams?.sort as string) || 'views';

  return (
    <PageWrapper
      title="Recipe Analytics"
      description="Track performance and engagement for your recipes"
      breadcrumbs={[
        { href: ProjectUrls.home, label: 'Home' },
        { href: ProjectUrls.analytics, label: 'Analytics', isCurrent: true },
      ]}
      icon={<BarChart3 className="text-muted-foreground" />}
      actions={
        <div className="flex gap-2 md:flex-col lg:flex-row">
          <ExportAnalyticsButton period={period} />

          <ParamSelect
            defaultValue={period}
            paramName="period"
            options={periodOptions}
            icon={<Calendar className="mr-2 h-4 w-4" />}
            className="w-[180px]"
          />
        </div>
      }>
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <MetricCards period={period} />
          <TopRecipesTable period={period} />
        </TabsContent>

        <TabsContent value="recipes" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recipe Performance</h2>

            <ParamSelect
              defaultValue={sort}
              paramName="sort"
              options={sortOptions}
              className="w-[180px]"
            />
          </div>

          <RecipePerformanceCards period={period} sort={sort} />
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <EngagementCards period={period} />
          <SentimentCard period={period} />
          <RecentComments period={period} />
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
