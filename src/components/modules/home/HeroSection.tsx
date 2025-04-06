import { Sparkles } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="wrapper relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--tw-gradient-from)_0%,var(--tw-gradient-to)_100%)] from-muted/20 to-transparent"></div>

      <div className="grid grid-cols-1 items-center gap-8 pb-16 pt-8 md:pb-24 md:pt-16 lg:grid-cols-2 lg:py-32">
        <div className="space-y-6">
          <Badge className="px-3 py-1 text-sm" variant="secondary">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Your Culinary Journey Starts Here
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Transform Your <span className="text-primary">Cooking Experience</span>
          </h1>
          <p className="max-w-[600px] text-xl text-muted-foreground">
            Create, organize, and share your recipes. Plan meals, track nutrition, and connect with
            a community of food lovers.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={ProjectUrls.signUp}>
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">See Features</Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 overflow-hidden rounded-full border-2 border-background bg-muted">
                  <Image
                    src={`/avatars/avatar-${i + 1}.webp`}
                    alt="User avatar"
                    width={32}
                    height={32}
                  />
                </div>
              ))}
            </div>
            <div>
              <span className="font-medium">10,000+</span> home chefs already joined
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="relative z-10 overflow-hidden rounded-xl border shadow-2xl">
            <Image
              src="/images/hero.webp"
              alt="Cookly Dashboard"
              width={800}
              height={600}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full bg-primary/10"></div>
          <div className="absolute -bottom-8 -left-8 -z-10 h-32 w-32 rounded-full bg-primary/10"></div>
        </div>
      </div>
    </section>
  );
}
