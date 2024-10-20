import { ExternalLink, Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { Button } from '../ui/button';

interface RecipeCardProps {
  id: string;
  title: string;
  imageUrl: string;
  isAuthor: boolean;
}

export default function RecipeCard(props: RecipeCardProps) {
  const { id, title, imageUrl, isAuthor } = props;

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-xl transition-shadow duration-300">
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} picture`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        <div className="absolute inset-0 flex flex-col justify-end gap-2">
          <div className="flex gap-4 px-4 py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {isAuthor && (
              <Button size="sm" variant="outline" asChild>
                <Link href={ProjectUrls.updateRecipe(id)}>
                  Edit
                  <Pencil className="ml-2 size-4" />
                </Link>
              </Button>
            )}

            <Button size="sm">
              View recipe
              <ExternalLink className="ml-2 size-4" />
            </Button>
          </div>

          <h2 className="text-md bg-white/10 p-3 font-semibold text-white backdrop-blur-md xl:p-4 xl:text-lg">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
