'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/utils';

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  disabled?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  rating = 0,
  maxRating = 5,
  size = 'md',
  interactive = false,
  disabled = false,
  onRatingChange,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const handleMouseEnter = (index: number) => {
    if (interactive && !disabled) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (interactive && !disabled) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (interactive && !disabled && onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div className={cn('flex items-center', className)}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = interactive ? starValue <= (hoverRating || rating) : starValue <= rating;

        return (
          <span
            key={index}
            className={cn(
              'mr-0.5 inline-block cursor-default transition-colors',
              interactive && !disabled && 'cursor-pointer',
              disabled && 'opacity-60',
            )}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}>
            <Star
              className={cn(
                sizeClasses[size],
                isFilled
                  ? 'fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500'
                  : 'fill-muted-foreground/10 text-muted-foreground/40',
              )}
            />
          </span>
        );
      })}
    </div>
  );
}
