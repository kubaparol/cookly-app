'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CommentsFiltersProps {
  pathPattern?: string;
}

const ratingOptions = [
  { label: 'All Ratings', value: 'all' },
  { label: '5 Stars', value: '5' },
  { label: '4 Stars', value: '4' },
  { label: '3 Stars', value: '3' },
  { label: '2 Stars', value: '2' },
  { label: '1 Star', value: '1' },
];

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Highest Rating', value: 'highest' },
  { label: 'Lowest Rating', value: 'lowest' },
];

const statusOptions = [
  { label: 'All Comments', value: 'all' },
  { label: 'Replied', value: 'replied' },
  { label: 'Unanswered', value: 'unanswered' },
];

const timePeriodOptions = [
  { label: 'All Time', value: 'all' },
  { label: 'Last Week', value: 'week' },
  { label: 'Last Month', value: 'month' },
  { label: 'Last 3 Months', value: 'quarter' },
  { label: 'Last Year', value: 'year' },
];

export default function CommentsFilters({ pathPattern }: CommentsFiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [draftValues, setDraftValues] = useState({
    rating: 'all',
    sortBy: 'newest',
    status: 'all',
    timePeriod: 'all',
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const rating = params.get('rating') || 'all';
    const sortBy = params.get('sortBy') || 'newest';
    const status = params.get('status') || 'all';
    const timePeriod = params.get('timePeriod') || 'all';

    setDraftValues({
      rating,
      sortBy,
      status,
      timePeriod,
    });
  }, [searchParams]);

  const applyFilters = (field: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const newValues = { ...draftValues, [field]: value };
    setDraftValues(newValues);

    if (value && value !== 'all') {
      params.set(field, value);
    } else {
      params.delete(field);
    }

    let newPath = pathname;
    if (pathPattern) {
      newPath = pathPattern.replace(':page', '1');
    }

    replace(`${newPath}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();

    let newPath = pathname;
    if (pathPattern) {
      newPath = pathPattern.replace(':page', '1');
    }

    replace(`${newPath}?${params.toString()}`);

    setDraftValues({
      rating: 'all',
      sortBy: 'newest',
      status: 'all',
      timePeriod: 'all',
    });
  };

  const hasActiveFilters = () => {
    return (
      searchParams.has('rating') ||
      searchParams.has('sortBy') ||
      searchParams.has('status') ||
      searchParams.has('timePeriod')
    );
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <Select value={draftValues.rating} onValueChange={(value) => applyFilters('rating', value)}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Filter by Rating" />
          </SelectTrigger>
          <SelectContent>
            {ratingOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={draftValues.sortBy} onValueChange={(value) => applyFilters('sortBy', value)}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={draftValues.status} onValueChange={(value) => applyFilters('status', value)}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={draftValues.timePeriod}
          onValueChange={(value) => applyFilters('timePeriod', value)}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            {timePeriodOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters() && (
          <Button variant="outline" size="sm" onClick={clearAllFilters} className="h-8">
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
