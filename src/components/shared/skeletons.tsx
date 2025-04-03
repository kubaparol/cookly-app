import { BookOpen, Info, Scale } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function MetricCardsSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Skeleton className="h-[130px] w-full" />
      <Skeleton className="h-[130px] w-full" />
      <Skeleton className="h-[130px] w-full" />
    </div>
  );
}

export function StatisticCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Skeleton className="h-[106px] w-full" />
      <Skeleton className="h-[106px] w-full" />
    </div>
  );
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

export function RecipeViewSkeleton() {
  return (
    <>
      {/* Breadcrumb Skeleton */}
      <div className="mb-4 flex items-center gap-2 sm:mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Recipe Header Skeleton */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:gap-8 lg:grid-cols-2">
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* Title */}
          <Skeleton className="h-10 w-full sm:h-12 md:h-14" />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-4/6" />
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 rounded-lg border p-3 dark:border-border">
            <Skeleton className="h-10 w-10 rounded-full sm:h-12 sm:w-12" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Recipe Stats */}
          <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4 sm:gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-xl border bg-card p-2 text-center shadow-sm dark:border-border dark:bg-card sm:p-4">
                <Skeleton className="mb-2 h-8 w-8 rounded-full sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12" />
                <Skeleton className="mb-1 h-5 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2 sm:gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>

        {/* Recipe Image */}
        <Skeleton className="aspect-[4/3] w-full rounded-xl sm:rounded-2xl" />
      </div>

      {/* Recipe Details */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted p-1 dark:bg-muted">
              <TabsTrigger
                value="ingredients"
                className="rounded-lg text-xs data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-background dark:data-[state=active]:text-foreground sm:text-sm">
                <Scale className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Ingredients</span>
                <span className="xs:hidden">Ingr.</span>
              </TabsTrigger>
              <TabsTrigger
                value="instructions"
                className="rounded-lg text-xs data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-background dark:data-[state=active]:text-foreground sm:text-sm">
                <BookOpen className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Instructions</span>
                <span className="xs:hidden">Instr.</span>
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="rounded-lg text-xs data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-background dark:data-[state=active]:text-foreground sm:text-sm">
                <Info className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Notes & Tips</span>
                <span className="xs:hidden">Notes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="pt-4 sm:pt-6 md:pt-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                <div>
                  <div className="mb-3 flex items-center sm:mb-4">
                    <Skeleton className="mr-2 h-6 w-6 rounded sm:h-7 sm:w-7" />
                    <Skeleton className="h-7 w-32 sm:h-8" />
                  </div>
                  <Skeleton className="mb-4 h-4 w-40 sm:mb-6" />

                  <div className="space-y-3 sm:space-y-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="flex items-start">
                        <Skeleton className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 rounded-full sm:mr-3 sm:h-6 sm:w-6" />
                        <Skeleton className="h-5 w-full max-w-[200px] sm:h-6" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center sm:mb-4">
                    <Skeleton className="mr-2 h-6 w-6 rounded sm:h-7 sm:w-7" />
                    <Skeleton className="h-7 w-32 sm:h-8" />
                  </div>

                  <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-start">
                        <Skeleton className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 rounded-full sm:mr-3 sm:h-6 sm:w-6" />
                        <Skeleton className="h-5 w-full max-w-[180px] sm:h-6" />
                      </div>
                    ))}
                  </div>

                  <Skeleton className="mb-3 h-7 w-32 sm:mb-4 sm:h-8" />
                  <Card className="border-border bg-card dark:border-border dark:bg-card">
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="space-y-3 sm:space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-start">
                            <Skeleton className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 rounded-full sm:mr-3 sm:h-6 sm:w-6" />
                            <Skeleton className="h-5 w-full sm:h-6" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="instructions" className="pt-4 sm:pt-6 md:pt-8">
              <div className="mb-4 flex items-center sm:mb-6">
                <Skeleton className="mr-2 h-6 w-6 rounded sm:h-7 sm:w-7" />
                <Skeleton className="h-7 w-32 sm:h-8" />
              </div>

              <div className="space-y-6 sm:space-y-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex">
                    <Skeleton className="mr-3 h-8 w-8 flex-shrink-0 rounded-full sm:mr-5 sm:h-10 sm:w-10" />
                    <div className="w-full pt-1">
                      <Skeleton className="h-5 w-full sm:h-6" />
                      <Skeleton className="mt-2 h-5 w-5/6 sm:h-6" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="pt-4 sm:pt-6 md:pt-8">
              <div className="space-y-6 sm:space-y-8 md:space-y-10">
                <div>
                  <Skeleton className="mb-3 h-7 w-32 sm:mb-4 sm:h-8" />
                  <Card className="border-border bg-card dark:border-border dark:bg-card">
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="space-y-3 sm:space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-start">
                            <Skeleton className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 rounded-full sm:mr-3 sm:h-6 sm:w-6" />
                            <Skeleton className="h-5 w-full sm:h-6" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Skeleton className="mb-3 h-7 w-48 sm:mb-4 sm:h-8" />
                  <Card className="border-border bg-card dark:border-border dark:bg-card">
                    <CardContent className="space-y-4 pt-4 sm:space-y-6 sm:pt-6">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex">
                          <Skeleton className="mr-3 h-8 w-8 flex-shrink-0 rounded-full sm:mr-4 sm:h-10 sm:w-10" />
                          <div className="w-full">
                            <Skeleton className="mb-2 h-5 w-24 sm:h-6" />
                            <Skeleton className="h-4 w-full sm:h-5" />
                            <Skeleton className="mt-1 h-4 w-5/6 sm:h-5" />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <div className="sticky top-4">
            {/* Nutrition Facts Skeleton */}
            <Card className="mb-4 overflow-hidden border-border bg-card shadow-sm dark:border-border dark:bg-card sm:mb-6">
              <div className="bg-primary-foreground p-3 dark:bg-primary sm:p-4">
                <Skeleton className="mb-1 h-6 w-32 bg-primary/20 dark:bg-primary-foreground/20 sm:h-7" />
                <Skeleton className="h-3 w-24 bg-primary/20 dark:bg-primary-foreground/20 sm:h-4" />
              </div>
              <CardContent className="pt-4 sm:pt-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Skeleton className="h-4 w-16 sm:h-5" />
                    <Skeleton className="h-4 w-8 sm:h-5" />
                  </div>
                  <Skeleton className="mb-3 h-0.5 w-full sm:mb-4" />
                </div>

                {[...Array(3)].map((_, i) => (
                  <div key={i} className="mb-3 sm:mb-4">
                    <div className="mb-1 flex items-center justify-between sm:mb-2">
                      <Skeleton className="h-4 w-12 sm:h-5" />
                      <Skeleton className="h-4 w-8 sm:h-5" />
                    </div>
                    <Skeleton className="h-1.5 w-full rounded-full sm:h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recipe Details Skeleton */}
            <Card className="border-border bg-card shadow-sm dark:border-border dark:bg-card">
              <CardContent className="pt-4 sm:pt-6">
                <Skeleton className="mb-3 h-5 w-32 sm:mb-4 sm:h-6" />
                <div className="space-y-2 sm:space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <div className="flex items-center">
                        <Skeleton className="mr-1.5 h-3.5 w-3.5 rounded sm:mr-2 sm:h-4 sm:w-4" />
                        <Skeleton className="h-3.5 w-16 sm:h-4" />
                      </div>
                      <Skeleton className="h-3.5 w-20 sm:h-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export function CommentsSkeleton() {
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="mb-2 h-10 w-48" />
          <Skeleton className="h-5 w-72" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="mb-4 space-y-2">
          <div className="w-full sm:max-w-[400px]">
            <Skeleton className="h-10" />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-2 lg:flex">
            <Skeleton className="h-8 min-w-[150px]" />
            <Skeleton className="h-8 min-w-[150px]" />
            <Skeleton className="h-8 min-w-[150px]" />
            <Skeleton className="h-8 min-w-[150px]" />
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
            <Skeleton className="mt-1 h-4 w-72" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="mt-1 h-4 w-24" />
                        <Skeleton className="mt-2 h-4 w-full" />
                        <Skeleton className="mt-1 h-4 w-5/6" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>

                  <div className="flex items-center gap-3 rounded-md bg-muted/30 p-2">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div>
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="mt-1 h-3 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
