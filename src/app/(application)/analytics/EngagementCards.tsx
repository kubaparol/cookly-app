import { Heart, MessageSquare } from 'lucide-react';
import { Suspense } from 'react';

import { getEngagements } from '@/db/actions/analytics/get-engagements';

import { EngagementCard } from '@/components/modules/analytics/EngagementCard';
import { EngagementCardsSkeleton } from '@/components/shared/skeletons';

async function EngagementCardsLoader({ period }: { period: string }) {
  const stats = await getEngagements(period);

  if (!stats) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <EngagementCard
        title="Comments"
        count={stats.comments.count}
        trend={stats.comments.trend}
        icon={<MessageSquare className="h-5 w-5" />}
        description="Total comments received"
      />
      <EngagementCard
        title="Saves"
        count={stats.saves.count}
        trend={stats.saves.trend}
        icon={<Heart className="h-5 w-5" />}
        description="Recipe saves by users"
      />
    </div>
  );
}

export default function EngagementCards({ period }: { period: string }) {
  return (
    <Suspense fallback={<EngagementCardsSkeleton />}>
      <EngagementCardsLoader period={period} />
    </Suspense>
  );
}
