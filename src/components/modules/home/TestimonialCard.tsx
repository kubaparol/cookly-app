import { Star } from 'lucide-react';
import Image from 'next/image';

import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

export function TestimonialCard({ quote, author, role, avatar, rating }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="mb-4 flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
            />
          ))}
        </div>
        <p className="mb-6 text-muted-foreground">&quot;{quote}&quot;</p>
        <div className="flex items-center">
          <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
            <Image src={avatar || '/placeholder.svg'} alt={author} width={40} height={40} />
          </div>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
