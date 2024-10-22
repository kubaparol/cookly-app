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

export function RecipesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
      <Skeleton className="aspect-[16/9]" />
      <Skeleton className="aspect-[16/9]" />
      <Skeleton className="aspect-[16/9]" />
      <Skeleton className="aspect-[16/9]" />
      <Skeleton className="aspect-[16/9]" />
      <Skeleton className="aspect-[16/9]" />
    </div>
  );
}

export function RecipeFormSkeleton() {
  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <Skeleton className="h-[20px] w-[40px]" />
        <Skeleton className="h-[36px]" />
      </div>

      <div className="grid gap-2">
        <Skeleton className="h-[20px] w-[40px]" />
        <Skeleton className="h-[128px]" />
      </div>

      <div className="grid gap-2">
        <Skeleton className="h-[20px] w-[40px]" />
        <Skeleton className="h-[318px]" />
      </div>

      <div className="grid gap-2">
        <Skeleton className="h-[20px] w-[40px]" />
        <Skeleton className="h-[106px]" />
      </div>

      <div className="grid gap-2">
        <Skeleton className="h-[20px] w-[40px]" />
        <Skeleton className="h-[106px]" />
      </div>
    </div>
  );
}
