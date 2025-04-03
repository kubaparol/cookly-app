import { Eye, Heart, MessageSquare } from 'lucide-react';
import { Suspense } from 'react';

import { getMetrics } from '@/db';

import { MetricCard } from '@/components/modules/analytics/MetricCard';
import { MetricCardsSkeleton } from '@/components/shared/skeletons';

async function MetricCardsLoader({ period }: { period: string }) {
  const metrics = await getMetrics(period);

  if (!metrics) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <MetricCard
        title="Total Views"
        value={metrics?.totalViews ?? 0}
        change={metrics ? `${metrics.viewsChange.toFixed(1)}%` : '0%'}
        trend={metrics?.viewsChange >= 0 ? 'up' : 'down'}
        description="vs. previous period"
        icon={Eye}
      />
      <MetricCard
        title="Recipe Saves"
        value={metrics?.totalSaves ?? 0}
        change={metrics ? `${metrics.savesChange.toFixed(1)}%` : '0%'}
        trend={metrics?.savesChange >= 0 ? 'up' : 'down'}
        description="vs. previous period"
        icon={Heart}
      />
      <MetricCard
        title="Comments"
        value={metrics?.totalComments ?? 0}
        change={metrics ? `${metrics.commentsChange.toFixed(1)}%` : '0%'}
        trend={metrics?.commentsChange >= 0 ? 'up' : 'down'}
        description="vs. previous period"
        icon={MessageSquare}
      />
    </div>
  );
}

export default function MetricCards({ period }: { period: string }) {
  return (
    <Suspense fallback={<MetricCardsSkeleton />}>
      <MetricCardsLoader period={period} />
    </Suspense>
  );
}
