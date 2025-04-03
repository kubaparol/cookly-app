import { BarChart3, Download } from 'lucide-react';
import { Metadata } from 'next';

import { ProjectUrls } from '@/constants';

import { PageWrapper } from '@/components/layouts/components/PageWrapper';
import PeriodSelect from '@/components/modules/analytics/PeriodSelect';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { PageProps } from '@/types';

import EngagementCards from './EngagementCards';
import MetricCards from './MetricCards';
import TopRecipesTable from './TopRecipesTable';

export const metadata: Metadata = {
  title: 'Analytics',
};

export default async function AnalyticsPage({ searchParams }: PageProps) {
  const period = (searchParams?.period as string) || '30days';

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
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>

          <PeriodSelect defaultValue={period} />
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
          recipes
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <EngagementCards period={period} />
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
