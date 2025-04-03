import { Suspense } from 'react';

import { getSentiment } from '@/db';

import { SentimentCard as SentimentCardComponent } from '@/components/modules/analytics/SentimentCard';
import { SentimentCardSkeleton } from '@/components/shared/skeletons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

async function SentimentCardLoader({ period }: { period: string }) {
  const sentiment = await getSentiment(period);

  if (!sentiment) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comment Sentiment Analysis</CardTitle>
        <CardDescription>Analysis of comment tone and sentiment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-3">
          <SentimentCardComponent type="Positive" percentage={sentiment.positive} />
          <SentimentCardComponent type="Neutral" percentage={sentiment.neutral} />
          <SentimentCardComponent type="Negative" percentage={sentiment.negative} />
        </div>
      </CardContent>
    </Card>
  );
}

export default function SentimentCard({ period }: { period: string }) {
  return (
    <Suspense fallback={<SentimentCardSkeleton />}>
      <SentimentCardLoader period={period} />
    </Suspense>
  );
}
