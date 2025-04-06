import { Star } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="wrapper py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            Testimonials
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Loved by Home Chefs Everywhere
          </h2>
          <p className="text-lg text-muted-foreground">
            Don&apos;t just take our word for it. Here&apos;s what our users have to say about
            Cookly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <TestimonialCard
            quote="Cookly has completely transformed how I organize my recipes and plan meals. I've saved so much time and reduced my food waste significantly."
            author="Sarah Johnson"
            role="Home Chef"
            avatar="/placeholder.svg?height=80&width=80&text=SJ"
            rating={5}
          />
          <TestimonialCard
            quote="As someone who cooks for a family with different dietary needs, the meal planning and substitution features have been a game-changer. Highly recommend!"
            author="Michael Chen"
            role="Food Blogger"
            avatar="/placeholder.svg?height=80&width=80&text=MC"
            rating={5}
          />
          <TestimonialCard
            quote="The analytics feature helped me understand which of my recipes are most popular. Now my food blog is thriving thanks to the insights I've gained."
            author="Emily Rodriguez"
            role="Culinary Student"
            avatar="/placeholder.svg?height=80&width=80&text=ER"
            rating={4}
          />
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

function TestimonialCard({ quote, author, role, avatar, rating }: TestimonialCardProps) {
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
