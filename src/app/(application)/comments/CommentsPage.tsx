import { Suspense } from 'react';

import { getMadeComments, getReceivedComments } from '@/db';

import Search from '@/components/base/Search';
import { CommentsMade } from '@/components/modules/comments/CommentsMade';
import { CommentsReceived } from '@/components/modules/comments/CommentsReceived';
import CommentsFilters from '@/components/modules/recipes/CommentsFilters';
import { CommentsSkeleton } from '@/components/shared/skeletons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { PageProps } from '@/types';

async function CommentsLoader({ searchParams }: PageProps) {
  const [made, received] = await Promise.all([
    getMadeComments({
      query: searchParams?.query as string,
      rating: searchParams?.rating as string,
      timePeriod: searchParams?.timePeriod as string,
      sortBy: searchParams?.sortBy as string,
      status: searchParams?.status as string,
    }),
    getReceivedComments({
      query: searchParams?.query as string,
      rating: searchParams?.rating as string,
      timePeriod: searchParams?.timePeriod as string,
      sortBy: searchParams?.sortBy as string,
      status: searchParams?.status as string,
    }),
  ]);

  const totalReceived = received?.data.length;
  const totalMade = made?.data.length;
  const unansweredCount =
    received?.data.filter((comment) => comment.replies.length === 0).length || 0;

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Comments</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage comments on your recipes and track your feedback
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-primary/10 text-xs text-primary">
            {totalReceived} Received
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-xs text-primary">
            {totalMade} Made
          </Badge>
          {unansweredCount && unansweredCount > 0 && (
            <Badge
              variant="outline"
              className="border-amber-200 bg-amber-100 text-xs text-amber-700">
              {unansweredCount} Unanswered
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue="received" className="space-y-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <TabsList>
            <TabsTrigger value="received" className="relative">
              Comments Received
              {unansweredCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {unansweredCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="made">Comments Made</TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-[250px]">
            <Search placeholder="Search comments..." />
          </div>
        </div>

        <CommentsFilters />

        <TabsContent value="received">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Comments on Your Recipes</CardTitle>
              <CardDescription className="text-sm">
                Manage and respond to comments left on your recipes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommentsReceived comments={received?.data ?? []} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="made">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Your Comments on Other Recipes</CardTitle>
              <CardDescription className="text-sm">
                Track comments you&apos;ve made on other creators&apos; recipes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommentsMade comments={made?.data ?? []} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default function CommentsPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<CommentsSkeleton />}>
      <CommentsLoader searchParams={searchParams} />
    </Suspense>
  );
}
