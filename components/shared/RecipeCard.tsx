import { ExternalLink, Pencil } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/utils';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface RecipeCardProps {
  name: string;
  imageUrl: string;
  isAuthor: boolean;
}

export default function RecipeCard(props: RecipeCardProps) {
  const { name, imageUrl, isAuthor } = props;

  return (
    <div className="flex h-full flex-col rounded-xl bg-muted">
      <header className="grid pb-6">
        <Image
          src={imageUrl}
          width={150}
          height={150}
          alt={`${name} picture`}
          className="mx-auto -mt-12 rounded-full border-2 shadow-xl"
        />
      </header>

      <div className="grid flex-1 place-items-center px-4 pb-2">
        <p className="text-center font-bold">{name}</p>
      </div>

      <Separator />

      <footer
        className={cn(`flex items-center justify-between p-3`, !isAuthor && 'justify-center')}>
        {isAuthor && (
          <Button size="sm" variant="outline">
            Edit
            <Pencil className="ml-2 size-4" />
          </Button>
        )}

        <Button size="sm">
          View recipe
          <ExternalLink className="ml-2 size-4" />
        </Button>
      </footer>
    </div>
  );
}
