import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { Suspense } from 'react';

import { ProjectUrls } from '@/constants';

import { getRecentComments } from '@/db';

import { CommentCard } from '@/components/modules/analytics/CommentCard';
import { RecentCommentsSkeleton } from '@/components/shared/skeletons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

dayjs.extend(relativeTime);

async function RecentCommentsLoader({ period }: { period: string }) {
  const comments = await getRecentComments(period);

  if (!comments || comments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Comments</CardTitle>
          <CardDescription>Latest feedback on your recipes</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <div>
              <p className="text-sm font-medium">No comments available</p>
              <p className="mt-1 text-xs text-muted-foreground">
                You&apos;ll see comments here when users leave feedback on your recipes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Comments</CardTitle>
        <CardDescription>Latest feedback on your recipes</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              author={comment.author}
              avatar={comment.authorAvatar || '/placeholder.svg?height=40&width=40'}
              recipe={comment.recipe}
              comment={comment.content}
              date={dayjs(comment.createdAt).fromNow()}
              sentiment={comment.sentiment}
            />
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={ProjectUrls.commentsReceived}>View All Comments</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function RecentComments({ period }: { period: string }) {
  return (
    <Suspense fallback={<RecentCommentsSkeleton />}>
      <RecentCommentsLoader period={period} />
    </Suspense>
  );
}
