import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { Badge } from '@/components/ui/badge';

export function CommentCard({
  author,
  avatar,
  recipe,
  comment,
  date,
  sentiment,
}: {
  author: string;
  avatar: string;
  recipe: {
    id: string;
    title: string | null;
  };
  comment: string;
  date: string;
  sentiment: string;
}) {
  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'neutral':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start gap-3">
        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
          <Image src={avatar} alt={author} fill className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-medium">{author}</h4>
            <span className="text-xs text-muted-foreground">{date}</span>
            <Badge variant="outline" className={`text-xs ${getSentimentColor()}`}>
              {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
            </Badge>
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            on
            <Link
              href={ProjectUrls.recipe(recipe.id)}
              target="_blank"
              className="flex items-center gap-1 truncate text-white hover:underline">
              {recipe.title}

              <ExternalLink className="h-3 w-3 flex-shrink-0" />
            </Link>
          </p>
          <p className="mt-2 break-words text-sm">{comment}</p>
        </div>
      </div>
    </div>
  );
}
