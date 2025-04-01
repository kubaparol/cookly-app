import { Suspense } from 'react';

import { DATA_PER_PAGE } from '@/constants';

import { getMadeComments } from '@/db';

import Search from '@/components/base/Search';
import { CommentsMade } from '@/components/modules/comments/CommentsMade';
import CommentsFilters from '@/components/modules/recipes/CommentsFilters';
import { CommentsSkeleton } from '@/components/shared/skeletons';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';

import { PageProps } from '@/types';

async function CommentsLoader({ params, searchParams }: PageProps) {
  const page = Number(params?.page);

  const made = await getMadeComments({
    query: searchParams?.query as string,
    rating: searchParams?.rating as string,
    timePeriod: searchParams?.timePeriod as string,
    sortBy: searchParams?.sortBy as string,
    status: searchParams?.status as string,
  });

  if (!made) return null;

  const showPagination = made.count > DATA_PER_PAGE;

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Comments</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage comments on your recipes and track your feedback
          </p>
        </div>
      </div>

      <Search placeholder="Search comments..." />

      <CommentsFilters />

      <CommentsMade comments={made?.data ?? []} />

      {showPagination && (
        <PaginationWithLinks
          page={page}
          pageSize={DATA_PER_PAGE}
          totalCount={made.count}
          pathPattern="/comments/made/:page"
        />
      )}
    </div>
  );
}

export default function CommentsPage(props: PageProps) {
  return (
    <Suspense fallback={<CommentsSkeleton />}>
      <CommentsLoader {...props} />
    </Suspense>
  );
}
