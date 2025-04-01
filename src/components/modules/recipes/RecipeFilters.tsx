'use client';

import { Filter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

interface RecipeFiltersProps {
  pathPattern?: string;
}

const maxCookingTimeOptions = [
  { label: 'Up to 15 minutes total', value: '15' },
  { label: 'Up to 30 minutes total', value: '30' },
  { label: 'Up to 60 minutes total', value: '60' },
  { label: 'Up to 120 minutes total', value: '120' },
];

export default function RecipeFilters({ pathPattern }: RecipeFiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const [draftValues, setDraftValues] = useState({
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

    const newValues = {
      difficulty: difficulty ? difficulty.split('_').filter(Boolean) : [],
      cuisineType: cuisineType ? cuisineType.split('_').filter(Boolean) : [],
      mealType: mealType ? mealType.split('_').filter(Boolean) : [],
      dietaryTags: dietaryTags ? dietaryTags.split('_').filter(Boolean) : [],
      maxCookingTime: maxCookingTime || undefined,
    };

    setDraftValues(newValues);
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (draftValues.difficulty.length > 0) {
      params.set('difficulty', draftValues.difficulty.join('_'));
    } else {
      params.delete('difficulty');
    }

    if (draftValues.cuisineType.length > 0) {
      params.set('cuisineType', draftValues.cuisineType.join('_'));
    } else {
      params.delete('cuisineType');
    }

    if (draftValues.mealType.length > 0) {
      params.set('mealType', draftValues.mealType.join('_'));
    } else {
      params.delete('mealType');
    }

    if (draftValues.dietaryTags.length > 0) {
      params.set('dietaryTags', draftValues.dietaryTags.join('_'));
    } else {
      params.delete('dietaryTags');
    }

    if (draftValues.maxCookingTime) {
      params.set('maxCookingTime', draftValues.maxCookingTime);
    } else {
      params.delete('maxCookingTime');
    }

    let newPath = pathname;
    if (pathPattern) {
      newPath = pathPattern.replace(':page', '1');
    }

    replace(`${newPath}?${params.toString()}`);
    setOpen(false);
  };

  const clearAllFilters = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams();

    let newPath = pathname;
    if (pathPattern) {
      newPath = pathPattern.replace(':page', '1');
    }

    replace(`${newPath}?${params.toString()}`);

    const emptyValues = {
      difficulty: [],
      cuisineType: [],
      mealType: [],
      dietaryTags: [],
      maxCookingTime: undefined,
    };

    setDraftValues(emptyValues);
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
              value={draftValues.difficulty}
              onValueChange={(values) => {
                setDraftValues((prev) => ({ ...prev, difficulty: values }));
                // No immediate URL update
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
              value={draftValues.cuisineType}
              onValueChange={(values) => {
                setDraftValues((prev) => ({ ...prev, cuisineType: values }));
                // No immediate URL update
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
              value={draftValues.mealType}
              onValueChange={(values) => {
                setDraftValues((prev) => ({ ...prev, mealType: values }));
                // No immediate URL update
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
              value={draftValues.dietaryTags}
              onValueChange={(values) => {
                setDraftValues((prev) => ({ ...prev, dietaryTags: values }));
                // No immediate URL update
              }}
              placeholder="Select dietary tags"
              maxCount={isMobile ? 0 : 1}
              modalPopover
            />
          </div>

          <div className="space-y-2">
            <Label>Cooking Time</Label>
            <Select
              value={draftValues.maxCookingTime}
              onValueChange={(value) => {
                setDraftValues((prev) => ({ ...prev, maxCookingTime: value }));
                // No immediate URL update
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
          <Button className="flex-1" onClick={applyFilters}>
            Search
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
