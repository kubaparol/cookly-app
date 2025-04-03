import { Suspense } from 'react';

import { DATA_PER_PAGE } from '@/constants';

import { getReceivedComments } from '@/db';

import Search from '@/components/base/Search';
import { CommentsReceived } from '@/components/modules/comments/CommentsReceived';
import CommentsFilters from '@/components/modules/recipes/CommentsFilters';
import { CommentsSkeleton } from '@/components/shared/skeletons';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';

import { PageProps } from '@/types';

async function CommentsLoader({ params, searchParams }: PageProps) {
  const page = Number(params?.page);

  const received = await getReceivedComments({
    query: searchParams?.query as string,
    rating: searchParams?.rating as string,
    timePeriod: searchParams?.timePeriod as string,
    sortBy: searchParams?.sortBy as string,
    status: searchParams?.status as string,
  });

  if (!received) return null;

  const showPagination = received.count > DATA_PER_PAGE;

  return (
    <div className="space-y-6">
      <div className="mb-4 space-y-2">
        <div className="w-full sm:max-w-[400px]">
          <Search placeholder="Search comments..." />
        </div>

        <CommentsFilters />
      </div>

      <CommentsReceived comments={received?.data ?? []} />

      {showPagination && (
        <PaginationWithLinks
          page={page}
          pageSize={DATA_PER_PAGE}
          totalCount={received.count}
          pathPattern="/comments/received/:page"
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
