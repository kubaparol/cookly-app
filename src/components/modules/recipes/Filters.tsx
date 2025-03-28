'use client';

import { Filter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useIsMobile } from '@/hooks';

import { cn } from '@/utils';

import { cuisineTypes, dietaryTags, difficultyLevels, mealTypes } from '@/constants';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const maxCookingTimeOptions = [
  { label: 'Up to 15 minutes total', value: '15' },
  { label: 'Up to 30 minutes total', value: '30' },
  { label: 'Up to 60 minutes total', value: '60' },
  { label: 'Up to 120 minutes total', value: '120' },
];

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const [selectedValues, setSelectedValues] = useState({
    difficulty: [] as string[],
    cuisineType: [] as string[],
    mealType: [] as string[],
    dietaryTags: [] as string[],
    maxCookingTime: undefined as string | undefined,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const difficulty = params.get('difficulty');
    const cuisineType = params.get('cuisineType');
    const mealType = params.get('mealType');
    const dietaryTags = params.get('dietaryTags');
    const maxCookingTime = params.get('maxCookingTime');

    setSelectedValues({
      difficulty: difficulty ? difficulty.split('_').filter(Boolean) : [],
      cuisineType: cuisineType ? cuisineType.split('_').filter(Boolean) : [],
      mealType: mealType ? mealType.split('_').filter(Boolean) : [],
      dietaryTags: dietaryTags ? dietaryTags.split('_').filter(Boolean) : [],
      maxCookingTime: maxCookingTime || undefined,
    });
  }, [searchParams]);

  const updateParams = useDebouncedCallback((param: string, values: string[]) => {
    const params = new URLSearchParams(searchParams);

    if (values.length > 0) {
      params.set(param, values.join('_'));
    } else {
      params.delete(param);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const clearAllFilters = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams();
    replace(`${pathname}?${params.toString()}`);
    setSelectedValues({
      difficulty: [],
      cuisineType: [],
      mealType: [],
      dietaryTags: [],
      maxCookingTime: undefined,
    });
  };

  const hasActiveFilters = () => {
    return (
      searchParams.has('difficulty') ||
      searchParams.has('cuisineType') ||
      searchParams.has('mealType') ||
      searchParams.has('dietaryTags') ||
      searchParams.has('maxCookingTime')
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn('relative', hasActiveFilters() && 'bg-primary/10 hover:bg-primary/20')}>
          Filters
          <Filter className="size-4" />
          {hasActiveFilters() && (
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {
                [
                  searchParams.has('difficulty'),
                  searchParams.has('cuisineType'),
                  searchParams.has('mealType'),
                  searchParams.has('dietaryTags'),
                  searchParams.has('maxCookingTime'),
                ].filter(Boolean).length
              }
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="max-sm:w-full">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label>Difficulty</Label>
            <MultiSelect
              options={difficultyLevels.map((level) => ({
                label: level.label,
                value: level.value,
              }))}
              value={selectedValues.difficulty}
              onValueChange={(values) => {
                setSelectedValues((prev) => ({ ...prev, difficulty: values }));
                updateParams('difficulty', values);
              }}
              placeholder="Select difficulty"
              maxCount={isMobile ? 0 : 1}
              modalPopover
            />
          </div>

          <div className="space-y-2">
            <Label>Cuisine Type</Label>
            <MultiSelect
              options={cuisineTypes.map((type) => ({
                label: type.label,
                value: type.value,
              }))}
              value={selectedValues.cuisineType}
              onValueChange={(values) => {
                setSelectedValues((prev) => ({ ...prev, cuisineType: values }));
                updateParams('cuisineType', values);
              }}
              placeholder="Select cuisine"
              maxCount={isMobile ? 0 : 1}
              modalPopover
            />
          </div>

          <div className="space-y-2">
            <Label>Meal Type</Label>
            <MultiSelect
              options={mealTypes.map((type) => ({
                label: type.label,
                value: type.value,
              }))}
              value={selectedValues.mealType}
              onValueChange={(values) => {
                setSelectedValues((prev) => ({ ...prev, mealType: values }));
                updateParams('mealType', values);
              }}
              placeholder="Select meal type"
              maxCount={isMobile ? 0 : 1}
              modalPopover
            />
          </div>

          <div className="space-y-2">
            <Label>Dietary Tags</Label>
            <MultiSelect
              options={dietaryTags.map((tag) => ({
                label: tag.label,
                value: tag.value,
              }))}
              value={selectedValues.dietaryTags}
              onValueChange={(values) => {
                setSelectedValues((prev) => ({ ...prev, dietaryTags: values }));
                updateParams('dietaryTags', values);
              }}
              placeholder="Select dietary tags"
              maxCount={isMobile ? 0 : 1}
              modalPopover
            />
          </div>

          <div className="space-y-2">
            <Label>Cooking Time</Label>
            <Select
              value={selectedValues.maxCookingTime}
              onValueChange={(value) => {
                setSelectedValues((prev) => ({ ...prev, maxCookingTime: value }));
                updateParams('maxCookingTime', [value]);
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Select max cooking time" />
              </SelectTrigger>
              <SelectContent>
                {maxCookingTimeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="mt-8 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={clearAllFilters}
            disabled={!hasActiveFilters()}>
            Clear filters
          </Button>
          <Button className="flex-1" onClick={() => setOpen(false)}>
            Search
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
