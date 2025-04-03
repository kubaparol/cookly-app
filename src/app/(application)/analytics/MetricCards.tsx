import { Eye, Heart, MessageSquare } from 'lucide-react';
import { Suspense } from 'react';

import { getAnalytics } from '@/db';

import { MetricCard } from '@/components/modules/analytics/MetricCard';
import { MetricCardsSkeleton } from '@/components/shared/skeletons';

async function MetricCardsLoader({ period }: { period: string }) {
  const analytics = await getAnalytics(period);

  if (!analytics) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <MetricCard
        title="Total Views"
        value={analytics?.totalViews ?? 0}
        change={analytics ? `${analytics.viewsChange.toFixed(1)}%` : '0%'}
        trend={analytics?.viewsChange >= 0 ? 'up' : 'down'}
        description="vs. previous period"
        icon={Eye}
      />
      <MetricCard
        title="Recipe Saves"
        value={analytics?.totalSaves ?? 0}
        change={analytics ? `${analytics.savesChange.toFixed(1)}%` : '0%'}
        trend={analytics?.savesChange >= 0 ? 'up' : 'down'}
        description="vs. previous period"
        icon={Heart}
      />
      <MetricCard
        title="Comments"
        value={analytics?.totalComments ?? 0}
        change={analytics ? `${analytics.commentsChange.toFixed(1)}%` : '0%'}
        trend={analytics?.commentsChange >= 0 ? 'up' : 'down'}
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
