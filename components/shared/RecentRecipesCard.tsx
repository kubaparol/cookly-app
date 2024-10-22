import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export interface RecentRecipesCardProps extends ComponentPropsWithoutRef<'div'> {}

export default function RecentRecipesCard(props: RecentRecipesCardProps) {
  const { className, ...rest } = props;

  return (
    <Card {...rest} className={cn('flex flex-col', className)}>
      <CardHeader>
        <CardTitle>Recent Recipes</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className={cn('flex h-full items-center', index !== 0 && 'border-t')} key={index}>
            <div className="relative h-12 w-12">
              <Image
                src="https://utfs.io/f/tn9qWFoW4N1fDPxoPyWH4Rn2ECSm31GzYqLeo7sIk0dbPjct"
                alt=""
                fill
                className="rounded-full border-gray-200 object-cover shadow-md"
              />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium leading-none">Classic Spaghetti Bolognese</p>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button size="icon" variant="outline" asChild>
                <Link href="">
                  <Pencil className="size-4" />
                </Link>
              </Button>

              <Button size="icon" variant="outline" asChild>
                <Link href="">
                  <Trash2 className="size-4 text-red-600" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
