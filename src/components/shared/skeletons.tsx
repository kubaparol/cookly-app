import { Skeleton } from '../ui/skeleton';

export function StatisticCardsSkeleton() {
  return <Skeleton className="h-[106px] w-full" />;
}

export function RecipesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
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

export function UserDetailsFormSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-3">
        <Skeleton className="h-[18px] w-[80px]" />
        <Skeleton className="h-[36px]" />
      </div>

      <div className="grid gap-3">
        <Skeleton className="h-[18px] w-[80px]" />
        <Skeleton className="h-[36px]" />
      </div>

      <Skeleton className="h-[36px] w-[64px]" />
    </div>
  );
}

export function UserPasswordFormSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4">
        <Skeleton className="h-[18px] w-[80px]" />
        <Skeleton className="h-[36px]" />
      </div>

      <div className="grid gap-4">
        <Skeleton className="h-[18px] w-[80px]" />
        <Skeleton className="h-[36px]" />
      </div>

      <Skeleton className="h-[36px] w-[64px]" />
    </div>
  );
}
