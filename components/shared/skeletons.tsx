import { Skeleton } from '../ui/skeleton';

export function StatisticCardsSkeleton() {
  return (
    <>
      <Skeleton className="h-[110px]" />
      <Skeleton className="h-[110px]" />
      <Skeleton className="h-[110px]" />
      <Skeleton className="h-[110px]" />
    </>
  );
}

export function RecipesOverviewCardSkeleton() {
  return <Skeleton className="h-[440px]" />;
}

export function RecentRecipesCardSkeleton() {
  return <Skeleton className="h-[440px]" />;
}
