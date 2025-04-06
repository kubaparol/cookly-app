import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="mx-auto max-w-[800px]">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Ready to Transform Your Cooking Experience?
        </h2>
        <p className="mb-8 text-xl text-primary-foreground/80">
          Join thousands of home chefs who are already enjoying the benefits of Recipe Hub.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" variant="outline" className="dark:text-primary">
            <Link href={ProjectUrls.signUp}>
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="dark:text-primary">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
