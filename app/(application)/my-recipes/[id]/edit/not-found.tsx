import { Frown } from 'lucide-react';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <header className="grid place-items-center gap-2">
        <Frown className="size-36 text-gray-300" />

        <h2 className="text-xl font-semibold">Oops...</h2>

        <p>We couldn't find the recipe you were looking for</p>
      </header>

      <Button asChild>
        <Link href={ProjectUrls.myRecipes}>Go Back</Link>
      </Button>
    </div>
  );
}
