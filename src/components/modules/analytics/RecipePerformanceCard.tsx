import { ArrowDownRight } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface RecipePerformanceCardProps {
  title: string;
  image: string;
  views: number;
  saves: number;
  comments: number;
  rating: number;
  trend: string;
}

export function RecipePerformanceCard({
  title,
  image,
  views,
  saves,
  comments,
  rating,
  trend,
}: RecipePerformanceCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
            <Image src={image} alt={title} fill className="h-full w-full object-cover" />
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <div className="mt-1 flex items-center">
              <div
                className={`text-xs ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                {trend.startsWith('+') ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {trend}
              </div>
              <span className="ml-1 text-xs text-muted-foreground">views this period</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Views</span>
            <span className="font-medium">{views.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Saves</span>
            <span className="font-medium">{saves.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Comments</span>
            <span className="font-medium">{comments}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Rating</span>
            <span className="font-medium">{rating.toFixed(1)}/5.0</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/dashboard/analytics/recipes/${title.toLowerCase().replace(/\s+/g, '-')}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
